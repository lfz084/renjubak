"use strict";
if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["Evaluator"] = "v1202.00";
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

let gameRules = RENJU_RULES;

//--------------------  Node  ------------------------

function Node(idx = `-1`, parentNode, childNode = []) {
    this.parentNode = parentNode;
    this.idx = idx;
    this.childNode = childNode;
}

function movesToNode(moves, node) {
    let cNode = node.childNode;
    let leng = moves.length;
    let startIdx = 0;
    let sIdx;
    for (sIdx = 0; sIdx < leng; sIdx++) {
        for (startIdx = 0; startIdx < cNode.length; startIdx++) {
            if (moves[sIdx] == cNode[startIdx].idx) break;
        }
        if (startIdx == cNode.length) break;
        node = cNode[startIdx];
        cNode = cNode[startIdx].childNode;
    }
    for (let i = sIdx; i < leng; i++) {
        let idx = i == sIdx ? startIdx : 0; // idx == [].push
        cNode[idx] = new Node(moves[i] * 1, node);
        node = cNode[idx];
        cNode = cNode[idx].childNode;
    }
    return node;
}

//----------------------  cBoardSize  --------------------------

let cBoardSize = 15;

function setCBoardSize(size) {
    cBoardSize = size;
    idxLists = createIdxLists(cBoardSize);
    idxTable = createIdxTable();
    aroundIdxTable = createAroundIdxTable();
}

//--------------------- idxLists ---------------------

// 创建空白lists 用来保存阳线，阴线的idx
function createEmptyLists() {
    let outIdx = 225,
        idxLists = new Array(4 * 29 * 43);

    for (let i = idxLists.length - 1; i >= 0; i--) {
        idxLists[i] = outIdx;
    }
    return idxLists;
}

//保存棋盘区域内每一条线的idx，每条线按照 line[n] < line[n+1] 排序
function createIdxLists(cBoardSize) {
    let List,
        idxLists = createEmptyLists();
    //direction = 0
    for (let y = 0; y < 15; y++) {
        List = y * 43;
        for (let x = 0; x < 15; x++) {
            if (x < cBoardSize && y < cBoardSize) idxLists[List + 14 + x] = x + y * 15;
        }
    }
    //direction = 1
    for (let x = 0; x < 15; x++) {
        List = (29 + x) * 43;
        for (let y = 0; y < 15; y++) {
            if (x < cBoardSize && y < cBoardSize) idxLists[List + 14 + y] = x + y * 15;
        }
    }
    //direction = 2
    for (let i = 0; i < 15; i++) { // x + (14-y) = i, y = x + 14 - i
        List = (2 * 29 + i) * 43;
        for (let j = 0; j <= i; j++) {
            let x = 0 + j,
                y = x + 14 - i;
            if (x < cBoardSize && y < cBoardSize) idxLists[List + 14 + j] = x + y * 15;
        }
    }
    for (let i = 13; i >= 0; i--) { // (14-x) + y = i, y = i - 14 + x;
        List = (2 * 29 + 14 + 14 - i) * 43;
        for (let j = 0; j <= i; j++) {
            let x = 14 - i + j,
                y = i - 14 + x;
            if (x < cBoardSize && y < cBoardSize) idxLists[List + 14 + j] = x + y * 15;
        }
    }
    //direction = 3
    for (let i = 0; i < 15; i++) { // x + y = i, y = i - x
        List = (3 * 29 + i) * 43;
        for (let j = 0; j <= i; j++) {
            let x = i - j,
                y = i - x;
            if (x < cBoardSize && y < cBoardSize) idxLists[List + 14 + j] = x + y * 15;
        }
    }
    for (let i = 13; i >= 0; i--) { // (14-x)+(14-y) = i, y = 28 - i - x
        List = (3 * 29 + 14 + 14 - i) * 43;
        for (let j = 0; j <= i; j++) {
            let x = 14 - j,
                y = 28 - i - x;
            if (x < cBoardSize && y < cBoardSize) idxLists[List + 14 + j] = x + y * 15;
        }
    }
    return idxLists;
}

let idxLists; // = createIdxLists(15);

//------------------------- idxTable ----------------------

// 创建索引表，快速读取阳线，阴线idx. 超出棋盘范围返回 outIdx = 225
function createIdxTable() {
    let outIdx = 225,
        tb = new Array(226 * 29 * 4);
    for (let idx = 0; idx < 225; idx++) {
        for (let move = -14; move < 15; move++) {
            for (let direction = 0; direction < 4; direction++) {
                let x = getX(idx),
                    y = getY(idx);
                if (x >= 0 && x < cBoardSize && y >= 0 && y < cBoardSize) {
                    switch (direction) {
                        case 0:
                            tb[(idx * 29 + move + 14) * 4 + direction] = idxLists[(direction * 29 + y) * 43 + 14 + x + move];
                            break;
                        case 1:
                            tb[(idx * 29 + move + 14) * 4 + direction] = idxLists[(direction * 29 + x) * 43 + 14 + y + move];
                            break;
                        case 2:
                            tb[(idx * 29 + move + 14) * 4 + direction] = idxLists[(direction * 29 + x + 14 - y) * 43 + (x + 14 - y < 15 ? 14 + x + move : 14 + y + move)];
                            break;
                        case 3:
                            tb[(idx * 29 + move + 14) * 4 + direction] = idxLists[(direction * 29 + x + y) * 43 + (x + y < 15 ? 14 + y + move : 28 - x + move)];
                            break;
                    }
                }
                else {
                    tb[(idx * 29 + move + 14) * 4 + direction] = outIdx;
                }
            }
        }
    }


    for (let i = 29 * 4 - 1; i >= 0; i--) {
        tb[225 * 29 * 4 + i] = outIdx;
    }

    return tb;
}

// 按照阳线，阴线读取idx, 如果参数idx在棋盘外，直接返回 outIdx = 225
function moveIdx(idx, move, direction = 0) {
    return idxTable[(idx * 29 + move + 14) * 4 + direction]; // 7s
}

let idxTable; // = createIdxTable();

//--------------------  aroundIdxTable  ------------------------

function createAroundIdxTable() {
    let idxTable = new Array((15 + 225) * 225),
        outIdx = 225;
    for (let idx = 0; idx < 225; idx++) {
        for (let i = 0; i < 15; i++) {
            idxTable[idx * 240 + i] = 0;
        }
        for (let i = 0; i < 225; i++) {
            idxTable[idx * 240 + 15 + i] = outIdx;
        }
        let pIdx = 0,
            x = idx % 15,
            y = ~~(idx / 15);
        if (x < 0 || x >= cBoardSize || y < 0 || y >= cBoardSize) continue;
        idxTable[idx * 240 + 15 + pIdx++] = idx;
        idxTable[idx * 240] = pIdx;
        for (let radius = 1; radius < 15; radius++) {
            let top = moveIdx(idx, -radius, 1),
                right = moveIdx(idx, radius, 0),
                buttom = moveIdx(idx, radius, 1),
                left = moveIdx(idx, -radius, 0),
                nIdx;
            if (top != outIdx) {
                for (let m = -radius + 1; m <= radius; m++) {
                    nIdx = moveIdx(top, m, 0);
                    if (nIdx != outIdx) idxTable[idx * 240 + 15 + pIdx++] = nIdx;
                }
            }
            if (right != outIdx) {
                for (let m = -radius + 1; m <= radius; m++) {
                    nIdx = moveIdx(right, m, 1);
                    if (nIdx != outIdx) idxTable[idx * 240 + 15 + pIdx++] = nIdx;
                }
            }
            if (buttom != outIdx) {
                for (let m = radius - 1; m >= -radius; m--) {
                    nIdx = moveIdx(buttom, m, 0);
                    if (nIdx != outIdx) idxTable[idx * 240 + 15 + pIdx++] = nIdx;
                }
            }
            if (left != outIdx) {
                for (let m = radius - 1; m >= -radius; m--) {
                    nIdx = moveIdx(left, m, 1);
                    if (nIdx != outIdx) idxTable[idx * 240 + 15 + pIdx++] = nIdx;
                }
            }
            idxTable[idx * 240 + radius] = pIdx;
        }
        //console.info(`idx=${idx}, pIdx=${pIdx}`)
    }

    return idxTable;
}

