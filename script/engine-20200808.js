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
let vcfNewArr = []; // 临时保存计算结果

let vcfColor = 0; // 自己棋子颜色
let vcfnColor = 0; // 对手棋子颜色
let vcfFS = []; // 递归栈
let vcfMoves = []; // 当前正在计算的分支
let vcfFailMoves = []; // 保存失败节点,已经地毯的节点
let vcfWinMoves = []; // 保存成立的VCF分支;
let vcfFinding = -1; // 计算状态
let vcfFindDepth = 0; // 计算深度
let vcfStartTimer = 0;
let vcfnLevel = null;

let stopFind = false;

let vcfWhiteWinMoves = [];
let vcfBlackWinMoves = [];



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



function node(value) {
  this.value = value || null;
  this.parentNode = [];
  this.childNode = [];
}


node.prototype.appenChild = function(child) {
  this.childNode[this.childNode.length] = child;
};


node.prototype.removeChild = function(child) {
  let type = typeof(child);
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



onmessage = function(e) {
  let p = e.data.parameter;
  const cmd = {
    "findVCF": function() { findVCF(p[0], p[1], p[2], p[3], p[4], p[5]); },
    "cancelFind": function() { cancelFind(); },
    "isTwoVCF": function() { isTwoVCF(p[0], p[1], p[2]); },
    "isLevelThreePoint": function() { isLevelThreePoint(p[0], p[1], p[2], p[3]) },
    "isSimpleWin": function() { isSimpleWin(p[0], p[1], p[2], p[3]) },
    "blockCatchFoul": function() { blockCatchFoul(p[0]) },
    "isBlockVCF": function() { isBlockVCF(p[0], p[1], p[2]) },
    "selectPoint": function() { selectPoint(p[0], p[1], p[2], p[3], p[4], p[5], p[6]) },
    "getBlockVCFb": function() {
      if (findVCF(p[0], p[1], p[2], p[3], p[4], p[5])) {
        let sPoint = getBlockVCF(vcfWinMoves, vcfColor, vcfInitial, true);
        post("getBlockVCFEnd", [sPoint]);
      };
    },

  };

  //console.log("engine.onmessage parameter =" + p);
  if (typeof(cmd[e.data.cmd]) == "function") cmd[e.data.cmd]();
}



function post(cmd, param) {
  postMessage({ "cmd": cmd, "parameter": param });
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
        arrs[i][key].push(moves[j]);
        len += moves[j].length * 1.5;
        if (len > 1024*1024) return arrs;
      }
    }
  }
  return arrs;
}



