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

//--------------- lineInfo ------------------

const FREE = 1; //0b00000001
const MAX = 14; //0b00001110
const FOUL = 16; //0b00010000
const MAX_FREE = 15; //0b00001111
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
}

//--------------------  aroundPoint  ------------------------

// 设置idx为中心，保存周围点的坐标
function setAroundPoint(index, point, radius, idx) {
    let r = 1;
    let x = getX(idx);
    let y = getY(idx);
    let left;
    let top;
    let right;
    let under;
    index[0] = idx;
    point[0] = { "x": x, "y": y };
    radius[0] = 1;
    let count = 1;
    // 从里到外，绕圈搜索
    while (r <= 14) {
        // 搜索左右两边;
        left = x - r;
        right = x + r;
        top = (y - r) < 0 ? 0 : y - r;
        under = (y + r) > 14 ? 14 : y + r;
        if (left >= 0) {
            for (let i = top; i <= under; i++) {
                if (i < cBoardSize && left < cBoardSize) {
                    index[count] = i * 15 + left;
                    point[count] = { x: left, y: i };
                    count += 1;
                }
            }
        }
        if (right < 15) {
            for (let i = top; i <= under; i++) {
                if (i < cBoardSize && right < cBoardSize) {
                    index[count] = i * 15 + right;
                    point[count] = { x: right, y: i };
                    count += 1;
                }
            }
        }
        // 搜索上下两边;
        left = left < 0 ? 0 : left + 1;
        right = right > 14 ? 14 : right - 1;
        top = y - r;
        under = y + r;
        if (top >= 0) {
            for (let i = left; i <= right; i++) {
                if (i < cBoardSize && top < cBoardSize) {
                    index[count] = top * 15 + i;
                    point[count] = { x: i, y: top };
                    count += 1;
                }
            }
        }
        if (under < 15) {
            for (let i = left; i <= right; i++) {
                if (i < cBoardSize && under < cBoardSize) {
                    index[count] = under * 15 + i;
                    point[count] = { x: i, y: under };
                    count += 1;
                }
            }
        }
        radius[r] = count;
        r += 1;
    }
}

// 搜索米字线,半径内是否有棋子，不判断中心点
function around(arr, idx, radius) {
    let x = getX(idx);
    let y = getY(idx);
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j <= radius; j++) {
            let v = getArrValue(x, y, j, DIRECTIONS[i], arr);
            if (v == 1 || v == 2) return true;
            v = getArrValue(x, y, -j, DIRECTIONS[i], arr);
            if (v == 1 || v == 2) return true;
        }
    }
    return false;
}

// 围绕 idx 查找四周的点(包括idx),color=查找颜色，radius=辐射半径
function aroundFindPoint(arr, idx, radius = 7, continueFourFirst) {
    let P = [];
    let firstP = [];
    // 从里到外，绕圈搜索
    let Pnt = aroundPoint[idx];
    let max = Pnt.radius[radius] - 1;
    let x = getX(idx);
    let y = getY(idx);
    for (let i = 0; i < 225; i++) {
        if (arr[Pnt.point[i].y][Pnt.point[i].x] > 0) {
            if (continueFourFirst && (x == Pnt.point[i].x || y == Pnt.point[i].y || Math.abs(x - Pnt.point[i].x) == Math.abs(y - Pnt.point[i].y)) && i < Pnt.radius[4]) {
                firstP.unshift(Pnt.index[i]);
            }
            else {
                P.unshift(Pnt.index[i]);
            }
        }
        if (i == max && P.length > 2) { break; }
    }
    return P.concat(firstP);
}

//，保存周围点的坐标
// 创建二维数组，保存 0-224 个点周围点的坐标信息。
// 以H8 为例，H8周围的点坐标 保存在 aroundPoint[112]
// aroundPoint[112].index  ，aroundPoint[112].point,保存坐标信息
// aroundPoint[112].radius 搜索半径内 点 的个数。
let aroundPoint = [];
for (let i = 0; i < 225; i++) {
    aroundPoint[i] = { index: [], point: [], radius: [] };
    setAroundPoint(aroundPoint[i].index, aroundPoint[i].point, aroundPoint[i].radius, i);
}

//--------------------- idxLists ---------------------