//返回centerIdx为中心，顺时针绕圈的第index个点，index=0时就直接返回centerIdx
function aroundIdx(centerIdx, index) {
    return aroundIdxTable[centerIdx * 240 + 15 + index];
}

//返回centerIdx为中心，radius半径内的点的计数，radius=0时，返回1
function getAroundIdxCount(centerIdx, radius) {
    return aroundIdxTable[centerIdx * 240 + radius];
}

//，保存周围点的坐标
let aroundIdxTable; // = createAroundIdxTable();

//----------------------------------------------------

// 复制一个维数组
function copyMoves(moves) {
    let m = [];
    let len = moves.length
    for (let i = 0; i < len; i++) {
        m[i] = moves[i];
    }
    return m;
}

// 复制一个arr二维数组, 
function copyArr(arr, arr2) {
    getArr2D(arr);
    for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 15; x++) {
            arr[y][x] = arr2[y][x];
        }
    }
    return arr;
}




//判断冲四点是否抓禁，不判断黑棋是否有五连点
//x,y是白棋冲四点. 
function isCatchFoul(x, y, arr) {

}



// 判断是否，已经五连胜
function isWin(color, arr) {

}



// 不判断对手是否五连
// 判断是否活四级别胜
function isFFWin(x, y, color, arr, pass = false) {

}



// 不会验证x,y是否有棋子
// 判断 x，y是否长连
function isSix(x, y, color, arr) {

}



// 不会验证x,y是否有棋子
function isLineSix(x, y, direction, color, arr) {

}



// 不会验证x,y是否有棋子
// 判断x,y,点是否五连
function isFive(x, y, color, arr) {

}



// 不会验证x,y是否有棋子
function isFour(x, y, color, arr, free, passFoul) {

}


// (long*)lineInfo,  (lineInfo >> 3) & 0b111
function testLine(idx, direction, color, arr) {
    let max = -1, // -1 | 0 | 1 | 2 | 3 | 4 | 5 | SIX
        addFree = 0, // 0 | 1
        addCount = 0,
        free = 0, // >= 0
        count = 0,
        markMove = 0,
        emptyCount = 0,
        colorCount = 0,
        vs = new Array(11), // getArrValue(18 - 28次)，使用缓存快一些
        ov = arr[idx];
    arr[idx] = color;

    vs[0] = getArrValue(idx, -5, direction, arr);
    vs[1] = getArrValue(idx, -4, direction, arr);
    for (let move = -4; move < 5; move++) {
        vs[move + 6] = getArrValue(idx, move + 1, direction, arr);
        let v = vs[move + 5];
        if (v == 0) {
            emptyCount++;
        }
        else if (v == color) {
            colorCount++;
        }
        else { // v!=color || v==-1
            emptyCount = 0;
            colorCount = 0;
        }
        if (emptyCount + colorCount == 5) {

            if (gameRules == RENJU_RULES && color == 1 &&
                (color == vs[move] || color == vs[move + 6]))
            {
                if (colorCount == 5 && colorCount > max) {
                    max = SIX;
                    free = 0;
                    count = 0;
                    markMove = move;
                }
            }
            else {
                if (colorCount > max) {
                    max = colorCount;
                    addFree = 0;
                    addCount = 1;
                    free = 0;
                    count = 0;
                    markMove = move;
                }

                if (colorCount == max) {
                    if (addCount) count++;
                    addCount = 0;

                    if (addFree) {
                        free++;
                        markMove = move;
                    }
                    addFree = 1;
                }

            }

            v = vs[move + 1];
            if (v == 0) {
                emptyCount--;
                addCount = 1;
            }
            else {
                colorCount--;
                addFree = 0;
            }
        }
    }

    arr[idx] = ov;
    max &= 0b111;
    let lineFoul = max == 6 || max == 4 && count > 1 && !free ? 1 : 0;

    return direction << 12 |
        free << 8 |
        markMove << 5 |
        lineFoul << 4 | // set lineFoul
        max << 1 | // set maxNum
        (free ? 1 : 0); // set free
}



function testLineFoul(idx, direction, color, arr) {
    let max = 0, // 0 | 3 | 4 | 5 | SIX
        addFree = 0, // 0 | 1
        addCount = 0,
        free = 0, // >= 0
        count = 0,
        markMove = 0,
        emptyCount = 0,
        colorCount = 0,
        vs = new Array(11), // getArrValue(18 - 28次)，使用缓存快一些
        ov = arr[idx];
    arr[idx] = 1;

    vs[0] = getArrValue(idx, -5, direction, arr);
    vs[1] = getArrValue(idx, -4, direction, arr);
    for (let move = -4; move < 5; move++) {
        vs[move + 6] = getArrValue(idx, move + 1, direction, arr);
        let v = vs[move + 5];
        if (v == 0) {
            emptyCount++;
        }
        else if (v == 1) {
            colorCount++;
        }
        else { // v!=color || v==-1
            emptyCount = 0;
            colorCount = 0;
        }
        if (emptyCount + colorCount == 5) {
            if (colorCount == 5) {
                if (1 == vs[move] ||
                    1 == vs[move + 6])
                {
                    max = SIX;
                }
                else {
                    max = 5;
                }
                free = 0;
                count = 0;
                markMove = move;
                break;
            }
            else if (colorCount == 4) {
                if (1 == vs[move] ||
                    1 == vs[move + 6])
                { //六腐形
                }
                else {
                    if (max < 4) {
                        max = 4;
                        addFree = 0;
                        addCount = 1;
                        free = 0;
                        count = 0;
                        markMove = move;
                    }

                    if (addCount) count++;
                    addCount = 0;

                    if (addFree) {
                        free++;
                        markMove = move;
                    }
                    addFree = 1;
                }
            }
            else if (colorCount == 3 && max <= 3) {
                if (1 == vs[move] ||
                    1 == vs[move + 6])
                { //六腐形
                }
                else {
                    if (max < 3) {
                        max = 3;
                        addFree = 0;
                        addCount = 1;
                        free = 0;
                        count = 0;
                        markMove = move;
                    }

                    if (addCount) count++;
                    addCount = 0;

                    if (addFree) {
                        free++;
                        markMove = move;
                    }
                    addFree = 1;
                }
            }

            v = vs[move + 1];
            if (v == 0) {
                emptyCount--;
                addCount = 1;
            }
            else {
                colorCount--;
                addFree = 0;
            }
        }
    }

    arr[idx] = ov;

    return direction << 12 |
        free << 8 |
        markMove << 5 |
        (free ? max == 4 ? FOUR_FREE : THREE_FREE :
            max == 4 && count > 1 ? LINE_DOUBLE_FOUR :
            max << 1);
}



// 不会验证x,y是否有棋子
// idx,点在 direction指定这条线上是不是一个冲4点,活4
function testLineFour(idx, direction, color, arr) {

    let max = 0, // 0 | 4 | 5 | SIX
        addFree = 0, // 0 | 1
        addCount = 0,
        free = 0, // >= 0
        count = 0,
        markMove = 0,
        emptyCount = 0,
        colorCount = 0,
        ov = arr[idx];
    arr[idx] = color;

    for (let move = -4; move < 5; move++) {
        // getArrValur(18 - 22次)直接 getArrValur 快一些
        let v = getArrValue(idx, move, direction, arr);
        if (v == 0) {
            emptyCount++;
        }
        else if (v == color) {
            colorCount++;
        }
        else { // v!=color || v==-1
            emptyCount = 0;
            colorCount = 0;
        }
        if (emptyCount + colorCount == 5) {
            if (colorCount == 5) {
                if (gameRules == RENJU_RULES && color == 1 &&
                    (color == getArrValue(idx, move - 5, direction, arr) ||
                        color == getArrValue(idx, move + 1, direction, arr)))
                {
                    max = SIX;
                }
                else {
                    max = 5;
                }
                free = 0;
                count = 0;
                markMove = move;
                break;
            }
            else if (colorCount == 4) {
                if (gameRules == RENJU_RULES && color == 1 &&
                    (color == getArrValue(idx, move - 5, direction, arr) ||
                        color == getArrValue(idx, move + 1, direction, arr)))
                { //六腐形
                }
                else {
                    if (max < 4) {
                        max = 4;
                        addFree = 0;
                        addCount = 1;
                        free = 0;
                        count = 0;
                        markMove = move;
                    }

                    if (addCount) count++;
                    addCount = 0;

                    if (addFree) {
                        free++;
                        markMove = move;
                    }
                    addFree = 1;
                }
            }

            v = getArrValue(idx, move - 4, direction, arr);
            if (v == 0) {
                emptyCount--;
                addCount = 1;
            }
            else {
                colorCount--;
                addFree = 0;
            }
        }
    }
    arr[idx] = ov;

    return direction << 12 |
        free << 8 |
        markMove << 5 |
        (free ? FOUR_FREE :
            count > 1 ? LINE_DOUBLE_FOUR :
            max << 1);
}



