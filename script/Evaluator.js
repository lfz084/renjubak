"use strict";
if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["Evaluator"] = "v1202.12";
const DIRECTIONS = [0, 1, 2, 3] //[→, ↓, ↘, ↗]; // 米字线
const FIND_ALL = 0;
const ONLY_FREE = 1; // 只找活3，活4
const ONLY_NOFREE = 2; // 只找眠3，眠4
const ONLY_VCF = 1; // 只找做VCF点
const ONLY_SIMPLE_WIN = 2; // 只找43级别做杀点

const GOMOKU_RULES = 1; //无禁
const RENJU_RULES = 2; //有禁

//---------------- color --------------------

const BLACK_COLOR = 1;
const WHITE_COLOR = 2;
const INVERT_COLOR = [0, 2, 1]; //利用数组反转棋子颜色

//---------------- level --------------------

const LEVEL_WIN = 10;
const LEVEL_FREEFOUR = 9;
const LEVEL_NOFREEFOUR = 8;
const LEVEL_DOUBLEFREETHREE = 7;
const LEVEL_DOUBLEVCF = LEVEL_DOUBLEFREETHREE;
const LEVEL_FREETHREE = 6;
const LEVEL_VCF = LEVEL_FREETHREE;
const LEVEL_VCT = 4;
const LEVEL_NONE = 0;

//--------------- lineInfo ------------------

const FREE = 1; //0b00000001
const MAX = 14; //0b00001110
const MAX_FREE = 15; //0b00001111
const FOUL = 16; //0b00010000
const FOUL_FREE = 17; //0b00010001
const FOUL_MAX = 30; //0b00011110
const FOUL_MAX_FREE = 31; //0b00011111
const MARK_MOVE = 224; //0b11100000
const FREE_COUNT = 0x0700; //0b00000111 00000000
const ADD_FREE_COUNT = 0x800; //0b00001000 00000000
const MAX_COUNT = 0x7000; //0b01110000 00000000
const DIRECTION = 0x7000; //0b01110000 00000000
const ADD_MAX_COUNT = 0x8000; //0b10000000 00000000
const ZERO = 0;
const ONE_FREE = 3;
const ONE_NOFREE = 2;
const TWO_FREE = 5;
const TWO_NOFREE = 4;
const THREE_FREE = 7;
const THREE_NOFREE = 6;
const FOUR_FREE = 9;
const FOUR_NOFREE = 8;
const LINE_DOUBLE_FOUR = 24;
const FIVE = 10;
const SIX = 28;
const SHORT = 14; //空间不够

const EMPTYLIST = new Array(15);

const LINE_NAME = {
    1: "活",
    16: "禁",
    0: "零",
    3: "活一",
    2: "眠一",
    5: "活二",
    4: "眠二",
    7: "活三",
    6: "眠三",
    9: "活四",
    8: "冲四",
    24: "单线四四禁",
    10: "五连",
    28: "长连",
    14: "空间不够"
}

//--------------------- game -----------------------------

let gameRules = RENJU_RULES;
let cBoardSize = 15;

//---------------  ------------------ ------------------

if (0 && "WebAssembly" in self && typeof WebAssembly.instantiate == "function") {
    loadEvaluatorWebassembly.call(this);
    console.warn("loadEvaluatorWebassembly");
}
else {
    loadEvaluatorJScript.call(this);
    console.warn("loadEvaluatorJScript");
}

//---------------------- IDX_LISTS ------------------------

const IDX_LISTS = [[],[],[],[]];

