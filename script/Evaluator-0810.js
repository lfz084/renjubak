"use strict";
if (self.SCRIPT_VERSION) self.SCRIPT_VERSION["Evaluator"] = "v0819.0";
const DIRECTIONS = ["x", "y", "d", "u"]; // 米字线
const ONLY_FREE = 1; // 只找活3，活4
const ONLY_NOFREE = 2; // 只找眠3，眠4
const ONLY_VCF = 1; // 只找做VCF点
const ONLY_SIMPLE_WIN = 2; // 只找43级别做杀点

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
                index[count] = i * 15 + left;
                point[count] = { x: left, y: i };
                count += 1;
            }
        }
        if (right < 15) {
            for (let i = top; i <= under; i++) {
                index[count] = i * 15 + right;
                point[count] = { x: right, y: i };
                count += 1;
            }
        }
        // 搜索上下两边;
        left = left < 0 ? 0 : left + 1;
        right = right > 14 ? 14 : right - 1;
        top = y - r;
        under = y + r;
        if (top >= 0) {
            for (let i = left; i <= right; i++) {
                index[count] = top * 15 + i;
                point[count] = { x: i, y: top };
                count += 1;
            }
        }
        if (under < 15) {
            for (let i = left; i <= right; i++) {
                index[count] = under * 15 + i;
                point[count] = { x: i, y: under };
                count += 1;
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
    getArr(arr);
    for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 15; x++) {
            arr[y][x] = arr2[y][x];
        }
    }
    return arr;
}

/*
// 把hash 数组压缩成 二维数组，减小JSON数据大小
function compressHash(arrs, hash) {
  arrs = [];
  for (let i=0; i<225; i++) {
    for (let key in hash[i]) {
      let moves = hash[i][key];
      for (let j=moves.length-1; j>=0; j--){
        arrs.push(moves[j]);
      }
    }
  }
  return arrs;
}

// 把二维数组解压成 hash数组
function unCompressHash(hash, arrs) {
  hash = [];
  
  for (let i=arrs.length-1; i>=0; i--) {
    let idx = arrs[i].length-1;
    let key = arrs[i][idx];
  }
  return hash;
}
*/




//判断冲四点是否抓禁，不判断黑棋是否有五连点
//x,y是白棋冲四点. 
function isCatchFoul(x, y, arr) {

    if (arr[y][x] != 0) return false;
    arr[y][x] = 2;
    let ch = false;
    let idx = getBlockFour(x, y, arr);
    if (idx != -1) {
        let tx = getX(idx);
        let ty = getY(idx);
        if (isFoul(tx, ty, arr)) ch = tx + ty * 15;
    }
    arr[y][x] = 0;
    return ch;

}

function isCatchFoul_Point(point, arr) {
    return isCatchFoul(point.x, point.y, arr);
}

function isCatchFoul_Idx(idx, arr) {
    return isCatchFoul(getX(idx), getY(idx), arr);
}




