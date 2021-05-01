"use strict";
const Cmodel = new Array("x", "y", "d", "u"); // 米字线
const onlyFree = 1; // 只找活3，活4
const onlyNoFree = 2; // 只找眠3，眠4
const onlyVCF = 1; // 只找做VCF点
const onlySimpleWin = 2; // 只找43级别做杀点

let generator;

let vcfCount = 0;
let vcfArr = []; // 保存棋盘初始状态
let vcfInitial = []; // 计算vcf前，备份 初始arr
let vcfColor = 0; // 自己棋子颜色
let vcfnColor = 0; // 对手棋子颜色
let vcfFS = []; // 递归栈
let vcfMoves = []; // 当前正在计算的分支
let vcfFailMoves = []; // 保存失败节点,已经地毯的节点
let vcfWinMoves = []; // 保存成立的VCF分支;
let vcfFinding = -1; // 计算状态
let vcfStartTimer = 0;
let vcfnLevel = null;
let vcfWhiteWinMoves = [];
let vcfBlackWinMoves = [];

let stopFind = false;

let vctNode;



//，保存周围点的坐标
let aroundPoint = [];
// 创建二维数组，保存 0-224 个点周围点的坐标信息。
// 以H8 为例，H8周围的点坐标 保存在 aroundPoint[112]
// aroundPoint[112].index  ，aroundPoint[112].point,保存坐标信息
// aroundPoint[112].radius 搜索半径内 点 的个数。
for (let i = 0; i < 225; i++) {
    aroundPoint[i] = { index: [], point: [], radius: [] };
    setAroundPoint(aroundPoint[i].index, aroundPoint[i].point, aroundPoint[i].radius, i);
}




// 设置idx为中心，保存周围点的坐标
function setAroundPoint(index, point, radius, idx) {

    let r = 1;
    let x = idx % 15;
    let y = parseInt(idx / 15);
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


function tree(arr) {
    this.arr = [];
    this.root = null;
    this.parentNode = [];
    this.childNode = [];
}



function vcfList(movesList) {
    this.maxLength = 0;
    this.fMoves = [];
    for (let i = 0; i < 225; i++) {
        this.fMoves[i] = [];
    }
    for (let i = movesList.length - 1; i >= 0; i--) {
        this.push(movesList[i].slice(0));
    }
}

vcfList.prototype.push = function(moves) {
    let len = moves.length;
    this.maxLength = this.maxLength < len ? len : this.maxLength;
    this.fMoves[len - 1].push(moves.slice(0));
}

vcfList.prototype.getVCF = function(color, arr) {
    for (let i = 0; i < this.maxLength; i += 2) {
        for (let j = this.fMoves[i].length - 1; j >= 0; j--) {
            if (isVCF(color, arr, this.fMoves[i][j])) {
                return simpleVCF(color, arr, this.fMoves[i][j].slice(0));
            }
        }
    }
}


vcfList.prototype.getList = function(movesList, length) {
    let count = 0;
    length = length || 225;
    movesList.length = 0;
    for (let i = 0; i < this.maxLength; i += 2) {
        for (let j = this.fMoves[i].length - 1; j >= 0; j--) {
            movesList.push(this.fMoves[i][j].slice(0));
            if (++count == length) return;
        }
    }

}



function Node(idx, parentNode, childNode) {
    this.parentNode = parentNode;
    this.idx = idx == undefined ? -1 : idx;
    this.childNode = childNode == undefined ? [] : childNode;
}

/*
Node.prototype.appenChild = function(child) {
    this.childNode[this.childNode.length] = child;
};


Node.prototype.removeChild = function(child) {
    let type = typeof child;
    switch (type) {
        case "object":
            for (let i = this.childNode.length - 1; i >= 0; i--) {
                if (this.childNode[i] == child) {
                    this.childNode[i] = null;
                    this.childNode.splice(i, 1);
                    break;
                }
            }
            break;
        case "strint": // child == "all"
            for (let i = this.childNode.length - 1; i >= 0; i--) {
                this.childNode[i] = null;
            }
            this.childNode = [];
            break;
        case "number":
            child = parseInt(child);
            if (child >= 0 && child < this.childNode.length) {
                this.childNode[child] = null;
                this.childNode.splice(child, 1);
            }
            break;
    }
};
*/



onmessage = function(e) {
    let p = e.data.parameter;
    const cmd = {
        "getLevelB": function() {
            //mConsole("getLevelB__>>")
            let level = getLevelB(p[0], p[1], p[2], p[3], p[4], p[5], p[6]);
            post("getLevelB_End", [level]);
            //mConsole("getLevelB__>>postEnd")
        },
        "vctSelectPoint": function() {
            findLevelThreePoint(p[1], p[0], p[2], null, null, false);
            let fMoves = [];
            continueFour(p[1], p[0], 1, fMoves, getArr([]));
            if (fMoves) {
                for (let i = fMoves.length - 1; i >= 0; i--) {
                    post("wLb", [fMoves[i][0], "④", "black"]);
                    post("addThreePoint", [fMoves[i][0], { txt: "④", txtColor: "black", moves: [fMoves[i][1]] }]);
                }
            }
            post("vctSelectPoint_End", []);
        },
        "findVCT": function() {
            let fNum = findVCF(p[0], p[1], 1, null, null, true);
            if (fNum) {
                vctNode = new Node();
                movesToNode(vcfWinMoves[0], vctNode);
                vctNode.firstColor = p[1] == 1 ? "black" : "white";
            }
            else {
                findVCT(p[0], p[1], p[2], p[3], p[4], p[5]);
                vctNode = vctNode.childNode.length ? vctNode : null;
            }
            post("findVCT_End", [vctNode]);
        },
        "findVCF": function() {
            findVCF(p[0], p[1], p[2], p[3], p[4], p[5]);
            post("findVCF_End", [vcfWinMoves, vcfColor, (new Date().getTime() - vcfStartTimer) / 1000, vcfInitial]);
        },
        "findLevelThreePoint": function() {
            let sPoint = findLevelThreePoint(p[0], p[1], p[2], p[3], p[4], p[5], p[6]);
            //console.log(sPoint)
            post("findLevelThreePoint_End", []);
        },
        "cancelFind": function() { cancelFind(); },
        "isTwoVCF": function() {
            isTwoVCF(p[0], p[1], p[2]);
            post("end");
        },
        "isLevelThreePoint": function() {
            isLevelThreePoint(p[0], p[1], p[2], p[3]);
            post("end");
        },
        "isSimpleWin": function() {
            isSimpleWin(p[0], p[1], p[2], p[3], p[4]);
            post("end");
        },
        "isFourWinPoint": function() {
            isFourWinPoint(p[0], p[1], p[2], p[3]);
            post("end");
        },
        "isThreeWinPoint": function() {
            isThreeWinPoint(p[0], p[1], p[2], p[3], p[4]);
            post("end");
        },
        "blockCatchFoul": function() {
            let rt = blockCatchFoul(p[0]);
            post("blockCatchFoul_End", rt);
        },
        "isBlockVCF": function() {
            isBlockVCF(p[0], p[1], p[2]);
            post("end");
        },
        "isBlockVCFPath": function() {
            //mConsole(`__>> ${p[0]}`)
            let paths = isBlockVCFPath(p[0], p[1], p[2]);
            post("end", [paths]);

        },
        "selectPoint": function() {
            let newarr = selectPoint(p[0], p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8], p[9]);
            post("selectPoint_End", [newarr]);
        },
        "getBlockVCF": function() {
            let sPoint = [];
            findVCF(p[0], p[1], p[2], p[3], p[4], p[5]);
            post("findVCF_End", [vcfWinMoves, vcfColor, (new Date().getTime() - vcfStartTimer) / 1000, vcfInitial]);
            if (vcfWinMoves.length) {
                sPoint = getBlockVCF(vcfWinMoves, p[1], p[0]);
            }
            post("getBlockVCF_End", [sPoint]);
        },
        "getBlockVCFb": function() {
            let sPoint = [];
            findVCF(p[0], p[1], p[2], p[3], p[4], p[5]);
            post("findVCF_End", [vcfWinMoves, vcfColor, (new Date().getTime() - vcfStartTimer) / 1000, vcfInitial]);
            if (vcfWinMoves.length) {
                sPoint = getBlockVCF(vcfWinMoves, p[1], p[0]);
            }
            post("getBlockVCFb_End", [sPoint]);
        },
        "getBlockVCFTree": function() {
            let paths = [];
            findVCF(p[0], p[1], p[2], p[3], p[4], p[5]);
            post("findVCF_End", [vcfWinMoves, vcfColor, (new Date().getTime() - vcfStartTimer) / 1000, vcfInitial]);
            if (vcfWinMoves.length) {
                paths = getBlockVCFPaths(vcfWinMoves, p[1], p[0]);
            }
            //mConsole(paths.length)
            post("getBlockVCFTree_End", [paths]);
        },
        "findThreeWin": function() {
            let idx = findThreeWin(p[0], p[1], p[2]);
            idx = idx.length ? idx[0] : -1;
            post("findThreeWin_End", [idx]);
        },

    };
    //console.log("engine.onmessage parameter =" + p);
    if (typeof cmd[e.data.cmd] == "function") cmd[e.data.cmd]();
}



function post(cmd, param) {
    postMessage({ "cmd": cmd, "parameter": param });
}