for (let direction = 0; direction < 4; direction++) {
    switch (direction) { //生成阴线，阳线
        case 0:
            for (let y = 0; y < 15; y++) {
                IDX_LISTS[direction][y] = [];
                for (let x = 0; x < 15; x++) {
                    IDX_LISTS[direction][y][x] = y * 15 + x;
                }
            }
            break;
        case 1:
            for (let x = 0; x < 15; x++) {
                IDX_LISTS[direction][x] = [];
                for (let y = 0; y < 15; y++) {
                    IDX_LISTS[direction][x][y] = y * 15 + x;
                }
            }
            break;
        case 2:
            for (let i = 0; i < 15; i++) {
                IDX_LISTS[direction][i] = [];
                for (let j = 0; j <= i; j++) {
                    let x = 0 + j,
                        y = x + 14 - i;
                    IDX_LISTS[direction][i][j] = y * 15 + x;
                }
            }
            for (let i = 13; i >= 0; i--) {
                IDX_LISTS[direction][28 - i] = [];
                for (let j = 0; j <= i; j++) {
                    let x = 14 - i + j,
                        y = i - 14 + x;
                    IDX_LISTS[direction][28 - i][j] = y * 15 + x;
                }
            }
            break;
        case 3:
            for (let i = 0; i < 15; i++) {
                IDX_LISTS[direction][i] = [];
                for (let j = 0; j <= i; j++) {
                    let x = i - j,
                        y = i - x;
                    IDX_LISTS[direction][i][j] = y * 15 + x;
                }
            }
            for (let i = 13; i >= 0; i--) {
                IDX_LISTS[direction][28 - i] = [];
                for (let j = 0; j <= i; j++) {
                    let x = 14 - j,
                        y = 28 - i - x;
                    IDX_LISTS[direction][28 - i][j] = y * 15 + x;
                }
            }
            break;
    }
}

//--------------------- line -------------------------

function getLines(arr, color) {
    try {
        let infoArr = new Array(226),
            lineINFO = new Uint32Array(226),
            lines = [];
        testThree(arr, color, infoArr); //取得活三以上的点
        
        infoArr.map((info, idx) => { //分析每个点保存路线,3开始,1结束
            if (THREE_FREE <= (info & FOUL_MAX_FREE) && (info & FOUL_MAX_FREE) <= FIVE) {
                for (let direction = 0; direction < 4; direction++) {
                    let lineInfo = testLineThree(idx, direction, color, arr),
                        move = (lineInfo & 0xff) >>> 5,
                        i;
                    switch (FOUL_MAX_FREE & lineInfo) {
                        case FIVE:
                            for (let m = -4; m < 0; m++) {
                                i = moveIdx(idx, m + (move), direction);
                                lineINFO[i] |= (3 << 6 << direction * 8);
                            }
                            i = moveIdx(idx, move, direction);
                            lineINFO[i] |= (1 << 6 << direction * 8);
                            break;
                        case FOUR_FREE:
                            for (let m = -5; m < 0; m++) {
                                i = moveIdx(idx, m + (move), direction);
                                lineINFO[i] |= (3 << 4 << direction * 8);
                            }
                            i = moveIdx(idx, move, direction);
                            lineINFO[i] |= (1 << 4 << direction * 8);
                            break;
                        case FOUR_NOFREE:
                            for (let m = -4; m < 0; m++) {
                                i = moveIdx(idx, m + (move), direction);
                                lineINFO[i] |= (3 << 2 << direction * 8);
                            }
                            i = moveIdx(idx, move, direction);
                            lineINFO[i] |= (1 << 2 << direction * 8);
                            break;
                        case THREE_FREE:
                            for (let m = -5; m < 0; m++) {
                                i = moveIdx(idx, m + (move), direction);
                                lineINFO[i] |= (3 << direction * 8);
                            }
                            i = moveIdx(idx, move, direction);
                            lineINFO[i] |= (1 << direction * 8);
                            break;
                    }
                }
            }
        });

        for (let direction = 0; direction < 4; direction++) {
            
            //console.warn(`direction: ${direction}`)
            IDX_LISTS[direction].map(list => { //找出每一条线
                const LVL = ["THREE_FREE", "FOUR_NOFREE", "FOUR_FREE", "FIVE"];
                let lineStart = [-1, -1, -1, -1],
                    lineEnd = [-1, -1, -1, -1];
                //console.log(list);
                list.map(idx => {
                    let v = [0, 0, 0, 0];
                    v[0] = (lineINFO[idx] & (3 << direction * 8)) >>> direction * 8;
                    v[1] = (lineINFO[idx] & (3 << 2 << direction * 8)) >>> 2 >>> direction * 8;
                    v[2] = (lineINFO[idx] & (3 << 4 << direction * 8)) >>> 4 >>> direction * 8;
                    v[3] = (lineINFO[idx] & (3 << 6 << direction * 8)) >>> 6 >>> direction * 8;
                    //console.log(`direction: ${direction}, ${lineINFO[idx].toString(2)},\n${v[0].toString(2)}, ${v[1].toString(2)}, ${v[2].toString(2)}, ${v[3].toString(2)}`)
                    for (let vi = 0; vi < 4; vi++) {
                        if (v[vi] == 3) {
                            if (lineStart[vi] == -1) lineStart[vi] = idx;
                            else lineEnd[vi] = idx;
                        }
                        else if (v[vi] == 1) {
                            if (lineStart[vi] > -1 && lineEnd[vi] > -1) {
                                lines.push({ "start": lineStart[vi], "end": idx, "level": LVL[vi] });
                            }
                            lineStart[vi] = lineEnd[vi] = -1;
                        }
                    }
                });
            });
        }
        
        return lines;
    }
    catch (err) {
        console.error(err)
    }
}