// 创建空白lists 用来保存阳线，阴线的idx
function createEmptyLists() {
    let outIdx = 225,
        idxLists = new Array(4 * 29 * 43);
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 15; j++) {
            for (let k = 0; k < 15 + 28; k++) {
                idxLists[(i * 29 + j) * 43 + k] = outIdx;
            }
        }
    }

    for (let i = 2; i < 4; i++) {
        for (let j = 0; j < 15; j++) {
            for (let k = 0; k < 1 + 28 + j; k++) {
                idxLists[(i * 29 + j) * 43 + k] = outIdx;
            }
        }
        for (let j = 13; j >= 0; j--) {
            for (let k = 0; k < 1 + 28 + j; k++) {
                idxLists[(i * 29 + 28 - j) * 43 + k] = outIdx;
            }
        }
    }
    return idxLists;
}

//保存棋盘区域内每一条线的idx，每条线按照 line[n] < line[n+1] 排序
function createIdxLists(cBoardSize) {
    let List,
        idxLists = createEmptyLists();

    for (let y = 0; y < 15; y++) {
        List = y * 43;
        for (let x = 0; x < 15; x++) {
            if (x < cBoardSize && y < cBoardSize) idxLists[List + 14 + x] = x + y * 15;
        }
    }

    for (let x = 0; x < 15; x++) {
        List = (29 + x) * 43;
        for (let y = 0; y < 15; y++) {
            if (x < cBoardSize && y < cBoardSize) idxLists[List + 14 + y] = x + y * 15;
        }
    }

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

function idxLists2String() {
    let str = "";
    for (let i = 0; i < 4; i++) {
        str += `\n${A}:`;
        for (let j = 0; j < 29; j++) {
            str += `\n[${idxLists.slice((i*29+j)*43, (i*29+j)*43+43)}],`;
        }
    }
    return str;
}

let idxLists = createIdxLists(15);

//------------------------- idxTable ----------------------

// 创建索引表，快速读取阳线，阴线idx
function createIdxTable() {
    let tb = new Array(225 * 29 * 4);
    for (let idx = 0; idx < 225; idx++) {
        for (let move = -14; move < 15; move++) {
            for (let direction = 0; direction < 4; direction++) {
                let x = getX(idx),
                    y = getY(idx);
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
        }
    }

    return tb;
}

// 按照阳线，阴线读取idx
function moveIdx(idx, move, direction = 0) {
    return idxTable[(idx * 29 + move + 14) * 4 + direction]; // 7s
    /*
    let x = changeX(getX(idx),move, direction),  // 17s
        y = changeY(getY(idx),move, direction);
    
    if(x<0 || x>cBoardSize || y<0 || y>cBoardSize)
        return 225;
    else
        return y*15 + x;
    */
    /*
    let x = getX(idx),  // 23s
        y = getY(idx);
    
    switch (direction) {
        case 0:
            return idxLists[(direction*29 + y)*43 + 14 + x + move];
            break;
        case 1:
            return idxLists[(direction*29 + x)*43 + 14 + y + move];
            break;
        case 2:
            return idxLists[(direction*29 + x + 14 - y)*43 + (x + 14 - y < 15 ? 14 + x + move : 14 + y + move)];
            break;
        case 3:
            return idxLists[(direction*29 + x + y)*43 + (x + y < 15 ? 14 + y + move : 28 - x + move)];
            break;
    }
    */
}


let idxTable = createIdxTable();

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



/*
// return 5 || 0;
function testLineFive(idx, direction, color, arr) {
    let rt = 0,
        ov = arr[idx],
        emptyCount = 0,
        colorCount = 0,
        max = -1;
    arr[idx] = color;
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
            if (colorCount == 5) {
                if (gameRules == GOMOKU_RULES) {
                    rt = 5;
                    break;
                }
                else {
                    if (color != getArrValue(idx, move - 5, direction, arr) &&
                        color != getArrValue(idx, move + 1, direction, arr))
                    {
                        rt = 5;
                        break;
                    }
                }
            }
            v = getArrValue(idx, move - 4, direction, arr);
            if (v == 0) emptyCount--;
            else colorCount--;
        }
    }
    arr[idx] = ov;
    return rt;
}



function testLineFourGomoku(idx, direction, color, arr, ftype) {
    if (0 == getArrValue(idx, -4, direction, arr)) {
        if (0 == getArrValue(idx, 1, direction, arr))
            return free;
        else
            return normal;
    }
    else if (0 == getArrValue(idx, 0, direction, arr)) {
        if (0 == getArrValue(idx, -1, direction, arr))
            return free;
        else
            return normal;
    }
    return normal;
}

function testLineFourRenju(idx, direction, color, arr, ftype) {

}
*/

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

        while (stackIdx > -1) {//continue test doubleThree
            
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
            points[1 + points[0]++] = nIdx;
        }
    }
    points[0] = (lineInfo >> 8) & 7; //set freePoint num

    return points;
}