// 连续查找,VCF
//color 设置棋子颜色， timeout 设置超时毫秒单位， 
// depth 计算深度， backStage 后台模式, count VCF个数上限
function findVCF(color, timeOut, depth, count, backStage, arr) {

  try {
    //console.log("vcf start");
    let data = typeof(color) == "object" ? color : null;
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
    vcfFindDepth = data ? data.vcfFindDepth : 0;
    vcfFailMoves = data ? data.vcfFailMoves : []; //初始化hash数组
    if (vcfFailMoves.length == 0)
      for (let i = 0; i < 225; i++) { vcfFailMoves[i] = {}; };
    vcfWinMoves = data ? data.vcfWinMoves : [];
    vcfnLevel = data ? data.vcfnLevel : null;
    /*
    if (color==2) vcfWhiteWinMoves = [];
    if (color==1) vcfBlackWinMoves = [];
    */

    vcfNewArr = data ? data.vcfNewArr : getArr(vcfNewArr);

    // //console.log(vcfFinding)
    if (!backStage) post("findVCF_addVCF", [vcfWinMoves, vcfColor, 0, vcfInitial]);
    vcfStartTimer = new Date().getTime();
    vcfActuator(timeOut, depth, count, backStage);

    //console.log("vcf end");
    return vcfWinMoves.length;



    // 定时器调用，实现搜索VCF
    function vcfActuator() {

      try { //
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
                  vcfFindDepth: vcfFindDepth,
                  vcfFailMoves: cutFailMoves([], vcfFailMoves), 
                  vcfStartTimer: vcfStartTimer,
                  vcfWinMoves: vcfWinMoves,
                  vcfnLevel: vcfnLevel,
                  vcfNewArr: vcfNewArr,
                };
                
                post("saveContinueData", [data]);
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
              if (!backStage) {
                post("findVCF_End", [vcfWinMoves, vcfColor, (new Date().getTime() - vcfStartTimer) / 1000, vcfInitial]);
              }
              return;
              break;
          }
        }
        //log (vcfFinding)
      }
      catch (err) {
        //console.log("vcfActuator err=" + err.message);
      }
    }



    // 搜索VCF,递归计算到深度10，返回给浏览器，等待定时器下一次调用。
    function continueFindVCF() {

      try {
        let moves = vcfMoves;
        let arr = vcfArr;
        let newarr = vcfNewArr;
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
            vcfFindDepth++;
            let st = fs.length;
            let ed;

            // 上一手棋为中心，查找周围的点。
            if (fs.length > 1) {
              fs = fs.concat(aroundFindPoint(newarr, moves[moves.length - 2]));
              vcfFS = fs; // concat方法改变了内存地址， 重新设置两个变量
            }
            else { // 如果是第一手，就以h8为中心
              fs = fs.concat(aroundFindPoint(newarr, 112));
              vcfFS = fs;
            }

            ed = fs.length - 1;
            let idx; // 优先选择活4,再43
            if (ed > st) { // 两个以上冲四点，优先选择活4,再43
              for (idx = ed; idx >= st; idx--) { //找到一个活4级的点可以排除其它点
                let x = fs[idx] % 15;
                let y = parseInt(fs[idx] / 15);
                // 如果没有活4，白棋继续找44，冲4抓
                if (isFFWin(x, y, color, arr)) {
                  let v = fs.splice(idx, 1);
                  fs.splice(st - 1, ed - st + 1);
                  let wMoves = moves.concat(v);
                  if (WinMoves.length == 0) simpleVCF(color, vcfInitial, wMoves);
                  if (pushWinMoves(WinMoves, wMoves) && !backStage) {
                    post("findVCF_addVCF", [vcfWinMoves, vcfColor, 0, vcfInitial]);
                  };
                  pushFailMoves(FailMoves, moves.slice(0, moves.length));
                  backFindVCF();
                  return 1;
                }
              }
              //排序
              for (idx = ed - 1; idx >= st; idx--) {
                let x = fs[idx] % 15;
                let y = parseInt(fs[idx] / 15);
                // 把所有活3排到栈顶
                //判断是否活3，最后一个参数五连，冲4不否定活3
                for (let i = 0; i < 4; i++) {
                  if (isLineThree(x, y, Cmodel[i], color, arr, true)) {
                    let v = fs.splice(idx, 1);
                    fs.push(v * 1);
                    break;
                  }
                }
              }
            }

            // //console.log(fs)

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
            if (isFFWin(tx, ty, color, arr)) {
              let wMoves = moves.concat(ty * 15 + tx);
              if (WinMoves.length == 0) simpleVCF(color, vcfInitial, wMoves);
              if (pushWinMoves(WinMoves, wMoves) && !backStage) {
                post("findVCF_addVCF", [vcfWinMoves, vcfColor, 0, vcfInitial]);
              };
              pushFailMoves(FailMoves, moves.slice(0, moves.length));
              backFindVCF();
              return 1;
            }
            fs.push(-1);
            vcfFindDepth++;
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
        //if (vcfFindDepth % 1) return continueFindVCF(timeOut, depth);
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
            vcfFindDepth--;
            if (fs.length < 1) continue;
            // 保存失败分支;
            pushFailMoves(FailMoves, moves.slice(0));
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


        // 去掉VCF无谓冲四
        function simpleVCF(color, arr, moves) {

          let nColor = color == 1 ? 2 : 1;
          for (let j = moves.length - 6; j >= 0; j--) { // 摆棋子
            let x = moves[j] % 15;
            let y = parseInt(moves[j] / 15);
            arr[y][x] = j % 2 == 0 ? color : nColor;
          }

          for (let i = moves.length - 5; i >= 0; i -= 2) {
            let VCF = moves.slice(i + 2); // 判断是否无谓冲四      
            if (isVCF(color, arr, VCF)) moves.splice(i, 2); //删除无谓冲四
            for (let j = 1; j < 3; j++) { // 复原两步
              if (i - 1 < 0) break;
              let x = moves[i - j] % 15;
              let y = parseInt(moves[i - j] / 15);
              arr[y][x] = 0;
            }
          }

        }

      }
      catch (err) {
        //console.log("continueFindVCF err=" + err.message);
      }
    }
  }
  catch (err) {
    //console.log("findVCF err=" + err.message);
  }
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

  let mv = moves;
  let len = moves.length;
  let sum = 0; // 对单色棋子索引求和，保存到数组最后位置。
  for (let i = len - 1; i >= 0; i -= 2) {
    sum += mv[i];
  }
  mv.push(sum * 1);
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

  try {
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
  catch (err) {
    //console.log("pushWinMoves err=" + err.message);
  }
}