//---------------  ------------------ ------------------

function getKey(arr) {
    let key = "";
    for (let y = 0; y < 15; y++) {
        for (let i = 0; i < 15; i += 5) {
            let sum = 0;
            for (let j = 0; j < 5; j++) {
                let m = arr[y][i + j];
                sum += m * Math.pow(3, j);
            }
            key += String.fromCharCode(sum);
        }
    }
    return key;
}

function getMoveKey(move) {
    const MOVE_LEN = move.length;
    let sum = 0; // 对每一手棋索引求，保存到数组最后位置。
    for (let i = 0; i < MOVE_LEN; i += 2) {
        sum += move[i];
    }
    return sum;
}

function getArr2D(arr, setnum = 0, x = 15, y = 15) {
    let j = 0;
    arr.length = 0;
    for (j = 0; j < y; j++) {
        arr[j] = [];
        for (let i = 0; i < x; i++) {
            arr[j][i] = setnum;
        }
    }
    return arr;
}

//Int8Array, Uint8Array... To Array,
function copyMoves(moves) {
    let m = [];
    let len = moves.length
    for (let i = 0; i < len; i++) {
        m[i] = moves[i];
    }
    return m;
}

//  复制一个arr二维数组, 
function copyArr2D(arr, arr2) {
    getArr2D(arr);
    for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 15; x++) {
            arr[y][x] = arr2[y][x];
        }
    }
    return arr;
}

function getX(idx) {
    return idx % 15;
}

function getY(idx) {
    return ~~(idx / 15);
}

// index ，转字母数字坐标
function idxToName(idx) {
    let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let x = getX(idx);
    let y = getY(idx);
    if (x < 0 || x >= cBoardSize || y < 0 || y >= cBoardSize)
        return "--";
    else
        return alpha.charAt(x) + (15 - y);
}

function movesToName(moves, maxLength) {
    let name = "";
    for (let i = 0; i < moves.length; i++) {
        name += `${i?",":""}${idxToName(moves[i])}`;
        if (name.length >= maxLength) {
            name += "......";
            break;
        }
    }
    return name;
}

//--------------------- moves ------------------------

function isChildMove(parentMove, childMove) {
    let j;
    let k;
    // 判断一个颜色,最后一手活四级忽略
    for (k = 0; k < parentMove.length; k += 2) {
        for (j = 0; j < childMove.length; j += 2) {
            if (childMove[j] == parentMove[k]) {
                break; //找到相同数据
            }
        }
        if (j >= childMove.length) break; // 没有找到相同数据;
    }
    return k >= parentMove.length;

}

function isRepeatMove(newMove, oldMove) {
    return isChildMove(newMove, oldMove);
}

// 添加一个成立的VCF分支
function pushWinMoves(winMoves, move) {
    let i;
    const MOVE_LEN = move.length;
    const WINMOVES_LEN = winMoves.length;

    function getSpliceStart(move, moves) {
        const LEN = move.length;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].length >= LEN) return i;
        }
    }
    for (i = WINMOVES_LEN - 1; i >= 0; i--) {
        if (MOVE_LEN < winMoves[i].length) {
            if (isChildMove(move, winMoves[i])) { // 把所有重复的替换掉
                winMoves.splice(i, 1);
            }
        }
        else {
            if (isChildMove(winMoves[i], move)) {
                return false;
            }
        }
    }
    const START = getSpliceStart(move, winMoves);
    winMoves.splice(START, 0, copyMoves(move)); // 找到相同数据;
    return true;
}