function testLineThree(idx, direction, color, arr) {
    let max = 0, // 0 | 3 | 4 | 5 | SIX
        addFree = 0, // 0 | 1
        addCount = 0,
        free = 0, // >= 0
        count = 0,
        markMove = 0,
        emptyCount = 0,
        colorCount = 0,
        vs = new Array(11), // getArrValue(18 - 28次)，使用缓存快一些
        ov = arr[idx];
    arr[idx] = color;

    vs[0] = getArrValue(idx, -5, direction, arr);
    vs[1] = getArrValue(idx, -4, direction, arr);
    for (let move = -4; move < 5; move++) {
        vs[move + 6] = getArrValue(idx, move + 1, direction, arr);
        let v = vs[move + 5];
        if (v == 0) {
            emptyCount++;
        }
        else if (v == color) {
            colorCount++;
        }
        else { // v!=color || v==-1
            emptyCount = 0;
            colorCount = 0;
        }
        if (emptyCount + colorCount == 5) {
            if (colorCount == 5) {
                if (gameRules == RENJU_RULES && color == 1 &&
                    (color == vs[move] ||
                        color == vs[move + 6]))
                {
                    max = SIX;
                }
                else {
                    max = 5;
                }
                free = 0;
                count = 0;
                markMove = move;
                break;
            }
            else if (colorCount == 4) {
                if (gameRules == RENJU_RULES && color == 1 &&
                    (color == vs[move] ||
                        color == vs[move + 6])) {}
                else {
                    if (max < 4) {
                        max = 4;
                        addFree = 0;
                        addCount = 1;
                        free = 0;
                        count = 0;
                        markMove = move;
                    }

                    if (addCount) count++;
                    addCount = 0;

                    if (addFree) {
                        free++;
                        markMove = move;
                    }
                    addFree = 1;
                }
            }
            else if (colorCount == 3 && max <= 3) {
                if (gameRules == RENJU_RULES && color == 1 &&
                    (color == vs[move] ||
                        color == vs[move + 6]))
                { //六腐形
                }
                else {
                    if (max < 3) {
                        max = 3;
                        addFree = 0;
                        addCount = 1;
                        free = 0;
                        count = 0;
                        markMove = move;
                    }

                    if (addCount) count++;
                    addCount = 0;

                    if (addFree) {
                        free++;
                        markMove = move;
                    }
                    addFree = 1;
                }
            }

            v = vs[move + 1];
            if (v == 0) {
                emptyCount--;
                addCount = 1;
            }
            else {
                colorCount--;
                addFree = 0;
            }
        }
    }

    arr[idx] = ov;

    return direction << 12 |
        free << 8 |
        markMove << 5 |
        (free ? max == 4 ? FOUR_FREE : THREE_FREE :
            max == 4 && count > 1 ? LINE_DOUBLE_FOUR :
            max << 1);
}



function testFoul() {

}



function isFoul(idx, arr) {
    const LEN = 8,
        VALUE = 0,
        COUNT = 1,
        PIDX = 2,
        IDX = 3,
        INFO_START = 4;
    let stack = new Array(36 * LEN),
        stackIdx = 0,
        threeCount = 0,
        fourCount = 0,
        foulCount = 0,
        ov = arr[idx];

    arr[idx] = 1;
    stack[VALUE] = 0;
    stack[COUNT] = 0;
    stack[PIDX] = 0;
    stack[IDX] = idx;
    for (let direction = 0; direction < 4; direction++) {
        let info = testLineThree(idx, direction, 1, arr),
            v = FOUL_MAX_FREE & info;
        if (v == FIVE) { // not foul
            stackIdx = -1;
            break;
        }
        else if (v > FOUL) foulCount++;
        else if (v >= FOUR_NOFREE) fourCount++;
        else if (v == THREE_FREE) {
            threeCount++;
            stack[INFO_START + stack[COUNT]++] = info & 0x8fff | (direction << 12);
        }
    }

    if (stackIdx > -1) {
        //console.log(`>>>`)
        if (fourCount > 1 || foulCount) { // is foul
            stack[VALUE] = 2;
            stackIdx = -1;
        }
        else if (threeCount < 2) stackIdx = -1; //not foul

        while (stackIdx > -1) { //continue test doubleThree

            if (stackIdx % 2 == 0) { // test freeFourPoint and first doubleThree
                //console.log(`stackIdx=${stackIdx}, \n[${stack}]`)
                let idx = stack[stackIdx * LEN + IDX];
                if (stack[stackIdx * LEN + VALUE] > 1) { // is doubleThree
                    //console.log(1)
                    arr[idx] = 0;
                    stackIdx--;
                    if (stackIdx == -1) stack[VALUE] = 2; // set first doubleThree
                }
                else if (stack[stackIdx * LEN + PIDX] == stack[stackIdx * LEN + COUNT]) { // not doubleThree
                    //console.log(2)
                    arr[idx] = 0;
                    stackIdx--;
                    if (stackIdx > -1) stack[stackIdx * LEN + VALUE] = 1; //set freeFourPoint
                }
                else {
                    //console.log(3)
                    let ps = getFreeFourPoint(idx, arr, stack[stackIdx * LEN + INFO_START + stack[stackIdx * LEN + PIDX]++]);
                    stackIdx++;
                    stack[stackIdx * LEN + VALUE] = 0;
                    stack[stackIdx * LEN + COUNT] = ps[0]; //count
                    stack[stackIdx * LEN + PIDX] = 0;
                    //stack[stackIdx * LEN + IDX] = idx;
                    stack[stackIdx * LEN + INFO_START + 0] = ps[1];
                    stack[stackIdx * LEN + INFO_START + 1] = ps[2];
                }
            }
            else { // test next doubleThree
                //console.info(`stackIdx=${stackIdx}, \n[${stack}]`)
                if (stack[stackIdx * LEN + VALUE] == 1) { // find freeFourPoint
                    //console.info(1)
                    stackIdx--;
                    stack[stackIdx * LEN + VALUE]++; // add one freeThree
                }
                else if (stack[stackIdx * LEN + PIDX] == stack[stackIdx * LEN + COUNT]) { // not freeFourPoint
                    //console.info(2)
                    stackIdx--;
                }
                else {
                    //console.info(3)
                    let skip = false,
                        idx = stack[stackIdx * LEN + INFO_START + stack[stackIdx * LEN + PIDX]++];

                    threeCount = 0;
                    fourCount = 0;
                    foulCount = 0;

                    arr[idx] = 1;
                    stackIdx++;
                    stack[stackIdx * LEN + VALUE] = 0;
                    stack[stackIdx * LEN + COUNT] = 0; //count
                    stack[stackIdx * LEN + PIDX] = 0;
                    stack[stackIdx * LEN + IDX] = idx;
                    for (let direction = 0; direction < 4; direction++) {
                        let info = testLineThree(idx, direction, 1, arr),
                            v = FOUL_MAX_FREE & info;
                        if (v == FIVE) {
                            arr[idx] = 0;
                            stackIdx--; //not freeFourPoint
                            skip = true;
                            break;
                        }
                        else if (v > FOUL) foulCount++;
                        else if (v >= FOUR_NOFREE) fourCount++;
                        else if (v == THREE_FREE) {
                            threeCount++;
                            stack[stackIdx * LEN + INFO_START + stack[stackIdx * LEN + COUNT]++] = info & 0x8fff | (direction << 12);
                        }
                    }

                    if (!skip) {
                        if (fourCount > 1 || foulCount) {
                            arr[idx] = 0;
                            stackIdx--; //not freeFourPoint
                        }
                        else if (threeCount < 2) {
                            arr[idx] = 0;
                            stackIdx--; // is freeFourPoint
                            stack[stackIdx * LEN + VALUE] = 1;
                        }
                    }
                }
            }
        }
    }

    arr[idx] = ov;
    return stack[VALUE] > 1;
}