function mConsole(param) {
    postMessage({ "cmd": "vConsole", "parameter": param })
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



// 复制一个arr数组
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



function findVCT(arr, color, node, count, depth, backStage) {
    node = node || new Node();
    depth = depth || 5;
    backStage = backStage ? true : false;
    vctNode = node;
    const notVCT = -1;
    const isTTWin = 1;
    const continueVCT = 0;
    let vctCount = 0;
    let vctArr = arr; // 保存棋盘初始状态
    let vctInitial = copyArr([], arr); // 计算vct前，备份 初始arr
    let vctColor = color; // 自己棋子颜色
    let vctnColor = color == 1 ? 2 : 1; // 对手棋子颜色
    let vctMoves = []; // 当前正在计算的分支
    let vctFinding = -1; // 计算状态
    let vctStartTimer = 0;
    let ctnNode = node;
    let vctMovesDepth = [];
    let vcfMap = new Map();
    let vctHistoryNode = new Map();
    let vctThreePointMap = new Map();
    let minScore = [-999999, 50, 150, 200, 300];
    let scoreIdx = minScore.length - 1;
    let scoreCount = new Array(225);
    for (let i = 0; i < 225; i++) { scoreCount[i] = 0; }

    vctActuator();

    function vctActuator() {
        vctFinding = 0;
        while (true) {
            switch (vctFinding) {
                case 0:
                    //mConsole("vctFinding = 0")
                    vctFinding = continueFindVCT();
                    if (!backStage) post("printMoves", [vctMoves, vctColor]);
                    break;
                case 1:
                    //mConsole("vctFinding = 1")
                    vctFinding = 0;

                    break;
                case -1:
                    //mConsole("vctFinding = -1")
                    //post("findVCT_End", [vctNode]);
                    if (!backStage) post("cleLb", ["all"]);
                    vctNode.firstColor = vctColor == 1 ? "black" : "white";
                    return;
                    break;
            }
        }
    }

    function continueFindVCT() {
        let arr = vctArr;
        let color = vctColor;
        let nColor = vctnColor;
        let moves = vctMoves;
        let movesDepth = vctMovesDepth;
        let cNode = ctnNode.childNode;

        let cd = ctnNode.parentNode ? ctnNode.parentNode : ctnNode;
        mConsole(`moves= ${moves}  (${moves.length}) \n selectPoint= [${getChildNodeIdx(cd)}] \n movesDepth=[${movesDepth}] \n scoreIdx=(${scoreIdx})`);

        if (movesDepth[movesDepth.length - 1] == depth) {
            let x = moves[moves.length - 1] % 15;
            let y = parseInt(moves[moves.length - 1] / 15);
            if ((moves.length + 1) % 2 && !isFour(x, y, nColor, arr)) {
                mConsole(`rt >>> -1 >>> depth out : [depth=${movesDepth[movesDepth.length-1]}]`);
                return nextNode(notVCT) ? 0 : -1;
            }
        }
        else if (movesDepth[movesDepth.length - 1] > depth) {
            mConsole(`rt >>> -1 >>> depth out : [depth=${movesDepth[movesDepth.length-1]}]`);
            return nextNode(notVCT) ? 0 : -1
        }

        if (cNode.length && cNode[cNode.length - 1].idx == -1) {
            mConsole(`rt >>> -1 >>> idx==-1`);
            return nextNode(isTTWin) ? 0 : -1
        }

        let key = getKey(arr);
        if (vctHistoryNode.has(key)) {
            //let nd = movesToNode(fMoves[j], ctnNode);
            let nd = loadHistoryNode(key, ctnNode);
            mConsole(`rt >>> 1 >>> has Node : [${!!nd}]`);
            return nextNode(!!nd ? isTTWin : notVCT) ? 0 : -1;
        }

        if ((moves.length + 1) % 2) {

            if (ctnNode.childNode.length) {
                mConsole("co.continueVCT")
                return nextNode(continueVCT) ? 0 : -1;
            }
            let fMoves = []; //  保存先手连续冲四分支
            continueFour(arr, color, 1, fMoves, getArr([]));
            let j;
            for (j = fMoves.length - 1; j >= 0; j--) { // continue find VCT point
                let x = fMoves[j][0] % 15;
                let y = parseInt(fMoves[j][0] / 15);
                let score = getScore(x, y, color, arr);
                let nd = movesToNode(fMoves[j], ctnNode);
                ctnNode.childNode[findIdx(ctnNode, fMoves[j][0])].score = score;
            }

            //mConsole(` fourPoint =  ${getChildNodeIdx(ctnNode)}`);
            let key = getKey(arr);
            let tPoint = findLevelThreePoint(arr, color, getArr([]), null, ctnNode.idx >= 0 ? ctnNode.idx : 112, true, null, 4);
            let i;
            let t;
            let leng = tPoint.length;
            for (i = 0; i < leng; i++) { //find VCT point
                t = isVCTNode(tPoint[i], color, arr, ctnNode);
                switch (t) {
                    case isTTWin:
                        mConsole(`isTTWin winPoint[${tPoint[i].idx}]`);
                        scoreCount[ctnNode.childNode[ctnNode.childNode.length - 1].idx] += 10;
                        ctnNode.childNode.splice(0, ctnNode.childNode.length - 1);
                        return nextNode(isTTWin) ? 0 : -1;
                        break;
                    case notVCT:
                        //mConsole("notVCT");
                        scoreCount[ctnNode.childNode[ctnNode.childNode.length - 1].idx] -= 1;
                        ctnNode.childNode.length--;
                        break;
                    case continueVCT:
                        //mConsole("continueVCT");
                        break;
                }
            }

            mConsole(`vctPoint=[${getChildNodeIdx(ctnNode)}] \n score =  [${getChildNodeScore(ctnNode)}]`);
            if (cNode.length) {

                let node = ctnNode.childNode[ctnNode.childNode.length - 1];
                do {
                    let c = moves.length % 2 ? nColor : color;
                    if (node.idx == -1) {
                        //node.parentNode.childNode.length--;
                        mConsole(`isTTWin 2 winPoint[${ctnNode.idx}]`);
                        return nextNode(isTTWin) ? 0 : -1;
                    }
                    if (c == nColor) { // add -1 mark
                        addMark(ctnNode);
                    }
                    else if (!selectNode(ctnNode, c)) {
                        if (moves.length == 0 && scoreIdx && ctnNode.childNode.length) {
                            scoreIdx--;
                            ctnNode = ctnNode.childNode[ctnNode.childNode.length - 1];
                            changeArr(arr, ctnNode.idx, vctColor);
                            moves.push(ctnNode.idx);
                            movesDepth.push(getDepth(arr, vctColor, ctnNode));
                        }
                        mConsole(`rt >>> 2 >>> continue`);
                        return nextNode(continueVCT) ? 0 : -1;
                    }
                    ctnNode = ctnNode.childNode[ctnNode.childNode.length - 1];
                    changeArr(arr, ctnNode.idx, c);
                    moves.push(ctnNode.idx);
                    movesDepth.push(getDepth(arr, c, ctnNode));
                    node = ctnNode.childNode[ctnNode.childNode.length - 1];
                    let key = getKey(arr);
                    if (vctHistoryNode.has(key)) {
                        let nd = loadHistoryNode(key, ctnNode);
                        mConsole(`rt >>> 3 >>> has Node : [${!!nd}]`);
                        return nextNode(!!nd ? isTTWin : notVCT) ? 0 : -1;
                    }
                } while (node);

            }
            else {
                mConsole(`rt >>> 4 >>> not finded threePoint `);
                return nextNode(notVCT) ? 0 : -1;
            }


        }
        /*
                else {
                    let node = ctnNode.childNode[ctnNode.childNode.length - 1];
                    do {
                        let c = moves.length % 2 ? nColor : color;
                        if (node.idx == -1) {
                            //node.parentNode.childNode.length--;
                            mConsole(`isTTWin 3`);
                            return nextNode(isTTWin) ? 0 : -1;
                        }
                        if (c == nColor) { // add -1 mark
                            //if (!node || !node.idx) mConsole(node);
                            addMark(ctnNode);
                        }
                        ctnNode = ctnNode.childNode[ctnNode.childNode.length - 1];
                        changeArr(arr, ctnNode.idx, c);
                        moves.push(ctnNode.idx);
                        movesDepth.push(getDepth(arr, c, ctnNode));
                        node = ctnNode.childNode[ctnNode.childNode.length - 1];
                        let key = getKey(arr);
                        if (vctHistoryNode.has(key)) {
                            let nd = loadHistoryNode(key, ctnNode);
                            mConsole(`rt >>> 5 >>> has Node : [${!!nd}]`);
                            return nextNode(!!nd ? isTTWin : notVCT) ? 0 : -1;
                        }
                    } while (node);
                }
                */
        mConsole(`rt >>> 6 >>> continue`);
        return 0;
    }

    function nextNode(isT, backStage) {
        backStage = backStage == null ? true : backStage;
        backStage = false;
        let node = ctnNode;
        let moves = vctMoves;
        let movesDepth = vctMovesDepth;
        let arr = vctArr;
        let pStr = "";
        let cNode;
        let lop = 0;
        while (moves.length) {

            changeArr(arr, node.idx, 0);
            moves.length--;
            movesDepth.length = moves.length;

            cNode = node.parentNode.childNode;
            node = node.parentNode;
            ctnNode = node;
            if (!backStage) pStr += `<< moves = ${moves} (${moves.length})  [${getChildNodeIdx(node)}]`;

            if (moves.length % 2) {
                if (isT == isTTWin) {
                    let nd = cNode.splice(cNode.length - 1, 1);
                    cNode.splice(0, 0, nd[0]);
                    if (cNode[cNode.length - 1].idx == -1) {
                        //cNode.length--;
                        //mConsole("isT "+ moves)
                        if (!backStage) pStr += ` [${getChildNodeIdx(node)}] << 1 remove -1\n`;
                        setHistoryNode(arr, isT == isTTWin ? ctnNode : false);
                        scoreCount[node.idx] += isT == isTTWin ? 5 : -5;
                    }
                    else {
                        if (!backStage) pStr += ` [${getChildNodeIdx(node)}] >> 2\n`;
                        node = node.childNode[node.childNode.length - 1];
                        break;
                    }
                }
                else if (isT == notVCT) {
                    cNode.splice(0, cNode.length);
                    if (!backStage) pStr += ` [${getChildNodeIdx(node)}] << 3 delete all\n`;
                    setHistoryNode(arr, isT == isTTWin ? ctnNode : false);
                    scoreCount[node.idx] += isT == isTTWin ? 5 : -5;
                }
                else { //continueVCT
                    if (!backStage) pStr += ` [${getChildNodeIdx(node)}] << 4 continue\n`;
                }
            }
            else {
                if (isT == isTTWin) {
                    cNode.splice(0, cNode.length - 1);
                    cNode.push(new Node(-1, cNode[0].parentNode));
                    if (!backStage) pStr += ` [${getChildNodeIdx(node)}] << 5 reserve one\n`;
                    setHistoryNode(arr, isT == isTTWin ? ctnNode : false);
                    scoreCount[node.idx] += isT == isTTWin ? 5 : -5;
                    //mConsole("isT= " + moves);
                }
                else if (isT == notVCT) {
                    if (cNode.length == 1) {
                        cNode.splice(0, cNode.length);
                        if (!backStage) pStr += ` [${getChildNodeIdx(node)}] << 6 delete all\n`;
                        setHistoryNode(arr, isT == isTTWin ? ctnNode : false);
                        scoreCount[node.idx] += isT == isTTWin ? 5 : -5;
                    }
                    else {
                        cNode.length--;
                        if (selectNode(node, vctColor)) {
                            if (!backStage) pStr += ` [${getChildNodeIdx(node)}] >> 7\n`;
                            node = node.childNode[node.childNode.length - 1];
                            break;
                        }
                        else {
                            if (!backStage) pStr += ` [${getChildNodeIdx(node)}] << 8 continue\n`;
                            isT = continueVCT;
                            if (moves.length == 0 && scoreIdx && node.childNode.length) {
                                scoreIdx--;
                                node = node.childNode[node.childNode.length - 1];
                                changeArr(arr, node.idx, vctColor)
                                moves.push(node.idx);
                                movesDepth.push(getDepth(arr, vctColor, node));
                                ctnNode = node;
                            }

                        }
                    }
                }
                else { //continueVC

                    if (selectNode(node, vctColor)) {
                        if (!backStage) pStr += ` [${getChildNodeIdx(node)}] >> 9\n`;
                        node = node.childNode[node.childNode.length - 1];
                        break;
                    }
                    else if (moves.length == 0 && scoreIdx && node.childNode.length) {
                        if (!backStage) pStr += ` [${getChildNodeIdx(node)}] << 10 scoreIdx--   minScore[${minScore[scoreIdx -1]}]\n`;
                        scoreIdx--;
                        node = node.childNode[node.childNode.length - 1];
                        changeArr(arr, node.idx, vctColor)
                        moves.push(node.idx);
                        movesDepth.push(getDepth(arr, vctColor, node));
                        ctnNode = node;

                    }

                }
            }

        }


        if (moves.length || node.parentNode) {

            while (node) {
                let x = node.idx % 15;
                let y = parseInt(node.idx / 15);
                let c = moves.length % 2 ? vctnColor : vctColor;
                if (node.idx == -1) {
                    //node.parentNode.childNode.length--;   // not remove -1 mark;
                    pStr += (`\n nextNode >>> break `);
                    break;
                }
                if (c == vctnColor) { // add -1 mark
                    addMark(node.parentNode);
                }
                else if (ctnNode == node && !selectNode(node.parentNode, c)) {
                    pStr += (`\n selectNode >>> false __2`);
                    break;
                }
                arr[y][x] = c;
                moves.push(node.idx);
                movesDepth.push(getDepth(arr, c, node));
                ctnNode = node;
                node = node.childNode[node.childNode.length - 1];
                let key = getKey(arr);
                if (vctHistoryNode.has(key)) {
                    pStr += (`\n nextNode >>> has Node `);
                    break;
                }
            }
            mConsole(pStr);
            return true;

        }
        else { //moves.length==0

            cNode = ctnNode.childNode;
            if (isT) {
                cNode.splice(0, cNode.length - 2);
            }
            else {
                cNode.splice(0, cNode.length);
            }
            if (!backStage) pStr += `false>>moves = ${moves} _${moves.length}`;
            mConsole(pStr);
            return false;
        }

    }

    /*
    function nextNodeDown() {
        if (!selectNode(ctnNode)) {
            if (moves.length == 0 && scoreIdx && ctnNode.childNode.length) {
                scoreIdx--;
                ctnNode = ctnNode.childNode[ctnNode.childNode.length - 1];
                changeArr(arr, ctnNode.idx, vctColor);
                moves.push(ctnNode.idx);
                movesDepth.push(getDepth(arr, vctColor, ctnNode));
            }
            mConsole(`rt >>> 2 >>> continue`);
            return nextNode(continueVCT) ? 0 : -1;
        }

        let node = ctnNode.childNode[ctnNode.childNode.length - 1];
        do {
            let c = moves.length % 2 ? nColor : color;
            if (node.idx == -1) {
                //node.parentNode.childNode.length--;
                mConsole(`isTTWin 2 winPoint[${ctnNode.idx}]`);
                return nextNode(isTTWin) ? 0 : -1;
            }
            if (c == nColor) { // add -1 mark
                addMark(ctnNode);
            }
            ctnNode = ctnNode.childNode[ctnNode.childNode.length - 1];
            changeArr(arr, ctnNode.idx, c);
            moves.push(ctnNode.idx);
            movesDepth.push(getDepth(arr, c, ctnNode));
            node = ctnNode.childNode[ctnNode.childNode.length - 1];
            let key = getKey(arr);
            if (vctHistoryNode.has(key)) {
                let nd = loadHistoryNode(key, ctnNode);
                mConsole(`rt >>> 3 >>> has Node : [${!!nd}]`);
                return nextNode(!!nd ? isTTWin : notVCT) ? 0 : -1;
            }
        } while (node);
    }
    */

    // 判断是否活三级别胜
    function isVCTNode(point, color, arr, node) {

        let nColor = color == 1 ? 2 : 1;
        let timeout = 30000;
        let depth = 1000;
        let x = point.idx % 15;
        let y = parseInt(point.idx / 15);
        let notWin = false;
        let VCF = new Node();
        movesToNode(point.moves, VCF);
        node.childNode.push(new Node(point.idx, node));
        node = node.childNode[node.childNode.length - 1];
        node.defaultChildNode = VCF;
        node.childNode.push(new Node(-1, node));
        let start = 0;
        let moves = [];
        moves.push(point.moves);
        //if (point.idx==40) mConsole(`idx==40  vcf = [${point.moves}]`)
        arr[y][x] = color;
        let bPoint = getBlockVCF(moves, color, arr, true, true, point.moves[point.moves.length - 1]);
        //if (point.idx==40) mConsole(`bPoint==[${bPoint}]`)
        if (bPoint) { //排除直接防

            for (let i = bPoint.length - 1; i >= 0; i--) {
                let x = bPoint[i] % 15;
                let y = parseInt(bPoint[i] / 15);
                let nd = new Node(bPoint[i], node);
                arr[y][x] = color == 1 ? 2 : 1;
                // 确保没有新的VCF
                let fNum = findVCF(arr, color, 1, null, 60000, true);
                arr[y][x] = 0;
                if (fNum) {
                    movesToNode(vcfWinMoves[0], nd);
                    node.childNode.splice(0, 0, nd);
                    start++;
                    bPoint.splice(i, 1);
                    // 用新VCF排除剩下防点
                    for (let j = i - 1; j >= 0; j--) {
                        x = bPoint[j] % 15;
                        y = parseInt(bPoint[j] / 15);
                        arr[y][x] = color == 1 ? 2 : 1;
                        if (isVCF(color, arr, vcfWinMoves[0])) {
                            nd = new Node(bPoint[j], node);
                            movesToNode(vcfWinMoves[0], nd);
                            node.childNode.splice(0, 0, nd);
                            start++;
                            bPoint.splice(j, 1);
                            i--;
                        }
                        arr[y][x] = 0;
                    }

                }
                else { // is block

                    node.childNode.splice(start + 1, 0, nd);
                    notWin = true;
                }

            }

        }
        //if (point.idx==40) mConsole(`bPoint==[${getChildNodeIdx(node)}]`)

        let notV;
        let fMoves = []; //  保存先手连续冲四分支
        continueFour(arr, color == 1 ? 2 : 1, 1, fMoves, getArr([]));
        let j;
        for (j = fMoves.length - 2; j >= 0; j--) {
            for (let k = fMoves.length - 1; k > j; k--) {
                if (fMoves[j].length > fMoves[k].length) {
                    let m = fMoves.splice(j, 1);
                    fMoves.splice(k, 0, m[0]);
                    break;
                }
            }
        }
        //if (point.idx==40 && fMoves.length) mConsole(`length=${fMoves[0].length}`)
        //mConsole(`fMoves.length = ${fMoves.length} point.idx = ${point.idx}`)
        for (j = fMoves.length - 1; j >= 0; j--) { // continue add block point
            // 摆棋
            for (let k = fMoves[j].length - 1; k >= 0; k--) {
                let x = fMoves[j][k] % 15;
                let y = parseInt(fMoves[j][k] / 15);
                arr[y][x] = k % 2 ? color : nColor;
            }
            //mConsole(`fMoves[j] = ${fMoves[j]}`)
            let fNum;
            let tx = fMoves[j][fMoves[j].length - 1] % 15;
            let ty = parseInt(fMoves[j][fMoves[j].length - 1] / 15);
            if (isFour(tx, ty, color, arr)) {

                arr[ty][tx] = 0;
                fNum = findVCF(arr, color, 1, null, null, true);
                if (fNum) {

                    let nd = node;
                    let l = fMoves[j].length - 1;
                    let i;
                    let idx;
                    for (i = 0; i < l; i++) {
                        if ((i + 1) % 2 && i && findIdx(nd, -1) > -1) break;
                        idx = findIdx(nd, fMoves[j][i]); // find oldNode
                        if (idx == -1) { // if not oldNode create New Node;
                            idx = nd.childNode.length;
                            nd.childNode[idx] = new Node(fMoves[j][i], nd);
                        }
                        nd = nd.childNode[idx];
                    }
                    if (i == l) {
                        //mConsole(`fMoves[i] = ${fMoves[j]} > vcfWinMoves[0] = ${vcfWinMoves[0]} `);
                        movesToNode(vcfWinMoves[0], nd);
                        if (nd == node.childNode[idx]) {
                            let n = node.childNode.splice(idx, 1);
                            node.childNode.splice(0, 0, n[0]);
                        }
                        else {
                            nd.parentNode.childNode.push(new Node(-1, nd.parentNode));
                        }
                    }
                    //V.parentNode.childNode.splice(0, 0, nd[0]);
                }
                arr[ty][tx] = color;
            }

            if (!fNum) {
                notWin = true;
                fNum = findVCF(arr, color, 1, null, null, true);
                if (fNum) { // continue find vct
                    movesToNode(fMoves[j].slice(0, fMoves[j].length - 1), node);
                    //mConsole(`fMoves add [${fMoves[j].slice(0, fMoves[j].length - 1)}]`)
                }
                else { // is not VCT
                    notV = true;
                }
            }
            //mConsole(fMoves[j].slice(0, fMoves[j].length - 1))
            // 复原棋子
            for (let k = fMoves[j].length - 1; k >= 0; k--) {
                let x = fMoves[j][k] % 15;
                let y = parseInt(fMoves[j][k] / 15);
                arr[y][x] = 0;
            }
            if (notV) break;
        }
        //if (point.idx==40) mConsole(`bPoint==[${getChildNodeIdx(node)}]`)

        let vCount = 0;
        let fCount = 0;
        let tCount = 0;
        if (!notV) {
            let vStart = node.childNode.length;
            let fStart = node.childNode.length;
            let tStart = node.childNode.length;
            for (let i = node.childNode.length - 1; i >= 0; i--) {
                if (node.childNode[i].idx != -1) {
                    let x = node.childNode[i].idx % 15;
                    let y = parseInt(node.childNode[i].idx / 15);
                    arr[y][x] = color == 1 ? 2 : 1;

                    let fNum = findVCF(arr, color == 1 ? 2 : 1, 1, 2, 6000, true);
                    if (fNum) {
                        if (i < vStart) {
                            let nd = node.childNode.splice(i, 1);
                            node.childNode.splice(vStart, 0, nd[0]);
                            vStart--;
                            fStart--;
                            tStart--;
                            vCount++;
                        }
                    }
                    else if (isFour(x, y, color == 1 ? 2 : 1, arr)) {
                        if (i < fStart) {
                            let nd = node.childNode.splice(i, 1);
                            node.childNode.splice(fStart, 0, nd[0]);
                            fStart--;
                            tStart--;
                            fCount++;
                        }
                    }
                    else if (isThree(x, y, color == 1 ? 2 : 1, arr)) {
                        if (i < tStart) {
                            let nd = node.childNode.splice(i, 1);
                            node.childNode.splice(tStart, 0, nd[0]);
                            tStart--;
                            tCount++;
                        }
                    }

                    arr[y][x] = 0;
                }
                else {
                    break;
                }
            }
        }

        let score = getScore(x, y, color, arr) - point.moves.length * 10 - vCount * 10 - fCount * 1 - tCount;
        node.score = score;
        scoreCount[node.idx]++;
        arr[y][x] = 0;

        return notV ? notVCT : notWin ? continueVCT : isTTWin;

    }

    function addMark(node, start) {
        if (findIdx(node, -1) == -1) {
            node.childNode.splice(0, 0, new Node(-1, node));
            //mConsole(`addMark(${vctMoves.length}) >>> add -1`);
        }
    }

    function changeArr(arr, idx, color) {
        let x = idx % 15;
        let y = parseInt(idx / 15);
        arr[y][x] = color;
    }

    function getDepth(arr, color, node) {
        let movesDepth = vctMovesDepth;
        let dp = movesDepth.length ? movesDepth[movesDepth.length - 1] : 0;
        if (color == vctColor) {
            let nColor = color == 1 ? 2 : 1;
            let x = node.idx % 15;
            let y = parseInt(node.idx / 15);
            if (!isFour(x, y, color, arr)) {
                let OV = arr[y][x];
                arr[y][x] = 0;
                if (node.parentNode && node.parentNode.idx != -1) {
                    let tx = node.parentNode.idx % 15;
                    let ty = parseInt(node.parentNode.idx / 15);
                    if (!isFour(tx, ty, nColor, arr)) {
                        //mConsole(`moves = [${vctMoves}]  >> rt_1 (${dp+1}) [${movesDepth}]`);
                        arr[y][x] = OV;
                        return dp + 1;
                    }
                    arr[y][x] = OV;
                }
                else {
                    //mConsole(`moves = [${vctMoves}]  >> rt_2 (${dp+1}) [${movesDepth}]`);
                    arr[y][x] = OV;
                    return dp + 1;
                }

            }
            //mConsole(`moves = [${vctMoves}]  >> rt_3 (${dp}) [${movesDepth}]`);
            return dp;
        }
        else {
            //mConsole(`moves = [${vctMoves}]  >> rt_4 (${dp}) [${movesDepth}]`);
            return dp;
        }
    }

    function getChildNodeIdx(node) { // push idx to array;
        let cd = node.childNode;
        let m = [];
        for (let i = cd.length - 1; i >= 0; i--) {
            m.splice(0, 0, cd[i].idx)
        }
        return m;
    }

    function getChildNodeScore(node) {
        let cd = node.childNode;
        let m = [];
        for (let i = cd.length - 1; i >= 0; i--) {
            m.splice(0, 0, cd[i].score + scoreCount[cd[i].idx]);
            //m.splice(0, 0, cd[i].score);
        }
        return m;
    }

    function getScore(x, y, color, arr) {
        let score = 0;
        for (let i = 0; i < 4; i++) {
            if (isLineFour(x, y, Cmodel[i], color, arr)) {
                score += 210;
            }
            else if (isLineThree(x, y, Cmodel[i], color, arr, true)) {
                score += 230;
            }
            else if (isLineThree(x, y, Cmodel[i], color, arr)) {
                score += 200;
            }
            else if (isLineTwo(x, y, Cmodel[i], color, arr, true)) {
                score += 190;
            }
        }
        //if (score>150 && score>scoreCount[y*15+x]) scoreCount[y*15+x] = score;
        return score;
    }

    function findIdx(node, idx) {
        let i;
        for (i = node.childNode.length - 1; i >= 0; i--) {
            if (node.childNode[i].idx == idx) break;
        }
        return i;
    }

    function loadHistoryNode(key, node) {
        let nd = vctHistoryNode.get(key);
        if (nd) {
            for (let i = nd.childNode.length - 1; i >= 0; i--) {
                nd.childNode[i].parentNode = node;
                node.childNode[i] = nd.childNode[i];
            }
        }
        else {
            //ctnNode.childNode = [];
        }
        return nd;
    }

    function setHistoryNode(arr, node) {
        let key = getKey(arr);
        if (!vctHistoryNode.has(key)) {
            //mConsole(`setHistoryNode moves=[${vctMoves}]`)
            if (node) {
                vctHistoryNode.set(key, node);
            }
            else {
                vctHistoryNode.set(key, false);
            }
        }
    }

    function selectNode(node, color) {

        let parentNode = node.parentNode;
        if (parentNode) {
            let i = findIdx(parentNode, -1);
            for (let j = 0; j < i; j++) {
                let nod = parentNode.childNode[j].childNode[0];
                let idx = findIdx(node, nod.idx);
                if (idx > -1) {
                    let max = nod.score + scoreCount[nod.idx];
                    if (max > minScore[scoreIdx]) {
                        let nd = node.childNode.splice(idx, 1);
                        node.childNode.push(nd[0]);
                        for (let i = minScore.length - 1; i > scoreIdx; i--) {
                            if (max > minScore[i]) {
                                scoreIdx = i;
                                break;
                            }
                        }
                        return true;
                    }
                }
            }
        }
        let idx = node.childNode.length - 1;
        let max = node.childNode[idx].score + scoreCount[node.childNode[idx].idx];
        for (let i = node.childNode.length - 2; i >= 0; i--) {
            let score = node.childNode[i].score + scoreCount[node.childNode[i].idx];
            if (score > max) {
                max = score;
                idx = i;
            }
        }
        if (max > minScore[scoreIdx]) {
            let nd = node.childNode.splice(idx, 1);
            node.childNode.push(nd[0]);
            for (let i = minScore.length - 1; i > scoreIdx; i--) {
                if (max > minScore[i]) {
                    scoreIdx = i;
                    break;
                }
            }
            return true;
        }
        else {
            node = node.parentNode;
            if (node) {
                let x = node.idx % 15;
                let y = parseInt(node.idx / 15);
                let score = getScore(x, y, color, arr);
                node.score = scoreIdx ? minScore[scoreIdx - 1] + score : minScore[0] + score;
            }
            return false;
        }
    }
}



function findVCF(arr, color, count, depth, timeOut, backStage) {
    let rt;
    depth = arr.depth ? data.depth : depth == null ? 225 : depth;
    count = arr.depth ? data.count : count == null ? 225 : count * 1;
    if (count == 1 && depth > 4) {  // depth＞4 排除四手五连算法
        for (let i = 1; i < 4; i++) {
            rt = findVCFB(arr, color, 1, i, timeOut, backStage);
            if (rt) return rt;
        }
        rt = findVCFB(arr, color, 1, depth, timeOut, backStage);
    }
    /*
    else if (count == 2 && depth > 4) {
        rt = findVCFB(arr, color, 2, 2, timeOut, backStage);
        if (rt >= 2) return rt;
        rt = findVCFB(arr, color, 2, 4, timeOut, backStage);
        if (rt >= 2) return rt;
        rt = findVCFB(arr, color, 2, depth, timeOut, backStage);
    }
    */
    else {
        rt = findVCFB(arr, color, count, depth, timeOut, backStage);
    }
    return rt;
}



// 连续查找,VCF
//color 设置棋子颜色， timeout 设置超时毫秒单位， 
// depth 计算深度， backStage 后台模式, count VCF个数上限
// 不会会改变arr参数的值，不需要 copyArr([], data）
function findVCFB(arr, color, count, depth, timeOut, backStage) {

    //console.log("vcf start");
    let data = arr.depth ? arr : null; // loadcontinue findvcf
    timeOut = data ? data.timeOut : timeOut == null ? 36000000 : timeOut;
    depth = data ? data.depth : depth == null ? 225 : depth;
    count = data ? data.count : count == null ? 225 : count * 1;
    backStage = data ? data.backStage : backStage ? true : false;
    vcfCount = data ? data.vcfCount : 0;

    vcfArr = data ? data.vcfArr : arr;
    vcfInitial = data ? data.vcfInitial : copyArr(vcfInitial, vcfArr);
    vcfFS = data ? data.vcfFS : [];
    vcfMoves = data ? data.vcfMoves : [];
    vcfColor = data ? data.vcfColor : color;
    vcfnColor = vcfColor == 1 ? 2 : 1;
    vcfFinding = 0;
    vcfFailMoves = data ? data.vcfFailMoves : []; //初始化hash数组
    if (vcfFailMoves.length == 0)
        for (let i = 0; i < 225; i++) { vcfFailMoves[i] = {}; };
    vcfWinMoves = data ? data.vcfWinMoves : [];
    vcfnLevel = data ? data.vcfnLevel : null;
    /*
    if (color==2) vcfWhiteWinMoves = [];
    if (color==1) vcfBlackWinMoves = [];
    */

    // //console.log(vcfFinding)
    if (!backStage) post("findVCF_addVCF", [vcfWinMoves, vcfColor, 0, vcfInitial]);
    vcfStartTimer = new Date().getTime();
    /*
    for (let i=0; i<5000; i++) {
        findFourPoint(arr, 1, getArr([]));
    }
    let t1 = new Date().getTime();
    mConsole(`timer=${t1 - vcfStartTimer}`);
    for (let i = 0; i < 5000; i++) {
        findFourPoint(arr, 1, getArr([]), undefined, undefined, true);
    }
    let t2 = new Date().getTime();
    mConsole(`timer=${t2-t1}`);
    */
    vcfActuator(timeOut, depth, count, backStage);

    //console.log("vcf end");
    return vcfWinMoves.length;



    // 定时器调用，实现搜索VCF
    function vcfActuator() {

        let x;
        let y;
        let len;
        let prvTimer = vcfStartTimer - 1000;
        let maxTimer = 1500;
        let postContinueCount = 0;
        while (true) {
            vcfFinding = stopFind ? -1 : vcfFinding;
            switch (vcfFinding) {
                case 0:
                    vcfFinding = 100;
                    vcfCount = vcfCount == 90000 ? 1 : vcfCount + 1;
                    let t = new Date().getTime();

                    if ((t - vcfStartTimer) / 10000 > postContinueCount) {
                        postContinueCount++;
                        let data = {
                            cmd: "findVCF",
                            timeOut: timeOut,
                            depth: depth,
                            count: count,
                            backStage: backStage,
                            vcfCount: vcfCount,
                            vcfArr: vcfArr,
                            vcfInitial: vcfInitial,
                            vcfFS: vcfFS,
                            vcfMoves: vcfMoves,
                            vcfColor: vcfColor,
                            vcfFailMoves: cutFailMoves([], vcfFailMoves),
                            vcfStartTimer: vcfStartTimer,
                            vcfWinMoves: vcfWinMoves,
                            vcfnLevel: vcfnLevel,
                        };

                        if (!backStage) post("saveContinueData", [data, postContinueCount == 1 ? true : false]);
                    }

                    if (t - prvTimer > maxTimer) {
                        prvTimer += maxTimer;
                        maxTimer = maxTimer < 60000 ? maxTimer + parseInt((maxTimer / 300) * (maxTimer / 300)) : maxTimer;
                        if (!backStage) {
                            post("printMoves", [vcfMoves, vcfColor, vcfFailMoves]);
                        }
                    }
                    vcfFinding = continueFindVCF(timeOut, depth);
                    break;
                case 1:
                    // -1 分支地毯完， 0 继续地毯后面分支
                    vcfFinding = vcfFS.length ? (vcfWinMoves.length < count) ? 0 : -1 : -1;
                    break;
                case -1:
                    copyArr(vcfArr, vcfInitial);
                    return;
                    break;
            }
        }
        //log (vcfFinding)
    }



    // 搜索VCF,递归计算到深度10，返回给浏览器，等待定时器下一次调用。
    function continueFindVCF() {

        let moves = vcfMoves;
        let arr = vcfArr;
        let newarr = getArr([]);
        let fs = vcfFS;
        let FailMoves = vcfFailMoves;
        let WinMoves = vcfWinMoves;
        let color = vcfColor;
        let nColor = vcfnColor;
        let dp = moves.length / 2;
        // 读取对手进攻级别
        let cfLevel = vcfnLevel;

        let tx = 0;
        let ty = 0;
        //首次循环，需要计算对手进攻级别
        if (cfLevel == null) {
            getArr(newarr);
            cfLevel = getLevel(arr, nColor);

        }

        // //console.log(cfLevel.level)
        if (cfLevel.level < 4 && dp <= depth) { //如果对手进攻级别低于  冲4
            getArr(newarr);
            if (findFourPoint(arr, color, newarr)) {

                fs.push(-1);
                let st = fs.length;
                let ed;

                // 上一手棋为中心，查找周围的点。
                if (fs.length > 1) {
                    fs = fs.concat(aroundFindPoint(newarr, moves[moves.length - 2], 14, false));
                    vcfFS = fs; // concat方法改变了内存地址， 重新设置两个变量
                }
                else { // 如果是第一手，就以h8为中心
                    fs = fs.concat(aroundFindPoint(newarr, 112));
                    vcfFS = fs;
                }
                //mConsole(`>>___\n${fs}`)
                ed = fs.length - 1;
                let idx; // 优先选择活4,再43
                if (ed > st) { // 两个以上冲四点，优先选择活4,再43
                    for (idx = ed; idx >= st; idx--) { //找到一个活4级的点可以排除其它点
                        let x = fs[idx] % 15;
                        let y = parseInt(fs[idx] / 15);
                        // 如果没有活4，白棋继续找44，冲4抓
                        if (isFFWin(x, y, color, arr, true)) {
                            let v = fs.splice(idx, 1);
                            fs.splice(st - 1, ed - st + 1);
                            let wMoves = moves.concat(v);
                            if (WinMoves.length == 0) simpleVCF(color, vcfInitial, wMoves);
                            if (pushWinMoves(WinMoves, wMoves) && !backStage) {
                                if (!backStage) post("findVCF_addVCF", [vcfWinMoves, vcfColor, 0, vcfInitial]);
                            };
                            pushFailMoves(FailMoves, moves);
                            backFindVCF();
                            return 1;
                        }
                    }
                    //排序
                    let freeThreeSt = ed;
                    for (idx = ed; idx >= st; idx--) {
                        let x = fs[idx] % 15;
                        let y = parseInt(fs[idx] / 15);
                        // 把所有活3排到栈顶
                        //判断是否活3，最后一个参数五连，冲4不否定活3
                        for (let i = 0; i < 4; i++) {
                            if (isLineThree(x, y, Cmodel[i], color, arr, true)) {
                                freeThreeSt--;
                                if (idx < freeThreeSt) {
                                    let v = fs.splice(idx, 1);
                                    fs.splice(freeThreeSt, 0, v * 1);
                                }
                                break;
                            }
                        }
                    }
                }
                //mConsole(`<<___\n${fs}`)

                tx = fs[ed] % 15;
                ty = parseInt(fs[ed] / 15);
                moves.push(fs[ed] * 1);
                arr[ty][tx] = color;

                moves.push(getBlockFour(tx, ty, arr) * 1);
                tx = moves[moves.length - 1] % 15;
                ty = parseInt(moves[moves.length - 1] / 15);

                arr[ty][tx] = nColor;
                // 为下次调用保存进攻级别
                vcfSaveLevel(tx, ty, nColor, arr);

                // 重复了错误分支，再退一手，递归退到合适位置
                let fm = findMoves(FailMoves, moves);
                if (fm) backFindVCF();
            }
            else {
                backFindVCF();
            }

        }
        else if (cfLevel.level == 4 && dp <= depth) { // 如果对手有冲4

            tx = cfLevel.p.x;
            ty = cfLevel.p.y;
            // //console.log(printArr(arr)+"\n"+cfLevel.p.x+"-"+cfLevel.p.y+"-")
            if (isFour(tx, ty, color, arr)) { // 有反4，继续计算
                if (isFFWin(tx, ty, color, arr, true)) {
                    let wMoves = moves.concat(ty * 15 + tx);
                    if (WinMoves.length == 0) simpleVCF(color, vcfInitial, wMoves);
                    if (pushWinMoves(WinMoves, wMoves) && !backStage) {
                        if (!backStage) post("findVCF_addVCF", [vcfWinMoves, vcfColor, 0, vcfInitial]);
                    };
                    pushFailMoves(FailMoves, moves);
                    backFindVCF();
                    return 1;
                }
                fs.push(-1);
                fs.push(ty * 15 + tx);
                moves.push(fs[fs.length - 1] * 1);
                arr[ty][tx] = color;

                moves.push(getBlockFour(tx, ty, arr) * 1);
                tx = moves[moves.length - 1] % 15;
                ty = parseInt(moves[moves.length - 1] / 15);
                arr[ty][tx] = nColor;
                // 为下次调用保存进攻级别
                vcfSaveLevel(tx, ty, nColor, arr);

                // 重复了错误分支，再退一手，递归退到合适位置
                let fm = findMoves(FailMoves, moves);
                if (fm) backFindVCF();
            }
            else { // 没有反4，计算后续分支
                backFindVCF();
            }
        }
        else { // 对手进攻级别太高VCF 不成立，计算后续分支
            backFindVCF();
        }
        if (fs.length == 0) return -1; // 地毯完，VCF失败
        if (new Date().getTime() - vcfStartTimer > timeOut) return -1;
        return 0; //未完，等待定时器调用


        //当前分支不存在VCF,退回。return== true 表示白棋抓禁了
        function backFindVCF() {
            let x;
            let y;
            if (moves.length) { // 退一手
                let l = moves.length;
                x = moves[l - 1] % 15;
                y = parseInt(moves[l - 1] / 15);
                arr[y][x] = 0;
                x = moves[l - 2] % 15;
                y = parseInt(moves[l - 2] / 15);
                arr[y][x] = 0;
                moves.length = l - 2;
                fs.length--;
            }
            // 子分支地毯完，返回上一级
            while (fs.length && fs[fs.length - 1] == -1) {
                fs.length--;
                if (fs.length < 1) continue;
                // 保存失败分支;
                pushFailMoves(FailMoves, moves);
                //FailMoves.push(copyMoves(moves));
                let l = moves.length;
                x = moves[l - 1] % 15;
                y = parseInt(moves[l - 1] / 15);
                arr[y][x] = 0;
                x = moves[l - 2] % 15;
                y = parseInt(moves[l - 2] / 15);
                arr[y][x] = 0;
                moves.length = l - 2;
                fs.length--;
            }

            if (fs.length > 1) { // 退到下一分支
                let l = fs.length;
                moves.push(fs[l - 1] * 1);
                x = fs[l - 1] % 15;
                y = parseInt(fs[l - 1] / 15);
                arr[y][x] = color;
                moves.push(getBlockFour(x, y, arr) * 1);
                l = moves.length;
                x = moves[l - 1] % 15;
                y = parseInt(moves[l - 1] / 15);

                arr[y][x] = nColor;
                // 为下次调用保存进攻级别
                vcfSaveLevel(x, y, nColor, arr);
                // 重复了错误分支，再退一手
                let fm = findMoves(FailMoves, moves);
                if (fm) backFindVCF();
            }

        }

        // 为continueFindVCF 保存进攻级别
        function vcfSaveLevel(x, y, nColor, arr) {
            // 不用getLevelB,加快计算速度
            if (isFour(x, y, nColor, arr)) { //有冲4
                // 找两个五连点
                if (findFivePointB(y * 15 + x, arr, nColor, 2)) {
                    vcfnLevel = { level: 4.5, p: null };
                }
                else { // 一个五连点是冲4
                    let idx = getBlockFour(x, y, arr);
                    let tx = idx % 15;
                    let ty = parseInt(idx / 15);
                    // p 保存冲4防点
                    vcfnLevel = { level: 4, p: { x: tx, y: ty } };
                }

            }
            else {
                vcfnLevel = { level: 3, p: null };
            }
        }

    }

}


// 去掉VCF无谓冲四，不会改变arr数组
function simpleVCF(color, arr, moves) {

    let fs = []; // 把对手的反4点记录
    let nColor = color == 1 ? 2 : 1;
    let leng = moves.length - 6;
    for (let j = 0; j <= leng; j++) { // 摆棋子
        let x = moves[j] % 15;
        let y = parseInt(moves[j] / 15);
        arr[y][x] = j % 2 == 0 ? color : nColor;
    }

    for (let i = moves.length - 5; i >= 0; i -= 2) { // 从后向前逐个冲4尝试是否无谓冲4
        let VCF = moves.slice(i + 2); // 判断是否无谓冲四      
        if (isVCF(color, arr, VCF)) moves.splice(i, 2); //删除无谓冲四
        for (let j = 1; j < 3; j++) { // 复原两步，直到最后可以完全复原数组
            if (i - 1 < 0) break;
            let x = moves[i - j] % 15;
            let y = parseInt(moves[i - j] / 15);
            arr[y][x] = 0;
        }
    }

    leng = moves.length - 6;
    for (let j = 1; j <= leng; j += 2) { // add fourPoint
        let x = moves[j] % 15;
        let y = parseInt(moves[j] / 15);
        if (isFour(x, y, nColor, arr)) fs.push(j);
    }
    while (fs.length) { //判断引起对手反四的手顺是否可以去除
        let st = -1;
        let l = 2;
        for (let j = fs.length - 1; j >= 0; j--) {
            st = fs[j] - 1;
            l += 2;
            if (j == 0 || fs[j] - fs[j - 1] > 2) {
                fs.length -= (l - 2) / 2;
                break;
            }
        }
        let VCF = moves.slice(0, st).concat(moves.slice(st + l, moves.length));
        if (isVCF(color, arr, VCF)) moves.splice(st, l);
    }
    return moves;

}



// 停止查找
function cancelFind() {

    stopFind = true;
    setTimeout("stopFind = false;", 2500);
}



// 给ps数组添加一个值，重复的会忽略
function pushPoint(ps, point) {

    let len = ps.length;
    for (let i = 0; i < len; i++) {
        if (ps[i] == point) return;
    }
    ps[len] = point;
}



// 会改变moves
// 添加失败分支
function pushFailMoves(FailMoves, moves) {

    let mv = moves.slice(0);
    let len = moves.length;
    let sum = 0; // 对单色棋子索引求和，保存到数组最后位置。
    for (let i = len - 1; i >= 0; i -= 2) {
        sum += mv[i];
    }
    //mv.push(sum * 1);
    // hash 数组保存失败分支;
    if (FailMoves[len][sum] == null) {
        FailMoves[len][sum] = [];
    }
    FailMoves[len][sum].push(mv); // 保存失败分支   
}



function pushVCF(VCF, moves) {

    let i;
    let j;
    let k;
    let l = moves.length;
    let len = VCF.length;
    // //console.log(moves+"  对比")
    // 确认是否重复
    if (l > 20) return;
    for (i = len - 1; i >= 0; i--) {
        if (l == VCF[i].length) {
            for (k = l - 1; k >= 0; k -= 2) {
                for (j = l - 1; j >= 0; j -= 2) {
                    if (VCF[i][j] == moves[k] * 1) {
                        break; //找到相同数据
                    }
                }
                if (j < 0) break; // 没有找到相同数据;
            }
            if (k >= 0) continue; // 没有找到相同数据;

            // 判断另一个颜色
            for (k = l - 2; k >= 0; k -= 2) {
                for (j = l - 2; j >= 0; j -= 2) {
                    if (VCF[i][j] == moves[k] * 1) {
                        break; //找到相同数据
                    }
                }
                if (j < 0) break; // 没有找到相同数据;
            }
            if (k < 0) {
                return;
            }

        }
    }

    for (i = 0; i < VCF.length; i++) {
        if (VCF[i].length >= l) break;
    }
    // //console.log("准备添加"+VCF)
    VCF.splice(i, 0, copyMoves(moves)); // 
    // //console.log("添加后"+VCF)
    return true;
}



// 添加一个成立的VCF分支
function pushWinMoves(WinMoves, moves) {

    let i;
    let j;
    let k;
    let l = moves.length;
    let len = WinMoves.length;
    // //console.log(moves+"  对比")
    // 确认是否重复

    for (i = len - 1; i >= 0; i--) {
        if (l < WinMoves[i].length) {
            // 判断一个颜色,最后一手活四级忽略
            for (k = l < 3 ? l - 1 : l - 3; k >= 0; k -= 2) {
                for (j = WinMoves[i].length - 1; j >= 0; j -= 2) {
                    if (WinMoves[i][j] == moves[k] * 1) {
                        break; //找到相同数据
                    }
                }
                if (j < 0) break; // 没有找到相同数据;
            }
            if (k >= 0) continue; // 没有找到相同数据;

            if (k < 0) { // 把所有重复的替换掉
                //console.log("准备替换"+WinMoves)
                WinMoves.splice(i, 1); // 找到后续相同数据,删除
                // //console.log("替换后"+WinMoves)
            }

        }
        else {

            // 判断一个颜色
            for (k = WinMoves[i].length < 3 ? WinMoves[i].length - 1 : WinMoves[i].length - 3; k >= 0; k -= 2) {
                for (j = l - 1; j >= 0; j -= 2) {
                    if (WinMoves[i][k] == moves[j] * 1) {
                        break; //找到相同数据
                    }
                }
                if (j < 0) break; // 没有找到相同数据;
            }
            //console.log (moves +"move")
            //console.log (WinMoves[i] + "winmov")
            if (k >= 0) continue; // 没有找到相同数据;

            if (k < 0) {
                return false;
            }
        }
    }

    for (i = 0; i < WinMoves.length; i++) {
        if (WinMoves[i].length >= l) break;
    }
    // //console.log("准备添加"+WinMoves)
    WinMoves.splice(i, 0, copyMoves(moves)); // 找到相同数据;
    // //console.log("添加后"+WinMoves)
    return true;

}



// 对比VCF手顺是否相等
function findMoves(FailMoves, moves) {

    let i;
    let j;
    let k;
    let rt = 0;
    let l = moves.length;
    let sum = 0; // 对每一手棋索引求，保存到数组最后位置。
    for (let i = l - 1; i >= 0; i -= 2) {
        sum += moves[i];
    }
    if (FailMoves[l][sum] == null) return false;
    let len = FailMoves[l][sum].length;
    for (i = len - 1; i >= 0; i--) {

        // 判断另一个颜色,
        for (k = moves.length - 2; k >= 0; k -= 2) {
            for (j = FailMoves[l][sum][i].length - 2; j >= 0; j -= 2) {
                if (FailMoves[l][sum][i][j] == moves[k] * 1) {
                    break; //找到相同数据
                }
            }
            if (j < 0) break; // 没有找到相同数据;
        }

        if (k < 0) {
            /*
            for (k = moves.length - 1; k >= 0; k -= 2) {
                for (j = FailMoves[l][sum][i].length - 1; j >= 0; j -= 2) {
                    if (FailMoves[l][sum][i][j] == moves[k] * 1) {
                        break; //找到相同数据
                    }
                }
                if (j < 0) break; // 没有找到相同数据;
            }
            */
            if (k < 0) break; // 找到相同数据;
        }
        //if (k < 0)  { rt = k<0 ? 1 :0.1; break; } // 找到相同数据;
    }

    return (i >= 0) ? true : false;

}



// 判断是否，已经五连胜
function isWin(color, arr) {

    for (let y = 0; y < 15; y++) {
        for (let x = 0; x < 15; x++) {
            for (let i = 0; i < 4; i++) {
                let pw = getPower(x, y, arr, Cmodel[i], color);
                if (pw == 5) {
                    if (color == 2) {
                        return true;
                    }
                    else if (getArrValue(x, y, -1, Cmodel[i], arr) != color) {
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
function isFFWin(x, y, color, arr, pass) {

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









// 判断是idx否三手五连点
function isThreeWinPoint(idx, color, arr, backStage, pass, node) {
    node = node || new Node();
    let nd = node;
    let x = idx % 15;
    let y = parseInt(idx / 15);
    let isWin = false;
    let OV = arr[y][x];
    arr[y][x] = color;
    let level = getLevelB(arr, color, getArr([]), 3000, null, true, 2);
    if (level.level >= 4.5) {
        nd.childNode[nd.childNode.length] = new Node(idx, nd);
        isWin = true;
    }
    else if (level.level == 4) {

        let tx = level.p.x;
        let ty = level.p.y;
        arr[ty][tx] = color == 1 ? 2 : 1;
        let fPoint = findFFWin(arr, color, getArr([]));
        isWin = fPoint.length > 0;
        arr[ty][tx] = 0;
        if (isWin && !pass) { //验证对手先手
            let lvl = getLevel(arr, color == 1 ? 2 : 1);
            isWin = lvl.level < 4;
            if (isWin) { //add node
                nd.childNode[nd.childNode.length] = new Node(idx, nd);
                nd = nd.childNode[nd.childNode.length - 1];
                nd.childNode[0] = new Node(ty * 15 + tx, nd);
                nd = nd.childNode[0];
                nd.childNode[0] = new Node(fPoint[0] * 1, nd);
            }
            else {
                /*
                nd.childNode[nd.childNode.length] = new Node(idx, nd);
                nd = nd.childNode[nd.childNode.length-1];
                nd.txt = "○";
                nd.childNode[0] = new Node(ty * 15 + tx, nd);
                nd = nd.childNode[0];
                nd.txt = "○";
                */
            }
        }
        else {
            /*
            nd.childNode[nd.childNode.length] = new Node(idx, nd);
            nd = nd.childNode[nd.childNode.length-1];
            nd.txt = "○";
            nd.childNode[0] = new Node(ty * 15 + tx, nd);
            nd = nd.childNode[0];
            nd.txt = "○";
            */
        }

    }
    else {
        if (findVCF(arr, color, 1, 0, null, true)) {
            isWin = true;
            let VCF = new Node();
            movesToNode(vcfWinMoves[0], VCF);
            let bPoint = getBlockVCF(vcfWinMoves, color, arr, true);
            bPoint = bPoint || [];
            node.childNode[node.childNode.length] = new Node(idx, node);
            node.childNode[node.childNode.length - 1].childNode.length = bPoint.length;
            node.childNode[node.childNode.length - 1].defaultChildNode = VCF;
            for (let i = bPoint.length - 1; i >= 0; i--) {
                let tx = bPoint[i] % 15;
                let ty = parseInt(bPoint[i] / 15);
                arr[ty][tx] = color == 1 ? 2 : 1;
                let fPoint = findFFWin(arr, color, getArr([]));
                if (fPoint.length == 0) {
                    isWin = false;
                    nd = node.childNode[node.childNode.length - 1];
                    nd.txt = "○";
                    nd.childNode[i] = new Node(bPoint[i] * 1, nd);
                    nd = nd.childNode[i];
                    nd.txt = "○";
                    //console.log(false)

                    for (let j = i - 1; j >= 0; j--) {
                        nd = node.childNode[node.childNode.length - 1];
                        //nd.txt = "○";
                        nd.childNode[j] = new Node(bPoint[j] * 1, nd);
                        nd = nd.childNode[j];
                        nd.txt = "?";
                    }
                    //node.childNode = [];
                    i = -1;
                }
                else {
                    nd = node.childNode[node.childNode.length - 1];
                    nd.childNode[i] = new Node(bPoint[i] * 1, nd);
                    nd = nd.childNode[i];
                    nd.childNode[0] = new Node(fPoint[0] * 1, nd);
                }
                arr[ty][tx] = 0;
            }
        }
        else {
            //node.childNode = [];
        }
        if (isWin && !pass) { //验证对手先手
            let fNum = findVCF(arr, color == 1 ? 2 : 1, 1, null, null, true);
            isWin = fNum == 0;
            if (!isWin) node.childNode.length--;
        }
    }

    arr[y][x] = OV;
    //if (isWin && !backStage) {
    if (node && node.childNode.length && !backStage) {
        post("wLb", [idx, node.childNode[node.childNode.length - 1].txt || "W", "black"]);
        node.firstColor = color == 1 ? "black" : "white";
        post("addTree", [node]);
    }
    return isWin;
}



// moves.length 为单数
function isVCF(color, arr, moves) {

    let pnt = aroundPoint[112];
    let nColor = color == 1 ? 2 : 1;
    let OV = [];
    let newarr = [];
    let l = moves.length;
    let i;
    for (i = 0; i < l; i += 2) {
        getArr(newarr);
        let level = getLevel(arr, nColor);
        if (level.level < 4) { // 对方进攻级别小于冲4
            let x = moves[i] % 15;
            let y = parseInt(moves[i] / 15);
            // 先手会判断禁手
            if ((arr[y][x] == 0 && isFour(x, y, color, arr)) && (color == 2 || !isFoul(x, y, arr))) {
                OV.push({ "x": x, "y": y, "v": arr[y][x] * 1 });
                arr[y][x] = color;
                if (i + 1 >= l) break;
                //后手不判断禁手
                let idx = getBlockFour(x, y, arr);
                x = idx % 15;
                y = parseInt(idx / 15);
                if (idx == moves[i + 1] && arr[y][x] == 0) {
                    OV.push({ "x": x, "y": y, "v": arr[y][x] * 1 });
                    arr[y][x] = nColor;
                }
                else {
                    break;
                }
            }
            else {
                break;
            }
        }
        else if (level.level == 4) { //对手进攻级别等于冲4

            let x = level.p.x;
            let y = level.p.y;
            // 先手会判断禁手
            if ((y * 15 + x) == moves[i] && isFour(x, y, color, arr) && (color == 2 || !isFoul(x, y, arr))) {
                OV.push({ "x": x, "y": y, "v": arr[y][x] * 1 });
                arr[y][x] = color;
                if (i + 1 >= l) break;
                //后手不判断禁手
                let idx = getBlockFour(x, y, arr);
                x = idx % 15;
                y = parseInt(idx / 15);
                if (idx == moves[i + 1] && arr[y][x] == 0) {
                    OV.push({ "x": x, "y": y, "v": arr[y][x] * 1 });
                    arr[y][x] = nColor;
                }
                else {
                    break;
                }
            }
            else {
                break;
            }
        }
        else { //对手进攻级别大于冲4
            break;
        }
    }
    //所有手走完，判断是否出现胜形 (活4，44，冲4抓)
    //VCF的最后一手为44级别，如果是五连会出错
    let isV = false;
    if (OV.length == l) {
        getArr(newarr);
        let fP = findFivePoint(arr, color, newarr);
        if (fP) {
            if (fP.length >= 2) {
                isV = true;
            }
            else {
                let x = fP[0] % 15;
                let y = parseInt(fP[0] / 15);
                if (color == 2 && isFoul(x, y, arr)) isV = true;
            }
        }
    }

    // 还原改动的棋子
    // moves.length 为单数i不会下标越界
    for (i = OV.length - 1; i >= 0; i--) {
        arr[OV[i].y][OV[i].x] = OV[i].v;
    }

    return isV;
}



//判断冲四点是否抓禁，不判断黑棋是否有五连点
//x,y是白棋冲四点. 
function isCatchFoul(x, y, arr) {

    if (arr[y][x] != 0) return false;
    arr[y][x] = 2;
    let ch = false;
    let idx = getBlockFour(x, y, arr);
    if (idx != -1) {
        let tx = idx % 15;
        let ty = parseInt(idx / 15);
        if (isFoul(tx, ty, arr)) ch = tx + ty * 15;
    }
    arr[y][x] = 0;
    return ch;

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



// 不会验证x,y是否有棋子
// 判断 x，y是否长连
function isSix(x, y, color, arr) {

    let ov = arr[y][x];
    arr[y][x] = color;
    let count = 0;

    for (let i = 0; i < 4; i++) { // 分别从4个方向判断
        if (count < 0 || (color == 2 && count > 0)) break;
        for (let j = 0; j > -5; j--) { // 分别判断这个点相关的5个 五
            let pw = getPower(x, y, arr, Cmodel[i], color, j);
            if (color == 2) { // 白棋判断
                if (pw > 5) {
                    count = 1;
                    break;
                }
                // 五连 否定长连
                if (pw == 5 && getArrValue(x, y, j - 1, Cmodel[i], arr) != color) {
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
                    if (getArrValue(x, y, j - 1, Cmodel[i], arr) == color) {
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



// 不会验证x,y是否有棋子
function isLineSix(x, y, model, color, arr) {

    let ov = arr[y][x];
    arr[y][x] = color;

    for (let i = -5; i < 1; i++) {
        let pw = getPower(x, y, arr, model, color, i);
        if (pw == 6) { arr[y][x] = ov; return true; }
    }

    arr[y][x] = ov;
    return false;
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
            let pw = getPower(x, y, arr, Cmodel[i], color, j);
            if (color == 2) { // 白棋
                if (pw >= 5) {
                    count = 1;
                    break;
                }
            }
            else { //黑棋
                if (pw == 5 && getArrValue(x, y, j - 1, Cmodel[i], arr) != color) {
                    count = 1;
                    break;
                }
            }
        }
    }
    arr[y][x] = ov;
    return count > 0 ? true : false;
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
            let pw = getPower(x, y, arr, Cmodel[i], color, j);
            if (color == 2) { //白棋

                if (pw == 4) {
                    if ((getArrValue(x, y, j, Cmodel[i], arr) == 0 && getArrValue(x, y, j + 5, Cmodel[i], arr) == 0) || (getArrValue(x, y, j + 4, Cmodel[i], arr) == 0 && getArrValue(x, y, j - 1, Cmodel[i], arr) == 0)) {
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

                if (pw == 4 && getArrValue(x, y, j - 1, Cmodel[i], arr) != color && getArrValue(x, y, j + 5, Cmodel[i], arr) != color) {

                    if (isLineFF(x, y, Cmodel[i], color, arr)) {
                        count = -1;
                        break;
                    }
                    else { // 确认是黑 ，4连点
                        if ((getArrValue(x, y, j, Cmodel[i], arr) == 0 && getArrValue(x, y, j + 5, Cmodel[i], arr) == 0 && getArrValue(x, y, j + 6, Cmodel[i], arr) != color) || (getArrValue(x, y, j + 4, Cmodel[i], arr) == 0 && getArrValue(x, y, j - 1, Cmodel[i], arr) == 0 && getArrValue(x, y, j - 2, Cmodel[i], arr) != color)) {
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



function isLineFive(x, y, model, color, arr) {

    let ov = arr[y][x];
    arr[y][x] = color;
    let count = 0;

    for (let j = 0; j > -5; j--) {
        let pw = getPower(x, y, arr, model, color, j);
        if (color == 2) { // 白棋
            if (pw >= 5) {
                count = 1;
                break;
            }
        }
        else { //黑棋
            if (pw == 5 && getArrValue(x, y, j - 1, model, arr) != color) {
                count = 1;
                break;
            }
        }
    }

    //console.log(arr)
    //console.log(count)

    arr[y][x] = ov;
    return count > 0 ? true : false;
}



// 不会验证x,y是否有棋子
// 辅助判断33禁，x,y,点在 model指定这条线上是不是一个冲4点,活4
function isLineFour(x, y, model, color, arr, free, pass) {

    let ov = arr[y][x];
    arr[y][x] = color;
    let isf = 0;

    if (color == 2) { // 判断白棋
        for (let i = 0; i > -5; i--) {
            let pw = getPower(x, y, arr, model, color, i);
            if (pw == 4) {
                if ((getArrValue(x, y, i, model, arr) == 0 && getArrValue(x, y, i + 5, model, arr) == 0) || (getArrValue(x, y, i + 4, model, arr) == 0 && getArrValue(x, y, i - 1, model, arr) == 0)) {
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
            let pw = getPower(x, y, arr, model, color, i);
            if (pw == 4 && getArrValue(x, y, i - 1, model, arr) != color && getArrValue(x, y, i + 5, model, arr) != color) {
                if ((getArrValue(x, y, i, model, arr) == 0 && getArrValue(x, y, i + 5, model, arr) == 0 && getArrValue(x, y, i + 6, model, arr) != color) || (getArrValue(x, y, i + 4, model, arr) == 0 && getArrValue(x, y, i - 1, model, arr) == 0 && getArrValue(x, y, i - 2, model, arr) != color)) {
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



function isFourWinPoint(idx, color, arr, backStage, pass, node) {
    node = node || new Node();
    //let istest = idx ==112;
    let pnt = aroundPoint[112];
    let x = idx % 15;
    let y = parseInt(idx / 15);
    let isWin = false; //初始为false, 后续如果无防点就是手数太短不算四手五连
    let OV = arr[y][x];
    let tWinPoint = [];
    let VCT = new Node();
    arr[y][x] = color;
    let lvl = getLevelB(arr, color, getArr([]), 3000, null, true, 3);
    /*
    if (lvl.level >= 4.5) {
        node.childNode[0] = new Node(idx, node);
        isWin = true;
    }
    */
    //mConsole(`__>> idx=${idx}`)
    if (lvl.level >= 3 || findThreeWin(arr, color, getArr([]), [], VCT).length) {
        if (lvl.level >= 3 && isThreeWinPoint(idx, color, arr, true, null, node)) {
            isWin = true;
        }
        else {
            node.childNode[0] = new Node(idx, node);
            if (lvl.level >= 3 && lvl.moves) {
                //mConsole(`VCF__>> idx=${idx}`)
                let VCF = new Node();
                movesToNode(lvl.moves, VCF);
                node.childNode[0].defaultChildNode = VCF;
                VCF.parentNode = node.childNode[0];
            }
            else {
                //mConsole(`VCT__>> idx=${idx}`)
                node.childNode[0].defaultChildNode = VCT;
                VCT.parentNode = node.childNode[0];
            }
            let newarr = selectPoint(arr, color == 1 ? 2 : 1, getArr([]), null, 3 - 2, true, null, true, null, true);
            for (let i = 0; i < 225; i++) { //find blockVCT point
                if (lvl.level >= 3) break;
                let tx = pnt.point[i].x;
                let ty = pnt.point[i].y;
                if (newarr[ty][tx] == 0) {
                    arr[ty][tx] = color == 1 ? 2 : 1;
                    /*
                    istest = idx ==112;
                    if (istest) {
                        istest = ty*15+tx == 146 ? true : false;
                    }
                    */

                    if (isTWin(arr, color, VCT)) {
                        newarr[ty][tx] = -9999;
                    }
                    arr[ty][tx] = 0;
                }
            }
            //mConsole(`<< idx=${idx}`)
            isWin = true;
            for (let i = 0; i < 225; i++) { //exclude block point
                let tx = pnt.point[i].x;
                let ty = pnt.point[i].y;
                if (newarr[ty][tx] == 0) {
                    arr[ty][tx] = color == 1 ? 2 : 1;
                    //如果出现活四级的杀就直接排除防点
                    let cNode = node.childNode[0].childNode;
                    cNode[cNode.length] = new Node(ty * 15 + tx, node.childNode[0]);
                    let nd = cNode[cNode.length - 1];
                    let fPoint = findFFWin(arr, color, getArr([]));
                    if (fPoint.length) {
                        arr[ty][tx] = 0;
                        nd.childNode[0] = new Node(fPoint[0] * 1, nd);
                    }
                    else {
                        let wp = findThreeWin(arr, color, getArr([]), tWinPoint, nd);
                        if (wp.length) {
                            //isWin = true;
                            arr[ty][tx] = 0;
                        }
                        else {
                            isWin = false;
                            node.childNode[0].txt = "○";
                            nd.txt = "○";
                            //node.childNode = [];
                            arr[ty][tx] = 0;
                            if (true || lvl.level < 3) {
                                for (let j = i + 1; j < 225; j++) {
                                    tx = pnt.point[j].x;
                                    ty = pnt.point[j].y;
                                    if (newarr[ty][tx] == 0) {
                                        cNode[cNode.length] = new Node(ty * 15 + tx, node.childNode[0]);
                                        nd = cNode[cNode.length - 1];
                                        nd.txt = "?";
                                    }
                                }
                                i = 9999;
                            }
                        }
                    }
                }
            }

            if (isWin && !pass) { //验证对方先手, 先不验证对手VCT
                let fNum = findVCF(arr, color == 1 ? 2 : 1, 1, 5, 3000, true);
                isWin = fNum == 0;
                if (!isWin) node.childNode = [];
            }
        }
    }

    arr[y][x] = OV;
    //if (isWin && !backStage) {
    if (node.childNode.length && !backStage) {
        post("wLb", [idx, node.childNode[0].txt || "W", "black"]);
        node.firstColor = color == 1 ? "black" : "white";
        post("addTree", [node]);
    }
    if (!isWin) node = new Node();
    return isWin;

    function isTWin(arr, color, node) {

        let x = node.childNode[0].idx % 15;
        let y = parseInt(node.childNode[0].idx / 15);
        let cNode = node.childNode[0].childNode;
        let isT = false;
        if (arr[y][x] > 0) return false;
        if (!isT) { //test VCF
            let moves = [];
            let cNode = node.childNode;
            moves.push(cNode[0].idx * 1);
            cNode = cNode[0].childNode;
            if (cNode[0] != undefined) {
                moves.push(cNode[0].idx * 1);
                cNode = cNode[0].childNode;
                moves.push(cNode[0].idx * 1);
            }
            isT = isVCF(color, arr, moves);
            //if (y*15+x == 160 && istest) console.log(moves)
        }
        //if (y*15+x == 160 && istest) console.log(true)
        if (!isT) {
            arr[y][x] = color; //test VCT
            if (findVCF(arr, color, 1, 0, 3000, true)) { //test VCT
                let bPoint = getBlockVCF(vcfWinMoves, color, arr, true);
                bPoint = bPoint || [];
                if (bPoint && bPoint.length == cNode.length) {
                    let i;
                    for (i = bPoint.length - 1; i >= 0; i--) {
                        if (bPoint.indexOf(cNode[i].idx) + 1) {
                            let idx = cNode[i].idx;
                            let tx = idx % 15;
                            let ty = parseInt(idx / 15);
                            let ttx = cNode[i].childNode[0].idx % 15;
                            let tty = parseInt(cNode[i].childNode[0].idx / 15);
                            if (arr[ty][tx] > 0 || arr[tty][ttx] > 0) { arr[y][x] = 0; return false; }
                            arr[ty][tx] = color == 1 ? 2 : 1;
                            /*
                            if (y*15+x == 160 && istest) {
                                arr[tty][ttx] = "*"
                                console.log (arr)
                                arr[tty][ttx] = 0
                            }
                            */
                            if (isFFWin(ttx, tty, color, arr)) {
                                //console.log("true")
                                isT = true;
                                arr[ty][tx] = 0;
                            }
                            else {
                                isT = false;
                                arr[ty][tx] = 0;
                                break;
                            }

                        }
                        else {
                            break;
                        }
                    }
                    isT = i < 0;
                }
            }
            arr[y][x] = 0;
        }
        return isT;
    }

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
                let pw = getPower(x, y, arr, Cmodel[j], color, i);
                //if (Cmodel[j]=="u") //console.log (pw)
                if (pw == 4) {
                    if (isLineFF(x, y, Cmodel[j], color, arr)) {
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
                let pw = getPower(x, y, arr, Cmodel[j], color, i);
                if (pw == 4 && getArrValue(x, y, i - 1, Cmodel[j], arr) != color && getArrValue(x, y, i + 5, Cmodel[j], arr) != color) {
                    if (isLineFF(x, y, Cmodel[j], color, arr)) {
                        count = 2;
                    }
                    else {
                        isf = true;
                    }
                } // 五连否定冲44
                if (pw == 5 && getArrValue(x, y, i - 1, Cmodel[j], arr) != color) {
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
            let pw = getPower(x, y, arr, Cmodel[i], color, j)
            if (color == 2) {
                if (pw == 3) {
                    count++;
                    if (getArrValue(x, y, j, Cmodel[i], arr) == 0) {
                        if (getArrValue(x, y, j + 4, Cmodel[i], arr) == 0 && (getArrValue(x, y, j + 5, Cmodel[i], arr) == 0 || getArrValue(x, y, j - 1, Cmodel[i], arr) == 0)) {
                            isf = true;
                        }
                        else if (getArrValue(x, y, j + 5, Cmodel[i], arr) == 0) {
                            isf = true;
                        }
                    }
                    else if (getArrValue(x, y, j + 4, Cmodel[i], arr) == 0 && getArrValue(x, y, j - 1, Cmodel[i], arr) == 0) {
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
                    if (getArrValue(x, y, j, Cmodel[i], arr) == 0) {
                        if (getArrValue(x, y, j + 4, Cmodel[i], arr) == 0) {
                            let p = getNextEmpty(x, y, arr, Cmodel[i], 1, j);
                            if (isLineFour(p.x, p.y, Cmodel[i], color, arr, true)) {
                                isf = true;
                            }
                            p = getNextEmpty(x, y, arr, Cmodel[i], 1, j + 4);
                            if (isLineFour(p.x, p.y, Cmodel[i], color, arr, true)) {
                                isf = true;
                            }
                        }
                        else {
                            let p = getNextEmpty(x, y, arr, Cmodel[i], 1, j + 1);
                            if (isLineFour(p.x, p.y, Cmodel[i], color, arr, true)) {
                                isf = true;
                            }
                        }
                    }
                    else if (getArrValue(x, y, j + 4, Cmodel[i], arr) == 0) {
                        let p = getNextEmpty(x, y, arr, Cmodel[i], j + 1);
                        if (isLineFour(p.x, p.y, Cmodel[i], color, arr, true)) {
                            isf = true;
                        }
                    }
                } // 四连以上排除

                if ((pw >= 5) || (pw == 4 && getArrValue(x, y, j - 1, Cmodel[i], arr) != color && getArrValue(x, y, j + 5, Cmodel[i], arr) != color)) {
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



// 不会验证x,y是否有棋子
// x,y,点是否形成33
function isTT(x, y, arr) {

    let color = 1;
    //五连否定33
    if (isFive(x, y, color, arr)) return false;

    let ov = arr[y][x];
    arr[y][x] = color;
    let count = 0;
    // 先搜索33形状
    for (let i = 0; i < 4; i++) {
        if (count < 0) break;
        for (let j = 0; j > -5; j--) {
            let pw = getPower(x, y, arr, Cmodel[i], color, j)

            if (pw == 3) {
                if (getArrValue(x, y, j, Cmodel[i], arr) == 0) {
                    if (getArrValue(x, y, j - 1, Cmodel[i], arr) != color && getArrValue(x, y, j + 5, Cmodel[i], arr) != color) {
                        count++;
                        break;
                        //continue;
                    }
                }
            } // 五连排除33
            if (pw == 5 && getArrValue(x, y, j - 1, Cmodel[i], arr) != color && getArrValue(x, y, j + 5, Cmodel[i], arr) != color) {
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
            if (isLineThree(x, y, Cmodel[i], 1, arr, true)) {
                count++;
            }
            if (count > 1) break;
        }
        arr[y][x] = ov;
        // 累计够两个活3，确认是33
        return count > 1 ? true : false;
    }
}



// 不会验证x,y是否有棋子
// x,y,点在model指定这条线上面是否为3
function isLineThree(x, y, model, color, arr, free) {

    let ov = arr[y][x];
    arr[y][x] = color;
    let isf = false;
    let isfree = false;

    if (color == 2) { // 判断白棋
        for (let i = 0; i > -5; i--) {
            let pw = getPower(x, y, arr, model, color, i);
            if (pw == 3) {
                isf = true;
                if (getArrValue(x, y, i, model, arr) == 0) {
                    if (getArrValue(x, y, i + 4, model, arr) == 0 && (getArrValue(x, y, i + 5, model, arr) == 0 || getArrValue(x, y, i - 1, model, arr) == 0)) {
                        isfree = true;
                        break;
                    }
                    else if (getArrValue(x, y, i + 5, model, arr) == 0) {
                        isfree = true;
                        break;
                    }
                }
                else if (getArrValue(x, y, i + 4, model, arr) == 0 && getArrValue(x, y, i - 1, model, arr) == 0) {
                    isfree = true;
                    break;
                }

            }
            if (pw >= 4) { isf = false; break; }
        }
    }
    else { // 判断黑棋
        for (let i = 0; i > -5; i--) {
            let pw = getPower(x, y, arr, model, color, i);
            if (pw == 3 && getArrValue(x, y, i - 1, model, arr) != color && getArrValue(x, y, i + 5, model, arr) != color) {
                isf = true;
                if (getArrValue(x, y, i, model, arr) == 0) {
                    if (getArrValue(x, y, i + 4, model, arr) == 0) {
                        let p = getNextEmpty(x, y, arr, model, 1, i);
                        if (isLineFour(p.x, p.y, model, color, arr, true)) {
                            isfree = true;
                            break;
                        }
                        p = getNextEmpty(x, y, arr, model, 1, i + 4);
                        if (isLineFour(p.x, p.y, model, color, arr, true)) {
                            isfree = true;
                            break;
                        }
                    }
                    else {
                        let p = getNextEmpty(x, y, arr, model, 1, i + 1);
                        if (isLineFour(p.x, p.y, model, color, arr, true)) {
                            isfree = true;
                            break;
                        }
                    }
                }
                else if (getArrValue(x, y, i + 4, model, arr) == 0) {
                    let p = getNextEmpty(x, y, arr, model, 1, i + 1);
                    if (isLineFour(p.x, p.y, model, color, arr, true)) {
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



// 不会验证x,y是否有棋子
// x,y,点在model指定这条线上面是否为2
function isLineTwo(x, y, model, color, arr, free) {
    let ov = arr[y][x];
    arr[y][x] = color;
    let isf = false;
    let isfree = false;

    for (let i = 0; i > -5; i--) {
        let pw = getPower(x, y, arr, model, color, i);
        if (pw == 2) {
            isf = true;
            if (!getArrValue(x, y, i, model, arr) || !getArrValue(x, y, i + 4, model, arr)) {
                let st = -1;
                let end = -1;
                for (let j = 0; j < 5; j++) {
                    if (getArrValue(x, y, i + j, model, arr) == color) {
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
                        p = getNextEmpty(x, y, arr, model, color, i + st - 2);
                        if (p.x != -1 && isLineThree(p.x, p.y, model, color, arr, true)) {
                            isfree = true;
                            i = -9999;
                            break;
                        }
                        p = getNextEmpty(x, y, arr, model, color, i + st - 1);
                        if (p.x != -1 && isLineThree(p.x, p.y, model, color, arr, true)) {
                            isfree = true;
                            i = -9999;
                            break;
                        }
                        p = getNextEmpty(x, y, arr, model, color, i + st + 2);
                        if (p.x != -1 && isLineThree(p.x, p.y, model, color, arr, true)) {
                            isfree = true;
                            i = -9999;
                            break;
                        }
                        p = getNextEmpty(x, y, arr, model, color, i + st + 3);
                        if (p.x != -1 && isLineThree(p.x, p.y, model, color, arr, true)) {
                            isfree = true;
                            i = -9999;
                            break;
                        }
                        break;
                    case 2:
                        p = getNextEmpty(x, y, arr, model, color, i + st - 1);
                        if (p.x != -1 && isLineThree(p.x, p.y, model, color, arr, true)) {
                            isfree = true;
                            i = -9999;
                            break;
                        }
                        p = getNextEmpty(x, y, arr, model, color, i + st + 1);
                        if (p.x != -1 && isLineThree(p.x, p.y, model, color, arr, true)) {
                            isfree = true;
                            i = -9999;
                            break;
                        }
                        p = getNextEmpty(x, y, arr, model, color, i + st + 3);
                        if (p.x != -1 && isLineThree(p.x, p.y, model, color, arr, true)) {
                            isfree = true;
                            i = -9999;
                            break;
                        }
                        break;
                    case 3:
                        p = getNextEmpty(x, y, arr, model, color, i + st + 1);
                        if (p.x != -1 && isLineThree(p.x, p.y, model, color, arr, true)) {
                            isfree = true;
                            i = -9999;
                            break;
                        }
                        p = getNextEmpty(x, y, arr, model, color, i + st + 2);
                        if (p.x != -1 && isLineThree(p.x, p.y, model, color, arr, true)) {
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



// 不会验证x,y是否有棋子
// 判断是否是一条线上的44,不判断x，y是否五连
function isLineFF(x, y, model, color, arr) {

    let st = 0;
    let ed = 0;
    let i;
    for (i = -1; i > -4; i--) {
        if (getArrValue(x, y, i, model, arr) != color) {
            break;
        }
    }
    st = i + 1;

    for (i = 1; i < 4 + st; i++) {
        if (getArrValue(x, y, i, model, arr) != color) {
            break;
        }
    }
    ed = i - 1;
    //console.log("st="+ st + "   ed=" + ed)
    switch (ed - st) {
        case 0:
            if (getArrValue(x, y, -4, model, arr) == color && getArrValue(x, y, 4, model, arr) == color && getArrValue(x, y, -3, model, arr) == color && getArrValue(x, y, 3, model, arr) == color && getArrValue(x, y, -2, model, arr) == color && getArrValue(x, y, 2, model, arr) == color && getArrValue(x, y, -1, model, arr) == 0 && getArrValue(x, y, 1, model, arr) == 0) {
                if (color == 2) return true;
                if (getArrValue(x, y, -5, model, arr) != color && getArrValue(x, y, 5, model, arr) != color) {
                    return true;
                }
            }
            break;
        case 1:
            if (getArrValue(x, y, -3 + st, model, arr) == color && getArrValue(x, y, 3 + ed, model, arr) == color && getArrValue(x, y, -2 + st, model, arr) == color && getArrValue(x, y, 2 + ed, model, arr) == color && getArrValue(x, y, -1 + st, model, arr) == 0 && getArrValue(x, y, 1 + ed, model, arr) == 0) {
                if (color == 2) return true;
                if (getArrValue(x, y, -4 + st, model, arr) != color && getArrValue(x, y, 4 + ed, model, arr) != color) {
                    return true;
                }
            }
            break;
        case 2:
            if (getArrValue(x, y, -2 + st, model, arr) == color && getArrValue(x, y, 2 + ed, model, arr) == color && getArrValue(x, y, -1 + st, model, arr) == 0 && getArrValue(x, y, 1 + ed, model, arr) == 0) {
                if (color == 2) return true;
                if (getArrValue(x, y, -3 + st, model, arr) != color && getArrValue(x, y, 3 + ed, model, arr) != color) {
                    return true;
                }
            }
            break;
        case 3:
            /*
                if (color==2) {
                    for ( i=0;i>st;i--)  {
                       if(getPower(x,y,arr,model,color,i)==4) return true;
                    }
                    for ( i=0;i<ed;i++)  {
                       if(getPower(x,y,arr,model,color,i-4)==4) return true;
                    }
                }
                break;
            */
    }

    return false;
}



function getLines(idx, color, arr, level) {
    let lines = [];
    let x = idx % 15;
    let y = parseInt(idx / 15);
    //console.log(`idx=${idx}, x=${x}, y=${y}`)
    for (let i = 0; i < 4; i++) {
        let line = getLine(Cmodel[i]);
        //console.log(line)
        if (line) lines.push(line);
    }
    return lines;

    function getLine(model) {
        let p;
        let isf;
        let count = 0;
        let start, end;
        let points = [];
        arr[y][x] = color;
        //console.log(model)
        switch (level) {
            case 3:
                for (let i = -3; i < 0; i++) {
                    p = getArrPoint(x, y, i, model);
                    if (p.x != -1 && arr[p.y][p.x] == 0) {
                        isf = isLineFour(p.x, p.y, model, color, arr, true);
                        if (isf) {
                            points.push(p);
                            break;
                        }
                    }
                }

                for (let i = 3; i > 0; i--) {
                    p = getArrPoint(x, y, i, model);
                    if (p.x != -1 && arr[p.y][p.x] == 0) {
                        isf = isLineFour(p.x, p.y, model, color, arr, true);
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
                    p = getArrPoint(x, y, i, model);
                    if (p.x != -1 && arr[p.y][p.x] == 0) {
                        isf = isLineFive(p.x, p.y, model, color, arr);
                        if (isf) {
                            points.push(p);
                            break;
                        }
                    }
                }

                for (let i = 4; i > 0; i--) {
                    p = getArrPoint(x, y, i, model);
                    if (p.x != -1 && arr[p.y][p.x] == 0) {
                        isf = isLineFive(p.x, p.y, model, color, arr);
                        if (isf) {
                            points.push(p);
                            break;
                        }
                    }
                }
                setLine();
                break;
            case 5:
                if (isLineFive(x, y, model, color, arr)) {
                    points.push({ x: x, y: y });
                }
                setLine();
                break;
        }
        arr[y][x] = 0;

        if (start != end) {
            //console.log(`start=${start}, end=${end}, model=${model}`)
            return { "start": start, "end": end };
        }

        function setLine() {
            if (points.length) {
                start = getArrIndex(points[0].x, points[0].y, 0, model);
                let j = 0;
                while (true) {
                    j--;
                    let c = getArrValue(points[0].x, points[0].y, j, model, arr);
                    if (c == color) {
                        start = getArrIndex(points[0].x, points[0].y, j, model);
                    }
                    else {
                        break;
                    }
                }
                end = getArrIndex(points[points.length - 1].x, points[points.length - 1].y, 0, model);
                j = 0;
                while (true) {
                    j++;
                    let c = getArrValue(points[points.length - 1].x, points[points.length - 1].y, j, model, arr);
                    if (c == color) {
                        end = getArrIndex(points[points.length - 1].x, points[points.length - 1].y, j, model);
                    }
                    else {
                        break;
                    }
                }
            }
        }
    }
}



//  找出，x，y，的反防解禁点,返回的点可能包含禁点
function getThreeUndoFail(x, y, arr) {

    let ps = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j < 5; j++) {
            let p = getArrPoint(x, y, j, Cmodel[i], arr);
            let ov;
            if (p.x != -1 && arr[p.y][p.x] == 0) {
                ov = arr[p.y][p.x];
                arr[p.y][p.x] = 1;
                if (isLineFour(x, y, Cmodel[i], 1, arr, null, true)) {
                    ps.push(getArrIndex(x, y, j, Cmodel[i], arr) * 1);
                    //post("wLb", [ps[ps.length-1],"6","red"]);
                }
                arr[p.y][p.x] = ov;
            }
            p = getArrPoint(x, y, -j, Cmodel[i], arr);
            if (p.x != -1 && arr[p.y][p.x] == 0) {
                ov = arr[p.y][p.x];
                arr[p.y][p.x] = 1;
                if (isLineFour(x, y, Cmodel[i], 1, arr, null, true)) {
                    ps.push(getArrIndex(x, y, -j, Cmodel[i], arr) * 1);
                    //post("wLb", [ps[ps.length-1],"6","red"]);
                }
                arr[p.y][p.x] = ov;
            }
        }
    }
    return ps;
}


// 找出x，y，活三的六腐 防点,返回的点可能包含禁点
function getSixFramePoint(x, y, arr) {

    let ps = [];
    let ov = arr[y][x];
    arr[y][x] = 1
    for (let i = 0; i < 4; i++) {
        if (isLineThree(x, y, Cmodel[i], 1, arr, true)) {
            let count = 0;
            let p;
            let fp;
            for (let j = 1; j < 4; j++) { // 找活四点计数
                if (getArrValue(x, y, j, Cmodel[i], arr) == 0) {
                    p = getArrPoint(x, y, j, Cmodel[i], arr);
                    if (isFour(p.x, p.y, 1, arr, true)) {
                        count += 1;
                        fp = p;
                    }
                }
                if (getArrValue(x, y, -j, Cmodel[i], arr) == 0) {
                    p = getArrPoint(x, y, -j, Cmodel[i], arr);
                    if (isFour(p.x, p.y, 1, arr, true)) {
                        count += 2;
                        fp = p;
                    }
                }
            }
            //console.log("count="+count)
            let tx;
            let ty;
            let idx;
            if (count == 1 || count == 2) { // 存在唯一活四点
                for (let j = 1; j < 5; j++) { // 找六腐防点
                    if (getArrValue(fp.x, fp.y, j, Cmodel[i], arr) == 0) {
                        if (getArrValue(fp.x, fp.y, j + 1, Cmodel[i], arr) == 0) {
                            idx = getArrIndex(fp.x, fp.y, j + 1, Cmodel[i], arr);
                            tx = idx % 15;
                            ty = parseInt(idx / 15);
                            if (!isLineFour(tx, ty, Cmodel[i], 1, arr)) ps.push(idx);
                        }
                        break;
                    }
                }
                for (let j = 1; j < 5; j++) { //找六腐防点
                    if (getArrValue(fp.x, fp.y, -j, Cmodel[i], arr) == 0) {
                        if (getArrValue(fp.x, fp.y, -j - 1, Cmodel[i], arr) == 0) {
                            idx = getArrIndex(fp.x, fp.y, -j - 1, Cmodel[i], arr);
                            tx = idx % 15;
                            ty = parseInt(idx / 15);
                            if (!isLineFour(tx, ty, Cmodel[i], 1, arr)) ps.push(idx);
                        }
                        break;
                    }
                }
            }
        }
    }
    arr[y][x] = ov;

    //console.log("ps="+ps)
    return ps;
}



function getScore(x, y, color, arr, level) {
    let ov = arr[y][x];
    arr[y][x] = color;
    if (isFour(x, y, color, arr)) {
        let idx = getBlockFour(x, y, arr);
    }
    else {
        let bPoint = getBlockVCF(vcfWinMoves, color, arr, true);
    }
    arr[y][x] = ov;
}



// 找防冲4抓禁，防点
function blockCatchFoul(arr) {

    let fp = [];
    let fPoint = []; //二维数组，抓禁冲四点
    let FOULP = [];
    let notBlock = true; // 假设没有防点
    let node = new Node();
        node.firstColor = "black";
    for (let y = 0; y < 15; y++) { // 找出所有冲四抓
        for (let x = 0; x < 15; x++) {
            let p = isCatchFoul(x, y, arr);
            if (p) {
                fPoint.push([y * 15 + x]);
                FOULP.push(p); // 保存禁点
            }
            else if (arr[y][x] == 0 && isFour(x, y, 2, arr)) {
                fp.push([y * 15 + x]); // 保存白棋其它冲四点，避免黑解禁同时造抓禁。
            }
        }
    }
    if (!fPoint.length) {
        return [-1];
    }
    // 合并数组
    for (let i = fp.length - 1; i >= 0; i--) {
        fPoint.push(fp[i].slice(0));
    }
    //console.log(fPoint)

    // 找出这些抓的防点，排除先手防
    let bPoint = getBlockVCF(fPoint, 2, arr, true, true);
    //console.log("bPoint"+bPoint)
    if (bPoint) {
        post("cleLb", ["all"]);
        let fourP = fPoint[0]; // 冲四点
        let x = fourP % 15;
        let y = parseInt(fourP / 15);
        arr[y][x] = 2;
        let foulP = getBlockFour(x, y, arr); //禁点
        arr[y][x] = 0;
        x = foulP % 15;
        y = parseInt(foulP / 15);
        let threeP = getThreeUndoFail(x, y, arr); // 三三 潜在反防点
        let tx = fPoint[0][0] % 15;
        let ty = parseInt(fPoint[0][0] / 15);
        arr[ty][tx] = 2; // 先填白棋冲4点，再找六腐框架，避免多层禁手漏算
        let sixFrameP = getSixFramePoint(x, y, arr); // 六腐解禁点
        arr[ty][tx] = 0;
        for (let i = bPoint.length - 1; i >= 0; i--) {
            let s;
            let color;
            if (fPoint.length - fp.length == 1) { // 单抓防点
                if (bPoint[i] == fourP || bPoint[i] == foulP) {
                    s = "A";
                }
                else if (sixFrameP.indexOf(bPoint[i]) > -1) {
                    s = "✖";
                }
                else {
                    x = bPoint[i] % 15;
                    y = parseInt(bPoint[i] / 15);
                    arr[y][x] = 1; // 反防 : 禁解禁;
                    s = isFour(getX(foulP), getY(foulP), 1, arr) && (threeP.indexOf(bPoint[i]) > -1) ? "■" : "◎";
                    arr[y][x] = 0;
                }
                color = "black";
            }
            else { // 双防点
                s = "○";
                color = "black";
            }
            notBlock = false;
            post("wLb", [bPoint[i], s, color]);
            node.childNode.push(new Node(bPoint[i], node));
            node.childNode[node.childNode.length - 1].txt = s;
        }
    }
    else {
        bPoint = []; // 没有防点，bPoint 从false改为空数组
    }


    let fMoves = []; //  保存先手连续冲四分支
    //continueFour(arr, 1, 4, fMoves, getArr([]));
    fMoves = getContinueBlockVCF(arr, 2, fPoint);
    if (fMoves.length) post("showLabel", [`开始计算 先手防 ......${fMoves.length}`, 2000]);
    /*
    if (fMoves.length) {
        // fMoves 排序
        let len = fMoves.length;
        for (let i = len - 2; i >= 0; i--) {
            for (let j = len - 1; j > i; j--) {
                if (fMoves[i].length <= fMoves[j].length) {
                    let m = fMoves[i]; // 不能用 splice 返回的指针赋值给m，会变三维数组
                    fMoves.splice(i, 1);
                    fMoves.splice(j, 0, m);
                    break;
                }
            }
        }
    }
    */


    // 分析先手增加防点，(先手直接解禁&先手用白子解禁,必增加防点)
    let len = fMoves.length;
    let x;
    let y;
    let idx; // 保存先手防第一手的idx

    for (let k = len - 1; k >= 0; k--) {
        idx = -1;
        // 摆棋
        for (let i = fMoves[k].length - 1; i >= 0; i--) {
            x = fMoves[k][i] % 15;
            y = parseInt(fMoves[k][i] / 15);
            arr[y][x] = i % 2 ? 2 : 1;
        }

        // 打印正在计算的点
        post("printSearchPoint", [fMoves[k][0], "⊙", "green"]);
        // 扫描防点
        let lvl = getLevel(arr, 2)
        let blk = [];
        if (lvl.level == 4) {
            if (!isFoul(lvl.p.x, lvl.p.y, arr)) {
                blk.push(lvl.p.y * 15 + lvl.p.x);
            }
        }
        else if (lvl.level < 4) {
            blk = getBlockVCF(fPoint, 2, arr, true, true);
        }
        //bPoint = bPoint==false ? [] : bPoint;
        for (let i = blk.length - 1; i >= 0; i--) {
            let j;
            for (j = bPoint.length - 1; j >= 0; j--) {
                if (bPoint[j] == blk[i]) break; // 没有先手增加的防点
            }
            let nBlk = (j < 0);
            // 白棋占禁点
            for (let n = FOULP.length - 1; n >= 0; n--) {
                if (fMoves[k][fMoves[k].length - 1] == FOULP[n]) {
                    j = -1;
                    n = -1;
                }
            }
            if (j < 0) { // 找到新防点,或者白占禁点
                x = blk[i] % 15;
                y = parseInt(blk[i] / 15);
                let narr = copyArr([], arr);
                narr[y][x] = 1;
                // 需要判断对手是否有攻，搜索VCF不严谨
                //lvl = findVCF(narr, 2, 1, 10, 10000, true);
                if (true || lvl == 0) { // 白棋没有新的VCF,新防点成立
                    let nd;
                    idx = fMoves[k][0];
                    //post("printSearchPoint", []); // 清空刚才计算的点
                    post("wLb", [idx, "○", "black"]);
                    nd = movesToNode(fMoves[k], node);
                    if (nBlk) {
                        nd.childNode.push(new Node(blk[i], nd));
                        nd = nd.childNode[nd.childNode.length - 1];
                    }
                    nd.txt = "○";
                    let pNode = nd.parentNode;
                    while (pNode && pNode != node) {
                        if (pNode.txt) break;
                        pNode.txt = "○";
                        pNode = pNode.parentNode;
                    }
                    i = -1;
                }
                notBlock = false;
            }
        }

        // 复原棋子
        for (let i = fMoves[k].length - 1; i >= 0; i--) {
            x = fMoves[k][i] % 15;
            y = parseInt(fMoves[k][i] / 15);
            arr[y][x] = 0;
        }

        /*
        if (idx > -1) { // 有新增加的防点
            for (let i = k - 1; i >= 0; i--) { // 排除 idx 冲四的分支
                for (let j = fMoves[i].length - 2; j >= 0; j -= 2) {
                    if (fMoves[i][j] == idx) {
                        fMoves.splice(i, 1);
                        k--;
                        break;
                    }
                }
            }
        }
        */

        fMoves.length--;


    }
    //post("printSearchPoint", []); // 清空刚才计算的点
    if (!notBlock) {
        node.firstColor = "black";
        post("addTree", [node]);
    }
    return [notBlock ? 0 : 1];

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
                let pw = getPower(x, y, arr, Cmodel[i], color)

                if (pw == 4) {

                    let p = getNextEmpty(x, y, arr, Cmodel[i], color);
                    if (getArrValue(x, y, -1, Cmodel[i], arr) == color || getArrValue(x, y, 5, Cmodel[i], arr) == color) {
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
                let pw = getPower(x, y, arr, Cmodel[i], color);
                if (color == 2) {
                    if (pw == 4) {
                        let p = getNextEmpty(x, y, arr, Cmodel[i], color);
                        newarr[p.y][p.x] += Math.pow(10, i);
                        if (fP.indexOf(p.y * 15 + p.x) == -1) fP.push(p.y * 15 + p.x);
                        count++;
                    }

                }
                else {

                    if (pw == 4) {
                        let p = getNextEmpty(x, y, arr, Cmodel[i], color);
                        newarr[p.y][p.x] += Math.pow(10, i);
                        count++;

                        if (getArrValue(x, y, -1, Cmodel[i], arr) == color || getArrValue(x, y, 5, Cmodel[i], arr) == color) {
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

                let pw = getPower(x, y, arr, Cmodel[i], color);

                if (color == 2) {
                    if (pw == 3) {
                        let p = getNextEmpty(x, y, arr, Cmodel[i], color);
                        newarr[p.y][p.x] += Math.pow(10, i);
                        p = getNextEmpty(p.x, p.y, arr, Cmodel[i], color, 1);
                        newarr[p.y][p.x] += Math.pow(10, i);
                    }

                    if (pw == 4) {
                        let p = getNextEmpty(x, y, arr, Cmodel[i], color);
                        newarr[p.y][p.x] = -9999;
                    }

                }
                else {

                    if (pw == 3 && getArrValue(x, y, -1, Cmodel[i], arr) != color && getArrValue(x, y, 5, Cmodel[i], arr) != color) {
                        let p = getNextEmpty(x, y, arr, Cmodel[i], color);
                        newarr[p.y][p.x] += Math.pow(10, i);
                        p = getNextEmpty(p.x, p.y, arr, Cmodel[i], color, 1);
                        newarr[p.y][p.x] += Math.pow(10, i);

                    }
                    if (pw == 4 && getArrValue(x, y, -1, Cmodel[i], arr) != color && getArrValue(x, y, 5, Cmodel[i], arr) != color) {
                        let p = getNextEmpty(x, y, arr, Cmodel[i], color);
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
    let free = ftype == onlyFree ? true : ftype == onlyNoFree ? false : null;
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
        let x = fPoint[i] % 15;
        let y = parseInt(fPoint[i] / 15);
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

                let pw = getPower(x, y, arr, Cmodel[i], color);

                if (color == 2) {
                    if (pw == 2) {
                        let p = getNextEmpty(x, y, arr, Cmodel[i], color);
                        newarr[p.y][p.x] += Math.pow(10, i);
                        p = getNextEmpty(p.x, p.y, arr, Cmodel[i], color, 1);
                        newarr[p.y][p.x] += Math.pow(10, i);
                        p = getNextEmpty(p.x, p.y, arr, Cmodel[i], color, 1);
                        newarr[p.y][p.x] += Math.pow(10, i);
                    }
                    if (pw == 4) {
                        let p = getNextEmpty(x, y, arr, Cmodel[i], color);
                        newarr[p.y][p.x] = -9999;
                    }

                }
                else {

                    if (pw == 2 && getArrValue(x, y, -1, Cmodel[i], arr) != color && getArrValue(x, y, 5, Cmodel[i], arr) != color) {
                        let p = getNextEmpty(x, y, arr, Cmodel[i], color);
                        newarr[p.y][p.x] += Math.pow(10, i);
                        p = getNextEmpty(p.x, p.y, arr, Cmodel[i], color, 1);
                        newarr[p.y][p.x] += Math.pow(10, i);
                        p = getNextEmpty(p.x, p.y, arr, Cmodel[i], color, 1);
                        newarr[p.y][p.x] += Math.pow(10, i);

                    }
                    if (pw == 4 && getArrValue(x, y, -1, Cmodel[i], arr) != color && getArrValue(x, y, 5, Cmodel[i], arr) != color) {
                        let p = getNextEmpty(x, y, arr, Cmodel[i], color);
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
    let free = ftype == onlyFree ? true : ftype == onlyNoFree ? false : null;
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



//找出可能的，活3级别攻击点(不验证做V后是否也给对手做了V)
function findLevelThreePoint(arr, color, newarr, fType, idx, backstage, num, depth) {
    num = typeof num == "number" ? parseInt(num) : 9999;
    backstage = backstage == null ? true : backstage;
    let threeP = []; // 保存活3点，包括复活3
    let simpleP = []; // 保存坐杀点
    let vcfP = []; // 保存做V点
    let pnt = aroundPoint[idx || 112];

    // 先判断对手进攻级别,快速选点     
    selectPoint(arr, color, newarr, null, 3, backstage);

    for (let i = 0; i < 225; i++) {

        let x = pnt.point[i].x;
        let y = pnt.point[i].y;

        if (!stopFind && newarr[y][x] == 0) {

            arr[y][x] = color;
            if (!backstage) post("printSearchPoint", [pnt.index[i], "⊙", "green"]);

            let level = getLevelB(arr, color, newarr, null, fType == onlySimpleWin ? 1 : depth, null, num == 9999 ? 9999 : num - 1);
            let nColor = color == 1 ? 2 : 1;
            let fNum = findVCF(arr, nColor, 1, depth, null, true);
            if (level.level < 4 && level.level >= 3 && fNum == 0) {
                //console.log(x+15*y)
                let l = level.moves.length; // 保存手数，待后面判断43杀
                // 已经确认对手低于活三级别
                //if (!backstage) post("cleLb", [pnt.index[i]]);
                if (true || (color == 1 && l == 1) || isThree(x, y, color, arr, true)) {
                    if (true || fType == null) {
                        if (!backstage) {
                            let txt = isThree(x, y, color, arr, true) ? "③" : "V" + (l < 100 ? String(l) : "++");
                            let txtColor = txt == "③" ? "red" : l <= 3 ? "red" : "black";
                            post("printSearchPoint", []);
                            post("wLb", [pnt.index[i], txt, txtColor]);
                            post("addThreePoint", [pnt.index[i], { txt: txt, txtColor: txtColor, moves: level.moves }]);
                        }
                        threeP.splice(0, 0, { idx: pnt.index[i], moves: level.moves });
                    }

                }
                else {

                    if (fType == null) {
                        if (!backstage) {
                            post("printSearchPoint", []);
                            post("wLb", [pnt.index[i], "V", l > 3 ? "black" : "red"]);
                        }
                        if (l > 3) {
                            vcfP.splice(0, 0, { idx: pnt.index[i], moves: level.moves });
                        }
                        else {
                            simpleP.splice(0, 0, { idx: pnt.index[i], moves: level.moves });
                        }
                    }
                    else { // 进一步判断是否做V
                        if ((fType == onlyVCF && l > 3) || (fType == onlySimpleWin && l == 3)) {
                            if (!backstage) {
                                post("printSearchPoint", []);
                                post("wLb", [pnt.index[i], "V", l > 3 ? "black" : "red"]);
                            }
                            if (l > 3) {
                                vcfP.splice(0, 0, { idx: pnt.index[i], moves: level.moves });
                            }
                            else {
                                simpleP.splice(0, 0, { idx: pnt.index[i], moves: level.moves });
                            }
                        }
                    }
                }
            }
            arr[y][x] = 0;
        }
        else {
            if (!backstage) post("cleLb", [pnt.index[i]]);
        }
    }

    if (!backstage) post("printSearchPoint", []);

    return threeP;
    return simpleP.concat(threeP, vcfP);
    return vcfP.concat(simpleP, threeP);


}


function isLevelThreePoint(idx, color, arr, fType) {

    let x = idx % 15;
    let y = parseInt(idx / 15);

    arr[y][x] = color;
    let level = getLevelB(arr, color, getArr([]), 60000, fType == onlySimpleWin ? 1 : null);
    let nColor = color == 1 ? 2 : 1;
    if (level.level < 4 && level.level >= 3) {
        let l = level.moves.length; // 保存手数，待后面判断43杀
        let txt = "";
        let txtColor;
        if (isThree(x, y, color, arr, true)) {
            if (fType == null) {
                txt = "③";
                txtColor = "red";
                postPoint(idx, txt, txtColor, level.moves);
            }
        }
        else if (l == 1) {
            txt = color == 1 ? "③" : "V";
            txtColor = color == 1 ? "black" : "red";
            txt = txt != "V" ? txt : l < 100 ? "V" + String(l) : "V++";
            if (fType == null) {
                postPoint(idx, txt, txtColor, level.moves);
            }
            else if (fType == onlySimpleWin && color == 2) {
                postPoint(idx, txt, txtColor, level.moves);
            }
        }
        else {

            if (fType != onlySimpleWin && l > 3) { //搜索冲4复活3
                findVCF(arr, color, 1, 1, 3000, true);
                l = vcfWinMoves.length ? 3 : l;
                level.moves = vcfWinMoves.length ? vcfWinMoves[0] : level.moves;
            }
            if (l > 3) {
                findVCF(arr, color, undefined, 10, 5000, true);
                l = vcfWinMoves.length ? vcfWinMoves[0].length : l;
                level.moves = vcfWinMoves.length ? vcfWinMoves[0] : level.moves;
            }
            let x, y;
            for (let i = l - 2; i >= 0; i--) {
                x = level.moves[i] % 15;
                y = parseInt(level.moves[i] / 15);
                arr[y][x] = i % 2 ? nColor : color;
            }
            x = level.moves[l - 1] % 15;
            y = parseInt(level.moves[l - 1] / 15);
            let isfreeFour = isFour(x, y, color, arr, true);
            //mConsole(toStr(arr))
            for (let i = l - 2; i >= 0; i--) {
                x = level.moves[i] % 15;
                y = parseInt(level.moves[i] / 15);
                arr[y][x] = 0;
            }
            //mConsole(isF)
            txt = "V";
            txtColor = l > 3 ? "black" : (!isfreeFour && color == 2) ? "black" : "red";
            txt = l < 100 ? "V" + String(l) : "V++";
            if (fType == null) {
                postPoint(idx, txt, txtColor, level.moves);
            }
            else { // 进一步判断是否做V
                if ((fType == onlyVCF && txtColor == "black") || (fType == onlySimpleWin && txtColor == "red")) {
                    postPoint(idx, txt, txtColor, level.moves);
                }
            }
        }

    }
    arr[y][x] = 0;

    function postPoint(idx, txt, txtColor, moves) {
        post("wLb", [idx, txt, txtColor]);
        post("addThreePoint", [idx, { txt: txt, txtColor: txtColor, moves: moves }]);
    }
}



// 计算先手防 查找连续冲四，经过的点存入newarr,所有冲四分支存入fMoves。
// 连续冲四方，必须没有VCF，如果有VCF可能影响计算结果
//  depth＝0继续算一层，确保最后一手对手的棋不会是反 活4 and 44
function continueFour(arr, color, depth, fMoves, newarr, FailMoves, moves, selectArr, fMovesKey, winMoves) {

    if (stopFind) return;
    if (depth < 0) return;
    if (FailMoves == null) {
        FailMoves = [];
        for (let i = 0; i < 225; i++) { FailMoves[i] = []; }
        moves = [];
    }
    fMovesKey = fMovesKey || [];
    //冲四方不存在VCF,不验证五连
    let level = getLevel(arr, color == 1 ? 2 : 1);
    if (level.level < 4) {
        let narr = getArr([]);
        if (findFourPoint(arr, color, narr)) {
            for (let y = 0; y < 15; y++) {
                for (let x = 0; x < 15; x++) {
                    if (narr[y][x] > 0) {
                        arr[y][x] = color;
                        moves.push(y * 15 + x);
                        let idx = getBlockFour(x, y, arr);
                        let tx = idx % 15;
                        let ty = parseInt(idx / 15);

                        arr[ty][tx] = color == 1 ? 2 : 1;
                        //冲四方不存在VCF,不验证禁手
                        moves.push(ty * 15 + tx);
                        let pushKey = selectArr && (selectArr.nColorArr[y][x] > 0 || selectArr.colorArr[ty][tx] > 0);
                        if (pushKey) {
                            fMovesKey.push(y * 15 + x);
                            fMovesKey.push(ty * 15 + tx);
                        }
                        if (findMoves(FailMoves, moves)) {
                            moves.length -= 2;
                            if (pushKey) fMovesKey.length -= 2;
                            arr[ty][tx] = 0;
                            arr[y][x] = 0;

                        }
                        else {
                            let ctn = continueFour(arr, color, depth - 1, fMoves, newarr, FailMoves, moves, selectArr, fMovesKey, winMoves);
                            pushFailMoves(FailMoves, moves);
                            if (ctn) {
                                if ((selectArr && fMovesKey.length && isBlock(color, arr, winMoves)) || !selectArr) fMoves.push(moves.slice(0));
                                if (selectArr && fMovesKey.length && isBlock(color, arr, winMoves)) selectArr.movesKey.push(fMovesKey.slice(0));
                                /*
                                mConsole("st--")
                                mConsole(moves.slice(0));
                                mConsole(fMovesKey.slice(0));
                                mConsole("--end")
                                */
                            }
                            moves.length -= 2;
                            if (pushKey) fMovesKey.length -= 2;
                            arr[ty][tx] = 0;
                            arr[y][x] = 0;
                            newarr[y][x] = color;
                            newarr[ty][tx] = color;
                        }
                    }
                }
            }
        }
    }
    else if (level.level == 4) {
        let x = level.p.x;
        let y = level.p.y;
        if (isFour(x, y, color, arr)) {
            arr[y][x] = color;
            moves.push(y * 15 + x);
            let idx = getBlockFour(x, y, arr);
            let tx = idx % 15;
            let ty = parseInt(idx / 15);
            arr[ty][tx] = color == 1 ? 2 : 1;
            //冲四方不存在VCF,不验证禁手
            moves.push(ty * 15 + tx);
            let pushKey = selectArr && (selectArr.nColorArr[y][x] > 0 || selectArr.colorArr[ty][tx] > 0);
            if (pushKey) {
                fMovesKey.push(y * 15 + x);
                fMovesKey.push(ty * 15 + tx);
            }
            if (findMoves(FailMoves, moves)) {
                moves.length -= 2;
                if (pushKey) fMovesKey.length -= 2;
                arr[ty][tx] = 0;
                arr[y][x] = 0;
            }
            else {
                let ctn = continueFour(arr, color, depth - 1, fMoves, newarr, FailMoves, moves, selectArr, fMovesKey, winMoves);
                pushFailMoves(FailMoves, moves);
                if (ctn) { //后续没有分支保存当前分支
                    if ((selectArr && fMovesKey.length && isBlock(color, arr, winMoves)) || !selectArr) fMoves.push(moves.slice(0));
                    if (selectArr && fMovesKey.length && isBlock(color, arr, winMoves)) selectArr.movesKey.push(fMovesKey.slice(0));
                }
                moves.length -= 2;
                if (pushKey) fMovesKey.length -= 2;
                arr[ty][tx] = 0;
                arr[y][x] = 0;
                newarr[y][x] = color;
                newarr[ty][tx] = color;
            }
        }
    }
    else {
        return false;
    }
    return true;
    //console.log("fMoves.length=\n"+fMoves.length+"\n"+fMoves)
    function isBlock(color, arr, winMoves) {
        for (let i = winMoves.length - 1; i >= 0; i--) {
            let moves = winMoves[i];
            if (!isVCF(color, arr, moves)) return true;
            //getBlockVCF([moves],color,arr,true,true);
        }
    }
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

// 找三手五连
function findThreeWin(arr, color, newarr, tWinPoint, node) {
    tWinPoint = tWinPoint || [];
    node = node || new Node();
    let wPoint = [];
    //快速搜索VCF
    if (findVCF(arr, color, 1, 3 - 2, null, true)) {
        wPoint.push(vcfWinMoves[0][0] * 1);
        let nd = node;
        nd.childNode[0] = new Node(vcfWinMoves[0][0] * 1, nd);
        if (vcfWinMoves[0].length > 1) {
            nd = nd.childNode[0];
            nd.childNode[0] = new Node(vcfWinMoves[0][1] * 1, nd);
            nd = nd.childNode[0];
            nd.childNode[0] = new Node(vcfWinMoves[0][2] * 1, nd);
        }

    }
    else { //再搜索活3的3手胜
        let tPoint = findLevelThreePoint(arr, color, newarr, null, null, true, 3);
        let tempPs = [];
        for (let i = tPoint.length - 1; i >= 0; i--) {
            tempPs.push(tPoint[i].idx * 1);
        }
        tPoint = tempPs;
        /*
        let twIdx;
        //if (testidx) console.log(tPoint)
        //if (testidx) console.log(arr)
        for (twIdx = tWinPoint.length - 1; twIdx >= 0; twIdx--) {
            let idx = tPoint.indexOf(tWinPoint[twIdx] * 1);
            if (idx > -1) {
                tPoint.splice(idx, 1);
                if (isThreeWinPoint(tWinPoint[twIdx], color, arr, true, null, node)) {
                    wPoint.push(tWinPoint[twIdx] * 1);
                    console.log("复用")
                    break;
                }
            }
        }
        if (twIdx < 0) {
        */
        //if (testidx) console.log("twIdx < 0_____" + tPoint)
        for (let i = tPoint.length - 1; i >= 0; i--) {
            //if (testidx) console.log(tPoint[i]);
            if (isThreeWinPoint(tPoint[i], color, arr, true, null, node)) {
                wPoint.push(tPoint[i] * 1);
                let tNode = node.childNode.splice(node.childNode.length - 1, 1);
                node.childNode.splice(0, 0, tNode[0]);
                //tWinPoint.push(tPoint[i] * 1);
                //console.log("push")
                i = -1;
            }
        }
        //}
    }
    //if (wPoint.length == 0) node.childNode = [];
    return wPoint;
}



// 搜索米字线,半径内是否有棋子，不判断中心点
function around(arr, idx, radius) {

    let x = idx % 15;
    let y = parseInt(idx / 15);
    for (let i = 0; i < 4; i++) {
        for (let j = 1; j <= radius; j++) {
            let v = getArrValue(x, y, j, Cmodel[i], arr);
            if (v == 1 || v == 2) return true;
            v = getArrValue(x, y, -j, Cmodel[i], arr);
            if (v == 1 || v == 2) return true;
        }
    }
    return false;
}



// 围绕 idx 查找四周的点(包括idx),color=查找颜色，radius=辐射半径
function aroundFindPoint(arr, idx, radius, continueFourFirst) {

    let P = [];
    let firstP = [];
    radius = radius == null ? 7 : radius;

    // 从里到外，绕圈搜索
    let Pnt = aroundPoint[idx];
    let max = Pnt.radius[radius] - 1;
    let x = idx % 15;
    let y = parseInt(idx / 15);
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


let test;
// 找VCF 级别双杀点
function isTwoVCF(idx, color, arr) {

    //test = idx == 130;
    let pNum = 0; //双杀点计数
    let timeout = 30000;
    let depth = 1000;
    let x = idx % 15;
    let y = parseInt(idx / 15);
    let oldVCFMoves = new vcfList([]);
    let keyMapList = [];
    let isAddTree;
    if (isThree(x, y, color, arr, true)) return;
    // 处理直接防
    arr[y][x] = color;
    // 对手准备落子，判断对手是否有攻。
    let nLevel = getLevelB(arr, color == 1 ? 2 : 1, getArr([]), timeout, depth, true);
    //findVCF(color,timeOut,depth,count,backStage,arr) 
    let fNum = nLevel.level >= 3 ? 0 : findVCF(arr, color, 2, depth, timeout, true);
    let node = new Node();
    let cNode = node.childNode;
    cNode[0] = new Node(idx, node);
    if (fNum) { // 有两套V，判断双杀是否成立
        isAddTree = true;
        let notWin = false; //后续计算，如果双杀不成立==true
        let winMoves = [];
        winMoves.push(vcfWinMoves[0].slice(0));
        simpleVCF(color, arr, winMoves[0]);
        let VCF = new Node();
        movesToNode(winMoves[0], VCF);
        cNode[0].defaultChildNode = VCF;
        VCF.parentNode = cNode[0];
        let bPoint = getBlockVCF(winMoves, color, arr, true, true);
        //console.log(bPoint)


        if (bPoint) { //排除直接防
            let nd = cNode[0];
            if (!(excludeBP(arr, color == 1 ? 2 : 1, bPoint, timeout, depth, nd, winMoves))) {
                //排除失败，双杀不成立
                notWin = true;
            }
        }

        if (!notWin) { // 没有找到直接共防，继续寻找先手防  
            //处理先手防
            //  保存先手连续冲四分支
            let fMoves = getContinueBlockVCF(arr, color, winMoves, idx);
            /*
            let cbps = continueBlockPoints(arr, color, winMoves);
            continueFour(arr, color == 1 ? 2 : 1, 6, fMoves, getArr([]), undefined, undefined, cbps, [], winMoves);
            let j;
            mConsole(`idx=${idx}, leng=${fMoves.length}`)
            //if (test) mConsole(fMoves)
            let tempMoves = [];
            let FailMoves = [];
            for (let i = 0; i < 225; i++) { FailMoves[i] = []; }

            for (j = fMoves.length - 1; j >= 0; j--) {
                let Moves = [];
                pushFailMoves(FailMoves, cbps.movesKey[j]);
                pushWinMoves(Moves, fMoves[j]);
                fMoves.length--;
                cbps.movesKey.length--;
                for (let k = j - 1; k >= 0; k--) {
                    if (findMoves(FailMoves, cbps.movesKey[k])) {
                        pushWinMoves(Moves, fMoves[k]);
                        fMoves.splice(k, 1);
                        cbps.movesKey.splice(k, 1);
                        j--;
                    }
                }
                tempMoves = tempMoves.concat(Moves);
            }
            fMoves = tempMoves;
            mConsole(`>>idx=${idx}, leng=${fMoves.length}`)
            */


            let j;
            let testCount = 0;
            for (j = fMoves.length - 1; j >= 0; j--) {

                testCount++;
                /*
                if (test) {
                    mConsole(`start_____${j}`)
                    mConsole(fMoves[j]);
                    mConsole(cbps.movesKey[j]);
                    mConsole("_____end")
                }
                */
                // 摆棋
                for (let k = fMoves[j].length - 1; k >= 0; k--) {
                    let x = fMoves[j][k] % 15;
                    let y = parseInt(fMoves[j][k] / 15);
                    arr[y][x] = k % 2 ? color : color == 1 ? 2 : 1;
                }
                let nd = cNode[0];
                nd = movesToNode(fMoves[j], nd);
                keyMapList.push({ key: getKey(arr), node: nd });

                notWin = !isTwoWin(arr, color, timeout, depth, nd);
                if (notWin) {
                    nd.txt = "○";
                    let pNode = nd.parentNode;
                    while (pNode && pNode != node) {
                        pNode.txt = "○";
                        pNode = pNode.parentNode;
                    }
                }

                for (let k = fMoves[j].length - 1; k >= 0; k--) {
                    let x = fMoves[j][k] % 15;
                    let y = parseInt(fMoves[j][k] / 15);
                    arr[y][x] = 0;
                }
                if (notWin) j = -1;

            }
            if (test) mConsole(`idx=${idx}, loop=${testCount}`)

        }
        if (!notWin) { pNum++; }
    }
    arr[y][x] = 0;
    //console.log(pNum + "--"+idx);
    if (isAddTree) {
        if (!pNum) node.childNode[0].txt = "○";
        post("wLb", [idx, node.childNode[0].txt || "W", "black"]);
        node.firstColor = color == 1 ? "black" : "white";
        post("addTree", [node]);
        /*
        if (pNum) {
            for (let i = keyMapList.length - 1; i >= 0; i--) {
                post("addTreeKeyMap", [keyMapList[i].key, keyMapList[i].node]);
            }
        }
        */
    }


    function isTwoWin(arr, color, timeout, depth, node) {

        let cNode = node.childNode;
        let winLevel = getLevelB(arr, color, getArr([]), timeout, depth);
        if (winLevel.level >= 4.5) {
            return true; //==5 or ==4.5
        }
        else if (winLevel.level == 4) {
            let y = winLevel.p.y;
            let x = winLevel.p.x;
            arr[y][x] = color == 1 ? 2 : 1;
            let num = findVCF(arr, color, 1, depth, timeout, true);
            arr[y][x] = 0;
            if (num) {
                cNode[cNode.length] = new Node(y * 15 + x, node);
                let nd = cNode[cNode.length - 1];
                let moves = vcfWinMoves[0];
                arr[y][x] = color == 1 ? 2 : 1;
                //simpleVCF(color, arr, moves);
                arr[y][x] = 0;
                movesToNode(moves, nd);
                return true;
            }
        }
        else {

            let fNum = -1;
            let winMoves = [];
            fNum = oldVCFMoves.getVCF(color, arr);
            if (fNum) {
                winMoves.push(fNum);
            }
            else {
                if (findVCF(arr, color, 1, depth, timeout, true)) {
                    winMoves = vcfWinMoves;
                    oldVCFMoves.push(winMoves[0]);
                }
            }
            if (winMoves.length) { // 有(一套以上)两套V，判断双杀是否成立

                let notWin = false; //后续计算，如果双杀不成立==true
                let bPoint = getBlockVCF(winMoves, color, arr, true, true);
                let wMoves = winMoves[0];
                let VCF = new Node();
                movesToNode(wMoves, VCF);
                node.defaultChildNode = VCF;
                if (bPoint) { //排除直接防
                    if (!(excludeBP(arr, color == 1 ? 2 : 1, bPoint, timeout, depth, node, winMoves))) {
                        //排除失败，双杀不成立
                        notWin = true;
                        //node.txt = "○";
                    }
                }
                return !notWin;
            }
        }
    }


    /*
    function indexOfMoves(moves, ctnBlockPoints) {
        let i;
        for (i = moves.length - 1; i >= 0; i--) {
            if (ctnBlockPoints.indexOf(moves[i]) + 1) break;
        }
        return i;
    }
    */
}



// arr 局面 color 色做了VCF 在 winMoves 中，返回潜在的连续冲4先手防分支(去除了明显的无谓冲4)
function getContinueBlockVCF(arr, color, winMoves, idx) {

    let fMoves = [];
    let cbps = continueBlockPoints(arr, color, winMoves);
    continueFour(arr, color == 1 ? 2 : 1, 6, fMoves, getArr([]), undefined, undefined, cbps, [], winMoves);
    let j;
    if (test) mConsole(`idx=${idx}, leng=${fMoves.length}`)
    //if (test) mConsole(fMoves)
    let tempMoves = [];
    let FailMoves = [];
    for (let i = 0; i < 225; i++) { FailMoves[i] = []; }
    for (j = fMoves.length - 1; j >= 0; j--) {
        //if (test) mConsole(`__>>${fMoves[j]}\nkey=${cbps.movesKey[j]}`)
        let Moves = [];
        pushFailMoves(FailMoves, cbps.movesKey[j]);
        pushWinMoves(Moves, fMoves[j]);
        fMoves.length--;
        cbps.movesKey.length--;
        for (let k = j - 1; k >= 0; k--) {
            if (findMoves(FailMoves, cbps.movesKey[k])) {
                //if (test) mConsole(`_`)
                pushWinMoves(Moves, fMoves[k]);
                fMoves.splice(k, 1);
                cbps.movesKey.splice(k, 1);
                j--;
            }
        }
        tempMoves = tempMoves.concat(Moves);
    }

    fMoves = tempMoves;
    if (test) mConsole(`>>idx=${idx}, leng=${fMoves.length}`)
    return fMoves;

    // 找到先手防 可能经过的点，黑白分开找
    function continueBlockPoints(arr, color, winMoves) {
        let nColor = color == 1 ? 2 : 1;
        let newarr = getArr([]);
        let narr = getArr([]);

        for (let moveIndex = winMoves.length - 1; moveIndex >= 0; moveIndex--) {
            let moves = winMoves[moveIndex];
            let bp = getBlockVCF([moves], color, arr, true);
            let x, y;
            //if (test) mConsole(`bp.length${bp.length}`)
            for (let i = bp.length - 1; i >= 0; i--) {
                x = bp[i] % 15;
                y = parseInt(bp[i] / 15);
                if (isFour(x, y, nColor, arr)) {
                    arr[y][x] = nColor;
                    let idx = getBlockFour(x, y, arr);
                    let tx = idx % 15;
                    let ty = parseInt(idx / 15);
                    arr[ty][tx] = color;
                    if (isVCF(color, arr, moves)) {
                        bp.splice(i, 1);
                    }
                    arr[ty][tx] = 0;
                    arr[y][x] = 0;
                }
            }
            //if (test) mConsole(`>>bp.length${bp.length}`)
            let bpc = getCancelVCF([moves], color, arr, true);
            let len = moves.length;
            for (let i = 1; i < len; i += 2) {
                x = moves[i] % 15;
                y = parseInt(moves[i] / 15);
                let tx = moves[i - 1] % 15;
                let ty = parseInt(moves[i - 1] / 15);
                arr[ty][tx] = color;
                if (color == 1) {
                    //mConsole(`1__${tx},${ty}_>>${moves}`)
                    setBlockThree(tx, ty, arr, 0, newarr, narr, color);
                }
                arr[y][x] = nColor;
                for (let j = 0; j < 4; j++) {
                    let start = 0;
                    let end = 0;
                    for (let k = -1; k > -5; k--) {
                        let value = getArrValue(x, y, k, Cmodel[j], arr);
                        if (value == 0 || value == nColor) {
                            start--;
                        }
                        else {
                            break;
                        }
                    }
                    for (let k = 1; k < 5; k++) {
                        let value = getArrValue(x, y, k, Cmodel[j], arr);
                        if (value == 0 || value == nColor) {
                            end++;
                        }
                        else {
                            break;
                        }
                    }
                    //if (test) mConsole(`model=${Cmodel[j]}, idx=${moves[i]}, start=${start}, end=${end}}`)
                    if (end - start >= 4) {
                        for (let k = start; k <= end; k++) {
                            let p = getArrPoint(x, y, k, Cmodel[j], arr);
                            newarr[p.y][p.x] = 1;
                        }
                    }
                }
            }

            x = moves[moves.length - 1] % 15;
            y = parseInt(moves[moves.length - 1] / 15);
            //arr[y][x] = color;
            if (color == 1) {
                arr[y][x] = color;
                //mConsole(`2__${x},${y}_>>${moves}`)
                setBlockThree(x, y, arr, 0, newarr, narr, color);
                arr[y][x] = 0;
            }
            else if (isCatchFoul(x, y, arr)) { //arr[y][x]==0 >> isCatchFoul;

                arr[y][x] = color;
                let idx = getBlockFour(x, y, arr);
                let tx = idx % 15;
                let ty = parseInt(idx / 15);
                //mConsole(`catchfoul__idx=${idx}`)
                //mConsole(`3__${tx},${ty}_>>${moves}`)
                setBlockThree(x, y, arr, 0, newarr, narr, color);
                arr[y][x] = 0;

            }
            //arr[y][x] = 0;
            for (let j = 0; j < 4; j++) {
                if (isLineFour(x, y, Cmodel[j], color, arr, true)) {
                    let i;
                    let start, end;
                    for (i = -1; i > -5; i--) {
                        if (getArrValue(x, y, i, Cmodel[j], arr) != color) break;
                    }
                    start = i + 1;
                    for (i = 1; i < 5; i++) {
                        if (getArrValue(x, y, i, Cmodel[j], arr) != color) break;
                    }
                    end = i - 1;
                    if (start == 0 || end == 0) { //连活3 设置夏止防选点
                        start = start == 0 ? 1 : -3;
                        setBlockFreeThree(x, y, start, start + 2, Cmodel[j], color, newarr, narr, color);
                    }
                    break;

                }
            }

            for (let i = 0; i < len; i++) {
                x = moves[i] % 15;
                y = parseInt(moves[i] / 15);
                arr[y][x] = 0;
            }
            if (test) mConsole(toStr(newarr));

            for (let i = bp.length - 1; i >= 0; i--) {
                x = bp[i] % 15;
                y = parseInt(bp[i] / 15);
                newarr[y][x] = 1;
            }
            if (test) mConsole(toStr(newarr))
            for (let i = bpc.length - 1; i >= 0; i--) {
                x = bpc[i] % 15;
                y = parseInt(bpc[i] / 15);
                narr[y][x] = 1;
            }
            if (test) mConsole(toStr(narr))

        }

        if (test) mConsole(toStr(newarr))
        if (test) mConsole(toStr(narr))

        return { colorArr: narr, nColorArr: newarr, movesKey: [] };

    }

    // 搜索夏止防 相关的点，记录
    function setBlockThree(x, y, arr, depth, nColorArr, colorArr, arrColor) {

        depth = depth || 0;
        let color = 1;
        //五连否定33
        if (isFive(x, y, color, arr)) return false;
        let ov = arr[y][x];
        arr[y][x] = color;
        let points = [];
        let count = 0;
        // 先搜索33形状
        for (let i = 0; i < 4; i++) {
            if (count < 0) break;
            for (let j = 0; j > -5; j--) {
                let pw = getPower(x, y, arr, Cmodel[i], color, j);
                if (pw == 3) {
                    //if (test) mConsole(`j=${j}, pw=3, model=${Cmodel[i]}\n________`);
                    if (getArrValue(x, y, j, Cmodel[i], arr) == 0) {
                        if (getArrValue(x, y, j - 1, Cmodel[i], arr) != color && getArrValue(x, y, j + 5, Cmodel[i], arr) != color) {
                            //if (test) mConsole(`i=${i}, j=${j}, pw=3, model=${Cmodel[i]}\n________\n${toStr(arr)}`);
                            let k;
                            let p;
                            for (k = 2; k < 5; k++) {
                                if (getArrValue(x, y, j + k, Cmodel[i], arr) == 0) break;
                            }
                            if (k == 4) {
                                p = getArrPoint(x, y, j + k, Cmodel[i], arr);
                                if (p.x!=-1) points.push({ p: p, model: Cmodel[i], len: 0 });
                                p = getArrPoint(x, y, j, Cmodel[i], arr);
                                if (p.x!=-1) points.push({ p: p, model: Cmodel[i], len: 3 });
                            }
                            else {
                                p = getArrPoint(x, y, j + k, Cmodel[i], arr);
                                if (p.x!=-1) points.push({ p: p, model: Cmodel[i], len: 4 });
                            }
                            count++;
                            break;
                        }
                    }
                } // 五连排除33
                if (pw == 5 && getArrValue(x, y, j - 1, Cmodel[i], arr) != color && getArrValue(x, y, j + 5, Cmodel[i], arr) != color) {
                    count = -1;
                    break;
                }
            }
        }
        /*
        arr[y][x] = "*";
        if (test) mConsole(`depth=${depth}\ncount=${count}________>>\n${toStr(arr)}`);
        arr[y][x] = color;
        */
        if (count >= 2) {
            for (let i = points.length - 1; i >= 0; i--) {
                /*
                arr[points[i].p.y][points[i].p.x] = "*";
                if (test) mConsole(`depth=${depth}\n>>\n${toStr(arr)}`);
                arr[points[i].p.y][points[i].p.x] = color;
                */
                if ((arrColor == 1 && depth % 2) || (arrColor == 2 && (depth + 1) % 2)) {
                    if (points[i].len == 3) setBlockFreeThree(points[i].p.x, points[i].p.y, 1, 3, points[i].model, color, nColorArr, colorArr, arrColor);
                }
                //mConsole(`4__${points[i].p.x},${points[i].p.y}_>>${1}`)
                setBlockThree(points[i].p.x, points[i].p.y, arr, depth + 1, nColorArr, colorArr, arrColor);
                /*
                arr[points[i].p.y][points[i].p.x] = "*";
                if (test) mConsole(`depth=${depth}\n<<\n${toStr(arr)}`);
                arr[points[i].p.y][points[i].p.x] = 0;
                */
            }
            /*
                for (let i = points.length - 1; i >= 0; i--) {
                    if (points[i].len == 3) {
                        if (test) mConsole(`setBlockFreeThree`);
                        arr[points[i].p.y][points[i].p.x] = color;
                        
                        arr[points[i].p.y][points[i].p.x] = 0;
                    }
                }
            */
        }
        /*
        arr[y][x] = "*";
        if (test) mConsole(`depth=${depth}\ncount=${count}<<________\n${toStr(arr)}`);
        arr[y][x] = color;
        */
        arr[y][x] = ov;
    }

    // 设置夏止防选点
    function setBlockFreeThree(x, y, start, end, model, color, nColorArr, colorArr, arrColor) {
        let arr;
        for (let i = -1; i > -4; i--) {
            let p = getArrPoint(x, y, start + i, model, arr);
            if (p.x != -1) {
                if (i > -3) {
                    colorArr[p.y][p.x] = 1;
                    nColorArr[p.y][p.x] = 1;
                }
                else {
                    if (arrColor == 1) {
                        colorArr[p.y][p.x] = 1;
                    }
                    else {
                        nColorArr[p.y][p.x] = 1;
                    }
                }
            }
            if (color == 2 && i == -2) break;
        }
        for (let i = 1; i < 4; i++) {
            let p = getArrPoint(x, y, end + i, model, arr);
            if (p.x != -1) {
                if (i < 3) {
                    colorArr[p.y][p.x] = 1;
                    nColorArr[p.y][p.x] = 1;
                }
                else {
                    if (arrColor == 1) {
                        colorArr[p.y][p.x] = 1;
                    }
                    else {
                        nColorArr[p.y][p.x] = 1;
                    }
                }
            }
            if (color == 2 && i == 2) break;
        }
    }

}



// 排除直接防
function excludeBP(arr, color, bPoint, timeout, depth, node, fMoves) {

    let i;
    let x;
    let y;
    let fNum;
    let rt = true;
    fMoves = fMoves || [];
    let vList = new vcfList(fMoves); // 临时保存找到的VCF
    node = node || new Node();
    for (i = bPoint.length - 1; i >= 0; i--) {
        let cNode = node.childNode;
        x = bPoint[i] % 15;
        y = parseInt(bPoint[i] / 15);
        arr[y][x] = color;
        let j = vList.getVCF(color == 1 ? 2 : 1, arr);
        //if (test) mConsole(`j=${j} , b=${bPoint.length}`)
        fNum = j ? 1 : findVCF(arr, color == 1 ? 2 : 1, 1, depth, timeout, true);
        //if (node.idx==187) mConsole(toStr(arr))
        arr[y][x] = 0;
        //if (node.idx==187) mConsole(`bPoint=${bPoint[i]}__>>fnum=${fNum}\nj=${j}`)
        if (fNum == 0) {
            //node.childNode = [];
            cNode[cNode.length] = new Node(y * 15 + x, node);
            cNode[cNode.length - 1].txt = "○";
            rt = false;
        }
        else {
            let moves = j ? j : vcfWinMoves[0].slice(0);
            //if (node.idx==187) mConsole(`bPoint=${bPoint[i]}__>>fnum=${fNum}\n${moves}`)
            arr[y][x] = color;
            //simpleVCF(color == 1 ? 2 : 1, arr, moves);
            arr[y][x] = 0;
            cNode[cNode.length] = new Node(y * 15 + x, node);
            //cNode = cNode[cNode.length - 1].node.childNode;
            movesToNode(moves, cNode[cNode.length - 1]);
            if (!j) { // 新的V
                vList.push(vcfWinMoves[0].slice(0));
            }
        }

    }
    vList.getList(fMoves);
    return rt;
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



/*
//限珠题
function findSimpleWin(arr, color, newarr, num) {

    let rt = false;
    if (num == 4) {
        let pnt = aroundPoint[112];
        let timeout = 30000;
        let depth = 1;
        // 确定双杀选点范围
        // 先判断对手进攻级别,快速选点
        selectPoint(arr, color, newarr, timeout, depth, false, null, null, null, true);

        for (let i = 0; i < 225; i++) {
            let x = pnt.point[i].x;
            let y = pnt.point[i].y;

            if (!stopFind && newarr[y][x] == 0) {
                // 处理直接防
                arr[y][x] = color;
                if (true) post("printSearchPoint", [pnt.index[i], "⊙", "green"]);
                let winLevel = getWinLevel(arr, color, timeout, depth, 2, 2);
                if (winLevel > 3) {
                    post("printSearchPoint", []);
                    post("wLb", [pnt.index[i], "◎", "red"]);
                    rt = true;
                }
                arr[y][x] = 0;
            }
            else { // 清空选点范围外的点
                if (true) post("cleLb", [pnt.index[i]]);
            }
        }
        if (true) post("printSearchPoint", []);
    }
    return rt;
}
*/


function isSimpleWin(idx, color, arr, num, level) {

    if (num == 4) {
        if (level == 3) { //大道五目
            let timeout = 30000;
            let depth = 1;
            let x = idx % 15;
            let y = parseInt(idx / 15);
            arr[y][x] = color;
            let node = new Node();
            node.childNode[0] = new Node(idx, node);
            let nd = node.childNode[0];
            let winLevel = getWinLevelSimple(arr, color, timeout, 3, 2, nd);
            if (winLevel > 3) {
                post("wLb", [idx, "W", "black"]);
                node.firstColor = color == 1 ? "black" : "white";
                post("addTree", [node]);
            }
            else if (winLevel == 3) {
                nd.txt = "○";
                post("wLb", [idx, nd.txt, "black"]);
                node.firstColor = color == 1 ? "black" : "white";
                post("addTree", [node]);
                mConsole(node)
            }
            arr[y][x] = 0;
        }
    }
}



// 返回冲4的防点
function getBlockFour(x, y, arr) {

    let color = arr[y][x] == 1 ? 2 : 1;
    let nColor = arr[y][x];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j > -5; j--) {
            let pw = getPower(x, y, arr, Cmodel[i], nColor, j);
            if (pw == 4) {
                if (nColor == 2) {
                    let p = getNextEmpty(x, y, arr, Cmodel[i], nColor, j);
                    return p.y * 15 + p.x;
                }
                else if (getArrValue(x, y, j - 1, Cmodel[i], arr) != nColor && getArrValue(x, y, j + 5, Cmodel[i], arr) != nColor) {
                    let p = getNextEmpty(x, y, arr, Cmodel[i], nColor, j);
                    return p.y * 15 + p.x;
                }
            }
        }
    }
    return -1;
}


//判断idx 是否可以防住 color色的所有VCF
function isBlockVCF(idx, color, arr, backStage) {
    let x = idx % 15;
    let y = parseInt(idx / 15);
    arr[y][x] = color == 1 ? 2 : 1;
    // 确保没有新的VCF
    let fNum = findVCF(arr, color, 1, null, 60000, true);
    arr[y][x] = 0;
    if (fNum) {
        return false;
    }
    else {
        if (!backStage) post("wLb", [idx, "◎", "black"]);
        return true;
    }
}



function isBlockVCFPath(path, color, arr, backStage) {
    let isB;
    let paths = [];
    let len = path.length;
    let nColor = color == 1 ? 2 : 1;
    if (len == 1) {
        if (isBlockVCF(path[0], color, arr, true)) {
            paths.push(path.slice(0));
        }
    }
    else {
        for (let i = 0; i < len; i++) {
            let x = path[i] % 15;
            let y = parseInt(path[i] / 15);
            arr[y][x] = i % 2 ? color : nColor;
        }
        let fNum = findVCF(arr, color, 1, null, 60000, true);
        if (fNum) {
            let bPoint = getBlockVCF(vcfWinMoves, color, arr, true, true);
            bPoint = bPoint || [];
            for (let i = bPoint.length - 1; i >= 0; i--) {
                isB = isBlockVCF(bPoint[i], color, arr, true);
                if (isB) {
                    paths.push(path.concat(bPoint[i]))
                    //break;
                }
            }
        }
        else {
            paths.push(path.slice(0));
        }
        for (let i = 0; i < len; i++) {
            let x = path[i] % 15;
            let y = parseInt(path[i] / 15);
            arr[y][x] = 0;
        }
    }
    if (paths.length && !backStage) post("wLb", [paths[0][0], "○", "black"]);
    return paths;
}



// 找VCF(活三级别)防点，返回一个数组,不存在防点返回 false
// VCF 二维数组保存保存了 n 套color色VCF,
function getBlockVCF(VCF, color, arr, backStage, passFour, idx) {
    let p = [];
    let pnt = aroundPoint[idx || 112];
    let len = VCF.length;
    let nColor = color == 1 ? 2 : 1;
    for (let i = 225 - 1; i >= 0; i--) {
        let x = pnt.point[i].x;
        let y = pnt.point[i].y;
        // color是进攻方颜色
        if (arr[y][x] == 0) {
            let j;
            arr[y][x] = color == 1 ? 2 : 1;
            for (j = 0; j < len; j++) { // 验证之前VCF是否成立
                if (isVCF(color, arr, VCF[j])) break;
            }
            arr[y][x] = 0;
            // 防住所有VCF,记录防点,过滤掉先手防
            if (j >= len && (!passFour || !isFour(x, y, nColor, arr))) {
                if (color == 1 || !isFoul(x, y, arr)) {
                    // if color==1 then  blockColor==2
                    p.push(pnt.index[i]);
                    if (!backStage) post("wLb", [pnt.index[i], "◎", "black"]);
                }
            }
        }

    }
    return p.length ? p : false;
}


/*
// 找出成立的VCF(活三级别)防点,深度比 blockVCF 多一层
function getBlockVCFb(VCF, color, arr, backStage, passFour, node, idx) {
    node = node || new Node();
    let p = getBlockVCF(VCF, color, arr, true, passFour, idx);
    if (!p) return false;
    for (let i = p.length - 1; i >= 0; i--) {
        let x = p[i] % 15;
        let y = parseInt(p[i] / 15);
        arr[y][x] = color == 1 ? 2 : 1;
        // 确保没有新的VCF
        let fNum = findVCF(arr, color, 1, null, 60000, true);
        arr[y][x] = 0;
        if (fNum) {
            let VCF = new Node(y * 15 + x, node); // new block point
            movesToNode(vcfWinMoves[0], VCF); //add VCF moves to node;
            node.childNode.push(VCF);
            //console.log(VCF.idx)
            p.splice(i, 1);
            // 用新VCF排除剩下防点
            for (let j = i - 1; j >= 0; j--) {
                x = p[j] % 15;
                y = parseInt(p[j] / 15);
                arr[y][x] = color == 1 ? 2 : 1;
                if (isVCF(color, arr, vcfWinMoves[0])) {
                    let VCF = new Node(y * 15 + x, node); // new block point
                    movesToNode(vcfWinMoves[0], VCF); //add VCF moves to node;
                    node.childNode.push(VCF);
                    p.splice(j, 1);
                    i--;
                }
                arr[y][x] = 0;
                if (stopFind) j = -1;
            }

        }
        else {
            if (!backStage) post("wLb", [y * 15 + x, "b", "blue"]);
        }
        if (stopFind) i = -1;
    }
    if (p.length) node.childNode.push(new Node(-1, node));
    return p.length ? p : false;
}
*/



function getBlockVCFPaths(VCF, color, arr, backStage, passFour, idx) {
    let winMoves = [VCF[0]];
    let paths = [];
    let bPoint = getBlockVCF([VCF[0]], color, arr, backStage, true, idx);
    if (bPoint) {
        for (let i=bPoint.length-1; i>=0; i--) {
            paths.push([bPoint[i]]);
        }
        excludeBP(arr, color == 1 ? 2 : 1, bPoint, undefined, undefined, undefined, winMoves);
    }
    let continueFourPath = getContinueBlockVCF(arr, color, winMoves);
    //mConsole(continueFourPath.length)
    return paths.concat(continueFourPath);

}



//找出同色棋子，破坏自己 VCF 的点
function getCancelVCF(VCF, color, arr, backStage, passFour, idx) {
    let p = [];
    let pnt = aroundPoint[idx || 112];
    let len = VCF.length;
    let nColor = color;
    for (let i = 225 - 1; i >= 0; i--) {
        let x = pnt.point[i].x;
        let y = pnt.point[i].y;
        // color是进攻方颜色
        if (arr[y][x] == 0) {
            let j;
            arr[y][x] = color;
            for (j = 0; j < len; j++) { // 验证之前VCF是否成立
                if (isVCF(color, arr, VCF[j])) break;
            }
            arr[y][x] = 0;
            // 防住所有VCF,记录防点,过滤掉先手防
            if (j >= len && (!passFour || !isFour(x, y, nColor, arr))) {
                if (color == 2 || !isFoul(x, y, arr)) {
                    // if color==1 then  blockColor==2
                    p.push(pnt.index[i]);
                    if (!backStage) post("wLb", [pnt.index[i], "◎", "black"]);
                }
            }
        }

    }
    return p.length ? p : false;
}



// 返回进攻级别,完成后newarr保存有五连点的信息
function getLevel(arr, color, num) {
    num = typeof num == "number" ? parseInt(num) : 9999;
    if (isWin(color == 1 ? 2 : 1, arr)) return { level: -1, p: null };
    if (isWin(color, arr)) return { level: 5, p: null };
    if (num < 1) return { level: 0, p: null };
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
                        return { level: 4.5, p: p }; // 44 || 活4
                    }
                    p = { "x": x, "y": y };
                }
            }
        }
        if (color == 2 && isFoul(p.x, p.y, arr)) return { level: 4.5, p: p }; //冲4抓
        return { level: 4, p: p }; // 单冲4
    }

    return num == 1 ? { level: 0, p: null } : { level: 2, p: null };

}



// 计算进攻级别，
// level =={level:level,p:{x:x,y:y} || moves:moves};
// level.level==4 ,level =={level:level,p:{x:x,y:y} ,p保存冲4防点
// level.level==3,level =={level:level,moves:moves} moves保存一套成立的VCF手顺
function getLevelB(arr, color, newarr, timeout, depth, backstage, num) {
    num = typeof num == "number" ? parseInt(num) : 9999;
    timeout = timeout || 10000;
    depth = depth || 100;
    backstage = backstage !== false ? true : false;
    // 判断是否有在冲4以上进攻级别
    let level = getLevel(arr, color, num);
    if (level.level >= 4 || level.level <= 0) {
        return level;
    }
    /*
    else if (level.level == 4) {
        let nColor = color==1 ? 2 : 1;
        let x = level.p.x;
        let y = level.p.y;
        arr[y][x] = nColor;
        let fNum = findVCF(arr, color, 1, num == 9999 ? depth : num - 2, timeout, backstage);
        level.level = fNum ? 4.4 : 4;
        arr[y][x] = 0;
        return level;
    }
    */
    // 剩余0-1颗棋子在上面结束判断，
    // 判断是否有活3 级别
    /*        // 快速对比之前的计算结果，快速判断VCF
    let winMoves = color==1 ? vcfBlackWinMoves : vcfWhiteWinMoves;
    let len = winMoves.length;
    for (let i=0; i<len; i++) {
        if (winMoves[i].length<=depth*2+1) {
            if (isVCF(color,arr,winMoves[i])) {
                return {level:3,moves:winMoves[i]} ;
            }
        }
        else {
            i = 10000;
        }
    }
    */

    // 快速搜索VCF
    //(color,timeout,depth,count,backstage,arr)
    let n = findVCF(arr, color, 1, num == 9999 ? depth : num - 2, timeout, backstage);
    if (n > 0) {
        return ({ level: 3, moves: vcfWinMoves[0] });
    }
    else {
        return num == 2 ? { level: 0, moves: null } : { level: 2, moves: null };
    }

}


/*
// 轮到对手落子
// 判断必胜级别 depth==vcf深度，gDepth(递归深度) ==1不计算先手防, ==2计算先手防
function getWinLevel(arr, color, timeout, depth, gDepth, node) {

    node = node || new Node();
    timeout = timeout || 30000;
    depth = depth || 1000;
    gDepth = gDepth || 2;
    // 判断对手进攻级别
    let nLevel = getLevelB(arr, color == 1 ? 2 : 1, getArr([]), timeout, depth, true);
    let winLevel;
    let cNode = node.childNode;
    //console.log("对手进攻级别="+nLevel.level)
    if (nLevel.level == 5) { // 对手已胜
        return 2;
    }
    else if (nLevel.level >= 3) { // 对手有攻,没五连就败了
        winLevel = getLevel(arr, color);
        return winLevel.level == 5 ? 5 : 2;
    }
    else { // 对方没有V
        winLevel = getLevel(arr, color);
        if (winLevel.level >= 4.5) {
            return winLevel.level; //==5 or ==4.5
        }
        else if (winLevel.level == 4) {
            let y = winLevel.p.y;
            let x = winLevel.p.x;
            arr[y][x] = color == 1 ? 2 : 1;
            let num = findVCF(arr, color, 1, depth, timeout, true);
            arr[y][x] = 0;
            if (num) {
                cNode[cNode.length] = new Node(y * 15 + x, node);
                let nd = cNode[cNode.length - 1];
                let moves = vcfWinMoves[0];
                arr[y][x] = color == 1 ? 2 : 1;
                //simpleVCF(color, arr, moves);
                arr[y][x] = 0;
                movesToNode(moves, nd);
                return 4.4;
            }
        }

        //findVCF(color,timeOut,depth,count,backStage,arr) 
        let fNum = findVCF(arr, color, 1, depth, timeout, true);
        if (fNum >= 1) { // 有(一套以上)两套V，判断双杀是否成立

            let notWin = false; //后续计算，如果双杀不成立==true
            let bPoint = getBlockVCF(vcfWinMoves, color, arr, true, true);
            let wMoves = vcfWinMoves[0];
            let VCF = new Node();
            //simpleVCF(color, arr, wMoves);
            movesToNode(wMoves, VCF);
            node.defaultChildNode = VCF;
            if (bPoint) { //排除直接防
                if (!(excludeBP(arr, color == 1 ? 2 : 1, bPoint, timeout, depth, node))) {
                    //排除失败，双杀不成立
                    notWin = true;
                }
            }

            if (!notWin && gDepth >= 2) { // 没有找到直接共防，继续寻找先手防
                //处理先手防
                let fMoves = []; //  保存对手连续冲四分支
                continueFour(arr, color == 1 ? 2 : 1, 6, fMoves, getArr([]));
                let j;
                for (j = fMoves.length - 1; j >= 0; j--) {
                    //console.log("gDepth="+gDepth+"\nj="+j);

                    // 摆棋
                    for (let k = fMoves[j].length - 1; k >= 0; k--) {
                        let x = fMoves[j][k] % 15;
                        let y = parseInt(fMoves[j][k] / 15);
                        arr[y][x] = k % 2 ? color : color == 1 ? 2 : 1;
                    }
                    /*
                     let str = "";
                     for (let l=0;l<=j;l++)  {
                         str+="\n"+fMoves[l];
                     }
                     //console.log(j+"\n"+str)
                    */
/*
                    let nd = movesToNode(fMoves[j], node);
                    winLevel = getWinLevel(arr, color, timeout, depth, gDepth - 1, nd);
                    //console.log("_____"+winLevel)
                    if (winLevel < 3.5) notWin = true;

                    // 复原棋子
                    for (let k = fMoves[j].length - 1; k >= 0; k--) {
                        let x = fMoves[j][k] % 15;
                        let y = parseInt(fMoves[j][k] / 15);
                        arr[y][x] = 0;
                    }
                    if (notWin) j = -1;
                }
            }

            return notWin ? 2 : 3.5;
        }
        return 2;
    }

}
*/


// 轮到对手落子
// num 剩余手数，根据棋子数目控制深度
function getWinLevelSimple(arr, color, timeout, maxNum, gDepth, node) {

    node = node || new Node();
    timeout = timeout || 30000;
    gDepth = gDepth || 2;
    // 判断对手进攻级别
    let nLevel = getLevelB(arr, color == 1 ? 2 : 1, getArr([]), timeout, null, true);
    let winLevel;
    let cNode = node.childNode;
    //console.log("对手进攻级别="+nLevel.level)
    if (nLevel.level == 5) { // 对手已胜
        return 2;
    }
    else if (nLevel.level >= 3) { // 对手有攻,没五连就败了
        winLevel = getLevel(arr, color, maxNum);
        return winLevel.level == 5 ? 5 : 2;
    }
    else { // 对方没有V
        winLevel = getLevel(arr, color, maxNum);
        if (winLevel.level >= 4.5) {
            return winLevel.level; //==5 or ==4.5
        }
        else if (winLevel.level == 4) {
            let y = winLevel.p.y;
            let x = winLevel.p.x;
            arr[y][x] = color == 1 ? 2 : 1;
            let num = findVCF(arr, color, 1, maxNum - 2, timeout, true);
            //if (node.idx==111) mConsole(`${toStr(arr)}\n________\nwinLevel.level=${winLevel.level}\nfMum=${num}`)
            arr[y][x] = 0;

            if (num) {
                cNode[cNode.length] = new Node(y * 15 + x, node);
                let nd = cNode[cNode.length - 1];
                nd.childNode[0] = new Node(vcfWinMoves[0][0] * 1, nd);
                nd = nd.childNode[0];
                nd.childNode[0] = new Node(vcfWinMoves[0][1] * 1, nd);
                nd = nd.childNode[0];
                nd.childNode[0] = new Node(vcfWinMoves[0][2] * 1, nd);
                return 4.4;
            }
            else {
                /*
                cNode[cNode.length] = new Node(y * 15 + x, node);
                let nd = cNode[cNode.length - 1];
                nd.txt = "○";
                */
                return 2;
            }
        }
        //findVCF(color,timeOut,depth,count,backStage,arr) 
        let fNum = findVCF(arr, color, 1, maxNum - 2, timeout, true);
        if (fNum >= 1) { // 有(一套以上)两套V，判断双杀是否成立
            let notWin = false; //后续计算，如果双杀不成立==true
            let VCF = new Node();
            movesToNode(vcfWinMoves[0], VCF);
            node.defaultChildNode = VCF;
            let bPoint = getBlockVCF(vcfWinMoves, color, arr, true, true);
            if (bPoint) { //排除直接防
                if (!(excludeBP(arr, color == 1 ? 2 : 1, bPoint, timeout, maxNum - 2, node, vcfWinMoves))) {
                    //排除失败，双杀不成立
                    notWin = true;
                }
            }
            if (!notWin && gDepth >= 2) { // 没有找到直接共防，继续寻找先手防
                //处理先手防
                let fMoves = []; //  保存对手连续冲四分支
                continueFour(arr, color == 1 ? 2 : 1, maxNum, fMoves, getArr([]));
                let j;
                for (j = fMoves.length - 1; j >= 0; j--) {
                    // 摆棋
                    for (let k = fMoves[j].length - 1; k >= 0; k--) {
                        let x = fMoves[j][k] % 15;
                        let y = parseInt(fMoves[j][k] / 15);
                        arr[y][x] = k % 2 ? color : color == 1 ? 2 : 1;
                    }
                    let nd = movesToNode(fMoves[j], node);
                    winLevel = getWinLevelSimple(arr, color, timeout, maxNum - fMoves[j].length / 2, gDepth - 1, nd);
                    //console.log("_____"+winLevel)
                    if (winLevel < 3.5) {
                        nd.txt = "○";
                        let pNode = nd.parentNode;
                        while (pNode && pNode != node) {
                            pNode.txt = "○";
                            pNode = pNode.parentNode;
                        }
                        notWin = true;
                    }

                    // 复原棋子
                    for (let k = fMoves[j].length - 1; k >= 0; k--) {
                        let x = fMoves[j][k] % 15;
                        let y = parseInt(fMoves[j][k] / 15);
                        arr[y][x] = 0;
                    }
                    if (notWin) j = -1;
                }
            }
            return notWin ? 3 : 3.5;
        }
        return 2;
    }

}



// 确定选点范围
function selectPoint(arr, color, newarr, timeout, depth, backstage, level, allColor, num, selFour) {
    num = typeof num == "number" ? parseInt(num) : 9999;
    timeout = timeout || 30000;
    depth = depth || 1000;
    backstage = backstage == null ? true : backstage;
    // 确定活三级选点范围
    // 先判断对手进攻级别,快速选点
    if (!level) level = getLevelB(arr, color == 1 ? 2 : 1, getArr([]), timeout, depth);
    if (level.level >= 5) {
        //if (testidx) console.log(5)
        getArr(newarr, -9999);
        return newarr;
    }
    else if (level.level >= 4.5) {
        //if (testidx) console.log(4.5)
        let narr = getArr([]);
        findFivePoint(arr, color, narr);
        for (let y = 0; y < 15; y++) {
            for (let x = 0; x < 15; x++) {
                newarr[y][x] = narr[y][x] != 0 ? 0 : -9999;
            }
        }
        return newarr;
    }
    else if (level.level >= 4) {
        //if (testidx) console.log(4)
        // 对手冲四，选点唯一
        getArr(newarr, -9999);
        // p保存的是成立防点，不会是禁手，如果禁手level==4.5 
        newarr[level.p.y][level.p.x] = 0;

    }
    else if (level.level >= 3) {
        //if (testidx) console.log(3)

        // 对手有V，选点范围在V的防点内
        let mv = []; //转二维数组
        mv.push(level.moves);
        //let p = getBlockVCFb(mv, color == 1 ? 2 : 1, arr, true);
        let p = getBlockVCF(mv, color == 1 ? 2 : 1, arr, true);
        getArr(newarr, -9999);

        for (let i = p.length - 1; i >= 0; i--) {
            let x = p[i] % 15;
            let y = parseInt(p[i] / 15);
            newarr[y][x] = 0;
        }
    }
    else { // level.level<3
        //if (testidx) console.log(2)
        let narr = getArr([]);
        let narr1 = getArr([]);
        findFourPoint(arr, color == 1 ? 2 : 1, narr1, null); // 保存对手冲四点
        continueFour(arr, color, num > 4 ? 5 : num, [], narr); //分析连续冲四
        for (let y = 0; y < 15; y++) { // 把 arr 的数据合并到 narr;
            for (let x = 0; x < 15; x++) {
                let nColor = color == 1 ? 2 : 1;
                if (arr[y][x] != 0) narr[y][x] = color;
                //if (arr[y][x] == color || (allColor && arr[y][x] == nColor) ) narr[y][x] = color;
            }
        }
        for (let y = 0; y < 15; y++) { // 把 arr 的数据合并到 narr;
            for (let x = 0; x < 15; x++) {
                newarr[y][x] = (arr[y][x] == 0 && (around(narr, y * 15 + x, 3) || narr1[y][x] > 0)) ? 0 : -9999;
            }
        }

    }

    // 再排除黑禁手
    if (!selFour) findFourPoint(arr, color, newarr, null, -9999); //排除冲4
    //findThreePoint (arr,color,newarr,onlyFree,-9999); //排除活三
    if (color == 1) findFoulPoint(arr, newarr, -9999); //排除禁手
    if (!backstage) printNewarr(newarr);
    return newarr;

    function printNewarr(newarr) {
        for (let y = 0; y < 15; y++) { // 
            for (let x = 0; x < 15; x++) {
                if (newarr[y][x] == 0) post("wLb", [y * 15 + x, "●", "#888888"]);
            }
        }
    }

}



function getNextEmpty(x, y, arr, model, color, move, maxLen) {

    let nx = -1;
    let ny = -1;
    move = move == null ? 0 : move;
    maxLen = maxLen == null ? 5 : maxLen;
    switch (String(model)) {

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

    return { "x": nx, "y": ny };

}



// x,y,坐标代表第一个点和后面的4个点成五格。返回在这五格内的子力。
function getPower(x, y, arr, model, color, move, maxLen) {

    let count = 0;
    let thisColor = color;
    let nColor = thisColor == 1 ? 2 : 1;
    move = move == null ? 0 : move;
    maxLen = maxLen == null ? 5 : maxLen;

    switch (String(model)) {

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
        let nx = changeX(x, maxLen + move, model);
        let ny = changeY(y, maxLen + move, model);

        for (let i = 0; i < 10; i++) {
            if (nx < 0 || nx > 14 || ny < 0 || ny > 14) break;
            if (arr[ny][nx] == thisColor) {
                count++;
            }
            else
            {
                break;
            }

            nx = changeX(nx, 1, model);
            ny = changeY(ny, 1, model);
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



function getArr(arr, setnum, x, y) {

    let j = 0;
    setnum = setnum || 0;
    x = x || 15;
    y = y || 15;
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
function getArrValue(x, y, move, model, arr) {

    let nx = changeX(x, move, model);
    let ny = changeY(y, move, model);
    if (nx >= 0 && nx <= 14 && ny >= 0 && ny <= 14) {
        return arr[ny][nx];
    }
    return null;

}



// 取得一个点的x,y
function getArrPoint(x, y, move, model, arr) {


    let nx = changeX(x, move, model);
    let ny = changeY(y, move, model);
    if (nx >= 0 && nx <= 14 && ny >= 0 && ny <= 14) {
        return { x: nx, y: ny };
    }
    return { x: -1, y: -1 };

}



// 取得一个点的Index
function getArrIndex(x, y, move, model, arr) {

    let nx = changeX(x, move, model);
    let ny = changeY(y, move, model);
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



function changeX(x, move, model) {

    switch (String(model)) {
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



function changeY(y, move, model) {

    switch (String(model)) {
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