// 会改变moves,添加失败分支
function pushFailMoves(FailMoves, move) {

    let mv = move.slice(0);
    const MOVE_LEN = move.length;
    const MOVE_KEY = getMoveKey(mv); // 对单色棋子索引求和，保存到数组最后位置。
    // hash 数组保存失败分支;
    if (FailMoves[MOVE_LEN][MOVE_KEY] == null) {
        FailMoves[MOVE_LEN][MOVE_KEY] = [];
    }
    FailMoves[MOVE_LEN][MOVE_KEY].push(mv); // 保存失败分支   
}

// 对比VCF手顺是否相等
function findMoves(FailMoves, move) {

    let i;
    const MOVE_LEN = move.length;
    const MOVE_KEY = getMoveKey(move); // 对每一手棋索引求，保存到数组最后位置。
    if (FailMoves[MOVE_LEN][MOVE_KEY] == null) return false;
    const FAILMOVES_MOVES_LEN = FailMoves[MOVE_LEN][MOVE_KEY].length;
    for (i = FAILMOVES_MOVES_LEN - 1; i >= 0; i--) {
        if (isRepeatMove(move, FailMoves[MOVE_LEN][MOVE_KEY][i])) break;
    }
    return (i >= 0) ? true : false;
}

//--------------------- VCF ------------------------

const VCF_HASHTABLE_LEN = 5880420 + 4800000 + 104000000; //((135+224)*45)*91*4 + 80*60000 + 232*450000,
let vcfHashTable = [],
    vcfHashNextValue = 0,
    vcfWinMoves = [],
    vcfWinMovesNext = 0;
let vcfHashMaxMovesLen = 73;
let vcfInfo = {
        initArr: new Array(226),
        color: 0,
        maxVCF: 0,
        maxDepth: 0,
        maxNode: 0,
        vcfCount: 0,
        pushMoveCount: 0,
        pushPositionCount: 0,
        hasCount: 0,
        nodeCount: 0,
        winMoves: vcfWinMoves
    },
    levelBInfo = {
        levelInfo: 0,
        winMoves: undefined
    };

function resetVCF(arr, color, maxVCF, maxDepth, maxNode) {
    vcfInfo.initArr = arr.slice(0);
    vcfInfo.color = color;
    vcfInfo.maxVCF = maxVCF;
    vcfInfo.maxDepth = maxDepth;
    vcfInfo.maxNode = maxNode;
    vcfInfo.vcfCount = 0;
    vcfInfo.pushMoveCount = 0;
    vcfInfo.pushPositionCount = 0;
    vcfInfo.hasCount = 0;
    vcfInfo.nodeCount = 0;

    vcfWinMoves.length = 0;
    vcfHashTable.length = 0;
    for (let i = 0; i < 225; i++) { vcfHashTable[i] = {}; }
}


function vcfPositionPush(keyLen, keySum, position) {

    let mv = position.slice(0);
    const MOVE_LEN = keyLen;
    const MOVE_KEY = keySum; // 对单色棋子索引求和，保存到数组最后位置。
    // hash 数组保存失败分支;
    if (vcfHashTable[MOVE_LEN][MOVE_KEY] == null) {
        vcfHashTable[MOVE_LEN][MOVE_KEY] = [];
    }
    vcfHashTable[MOVE_LEN][MOVE_KEY].push(mv); // 保存失败分支   
}