// 判断是否，已经五连胜
function isWin(color, arr) {

    for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 15; x++) {
            for (let i = 0; i < 4; i++) {
                let pw = getPower(x, y, arr, DIRECTIONS[i], color);
                if (pw == 5) {
                    if (color == 2) {
                        return true;
                    }
                    else if (getArrValue(x, y, -1, DIRECTIONS[i], arr) != color) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}


// 不判断对手是否五连
// 判断是否活四级别胜
function isFFWin(x, y, color, arr, pass = false) {
    let win = false;
    if (isFour(x, y, color, arr, true)) {
        win = true;
    }
    if (color == 2) {
        if (isFF(x, y, 2, arr) || isCatchFoul(x, y, arr)) {
            win = true;
        }
    }
    if (win && !pass) {
        let lvl = getLevel(arr, color == 1 ? 2 : 1);
        if (lvl.level >= 4) win = false;
    }
    return win;
}

function isFFWin_Point(point, color, arr, pass = false) {
    return isFFWin(point.x, point.y, color, arr, pass);
}

function isFFWin_Idx(idx, color, arr, pass = false) {
    return isFFWin(getX(idx), getY(idx), color, arr, pass);
}



// 不会验证x,y是否有棋子
//判断指定点，是否为禁点
function isFoul(x, y, arr) {
    if (arr[y][x] != 0) return false;
    if (isSix(x, y, 1, arr)) return true;
    if (isFF(x, y, 1, arr)) return true;
    if (isTT(x, y, arr)) return true;
    return false;
}

function isFoul_Point(point, arr) {
    return isFoul(point.x, point.y, arr);
}

function isFoul_Idx(idx, arr) {
    return isFoul(getX(idx), getY(idx), arr);
}



// 不会验证x,y是否有棋子
// 判断 x，y是否长连
function isSix(x, y, color, arr) {
    let ov = arr[y][x];
    arr[y][x] = color;
    let count = 0;
    for (let i = 0; i < 4; i++) { // 分别从4个方向判断
        if (count < 0 || (color == 2 && count > 0)) break;
        for (let j = 0; j > -5; j--) { // 分别判断这个点相关的5个 五
            let pw = getPower(x, y, arr, DIRECTIONS[i], color, j);
            if (color == 2) { // 白棋判断
                if (pw > 5) {
                    count = 1;
                    break;
                }
                // 五连 否定长连
                if (pw == 5 && getArrValue(x, y, j - 1, DIRECTIONS[i], arr) != color) {
                    count = -1;
                    break;
                }
            }
            else {
                if (pw > 5) {
                    count = 1;
                    continue;
                }
                if (pw == 5) {
                    if (getArrValue(x, y, j - 1, DIRECTIONS[i], arr) == color) {
                        count = 1;
                        continue;
                    }
                    else { // 五连 否定长连
                        count = -1;
                        break;
                    }
                }
            }
        }
    }
    arr[y][x] = ov;
    return count > 0 ? true : false;
}

function isSix_Point(point, color, arr) {
    return isSix(point.x, point.y, color, arr);
}

function isSix_Idx(idx, color, arr) {
    return isSix(getX(idx), getY(idx), color, arr);
}



// 不会验证x,y是否有棋子
function isLineSix(x, y, direction, color, arr) {
    let ov = arr[y][x];
    arr[y][x] = color;
    for (let i = -5; i < 1; i++) {
        let pw = getPower(x, y, arr, direction, color, i);
        if (pw == 6) { arr[y][x] = ov; return true; }
    }
    arr[y][x] = ov;
    return false;
}

function isLineSix_Point(point, direction, color, arr) {
    return isLineSix(point.x, point.y, direction, color, arr);
}

function isLineSix_Idx(idx, direction, color, arr) {
    return isLineSix(getX(idx), getY(idx), direction, color, arr);
}



// 不会验证x,y是否有棋子
// 判断x,y,点是否五连
function isFive(x, y, color, arr) {
    let ov = arr[y][x];
    arr[y][x] = color;
    let count = 0;
    for (let i = 0; i < 4; i++) {
        if (count > 0) break;
        for (let j = 0; j > -5; j--) {
            let pw = getPower(x, y, arr, DIRECTIONS[i], color, j);
            if (color == 2) { // 白棋
                if (pw >= 5) {
                    count = 1;
                    break;
                }
            }
            else { //黑棋
                if (pw == 5 && getArrValue(x, y, j - 1, DIRECTIONS[i], arr) != color) {
                    count = 1;
                    break;
                }
            }
        }
    }
    arr[y][x] = ov;
    return count > 0 ? true : false;
}

function isFive_Point(point, color, arr) {
    return isFive(point.x, point.y, color, arr);
}

function isFive_Idx(idx, color, arr) {
    return isFive(getX(idx), getY(idx), color, arr);
}



// 不会验证x,y是否有棋子
function isFour(x, y, color, arr, free, passFoul) {
    let ov = arr[y][x];
    arr[y][x] = color;
    let count = 0;
    let isfree = false;
    for (let i = 0; i < 4; i++) {
        if (count < 0) break;
        let isf = false;
        for (let j = 0; j > -5; j--) {
            let pw = getPower(x, y, arr, DIRECTIONS[i], color, j);
            if (color == 2) { //白棋
                if (pw == 4) {
                    if ((getArrValue(x, y, j, DIRECTIONS[i], arr) == 0 && getArrValue(x, y, j + 5, DIRECTIONS[i], arr) == 0) || (getArrValue(x, y, j + 4, DIRECTIONS[i], arr) == 0 && getArrValue(x, y, j - 1, DIRECTIONS[i], arr) == 0)) {
                        isfree = true;
                    }
                    count = 1;
                    continue;
                }
                if (pw >= 5) { // 五连排除4
                    count = -1;
                    break;
                }
            }
            else { //黑棋
                if (pw == 4 && getArrValue(x, y, j - 1, DIRECTIONS[i], arr) != color && getArrValue(x, y, j + 5, DIRECTIONS[i], arr) != color) {
                    if (isLineFF(x, y, DIRECTIONS[i], color, arr)) {
                        count = -1;
                        break;
                    }
                    else { // 确认是黑 ，4连点
                        if ((getArrValue(x, y, j, DIRECTIONS[i], arr) == 0 && getArrValue(x, y, j + 5, DIRECTIONS[i], arr) == 0 && getArrValue(x, y, j + 6, DIRECTIONS[i], arr) != color) || (getArrValue(x, y, j + 4, DIRECTIONS[i], arr) == 0 && getArrValue(x, y, j - 1, DIRECTIONS[i], arr) == 0 && getArrValue(x, y, j - 2, DIRECTIONS[i], arr) != color)) {
                            isfree = true;
                        }
                        isf = true;
                    }
                }
                if (pw >= 5) { // 五连，长连排除4
                    count = -1;
                    break;
                }
            }

        }
        count = isf ? count + 1 : count;
    }
    arr[y][x] = ov;
    if (count == 1 && color == 1) { //黑棋
        // 禁手排除4
        // 已经排除所有  44;
        count = (!passFoul && (isSix(x, y, 1, arr) || isTT(x, y, arr))) ? 0 : 1;
    }
    if (free == true) {
        return (count == 1 && isfree == true) ? true : false;
    }
    else if (free == false) {
        return (count == 1 && isfree == false) ? true : false;
    }
    else {
        return count == 1 ? true : false;
    }
}

function isFour_Point(point, color, arr, free, passFoul) {
    return isFour(point.x, point.y, color, arr, free, passFoul);
}

function isFour_Idx(idx, color, arr, free, passFoul) {
    return isFour(getX(idx), getY(idx), color, arr, free, passFoul);
}



function isLineFive(x, y, direction, color, arr) {
    let ov = arr[y][x];
    arr[y][x] = color;
    let count = 0;
    for (let j = 0; j > -5; j--) {
        let pw = getPower(x, y, arr, direction, color, j);
        if (color == 2) { // 白棋
            if (pw >= 5) {
                count = 1;
                break;
            }
        }
        else { //黑棋
            if (pw == 5 && getArrValue(x, y, j - 1, direction, arr) != color) {
                count = 1;
                break;
            }
        }
    }
    arr[y][x] = ov;
    return count > 0 ? true : false;
}

function isLineFive_Point(point, direction, color, arr) {
    return isLineFive(point.x, point.y, direction, color, arr);
}

function isLineFive_Idx(idx, direction, color, arr) {
    return isLineFive(getX(idx), getY(idx), direction, color, arr);
}



// 不会验证x,y是否有棋子
// 辅助判断33禁，x,y,点在 direction指定这条线上是不是一个冲4点,活4
function isLineFour(x, y, direction, color, arr, free, pass) {
    let ov = arr[y][x];
    arr[y][x] = color;
    let isf = 0;
    if (color == 2) { // 判断白棋
        for (let i = 0; i > -5; i--) {
            let pw = getPower(x, y, arr, direction, color, i);
            if (pw == 4) {
                if ((getArrValue(x, y, i, direction, arr) == 0 && getArrValue(x, y, i + 5, direction, arr) == 0) || (getArrValue(x, y, i + 4, direction, arr) == 0 && getArrValue(x, y, i - 1, direction, arr) == 0)) {
                    isf += free == false ? 0 : 1;
                }
                else {
                    isf += free == true ? 0 : 1;
                }

            }
            if (pw > 4) { isf -= 99; break; }
        }
    }
    else { // 判断黑棋
        for (let i = 0; i > -5; i--) {
            let pw = getPower(x, y, arr, direction, color, i);
            if (pw == 4 && getArrValue(x, y, i - 1, direction, arr) != color && getArrValue(x, y, i + 5, direction, arr) != color) {
                if ((getArrValue(x, y, i, direction, arr) == 0 && getArrValue(x, y, i + 5, direction, arr) == 0 && getArrValue(x, y, i + 6, direction, arr) != color) || (getArrValue(x, y, i + 4, direction, arr) == 0 && getArrValue(x, y, i - 1, direction, arr) == 0 && getArrValue(x, y, i - 2, direction, arr) != color)) {
                    isf += free == false ? 0 : 1;
                }
                else {
                    isf += free == true ? 0 : 1;
                }
            } // 五连以上否定冲4
            if (pw > 4) { isf -= 99; break; }
        }
    }
    arr[y][x] = ov;
    if (isf && !pass) { //五连，禁手排除4
        if (isFive(x, y, color, arr)) { isf -= 99; }
        if (color == 1) {
            if (isFoul(x, y, arr)) { isf -= 99; }
        }
    }
    return isf > 0;
}

function isLineFour_Point(point, direction, color, arr, free, pass) {
    return isLineFour(point.x, point.y, direction, color, arr, free, pass);
}

function isLineFour_Idx(idx, direction, color, arr, free, pass) {
    return isLineFour(getX(idx), getY(idx), direction, color, arr, free, pass);
}

function isLineFourNode(x, y, direction, arr, free, pass, node) {
    let color = 1;
    let ov = arr[y][x];
    arr[y][x] = color;
    let isf = 0;
    let nd = node;
    nd.lines = nd.lines || [];
    let line;
    for (let i = 0; i > -5; i--) {
        let pw = getPower(x, y, arr, direction, color, i);
        if (pw == 4 && getArrValue(x, y, i - 1, direction, arr) != color && getArrValue(x, y, i + 5, direction, arr) != color) {
            nd.txt = EMOJI_ROUND_FOUR;
            let freeFoulStart = getArrIndex(x, y, i - 1, direction, arr);
            let freeFoulEnd = getArrIndex(x, y, i + 5, direction, arr);
            line = {
                start: getArrIndex(x, y, i, direction, arr),
                end: getArrIndex(x, y, i + 4, direction, arr),
                color: "blue",
                type: "four",
                direction: direction,
            };
            if ((getArrValue(x, y, i, direction, arr) == 0 && getArrValue(x, y, i + 5, direction, arr) == 0 && getArrValue(x, y, i + 6, direction, arr) != color) || (getArrValue(x, y, i + 4, direction, arr) == 0 && getArrValue(x, y, i - 1, direction, arr) == 0 && getArrValue(x, y, i - 2, direction, arr) != color)) {
                if (getArrValue(x, y, i, direction, arr) == 0) {
                    line.end = freeFoulEnd;
                }
                else {
                    line.start = freeFoulStart;
                }
                isf += free == false ? 0 : 1;
            }
            else {
                isf += free == true ? 0 : 1;
            }
        } // 五连以上否定冲4
        if (pw > 4) { isf -= 99; break; }
    }
    arr[y][x] = ov;
    if (isf && !pass) { //五连，禁手排除4
        if (isFive(x, y, color, arr)) { isf -= 99; }
        if (color == 1) {
            if (isFoulNode(x, y, arr, nd)) { isf -= 99; }
        }
    }
    line.color = isf > 0 ? "red" : line.color;
    line.type = isf > 0 ? "freeFour" : "four";
    nd.txtColor = line.color == "red" ? "red" : undefined;
    if (nd.lines.length == 0 && line) nd.lines.push(line);
    return isf > 0;
}



// 不会验证x,y是否有棋子
//判断 x,y 是否44
function isFF(x, y, color, arr) {
    let ov = arr[y][x];
    arr[y][x] = color;
    let count = 0;
    for (let j = 0; j < 4; j++) {
        if (count < 0) break; // 五连排除了44，退出
        let isf = false;
        if (color == 2) { // 判断白棋
            for (let i = 0; i > -5; i--) {
                let pw = getPower(x, y, arr, DIRECTIONS[j], color, i);
                //if (DIRECTIONS[j]=="u") //console.log (pw)
                if (pw == 4) {
                    if (isLineFF(x, y, DIRECTIONS[j], color, arr)) {
                        count = 2;
                    }
                    else {
                        isf = true;
                    }
                } // 五连以上否定冲44
                if (pw > 4) { count = -2; break; }
            }
        }
        else { // 判断黑棋
            for (let i = 0; i > -5; i--) {
                let pw = getPower(x, y, arr, DIRECTIONS[j], color, i);
                if (pw == 4 && getArrValue(x, y, i - 1, DIRECTIONS[j], arr) != color && getArrValue(x, y, i + 5, DIRECTIONS[j], arr) != color) {
                    if (isLineFF(x, y, DIRECTIONS[j], color, arr)) {
                        count = 2;
                    }
                    else {
                        isf = true;
                    }
                } // 五连否定冲44
                if (pw == 5 && getArrValue(x, y, i - 1, DIRECTIONS[j], arr) != color) {
                    count = -2;
                    break;
                }
            }
        }
        count += isf ? 1 : 0;
    }
    arr[y][x] = ov;
    return count > 1 ? true : false;
}

function isFF_Point(point, color, arr) {
    return isFF(point.x, point.y, color, arr);
}

function isFF_Idx(idx, color, arr) {
    return isFF(getX(idx), getY(idx), color, arr);
}



// 不会验证x,y是否有棋子
function isThree(x, y, color, arr, free) {
    let ov = arr[y][x];
    arr[y][x] = color;
    let count = 0; // 任意3计数
    let countf = 0; // 活3计数
    let isf = false;
    for (let i = 0; i < 4; i++) {
        if (count < 0) break;
        isf = false;
        for (let j = 0; j > -5; j--) {
            let pw = getPower(x, y, arr, DIRECTIONS[i], color, j)
            if (color == 2) {
                if (pw == 3) {
                    count++;
                    if (getArrValue(x, y, j, DIRECTIONS[i], arr) == 0) {
                        if (getArrValue(x, y, j + 4, DIRECTIONS[i], arr) == 0 && (getArrValue(x, y, j + 5, DIRECTIONS[i], arr) == 0 || getArrValue(x, y, j - 1, DIRECTIONS[i], arr) == 0)) {
                            isf = true;
                        }
                        else if (getArrValue(x, y, j + 5, DIRECTIONS[i], arr) == 0) {
                            isf = true;
                        }
                    }
                    else if (getArrValue(x, y, j + 4, DIRECTIONS[i], arr) == 0 && getArrValue(x, y, j - 1, DIRECTIONS[i], arr) == 0) {
                        isf = true;
                    }
                    continue;
                } // 四连以上排除

                if (pw >= 4) {
                    count = -1;
                    break;
                }
            }
            else {
                if (pw == 3) {
                    count++;
                    if (getArrValue(x, y, j, DIRECTIONS[i], arr) == 0) {
                        if (getArrValue(x, y, j + 4, DIRECTIONS[i], arr) == 0) {
                            let p = getNextEmpty(x, y, arr, DIRECTIONS[i], 1, j);
                            if (isLineFour(p.x, p.y, DIRECTIONS[i], color, arr, true)) {
                                isf = true;
                            }
                            p = getNextEmpty(x, y, arr, DIRECTIONS[i], 1, j + 4);
                            if (isLineFour(p.x, p.y, DIRECTIONS[i], color, arr, true)) {
                                isf = true;
                            }
                        }
                        else {
                            let p = getNextEmpty(x, y, arr, DIRECTIONS[i], 1, j + 1);
                            if (isLineFour(p.x, p.y, DIRECTIONS[i], color, arr, true)) {
                                isf = true;
                            }
                        }
                    }
                    else if (getArrValue(x, y, j + 4, DIRECTIONS[i], arr) == 0) {
                        let p = getNextEmpty(x, y, arr, DIRECTIONS[i], j + 1);
                        if (isLineFour(p.x, p.y, DIRECTIONS[i], color, arr, true)) {
                            isf = true;
                        }
                    }
                } // 四连以上排除

                if ((pw >= 5) || (pw == 4 && getArrValue(x, y, j - 1, DIRECTIONS[i], arr) != color && getArrValue(x, y, j + 5, DIRECTIONS[i], arr) != color)) {
                    count = -1;
                    break;
                }
            }
        }
        countf += isf ? 1 : 0;
    }
    arr[y][x] = ov;
    if (color == 1) { // 黑棋33，否定3连
        count = countf > 1 ? -1 : count;
        //console.log("countf=" + countf)
    }
    //console.log("count=" +count + "   countf=" +countf)
    return free === true ? (count > 0 && countf > 0) : free === false ? (count > 0 && countf == 0) : count > 0;
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
    let color = 1;
    //五连否定33
    //if (isFive(x, y, color, arr)) return false;
    let ov = arr[y][x];
    arr[y][x] = color;
    let count = 0;
    // 先搜索33形状
    for (let i = 0; i < 4; i++) {
        if (count < 0) break;
        for (let j = 0; j > -5; j--) {
            let pw = getPower(x, y, arr, DIRECTIONS[i], color, j)

            if (pw == 3) {
                if (getArrValue(x, y, j, DIRECTIONS[i], arr) == 0) {
                    if (getArrValue(x, y, j - 1, DIRECTIONS[i], arr) != color && getArrValue(x, y, j + 5, DIRECTIONS[i], arr) != color) {
                        count++;
                        break;
                        //continue;
                    }
                }
            } // 五连排除33
            if (pw == 5 && getArrValue(x, y, j - 1, DIRECTIONS[i], arr) != color && getArrValue(x, y, j + 5, DIRECTIONS[i], arr) != color) {
                count = -1;
                break;
            }
        }
    }
    if (count < 2) {
        arr[y][x] = ov;
        return false;
    }
    else {
        count = 0; // 确认有了33形状，进一步判断是否是活3，count累计活3个数
        for (let i = 0; i < 4; i++) {
            // 从4个方向判断是否活3，是就计数
            if (isLineThree(x, y, DIRECTIONS[i], 1, arr, true)) {
                count++;
            }
            if (count > 1) break;
        }
        arr[y][x] = ov;
        // 累计够两个活3，确认是33
        return count > 1 ? true : false;
    }
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
    let ov = arr[y][x];
    arr[y][x] = color;
    let isf = false;
    let isfree = false;
    if (color == 2) { // 判断白棋
        for (let i = 0; i > -5; i--) {
            let pw = getPower(x, y, arr, direction, color, i);
            if (pw == 3) {
                isf = true;
                if (getArrValue(x, y, i, direction, arr) == 0) {
                    if (getArrValue(x, y, i + 4, direction, arr) == 0 && (getArrValue(x, y, i + 5, direction, arr) == 0 || getArrValue(x, y, i - 1, direction, arr) == 0)) {
                        isfree = true;
                        break;
                    }
                    else if (getArrValue(x, y, i + 5, direction, arr) == 0) {
                        isfree = true;
                        break;
                    }
                }
                else if (getArrValue(x, y, i + 4, direction, arr) == 0 && getArrValue(x, y, i - 1, direction, arr) == 0) {
                    isfree = true;
                    break;
                }
            }
            if (pw >= 4) { isf = false; break; }
        }
    }
    else { // 判断黑棋
        for (let i = 0; i > -5; i--) {
            let pw = getPower(x, y, arr, direction, color, i);
            if (pw == 3 && getArrValue(x, y, i - 1, direction, arr) != color && getArrValue(x, y, i + 5, direction, arr) != color) {
                isf = true;
                if (getArrValue(x, y, i, direction, arr) == 0) {
                    if (getArrValue(x, y, i + 4, direction, arr) == 0) {
                        let p = getNextEmpty(x, y, arr, direction, 1, i);
                        if (isLineFour(p.x, p.y, direction, color, arr, true)) {
                            isfree = true;
                            break;
                        }
                        p = getNextEmpty(x, y, arr, direction, 1, i + 4);
                        if (isLineFour(p.x, p.y, direction, color, arr, true)) {
                            isfree = true;
                            break;
                        }
                    }
                    else {
                        let p = getNextEmpty(x, y, arr, direction, 1, i + 1);
                        if (isLineFour(p.x, p.y, direction, color, arr, true)) {
                            isfree = true;
                            break;
                        }
                    }
                }
                else if (getArrValue(x, y, i + 4, direction, arr) == 0) {
                    let p = getNextEmpty(x, y, arr, direction, 1, i + 1);
                    if (isLineFour(p.x, p.y, direction, color, arr, true)) {
                        isfree = true;
                        break;
                    }
                }
            } // 4以上否定活3
            if (pw >= 4) { isf = false; break; }
        }
    }
    arr[y][x] = ov;
    return free === true ? (isfree && isf) : (!isfree && isf);
}

function isLineThree_Point(point, direction, color, arr, free) {
    return isLineThree(point.x, point.y, direction, color, arr, free);
}

function isLineThree_Idx(idx, direction, color, arr, free) {
    return isLineThree(getX(idx), getY(idx), direction, color, arr, free);
}

function isLineThreeNode(x, y, direction, arr, free, node) {
    let color = 1;
    let ov = arr[y][x];
    arr[y][x] = color;
    let isf = false;
    let isfree = false;
    let nd;
    let line;
    let LINEIDX = node.lines.length;
    for (let i = 0; i > -5; i--) {
        let pw = getPower(x, y, arr, direction, color, i);
        if (pw == 3 && getArrValue(x, y, i - 1, direction, arr) != color && getArrValue(x, y, i + 5, direction, arr) != color) {
            isf = true;
            line = {
                start: getArrIndex(x, y, i, direction, arr),
                end: line ? line.end : getArrIndex(x, y, i + 4, direction, arr),
                color: "blue",
                type: "three",
                direction: direction,
            };
            let ed = line.end;
            if (getArrValue(x, y, i, direction, arr) == 0) {
                if (getArrValue(x, y, i + 4, direction, arr) == 0) {
                    let p = getNextEmpty(x, y, arr, direction, 1, i);
                    nd = new Node(p.x + p.y * 15, node);
                    node.childNode.push(nd);
                    if (isLineFourNode(p.x, p.y, direction, arr, true, undefined, nd)) {
                        isfree = true;
                        nd.txt = EMOJI_ROUND_FOUR;
                        line = getLine(p.x + p.y * 15, 1, direction, arr, undefined, "freeThree");
                        line.end = ed;
                        node.lines[LINEIDX] = line;
                        break;
                    }
                    p = getNextEmpty(x, y, arr, direction, 1, i + 4);
                    nd = new Node(p.x + p.y * 15, node);
                    node.childNode.push(nd);
                    if (isLineFourNode(p.x, p.y, direction, arr, true, undefined, nd)) {
                        isfree = true;
                        nd.txt = EMOJI_ROUND_FOUR;
                        line = getLine(p.x + p.y * 15, 1, direction, arr, undefined, "freeThree");
                        line.end = ed;
                        node.lines[LINEIDX] = line;
                        break;
                    }
                }
                else {
                    let p = getNextEmpty(x, y, arr, direction, 1, i + 1);
                    nd = new Node(p.x + p.y * 15, node);
                    node.childNode.push(nd);
                    if (isLineFourNode(p.x, p.y, direction, arr, true, undefined, nd)) {
                        isfree = true;
                        nd.txt = EMOJI_ROUND_FOUR;
                        line = getLine(p.x + p.y * 15, 1, direction, arr, undefined, "freeThree");
                        line.end = ed;
                        node.lines[LINEIDX] = line;
                        break;
                    }
                }
            }
            else if (getArrValue(x, y, i + 4, direction, arr) == 0) {
                let p = getNextEmpty(x, y, arr, direction, 1, i + 1);
                nd = new Node(p.x + p.y * 15, node);
                node.childNode.push(nd);
                if (isLineFourNode(p.x, p.y, direction, arr, true, undefined, nd)) {
                    isfree = true;
                    nd.txt = EMOJI_ROUND_FOUR;
                    line = getLine(p.x + p.y * 15, 1, direction, arr, undefined, "freeThree");
                    line.end = ed;
                    node.lines[LINEIDX] = line;
                    break;
                }
            }
            node.lines[LINEIDX] = line;
        } // 4以上否定活3
        if (pw >= 4) { isf = false; break; }
    }
    arr[y][x] = ov;
    return free === true ? (isfree && isf) : (!isfree && isf);
}



// 不会验证x,y是否有棋子
// x,y,点在direction指定这条线上面是否为2
function isLineTwo(x, y, direction, color, arr, free) {
    let ov = arr[y][x];
    arr[y][x] = color;
    let isf = false;
    let isfree = false;
    for (let i = 0; i > -5; i--) {
        let pw = getPower(x, y, arr, direction, color, i);
        if (pw == 2) {
            isf = true;
            if (!getArrValue(x, y, i, direction, arr) || !getArrValue(x, y, i + 4, direction, arr)) {
                let st = -1;
                let end = -1;
                for (let j = 0; j < 5; j++) {
                    if (getArrValue(x, y, i + j, direction, arr) == color) {
                        if (st == -1) {
                            st = j;
                        }
                        else {
                            end = j;
                            break;
                        }
                    }
                }
                let p;
                switch (end - st) {
                    case 1:
                        p = getNextEmpty(x, y, arr, direction, color, i + st - 2);
                        if (p.x != -1 && isLineThree(p.x, p.y, direction, color, arr, true)) {
                            isfree = true;
                            i = -9999;
                            break;
                        }
                        p = getNextEmpty(x, y, arr, direction, color, i + st - 1);
                        if (p.x != -1 && isLineThree(p.x, p.y, direction, color, arr, true)) {
                            isfree = true;
                            i = -9999;
                            break;
                        }
                        p = getNextEmpty(x, y, arr, direction, color, i + st + 2);
                        if (p.x != -1 && isLineThree(p.x, p.y, direction, color, arr, true)) {
                            isfree = true;
                            i = -9999;
                            break;
                        }
                        p = getNextEmpty(x, y, arr, direction, color, i + st + 3);
                        if (p.x != -1 && isLineThree(p.x, p.y, direction, color, arr, true)) {
                            isfree = true;
                            i = -9999;
                            break;
                        }
                        break;
                    case 2:
                        p = getNextEmpty(x, y, arr, direction, color, i + st - 1);
                        if (p.x != -1 && isLineThree(p.x, p.y, direction, color, arr, true)) {
                            isfree = true;
                            i = -9999;
                            break;
                        }
                        p = getNextEmpty(x, y, arr, direction, color, i + st + 1);
                        if (p.x != -1 && isLineThree(p.x, p.y, direction, color, arr, true)) {
                            isfree = true;
                            i = -9999;
                            break;
                        }
                        p = getNextEmpty(x, y, arr, direction, color, i + st + 3);
                        if (p.x != -1 && isLineThree(p.x, p.y, direction, color, arr, true)) {
                            isfree = true;
                            i = -9999;
                            break;
                        }
                        break;
                    case 3:
                        p = getNextEmpty(x, y, arr, direction, color, i + st + 1);
                        if (p.x != -1 && isLineThree(p.x, p.y, direction, color, arr, true)) {
                            isfree = true;
                            i = -9999;
                            break;
                        }
                        p = getNextEmpty(x, y, arr, direction, color, i + st + 2);
                        if (p.x != -1 && isLineThree(p.x, p.y, direction, color, arr, true)) {
                            isfree = true;
                            i = -9999;
                            break;
                        }
                        break;
                }
            }
        }
        if (pw >= 3) { isf = false; break; }
    }
    arr[y][x] = ov;
    return free === true ? (isfree && isf) : (!isfree && isf);
}


function isLineTwo_Point(point, direction, color, arr, free) {
    return isLineTwo(point.x, point.y, direction, color, arr, free);
}


function isLineTwo_Idx(idx, direction, color, arr, free) {
    return isLineTwo(getX(idx), getY(idx), direction, color, arr, free);
}


// 不会验证x,y是否有棋子
// 判断是否是一条线上的44,不判断x，y是否五连
function isLineFF(x, y, direction, color, arr) {
    let st = 0;
    let ed = 0;
    let i;
    for (i = -1; i > -4; i--) {
        if (getArrValue(x, y, i, direction, arr) != color) {
            break;
        }
    }
    st = i + 1;
    for (i = 1; i < 4 + st; i++) {
        if (getArrValue(x, y, i, direction, arr) != color) {
            break;
        }
    }
    ed = i - 1;
    //console.log("st="+ st + "   ed=" + ed)
    switch (ed - st) {
        case 0:
            if (getArrValue(x, y, -4, direction, arr) == color && getArrValue(x, y, 4, direction, arr) == color && getArrValue(x, y, -3, direction, arr) == color && getArrValue(x, y, 3, direction, arr) == color && getArrValue(x, y, -2, direction, arr) == color && getArrValue(x, y, 2, direction, arr) == color && getArrValue(x, y, -1, direction, arr) == 0 && getArrValue(x, y, 1, direction, arr) == 0) {
                if (color == 2) return true;
                if (getArrValue(x, y, -5, direction, arr) != color && getArrValue(x, y, 5, direction, arr) != color) {
                    return true;
                }
            }
            break;
        case 1:
            if (getArrValue(x, y, -3 + st, direction, arr) == color && getArrValue(x, y, 3 + ed, direction, arr) == color && getArrValue(x, y, -2 + st, direction, arr) == color && getArrValue(x, y, 2 + ed, direction, arr) == color && getArrValue(x, y, -1 + st, direction, arr) == 0 && getArrValue(x, y, 1 + ed, direction, arr) == 0) {
                if (color == 2) return true;
                if (getArrValue(x, y, -4 + st, direction, arr) != color && getArrValue(x, y, 4 + ed, direction, arr) != color) {
                    return true;
                }
            }
            break;
        case 2:
            if (getArrValue(x, y, -2 + st, direction, arr) == color && getArrValue(x, y, 2 + ed, direction, arr) == color && getArrValue(x, y, -1 + st, direction, arr) == 0 && getArrValue(x, y, 1 + ed, direction, arr) == 0) {
                if (color == 2) return true;
                if (getArrValue(x, y, -3 + st, direction, arr) != color && getArrValue(x, y, 3 + ed, direction, arr) != color) {
                    return true;
                }
            }
            break;
        case 3:
    }
    return false;
}

function isLineFF_Point(point, direction, color, arr) {
    return isLineFF(point.x, point.y, direction, color, arr);
}

function isLineFF_Idx(idx, direction, color, arr) {
    return isLineFF(getX(idx), getY(idx), direction, color, arr);
}

function isLineFFNode(x, y, direction, arr, node, LINEIDX) {
    let color = 1;
    let st = 0;
    let ed = 0;
    let i;
    for (i = -1; i > -4; i--) {
        if (getArrValue(x, y, i, direction, arr) != color) {
            break;
        }
    }
    st = i + 1;
    for (i = 1; i < 4 + st; i++) {
        if (getArrValue(x, y, i, direction, arr) != color) {
            break;
        }
    }
    ed = i - 1;
    //console.log("st="+ st + "   ed=" + ed)
    switch (ed - st) {
        case 0:
            if (getArrValue(x, y, -4, direction, arr) == color && getArrValue(x, y, 4, direction, arr) == color && getArrValue(x, y, -3, direction, arr) == color && getArrValue(x, y, 3, direction, arr) == color && getArrValue(x, y, -2, direction, arr) == color && getArrValue(x, y, 2, direction, arr) == color && getArrValue(x, y, -1, direction, arr) == 0 && getArrValue(x, y, 1, direction, arr) == 0) {
                if (getArrValue(x, y, -5, direction, arr) != color && getArrValue(x, y, 5, direction, arr) != color) {
                    node.txt = EMOJI_FOUL;
                    node.lines[LINEIDX] = {
                        start: getArrIndex(x, y, -4, direction, arr),
                        end: getArrIndex(x, y, 4, direction, arr),
                        color: "red",
                        type: "lineFF",
                        direction: direction,
                    };
                    return true;
                }
            }
            break;
        case 1:
            if (getArrValue(x, y, -3 + st, direction, arr) == color && getArrValue(x, y, 3 + ed, direction, arr) == color && getArrValue(x, y, -2 + st, direction, arr) == color && getArrValue(x, y, 2 + ed, direction, arr) == color && getArrValue(x, y, -1 + st, direction, arr) == 0 && getArrValue(x, y, 1 + ed, direction, arr) == 0) {
                if (getArrValue(x, y, -4 + st, direction, arr) != color && getArrValue(x, y, 4 + ed, direction, arr) != color) {
                    node.txt = EMOJI_FOUL;
                    node.lines[LINEIDX] = {
                        start: getArrIndex(x, y, -3 + st, direction, arr),
                        end: getArrIndex(x, y, 3 + ed, direction, arr),
                        color: "red",
                        type: "lineFF",
                        direction: direction,
                    };
                    return true;
                }
            }
            break;
        case 2:
            if (getArrValue(x, y, -2 + st, direction, arr) == color && getArrValue(x, y, 2 + ed, direction, arr) == color && getArrValue(x, y, -1 + st, direction, arr) == 0 && getArrValue(x, y, 1 + ed, direction, arr) == 0) {
                if (getArrValue(x, y, -3 + st, direction, arr) != color && getArrValue(x, y, 3 + ed, direction, arr) != color) {
                    node.txt = EMOJI_FOUL;
                    node.lines[LINEIDX] = {
                        start: getArrIndex(x, y, -2 + st, direction, arr),
                        end: getArrIndex(x, y, 2 + ed, direction, arr),
                        color: "red",
                        type: "lineFF",
                        direction: direction,
                    };
                    return true;
                }
            }
            break;
        case 3:
    }
    return false;
}



function getLine(idx, color, direction, arr, lineColor = "red", lineType) {
    let start, end;
    for (start = -1; start > -9; start--) {
        if (getArrValue_Idx(idx, start, direction, arr) != color) break;
    }
    start++;
    for (end = 1; end < 9; end++) {
        if (getArrValue_Idx(idx, end, direction, arr) != color) break;
    }
    end--;
    const LINE_LEN = end - start + 1;
    if (LINE_LEN == 4) {
        start--;
        end++;
    }
    lineType = lineType || (LINE_LEN > 5 ? "six" : LINE_LEN == 5 ? "five" : "freeFour");
    return {
        start: getArrIndex(getX(idx), getY(idx), start, direction, arr),
        end: getArrIndex(getX(idx), getY(idx), end, direction, arr),
        color: lineColor,
        type: lineType,
        direction: direction,
    }
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
function getBlockFour(x, y, arr) {
    let color = arr[y][x] == 1 ? 2 : 1;
    let nColor = arr[y][x];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j > -5; j--) {
            let pw = getPower(x, y, arr, DIRECTIONS[i], nColor, j);
            if (pw == 4) {
                if (nColor == 2) {
                    let p = getNextEmpty(x, y, arr, DIRECTIONS[i], nColor, j);
                    return p.y * 15 + p.x;
                }
                else if (getArrValue(x, y, j - 1, DIRECTIONS[i], arr) != nColor && getArrValue(x, y, j + 5, DIRECTIONS[i], arr) != nColor) {
                    let p = getNextEmpty(x, y, arr, DIRECTIONS[i], nColor, j);
                    return p.y * 15 + p.x;
                }
            }
        }
    }
    return -1;
}



function getNextEmpty(x, y, arr, direction, color, move = 0, maxLen = 5) {
    let nx = -1;
    let ny = -1;
    switch (String(direction)) {
        case "x":
            for (let i = 0; i < maxLen; i++) {
                if (x + i + move > 14 || x + i + move < 0) break;
                if (arr[y][x + i + move] == 0) {
                    nx = x + i + move;
                    ny = y;
                    break;
                }
            }
            break;
        case "y":
            for (let i = 0; i < maxLen; i++) {
                if (y + i + move > 14 || y + i + move < 0) break;
                if (arr[y + i + move][x] == 0) {
                    nx = x;
                    ny = y + i + move;
                    break;
                }
            }
            break;
        case "d":
            for (let i = 0; i < maxLen; i++) {
                if (y + i + move > 14 || y + i + move < 0 || x + i + move > 14 || x + i + move < 0) break;
                if (arr[y + i + move][x + i + move] == 0) {
                    nx = x + i + move;
                    ny = y + i + move;
                    break;
                }
            }
            break;
        case "u":
            for (let i = 0; i < maxLen; i++) {
                if (y - i - move < 0 || y - i - move > 14 || x + i + move > 14 || x + i + move < 0) break;
                if (arr[y - i - move][x + i + move] == 0) {
                    nx = x + i + move;
                    ny = y - i - move;
                    break;
                }
            }
            break;
    }
    return {
        "x": nx,
        "y": ny
    };
}



// x,y,坐标代表第一个点和后面的4个点成五格。返回在这五格内的子力。
function getPower(x, y, arr, direction, color, move = 0, maxLen = 5) {
    let count = 0;
    let thisColor = color;
    let nColor = thisColor == 1 ? 2 : 1;
    switch (String(direction)) {
        case "x":
            for (let i = 0; i < maxLen; i++) {
                if ((x + i + move) < 0 || (x + i + move) > 14) {
                    return -1;
                }
                if (arr[y][x + i + move] == nColor) return -1;
                if (arr[y][x + i + move] == thisColor) count++;
            }
            break;
        case "y":
            for (let i = 0; i < maxLen; i++) {
                if ((y + i + move) < 0 || (y + i + move) > 14) {
                    return -1;
                }
                if (arr[y + i + move][x] == thisColor) count++;
                if (arr[y + i + move][x] == nColor) return -1;
            }
            break;
        case "d":
            for (let i = 0; i < maxLen; i++) {
                if ((y + i + move) < 0 || (y + i + move) > 14 || (x + i + move) < 0 || (x + i + move) > 14) {
                    return -1;
                }
                if (arr[y + i + move][x + i + move] == thisColor) count++;
                if (arr[y + i + move][x + i + move] == nColor) return -1;
            }
            break;
        case "u":
            for (let i = 0; i < maxLen; i++) {
                if ((y - i - move) < 0 || (y - i - move) > 14 || (x + i + move) < 0 || (x + i + move) > 14) {
                    return -1;
                }
                if (arr[y - i - move][x + i + move] == thisColor) count++;
                if (arr[y - i - move][x + i + move] == nColor) return -1;
            }
            break;
    }

    if (count == maxLen) {
        let nx = changeX(x, maxLen + move, direction);
        let ny = changeY(y, maxLen + move, direction);
        for (let i = 0; i < 10; i++) {
            if (nx < 0 || nx > 14 || ny < 0 || ny > 14) break;
            if (arr[ny][nx] == thisColor) {
                count++;
            }
            else
            {
                break;
            }
            nx = changeX(nx, 1, direction);
            ny = changeY(ny, 1, direction);
        }
    }
    return count;
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



function getArr(arr, setnum = 0, x = 15, y = 15) {
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
    let newarr = getArr([]);
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
function getArrValue(x, y, move, direction, arr) {
    let nx = changeX(x, move, direction);
    let ny = changeY(y, move, direction);
    if (nx >= 0 && nx <= 14 && ny >= 0 && ny <= 14) {
        return arr[ny][nx];
    }
    return null;
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
    return parseInt(idx / 15);
}


/*
function getArrElement(idx, arr) {

    let x = getX(idx);
    let y = getY(idx);
    return arr[y][x];
}



function setArr(idx, arr, value) {

    getArrElement(idx, arr) = value;
}
*/

function changeX(x, move, direction) {
    switch (String(direction)) {
        case "x":
            return x + move;
            break;
        case "y":
            return x;
            break;
        case "d":
            return x + move;
            break;
        case "u":
            return x + move;
            break;
    }
}



function changeY(y, move, direction) {
    switch (String(direction)) {
        case "x":
            return y;
            break;
        case "y":
            return y + move;
            break;
        case "d":
            return y + move;
            break;
        case "u":
            return y - move;
            break;
    }
}



// index ，转字母数字坐标
function indexToName(idx) {
    let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let x = getX(idx);
    let y = getY(idx);
    return (alpha.charAt(x) + (15 - y));
}



function moveIndexToName(moves, maxLength) {
    let name = "";
    for (let i = 0; i < moves.length; i++) {
        name += `${i?"":""}${indexToName(moves[i])}`;
        if (name.length >= maxLength) {
            name += "......";
            break;
        }
    }
    return name;
};



function toArr(r, arr) {
    arr = arr || getArr([]);
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
    
    let narr = getArr([]);
    findSixPoint(arr, 1, narr, setnum);
    addFoulPoint(newarr, narr);
    narr = getArr([]);
    findFFPoint(arr, 1, narr, setnum);
    addFoulPoint(newarr, narr);
    narr = getArr([]);
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



// 找出可能的4连点
function findFour(arr, color, newarr) {

    let count = 0;
    let nx;
    let ny;
    for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 15; x++) {
            for (let i = 0; i < 4; i++) {
                let pw = getPower(x, y, arr, DIRECTIONS[i], color);
                if (color == 2) {
                    if (pw == 3) {
                        let p = getNextEmpty(x, y, arr, DIRECTIONS[i], color);
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
                    if (pw == 3 && getArrValue(x, y, -1, DIRECTIONS[i], arr) != color && getArrValue(x, y, 5, DIRECTIONS[i], arr) != color) {
                        let p = getNextEmpty(x, y, arr, DIRECTIONS[i], color);
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