function isDoubleThreeFoul(idx, color, arr) {

}



// 不会验证x,y是否有棋子
//判断 x,y 是否44
function isFF(x, y, color, arr) {

}



// 不会验证x,y是否有棋子
function isThree(x, y, color, arr, free) {

}

function isThree_Point(point, color, arr, free) {
    return isThree(point.x, point.y, color, arr, free);
}

function isThree_Idx(idx, color, arr, free) {
    return isThree(getX(idx), getY(idx), color, arr, free);
}



// 不会验证x,y是否有棋子
// x,y,点是否形成33
function isTT(x, y, arr) {

}

function isTT_Point(point, arr) {
    return isTT(point.x, point.y, arr);
}

function isTT_Idx(idx, arr) {
    return isTT(getX(idx), getY(idx), arr);
}



// 不会验证x,y是否有棋子
// x,y,点在direction指定这条线上面是否为3
function isLineThree(x, y, direction, color, arr, free) {

}



function isLineThreeNode(x, y, direction, arr, free, node) {

}



// 不会验证x,y是否有棋子
// x,y,点在direction指定这条线上面是否为2
function isLineTwo(x, y, direction, color, arr, free) {

}



// 不会验证x,y是否有棋子
// 判断是否是一条线上的44,不判断x，y是否五连
function isLineFF(x, y, direction, color, arr) {

}



function isLineFFNode(x, y, direction, arr, node, LINEIDX) {

}



function getLine(idx, color, direction, arr, lineColor = "red", lineType) {

}

function getLines(idx, color, arr, level) {
    let lines = [];
    let x = getX(idx);
    let y = getY(idx);
    //console.log(`idx=${idx}, x=${x}, y=${y}`)
    for (let i = 0; i < 4; i++) {
        let line = getLine(DIRECTIONS[i]);
        //console.log(line)
        if (line) lines.push(line);
    }
    return lines;

    function getLine(direction) {
        let p;
        let isf;
        let count = 0;
        let start, end;
        let points = [];
        arr[y][x] = color;
        //console.log(direction)
        switch (level) {
            case 3:
                for (let i = -3; i < 0; i++) {
                    p = getArrPoint(x, y, i, direction);
                    if (p.x != -1 && arr[p.y][p.x] == 0) {
                        isf = isLineFour(p.x, p.y, direction, color, arr, true);
                        if (isf) {
                            points.push(p);
                            break;
                        }
                    }
                }
                for (let i = 3; i > 0; i--) {
                    p = getArrPoint(x, y, i, direction);
                    if (p.x != -1 && arr[p.y][p.x] == 0) {
                        isf = isLineFour(p.x, p.y, direction, color, arr, true);
                        if (isf) {
                            points.push(p);
                            break;
                        }
                    }
                }
                setLine();
                break;
            case 4:
                for (let i = -4; i < 0; i++) {
                    p = getArrPoint(x, y, i, direction);
                    if (p.x != -1 && arr[p.y][p.x] == 0) {
                        isf = isLineFive(p.x, p.y, direction, color, arr);
                        if (isf) {
                            points.push(p);
                            break;
                        }
                    }
                }
                for (let i = 4; i > 0; i--) {
                    p = getArrPoint(x, y, i, direction);
                    if (p.x != -1 && arr[p.y][p.x] == 0) {
                        isf = isLineFive(p.x, p.y, direction, color, arr);
                        if (isf) {
                            points.push(p);
                            break;
                        }
                    }
                }
                setLine();
                break;
            case 5:
                if (isLineFive(x, y, direction, color, arr)) {
                    points.push({ x: x, y: y });
                }
                setLine();
                break;
        }
        arr[y][x] = 0;
        if (start != end) {
            //console.log(`start=${start}, end=${end}, direction=${direction}`)
            return {
                "start": start,
                "end": end
            };
        }

        function setLine() {
            if (points.length) {
                start = getArrIndex(points[0].x, points[0].y, 0, direction);
                let j = 0;
                while (true) {
                    j--;
                    let c = getArrValue(points[0].x, points[0].y, j, direction, arr);
                    if (c == color) {
                        start = getArrIndex(points[0].x, points[0].y, j, direction);
                    }
                    else {
                        break;
                    }
                }
                end = getArrIndex(points[points.length - 1].x, points[points.length - 1].y, 0, direction);
                j = 0;
                while (true) {
                    j++;
                    let c = getArrValue(points[points.length - 1].x, points[points.length - 1].y, j, direction, arr);
                    if (c == color) {
                        end = getArrIndex(points[points.length - 1].x, points[points.length - 1].y, j, direction);
                    }
                    else {
                        break;
                    }
                }
            }
        }
    }
}



// 返回冲4的防点
function getBlockFourPoint(idx, arr, lineInfo) {
    let move = (lineInfo >> 5) & 7,
        direction = (lineInfo >> 12) & 7,
        nIdx;
    for (let m = 0; m > -5; m--) {
        nIdx = moveIdx(idx, move + m, direction);
        if (0 == arr[nIdx]) return nIdx;
    }
}

function getBlockThreePoints(idx, arr, lineInfo) {
    let move = (lineInfo >> 5) & 7,
        freeCount = (lineInfo >> 8) & 7,
        direction = (lineInfo >> 12) & 7,
        points = [0, 0, 0, 0],
        m = 0,
        nIdx;
    if (freeCount == 1) {
        for (m = 0; m > -6; m--) {
            nIdx = moveIdx(idx, move + m, direction);
            if (0 == arr[nIdx]) points[++points[0]] = nIdx;
        }
    }
    else if (freeCount == 2) {
        for (m = 0; m > -5; m--) {
            nIdx = moveIdx(idx, move + m, direction);
            if (0 == arr[nIdx]) break; // skip first
        }
        for (m--; m > -6; m--) {
            nIdx = moveIdx(idx, move + m, direction);
            if (0 == arr[nIdx]) points[++points[0]] = nIdx;
        }
    }

    return points;
}

function getFreeFourPoint(idx, arr, lineInfo) {
    let move = (lineInfo >> 5) & 7,
        direction = (lineInfo >> 12) & 7,
        points = [0, 0, 0],
        m = 0,
        nIdx;
    for (m = 0; m > -5; m--) {
        nIdx = moveIdx(idx, move + m, direction);
        if (0 == arr[nIdx]) break; // skip first
    }
    for (m--; m > -6; m--) {
        nIdx = moveIdx(idx, move + m, direction);
        if (0 == arr[nIdx]) {
            points[++points[0]] = nIdx;
        }
    }
    points[0] = (lineInfo >> 8) & 7; //set freePoint num

    return points;
}

function getNextEmpty(x, y, arr, direction, color, move = 0, maxLen = 5) {

}



// 返回 idx 在 direction 这条线上面的子力
function getPower(idx, arr, direction, color, power, move = 0) {
    let emptyCount = 0,
        colorCount = 0,
        max = -1;
    for (let move = -4; move < 5; move++) {
        let v = getArrValue(idx, move, direction, arr);
        if (v == 0) {
            emptyCount++;
        }
        else if (v == color) {
            colorCount++;
        }
        else { // v!=color || v==-1
            emptyCount = 0;
            colorCount = 0;
        }
        if (emptyCount + colorCount == 5) {
            if (colorCount > max) max = colorCount;
            v = getArrValue(idx, move - 4, direction, arr);
            if (v == 0) emptyCount--;
            else colorCount--;
        }
    }
    return max;
}



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



// 把arr 数组格式化成棋盘 字符串
function printArr(arr) {
    let s = "";
    for (let i = 0; i < 15; i++) {
        s += "\n";
        for (let j = 0; j < 15; j++) {
            s += arr[i][j] + "..";
        }
    }
    return s;
}



function toStr(arr) {
    let str = "";
    for (let i = 0; i < 15; i++) {
        str = str + `${arr[i]}\n`;
    }
    return str;
}



// 取得一个点的值
function getArrValue(idx, move, direction, arr) {
    return arr[moveIdx(idx, move, direction)];
}



