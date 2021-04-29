"use strict";
let control = (() => {
    const maxThread = 0 || window.navigator.hardwareConcurrency - 2 || 4;
    setTimeout(function() {
        //alert(maxThread);
    }, 3000);
    const renjuModel = 0;
    const imgModel = 1;
    const lineModel = 2;
    const arrowModel = 3;
    let cBd;
    let engine;
    let msg;
    let closeMsg;
    let appData;
    let dw;
    let dh;

    let playModel = renjuModel;
    let oldPlayModel = playModel;
    //let lbColor = [{"colName":"黑色标记", "color":"black"} , {"colName":"白色标记", "color":"white"}, {"colName":"蓝色标记", "color":"#3333ff"}];
    let lbColor = [
        { "colName": "黑色标记", "color": "black" },
        { "colName": "红色标记", "color": "red" },
        { "colName": "蓝色标记", "color": "#3333ff" },
        { "colName": "绿色标记", "color": "#008000" },
        { "colName": "卡其标记", "color": "#ff8c00" },
        { "colName": "紫色标记", "color": "#ff00ff" },
        { "colName": "暗灰标记", "color": "#483D8B" },
        { "colName": "暗绿标记", "color": "#556B2F" },
        ];
    let continueLabel = ["标记1", "标记2", "标记3", "标记4", "标记5"];
    let parentNode;
    let renjuCmddiv = null;
    let imgCmdDiv = null;

    let cLockImg = {};
    let cPutBoard = null;
    let cAutoPut = null;
    let cCleAll = null;
    let cShownum = null;
    let setShowNum = function() {};
    let getShowNum = function() {};
    let cNewGame = null;
    let cLocknum = null;
    let cAutoadd = null;
    let cAddblack = null;
    let cAddwhite = null;
    let cAddblack2 = null;
    let cAddwhite2 = null;
    let cLba = null;
    let cLbb = null;
    let cLbc = null;
    let cLbd = null;
    let cLbColor = null;
    let cBack = null;
    let cResetnum = null;
    let cReset = null;
    let cNextone = null;
    let cInputcode = null;
    let cOutputcode = null;
    let cStart = null;
    let cEnd = null;
    let cPrevious = null;
    let cNext = null;
    let cFlipX = null;
    let cFlipY = null;
    let cCW = null;
    let cCCW = null;
    let cLABC = null;
    let cMoveL = null;
    let cMoveR = null;
    let cMoveT = null;
    let cMoveB = null;
    let cCutImage = null;
    let cSelBlack = null;
    let cSelWhite = null;
    let cPrintVCF = null;
    let cFindPoint = null;
    let cFindVCF = null;
    let cCancelFind = null;
    let cObjVCF = { arr: [], winMoves: [], color: 0, time: false }; // 保存VCF分支
    let cLoadImg = null;
    let cSLTX = null;
    let cSLTY = null;
    let cShare = null;
    let cShareWhite = null;
    let cCleLb = null;
    let cHelp = null;
    let lbTime = new function() {
        this.prePostTimer = 0; //记录上次post事件时间，配合lbTime 监控后台是否停止
        this.div = document.createElement("div");
        this.startTime = 0;
        this.timer = null;

        this.move = function(left, top, width, height, fontSize) {
            renjuCmddiv.appendChild(this.div);
            this.startTime = new Date().getTime();
            this.div.style.position = "absolute";
            this.div.style.left = left;
            this.div.style.top = top;
            this.div.style.height = parseInt(height) + "px";
            this.div.style.width = parseInt(width) + "px";
            this.div.style.fontFamily = "mHeiTi";
            this.div.style.fontSize = fontSize;
            this.div.style.textAlign = "center";
            this.div.style.lineHeight = height;
            this.div.style.color = "#cccccc";
            /*
            this.div.style.borderStyle = "solid";
            this.div.style.borderWidth = "1px";
            this.div.style.borderColor = "red";
            */
            this.div.innerHTML = "00:00:00"
            let lbDiv = this.div;
            let sTime = this.startTime;
            this.prePostTimer = this.startTime;
            this.timer = setInterval(function() {
                let t = new Date().getTime();
                if (t - this.prePostTimer > 180000) {
                    sTime = sTime + t - this.prePostTimer;
                    this.prePostTimer = t;
                }
                t -= sTime;
                //console.log(t);
                let h = parseInt(t / 3600000);
                h = h < 10 ? "0" + h : h;
                let m = parseInt((t % 3600000) / 60000);
                m = m < 10 ? "0" + m : m;
                let s = parseInt((t % 60000) / 1000);
                s = s < 10 ? "0" + s : s;
                lbDiv.innerHTML = `${h}:${m}:${s}`;
            }, 1000);
        };
        this.close = function() {
            if (this.div.parentNode) this.div.parentNode.removeChild(this.div);
            clearInterval(this.timer);
        };
        this.setPrePostTimer = function(time) {
            this.prePostTimer = this.prePostTimer < time ? time : this.prePostTimer;
        };
    };

    function bArr(arr, arr2) { //判断两个arr是否相等
        if (arr2.length) {
            for (let y = 0; y < 15; y++) {
                for (let x = 0; x < 15; x++) {
                    if (arr[y][x] != arr2[y][x]) return false;
                }
            }
            return true;
        }
        return false;
    }


    let putCheckerBoard = putBoard;

    function putBoard(idx) {
        if (idx < 0) return;
        let arr = cBd.getPointArray([]);
        let h1 = parseInt(cBd.width);
        let h2 = parseInt(cBd.canvas.height);
        cBd.cle();
        cBd.printCheckerBoard();
        cBd.hideCutDiv();
        parentNode.style.top = h1 + parentNode.offsetTop - h2 + "px";
        parentNode.removeChild(imgCmdDiv);
        parentNode.appendChild(renjuCmddiv);
        playModel = oldPlayModel;
        cBd.drawLineEnd();
        cBd.unpackArray(changeCoordinate(arr, idx));
        viewport.resize();
    }

    function changeCoordinate(arr, idx) {
        let nArr = getArr([]);
        idx = idx || 112;
        let l = 7 - parseInt(idx % arr[0].length);
        l = l < 0 ? 0 : l;
        l = l + arr[0].length > 15 ? 15 - arr[0].length : l;
        let t = 7 - parseInt(idx / arr.length);
        t = t < 0 ? 0 : t;
        t = t + arr.length > 15 ? 15 - arr.length : t;
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                nArr[i + t][j + l] = arr[i][j];
            }
        }
        return nArr;
    }



    let cMenu = null;

    function createContextMenu(left, top, width, height, fontSize) {
        cMenu = new button(cBd.parentNode, "select", 0, 0, 0, 0);
        cMenu.index = -1; // save cBoard click index;


        cMenu.addOption(1, "🔍 找点");
        cMenu.addOption(2, "❓ 解题");
        cMenu.addOption(3, "新棋局");
        cMenu.addOption(4, "添加标记");
        cMenu.addOption(5, "清空标记");
        cMenu.addOption(6, "分享图片");
        cMenu.addOption(7, "分享原图");
        cMenu.addOption(8, "下手为❶");
        cMenu.addOption(9, "重置手数");
        cMenu.addOption(10, "显示手数");
        cMenu.addOption(11, "隐藏手数");
        cMenu.addOption(12, "输入代码");
        cMenu.addOption(13, "输出代码");
        cMenu.addOption(14, "输入图片");
        cMenu.addOption(15, "✄ 截图");

        cMenu.setonchange(function(but) {
            if (busy()) return;
            let idx = but.idx;
            let x = but.menu.offsetLeft;
            let y = but.menu.offsetTop;
            switch (but.input.value * 1) {
                case 1:
                    cFindPoint.showMenu(x, y);
                    break;
                case 2:
                    cFindVCF.showMenu(x, y);
                    break;
                case 3:
                    cNewGame.input.ontouchend();
                    break;
                case 4:
                    if (cBd.P[idx].type == tLb || cBd.P[idx].type == tLbMoves || cBd.P[idx].type == tEmpty) {
                        inputLabel(idx);
                    }
                    break;
                case 5:
                    cCleLb.input.ontouchend();
                    break;
                case 6:
                    cShareWhite.input.ontouchend();
                    break;
                case 7:
                    cShare.input.ontouchend();
                    break;
                case 8:
                    cNextone.input.ontouchend();
                    break;
                case 9:
                    cResetnum.input.ontouchend();
                    break;
                case 10:
                    cBd.showNum();
                    setShowNum(true);
                    cBd.isShowNum = getShowNum();
                    break;
                case 11:
                    cBd.hideNum();
                    setShowNum(false);
                    cBd.isShowNum = getShowNum();
                    break;
                case 12:
                    cInputcode.input.ontouchend();
                    break;
                case 13:
                    cOutputcode.input.ontouchend();
                    break;
                case 14:
                    cLoadImg.input.click();
                    break;
                case 15:
                    cCutImage.showMenu(x, y);
                    break;


            }
        });
        let p = { x: 0, y: 0 };
        cBd.xyObjToPage(p, cBd.canvas);
        left = p.x + (parseInt(cBd.canvas.style.width) - width) / 2;
        cMenu.createMenu(left, null, width, null, fontSize, true);
    }



    // renju 模式控制面板
    function createRenjuCmdDiv(parentNode, left, top, width, height) {

        renjuCmddiv = document.createElement("div");
        parentNode.appendChild(renjuCmddiv);
        renjuCmddiv.style.position = "relative";
        renjuCmddiv.style.width = width / 1.15 + "px";
        renjuCmddiv.style.height = width + "px";
        renjuCmddiv.style.top = parseInt(top) + "px";
        renjuCmddiv.style.left = (dw - parseInt(renjuCmddiv.style.width)) / 2 + "px";
        if (dw > dh) renjuCmddiv.style.left = width / 13 + "px";

        let sw = parseInt(renjuCmddiv.style.width);
        let w = sw / 9;
        let h = w / 1.5;
        let t = 0;
        let menuLeft = parseInt(parentNode.style.left) + parseInt(renjuCmddiv.style.left) + sw * 0.1;
        let menuWidth = sw * 0.8;
        let menuFontSize = sw / 20;


        cStart = new button(renjuCmddiv, "button", w * 0, t, w, h);
        cStart.show();
        cStart.setText("‖<<");
        cStart.setontouchend(function() {
            if (busy()) return;
            cBd.toStart(getShowNum());
        });

        cPrevious = new button(renjuCmddiv, "button", w * 1.6, t, w, h);
        cPrevious.show();
        cPrevious.setText(" <<");
        cPrevious.setontouchend(function() {
            if (busy()) return;
            cBd.toPrevious(getShowNum());
        });

        cNext = new button(renjuCmddiv, "button", w * 3.2, t, w, h);
        cNext.show();
        cNext.setText(">>");
        cNext.setontouchend(function() {
            if (busy()) return;
            cBd.toNext(getShowNum());
        });

        cEnd = new button(renjuCmddiv, "button", w * 4.8, t, w, h);
        cEnd.show();
        cEnd.setText(" >>‖");
        cEnd.setontouchend(function() {
            if (busy()) return;
            cBd.toEnd(getShowNum());
        });

        cShownum = new button(renjuCmddiv, "select", w * 6.4, t, w, h);
        cShownum.addOption(0, "显示手数");
        cShownum.addOption(1, "显示禁手");
        cShownum.addOption(2, "显示线路");
        cShownum.show();
        cShownum.setText("❶");
        //setShowNum(1);
        cShownum.createMenu(menuLeft, null, menuWidth, null, menuFontSize);
        cShownum.menu.lis[0].checked = true;
        cShownum.menu.lis[0].innerHTML = cShownum.input[0].text + "  ✔";
        cShownum.setonchange(function() {
            cShownum.setText("❶");
            if (busy()) return;
            switch (cShownum.input.value * 1) {
                case 0:
                    setLis(0, !cShownum.menu.lis[0].checked);
                    if (cShownum.menu.lis[0].checked) {
                        cBd.showNum();
                    }
                    else {
                        cBd.hideNum();
                    }
                    cBd.isShowNum = cShownum.menu.lis[0].checked;
                    break;
                case 1:
                    setLis(1, !cShownum.menu.lis[1].checked);
                    cBd.isShowFoul = cShownum.menu.lis[1].checked;
                    break;
                case 2:
                    setLis(2, !cShownum.menu.lis[2].checked);
                    cBd.isShowAutoLine = cShownum.menu.lis[2].checked;
                    break;
            }
            cBd.autoShow("now");

            function setLis(idx, checked) {
                cShownum.menu.lis[idx].checked = checked;
                if (cShownum.menu.lis[idx].checked) {
                    cShownum.menu.lis[idx].innerHTML = cShownum.input[idx].text + "  ✔";
                }
                else {
                    cShownum.menu.lis[idx].innerHTML = cShownum.input[idx].text;
                }
            }

            //cShownum.setText(getShowNum()?"❶" :"●");
        });
        setShowNum = function(shownum) {
            cShownum.menu.lis[0].checked = !!shownum;
            if (cShownum.menu.lis[0].checked) {
                cShownum.menu.lis[0].innerHTML = cShownum.input[0].text + "  ✔";
            }
            else {
                cShownum.menu.lis[0].innerHTML = cShownum.input[0].text;
            }
        }
        getShowNum = function() {
            return cShownum.menu.lis[0].checked;
        }

        cNewGame = new button(renjuCmddiv, "button", w * 8, t, w, h);
        cNewGame.show();
        cNewGame.setText("新棋局");
        cNewGame.setontouchend(function() {
            if (busy()) return;
            cBd.cle();
            cBd.resetNum = 0;
            engine.postMsg("cancelFind");
        });


        w = sw / 9;
        t = t + h * 1.5;



        cFlipY = new button(renjuCmddiv, "button", w * 0, t, w, h);
        cFlipY.show();
        cFlipY.setText("↔180°");
        cFlipY.setontouchend(function() {
            if (busy()) return;
            cBd.boardFlipY(getShowNum());
        });

        cCW = new button(renjuCmddiv, "button", w * 1.6, t, w, h);
        cCW.show();
        cCW.setText(" ↗90°");
        cCW.setontouchend(function() {
            if (busy()) return;
            cBd.boardCW(getShowNum());
        });

        cMoveL = new button(renjuCmddiv, "button", w * 3.2, t, w, h);
        cMoveL.show();
        cMoveL.setColor("black");
        cMoveL.setText("←");
        cMoveL.setontouchend(function() {
            if (busy()) return;
            cBd.moveCheckerBoard("left");
        });

        cMoveR = new button(renjuCmddiv, "button", w * 4.8, t, w, h);
        cMoveR.show();
        cMoveR.setColor("black");
        cMoveR.setText("→ ");
        cMoveR.setontouchend(function() {
            if (busy()) return;
            cBd.moveCheckerBoard("right");
        });

        cMoveT = new button(renjuCmddiv, "button", w * 6.4, t, w, h);
        cMoveT.show();
        cMoveT.setColor("black");
        cMoveT.setText(" ↑");
        cMoveT.setontouchend(function() {
            if (busy()) return;
            cBd.moveCheckerBoard("top");
        });

        cMoveB = new button(renjuCmddiv, "button", w * 8, t, w, h);
        cMoveB.show();
        cMoveB.setColor("black");
        cMoveB.setText("↓");
        cMoveB.setontouchend(function() {
            if (busy()) return;
            cBd.moveCheckerBoard("bottom");
        });


        w = sw / 5;
        t = t + h * 1.5;

        cSelBlack = new button(renjuCmddiv, "checkbox", w * 0, t, w, h);
        cSelBlack.show();
        cSelBlack.setText("黑先");
        cSelBlack.setChecked(1);
        cSelBlack.setontouchend(function() {
            //if (busy()) return;
            cSelChecked(cSelBlack);
        });

        cSelWhite = new button(renjuCmddiv, "checkbox", w * 1.33, t, w, h);
        cSelWhite.show();
        cSelWhite.setText("白先");
        cSelWhite.setontouchend(function() {
            //if (busy()) return;
            cSelChecked(cSelWhite);
        });

        const calculate = 1;
        let tMsg = [["3月21日，五子茶馆解题大赛"], ["比赛结束前，暂时关闭计算功能"]];

        cFindPoint = new button(renjuCmddiv, "select", w * 2.66, t, w, h);
        if (calculate) {
            //cFindPoint.addOption(0, "︾" );
            cFindPoint.addOption(1, "VCT选点");
            cFindPoint.addOption(2, "做V点");
            cFindPoint.addOption(3, "做43杀(白单冲4杀)");
            cFindPoint.addOption(4, "活三级别");
            cFindPoint.addOption(5, "活三");
            cFindPoint.addOption(6, "❌ 三三");
            cFindPoint.addOption(7, "❌ 四四");
            cFindPoint.addOption(8, "❌ 长连");
            cFindPoint.addOption(9, "五连");
            cFindPoint.addOption(10, "活四");
            cFindPoint.addOption(11, "冲四");
            cFindPoint.addOption(12, "眠三");
            //cFindPoint.addOption(13, "︽");
        }
        else {
            for (let i = 0; i < tMsg.length; i++) {
                cFindPoint.addOption(i, tMsg[i]);
            }
        }

        cFindPoint.createMenu(menuLeft, null, menuWidth, null, menuFontSize);
        cFindPoint.show();
        cFindPoint.setText("找点");
        cFindPoint.setonchange(function(but) {
            but.setText("找点");
            if (busy()) return;
            if (but.input.value < 1 || vcfFinding != -1 || !calculate) {
                but.input.value = 0;
                return;
            }
            let arr = [];
            cBd.getPointArray(arr);
            let newarr = getArr([]);
            switch (but.input.value * 1) {
                case 1:
                    /*
                    let ls = getLines(122,getRenjuSelColor(),arr,4);
                    cBd.wLb(122,"0","black" );
                    for (let i=ls.length-1; i>=0; i--) {
                        cBd.createMarkLine(ls[i].start, ls[i].end, "red")
                    }
                    */
                    engine.postMsg("vctSelectPoint", [getRenjuSelColor(), arr, newarr]);
                    break;
                case 2:
                    engine.postMsg("isLevelThreePoint", [getRenjuSelColor(), arr, newarr, onlyVCF]);
                    break;

                case 3:
                    engine.postMsg("isLevelThreePoint", [getRenjuSelColor(), arr, newarr, onlySimpleWin]);
                    break;

                case 4:
                    engine.postMsg("isLevelThreePoint", [getRenjuSelColor(), arr, newarr, null]);
                    break;

                case 5:
                    engine.postMsg("findThreePoint", [arr, getRenjuSelColor(), newarr, onlyFree]);
                    break;

                case 6:
                    engine.postMsg("findTTPoint", [arr, 1, newarr]);
                    break;

                case 7:
                    engine.postMsg("findFFPoint", [arr, 1, newarr]);
                    break;

                case 8:
                    engine.postMsg("findSixPoint", [arr, 1, newarr]);
                    break;

                case 9:
                    engine.postMsg("findFivePoint", [arr, getRenjuSelColor(), newarr, null]);
                    break;
                case 10:
                    engine.postMsg("findFourPoint", [arr, getRenjuSelColor(), newarr, onlyFree]);
                    break;
                case 11:
                    engine.postMsg("findFourPoint", [arr, getRenjuSelColor(), newarr, onlyNoFree]);
                    break;
                case 12:
                    engine.postMsg("findThreePoint", [arr, getRenjuSelColor(), newarr, onlyNoFree]);
                    break;
            }

            but.input.value = 0;
        });


        //cFindPoint.setontouchend(function() {});


        cFindVCF = new button(renjuCmddiv, "select", w * 3.99, t, w, h);
        if (calculate) {
            //cFindVCF.addOption(0, "︾");
            cFindVCF.addOption(1, "快速找  VCF");
            cFindVCF.addOption(2, "找全   VCF");
            cFindVCF.addOption(3, "找  双杀");
            cFindVCF.addOption(4, "大道五目");
            cFindVCF.addOption(5, "三手五连");
            cFindVCF.addOption(6, "四手五连");
            cFindVCF.addOption(7, "防 冲四抓禁");
            cFindVCF.addOption(8, "找  VCF防点");
            cFindVCF.addOption(9, "找  VCF防点(深度+1)");
            cFindVCF.addOption(10, "找  VCF防点(深度+∞)");
            cFindVCF.addOption(11, "坂田三手胜(测试)");
            cFindVCF.addOption(12, "VCT(测试）");
            //cFindVCF.addOption(12, "︽");
            //cFindVCF.addOption(12, "test two");
        }
        else {
            for (let i = 0; i < tMsg.length; i++) {
                cFindVCF.addOption(i, tMsg[i]);
            }
        }
        cFindVCF.createMenu(menuLeft, null, menuWidth, null, menuFontSize);
        cFindVCF.show();
        cFindVCF.setText("解题");
        cFindVCF.setonchange(function(but) {
            but.setText("解题");
            if (busy()) return;
            if (but.input.value < 1 || vcfFinding != -1 || !calculate) {
                but.input.value = 0;
                return;
            }
            let arr = [];
            cBd.getPointArray(arr);
            switch (but.input.value * 1) {
                case 1:
                    engine.postMsg("findVCF", [arr, getRenjuSelColor(), 1, null, null, null]);
                    break;
                case 2:
                    engine.postMsg("findVCF", [arr, getRenjuSelColor(), null, null, null, null]);
                    break;
                case 3:
                    engine.postMsg("isTwoVCF", [getRenjuSelColor(), arr, getArr([])]);
                    break;
                case 4:
                    engine.postMsg("isSimpleWin", [getRenjuSelColor(), arr, getArr([]), 4, 3]);
                    break;
                case 5:
                    engine.postMsg("isThreeWinPoint", [getRenjuSelColor(), arr, getArr([])]);
                    break;
                case 6:
                    engine.postMsg("isFourWinPoint", [getRenjuSelColor(), arr, getArr([])]);
                    break;
                case 8:
                    engine.postMsg("getBlockVCF", [arr, getRenjuSelColor()]);
                    break;
                case 9:
                    engine.postMsg("getBlockVCFb", [arr, getRenjuSelColor()]);
                    break;
                case 10:
                    engine.postMsg("getBlockVCFTree", [arr, getRenjuSelColor()]);
                    break;
                case 7:
                    engine.postMsg("blockCatchFoul", [arr]);
                    break;
                case 11:
                    engine.postMsg("findVCT", [arr, getRenjuSelColor(), null, 1, 2, null]);
                    break;
                case 12:
                    /*
                    console.log(isFFWin(8,12,2,arr))
                    arr[12][8] = "*"
                    console.log(arr)
                    arr[12][8] = 0
                    */
                    //engine.postMsg("findLevelThreePoint", [arr, getRenjuSelColor(), getArr([]), null, null, false]);
                    engine.postMsg("findVCT", [arr, getRenjuSelColor(), null, 1, 5, null]);
                    break;
                case 112:
                    let cModel = ["x", "y", "d", "u"];
                    for (let i = 0; i < 4; i++) {
                        let two = isLineTwo(7, 7, cModel[i], getRenjuSelColor(), arr, false);
                        alert(two);
                    }
                    break;
            }
            but.input.value = 0;

        });
        cFindVCF.setontouchend(function() {});


        cCancelFind = new button(renjuCmddiv, "button", w * 3.99, t, w, h);
        //cCancelFind.show();
        cCancelFind.setText("🚫 停止");
        //cCancelFind.setColor("red");
        cCancelFind.setontouchend(function(but) {
            engine.postMsg("cancelFind");
        });



        t = t + h * 1.5;

        cAutoadd = new button(renjuCmddiv, "radio", 0, t, w, h);
        cAutoadd.show();
        cAutoadd.setText(" ◐ 棋");
        cAutoadd.setChecked(1);
        cAutoadd.setontouchend(function() {
            //if (busy()) return;
            nSetChecked(cAutoadd);
        });

        cAddblack = new button(renjuCmddiv, "radio", w * 1.33, t, w, h);
        cAddblack.show();
        cAddblack.setText(" ● 棋");
        cAddblack.setontouchend(function() {
            //if (busy()) return;
            nSetChecked(cAddblack);
        });

        cAddwhite = new button(renjuCmddiv, "radio", w * 2.66, t, w, h);
        cAddwhite.show();
        cAddwhite.setText(" ○ 棋");
        cAddwhite.setontouchend(function() {
            //if (busy()) return;
            nSetChecked(cAddwhite);
        });

        cPrintVCF = new button(renjuCmddiv, "select", w * 3.99, t, w, h);
        //cPrintVCF.addOption(0, "︾");
        cPrintVCF.addOption(1, "第1套VCF");
        cPrintVCF.addOption(2, "第2套VCF");
        cPrintVCF.addOption(3, "第3套VCF");
        cPrintVCF.addOption(4, "第4套VCF");
        cPrintVCF.addOption(5, "第5套VCF");
        cPrintVCF.addOption(6, "第6套VCF");
        cPrintVCF.addOption(7, "第7套VCF");
        cPrintVCF.addOption(8, "第8套VCF");
        //cPrintVCF.addOption(9, "︽");
        cPrintVCF.createMenu(menuLeft, null, menuWidth, null, menuFontSize);
        cPrintVCF.show();
        cPrintVCF.setText("➩ VCF ");
        cPrintVCF.setonchange(function(but) {
            but.setText("➩ VCF ");
            if (busy()) return;
            if (but.input.value * 1) {
                let color = getRenjuSelColor();
                let arr = cBd.getPointArray([]);
                if (color == cObjVCF.color && bArr(arr, cObjVCF.arr)) {
                    if (cObjVCF.winMoves.length >= but.input.value) {
                        let moves = cObjVCF.winMoves[but.input.value - 1].slice(0, cObjVCF.winMoves[but.input.value - 1].length);
                        cBd.printMoves(moves, cObjVCF.color);
                    }
                    else {
                        let str = ` ${color==1?"黑棋":"白棋"} 只找到 ${cObjVCF.winMoves.length} 套 VCF 记录`;
                        msg(str);
                    }
                }
                else {
                    let str = `请先 找全 ${color==1?"黑棋":"白棋"} VCF`;
                    msg(str);
                }
                but.input.value = 0;
            }
        });




        t = t + h * 1.5;


        cLba = new button(renjuCmddiv, "radio", w * 0, t, w, h);
        cLba.show();
        cLba.setText(" ■ ");
        cLba.setontouchend(function() {
            //if (busy()) return;
            nSetChecked(cLba);
        });

        cLbb = new button(renjuCmddiv, "radio", w * 1.33, t, w, h);
        cLbb.show();
        cLbb.setText(" ◎ ");
        cLbb.setontouchend(function() {
            //if (busy()) return;
            nSetChecked(cLbb);
        });


        cLABC = new button(renjuCmddiv, "select", w * 2.66, t, w, h);
        //cLABC.addOption(-1, "︾");
        cLABC.addOption(0, "←  箭头");
        cLABC.addOption(1, "__ 线条");
        cLABC.addOption(2, "ABC...");
        cLABC.addOption(3, "abc...");
        cLABC.addOption(4, "123...");
        cLABC.addOption(5, "自定义...");
        cLABC.addOption(6, "☆标记");
        cLABC.addOption(7, "❌标记");

        cLABC.createMenu(menuLeft, null, menuWidth, null, menuFontSize);
        cLABC.show();

        cLABC.setontouchend(function() {
            //if (busy()) return;
            nSetChecked(cLABC);
        });

        cLABC.setonchange(function() {
            changePlayModel();
            if (cLABC.input.value == 5) {
                let w = cBd.width * 0.8;
                let h = w;
                let l = (dw - w) / 2;
                let t = (dh - dw) / 4;
                t = t < 0 ? 1 : t;
                let lbStr = "";
                for (let i = 0; i < continueLabel.length; i++) {
                    lbStr += (continueLabel[i] + ",");
                }
                msg(`${lbStr}......\n\n\n,-------------\n类似(ABC...),(abc...),(123...)\n可在上面编辑 连续输入的 标记。每个标记 用英文 [,] 逗号隔开，每个标记最多3个字符`, "input", l, t, w, h, "输入代码", null,
                    newContinueLabel, null, null, 10);
            }
        });

        let hm = cLABC.hideMenu;
        cLABC.hideMenu = function(ms, callbak) {
            hm.call(this, ms, callbak);
            //console.log(this.input.value)
            changePlayModel();
        };

        let newContinueLabel = function(msgStr) {
            let labels = [];
            let st = 0;
            let s;
            let end = msgStr.indexOf(",", st);
            while (end > st) {
                s = msgStr.slice(st, end);
                if (s.length > 0 && s.length < 4) {
                    labels.push(s);
                }
                st = end + 1;
                end = msgStr.indexOf(",", st);
            }
            if (labels.length) continueLabel = labels;
        };

        let changePlayModel = function() {
            if (cLABC.input.value == 0) {
                playModel = arrowModel;
                //console.log("arrowModel")
            }
            else if (cLABC.input.value == 1) {
                playModel = lineModel;
                //console.log("lineModel")
            }
            else {
                playModel = renjuModel;
                cBd.drawLineEnd();
                //console.log("renjuModel")
            }
        };

        cNextone = new button(renjuCmddiv, "button", w * 3.99, t, w, h);

        cNextone.show();
        cNextone.setColor("black");
        cNextone.setText(" 下手为❶");
        cNextone.setontouchend(function() {
            if (busy()) return;
            cBd.setResetNum(cBd.MSindex + 1);
            cBd.isShowNum = getShowNum();
        });



        t = t + h * 1.5;


        cLbc = new button(renjuCmddiv, "radio", w * 0, t, w, h);
        cLbc.show();
        cLbc.setText(" ▲ ");
        cLbc.setontouchend(function() {
            //if (busy()) return;
            nSetChecked(cLbc);
        });


        cLbd = new button(renjuCmddiv, "radio", w * 1.33, t, w, h);
        cLbd.show();
        cLbd.setText(" ✖ ");
        cLbd.setontouchend(function() {
            //if (busy()) return;
            nSetChecked(cLbd);
        });

        cLbColor = new button(renjuCmddiv, "select", w * 2.66, t, w, h);
        //cLbColor.addOption(-1, "︾");
        for (let i = 0; i < lbColor.length; i++) {
            cLbColor.addOption(i, lbColor[i].colName);
        }
        //cLbColor.addOption(3, "︽");
        cLbColor.createMenu(menuLeft, null, menuWidth, null, menuFontSize);
        for (let i = cLbColor.menu.lis.length - 1; i >= 0; i--) {
            cLbColor.menu.lis[i].style.color = lbColor[i].color;
            let div = document.createElement("div");
            cLbColor.menu.appendChild(div);
            div.onclick = cLbColor.menu.lis[i].onclick;
            let s = div.style;
            s.position = "absolute";
            s.width = `${(cLbColor.menu.menuWidth)/2}px`;
            s.height = `${cLbColor.menu.lis[i].style.lineHeight}`;
            s.left = `${parseInt(cLbColor.menu.lis[i].style.fontSize)*7}px`;
            s.top = `${(parseInt(cLbColor.menu.fontSize) * 2.5 + 3)*(cLbColor.menu.lis["down"] ? i +1 : i)+i}px`;
            //console.log(`s.height= ${s.height}, s.width=${s.width}, left=${s.left}, top=${s.top}`)
            //console.log(cLbColor.menu.lis["down"])
            s.backgroundColor = lbColor[i].color;
        }
        cLbColor.show();
        cLbColor.setText("✎ 颜色");
        cLbColor.setonchange(function(but) {
            //if (busy()) return;
            but.setColor(lbColor[but.input.value].color);
            but.setText("✎ 颜色");
            cLba.setColor(lbColor[but.input.value].color);
            cLbb.setColor(lbColor[but.input.value].color);
            cLbc.setColor(lbColor[but.input.value].color);
            cLbd.setColor(lbColor[but.input.value].color);
            cLABC.setColor(lbColor[but.input.value].color);
        });


        cResetnum = new button(renjuCmddiv, "button", w * 3.99, t, w, h);
        cResetnum.show();
        cResetnum.setColor("black");
        cResetnum.setText(" 重置手数");
        cResetnum.setontouchend(function() {
            if (busy()) return;
            cBd.setResetNum(0);
            setShowNum(true);
            cBd.isShowNum = getShowNum();
        });



        t = t + h * 1.5;

        cInputcode = new button(renjuCmddiv, "button", w * 0, t, w, h);
        cInputcode.show();
        cInputcode.setColor("black");
        cInputcode.setText("输入代码");
        let inputCode = function(msgStr) {
            // 成功设置棋盘 ，就开始解析棋盘摆盘
            if (msgStr.indexOf("color==") > -1) {

                let st = msgStr.indexOf("color==");
                let color = Number(msgStr.slice(st + 7, st + 8));
                st = msgStr.indexOf("[");
                let end = msgStr.indexOf("]");
                if (st > -1 && end - st >= 2) {
                    let str = msgStr.slice(st + 1, end);
                    let mv = [];
                    st = 0;
                    end = str.indexOf(",", st + 1);
                    while (end > -1) {
                        mv.push(Number(str.slice(st, end)));
                        st = end + 1;
                        end = str.indexOf(",", st + 1);
                    }
                    mv.push(Number(str.slice(st)));
                    cBd.printMoves(mv, color);
                    return;
                }
            }
            else if (msgStr.indexOf("debug") > -1) {

                if (vConsole == null) vConsole = new VConsole();
                return;
            }
            else if (msgStr.indexOf("close") > -1) {

                if (vConsole) vConsole.destroy();
                vConsole = null;
                return;
            }
            else if (msgStr.indexOf("offline") > -1 || msgStr.indexOf("icon") > -1) {

                cBd.cutImg.style.width = parseInt(cBd.canvas.width) + "px";
                cBd.cutImg.style.height = parseInt(cBd.canvas.height) + "px";
                cBd.cutImg.src = "./icon.png";
                cBd.parentNode.appendChild(cBd.cutImg);
                let pNode = renjuCmddiv.parentNode;
                pNode.removeChild(renjuCmddiv);
                cBd.cutImg.ontouchend = cBd.cutImg.onclick = function() {
                    cBd.parentNode.removeChild(cBd.cutImg);
                    pNode.appendChild(renjuCmddiv);
                }
                return;
            }

            cBd.unpackCode(getShowNum(), msgStr);

        }
        cInputcode.setontouchend(function() {
            if (busy()) return;
            let w = cBd.width * 0.8;
            let h = w;
            let l = (dw - w) / 2;
            let t = (dh - dw) / 4;
            t = t < 0 ? 1 : t;
            msg("长按下面空白区域，粘贴棋谱代码 " + "\n" + "-------------" + "\n\n", "input", l, t, w, h, "输入代码", null,
                inputCode, null, null, 10);
        });

        cOutputcode = new button(renjuCmddiv, "button", w * 1.33, t, w, h);
        cOutputcode.show();
        cOutputcode.setColor("black");
        cOutputcode.setText("输出代码");
        cOutputcode.setontouchend(function() {
            if (busy()) return;
            let w = cBd.width * 0.8;
            let h = w;
            let l = (dw - w) / 2;
            let t = (dh - dw) / 4;
            t = t < 0 ? 1 : t;
            let code = cBd.getCode();
            code = code == "\n{}{}" ? "空棋盘没有棋盘代码" : code;
            msg(code + "\n\n\n" + "-------------" + "\n" + "长按上面代码，复制棋谱代码 ", "input", l, t, w, h, "输入代码", null,
                inputCode, null, null, 10);
        });

        cLoadImg = new button(renjuCmddiv, "file", w * 2.66, t, w, h);
        cLoadImg.show();
        cLoadImg.input.accept = "image/*";
        cLoadImg.setText("输入图片");
        cLoadImg.setonchange(function() {
            if (busy()) return;
            let reader = new FileReader();
            let file = cLoadImg.input.files[0];
            cLoadImg.input.value = "";
            let img = cBd.bakImg;
            img.src = null;
            reader.readAsDataURL(file);
            reader.onload = function() {
                img.src = reader.result;
            };
            img.onload = function() {
                img.onload = null;
                cBd.oldXL = cBd.oldXR = 0;
                putImg();
            };
            engine.postMsg("cancelFind");
        });

        function putImg() {
            let img = cBd.bakImg;
            let w = parseInt(img.width);
            let h = parseInt(img.height);
            let w1 = cBd.width;
            let h1 = cBd.width * h / w;
            let h2 = cBd.canvas.height;
            cBd.cle();
            // 画图之前，设置画布大小
            cBd.canvas.width = w1;
            cBd.canvas.height = h1;
            cBd.canvas.style.width = w1 + "px";
            cBd.canvas.style.height = h1 + "px";
            let ctx = cBd.canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, w, h, w1 / 13, h1 / 13, w1 / 13 * 11, h1 / 13 * 11);
            parentNode.style.top = h1 + parentNode.offsetTop - h2 + "px";
            cBd.resetCutDiv();
            parentNode.removeChild(renjuCmddiv);
            parentNode.appendChild(imgCmdDiv);
            oldPlayModel = playModel;
            playModel = imgModel;
            cLockImg.setChecked(0);
            cAddblack2.setChecked(1);
            cAddwhite2.setChecked(0);
            cSLTX.input.value = cBd.SLTX;
            cSLTX.setText(cSLTX.input.value + " 列");
            cSLTY.input.value = cBd.SLTY;
            cSLTY.setText(cSLTY.input.value + " 行");
            ctx = null;
            viewport.userScalable();
        }

        cCutImage = new button(renjuCmddiv, "select", w * 3.99, t, w, h);
        //cCutImage.addOption(0, "︾");
        //cCutImage.addOption(1, "分享图片");
        cCutImage.addOption(2, "JPEG/(*.jpg)__压缩");
        cCutImage.addOption(3, "PNG(*.png)__清晰");
        cCutImage.addOption(4, "SVG/(*.svg)__矢量,无损");
        cCutImage.addOption(5, "SVG/(*.svg.html__矢量，无损");
        cCutImage.addOption(6, "PDF/(*.pdf)__矢量，无损");
        //cCutImage.addOption(7, "︽");
        cCutImage.createMenu(menuLeft, null, menuWidth, null, menuFontSize);
        cCutImage.show();
        cCutImage.setText("✄ 截图");
        cCutImage.setonchange(function(but) {
            but.setText("✄ 截图");
            if (busy()) return;
            switch (but.input.value * 1) {
                case 1:
                    share();
                    break;
                case 2:
                    cBd.saveAsImage("jpeg");
                    break;
                case 3:
                    cBd.saveAsImage("png");
                    break;
                case 4:
                    cBd.saveAsSVG("svg");
                    break;
                case 5:
                    cBd.saveAsSVG("html");
                    break;
                case 6:
                    cBd.saveAsPDF();
                    break;
            }
            but.input.value = 0;
        });


        t = t + h * 1.5;
        if (dw < dh) {
            t = 0 - cBd.width - h * 2.5;
        }

        cShareWhite = new button(renjuCmddiv, "button", w * 0, t, w, h);
        cShareWhite.show();
        cShareWhite.setColor("black");
        cShareWhite.setText(" 分享图片");
        cShareWhite.setontouchend(function() {
            if (busy()) return;
            share("white");
        });

        cShare = new button(renjuCmddiv, "button", w * 1.33, t, w, h);
        cShare.show();
        cShare.setColor("black");
        cShare.setText(" 分享原图");
        cShare.setontouchend(function() {
            if (busy()) return;
            share();
        });

        cCleLb = new button(renjuCmddiv, "button", w * 2.66, t, w, h);
        cCleLb.show();
        cCleLb.setColor("black");
        cCleLb.setText(" 清空标记");
        cCleLb.setontouchend(function() {
            if (busy()) return;
            cBd.removeMarkLine("all");
            cBd.removeMarkArrow("all");
            cBd.cleLb("all");
            cBd.threePoints = {};
        });

        cHelp = new button(renjuCmddiv, "button", w * 3.99, t, w, h);
        cHelp.show();
        cHelp.setColor("black");
        cHelp.setText(" 帮助 ");
        cHelp.setontouchend(function() {
            if (busy()) return;
            window.open("./help/renjuhelp/renjuhelp.html", "_self");
        });



        t = t + h * 1.5;

        createContextMenu(null, null, menuWidth, null, menuFontSize);


        function cSelChecked(chk) {
            cSelBlack.setChecked(0);
            cSelWhite.setChecked(0);
            chk.setChecked(1);
        }




        function nSetChecked(chk) {
            cLba.setChecked(0);
            cLbb.setChecked(0);
            cLbc.setChecked(0);
            cLbd.setChecked(0);
            cAutoadd.setChecked(0);
            cAddblack.setChecked(0);
            cAddwhite.setChecked(0);
            cLABC.setChecked(0);
            chk.setChecked(1);
            if (chk != cLABC) {
                playModel = renjuModel;
                cBd.drawLineEnd();
            }
        }



        setTimeout(function() {

            engine.reset({
                "maxThread": maxThread,
                "cObjVCF": cObjVCF,
                "cBoard": cBd,
                "cFindVCF": cFindVCF,
                "cFindPoint": cFindPoint,
                "cCancelFind": cCancelFind,
                "lbTime": lbTime,
                "msg": msg,
                "closeMsg": closeMsg,
                "closeNoSleep": closeNoSleep,
                "saveContinueData": appData.saveContinueData,
                "saveData": appData.saveData,
            });

            let continueData = appData.loadContinueData(cBd);

            if (continueData) {
                msg("上次意外退出,继续计算...", null, null, null, null, null, null, null, null, null, 0);
                closeMsg(3000);
                engine.postMsg(continueData.cmd, [continueData]);
            }

        }, 1000 * 1);


    }



    function createImgCmdDiv(parentNode, left, top, width, height) {

        imgCmdDiv = document.createElement("div");
        let s = imgCmdDiv.style;
        //parentNode.appendChild(imgCmdDiv);
        s.position = "relative";
        s.width = width / 1.15 + "px";
        s.height = width + "px";
        s.top = parseInt(top) + "px";
        s.left = (dw - parseInt(s.width)) / 2 + "px";
        if (dw > dh) s.left = width / 13 + "px";

        let sw = parseInt(s.width);
        let w = sw / 5;
        let h = sw / 9 / 1.5;
        let t = 0;
        let menuLeft = parseInt(parentNode.style.left) + parseInt(imgCmdDiv.style.left) + sw * 0.1;
        let menuWidth = sw * 0.8;
        let menuFontSize = sw / 20;

        cLockImg = new button(imgCmdDiv, "checkbox", w * 0, t, w, h);
        cLockImg.show();
        cLockImg.setText("选定棋盘");
        cLockImg.setontouchend(function() {
            if (cLockImg.checked) {
                lockImg();
            }
            else {
                putImg();
                return;
            }
        });

        function putImg() {
            let img = cBd.bakImg;
            let w = parseInt(img.width);
            let h = parseInt(img.height);
            let w1 = cBd.width;
            let h1 = cBd.width * h / w;
            let h2 = cBd.canvas.height;
            cBd.cle();
            // 画图之前，设置画布大小
            cBd.canvas.width = w1;
            cBd.canvas.height = h1;
            cBd.canvas.style.width = w1 + "px";
            cBd.canvas.style.height = h1 + "px";
            let ctx = cBd.canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, w, h, w1 / 13, h1 / 13, w1 / 13 * 11, h1 / 13 * 11);
            parentNode.style.top = h1 + parentNode.offsetTop - h2 + "px";
            cBd.resetCutDiv();
            ctx = null;
            viewport.userScalable();
        }

        function lockImg(fun) {

            let div = cBd.cutDiv;
            let w = parseInt(cBd.cutDiv.style.width);
            let h = parseInt(cBd.cutDiv.style.height);
            let w2 = w / 11 * 13;
            let h2 = h / 11 * 13;
            let l = div.offsetLeft - w / 11 > 0 ? div.offsetLeft - w / 11 : 0;
            let t = div.offsetTop - h / 11 > 0 ? div.offsetTop - h / 11 : 0;
            let L2 = l > 0 ? 0 : w / 11 - div.offsetLeft;
            let t2 = t > 0 ? 0 : h / 11 - div.offsetTop;
            //alert(`div.offsetLeft${div.offsetLeft},div.offsetTop${div.offsetTop}`)
            cBd.bakCanvas.width = w2;
            cBd.bakCanvas.height = h2;
            cBd.bakCanvas.style.width = w2 + "px";
            cBd.bakCanvas.style.height = h2 + "px";

            let ctx = cBd.bakCanvas.getContext("2d");
            ctx.fillStyle = cBd.backgroundColor;
            ctx.fillRect(0, 0, w2, h2);
            cBd.cutImg.src = cBd.bakCanvas.toDataURL("image/png");

            cBd.cutImg.onload = function() {
                cBd.cutImg.onload = null;
                let w3 = parseInt(cBd.canvas.width) - div.offsetLeft;
                w3 = w3 < w / 11 * 12 ? w : w / 11 * 12;
                w3 += l == 0 ? div.offsetLeft : w / 11;
                let h3 = parseInt(cBd.canvas.height) - div.offsetTop;
                h3 = h3 < h / 11 * 12 ? h : h / 11 * 12;
                h3 += t == 0 ? div.offsetTop : h / 11;
                ctx.drawImage(cBd.canvas, l, t, w3, h3, L2, t2, w3, h3);
                cBd.cutImg.src = cBd.bakCanvas.toDataURL("image/png");

                cBd.cutImg.onload = function() {
                    cBd.cutImg.onload = null;
                    ctx = cBd.canvas.getContext("2d");

                    h = parseInt(cBd.canvas.height);
                    cBd.canvas.height = parseInt(cBd.width) * h2 / w2;
                    cBd.canvas.style.height = parseInt(cBd.width) * h2 / w2 + "px";
                    ctx.drawImage(cBd.cutImg, 0, 0, w2, h2, 0, 0, parseInt(cBd.width), parseInt(cBd.width) * h2 / w2);

                    cBd.XL = parseInt(cBd.canvas.width) / 13;
                    cBd.XR = parseInt(cBd.canvas.width) / 13 * 12;
                    cBd.YT = parseInt(cBd.canvas.height) / 13;
                    cBd.YB = parseInt(cBd.canvas.height) / 13 * 12;
                    cBd.resetP(cBd.XL, cBd.XR, cBd.YT, cBd.YB);
                    parentNode.style.top = parseInt(cBd.canvas.height) + parentNode.offsetTop - h + "px";

                    cBd.cleAllPointBorder();
                    cBd.hideCutDiv();
                    ctx = null;
                    viewport.resize();
                    if (fun) fun();
                    /*
                    cBd.parentNode.appendChild(cBd.bakCanvas);
                    cBd.bakCanvas.style.top = 2000;
                    cBd.parentNode.appendChild(cBd.cutImg);
                    cBd.cutImg.style.top = 1500;
                    */
                }
            }

        }

        cAutoPut = new button(imgCmdDiv, "button", w * 1.33, t, w, h);
        cAutoPut.show();
        cAutoPut.setColor("black");
        cAutoPut.setText(" 自动识别");
        cAutoPut.setontouchend(function() {
            if (!cLockImg.checked) {
                lockImg(function() { cBd.autoPut(); });
                cLockImg.setChecked(1);
            }
            else {
                cBd.autoPut();
            }
            nSetChecked(cAddwhite2);
        });



        cPutBoard = new button(imgCmdDiv, "button", w * 2.66, t, w, h);
        cPutBoard.show();
        cPutBoard.setColor("black");
        cPutBoard.setText(" 摆入棋盘");
        cPutBoard.setontouchend(function() {
            if (cBd.SLTX == 15 && cBd.SLTY == 15) {
                putBoard();
            }
            else {
                msg("小棋盘,长按屏幕(鼠标右键点击)定位H8");
            }
        });



        cCleAll = new button(imgCmdDiv, "button", w * 3.99, t, w, h);
        cCleAll.show();
        cCleAll.setColor("black");
        cCleAll.setText(" 清空棋盘");
        cCleAll.setontouchend(function() {
            for (let i = cBd.SLTX * cBd.SLTY - 1; i >= 0; i--) cBd.P[i].cle();
        });


        t = t + h * 1.5;

        cAddblack2 = new button(imgCmdDiv, "radio", w * 0, t, w, h);
        cAddblack2.show();
        cAddblack2.setText(" ● 棋");
        cAddblack2.setontouchend(function() {
            nSetChecked(cAddblack2);
        });

        cAddwhite2 = new button(imgCmdDiv, "radio", w * 1.33, t, w, h);
        cAddwhite2.show();
        cAddwhite2.setText(" ○ 棋");
        cAddwhite2.setontouchend(function() {
            nSetChecked(cAddwhite2);
        });


        cSLTY = new button(imgCmdDiv, "select", w * 2.66, t, w, h);
        //cSLTY.addOption(16, "︾");
        for (let i = 15; i >= 5; i--) {
            cSLTY.addOption(i, i);
        }
        //cSLTY.addOption(4, "︽");
        cSLTY.createMenu(menuLeft, null, menuWidth, null, menuFontSize);
        cSLTY.show();
        cSLTY.setText(cSLTY.input.value + " 行");
        cSLTY.setonchange(function(but) {
            but.setText(but.input.value + " 行");
            cBd.SLTY = but.input.value;
            cBd.resetP(cBd.XL, cBd.XR, cBd.YT, cBd.YB);
            if (!cLockImg.checked) {
                cBd.cleAllPointBorder();
                cBd.printBorder();
            }
            else {
                cLockImg.setChecked(0);
                putImg();
            }
        });

        cSLTX = new button(imgCmdDiv, "select", w * 3.99, t, w, h);
        //cSLTX.addOption(16, "︾");
        for (let i = 15; i >= 5; i--) {
            cSLTX.addOption(i, i);
        }
        //cSLTX.addOption(4, "︽");
        cSLTX.createMenu(menuLeft, null, menuWidth, null, menuFontSize);
        cSLTX.show();
        cSLTX.setText(cSLTX.input.value + " 列");
        cSLTX.setonchange(function(but) {
            but.setText(but.input.value + " 列");
            cBd.SLTX = but.input.value;
            cBd.resetP(cBd.XL, cBd.XR, cBd.YT, cBd.YB);
            if (!cLockImg.checked) {
                cBd.cleAllPointBorder();
                cBd.printBorder();
            }
            else {
                cLockImg.setChecked(0);
                putImg();
            }
        });


        function nSetChecked(chk) {
            cAddblack2.setChecked(0);
            cAddwhite2.setChecked(0);
            chk.setChecked(1);
            if (!cLockImg.checked) {
                lockImg();
                cLockImg.setChecked(1);
            }
        }
    }



    //返回参数确认 添加棋子 还是标签
    function getRenjuCmd() {

        let isShow = getShowNum() ? true : false;
        let idx;
        let lbIdx;
        let code;
        let tcode;
        let txt;
        switch (true) {

            case cAutoadd.checked:
                return { type: tNum, cmd: "auto", showNum: isShow };
            case cAddblack.checked:
                return { type: tBlack, cmd: "black", showNum: isShow };
            case cAddwhite.checked:
                return { type: tWhite, cmd: "white", showNum: isShow };
            case cLba.checked:
                return { type: tLb, cmd: "■", showNum: isShow };
            case cLbb.checked:
                return { type: tLb, cmd: "◎", showNum: isShow };
            case cLbc.checked:
                return { type: tLb, cmd: "▲", showNum: isShow };
            case cLbd.checked:
                return { type: tLb, cmd: "✖", showNum: isShow };
            case cLABC.checked:

                switch (cLABC.input.value * 1) {
                    case 2:
                        // 搜索棋盘上最大的字母;
                        code = "A".charCodeAt(); // 65→90
                        for (idx = 0; idx < cBd.SLTX * cBd.SLTY; idx++) {
                            if ((cBd.P[idx].type == tLb || cBd.P[idx].type == tBlack || cBd.P[idx].type == tWhite) && cBd.P[idx].text.length == 1) {
                                let tcode = cBd.P[idx].text.charCodeAt(0);
                                if (tcode >= code && tcode <= 90) {
                                    code = tcode < 90 ? tcode + 1 : tcode;
                                }
                            }
                        }
                        txt = String.fromCharCode(code);
                        return { type: tLb, cmd: txt, showNum: isShow };

                    case 3:

                        // 搜索棋盘上最大的字母;
                        code = "a".charCodeAt(); // 65→90
                        for (idx = 0; idx < cBd.SLTX * cBd.SLTY; idx++) {
                            if ((cBd.P[idx].type == tLb || cBd.P[idx].type == tBlack || cBd.P[idx].type == tWhite) && cBd.P[idx].text.length == 1) {
                                tcode = cBd.P[idx].text.charCodeAt(0);
                                if (tcode >= code && tcode <= 122) {
                                    code = tcode < 122 ? tcode + 1 : tcode;
                                }
                            }
                        }
                        txt = String.fromCharCode(code);
                        return { type: tLb, cmd: txt, showNum: isShow };

                    case 4:
                        // 搜索棋盘上最大的数字
                        code = 1 // 1-225;
                        for (idx = 0; idx < cBd.SLTX * cBd.SLTY; idx++) {
                            if (cBd.P[idx].type == tLb || cBd.P[idx].type == tBlack || cBd.P[idx].type == tWhite) {
                                tcode = cBd.P[idx].text * 1;
                                if (tcode >= code && tcode <= 225) {
                                    code = tcode < 225 ? tcode + 1 : tcode;
                                }
                            }
                        }
                        txt = code;
                        return { type: tLb, cmd: txt, showNum: isShow };
                    case 5:
                        lbIdx = 0;
                        for (idx = 0; idx < cBd.SLTX * cBd.SLTY; idx++) {
                            if (cBd.P[idx].type == tLb || cBd.P[idx].type == tBlack || cBd.P[idx].type == tWhite) {
                                tcode = cBd.P[idx].text;
                                let i = continueLabel.indexOf(tcode);
                                if (i >= lbIdx) {
                                    lbIdx = i < continueLabel.length - 1 ? i + 1 : i;
                                }
                            }
                        }
                        txt = continueLabel[lbIdx];
                        return { type: tLb, cmd: txt, showNum: isShow };
                    case 6:
                        return { type: tLb, cmd: "☆", showNum: isShow };
                    case 7:
                        return { type: tLb, cmd: "❌", showNum: isShow };

                }
        }

    }



    function getRenjuLbColor() {

        return lbColor[cLbColor.input.value].color;
    }



    function getRenjuSelColor() {
        return cSelBlack.checked ? 1 : 2;
    }




    let timerCancelKeepTouch = null; // 防止悔棋触发取消红色显示
    let cancelKeepTouck = function() {
        if (timerCancelKeepTouch) return true;
        timerCancelKeepTouch = setTimeout("timerCancelKeepTouch=null", 800);
    }



    function renjuClick(x, y) {

        if (busy()) return;
        if (sharing) return;
        let idx = cBd.getPIndex(x, y);

        if (playModel == renjuModel) {
            if (idx > -1) {
                let cmds = getRenjuCmd();
                let arr = cBd.getPointArray([]);
                if (cBd.oldCode) cmds.type = tNum;
                if (cBd.threePoints && cBd.threePoints.arr) {
                    if (cBd.threePoints.index > -1) {
                        cBd.printThreePoints();
                        return;
                    }
                    else {
                        cBd.printThreePointMoves(idx);
                        return;
                    }
                }
                switch (cmds.type) {
                    case tNum:
                        cancelKeepTouck();
                        if (cBd.P[idx].type == tNum) {
                            //点击棋子，触发悔棋
                            cBd.cleNb(idx, cmds.showNum);
                        }
                        else if (cBd.P[idx].type == tEmpty || ((cBd.oldCode || cBd.P[idx].text == "❌") && cBd.P[idx].type == tLb)) {
                            // 添加棋子  wNb(idx,color,showNum)
                            let isF = isFoul(idx % 15, parseInt(idx / 15), arr);
                            cBd.wNb(idx, "auto", cmds.showNum, null, isF);
                        }
                        break;

                    case tBlack:
                        if (cBd.P[idx].type == tWhite || cBd.P[idx].type == tBlack) {
                            //点击棋子，触发悔棋
                            cBd.cleNb(idx);
                        }
                        else if (cBd.P[idx].type == tEmpty) {
                            // 添加棋子  wNb(idx,color,showNum)
                            cBd.wNb(idx, "black", cmds.showNum);
                        }
                        break;

                    case tWhite:
                        if (cBd.P[idx].type == tWhite || cBd.P[idx].type == tBlack) {
                            //点击棋子，触发悔棋
                            cBd.cleNb(idx);
                        }
                        else if (cBd.P[idx].type == tEmpty) {
                            // 添加棋子  wNb(idx,color,showNum)
                            cBd.wNb(idx, "white", cmds.showNum);
                        }
                        break;

                    case tLb:
                        if (cBd.P[idx].type == tLb || cBd.P[idx].type == tLbMoves) {
                            // 点击标记，删除标记
                            cBd.cleLb(idx);
                        }
                        else if (cBd.P[idx].type == tEmpty) {
                            // 添加标记 wLb(idx,text,color, showNum:isShow) 
                            cBd.wLb(idx, cmds.cmd, getRenjuLbColor());
                        }
                        else if (cBd.P[idx].type == tWhite || cBd.P[idx].type == tBlack) {
                            if (cBd.P[idx].text) {
                                cBd.P[idx].text = "";
                                cBd.printPointB(idx, cBd.P[idx].text, cBd.P[idx].color, cBd.P[idx].type, cBd.isShowNum, cBd.P[idx].bkColor);
                                cBd.refreshMarkArrow(idx);
                            }
                            else {
                                cBd.P[idx].text = cmds.cmd;
                                cBd.printPointB(idx, cBd.P[idx].text, cBd.P[idx].color, cBd.P[idx].type, cBd.isShowNum, cBd.P[idx].bkColor);
                                cBd.refreshMarkArrow(idx);
                            }
                        }
                        break;
                }

            }

        }
        else if (playModel == lineModel) {
            cBd.drawLineStart(idx, getRenjuLbColor(), "line");
        }
        else if (playModel == arrowModel) {
            cBd.drawLineStart(idx, getRenjuLbColor(), "arrow");
        }


    }


    function renjuDblClick(x, y) {

        if (busy()) return;
        if (sharing) return;
        let idx = cBd.getPIndex(x, y);
        if (idx > -1) {
            // 触发快速悔棋
            if (cBd.P[idx].type == tNum) {
                if (idx != cBd.MS[cBd.MSindex]) {
                    for (let i = cBd.MSindex + 1; i > parseInt(cBd.P[idx].text); i--) {
                        cBd.cleNb(idx, getShowNum());
                    }
                }
                else { // 
                    if (!cancelKeepTouck()) renjuKeepTouch(x, y);
                }
            } // 触发，手动输入标记
            else if ((cBd.P[idx].type == tLb || cBd.P[idx].type == tLbMoves || cBd.P[idx].type == tEmpty) && !cAutoadd.checked && !cAddblack.checked && !cAddwhite.checked) {
                inputLabel(idx);
            }

        }
    }


    function renjuKeepTouch(x, y) {

        if (busy()) return;
        if (sharing) return;
        let idx = cBd.getPIndex(x, y);
        if (idx < 0) return;
        let w = cBd.width * 0.8;
        let h;
        let l = (dw - w) / 2;
        let t = dh / 7;

        /*
        switch (cBd.P[idx].type) {
            case tNum:
                if (idx == cBd.MS[cBd.MSindex]) {
                    let str = cBd.notShowLastNum ? "确认恢复 最后一手红色显示。" : "确认取消 最后一手红色显示。";
                    msg(str, null, null, null, null, null, null, null, function() {

                        if (cBd.setNotShowLastNum(idx)) {
                            if (getShowNum()) {
                                cBd.showNum();
                            }
                            else {
                                cBd.hideNum();
                            }
                        }
                    }, null, 2);
                }
                break;
            case tLb:
                // 设置弹窗，让用户手动输入标记
                inputLabel(idx);
                break;
            case tEmpty:
                // 设置弹窗，让用户手动输入标记
                inputLabel(idx);
                break;

        }
        */
        if (idx == cBd.MS[cBd.MSindex]) {
            let str = cBd.notShowLastNum ? "确认恢复 最后一手红色显示。" : "确认取消 最后一手红色显示。";
            msg(str, null, null, null, null, null, null, null, function() {

                if (cBd.setNotShowLastNum(idx)) {
                    if (getShowNum()) {
                        cBd.showNum();
                    }
                    else {
                        cBd.hideNum();
                    }
                }
            }, null, 2);
        }
        else {
            //console.log(`top=${window.scrollY}, left=${window.scrollX}`);
            cMenu.idx = idx;
            cMenu.showMenu(null, y - window.scrollY - cMenu.menu.fontSize * 2.5 * 3);

        }

    }


    function inputLabel(idx) {
        let w = cBd.width * 0.8;
        let h;
        let l = (dw - w) / 2;
        let t = dh / 7;
        let color = getRenjuLbColor();
        // 设置弹窗，让用户手动输入标记
        msg("", "input", l, t, w, h, "输入标记", null, function(msgStr) {

                if (msgStr.length > 3) { // printMoves  || add Num
                    let add = msgStr.indexOf("add");
                    let str = msgStr.slice(add > -1 ? add + 3 : 0);
                    let mv = []; //save moves
                    let st = 0;
                    let end = str.indexOf(",", st + 1);
                    while (end > -1) {
                        mv.push(Number(str.slice(st, end)));
                        st = end + 1;
                        end = str.indexOf(",", st + 1);
                    }
                    mv.push(Number(str.slice(st)));
                    for (let i = mv.length - 1; i >= 0; i--) { // if err exit
                        if (!mv[i]) return;
                    }
                    let color = getRenjuSelColor();
                    if (add > -1) { // add Num
                        for (let i = 0; i < mv.length; i++) {
                            cBd.wNb(mv[i], "auto", true);
                        }
                    }
                    else { //printMoves
                        cBd.printMoves(mv, color);
                    }
                    return;
                }

                let str = msgStr.substr(0, 3);
                cBd.cleLb(idx); // 清除原来标记，打印用户选定的标记
                if (str != "" && str != " ") cBd.wLb(idx, str, color);

            },
            function(msgStr) { //用户取消，删除标记
                //cBd.clePoint(idx);
            });
    }



    function busy() {
        let busy = !cFindVCF.div.parentNode || !cFindPoint.div.parentNode;
        //if (busy) console.log(`请先停止计算，再操作`);
        return busy;
    }


    // 创建一个window
    let sharing = false;

    let shareWindow = document.createElement("div");
    shareWindow.ontouch = function() { if (event) event.preventDefault(); };

    let imgWindow = document.createElement("div");
    imgWindow.ontouch = function() { if (event) event.preventDefault(); };
    shareWindow.appendChild(imgWindow);

    let shareLabel = document.createElement("div");
    imgWindow.appendChild(shareLabel);

    let shareImg = document.createElement("img");
    imgWindow.appendChild(shareImg);

    let bkShareImg = document.createElement("img");
    //imgWindow.appendChild(bkShareImg);
    let bkCanvas = document.createElement("canvas");
    //imgWindow.appendChild(bkCanvas);
    //取消按钮
    let butShareCancel = new button(imgWindow, "button", 50, 50, 50, 50);

    function share(cBoardColor) {

        if (sharing) return;
        sharing = true;
        let s = shareWindow.style;
        s.position = "fixed";
        s.zIndex = 9998;
        s.width = dw + "px";
        s.height = dh * 2 + "px";
        s.top = "0px";
        s.left = "0px";

        let imgWidth = dw < dh ? dw : dh;
        imgWidth = parseInt(imgWidth * 3 / 4);
        s = imgWindow.style;
        s.position = "relative";
        s.width = imgWidth + "px";
        s.height = imgWidth + "px";
        s.top = parseInt((dh - imgWidth) / 2) + "px";
        s.left = parseInt((dw - imgWidth) / 2) + "px";
        s.backgroundColor = "#666666";
        s.border = `0px solid ${butShareCancel.selectBackgroundColor}`;

        let iWidth = parseInt(imgWidth * 3 / 5);
        shareImg.src = cBd.canvas.toDataURL();
        s = shareImg.style;
        s.position = "absolute";
        s.width = iWidth + "px";
        s.height = iWidth + "px";
        s.top = parseInt((imgWidth - iWidth) / 2) + "px";
        s.left = parseInt((imgWidth - iWidth) / 2) + "px";
        s.border = `0px solid black`;

        let oldBackgroundColor = cBd.backgroundColor;
        let oldLbBackgroundColor = cBd.LbBackgroundColor;
        if (cBoardColor == "white") {

            cBd.backgroundColor = "white";
            cBd.LbBackgroundColor = "white";
            cBd.refreshCheckerBoard();
            shareImg.src = cBd.canvas.toDataURL();
            shareImg.onload = function() {
                /*
                cBd.backgroundColor = oldBackgroundColor;
                cBd.LbBackgroundColor = oldLbBackgroundColor;
                cBd.refreshCheckerBoard();
                */
            };
        }
        else {
            shareImg.src = cBd.canvas.toDataURL();
            //if (navigator.userAgent.indexOf("iPhone") +1) window.location.href = "data:application/png" + cBd.canvas.toDataURL().substr(14);
        }

        let h = parseInt((imgWidth - iWidth) / 2 / 2);
        let w = h * 4;
        let l = (imgWidth - w) / 2;
        let t = imgWidth - h - (imgWidth - iWidth) / 8;

        shareLabel.innerHTML = `<h1 style = "font-size: ${h*0.45}px;text-align: center;color:#f0f0f0">长按图片(保存)分享</h1>`;
        s = shareLabel.style;
        s.position = "absolute";
        s.width = w + "px";
        s.height = h + "px";
        s.top = (imgWidth - iWidth) / 8 + "px";
        s.left = l + "px";
        s.backgroundColor = imgWindow.style.backgroundColor || "#666666";

        butShareCancel.show(l, t, w, h);
        butShareCancel.div.style.border = `1px solid black`;
        butShareCancel.setText("关闭分享");
        butShareCancel.setontouchend(function() {
            shareClose();
            if (cBd.backgroundColor != oldBackgroundColor || cBd.LbBackgroundColor != oldLbBackgroundColor) {
                cBd.backgroundColor = oldBackgroundColor;
                cBd.LbBackgroundColor = oldLbBackgroundColor;
                cBd.refreshCheckerBoard();
            }
        });
        shareWindow.setAttribute("class", "show");
        setTimeout(() => { document.body.appendChild(shareWindow); }, 1);


    }

    function shareClose() {

        shareWindow.setAttribute("class", "hide");
        setTimeout(() => {
            shareWindow.parentNode.removeChild(shareWindow);
            sharing = false;
        }, AnimationTimeout);

    }

    return {
        "getPlayModel": () => { return playModel },
        "renjuModel": renjuModel,
        "imgModel": imgModel,
        "lineModel": lineModel,
        "arrowModel": arrowModel,
        "cLockImgChecked": () => { return cLockImg.checked; },
        "cAddwhite2Checked": () => { return cAddwhite2.checked; },
        "putCheckerBoard": putCheckerBoard,
        "renjuKeepTouch": renjuKeepTouch,
        "renjuDblClick": renjuDblClick,
        "renjuClick": renjuClick,
        "getRenjuSelColor": getRenjuSelColor,
        "getRenjuLbColor": getRenjuLbColor,
        "reset": (cBoard, engine_, msg_, closeMsg_, appData_, documentWidth, documentHeight, param) => {
            cBd = cBoard;
            engine = engine_;
            msg = msg_;
            closeMsg = closeMsg_;
            appData = appData_;
            dw = documentWidth;
            dh = documentHeight;
            parentNode = param[0];
            createRenjuCmdDiv(param[0], param[1], param[2], param[3], param[4]);
            createImgCmdDiv(param[0], param[1], param[2], param[3], param[4]);
        },
        //"showContextMenu": ()=>{cMenu.showMenu();},
    };
})();