/*
function getBlockThree(idx, arr, info) {
    let rt = new Array(4),
        freeCount = (info >> 8) & 7,
        move = (info >> 5) & 7,
        direction = (info >> 12) & 7;
    for (let m = 0; m > -5; m--) {
        idx = moveIdx(idx, move + m, direction);
        if (0 == arr[idx]) {
            rt[1 + rt[0]++] = idx;
        }
    }
}
*/

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



// 返回进攻级别,完成后newarr保存有五连点的信息
function getLevel(arr, color, num) {
    num = typeof num == "number" ? parseInt(num) : 9999;
    if (isWin(color == 1 ? 2 : 1, arr)) return {
        level: -1,
        p: null
    };
    if (isWin(color, arr)) return {
        level: 5,
        p: null
    };
    if (num < 1) return {
        level: 0,
        p: null
    };
    let newarr = getArr2D([]);
    if (findFivePoint(arr, color, newarr)) {
        let count = 0;
        let p;
        for (let y = 0; y < 15; y++) {
            for (let x = 0; x < 15; x++) {
                if (newarr[y][x] > 0) {
                    count++;
                    if (count == 2) {
                        // p 保存冲4防点
                        return {
                            level: 4.5,
                            p: p
                        }; // 44 || 活4
                    }
                    p = {
                        "x": x,
                        "y": y
                    };
                }
            }
        }
        if (color == 2 && isFoul(p.x, p.y, arr)) return {
            level: 4.5,
            p: p

        }; //冲4抓
        return {
            level: 4,
            p: p
        }; // 单冲4
    }
    return num == 1 ? {
        level: 0,
        p: null
    } :
    {
        level: 2,
        p: null
    };
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
        name += `${i?"":""}${idxToName(moves[i])}`;
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



function findFivePoint(arr, color, newarr, setnum) {

    let count = 0;
    let fP = [];
    let nx;
    let ny;
    for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 15; x++) {
            for (let i = 0; i < 4; i++) {
                let pw = getPower(x, y, arr, DIRECTIONS[i], color);
                if (color == 2) {
                    if (pw == 4) {
                        let p = getNextEmpty(x, y, arr, DIRECTIONS[i], color);
                        newarr[p.y][p.x] += Math.pow(10, i);
                        if (fP.indexOf(p.y * 15 + p.x) == -1) fP.push(p.y * 15 + p.x);
                        count++;
                    }
                }
                else {
                    if (pw == 4) {
                        let p = getNextEmpty(x, y, arr, DIRECTIONS[i], color);
                        newarr[p.y][p.x] += Math.pow(10, i);
                        count++;
                        if (getArrValue(x, y, -1, DIRECTIONS[i], arr) == color || getArrValue(x, y, 5, DIRECTIONS[i], arr) == color) {
                            newarr[p.y][p.x] -= Math.pow(10, i);
                            count--;
                        }
                        else {
                            if (fP.indexOf(p.y * 15 + p.x) == -1) fP.push(p.y * 15 + p.x);
                        }
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
    return count ? fP : false;
}



// 以 idx 为中心查找 周围的五连,判断棋盘是否有 maxCount 个五连点。
function findFivePointB(idx, arr, color, maxCount) {

    let count = 0;
    let x;
    let y;
    maxCount = maxCount || 1;
    // idx为中心搜索
    for (let i = 0; i < 225; i++) {
        x = aroundPoint[idx].point[i].x;
        y = aroundPoint[idx].point[i].y;
        if (arr[y][x] == 0 && isFive(x, y, color, arr)) {
            count += 1;
            if (count == maxCount) {
                return true;
            }
        }
    }
    return false;
}



function findFour(arr, color, infoArr) {
    let emptyList = new Array(15),
        emptyMoves = new Array(15);
    for (let direction = 0; direction < 4; direction++) {
        let markArr = new Array(225),
            listStart = direction < 2 ? 0 : 15 - cBoardSize + 4,
            listEnd = direction < 2 ? listStart + 15 : listStart + cBoardSize * 2 - 9;
        for (let list = listStart; list < listEnd; list++) {
            let emptyCount = 0,
                colorCount = 0,
                moveStart = 14,
                moveEnd = direction < 2 ? moveStart + cBoardSize : list - listStart < cBoardSize - 4 ? moveStart + 5 + (list - listStart) : moveStart + 5 + ((cBoardSize - 5) * 2 - (list - listStart)),
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
                        //break;
                    }
                    else if (colorCount == 3) {
                        if (gameRules == RENJU_RULES && color == 1 &&
                            (color == arr[idxLists[pIdx - 5]] ||
                                color == arr[idxLists[pIdx + 1]]))
                        { //六腐形
                        }
                        else {
                            for (let e = emptyStart; e < emptyEnd; e++) {
                                if ((markArr[emptyList[e]] & 0x0e) < FOUR_NOFREE) {
                                    markArr[emptyList[e]] = ADD_MAX_COUNT | ((move - emptyMoves[e]) << 5) | FOUR_NOFREE;
                                }

                                if (markArr[emptyList[e]] & ADD_MAX_COUNT) {
                                    markArr[emptyList[e]] += 0x1000; //count++
                                }
                                markArr[emptyList[e]] = markArr[emptyList[e]] & 0x7fff;

                                if (markArr[emptyList[e]] & ADD_FREE_COUNT) {
                                    markArr[emptyList[e]] += 0x100; //free++
                                    markArr[emptyList[e]] |= ((move - emptyMoves[e]) << 5); //set markMove
                                }
                                markArr[emptyList[e]] |= ADD_FREE_COUNT;
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

        for (let i = 0; i < 225; i++) {
            let oldV = infoArr[i] & 0x1f,
                newV = markArr[i] & 0x1f;
            if (FIVE == newV) {
                infoArr[i] = markArr[i] & 0x8fff | (direction << 12);
            }
            else if (FOUR_NOFREE == newV) {
                //if (gameRules == RENJU_RULES && color == 1)
                infoArr[i] = markArr[i] & 0x8fff | (direction << 12);
            }
        }
    }
}



// 找四连点
function findFourPoint(arr, color, newarr, ftype, setnum, passFoul) {

    let count = 0;
    let fP = [];
    let free = ftype == ONLY_FREE ? true : ftype == ONLY_NOFREE ? false : null;
    findFour(arr, color, newarr);
    for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 15; x++) {
            if (newarr[y][x] > 0) {
                if (isFour(x, y, color, arr, free, passFoul)) {
                    newarr[y][x] = 1;
                    fP.push(y * 15 + x);
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
    return count ? fP : false;
}



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



// 找出可能的3连点
function findThree(arr, color, newarr) {

    let count = 0;
    let nx;
    let ny;
    for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 15; x++) {
            for (let i = 0; i < 4; i++) {
                let pw = getPower(x, y, arr, DIRECTIONS[i], color);
                if (color == 2) {
                    if (pw == 2) {
                        let p = getNextEmpty(x, y, arr, DIRECTIONS[i], color);
                        newarr[p.y][p.x] += Math.pow(10, i);
                        p = getNextEmpty(p.x, p.y, arr, DIRECTIONS[i], color, 1);
                        newarr[p.y][p.x] += Math.pow(10, i);
                        p = getNextEmpty(p.x, p.y, arr, DIRECTIONS[i], color, 1);
                        newarr[p.y][p.x] += Math.pow(10, i);
                    }
                    if (pw == 4) {
                        let p = getNextEmpty(x, y, arr, DIRECTIONS[i], color);
                        newarr[p.y][p.x] = -9999;
                    }
                }
                else {
                    if (pw == 2 && getArrValue(x, y, -1, DIRECTIONS[i], arr) != color && getArrValue(x, y, 5, DIRECTIONS[i], arr) != color) {
                        let p = getNextEmpty(x, y, arr, DIRECTIONS[i], color);
                        newarr[p.y][p.x] += Math.pow(10, i);
                        p = getNextEmpty(p.x, p.y, arr, DIRECTIONS[i], color, 1);
                        newarr[p.y][p.x] += Math.pow(10, i);
                        p = getNextEmpty(p.x, p.y, arr, DIRECTIONS[i], color, 1);
                        newarr[p.y][p.x] += Math.pow(10, i);
                    }
                    if (pw == 4 && getArrValue(x, y, -1, DIRECTIONS[i], arr) != color && getArrValue(x, y, 5, DIRECTIONS[i], arr) != color) {
                        let p = getNextEmpty(x, y, arr, DIRECTIONS[i], color);
                        newarr[p.y][p.x] = -9999;
                    }
                }
            }
        }
    }
}



// 找出正确的3连点
function findThreePoint(arr, color, newarr, ftype, setnum) {

    let count = 0;
    let P = [];
    findThree(arr, color, newarr);
    //console.log(newarr)
    let free = ftype == ONLY_FREE ? true : ftype == ONLY_NOFREE ? false : null;
    for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 15; x++) {
            if (newarr[y][x] > 0) {
                if (isThree(x, y, color, arr, free)) {
                    newarr[y][x] = 1;
                    P.push(y * 15 + x);
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
    //console.log(newarr)
    return count ? P : false;
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