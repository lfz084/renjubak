"use strict";
let control = (() => {
    const maxThread = 0 || window.navigator.hardwareConcurrency - 2 || 4;
    setTimeout(function() {
        //alert(maxThread);
    }, 3000);
    const renjuModel = 0;
    const imgModel = 1;
    let cBd;
    let engine;
    let msg;
    let closeMsg;
    let appData;
    let dw;
    let dh;

    let playModel = renjuModel;
    //let lbColor = [{"colName":"黑色标记", "color":"black"} , {"colName":"白色标记", "color":"white"}, {"colName":"蓝色标记", "color":"#3333ff"}];
    let lbColor = [{ "colName": "黑色标记", "color": "black" }, { "colName": "红色标记", "color": "red" }, { "colName": "蓝色标记", "color": "#3333ff" }];
    let parentNode;
    let renjuCmddiv = null;
    let imgCmdDiv = null;

    let cLockImg = {};
    let cPutBoard = null;
    let cAutoPut = null;
    let cCleAll = null;
    let cShownum = null;
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
            this.div.style.height = height;
            this.div.style.width = width;
            this.div.style.fontFamily = "黑体";
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
        playModel = renjuModel;
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

    // renju 模式控制面板
    function createRenjuCmdDiv(parentNode, left, top, width, height) {

        renjuCmddiv = document.createElement("div");
        parentNode.appendChild(renjuCmddiv);
        renjuCmddiv.style.position = "relative";
        renjuCmddiv.style.width = width / 1.15 + "px";
        renjuCmddiv.style.height = width + "px";
        renjuCmddiv.style.top = parseInt(top) + "px";
        renjuCmddiv.style.left = (dw - parseInt(renjuCmddiv.style.width)) / 2 + "px";
        if (dw > dh) renjuCmddiv.style.left = width/13  + "px";

        let sw = parseInt(renjuCmddiv.style.width);
        let w = sw / 9;
        let h = w / 1.5;
        let t = 0;


        cStart = new button(renjuCmddiv, "button", w * 0, t, w, h);
        cStart.show();
        cStart.setText("‖<<");
        cStart.setontouchend(function() {
            cBd.toStart(cShownum.checked);
        });

        cPrevious = new button(renjuCmddiv, "button", w * 1.6, t, w, h);
        cPrevious.show();
        cPrevious.setText(" <<");
        cPrevious.setontouchend(function() {
            cBd.toPrevious(cShownum.checked);
        });

        cNext = new button(renjuCmddiv, "button", w * 3.2, t, w, h);
        cNext.show();
        cNext.setText(">>");
        cNext.setontouchend(function() {
            cBd.toNext(cShownum.checked);
        });

        cEnd = new button(renjuCmddiv, "button", w * 4.8, t, w, h);
        cEnd.show();
        cEnd.setText(" >>‖");
        cEnd.setontouchend(function() {
            cBd.toEnd(cShownum.checked);
        });

        cShownum = new button(renjuCmddiv, "checkbox", w * 6.4, t, w, h);
        cShownum.show();
        cShownum.setText("●", "❶");
        cShownum.setChecked(1);
        cShownum.setontouchend(function() {
            renjucShownumClick();
            cBd.isShowNum = cShownum.checked;
            //cShownum.setText(cShownum.checked?"❶" :"●");
        });

        cNewGame = new button(renjuCmddiv, "button", w * 8, t, w, h);
        cNewGame.show();
        cNewGame.setText("新棋局");
        cNewGame.setontouchend(function() {
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
            cBd.boardFlipY(cShownum.checked);
        });

        cCW = new button(renjuCmddiv, "button", w * 1.6, t, w, h);
        cCW.show();
        cCW.setText(" ↗90°");
        cCW.setontouchend(function() {
            cBd.boardCW(cShownum.checked);
        });

        cMoveL = new button(renjuCmddiv, "button", w * 3.2, t, w, h);
        cMoveL.show();
        cMoveL.setColor("black");
        cMoveL.setText("←");
        cMoveL.setontouchend(function() {
            cBd.moveCheckerBoard("left");
        });

        cMoveR = new button(renjuCmddiv, "button", w * 4.8, t, w, h);
        cMoveR.show();
        cMoveR.setColor("black");
        cMoveR.setText("→ ");
        cMoveR.setontouchend(function() {
            cBd.moveCheckerBoard("right");
        });

        cMoveT = new button(renjuCmddiv, "button", w * 6.4, t, w, h);
        cMoveT.show();
        cMoveT.setColor("black");
        cMoveT.setText(" ↑");
        cMoveT.setontouchend(function() {
            cBd.moveCheckerBoard("top");
        });

        cMoveB = new button(renjuCmddiv, "button", w * 8, t, w, h);
        cMoveB.show();
        cMoveB.setColor("black");
        cMoveB.setText("↓");
        cMoveB.setontouchend(function() {
            cBd.moveCheckerBoard("bottom");
        });


        w = sw / 5;
        t = t + h * 1.5;

        cSelBlack = new button(renjuCmddiv, "checkbox", w * 0, t, w, h);
        cSelBlack.show();
        cSelBlack.setText("黑先");
        cSelBlack.setChecked(1);
        cSelBlack.setontouchend(function() {
            cSelChecked(cSelBlack);
        });

        cSelWhite = new button(renjuCmddiv, "checkbox", w * 1.33, t, w, h);
        cSelWhite.show();
        cSelWhite.setText("白先");
        cSelWhite.setontouchend(function() {
            cSelChecked(cSelWhite);
        });

        cFindPoint = new button(renjuCmddiv, "select", w * 2.66, t, w, h);
        cFindPoint.addOption(0, "<<");
        /*
        cFindPoint.addOption(1, "VCT选点");
        cFindPoint.addOption(2, "做V点");
        cFindPoint.addOption(3, "做43杀(冲4再44,冲4冲4抓)");
        cFindPoint.addOption(4, "活三级别");
        cFindPoint.addOption(5, "活三");
        cFindPoint.addOption(6, "❌\b三三");
        cFindPoint.addOption(7, "❌\b四四");
        cFindPoint.addOption(8, "❌\b长连");
        cFindPoint.addOption(9, "五连");
        cFindPoint.addOption(10, "活四");
        cFindPoint.addOption(11, "冲四");
        cFindPoint.addOption(12, "眠三");
        */
        
        cFindPoint.setontouchend(function() {
            alert("五子茶馆将在1月17日举行解题大赛(双杀赛)，暂时关闭解题功能。比赛结束后可以正常使用计算功能")
        });
        
        cFindPoint.show();
        cFindPoint.setText("找点");
        cFindPoint.setonchange(function(but) {
            but.setText("找点");
            if (but.input.value < 1 || vcfFinding != -1) {
                but.input.value = 0;
                return;
            }


            let arr = [];
            cBd.getPointArray(arr);
            let newarr = getArr([]);
            switch (but.input.value * 1) {
                case 1:
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
        cFindPoint.setontouchend(function() {});


        cFindVCF = new button(renjuCmddiv, "select", w * 3.99, t, w, h);
        cFindVCF.addOption(0, "<<");
        /*
        cFindVCF.addOption(1, "快速找\b VCF");
        cFindVCF.addOption(2, "找全\b  VCF");
        cFindVCF.addOption(3, "找\b 双杀");
        cFindVCF.addOption(4, "大道五目");
        cFindVCF.addOption(5, "三手五连");
        cFindVCF.addOption(6, "四手五连");
        cFindVCF.addOption(7, "防\b冲四抓禁");
        cFindVCF.addOption(8, "找\b VCF防点");
        cFindVCF.addOption(9, "找\b VCF防点(深度)");
        cFindVCF.addOption(10, "坂田三手胜(测试)");
        cFindVCF.addOption(11, "VCT(测试）");
        //cFindVCF.addOption(12, "test two");
        */
        
        cFindVCF.setontouchend(function(){
            alert("五子茶馆将在1月17日举行解题大赛(双杀赛)，暂时关闭解题功能。比赛结束后可以正常使用计算功能")
        });
        
        cFindVCF.show();
        cFindVCF.setText("解题");
        cFindVCF.setonchange(function(but) {
            but.setText("解题");
            if (but.input.value < 1 || vcfFinding != -1) {
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
                case 7:
                    engine.postMsg("blockCatchFoul", [arr]);
                    break;
                case 10:
                    engine.postMsg("findVCT", [arr, getRenjuSelColor(), null, 1, 2, null]);
                    break;
                case 11:
                    /*
                    console.log(isFFWin(8,12,2,arr))
                    arr[12][8] = "*"
                    console.log(arr)
                    arr[12][8] = 0
                    */
                    //engine.postMsg("findLevelThreePoint", [arr, getRenjuSelColor(), getArr([]), null, null, false]);
                    engine.postMsg("findVCT", [arr, getRenjuSelColor(), null, 1, 5, null]);
                    break;
                case 12:
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
        cCancelFind.setText("停止");
        cCancelFind.setontouchend(function(but) {
            engine.postMsg("cancelFind");
        });



        t = t + h * 1.5;

        cAutoadd = new button(renjuCmddiv, "radio", 0, t, w, h);
        cAutoadd.show();
        cAutoadd.setText("\b◐\b棋");
        cAutoadd.setChecked(1);
        cAutoadd.setontouchend(function() {
            nSetChecked(cAutoadd);
        });

        cAddblack = new button(renjuCmddiv, "radio", w * 1.33, t, w, h);
        cAddblack.show();
        cAddblack.setText("\b●\b棋");
        cAddblack.setontouchend(function() {
            nSetChecked(cAddblack);
        });

        cAddwhite = new button(renjuCmddiv, "radio", w * 2.66, t, w, h);
        cAddwhite.show();
        cAddwhite.setText("\b○\b棋");
        cAddwhite.setontouchend(function() {
            nSetChecked(cAddwhite);
        });

        cPrintVCF = new button(renjuCmddiv, "select", w * 3.99, t, w, h);
        cPrintVCF.addOption(0, "<<");
        cPrintVCF.addOption(1, "第1套VCF");
        cPrintVCF.addOption(2, "第2套VCF");
        cPrintVCF.addOption(3, "第3套VCF");
        cPrintVCF.addOption(4, "第4套VCF");
        cPrintVCF.addOption(5, "第5套VCF");
        cPrintVCF.addOption(6, "第6套VCF");
        cPrintVCF.addOption(7, "第7套VCF");
        cPrintVCF.addOption(8, "第8套VCF");
        cPrintVCF.show();
        cPrintVCF.setText("➩\b VCF \b");
        cPrintVCF.setonchange(function(but) {
            but.setText("➩\b VCF \b");
            if (but.input.value) {
                let color = getRenjuSelColor();
                let arr = cBd.getPointArray([]);
                if (color == cObjVCF.color && bArr(arr, cObjVCF.arr)) {
                    if (cObjVCF.winMoves.length >= but.input.value) {
                        let moves = cObjVCF.winMoves[but.input.value - 1].slice(0, cObjVCF.winMoves[but.input.value - 1].length);
                        cBd.printMoves(moves, cObjVCF.color);
                    }
                    else {
                        let str = `\b${color==1?"黑棋":"白棋"}\b只找到\b${cObjVCF.winMoves.length} 套\bVCF\b记录`;
                        msg(str);
                    }
                }
                else {
                    let str = `请先\b找全\b${color==1?"黑棋":"白棋"}\bVCF`;
                    msg(str);
                }
                but.input.value = 0;
            }

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
        });





        t = t + h * 1.5;


        cLba = new button(renjuCmddiv, "radio", w * 0, t, w, h);
        cLba.show();
        cLba.setText("\b ■ \b");
        cLba.setontouchend(function() {
            nSetChecked(cLba);
        });

        cLbb = new button(renjuCmddiv, "radio", w * 1.33, t, w, h);
        cLbb.show();
        cLbb.setText("\b◎\b");
        cLbb.setontouchend(function() {
            nSetChecked(cLbb);
        });

        cLABC = new button(renjuCmddiv, "select", w * 2.66, t, w, h);
        cLABC.addOption(0, "ABC...");
        cLABC.addOption(1, "abc...");
        cLABC.addOption(2, "123...");
        cLABC.addOption(3, "☆标记");
        cLABC.show();
        cLABC.setontouchstart(function() {
            nSetChecked(cLABC);
        });

        cNextone = new button(renjuCmddiv, "button", w * 3.99, t, w, h);
        cNextone.show();
        cNextone.setColor("black");
        cNextone.setText(" 下手为❶");
        cNextone.setontouchend(function() {
            cBd.setResetNum(cBd.MSindex + 1);
        });



        t = t + h * 1.5;


        cLbc = new button(renjuCmddiv, "radio", w * 0, t, w, h);
        cLbc.show();
        cLbc.setText("\b ▲\b");
        cLbc.setontouchend(function() {
            nSetChecked(cLbc);
        });


        cLbd = new button(renjuCmddiv, "radio", w * 1.33, t, w, h);
        cLbd.show();
        cLbd.setText("\b ✖\b");
        cLbd.setontouchend(function() {
            nSetChecked(cLbd);
        });

        cLbColor = new button(renjuCmddiv, "select", w * 2.66, t, w, h);
        cLbColor.addOption(0, lbColor[0].colName);
        cLbColor.addOption(1, lbColor[1].colName);
        cLbColor.addOption(2, lbColor[2].colName);
        cLbColor.show();
        cLbColor.setText("✎\b颜色");
        cLbColor.setonchange(function(but) {
            but.setColor(lbColor[but.input.value].color);
            but.setText("✎\b颜色");
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
            cBd.setResetNum(0);
            cShownum.setChecked(true);
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

            cBd.unpackCode(cShownum.checked, msgStr);

        }
        cInputcode.setontouchend(function() {
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
            playModel = imgModel;
            cLockImg.setChecked(0);
            cAddblack2.setChecked(1);
            cAddwhite2.setChecked(0);
            cSLTX.input.value = cBd.SLTX;
            cSLTX.setText(cSLTX.input.value + "\b列");
            cSLTY.input.value = cBd.SLTY;
            cSLTY.setText(cSLTY.input.value + "\b行");
            ctx = null;
            viewport.userScalable();
        }

        cCutImage = new button(renjuCmddiv, "select", w * 3.99, t, w, h);
        cCutImage.addOption(0, "<<");
        //cCutImage.addOption(1, "分享图片");
        cCutImage.addOption(2, "JPEG/(*.jpg)__压缩");
        cCutImage.addOption(3, "PNG(*.png)__清晰");
        cCutImage.addOption(4, "SVG/(*.svg)__矢量,无损");
        cCutImage.addOption(5, "SVG/(*.svg.html__矢量，无损");
        cCutImage.addOption(6, "PDF/(*.pdf)__矢量，无损");
        cCutImage.show();
        cCutImage.setText("✄\b截图");
        cCutImage.setonchange(function(but) {
            but.setText("✄\b截图");
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
        if (dw<dh) {
            t = 0 - cBd.width - h*2.5;
        }
        
        cShareWhite = new button(renjuCmddiv, "button", w * 0, t, w, h);
        cShareWhite.show();
        cShareWhite.setColor("black");
        cShareWhite.setText(" 分享图片");
        cShareWhite.setontouchend(function() {
            share("white");
        });
        
        cShare = new button(renjuCmddiv, "button", w * 1.33, t, w, h);
        cShare.show();
        cShare.setColor("black");
        cShare.setText(" 分享原图");
        cShare.setontouchend(function() {
            share();
        });
        
        cCleLb = new button(renjuCmddiv, "button", w * 2.66, t, w, h);
        cCleLb.show();
        cCleLb.setColor("black");
        cCleLb.setText(" 清除标记");
        cCleLb.setontouchend(function() {
            cBd.cleLb("all");
        });
        
        cHelp = new button(renjuCmddiv, "button", w * 3.99, t, w, h);
        cHelp.show();
        cHelp.setColor("black");
        cHelp.setText(" 帮助 ");
        cHelp.setontouchend(function() {
            window.open("./help/renjuhelp/renjuhelp.html","_self");
        });
        
        
        
        t = t + h * 1.5;

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
        if (dw > dh) s.left = width/13 + "px";

        let sw = parseInt(s.width);
        let w = sw / 5;
        let h = sw / 9 / 1.5;
        let t = 0;

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
                msg("小棋盘,长按 H8(天元) 定位到15路棋盘");
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
        cAddblack2.setText("\b●\b棋");
        cAddblack2.setontouchend(function() {
            nSetChecked(cAddblack2);
        });

        cAddwhite2 = new button(imgCmdDiv, "radio", w * 1.33, t, w, h);
        cAddwhite2.show();
        cAddwhite2.setText("\b○\b棋");
        cAddwhite2.setontouchend(function() {
            nSetChecked(cAddwhite2);
        });


        cSLTY = new button(imgCmdDiv, "select", w * 2.66, t, w, h);
        for (let i = 15; i >= 5; i--) {
            cSLTY.addOption(i, i);
        }
        cSLTY.show();
        cSLTY.setText(cSLTY.input.value + "\b行");
        cSLTY.setonchange(function(but) {
            but.setText(but.input.value + "\b行");
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
        for (let i = 15; i >= 5; i--) {
            cSLTX.addOption(i, i);
        }
        cSLTX.show();
        cSLTX.setText(cSLTX.input.value + "\b列");
        cSLTX.setonchange(function(but) {
            but.setText(but.input.value + "\b列");
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

        let isShow = cShownum.checked ? true : false;
        let idx;
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
                    case 0:
                        // 搜索棋盘上最大的字母;
                        code = "A".charCodeAt(); // 65→90
                        for (idx = 0; idx < cBd.SLTX * cBd.SLTY; idx++) {
                            if (cBd.P[idx].type == tLb && cBd.P[idx].text.length == 1) {
                                let tcode = cBd.P[idx].text.charCodeAt(0);
                                if (tcode >= code && tcode <= 90) {
                                    code = tcode < 90 ? tcode + 1 : tcode;
                                }
                            }
                        }
                        txt = String.fromCharCode(code);
                        return { type: tLb, cmd: txt, showNum: isShow };

                    case 1:

                        // 搜索棋盘上最大的字母;
                        code = "a".charCodeAt(); // 65→90
                        for (idx = 0; idx < cBd.SLTX * cBd.SLTY; idx++) {
                            if (cBd.P[idx].type == tLb && cBd.P[idx].text.length == 1) {
                                tcode = cBd.P[idx].text.charCodeAt(0);
                                if (tcode >= code && tcode <= 122) {
                                    code = tcode < 122 ? tcode + 1 : tcode;
                                }
                            }
                        }
                        txt = String.fromCharCode(code);
                        return { type: tLb, cmd: txt, showNum: isShow };

                    case 2:
                        // 搜索棋盘上最大的数字
                        code = 1 // 1-225;
                        for (idx = 0; idx < cBd.SLTX * cBd.SLTY; idx++) {
                            if (cBd.P[idx].type == tLb) {
                                tcode = cBd.P[idx].text * 1;
                                if (tcode >= code && tcode <= 225) {
                                    code = tcode < 225 ? tcode + 1 : tcode;
                                }
                            }
                        }
                        txt = code;
                        return { type: tLb, cmd: txt, showNum: isShow };
                    case 3:
                        return { type: tLb, cmd: "☆", showNum: isShow };
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

        if (sharing) return;
        let idx = cBd.getPIndex(x, y);

        if (idx > -1) {
            let cmds = getRenjuCmd();
            if (cBd.oldCode) cmds.type = tNum;
            switch (cmds.type) {
                case tNum:
                    cancelKeepTouck();
                    if (cBd.P[idx].type == tNum) {
                        //点击棋子，触发悔棋
                        cBd.cleNb(idx, cmds.showNum);
                    }
                    else if (cBd.P[idx].type == tEmpty || (cBd.oldCode && cBd.P[idx].type == tLb)) {
                        // 添加棋子  wNb(idx,color,showNum)
                        let arr = cBd.getPointArray([]);
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
                    if (cBd.P[idx].type == tLb) {
                        // 点击标记，删除标记
                        cBd.cleLb(idx);
                    }
                    else if (cBd.P[idx].type == tEmpty) {
                        // 添加标记 wLb(idx,text,color, showNum:isShow) 
                        cBd.wLb(idx, cmds.cmd, getRenjuLbColor());
                    }
                    break;
            }

        }

    }


    function renjuDblClick(x, y) {

        if (sharing) return;
        let idx = cBd.getPIndex(x, y);
        if (idx > -1) {
            // 触发快速悔棋
            if (cBd.P[idx].type == tNum) {
                if (idx != cBd.MS[cBd.MSindex]) {
                    for (let i = cBd.MSindex + 1; i > parseInt(cBd.P[idx].text); i--) {
                        cBd.cleNb(idx, cShownum.checked);
                    }
                }
                else { // 
                    if (!cancelKeepTouck()) renjuKeepTouch(x, y);
                }
            } // 触发，手动输入标记
            else if ((cBd.P[idx].type == tLb || cBd.P[idx].type == tEmpty) && !cAutoadd.checked && !cAddblack.checked && !cAddwhite.checked) {
                inputLabel(idx);
            }

        }
    }


    function renjuKeepTouch(x, y) {

        if (sharing) return;
        let idx = cBd.getPIndex(x, y);
        if (idx < 0) return;
        let w = cBd.width * 0.8;
        let h;
        let l = (dw - w) / 2;
        let t = dh / 7;

        switch (cBd.P[idx].type) {
            case tNum:
                if (idx == cBd.MS[cBd.MSindex]) {
                    let str = cBd.notShowLastNum ? "确认恢复 最后一手红色显示。" : "确认取消 最后一手红色显示。";
                    msg(str, null, null, null, null, null, null, null, function() {

                        if (cBd.setNotShowLastNum(idx)) {
                            if (cShownum.checked) {
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


    function renjucShownumClick() {

        if (cShownum.checked) {
            cBd.showNum();
        }
        else {
            cBd.hideNum();
        }
    }


    // 创建一个window
    let sharing = false;

    let shareWindow = document.createElement("div");
    shareWindow.ontouch = function() { event.preventDefault(); };

    let imgWindow = document.createElement("div");
    imgWindow.ontouch = function() { event.preventDefault(); };
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

        sharing = true;
        document.body.appendChild(shareWindow);
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

        let iWidth = parseInt(imgWidth * 3 / 5);
        shareImg.src = cBd.canvas.toDataURL();
        s = shareImg.style;
        s.position = "absolute";
        s.width = iWidth + "px";
        s.height = iWidth + "px";
        s.top = parseInt((imgWidth - iWidth) / 2) + "px";
        s.left = parseInt((imgWidth - iWidth) / 2) + "px";

        if (cBoardColor == "white") {
            let mimetype = "image/svg+xml";
            let blob = new Blob([cBd.getSVG()], { type: mimetype });
            bkShareImg.width = 1000;
            bkShareImg.height = 1000;
            s = bkShareImg.style;
            s.width = 1000 + "px";
            s.height = 1000 + "px";
            //bkShareImg.src = "./help/renjuhelp/499accad-b0e5-46c4-a199-af7c826d45df.002.jpeg"; //URL.createObjectURL(blob);
            bkShareImg.src = URL.createObjectURL(blob);
            bkShareImg.onload = function() {
                let ctx = bkCanvas.getContext("2d");
                bkCanvas.width = 1000;
                bkCanvas.height = 1000;
                s = bkCanvas.style;
                s.position = "absolute";
                s.width = 1000 + "px";
                s.height = 1000 + "px";
                s.top = "1000px";
                s.left = "0px";
                ctx.drawImage(bkShareImg, 0, 0, 1000, 1000);
                shareImg.src = bkCanvas.toDataURL();
            }
        }
        else {
            shareImg.src = cBd.canvas.toDataURL();
        }

        let h = parseInt((imgWidth - iWidth) / 2 / 2);
        let w = h * 3;
        let l = (imgWidth - w) / 2;
        let t = imgWidth - h - (imgWidth - iWidth) / 8;

        shareLabel.innerHTML = `<h1 style = "font-size: ${h*0.45}px;text-align: center;color:white">长按图片分享</h1>`;
        s = shareLabel.style;
        s.position = "absolute";
        s.width = w + "px";
        s.height = h + "px";
        s.top = (imgWidth - iWidth) / 8 + "px";
        s.left = l + "px";
        s.backgroundColor = "#666666";

        butShareCancel.show(l, t, w, h);
        butShareCancel.setText("关闭分享");
        butShareCancel.setontouchend(function() {
            shareClose();
        });

    }

    function shareClose() {

        shareWindow.parentNode.removeChild(shareWindow);
        sharing = false;

    }

    return {
        "getPlayModel": () => { return playModel },
        "renjuModel": renjuModel,
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
    };
})();