function vcfPositionHas(keyLen, keySum, position) {

    const MOVE_LEN = keyLen;
    const MOVE_KEY = keySum; // 对每一手棋索引求，保存到数组最后位置。
    if (vcfHashTable[MOVE_LEN][MOVE_KEY] == null) return false;
    const FAILMOVES_MOVES_LEN = vcfHashTable[MOVE_LEN][MOVE_KEY].length;
    for (let i = FAILMOVES_MOVES_LEN - 1; i >= 0; i--) {
        let isEqual = true,
            psTion = vcfHashTable[MOVE_LEN][MOVE_KEY][i];
        for (let i = 0; i < 225; i++) {
            if (psTion[i] != position[i]) {
                isEqual = false;
                break;
            }
        }
        if (isEqual) return true;
    }
    return false;
}
/*
// 会改变moves
// 添加失败分支
function vcfMovesPush(keyLen, keySum, move) {
    if (vcfHashNextValue >= VCF_HASHTABLE_LEN) {
        return 0;
    }

    let movesByte = ((keyLen >>> 2) + 1) << 2,
        pNext = ((keyLen >>> 1) * 16155 + keySum) << 2,
        pMoves = new Uint32Array(vcfHashTable, pNext, 1);
    while (pMoves[0]) {
        pNext = pMoves[0] + movesByte;
        //post("vConsole", `pNext: ${pNext}\n pMoves[0]: ${pMoves[0]}\n movesByte: ${movesByte}`)
        pMoves = new Uint32Array(vcfHashTable, pNext, 1);
    }

    pMoves[0] = vcfHashNextValue;

    let newMoves = new Uint8Array(vcfHashTable, pMoves[0], movesByte);
    newMoves[0] = keyLen;
    for (let i = 0; i < keyLen; i++) {
        newMoves[1 + i] = move[i];
    }

    pNext = pMoves[0] + movesByte;
    //post("vConsole", `pNext: ${pNext}\n pMoves[0]: ${pMoves[0]}\n movesByte: ${movesByte}`)
    pMoves = new Uint32Array(vcfHashTable, pNext, 1);
    pMoves[0] = 0;
    vcfHashNextValue = pNext + 4;

    return vcfHashNextValue;
}

// 对比VCF手顺是否相等
function vcfMovesHas(keyLen, keySum, move) {
    let movesByte = ((keyLen >>> 2) + 1) << 2,
        pNext = ((keyLen >>> 1) * 16155 + keySum) << 2,
        pMoves = new Uint32Array(vcfHashTable, pNext, 1);
    while (pMoves[0]) {
        if (isRepeatMove(move, new Uint8Array(vcfHashTable, pMoves[0] + 1, keyLen))) return true;
        pNext = pMoves[0] + movesByte;
        //post("vConsole", `pNext: ${pNext}\n pMoves[0]: ${pMoves[0]}\n movesByte: ${movesByte}`)
        pMoves = new Uint32Array(vcfHashTable, pNext, 1);
    }
    return false;
}
*/
function vcfTransTablePush(keyLen, keySum, moves, position) {
    if (keyLen < vcfHashMaxMovesLen)
        pushFailMoves(vcfHashTable, moves);
    //vcfMovesPush(keyLen, keySum, moves);
    else
        vcfPositionPush(keyLen, keySum, position);
}

function vcfTransTableHas(keyLen, keySum, moves, position, centerIdx) {
    if (keyLen < vcfHashMaxMovesLen)
        return findMoves(vcfHashTable, moves);
    //return vcfMovesHas(keyLen, keySum, moves);
    else
        return vcfPositionHas(keyLen, keySum, position);
}

//---------------------- VCT ----------------------------

function resetLevelBInfo() {
    levelBInfo.levelInfo = LEVEL_NONE; //=0
    levelBInfo.winMoves = undefined;
}

function getLevelB(arr, color, maxVCF, maxDepth, maxNode) {
    let levelInfo = getLevel(arr, color);
    resetLevelBInfo();
    if (levelInfo) {
        levelBInfo.levelInfo = levelInfo;
        levelBInfo.winMoves = undefined;
        return levelInfo;
    }

    findVCF(arr, color, maxVCF, maxDepth, maxNode);
    let value = vcfInfo.nodeCount > 255 ? 255 : vcfInfo.nodeCount;
    if (vcfInfo.vcfCount) {
        levelBInfo.levelInfo = LEVEL_VCF | (value << 8);
        levelBInfo.winMoves = vcfInfo.winMoves[0].slice(0);
    }
    else if (vcfInfo.nodeCount > 2) {
        levelBInfo.levelInfo = LEVEL_VCT | (value << 8);
        levelBInfo.winMoves = undefined;
    }
    else {
        levelBInfo.levelInfo = LEVEL_NONE;
        levelBInfo.winMoves = undefined;
    }
    return levelBInfo.levelInfo;
}