function getArrValue_Idx(idx, move, direction, arr) {
    let x = getX(idx);
    let y = getY(idx);
    return getArrValue(x, y, move, direction, arr);
}



// 取得一个点的x,y
function getArrPoint(x, y, move, direction, arr) {
    let nx = changeX(x, move, direction);
    let ny = changeY(y, move, direction);
    if (nx >= 0 && nx <= 14 && ny >= 0 && ny <= 14) {
        return {
            x: nx,
            y: ny
        };
    }
    return {
        x: -1,
        y: -1
    };
}



// 取得一个点的Index
function getArrIndex(x, y, move, direction, arr) {
    let nx = changeX(x, move, direction);
    let ny = changeY(y, move, direction);
    if (nx >= 0 && nx <= 14 && ny >= 0 && ny <= 14) {
        return ny * 15 + nx;
    }
    return -1;
}



function getX(idx) {
    return idx % 15;
}



function getY(idx) {
    return ~~(idx / 15);
}

function changeX(x, move, direction) {
    switch (direction) {
        case 0:
            return x + move;
            break;
        case 1:
            return x;
            break;
        case 2:
            return x + move;
            break;
        case 3:
            return x + move;
            break;
    }
}



function changeY(y, move, direction) {
    switch (direction) {
        case 0:
            return y;
            break;
        case 1:
            return y + move;
            break;
        case 2:
            return y + move;
            break;
        case 3:
            return y - move;
            break;
    }
}



// index ，转字母数字坐标
function idxToName(idx) {
    let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let x = getX(idx);
    let y = getY(idx);
    return (alpha.charAt(x) + (15 - y));
}



function moveIndexToName(moves, maxLength) {
    let name = "";
    for (let i = 0; i < moves.length; i++) {
        name += `${i?",":""}${idxToName(moves[i])}`;
        if (name.length >= maxLength) {
            name += "......";
            break;
        }
    }
    return name;
};



function toArr(r, arr) {
    arr = arr || getArr2D([]);
    if (r.length == 225) {
        for (let y = 0; y < 15; y++) {
            for (let x = 0; x < 15; x++) {
                arr[y][x] = r[x + y * 15];
            }
        }
    }
    return arr;
}


function movesSort(fMoves, fun) {
    for (let i = fMoves.length - 2; i >= 0; i--) {
        for (let j = fMoves.length - 1; j > i; j--) {
            if (fun(fMoves[j].length, fMoves[i].length)) {
                let t = fMoves.splice(i, 1);
                fMoves.splice(j, 0, t[0]);
                break;
            }
        }
    }
}



function findFoulPoint(arr, newarr, setnum) {

    let narr = getArr2D([]);
    findSixPoint(arr, 1, narr, setnum);
    addFoulPoint(newarr, narr);
    narr = getArr2D([]);
    findFFPoint(arr, 1, narr, setnum);
    addFoulPoint(newarr, narr);
    narr = getArr2D([]);
    findTTPoint(arr, 1, narr, setnum);
    addFoulPoint(newarr, narr);
    return newarr;

    function addFoulPoint(newarr, narr) {
        for (let y = 0; y < 15; y++) {
            for (let x = 0; x < 15; x++) {
                if (narr[y][x] != 0) {
                    newarr[y][x] = narr[y][x] * 1;
                }
            }
        }
    }
}



function findSixPoint(arr, color, newarr, setnum) {

    let count = 0;
    let nx;
    let ny;
    // 五连否定六连
    findFivePoint(arr, color, newarr, -10000);
    for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 15; x++) {
            for (let i = 0; i < 4; i++) {
                let pw = getPower(x, y, arr, DIRECTIONS[i], color)
                if (pw == 4) {
                    let p = getNextEmpty(x, y, arr, DIRECTIONS[i], color);
                    if (getArrValue(x, y, -1, DIRECTIONS[i], arr) == color || getArrValue(x, y, 5, DIRECTIONS[i], arr) == color) {
                        newarr[p.y][p.x] += Math.pow(10, i);
                        count++;
                    }
                }
            }
        }
    }
    if (setnum != null) {
        for (let y = 0; y < 15; y++) {
            for (let x = 0; x < 15; x++) {
                if (newarr[y][x] != 0) {
                    newarr[y][x] = setnum;
                }
            }
        }
    }
    return count;
}



function testFive(arr, color, infoArr) {
    let emptyList = new Array(15),
        emptyMoves = new Array(15);
    for (let i = 0; i < 225; i++) infoArr[i] = 0;
    for (let direction = 0; direction < 4; direction++) {
        let markArr = new Array(225),
            listStart = direction == 2 ? 15 - cBoardSize : 0,
            listEnd = direction < 2 ? listStart + cBoardSize : listStart + cBoardSize * 2 - 5;
        for (let list = listStart; list < listEnd; list++) {
            let emptyCount = 0,
                colorCount = 0,
                moveStart = direction < 3 || list < cBoardSize ? 14 : list < 15 ? 15 + list - cBoardSize : 29 - cBoardSize,
                moveEnd = direction < 2 ? moveStart + cBoardSize : list - listStart < cBoardSize ? moveStart + list - listStart + 1 : moveStart + cBoardSize - (list - listStart + 1 - cBoardSize),
                emptyStart = 0,
                emptyEnd = 0;
            for (let move = moveStart; move < moveEnd; move++) {
                let pIdx = (direction * 29 + list) * 43 + move,
                    v = arr[idxLists[pIdx]];
                if (v == 0) {
                    emptyCount++;
                    emptyMoves[emptyEnd] = move;
                    emptyList[emptyEnd++] = idxLists[pIdx];
                }
                else if (v == color) {
                    colorCount++;
                }
                else { // v!=color || v==-1
                    emptyCount = 0;
                    colorCount = 0;
                    emptyStart = emptyEnd;
                }

                if (emptyCount + colorCount == 5) {
                    if (colorCount == 4) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == arr[idxLists[pIdx - 5]] ||
                                color == arr[idxLists[pIdx + 1]]))
                        {
                            for (let e = emptyStart; e < emptyEnd; e++) {
                                markArr[emptyList[e]] = SIX | ((move - emptyMoves[e]) << 5);
                            }
                        }
                        else {
                            for (let e = emptyStart; e < emptyEnd; e++) {
                                markArr[emptyList[e]] = FIVE | ((move - emptyMoves[e]) << 5);
                            }
                        }
                    }

                    v = arr[idxLists[pIdx - 4]];
                    if (v == 0) {
                        emptyCount--;
                        emptyStart++;
                        for (let e = emptyStart; e < emptyEnd; e++) {
                            markArr[emptyList[e]] |= ADD_MAX_COUNT; //set addCount
                        }
                    }
                    else {
                        colorCount--;
                        for (let e = emptyStart; e < emptyEnd; e++) {
                            markArr[emptyList[e]] = markArr[emptyList[e]] & 0xf7ff;
                        }
                    }
                }
            }
        }

        for (let idx = 0; idx < 225; idx++) {
            let max = markArr[idx] & MAX;
            if (FIVE == max) {
                infoArr[idx] = markArr[idx] & 0x8fff | (direction << 12);
            }
        }
    }
}