// 对比VCF手顺是否相等
function findMoves(FailMoves, moves) {

  try {
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

      // 判断另一个颜色
      for (k = moves.length - 2; k >= 0; k -= 2) {
        for (j = FailMoves[l][sum][i].length - 3; j >= 0; j -= 2) {
          if (FailMoves[l][sum][i][j] == moves[k] * 1) {
            break; //找到相同数据
          }
        }
        if (j < 0) break; // 没有找到相同数据;
      }

      if (k < 0) break; // 找到相同数据;
      //if (k < 0)  { rt = k<0 ? 1 :0.1; break; } // 找到相同数据;
    }

    return (i >= 0) ? true : false;
  }
  catch (err) {
    //console.log("findMoves err=" + err.message);
  }
}



// 判断是否，已经五连胜
function isWin(color, arr) {

  try {

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
  catch (err) {
    //console.log("isWin ERR=" + err.message);
  }
}



// 不判断对手是否五连
// 判断是否活四级别胜
function isFFWin(x, y, color, arr) {

  if (isFour(x, y, color, arr, true)) {
    return true;
  }
  if (color == 2) {
    if (isFF(x, y, 2, arr) || isCatchFoul(x, y, arr)) {
      return true;
    }
  }
  return false;
}



// 判断是否活三级别胜
function isTTWin(x, y, color, arr, timeout, depth, gDepth) {

  timeout = timeout || 30000;
  depth = depth || 1000;
  gDepth = gDepth || 2;
  // 判断对手进攻级别
  let nLevel = getLevelB(arr, color == 1 ? 2 : 1, getArr([]), timeout, depth, true);
  let winLevel;
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
      let num = findVCF(color, timeout, depth, 1, true, arr);
      arr[y][x] = 0;
      if (num) return 4.4;
    }

    //findVCF(color,timeOut,depth,count,backStage,arr) 
    let fNum = findVCF(color, timeout, depth, 1, true, arr);
    if (fNum >= 1) { // 有(一套以上)两套V，判断双杀是否成立

      let notWin = false; //后续计算，如果双杀不成立==true
      let bPoint = getBlockVCF(vcfWinMoves, color, arr, true, true);
      if (bPoint) { //排除直接防
        if (!(excludeBP(arr, color == 1 ? 2 : 1, bPoint, timeout, depth))) {
          //排除失败，双杀不成立
          notWin = true;
        }
      }

      if (!notWin && gDepth >= 2) { // 没有找到直接共防，继续寻找先手防
        //处理先手防
        let fMoves = []; //  保存先手连续冲四分支
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

          winLevel = getWinLevel(arr, color, timeout, depth, gDepth - 1);
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
function isFour(x, y, color, arr, free) {

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
    count = isFoul(x, y, arr) ? 0 : 1; // 禁手排除4
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
        if (getArrValue(x, y, j, Cmodel[i], arr) == 0 || getArrValue(x, y, j, Cmodel[i], arr) == 0) {
          if (getArrValue(x, y, j - 1, Cmodel[i], arr) != color && getArrValue(x, y, j + 5, Cmodel[i], arr) != color) {
            count++;
            continue;
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
          }
          else if (getArrValue(x, y, i + 5, model, arr) == 0) {
            isfree = true;
          }
        }
        else if (getArrValue(x, y, i + 4, model, arr) == 0 && getArrValue(x, y, i - 1, model, arr) == 0) {
          isfree = true;
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



// 找防冲4抓禁，防点
function blockCatchFoul(arr) {

  let fp = [];
  let fPoint = []; //二维数组，抓禁冲四点
  let FOULP = [];
  let notBlock = true; // 假设没有防点
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
    post("blockCatchFoul_End", [-1]);
    return;
  }
  // 合并数组
  for (let i = fp.length - 1; i >= 0; i--) {
    fPoint.push(fp[i] * 1);
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
          s = "×";
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
        s = "●";
        color = "#3333ff";
      }
      notBlock = false;
      post("wLb", [bPoint[i], s, color]);
    }
  }
  else {
    bPoint = []; // 没有防点，bPoint 从false改为空数组
  }


  let fMoves = []; //  保存先手连续冲四分支
  continueFour(arr, 1, 4, fMoves, getArr([]));
  if (fMoves.length) {
    // fMoves 排序
    let len = fMoves.length;
    for (let i = len - 2; i >= 0; i--) {
      for (let j = len - 1; j > i; j--) {
        if (fMoves[i].length <= fMoves[j].length) {
          let m = fMoves[i]; // 不能用 splice 返回的指针赋值给m，会变三维数组
          fMoves.splice(i, 1);
          fMoves.splice(j, 0, m);
        }
      }
    }
  }


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
        lvl = findVCF(2, 10000, 10, 1, true, narr);
        if (lvl == 0) { // 白棋没有新的VCF,新防点成立
          idx = fMoves[k][0];
          post("printSearchPoint", []); // 清空刚才计算的点
          post("wLb", [idx, "◎", "red"]);
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

    fMoves.length--;


  }
  post("printSearchPoint", []); // 清空刚才计算的点
  post("blockCatchFoul_End", [notBlock ? 0 : 1]);

}


function findFoulPoint(arr, newarr, setnum) {

  findSixPoint(arr, 1, newarr, setnum);
  findFFPoint(arr, 1, newarr, setnum);
  findTTPoint(arr, 1, newarr, setnum);

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
  try {

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
  catch (err)
  {
    //console.log(err.message);
  }

}



// 找四连点
function findFourPoint(arr, color, newarr, ftype, setnum) {

  let count = 0;
  let fP = [];
  let free = ftype == onlyFree ? true : ftype == onlyNoFree ? false : null;
  findFour(arr, color, newarr);
  for (let y = 0; y < 15; y++) {
    for (let x = 0; x < 15; x++) {
      if (newarr[y][x] > 0) {
        if (isFour(x, y, color, arr, free)) {
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



//let testarr = false;
// 找活3级别攻击点
function findLevelThreePoint(arr, color, newarr, fType, idx, backstage) {

  backstage = backstage == null ? true : backstage;
  let threeP = []; // 保存活3点，包括复活3
  let simpleP = []; // 保存坐杀点
  let vcfP = []; // 保存做V点
  let pnt = aroundPoint[idx || 112];
  // 先判断对手进攻级别,快速选点     
  selectPoint(arr, color, newarr, null, null, backstage, { level: 2 });

  for (let i = 0; i < 225; i++) {

    let x = pnt.point[i].x;
    let y = pnt.point[i].y;

    if (!stopFind && newarr[y][x] == 0) {
      arr[y][x] = color;
      if (!backstage) post("printSearchPoint", [pnt.index[i], "⊙", "green"]);
      let level = getLevelB(arr, color, newarr, null, fType == onlySimpleWin ? 1 : null);
      let nColor = color == 1 ? 2 : 1;
      if (level.level < 4 && level.level >= 3) {
        let l = level.moves.length; // 保存手数，待后面判断43杀
        // 已经确认对手低于活三级别
        if (!backstage) post("wLb", [pnt.index[i]]);
        if ((color == 1 && l == 1) || isThree(x, y, color, arr, true)) {
          if (fType == null) {
            if (!backstage) {
              post("printSearchPoint", []);
              post("wLb", [pnt.index[i], "③", color == 1 && !isThree(x, y, color, arr, true) ? "black" : "red"]);
            }
            threeP.splice(0, 0, pnt.index[i]);
          }

        }
        else {

          if (fType == null) {
            if (!backstage) {
              post("printSearchPoint", []);
              post("wLb", [pnt.index[i], "V", l > 3 ? "black" : "red"]);
            }
            if (l > 3) {
              vcfP.splice(0, 0, pnt.index[i]);
            }
            else {
              simpleP.splice(0, 0, pnt.index[i]);
            }
          }
          else { // 进一步判断是否做V
            if ((fType == onlyVCF && l > 3) || (fType == onlySimpleWin && l == 3)) {
              if (!backstage) {
                post("printSearchPoint", []);
                post("wLb", [pnt.index[i], "V", l > 3 ? "black" : "red"]);
              }
              if (l > 3) {
                vcfP.splice(0, 0, pnt.index[i]);
              }
              else {
                simpleP.splice(0, 0, pnt.index[i]);
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
  return vcfP.concat(simpleP, threeP);


}



function isLevelThreePoint(idx, arr, color, fType) {

  let x = idx % 15;
  let y = parseInt(idx / 15);

  arr[y][x] = color;
  let level = getLevelB(arr, color, getArr([]), null, fType == onlySimpleWin ? 1 : null);
  let nColor = color == 1 ? 2 : 1;
  if (level.level < 4 && level.level >= 3) {
    let l = level.moves.length; // 保存手数，待后面判断43杀
    if ((color == 1 && l == 1) || isThree(x, y, color, arr, true)) {
      if (fType == null) {
        post("wLb", [idx, "③", color == 1 && !isThree(x, y, color, arr, true) ? "black" : "red"]);
        return;
      }
    }
    else {
      if (fType == null) {
        post("wLb", [idx, "V", l > 3 ? "black" : "red"]);
        return;
      }
      else { // 进一步判断是否做V
        if ((fType == onlyVCF && l > 3) || (fType == onlySimpleWin && l == 3)) {
          post("wLb", [idx, "V", l > 3 ? "black" : "red"]);
          return;
        }
      }
    }
  }
  arr[y][x] = 0;
  post("end");
}



// 计算先手防 查找连续冲四，经过的点存入newarr,所有冲四分支存入fMoves。
// 连续冲四方，必须没有VCF，如果有VCF可能影响计算结果
function continueFour(arr, color, depth, fMoves, newarr, FailMoves, moves) {

  if (stopFind) return;
  if (depth < 0) return;
  if (FailMoves == null) {
    FailMoves = [];
    for (let i = 0; i < 225; i++) { FailMoves[i] = []; }
    moves = [];
  }
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
            if (findMoves(FailMoves, moves)) {
              moves.length -= 2;
              arr[ty][tx] = 0;
              arr[y][x] = 0;
            }
            else {
              continueFour(arr, color, depth - 1, fMoves, newarr, FailMoves, moves);
              pushFailMoves(FailMoves, moves.slice(0));
              fMoves.push(moves.slice(0));
              moves.length -= 2;
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

      if (findMoves(FailMoves, moves)) {
        moves.length -= 2;
        arr[ty][tx] = 0;
        arr[y][x] = 0;
      }
      else {
        continueFour(arr, color, depth - 1, fMoves, newarr, FailMoves, moves);
        pushFailMoves(FailMoves, moves.slice(0));
        fMoves.push(moves.slice(0));
        moves.length -= 2;
        arr[ty][tx] = 0;
        arr[y][x] = 0;
        newarr[y][x] = color;
        newarr[ty][tx] = color;
      }
    }
  }
  //console.log("fMoves.length=\n"+fMoves.length+"\n"+fMoves)
}



// 找出正确的33点
function findTTPoint(arr, color, newarr, setnum) {

  try {
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
  catch (err) {
    //console.log("findTTpoint err=" + err.message);
  }
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
function aroundFindPoint(arr, idx, radius) {

  try {

    let P = [];
    radius = radius == null ? 7 : radius;

    // 从里到外，绕圈搜索
    let Pnt = aroundPoint[idx];
    let max = Pnt.radius[radius] - 1;
    let x = idx % 15;
    let y = parseInt(idx / 15);
    for (let i = 0; i < 225; i++) {
      if (arr[Pnt.point[i].y][Pnt.point[i].x] > 0) {
        /*
        if ((x==Pnt.point[i].x || y==Pnt.point[i].y || Math.abs(x-Pnt.point[i].x)==Math.abs(y-Pnt.point[i].y))&&i<Pnt.radius[4])  {
            P.splice(0,0,Pnt.index[i]);
        }
        else  {
        */
        P.unshift(Pnt.index[i]);
        //}
      }
      if (i == max && P.length > 2) { break; }
    }
    return P;

  }
  catch (err) {
    //console.log("aroundPoinr err=" + err.message);
  }
}



// 找VCF 级别双杀点
function isTwoVCF(idx, arr, color) {

  let pNum = 0; //双杀点计数
  let timeout = 30000;
  let depth = 1000;
  let x = idx % 15;
  let y = parseInt(idx / 15);

  // 处理直接防
  arr[y][x] = color;
  // 对手准备落子，判断对手是否有攻。
  let nLevel = getLevelB(arr, color == 1 ? 2 : 1, getArr([]), timeout, depth, true);
  //findVCF(color,timeOut,depth,count,backStage,arr) 
  let fNum = nLevel.level >= 3 ? 0 : findVCF(color, timeout, depth, 2, true, arr);
  if (fNum >= 2 || (fNum == 1 && vcfWinMoves[0].length == 1)) { // 有两套V，判断双杀是否成立
    let notWin = false; //后续计算，如果双杀不成立==true
    let bPoint = getBlockVCF(vcfWinMoves, color, arr, true, true);
    //console.log(bPoint)
    if (bPoint) { //排除直接防
      if (!(excludeBP(arr, color == 1 ? 2 : 1, bPoint, timeout, depth))) {
        //排除失败，双杀不成立
        notWin = true;
      }
    }

    if (!notWin) { // 没有找到直接共防，继续寻找先手防
      //处理先手防
      let fMoves = []; //  保存先手连续冲四分支
      continueFour(arr, color == 1 ? 2 : 1, 6, fMoves, getArr([]));
      let j;
      for (j = fMoves.length - 1; j >= 0; j--) {
        // 摆棋
        for (let k = fMoves[j].length - 1; k >= 0; k--) {
          let x = fMoves[j][k] % 15;
          let y = parseInt(fMoves[j][k] / 15);
          arr[y][x] = k % 2 ? color : color == 1 ? 2 : 1;
        }
        let winLevel = getWinLevel(arr, color, timeout, depth, 1);
        //console.log("winLevel="+winLevel)
        if (winLevel < 3.5) notWin = true; // 复原棋子
        for (let k = fMoves[j].length - 1; k >= 0; k--) {
          let x = fMoves[j][k] % 15;
          let y = parseInt(fMoves[j][k] / 15);
          arr[y][x] = 0;
        }
        if (notWin) j = -1;
      }
    }
    if (!notWin) { pNum++; }
  }
  arr[y][x] = 0;
  //console.log(pNum + "--"+idx);
  if (pNum) {
    post("wLb", [idx, "◎", "red"]);
  }
  else {
    post("end");
  }

}



// 排除直接防
function excludeBP(arr, color, bPoint, timeout, depth) {

  let i;
  let x;
  let y;
  let fNum;
  let fMoves = []; // 临时保存找到的VCF
  for (i = bPoint.length - 1; i >= 0; i--) {
    x = bPoint[i] % 15;
    y = parseInt(bPoint[i] / 15);
    arr[y][x] = color;
    let j;
    for (j = fMoves.length - 1; j >= 0; j--) {
      if (isVCF(color == 1 ? 2 : 1, arr, fMoves[j])) break;
    }
    fNum = j >= 0 ? 1 : findVCF(color == 1 ? 2 : 1, timeout, depth, 1, true, arr);
    arr[y][x] = 0;
    if (fNum == 0) {
      return false;
    }
    else if (j < 0) { // 新的V
      fMoves.push(vcfWinMoves[0].slice(0));
    }

  }
  return true;
}



//限珠题
function findSimpleWin(arr, color, newarr, num) {

  let rt = false;
  if (num == 4) {
    let pnt = aroundPoint[112];
    let timeout = 30000;
    let depth = 1;
    // 确定双杀选点范围
    // 先判断对手进攻级别,快速选点
    selectPoint(arr, color, newarr, timeout, depth, false);

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



function isSimpleWin(idx, arr, color, num) {

  if (num == 4) {
    let timeout = 30000;
    let depth = 1;
    let x = idx % 15;
    let y = parseInt(idx / 15);

    arr[y][x] = color;
    let winLevel = getWinLevel(arr, color, timeout, depth, 2, 2);
    if (winLevel > 3) {
      post("wLb", [idx, "◎", "red"]);
      return
    }
    arr[y][x] = 0;
  }
  post("end");
}




// 
function findVCT(arr, color, idx, timeOut, depth, count, backStage) {


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
function isBlockVCF(idx, color, arr) {
  let x = idx % 15;
  let y = parseInt(idx / 15);
  arr[y][x] = color == 1 ? 2 : 1;
  // 确保没有新的VCF
  let fNum = findVCF(color, 60000, null, 1, true, arr);
  arr[y][x] = 0;
  if (fNum) {
    post("end");
  }
  else {
    post("wLb", [idx, "b", "blue"]);
  }
}



// 找VCF(活三级别)防点，返回一个数组,不存在防点返回 false
// VCF 二维数组保存保存了 n 套color色VCF,
function getBlockVCF(VCF, color, arr, backStage, passFour) {

  backStage = backStage == null ? true : backStage;
  let p = [];
  let pnt = aroundPoint[112];
  let len = VCF.length;
  let nColor = color == 1 ? 2 : 1;
  for (let i = 0; i < 225; i++) {
    let x = pnt.point[i].x;
    let y = pnt.point[i].y;
    // color是进攻方颜色
    if (arr[y][x] == 0 && (color == 1 || !isFoul(x, y, arr))) {
      let j;
      arr[y][x] = color == 1 ? 2 : 1;
      for (j = 0; j < len; j++) { // 验证之前VCF是否成立
        if (isVCF(color, arr, VCF[j])) break;
      }
      arr[y][x] = 0;
      // 防住所有VCF,记录防点,过滤掉先手防
      if (j >= len && (!passFour || !isFour(x, y, nColor, arr))) {
        p.push(pnt.index[i]);
        if (!backStage) post("wLb", [pnt.index[i], "b", "blue"]);
      }
    }

  }
  return p.length ? p : false;
}




// 找出成立的VCF(活三级别)防点
function getBlockVCFb(VCF, color, arr, backStage, passFour) {

  backStage = backStage == null ? true : backStage;
  let p = getBlockVCF(VCF, color, arr, true, passFour);
  if (!p) return false;
  for (let i = p.length - 1; i >= 0; i--) {
    let x = p[i] % 15;
    let y = parseInt(p[i] / 15);
    arr[y][x] = color == 1 ? 2 : 1;
    // 确保没有新的VCF
    let fNum = findVCF(color, 60000, null, 1, true, arr);
    arr[y][x] = 0;
    if (fNum) {
      p.splice(i, 1);
      // 用新VCF排除剩下防点
      for (let j = i - 1; j >= 0; j--) {
        x = p[j] % 15;
        y = parseInt(p[j] / 15);
        arr[y][x] = color == 1 ? 2 : 1;
        if (isVCF(color, arr, vcfWinMoves[0])) {
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

  return p.length ? p : false;
}



// 返回进攻级别,完成后newarr保存有五连点的信息
function getLevel(arr, color, pass) {

  if (isWin(color == 1 ? 2 : 1, arr)) return { level: 0, p: null };
  if (isWin(color, arr)) return { level: 5, p: null };
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

  return { level: 0, p: null };

}



// 计算进攻级别，
// level =={level:level,p:{x:x,y:y} || moves:moves};
// level.level==4 ,level =={level:level,p:{x:x,y:y} ,p保存冲4防点
// level.level==3,level =={level:level,moves:moves} moves保存一套成立的VCF手顺
function getLevelB(arr, color, newarr, timeout, depth, backstage) {

  timeout = timeout || 10000;
  depth = depth || 100;
  backstage = backstage !== false ? true : false;
  // 判断是否有在冲4以上进攻级别
  let level = getLevel(arr, color);
  if (level.level >= 4) {
    return level;
  }
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
  let n = findVCF(color, timeout, depth, 1, backstage, arr);
  if (n > 0) {
    return ({ level: 3, moves: vcfWinMoves[0] });
  }
  else {
    return ({ level: 2, moves: null });
  }

}



// 轮到对手落子
// 判断必胜级别 depth==vcf深度，gDepth==递归深度, maxNum==最大手数，单色手数
function getWinLevel(arr, color, timeout, depth, gDepth, maxNum) {

  timeout = timeout || 30000;
  depth = depth || 1000;
  gDepth = gDepth || 2;
  maxNum = maxNum || 1000;
  // 判断对手进攻级别
  let nLevel = getLevelB(arr, color == 1 ? 2 : 1, getArr([]), timeout, depth, true);
  let winLevel;
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
      let num = findVCF(color, timeout, depth, 1, true, arr);
      arr[y][x] = 0;
      if (num) return 4.4;
    }

    //findVCF(color,timeOut,depth,count,backStage,arr) 
    let fNum = findVCF(color, timeout, depth, 1, true, arr);
    if (fNum >= 1) { // 有(一套以上)两套V，判断双杀是否成立

      let notWin = false; //后续计算，如果双杀不成立==true
      let bPoint = getBlockVCF(vcfWinMoves, color, arr, true, true);
      if (bPoint) { //排除直接防
        if (!(excludeBP(arr, color == 1 ? 2 : 1, bPoint, timeout, depth))) {
          //排除失败，双杀不成立
          notWin = true;
        }
      }

      if (!notWin && gDepth >= 2) { // 没有找到直接共防，继续寻找先手防
        //处理先手防
        let fMoves = []; //  保存先手连续冲四分支
        continueFour(arr, color == 1 ? 2 : 1, 6, fMoves, getArr([]));
        for (let i = fMoves.length - 1; i >= 0; i--) {
          if (fMoves[i].length / 2 >= maxNum) {
            notWin = true;
            fMoves = [];
            break;
          }
        }
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
          winLevel = getWinLevel(arr, color, timeout, depth, gDepth - 1, maxNum - fMoves[j].length / 2);
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



// 确定选点范围
function selectPoint(arr, color, newarr, timeout, depth, backstage, level) {

  timeout = timeout || 30000;
  depth = depth || 1000;
  backstage = backstage == null ? true : backstage;
  // 确定活三级选点范围
  // 先判断对手进攻级别,快速选点

  if (!level) level = getLevelB(arr, color == 1 ? 2 : 1, getArr([]), timeout, depth);
  if (level.level >= 5) {
    getArr(newarr, -9999);
    post("selectPointEnd", [newarr]);
    return newarr;
  }
  else if (level.level >= 4.5) {
    let narr = getArr([]);
    findFivePoint(arr, color == 1 ? 2 : 1, narr);
    for (let y = 0; y < 15; y++) {
      for (let x = 0; x < 15; x++) {
        newarr[y][x] = narr[y][x] != 0 ? 0 : -9999;
      }
    }
    post("selectPointEnd", [newarr]);
    return newarr;
  }
  else if (level.level >= 4) {

    // 对手冲四，选点唯一
    getArr(newarr, -9999);
    // p保存的是防点
    newarr[level.p.y][level.p.x] = 0;

  }
  else if (level.level >= 3) {

    // 对手有V，选点范围在V的防点内
    let mv = []; //转二维数组
    mv.push(level.moves);
    let p = getBlockVCFb(mv, color == 1 ? 2 : 1, arr, true);
    getArr(newarr, -9999);

    for (let i = p.length - 1; i >= 0; i--) {
      let x = p[i] % 15;
      let y = parseInt(p[i] / 15);
      newarr[y][x] = 0;
    }

  }
  else { // level.level<3

    let narr = getArr([]);
    let narr1 = getArr([]);
    findFour(arr, color == 1 ? 2 : 1, narr1, null); // 保存对手冲四点
    continueFour(arr, color, depth < 4 ? depth : 4, [], narr); //分析连续冲四
    for (let y = 0; y < 15; y++) { // 把 arr 的数据合并到 narr;
      for (let x = 0; x < 15; x++) {
        if (arr[y][x] == color) narr[y][x] = color;
      }
    }
    for (let y = 0; y < 15; y++) { // 把 arr 的数据合并到 narr;
      for (let x = 0; x < 15; x++) {
        newarr[y][x] = (arr[y][x] == 0 && (around(narr, y * 15 + x, 3) || narr1[y][x] > 0)) ? 0 : -9999;
      }
    }

  }

  // 再排除黑禁手
  findFourPoint(arr, color, newarr, null, -9999); //排除冲4
  //findThreePoint (arr,color,newarr,onlyFree,-9999); //排除活三
  if (color == 1) findFoulPoint(arr, newarr, -9999); //排除禁手

  if (!backstage) printNewarr(newarr);

  post("selectPointEnd", [newarr]);
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

  try {

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
  catch (err) {
    //console.log("getNextEmpty err=" + err.message);
  }

}



// x,y,坐标代表第一个点和后面的4个点成五格。返回在这五格内的子力。
function getPower(x, y, arr, model, color, move, maxLen) {

  try {
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
  catch (err) {
    //console.log("getPower err=" + err.message);
  }

}



function getArr(arr, setnum, x, y) {

  try {
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
  catch (err) {
    //console.log("getArr err=" + err.message);
  }
}



// 把arr 数组格式化成棋盘 字符串
function printArr(arr) {

  try {
    let s = "";
    for (let i = 0; i < 15; i++) {

      s += "\n";
      for (let j = 0; j < 15; j++) {
        s += (arr[i][j] + String.fromCharCode(32) + String.fromCharCode(32));
      }
    }

    return s;
  }
  catch (err) {
    //console.log("printArr err=" + err.message);
  }
}



// 取得一个点的值
function getArrValue(x, y, move, model, arr) {

  try {
    let nx = changeX(x, move, model);
    let ny = changeY(y, move, model);
    if (nx >= 0 && nx <= 14 && ny >= 0 && ny <= 14) {
      return arr[ny][nx];
    }
    return null;
  }
  catch (err) {
    //console.log("getArrValue err=" + err.message);
  }
}



// 取得一个点的x,y
function getArrPoint(x, y, move, model, arr) {

  try {
    let nx = changeX(x, move, model);
    let ny = changeY(y, move, model);
    if (nx >= 0 && nx <= 14 && ny >= 0 && ny <= 14) {
      return { x: nx, y: ny };
    }
    return { x: -1, y: -1 };
  }
  catch (err) {
    //console.log("getArrPoint err=" + err.message);
  }
}



// 取得一个点的Index
function getArrIndex(x, y, move, model, arr) {

  try {
    let nx = changeX(x, move, model);
    let ny = changeY(y, move, model);
    if (nx >= 0 && nx <= 14 && ny >= 0 && ny <= 14) {
      return ny * 15 + nx;
    }
    return -1;
  }
  catch (err) {
    //console.log("getArrIndex err=" + err.message);
  }
}



function getX(idx) {

  return idx % 15;
}



function getY(idx) {

  return parseInt(idx / 15);
}



function changeX(x, move, model) {

  try {
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
  catch (err) {
    //console.log("changeX err=" + err.message);
  }
}



function changeY(y, move, model) {

  try {
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
  catch (err) {
    //console.log("changeY err=" + err.message);
  }
}