function testFour(arr, color, infoArr) {
    let emptyList = new Array(15),
        emptyMoves = new Array(15);
    for (let i = 0; i < 225; i++) infoArr[i] = 0;
    for (let direction = 0; direction < 4; direction++) {
        let markArr = new Array(225),
            listStart = direction == 2 ? 15 - cBoardSize : 0,
            listEnd = direction < 2 ? listStart + cBoardSize : listStart + cBoardSize * 2 - 5;
        for (let list = listStart; list < listEnd; list++) {
            let emptyCount = 0,
                colorCount = 0,
                moveStart = direction < 3 || list < cBoardSize ? 14 : list < 15 ? 15 + list - cBoardSize : 29 - cBoardSize,
                moveEnd = direction < 2 ? moveStart + cBoardSize : list - listStart < cBoardSize ? moveStart + list - listStart + 1 : moveStart + cBoardSize - (list - listStart + 1 - cBoardSize),
                emptyStart = 0,
                emptyEnd = 0;
            for (let move = moveStart; move < moveEnd; move++) {

                let pIdx = (direction * 29 + list) * 43 + move,
                    v = arr[idxLists[pIdx]];
                if (v == 0) {
                    emptyCount++;
                    emptyMoves[emptyEnd] = move;
                    emptyList[emptyEnd++] = idxLists[pIdx];
                }
                else if (v == color) {
                    colorCount++;
                }
                else { // v!=color || v==-1
                    emptyCount = 0;
                    colorCount = 0;
                    emptyStart = emptyEnd;
                }

                if (emptyCount + colorCount == 5) {
                    if (colorCount == 4) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == arr[idxLists[pIdx - 5]] ||
                                color == arr[idxLists[pIdx + 1]]))
                        {
                            for (let e = emptyStart; e < emptyEnd; e++) {
                                markArr[emptyList[e]] = SIX | ((move - emptyMoves[e]) << 5);
                            }
                        }
                        else {
                            for (let e = emptyStart; e < emptyEnd; e++) {
                                markArr[emptyList[e]] = FIVE | ((move - emptyMoves[e]) << 5);
                            }
                        }
                    }
                    else if (colorCount == 3) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == arr[idxLists[pIdx - 5]] ||
                                color == arr[idxLists[pIdx + 1]]))
                        { //六腐形
                        }
                        else {
                            for (let e = emptyStart; e < emptyEnd; e++) {
                                if ((markArr[emptyList[e]] & MAX) < FOUR_NOFREE) {
                                    markArr[emptyList[e]] = ADD_MAX_COUNT | ((move - emptyMoves[e]) << 5) | FOUR_NOFREE;
                                }

                                if ((markArr[emptyList[e]] & MAX) == FOUR_NOFREE) {
                                    if (markArr[emptyList[e]] & ADD_MAX_COUNT) {
                                        markArr[emptyList[e]] += 0x1000; //count++
                                    }
                                    markArr[emptyList[e]] = markArr[emptyList[e]] & 0x7fff;

                                    if (markArr[emptyList[e]] & ADD_FREE_COUNT) {
                                        markArr[emptyList[e]] += 0x100; //free++
                                        markArr[emptyList[e]] = (markArr[emptyList[e]] & 0xff1f) | ((move - emptyMoves[e]) << 5); //set markMove
                                    }
                                    markArr[emptyList[e]] |= ADD_FREE_COUNT;
                                }
                            }
                        }
                    }

                    v = arr[idxLists[pIdx - 4]];
                    if (v == 0) {
                        emptyCount--;
                        emptyStart++;
                        for (let e = emptyStart; e < emptyEnd; e++) {
                            markArr[emptyList[e]] |= ADD_MAX_COUNT; //set addCount
                        }
                    }
                    else {
                        colorCount--;
                        for (let e = emptyStart; e < emptyEnd; e++) {
                            markArr[emptyList[e]] = markArr[emptyList[e]] & 0xf7ff;
                        }
                    }
                }
            }
        }

        for (let idx = 0; idx < 225; idx++) {
            let max = markArr[idx] & MAX;
            if (FIVE == max) {
                infoArr[idx] = markArr[idx] & 0x8fff | (direction << 12);
            }
            else if (FOUR_NOFREE == max) {
                markArr[idx] |= (markArr[idx] & FREE_COUNT) ? 1 : 0;
                if ((markArr[idx] & FOUL_MAX_FREE) > (infoArr[idx] & FOUL_MAX_FREE)) {
                    if (gameRules == RENJU_RULES && color == 1) {
                        let foul = isFoul(idx, arr) ? 1 : 0;
                        infoArr[idx] = markArr[idx] & 0x8fff | (direction << 12) | foul << 4;
                    }
                    else
                        infoArr[idx] = markArr[idx] & 0x8fff | (direction << 12);
                }
            }
        }
    }
}

function testThree(arr, color, infoArr) {
    let emptyList = new Array(15),
        emptyMoves = new Array(15);
    for (let i = 0; i < 225; i++) infoArr[i] = 0;
    for (let direction = 0; direction < 4; direction++) {
        let markArr = new Array(225),
            listStart = direction == 2 ? 15 - cBoardSize : 0,
            listEnd = direction < 2 ? listStart + cBoardSize : listStart + cBoardSize * 2 - 5;
        for (let list = listStart; list < listEnd; list++) {
            let emptyCount = 0,
                colorCount = 0,
                moveStart = direction < 3 || list < cBoardSize ? 14 : list < 15 ? 15 + list - cBoardSize : 29 - cBoardSize,
                moveEnd = direction < 2 ? moveStart + cBoardSize : list - listStart < cBoardSize ? moveStart + list - listStart + 1 : moveStart + cBoardSize - (list - listStart + 1 - cBoardSize),
                emptyStart = 0,
                emptyEnd = 0;
            for (let move = moveStart; move < moveEnd; move++) {
                let pIdx = (direction * 29 + list) * 43 + move,
                    v = arr[idxLists[pIdx]];
                if (v == 0) {
                    emptyCount++;
                    emptyMoves[emptyEnd] = move;
                    emptyList[emptyEnd++] = idxLists[pIdx];
                }
                else if (v == color) {
                    colorCount++;
                }
                else { // v!=color || v==-1
                    emptyCount = 0;
                    colorCount = 0;
                    emptyStart = emptyEnd;
                }
                //console.log(idxLists[pIdx])
                if (emptyCount + colorCount == 5) {
                    //console.info(`idx = ${idxLists[pIdx]}, emptyCount = ${emptyCount}, colorCount = ${colorCount}`)
                    if (colorCount == 4) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == arr[idxLists[pIdx - 5]] ||
                                color == arr[idxLists[pIdx + 1]]))
                        {
                            for (let e = emptyStart; e < emptyEnd; e++) {
                                markArr[emptyList[e]] = SIX | ((move - emptyMoves[e]) << 5);
                            }
                        }
                        else {
                            for (let e = emptyStart; e < emptyEnd; e++) {
                                markArr[emptyList[e]] = FIVE | ((move - emptyMoves[e]) << 5);
                            }
                        }
                    }
                    else if (4 > colorCount && colorCount > 1) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == arr[idxLists[pIdx - 5]] ||
                                color == arr[idxLists[pIdx + 1]]))
                        { //六腐形
                        }
                        else {
                            for (let e = emptyStart; e < emptyEnd; e++) {
                                if (((markArr[emptyList[e]] & MAX) >> 1) < colorCount + 1) {
                                    markArr[emptyList[e]] = ADD_MAX_COUNT | ((move - emptyMoves[e]) << 5) | (colorCount + 1 << 1);
                                    //if(idxToName(emptyList[e])=="L7") console.error(`direction: ${direction}\n markMove: ${(markArr[emptyList[e]] & 0xe0)>>5}\n move: ${move} \nemptyMoves[e]: ${emptyMoves[e]}`);
                                }

                                if (((markArr[emptyList[e]] & MAX) >> 1) == colorCount + 1) {
                                    if (markArr[emptyList[e]] & ADD_MAX_COUNT) {
                                        markArr[emptyList[e]] += 0x1000; //count++
                                    }
                                    markArr[emptyList[e]] = markArr[emptyList[e]] & 0x7fff;

                                    if (markArr[emptyList[e]] & ADD_FREE_COUNT) {
                                        markArr[emptyList[e]] += 0x100; //free++
                                        markArr[emptyList[e]] =  (markArr[emptyList[e]] & 0xff1f) | ((move - emptyMoves[e]) << 5); //set markMove
                                        //if(idxToName(emptyList[e])=="L7") console.info(`direction: ${direction}\n markMove: ${(markArr[emptyList[e]] & 0xe0)>>5}\n move: ${move} \nemptyMoves[e]: ${emptyMoves[e]}`);
                                    }
                                    markArr[emptyList[e]] |= ADD_FREE_COUNT;
                                }
                            }
                        }
                    }

                    v = arr[idxLists[pIdx - 4]];
                    if (v == 0) {
                        emptyCount--;
                        emptyStart++;
                        for (let e = emptyStart; e < emptyEnd; e++) {
                            markArr[emptyList[e]] |= ADD_MAX_COUNT; //set addCount
                        }
                    }
                    else {
                        colorCount--;
                        for (let e = emptyStart; e < emptyEnd; e++) {
                            markArr[emptyList[e]] = markArr[emptyList[e]] & 0xf7ff;
                        }
                    }
                }
            }
        }

        for (let idx = 0; idx < 225; idx++) {
            let max = (markArr[idx] & MAX) >> 1;
            if (5 == max) {
                infoArr[idx] = markArr[idx] & 0x8fff | (direction << 12);
            }
            else if (5 > max && max > 2) {
                markArr[idx] |= (markArr[idx] & FREE_COUNT) ? 1 : 0; //mark free
                if ((markArr[idx] & FOUL_MAX_FREE) > (infoArr[idx] & FOUL_MAX_FREE)) {
                    //console.log(`idx: ${idxToName(idx)}\n direction: ${direction}, \n markMove:  ${(markArr[idx] & 0xe0) >> 5}`);
                    if (gameRules == RENJU_RULES && color == 1) {
                        let foul = isFoul(idx, arr) ? 1 : 0;
                        if ((max == 3) && (markArr[idx] & FREE) && (foul == 0)) {
                            arr[idx] = color;
                            let ps = getFreeFourPoint(idx, arr, ((markArr[idx] & 0x8fff) | (direction << 12)));
                            //console.warn(`[${ps[0]},${idxToName(ps[1])}, ${idxToName(ps[2])}]`);
                            let i = 1;
                            for (i = 1; i <= ps[0]; i++) {
                                let f = isFoul(ps[i], arr);
                                //console.warn(`${idxToName(ps[i])} isFoul: ${f}`);
                                if (!f) break; //ps[i] is freeFour point
                            }
                            arr[idx] = 0;
                            if (i > ps[0]) {
                                //console.warn(`markArr[idx]: ${markArr[idx]}`);
                                markArr[idx] &= 0xf8fe; //clear free
                                //console.warn(`markArr[idx]: ${markArr[idx]}`);
                            }
                        }
                        infoArr[idx] = markArr[idx] & 0x8fff | (direction << 12) | foul << 4;
                        //console.log(`${idxToName(idx)}, foul=${foul}, infoArr[idx]=${infoArr[idx].toString(2)}`)
                    }
                    else
                        infoArr[idx] = markArr[idx] & 0x8fff | (direction << 12);
                }
            }
        }
    }
}



function getLevel(arr, color) {
    let infoArr = new Array(225),
        isWin = false,
        fiveIdx = -1;
    let emptyList = new Array(15),
        emptyMoves = new Array(15);
    for (let direction = 0; direction < 4; direction++) {
        let markArr = new Array(225),
            listStart = direction == 2 ? 15 - cBoardSize : 0,
            listEnd = direction < 2 ? listStart + cBoardSize : listStart + cBoardSize * 2 - 5;
        for (let list = listStart; list < listEnd; list++) {
            let emptyCount = 0,
                colorCount = 0,
                moveStart = direction < 3 || list < cBoardSize ? 14 : list < 15 ? 15 + list - cBoardSize : 29 - cBoardSize,
                moveEnd = direction < 2 ? moveStart + cBoardSize : list - listStart < cBoardSize ? moveStart + list - listStart + 1 : moveStart + cBoardSize - (list - listStart + 1 - cBoardSize),
                emptyStart = 0,
                emptyEnd = 0;
            for (let move = moveStart; move < moveEnd; move++) {
                let pIdx = (direction * 29 + list) * 43 + move,
                    v = arr[idxLists[pIdx]];
                if (v == 0) {
                    emptyCount++;
                    emptyMoves[emptyEnd] = move;
                    emptyList[emptyEnd++] = idxLists[pIdx];
                }
                else if (v == color) {
                    colorCount++;
                }
                else { // v!=color || v==-1
                    emptyCount = 0;
                    colorCount = 0;
                    emptyStart = emptyEnd;
                }

                if (emptyCount + colorCount == 5) {
                    if (colorCount == 5) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == arr[idxLists[pIdx - 5]] ||
                                color == arr[idxLists[pIdx + 1]]))
                        { //
                        }
                        else {
                            isWin = true;
                            direction = 4; //break for
                            list = listEnd;
                            move = moveEnd;
                        }
                    }
                    else if (colorCount == 4) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == arr[idxLists[pIdx - 5]] ||
                                color == arr[idxLists[pIdx + 1]]))
                        { //
                        }
                        else {
                            for (let e = emptyStart; e < emptyEnd; e++) {
                                markArr[emptyList[e]] = FIVE | ((move - emptyMoves[e]) << 5);
                            }
                        }
                    }

                    v = arr[idxLists[pIdx - 4]];
                    if (v == 0) {
                        emptyCount--;
                        emptyStart++;
                    }
                    else {
                        colorCount--;
                    }
                }
            }
        }

        for (let idx = 0; idx < 225; idx++) {
            let max = (markArr[idx] & MAX) >> 1;
            if (5 == max) {
                infoArr[idx] = markArr[idx] & 0x8fff | (direction << 12);
            }
        }
    }

    if (isWin) {
        return LEVEL_WIN;
    }
    else {
        for (let idx = 0; idx < 225; idx++) {
            let max = (infoArr[idx] & MAX) >> 1;
            if (5 == max) {
                if (fiveIdx == -1) fiveIdx = idx;
                else if (fiveIdx != idx) return (fiveIdx << 8) | LEVEL_FREEFOUR;
            }
        }
        if (fiveIdx == -1)
            return LEVEL_NONE;
        else if (gameRules == RENJU_RULES && color == 2 && isFoul(fiveIdx, arr))
            return (fiveIdx << 8) | LEVEL_FREEFOUR;
        else
            return (fiveIdx << 8) | LEVEL_NOFREEFOUR;
    }
}



//--------------------- vcf ------------------------

const VCF_NODES_LEN = 6000000, // 3*2000000
    VCF_HASHTABLE_LEN = 1453950 + 9040000; //16155*90 + 226*40000
let vcfHashTable = [],
    vcfNextPosition = 0,
    vcfTransMoves = [],
    vcfNodes = [], //[0] = idx, [1]=down, [2]=right
    vcfNextNode = 0;
//vcfStackNodes = [],
//vcfStackIndex = -1,
//vcfInfoArray = new Array(1024);

function resetVCF() {
    vcfHashTable = new Array(VCF_HASHTABLE_LEN);
    vcfNextPosition = 1453950;
    for (let i = 0; i < 225; i++) { vcfTransMoves[i] = {}; };
    vcfNodes = new Array(VCF_NODES_LEN);
    vcfNextNode = 3;
    //vcfStackNodes = [];
    //vcfStackIndex = -1;
    //vcfInfoArray[0] = 0;
}

function vcfPositionPush(keyLen, keySum, position) {
    if (vcfNextPosition >= VCF_HASHTABLE_LEN) {
        //alert(`vcfPositionPush out`)
        return 0;
    }
    let key = keyLen * 16155 + keySum,
        pPosition = vcfHashTable[key];
    while (pPosition) {
        key = pPosition + 225;
        pPosition = vcfHashTable[key];
    }

    vcfHashTable[key] = vcfNextPosition;
    for (let i = 0; i < 225; i++) {
        vcfHashTable[vcfNextPosition + i] = position[i];
    }
    vcfNextPosition += 226;
    return vcfNextPosition;
}

function vcfPositionHas(keyLen, keySum, position) {
    let key = keyLen * 16155 + keySum,
        pPosition = vcfHashTable[key];
    while (pPosition) {
        let isEqual = true;
        for (let i = 0; i < 225; i++) {
            if (vcfHashTable[pPosition + i] != position[i]) {
                isEqual = false;
                break;
            }
        }
        if (isEqual) return true;
        key = pPosition + 225;
        pPosition = vcfHashTable[key];
    }
    return false;
}

function vcfNewNode(idx) {
    if (vcfNextNode >= VCF_NODES_LEN) {
        //alert(`vcfNewNode out : ${(vcfNextNode-1453950)/3}`)
        return 0;
    }
    else {
        vcfNodes[vcfNextNode] = idx;
        vcfNodes[vcfNextNode + 1] = 0;
        vcfNodes[vcfNextNode + 2] = 0;
        vcfNextNode += 3;
        return vcfNextNode - 3;
    }
}

function vcfTransTablePush(keyLen, keySum, position, moves) {
    if (keyLen < 37)
        pushFailMoves(vcfTransMoves, moves);
    else
        vcfPositionPush(keyLen, keySum, position);
}

function vcfTransTableHas(keyLen, keySum, position, moves) {
    if (keyLen < 37)
        return findMoves(vcfTransMoves, moves);
    else
        return vcfPositionHas(keyLen, keySum, position);
}

/*
function vcfAddRightNode(pNode, newNode) {
    vcfNodes[pNode+2] = newNode;
}

function vcfAddDownNode(pNode, newNode) {
    vcfNodes[pNode+1] = newNode;
}

function vcfStackPush() {
    
}

function vcfStackPop() {
    if (vcfStackIndex < 0) return 0;
    
}

function vcfStackCurrent() {
    
}
*/
function findVCF(arr, color) {
    //setCBoardSize(15)
    let initArr = arr.slice(0),
        sTime = new Date().getTime();
    let centerIdx = 112,
        colorIdx,
        nColorIdx,
        infoArr = new Array(225),
        moves = new Array(0),
        stackIdx = [-1, -1, 225, 225],
        sum = 0,
        done = false,
        pushMoveCount = 0,
        pushPositionCount = 0,
        pushCountByte = 0,
        hasCount = 0;
    resetVCF();
    while (!done) {
        nColorIdx = stackIdx.pop();
        colorIdx = stackIdx.pop();

        if (colorIdx > -1) {
            if (colorIdx < 225) {
                arr[colorIdx] = color;
                arr[nColorIdx] = INVERT_COLOR[color];
                moves.push(colorIdx);
                moves.push(nColorIdx);
                centerIdx = colorIdx;
                sum += colorIdx;
                stackIdx.push(-1, -1);
                //console.log(`[${moveIndexToName(moves, 500)}]\n [${stackIdx}]\n ${colorIdx}`);
                //console.warn(`${idxToName(vcfNodes[pCurrentNode])}`)
            }

            //console.info(`${idxToName(vcfNodes[vcfNodes[pCurrentNode + 2]])}`)
            if (vcfTransTableHas(moves.length / 2, sum, arr, moves) /*findMoves(vcfTransMoves, moves)*/ ) {
                hasCount++;
                //console.error(`[${moveIndexToName(moves, 500)}]`);
            }
            else {
                //console.log(`[${moveIndexToName(moves, 500)}]`);
                testFour(arr, color, infoArr);
                let nLevel = getLevel(arr, INVERT_COLOR[color]);
                if ((nLevel & 0xff) <= LEVEL_NOFREEFOUR) {
                    let end;
                    if ((nLevel & 0xff) == LEVEL_NOFREEFOUR) {
                        end = 1;
                        centerIdx = nLevel >> 8;
                    }
                    else {
                        end = 225;
                    }

                    for (let i = end - 1; i >= 0; i--) {
                        let idx = aroundIdx(centerIdx, i),
                            max = infoArr[idx] & FOUL_MAX;
                        if (max == FOUR_NOFREE) {

                            arr[idx] = color;
                            let level = getLevel(arr, color);
                            arr[idx] = 0;

                            if ((level & 0xff) == LEVEL_FREEFOUR) { //
                                //pueh VCF
                                post("vConsole", `[${moveIndexToName(moves.concat(idx), 500)}]`)
                                //console.warn(`[${moveIndexToName(moves.concat(idx), 500)}]`);
                                //pushFailMoves(vcfTransMoves, moves);
                                vcfTransTablePush(moves.length / 2, sum, arr, moves);
                                for (let j = moves.length - 1; j >= 0; j--) {
                                    stackIdx.push(-1);
                                }
                                stackIdx.push(-1, -1);
                                break;
                            }
                            else {
                                stackIdx.push(idx);
                                stackIdx.push(level >> 8);
                            }
                        }
                    }
                }
                //vcfNodes[pNode + 1]==0 && pushFailMoves(vcfTransMoves,moves)
            }
        }
        else {
            if (moves.length > 72) pushPositionCount++;
            else pushMoveCount++;
            pushCountByte += moves.length / (1024 * 1024);
            //pushFailMoves(vcfTransMoves, moves);
            vcfTransTablePush(moves.length / 2, sum, arr, moves);
            //console.info(`[${moves}]\n [${stackIdx}]\n ${colorIdx}`)
        }

        if (colorIdx == -1) { //back
            if (moves.length) {
                let idx = moves.pop();
                arr[idx] = 0;
                idx = moves.pop();
                arr[idx] = 0;
                sum -= idx;
            }
            else {
                done = true;
            }
            //console.info(`[${moveIndexToName(moves, 500)}]\n [${stackIdx}]\n ${colorIdx}`);
        }
        //done = done || pushMoveCount > 1000;
    }

    let isEq = true
    for (let i = 0; i < 225; i++) {
        if (arr[i] != initArr[i]) isEq = false;
    }
    "alert" in self && alert(`time = ${(new Date().getTime()-sTime)/1000}\nsum = ${sum}\n isEqArr = ${isEq}\npushMoveCount = ${pushMoveCount}\n pushPositionCount = ${pushPositionCount}\n pushCountByte = ${pushCountByte}M\nhasCount = ${hasCount}`)
    post("vConsole", `time = ${(new Date().getTime()-sTime)/1000}\nsum = ${sum}\n isEqArr = ${isEq}\npushMoveCount = ${pushMoveCount}\n pushPositionCount = ${pushPositionCount}\n pushCountByte = ${pushCountByte}M\nhasCount = ${hasCount}`)
}

//--------------------------------------------------

// 找活四级别杀
function findFFWin(arr, color, newarr) {
    let wPoint = [];
    let fPoint = findFourPoint(arr, color, newarr) || [];
    for (let i = fPoint.length - 1; i >= 0; i--) {
        let x = getX(fPoint[i]);
        let y = getY(fPoint[i]);
        if (isFFWin(x, y, color, arr)) {
            arr[y][x] = "*";
            arr[y][x] = 0;
            wPoint.push(fPoint[i] * 1);
            i = -1;
        }
    }
    return wPoint;
}



function findFFPoint(arr, color, newarr, setnum) {

    let count = 0;
    findFour(arr, color, newarr);
    for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 15; x++) {
            if (newarr[y][x] > 0) {
                if (isFF(x, y, color, arr)) {
                    newarr[y][x] = 1;
                    count++;
                }
                else {
                    newarr[y][x] = 0;
                }
            }
        }
    }
    if (setnum != null) {
        for (let y = 0; y < 15; y++) {
            for (let x = 0; x < 15; x++) {
                if (newarr[y][x] != 0) {
                    newarr[y][x] = setnum;
                }
            }
        }
    }
    return count;
}



// 找出正确的33点
function findTTPoint(arr, color, newarr, setnum) {

    let count = 0;
    findThree(arr, color, newarr);
    for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 15; x++) {
            if (newarr[y][x] > 0) {
                if (isTT(x, y, arr)) {
                    newarr[y][x] = 1;
                    count++;
                }
                else {
                    newarr[y][x] = 0;
                }
            }
        }
    }
    if (setnum != null) {
        for (let y = 0; y < 15; y++) {
            for (let x = 0; x < 15; x++) {
                if (newarr[y][x] != 0) {
                    newarr[y][x] = setnum;
                }
            }
        }
    }
    return count;
}



// 剪切 FailMoves 保存到 localStorage
function cutFailMoves(arrs, hash) {
    arrs = [];
    for (let i = 0; i < 225; i++) { arrs[i] = {}; };
    let len = 0;
    for (let i = 0; i < 225; i++) {
        for (let key in hash[i]) {
            let moves = hash[i][key];
            arrs[i][key] = [];
            for (let j = moves.length - 1; j >= 0; j--) {
                arrs[i][key].push(moves[j].slice(0));
                len += moves[j].length * 1.5;
                if (len > 1024 * 1024) return arrs;
            }
        }
    }
    return arrs;
}



function getMoveKey(move) {
    const MOVE_LEN = move.length;
    let sum = 0; // 对每一手棋索引求，保存到数组最后位置。
    for (let i = 0; i < MOVE_LEN; i += 2) {
        sum += move[i];
    }
    return sum;
}



// 会改变moves
// 添加失败分支
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