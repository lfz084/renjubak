self.SCRIPT_VERSION["control"] = "v0819.0";
window.control = (() => {
    "use strict";
    const TEST_CONTROL = true;

    function log(param) {
        if (TEST_CONTROL && DEBUG)
            console.log(`[control.js]\n>> ` + param);
    }

    const MAX_THREAD_NUM = 0 || window.navigator.hardwareConcurrency - 2 || 4;
    setTimeout(function() {
        //alert(MAX_THREAD_NUM);
    }, 3000);
    const MODEL_RENJU = 0;
    const MODEL_LOADIMG = 1;
    const MODEL_LINE_EDIT = 2;
    const MODEL_ARROW_EDIT = 3;
    const MODEL_UNPACK_TREE = 4;
    const MODEL_UNPACK_THREEPOINT = 5;
    const MODEL_UNPACK_FOULPOINT = 6;
    let cBd;
    let engine;
    let msg;
    let closeMsg;
    let appData;
    let dw;
    let dh;

    let playModel = MODEL_RENJU;
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
    let exWindow;
    let isCancelMenuClick = false; //iOS 长按弹出棋盘菜单后会触发click事件。
    const setTop = (() => {
        let topMark = document.createElement("div");
        document.body.appendChild(topMark);
        topMark.setAttribute("id", "top");
        return (top) => {
            let s = topMark.style;
            s.position = "absolute";
            s.top = top + "px";
            s.zIndex = -100;
        }
    })();
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
            playModel = MODEL_RENJU;
            cBd.drawLineEnd();
        }
    }


    function newGame() {
        let h1 = parseInt(cBd.width);
        let h2 = parseInt(cBd.canvas.height);
        cBd.cle();
        cBd.printCheckerBoard();
        cBd.resetNum = 0;
        cBd.firstColor = "black";
        cBd.hideCutDiv();
        cBd.drawLineEnd();
        playModel = MODEL_RENJU;
        cSelChecked(cSelBlack);
        nSetChecked(cAutoadd);
        parentNode.style.top = h1 + parentNode.offsetTop - h2 + "px";
        parentNode.appendChild(renjuCmddiv);
        if (imgCmdDiv.parentNode) imgCmdDiv.parentNode.removeChild(imgCmdDiv);
        viewport1.resize();
        engine.postMsg("cancelFind");
    }


    let putCheckerBoard = putBoard;

    function putBoard(idx) {
        if (idx < 0) return;
        let arr = cBd.getPointArray([]);
        newGame();
        cBd.unpackArray(changeCoordinate(arr, idx));
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
        cMenu.addOption(1, `${EMOJI_SEARCH} 找点`);
        cMenu.addOption(2, `${EMOJI_QUESTION} 解题`);
        cMenu.addOption(3, "新棋局");
        cMenu.addOption(4, "添加标记");
        cMenu.addOption(5, "清空标记");
        cMenu.addOption(6, "分享图片");
        cMenu.addOption(7, "分享原图");
        cMenu.addOption(8, `下手为${EMOJI_ROUND_ONE}`);
        cMenu.addOption(9, "重置手数");
        cMenu.addOption(10, "显示手数");
        cMenu.addOption(11, "隐藏手数");
        cMenu.addOption(12, "输入代码");
        cMenu.addOption(13, "输出代码");
        cMenu.addOption(14, "输入图片");
        cMenu.addOption(15, `${EMOJI_SCISSORSN} 截图`);
        cMenu.addOption(16, `🔄 刷新页面`);

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
                    cNewGame.touchend();
                    break;
                case 4:
                    if (cBd.P[idx].type == TYPE_MARK || cBd.P[idx].type == TYPE_MOVE || cBd.P[idx].type == TYPE_EMPTY) {
                        inputLabel(idx);
                    }
                    break;
                case 5:
                    cCleLb.touchend();
                    break;
                case 6:
                    cShareWhite.touchend();
                    break;
                case 7:
                    cShare.touchend();
                    break;
                case 8:
                    cNextone.touchend();
                    break;
                case 9:
                    cResetnum.touchend();
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
                    cInputcode.touchend();
                    break;
                case 13:
                    cOutputcode.touchend();
                    break;
                case 14:
                    cLoadImg.input.click();
                    break;
                case 15:
                    cCutImage.showMenu(x, y);
                    break;
                case 16:
                    window.location.reload();
                    break;



            }
        });
        let p = { x: 0, y: 0 };
        cBd.xyObjToPage(p, cBd.canvas);
        left = p.x + (parseInt(cBd.canvas.style.width) - width) / 2;
        cMenu.createMenu(left,
            undefined,
            width,
            undefined,
            fontSize,
            true,
            () => {
                log(`isCancelMenuClick=${isCancelMenuClick}`);
                let rt = isCancelMenuClick;
                setTimeout(() => {
                    isCancelMenuClick = false;
                }, 100);
                return rt;
            });
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
        cShownum.setText(EMOJI_ROUND_ONE);
        //setShowNum(1);
        cShownum.createMenu(menuLeft, undefined, menuWidth, undefined, menuFontSize);
        cShownum.menu.lis[0].checked = true;
        cShownum.menu.lis[0].innerHTML = cShownum.input[0].text + "  ✔";
        cShownum.setonchange(function() {
            cShownum.setText(EMOJI_ROUND_ONE);
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
            cBd.autoShow();

            function setLis(idx, checked) {
                cShownum.menu.lis[idx].checked = checked;
                if (cShownum.menu.lis[idx].checked) {
                    cShownum.menu.lis[idx].innerHTML = cShownum.input[idx].text + "  ✔";
                }
                else {
                    cShownum.menu.lis[idx].innerHTML = cShownum.input[idx].text;
                }
            }

            //cShownum.setText(getShowNum()?EMOJI_ROUND_ONE :EMOJI_ROUND_BLACK);
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
            newGame();
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

        const CALCULATE = 1;
        let tMsg = [["3月21日，五子茶馆解题大赛"], ["比赛结束前，暂时关闭计算功能"]];

        cFindPoint = new button(renjuCmddiv, "select", w * 2.66, t, w, h);
        if (CALCULATE) {
            //cFindPoint.addOption(0, "︾" );
            cFindPoint.addOption(1, "VCT选点");
            cFindPoint.addOption(2, "做V点");
            cFindPoint.addOption(3, "做43杀(白单冲4杀)");
            cFindPoint.addOption(4, "活三级别");
            cFindPoint.addOption(5, "活三");
            cFindPoint.addOption(6, `${EMOJI_FOUL} 三三`);
            cFindPoint.addOption(7, `${EMOJI_FOUL} 四四`);
            cFindPoint.addOption(8, `${EMOJI_FOUL} 长连`);
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

        cFindPoint.createMenu(menuLeft, undefined, menuWidth, undefined, menuFontSize);
        cFindPoint.show();
        cFindPoint.setText("找点");
        cFindPoint.setonchange(function(but) {
            but.setText("找点");
            if (busy()) return;
            if (but.input.value < 1 || !CALCULATE) {
                but.input.value = 0;
                return;
            }
            viewport1.resize();
            let arr = [];
            cBd.getPointArray(arr);
            let newarr = getArr([]);
            switch (but.input.value * 1) {
                case 1:
                    engine.postMsg("vctSelectPoint", {
                        color: getRenjuSelColor(),
                        arr: arr,
                        newarr: newarr
                    });
                    break;
                case 2:
                    engine.postMsg("isLevelThreePoint", {
                        color: getRenjuSelColor(),
                        arr: arr,
                        newarr: newarr,
                        ftype: ONLY_VCF
                    });
                    break;

                case 3:
                    engine.postMsg("isLevelThreePoint", {
                        color: getRenjuSelColor(),
                        arr: arr,
                        newarr: newarr,
                        ftype: ONLY_SIMPLE_WIN
                    });
                    break;

                case 4:
                    engine.postMsg("isLevelThreePoint", {
                        color: getRenjuSelColor(),
                        arr: arr,
                        newarr: newarr,
                        ftype: undefined
                    });
                    break;

                case 5:
                    engine.postMsg("findThreePoint", {
                        arr: arr,
                        color: getRenjuSelColor(),
                        newarr: newarr,
                        ftype: ONLY_FREE
                    });
                    break;

                case 6:
                    engine.postMsg("findTTPoint", {
                        arr: arr,
                        color: 1,
                        newarr: newarr
                    });
                    break;

                case 7:
                    engine.postMsg("findFFPoint", {
                        arr: arr,
                        color: 1,
                        newarr: newarr
                    });
                    break;

                case 8:
                    engine.postMsg("findSixPoint", {
                        arr: arr,
                        color: 1,
                        newarr: newarr
                    });
                    break;

                case 9:
                    engine.postMsg("findFivePoint", {
                        arr: arr,
                        color: getRenjuSelColor(),
                        newarr: newarr
                    });
                    break;
                case 10:
                    engine.postMsg("findFourPoint", {
                        arr: arr,
                        color: getRenjuSelColor(),
                        newarr: newarr,
                        ftype: ONLY_FREE
                    });
                    break;
                case 11:
                    engine.postMsg("findFourPoint", {
                        arr: arr,
                        color: getRenjuSelColor(),
                        newarr: newarr,
                        ftype: ONLY_NOFREE
                    });
                    break;
                case 12:
                    engine.postMsg("findThreePoint", {
                        arr: arr,
                        color: getRenjuSelColor(),
                        newarr: newarr,
                        ftype: ONLY_NOFREE
                    });
                    break;
            }

            but.input.value = 0;
        });


        //cFindPoint.setontouchend(function() {});


        cFindVCF = new button(renjuCmddiv, "select", w * 3.99, t, w, h);
        if (CALCULATE) {
            //cFindVCF.addOption(0, "︾");
            cFindVCF.addOption(1, "快速找  VCF");
            cFindVCF.addOption(2, "找全   VCF");
            cFindVCF.addOption(3, "找  双杀");
            cFindVCF.addOption(4, "大道五目");
            cFindVCF.addOption(5, "三手五连");
            cFindVCF.addOption(6, "四手五连");
            cFindVCF.addOption(7, "禁手线路分析");
            cFindVCF.addOption(8, "防 冲四抓禁");
            //cFindVCF.addOption(9, "找  VCF防点");
            cFindVCF.addOption(10, "找  VCF防点(深度+1)");
            cFindVCF.addOption(11, "找  VCF防点(深度+∞)");
            cFindVCF.addOption(12, "坂田三手胜(测试)");
            cFindVCF.addOption(13, "VCT(测试）");
            //cFindVCF.addOption(12, "︽");
            //cFindVCF.addOption(12, "test two");
        }
        else {
            for (let i = 0; i < tMsg.length; i++) {
                cFindVCF.addOption(i, tMsg[i]);
            }
        }
        cFindVCF.createMenu(menuLeft, undefined, menuWidth, undefined, menuFontSize);
        cFindVCF.show();
        cFindVCF.setText("解题");
        cFindVCF.setonchange(function(but) {
            but.setText("解题");
            if (busy()) return;
            if (but.input.value < 1 || !CALCULATE) {
                but.input.value = 0;
                return;
            }
            viewport1.resize();
            let arr = [];
            cBd.getPointArray(arr);
            switch (but.input.value * 1) {
                case 1:
                    engine.postMsg("findVCF", {
                        arr: arr,
                        color: getRenjuSelColor(),
                        count: 1,
                        depth: undefined,
                        timeout: undefined,
                        backstage: false
                    });
                    break;
                case 2:
                    engine.postMsg("findVCF", {
                        arr: arr,
                        color: getRenjuSelColor(),
                        count: 225,
                        depth: undefined,
                        timeout: undefined,
                        backstage: false
                    });
                    break;
                case 3:
                    engine.postMsg("isTwoVCF", {
                        color: getRenjuSelColor(),
                        arr: arr,
                        newarr: getArr([])
                    });
                    break;
                case 4:
                    engine.postMsg("isSimpleWin", {
                        color: getRenjuSelColor(),
                        arr: arr,
                        newarr: getArr([]),
                        num: 4,
                        level: 3
                    });
                    break;
                case 5:
                    engine.postMsg("isThreeWinPoint", {
                        color: getRenjuSelColor(),
                        arr: arr,
                        newarr: getArr([])
                    });
                    break;
                case 6:
                    engine.postMsg("isFourWinPoint", {
                        color: getRenjuSelColor(),
                        arr: arr,
                        newarr: getArr([])
                    });
                    break;
                case 7:
                    engine.postMsg("findFoulNode", {
                        arr: arr,
                    });
                    break;
                case 9:
                    engine.postMsg("getBlockVCF", {
                        color: getRenjuSelColor(),
                        arr: arr
                    });
                    break;
                case 10:
                    engine.postMsg("getBlockVCFb", {
                        color: getRenjuSelColor(),
                        arr: arr
                    });
                    break;
                case 11:
                    engine.postMsg("getBlockVCFTree", {
                        color: getRenjuSelColor(),
                        arr: arr
                    });
                    break;
                case 8:
                    engine.postMsg("blockCatchFoul", {
                        arr: arr
                    });
                    break;
                case 12:
                    engine.postMsg("findVCT", {
                        arr: arr,
                        color: getRenjuSelColor(),
                        node: undefined,
                        count: 1,
                        depth: 2,
                        backstage: undefined
                    });
                    break;
                case 13:
                    engine.postMsg("findVCT", {
                        arr: arr,
                        color: getRenjuSelColor(),
                        node: undefined,
                        count: 1,
                        depth: 5,
                        backstage: undefined
                    });
                    break;
                case 112:
                    const DIRECTIONS = ["x", "y", "d", "u"];
                    for (let i = 0; i < 4; i++) {
                        let two = isLineTwo(7, 7, DIRECTIONS[i], getRenjuSelColor(), arr, false);
                        alert(two);
                    }
                    break;
            }
            but.input.value = 0;

        });
        cFindVCF.setontouchend(function() {});


        cCancelFind = new button(renjuCmddiv, "button", w * 3.99, t, w, h);
        //cCancelFind.show();
        cCancelFind.setText(`${EMOJI_STOP} 停止`);
        //cCancelFind.setColor("red");
        cCancelFind.setontouchend(function(but) {
            engine.postMsg("cancelFind");
        });



        t = t + h * 1.5;

        cAutoadd = new button(renjuCmddiv, "radio", 0, t, w, h);
        cAutoadd.show();
        cAutoadd.setText(` ${EMOJI_ROUND_BLACK_WHITE} 棋`);
        cAutoadd.setChecked(1);
        cAutoadd.setontouchend(function() {
            //if (busy()) return;
            nSetChecked(cAutoadd);
        });

        cAddblack = new button(renjuCmddiv, "radio", w * 1.33, t, w, h);
        cAddblack.show();
        cAddblack.setText(` ${EMOJI_ROUND_BLACK} 棋`);
        cAddblack.setontouchend(function() {
            //if (busy()) return;
            nSetChecked(cAddblack);
        });

        cAddwhite = new button(renjuCmddiv, "radio", w * 2.66, t, w, h);
        cAddwhite.show();
        cAddwhite.setText(` ${EMOJI_ROUND} 棋`);
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
        cPrintVCF.createMenu(menuLeft, undefined, menuWidth, undefined, menuFontSize);
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
                        showLabel(str);
                    }
                }
                else {
                    let str = `请先 找全 ${color==1?"黑棋":"白棋"} VCF`;
                    showLabel(str);
                }
                but.input.value = 0;
            }
        });




        t = t + h * 1.5;


        cLba = new button(renjuCmddiv, "radio", w * 0, t, w, h);
        cLba.show();
        cLba.setText(` ${EMOJI_SQUARE_BLACK} `);
        cLba.setontouchend(function() {
            //if (busy()) return;
            nSetChecked(cLba);
        });

        cLbb = new button(renjuCmddiv, "radio", w * 1.33, t, w, h);
        cLbb.show();
        cLbb.setText(` ${EMOJI_ROUND_DOUBLE} `);
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
        cLABC.addOption(6, `${EMOJI_STAR} 标记`);
        cLABC.addOption(7, `${EMOJI_FOUL} 标记`);

        cLABC.createMenu(menuLeft, undefined, menuWidth, undefined, menuFontSize);
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
                msg(`${lbStr}......\n\n\n,-------------\n类似(ABC...),(abc...),(123...)\n可在上面编辑 连续输入的 标记。每个标记 用英文 [,] 逗号隔开，每个标记最多3个字符`, "input", l, t, w, h, "输入代码", undefined,
                    newContinueLabel, undefined, undefined, 10);
            }
        });

        let hm = cLABC.hideMenu;
        cLABC.hideMenu = function(ms, callback) {
            hm.call(this, ms, callback);
            //log(this.input.value)
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
                playModel = MODEL_ARROW_EDIT;
                //log("MODEL_ARROW_EDIT")
            }
            else if (cLABC.input.value == 1) {
                playModel = MODEL_LINE_EDIT;
                //log("MODEL_LINE_EDIT")
            }
            else {
                playModel = MODEL_RENJU;
                cBd.drawLineEnd();
                //log("MODEL_RENJU")
            }
        };

        cNextone = new button(renjuCmddiv, "button", w * 3.99, t, w, h);

        cNextone.show();
        cNextone.setColor("black");
        cNextone.setText(`下手为${EMOJI_ROUND_ONE}`);
        cNextone.setontouchend(function() {
            if (busy()) return;
            cBd.setResetNum(cBd.MSindex + 1);
            cBd.isShowNum = getShowNum();
        });



        t = t + h * 1.5;


        cLbc = new button(renjuCmddiv, "radio", w * 0, t, w, h);
        cLbc.show();
        cLbc.setText(` ${EMOJI_TRIANGLE_BLACK} `);
        cLbc.setontouchend(function() {
            //if (busy()) return;
            nSetChecked(cLbc);
        });


        cLbd = new button(renjuCmddiv, "radio", w * 1.33, t, w, h);
        cLbd.show();
        cLbd.setText(` ${EMOJI_FORK} `);
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
        cLbColor.createMenu(menuLeft, undefined, menuWidth, undefined, menuFontSize);
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
            //log(`s.height= ${s.height}, s.width=${s.width}, left=${s.left}, top=${s.top}`)
            //log(cLbColor.menu.lis["down"])
            s.backgroundColor = lbColor[i].color;
        }
        cLbColor.show();
        cLbColor.setText(`${EMOJI_PEN} 颜色`);
        cLbColor.setonchange(function(but) {
            //if (busy()) return;
            but.setColor(lbColor[but.input.value].color);
            but.setText(`${EMOJI_PEN} 颜色`);
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

                if (vConsole == null) {
                    vConsole = new VConsole();
                    appData.setKey("debug", true);
                }
                return;
            }
            else if (msgStr.indexOf("close") > -1) {

                if (vConsole) {
                    vConsole.destroy();
                    appData.setKey("debug", false);
                }
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
            msg("长按下面空白区域，粘贴棋谱代码 " + "\n" + "-------------" + "\n\n", "input", l, t, w, h, "输入代码", undefined,
                inputCode, undefined, undefined, 10);
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
            msg(code + "\n\n\n" + "-------------" + "\n" + "长按上面代码，复制棋谱代码 ", "input", l, t, w, h, "输入代码", undefined,
                inputCode, undefined, undefined, 10);
        });

        cLoadImg = new button(renjuCmddiv, "file", w * 2.66, t, w, h);
        cLoadImg.show();
        cLoadImg.input.accept = "image/*";
        cLoadImg.setText("输入图片");
        cLoadImg.setonchange(function() {
            if (busy()) return;
            cBd.drawLineEnd();
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
            playModel = MODEL_LOADIMG;
            cLockImg.setChecked(0);
            cAddblack2.setChecked(1);
            cAddwhite2.setChecked(0);
            cSLTX.input.value = cBd.SLTX;
            cSLTX.setText(cSLTX.input.value + " 列");
            cSLTY.input.value = cBd.SLTY;
            cSLTY.setText(cSLTY.input.value + " 行");
            ctx = null;
            viewport1.userScalable();
            showLabel(`长按棋盘，拖动虚线对齐棋子`);
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
        cCutImage.createMenu(menuLeft, undefined, menuWidth, undefined, menuFontSize);
        cCutImage.show();
        cCutImage.setText(`${EMOJI_SCISSORSN} 截图`);
        cCutImage.setonchange(function(but) {
            but.setText(`${EMOJI_SCISSORSN} 截图`);
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
            setTop(parentNode.offsetTop + t)
        }
        else {
            setTop(0);
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
            window.open("./help/renjuhelp/renjuhelp.html", "helpWindow");
        });



        t = t + h * 1.5;

        exWindow = (() => {

            const EX_WINDOW = document.createElement("div");

            const IFRAME = document.createElement("div");
            IFRAME.setAttribute("id", "exWindow");
            EX_WINDOW.appendChild(IFRAME);

            const CLOSE_BUTTON = document.createElement("img");
            CLOSE_BUTTON.src = "./pic/close.svg";
            //CLOSE_BUTTON.setAttribute("class", "button");
            CLOSE_BUTTON.oncontextmenu = (event) => {
                event.preventDefault();
            }
            setButtonClick(CLOSE_BUTTON, closeWindow);
            EX_WINDOW.appendChild(CLOSE_BUTTON);

            let p = { x: 0, y: 0 };
            cBd.xyObjToPage(p, renjuCmddiv);

            const FONT_SIZE = sw / 28 + "px";
            const EX_WINDOW_LEFT = parseInt(cFlipY.left) + p.x + "px";
            const EX_WINDOW_TOP = parseInt(cFlipY.top) + p.y + "px";
            const EX_WINDOW_WIDTH = w * 5 - parseInt(FONT_SIZE) * 2 + "px";
            const EX_WINDOW_HEIGHT = h * 1.5 * 7 + h + "px";

            function resetStyle() {

                let s = EX_WINDOW.style;
                s.position = "absolute";
                s.left = EX_WINDOW_LEFT;
                s.top = EX_WINDOW_TOP;
                s.width = EX_WINDOW_WIDTH;
                s.height = EX_WINDOW_HEIGHT;
                s.zIndex = 9999;

                s = IFRAME.style;
                s.position = "absolute";
                s.left = 0;
                s.top = 0;
                s.width = EX_WINDOW_WIDTH;
                s.height = EX_WINDOW_HEIGHT;
                s.fontSize = FONT_SIZE;
                s.borderStyle = "solid";
                s.borderWidth = `${sw/260}px`;
                s.borderColor = "black";
                s.background = "white";
                s.fontWeight = "normal";
                s.padding = `${0} ${FONT_SIZE} ${0} ${FONT_SIZE}`;

                s = CLOSE_BUTTON.style;
                let sz = parseInt(EX_WINDOW_WIDTH) / 10 + "px";
                s.position = "absolute";
                s.left = (parseInt(EX_WINDOW_WIDTH) - parseInt(sz)) / 2 + "px";
                s.top = "0px";
                s.width = sz;
                s.height = sz;
                s.opacity = "0.5";
                s.backgroundColor = "#c0c0c0";
            }

            function openWindow() {
                if (EX_WINDOW.parentNode) return;
                resetStyle();
                document.body.appendChild(EX_WINDOW); //插入body内，保证a标签可以工作。因为renjuCmddiv.parentNode屏蔽了浏览器触摸click
            }

            function closeWindow() {
                IFRAME.innerHTML = undefined;
                if (EX_WINDOW.parentNode) EX_WINDOW.parentNode.removeChild(EX_WINDOW);
            }

            function setHTML(iHtml) {
                IFRAME.innerHTML = iHtml;
            }
            return {
                "innerHTML": setHTML,
                "openWindow": openWindow,
                "close": closeWindow
            }
        })();
        createContextMenu(undefined, undefined, menuWidth, undefined, menuFontSize);



        setTimeout(function() {

            engine.reset({
                "maxThread": MAX_THREAD_NUM,
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
                showLabel("上次意外退出,继续计算...");
                engine.postMsg(continueData.cmd, continueData);
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
            viewport1.userScalable();
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
                    viewport1.resize();
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
                showLabel("小棋盘,长按屏幕(鼠标右键点击)定位H8");
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
        cAddblack2.setText(` ${EMOJI_ROUND_BLACK} 棋`);
        cAddblack2.setontouchend(function() {
            nSetChecked(cAddblack2);
        });

        cAddwhite2 = new button(imgCmdDiv, "radio", w * 1.33, t, w, h);
        cAddwhite2.show();
        cAddwhite2.setText(` ${EMOJI_ROUND} 棋`);
        cAddwhite2.setontouchend(function() {
            nSetChecked(cAddwhite2);
        });


        cSLTY = new button(imgCmdDiv, "select", w * 2.66, t, w, h);
        //cSLTY.addOption(16, "︾");
        for (let i = 15; i >= 5; i--) {
            cSLTY.addOption(i, i);
        }
        //cSLTY.addOption(4, "︽");
        cSLTY.createMenu(menuLeft, undefined, menuWidth, undefined, menuFontSize);
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
        cSLTX.createMenu(menuLeft, undefined, menuWidth, undefined, menuFontSize);
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

    let setCheckerBoardEvent = (() => {

        //用来保存跟踪正在发送的触摸事件
        let canvasStartTouches = [];
        let bodyStartTouches = [];
        let previousTouch = []; // 辅助判断双击
        let bodyPreviousTouch = [];
        let bodyMoveTouches = [];
        let continueSetCutDivX = 0;
        let continueSetCutDivY = 0;
        let isBodyClick = false; // 辅助判断单击
        let timerCanvasKeepTouch = null;
        let timerBodyKeepTouch = null;
        let timerContinueSetCutDiv = null;
        let exitContinueSetCutDivMove = null;

        //处理触摸开始事件
        function bodyTouchStart(evt) {
        
            let touches = evt.changedTouches; //记录坐标，给continueSetCutDiv使用
            continueSetCutDivX = touches[0].pageX;
            continueSetCutDivY = touches[0].pageY;
            if (bodyStartTouches.length == 0) {
                if (bodyPreviousTouch.length) { //触发滑动调整
                    //evt.preventDefault();
                    if (timerContinueSetCutDiv == null) {
                        timerContinueSetCutDiv = setTimeout(continueSetCutDivStart, 0);
                        // 触发长按事件之前删除定时器，变量timerBodyKeepTouch还要用来判断双击事件，由touchend 清空变量。
                        setTimeout(function() { clearTimeout(timerBodyKeepTouch) }, 600);
                    }
                }
                //初始化长按事件
                isCancelMenuClick = false;
                if (!timerBodyKeepTouch) {
                    timerBodyKeepTouch = setTimeout(bodyKeepTouch, 500);
                }
                //保存当前触摸点
                bodyStartTouches.push(copyTouch(touches[0], 1));
                //初始化单击事件
                isBodyClick = true;
            }
            else
            {
                // 多点触摸取消长按事件
                if (timerBodyKeepTouch) {
                    clearTimeout(timerBodyKeepTouch);
                    timerBodyKeepTouch = null;
                }
                let touchNum = bodyStartTouches.length + 1; //判断是第几个手指触摸屏幕
                if (touchNum > 3) return; //超过3指忽略
                // 多点触摸 取消单击事件。
                isBodyClick = false;
                bodyStartTouches.push(copyTouch(touches[0], touchNum));
            }
        }

        //处理触摸移动事件
        function bodyTouchMove(evt) {
            //evt.preventDefault();
            if (timerContinueSetCutDiv) evt.preventDefault();
            let touches = evt.changedTouches;
            if (timerBodyKeepTouch != null) { //取消长按事件
                clearTimeout(timerBodyKeepTouch);
                timerBodyKeepTouch = null;
            }
            //记录坐标，给continueSetCutDiv使用
            continueSetCutDivX = touches[0].pageX;
            continueSetCutDivY = touches[0].pageY;
            if ((bodyPreviousTouch.length && Math.abs(bodyPreviousTouch[0].pageX - touches[0].pageX) > 30) && (Math.abs(bodyPreviousTouch[0].pageY - touches[0].pageY) > 30)) {
                isBodyClick = false; // 取消单击事件。
            }
        }

        //处理触摸结束事件
        function bodyTouchEnd(evt) {

            setTimeout(() => { isCancelMenuClick = false }, 250);
            let cancelClick = false;
            let touches = evt.changedTouches;
            let idx = onTouchesIndex(touches[0].identifier, bodyStartTouches);
            clearTimeout(timerContinueSetCutDiv); // 取消  ContinueSetCutDiv 事件
            if (timerContinueSetCutDiv) {
                timerContinueSetCutDiv = null;
                setTimeout(continueSetCutDivEnd, 10);
            }
            if (timerBodyKeepTouch) { //取消长按事件
                clearTimeout(timerBodyKeepTouch);
                timerBodyKeepTouch = null;
            }
            else { // 触发了长按事件，取消单击
                cancelClick = true;
            }
            if (idx >= 0) {
                let sX = bodyStartTouches[idx].pageX;
                let sY = bodyStartTouches[idx].pageY;
                let tX = touches[0].pageX;
                let tY = touches[0].pageY;
                let xMove = tX - sX;
                let yMove = tY - sY;
                let touchNum = bodyStartTouches.length; //判断是第几个手指触摸屏幕

                if (touchNum > 3) { // 超过3指重置触摸跟踪
                    bodyStartTouches.length = 0; //remove it; we're done
                    return;
                }
                if ((!cancelClick) && isBodyClick) {
                    //log(`cancelClick=${cancelClick}, isBodyClick=${isBodyClick}, length=${bodyPreviousTouch.length } `);
                    if (true || !cBd.isOut(tX, tY, cBd.canvas))
                        evt.preventDefault(); // 屏蔽浏览器双击放大 && clickEvent
                    if ((bodyPreviousTouch.length > 0) &&
                        (Math.abs(bodyPreviousTouch[0].pageX - tX) < 30) &&
                        (Math.abs(bodyPreviousTouch[0].pageY - tY) < 30)
                    ) {
                        bodyPreviousTouch.length = 0;
                        /////////这里添加双击事件////////
                        //通过 isOut 模拟 canvas事件
                        if (!cBd.isOut(tX, tY, cBd.canvas)) {
                            setTimeout(canvasDblClick(tX, tY), 10);
                            //log("canvas 双击");
                        }
                        else {
                            //setTimeout(bodyDblClick(tX, tY), 10);
                            //log("Body 双击");
                        }
                    }
                    else {
                        bodyPreviousTouch[0] = copyTouch(touches[0], 1);
                        setTimeout(() => {
                            bodyPreviousTouch.length = 0;
                        }, 500);
                        /////////这里添加单击事件////////
                        //通过 isOut 模拟 canvas事件
                        if (!cBd.isOut(tX, tY, cBd.canvas)) {
                            canvasClick(tX, tY);
                            //log("canvas 单击");
                        }
                        else {
                            //bodyClick(tX, tY);
                            //log("Body 单击");
                        }
                    }
                }
                bodyStartTouches.splice(idx, 1); //remove it;we're done
            }
            else { // 出错重新初始化 触摸跟踪
                bodyStartTouches.length = 0;
            }
            bodyStartTouches.length = 0;
        }

        //处理触摸对出事件
        function bodyTouchCancel(evt) {
            //log(`touchCancel`)
            evt.preventDefault();
            let touches = evt.changedTouches;
            // 取消 continueSetCutDiv 事件
            clearInterval(timerContinueSetCutDiv);
            if (timerContinueSetCutDiv) {
                timerContinueSetCutDiv = null;
                setTimeout(continueSetCutDivEnd, 10);
            }
            if (timerBodyKeepTouch) { // 取消长按事件
                clearTimeout(timerBodyKeepTouch);
                timerBodyKeepTouch = null;
            }
            bodyStartTouches.length = 0;
        }

        function bodyClick(x, y) {
        
            let p = { x: 0, y: 0 };
            x = event.type == "click" ? event.pageX : x;
            y = event.type == "click" ? event.pageY : y;
            cBd.xyPageToObj(p, cBd.canvas);
            canvasClick(p.x, p.y);
        }

        function bodyDblClick(x, y) {

            let p = { x: 0, y: 0 };
            x = event.type == "click" ? event.pageX : x;
            y = event.type == "click" ? event.pageY : y;
            cBd.xyPageToObj(p, cBd.canvas);
            canvasDblClick(p.x, p.y);
        }

        let cancelContextmenu = false;

        function bodyKeepTouch() {

            if (cancelContextmenu) return;
            if (timerBodyKeepTouch) {
                clearTimeout(timerBodyKeepTouch); //防止与canvas重复重复
                timerBodyKeepTouch = null;
            }
            cancelContextmenu = true;
            setTimeout(() => {
                cancelContextmenu = false;
            }, 1000);
            //log(event)
            //log(`event.button=${event.button}, typeof(x)=${typeof(event)}, x=${event.pageX}`);
            let x = bodyStartTouches[0] ? bodyStartTouches[0].pageX : event.pageX;
            let y = bodyStartTouches[0] ? bodyStartTouches[0].pageY : event.pageY;
            //  针对 msg 弹窗 恢复下一次长按事件
            bodyStartTouches.length = 0;
            //通过 isOut 模拟 canvas事件
            if (!cBd.isOut(x, y, cBd.canvas)) {
                isCancelMenuClick = !!(navigator.userAgent.indexOf("iPhone") + 1); //!(event && "contextmenu" == event.type);
                setTimeout(canvasKeepTouch(x, y), 10);
                //log("canvad 长按");
            }
            else {
                //log("Body 长按");
            }
        }

        //拷贝一个触摸对象
        function copyTouch(touch, touchNum) {

            return { identifier: touch.identifier, pageX: touch.pageX, pageY: touch.pageY, touchNum: touchNum };
        }

        //找出正在进行的触摸
        function onTouchesIndex(idToFind, touches) {

            for (let i = 0; i < touches.length; i++) {
                let id = touches[i].identifier;
                if (id == idToFind) { return i; }
            }
            return -1; //notfound
        }

        function canvasKeepTouch(x, y) {

            if (playModel != MODEL_LOADIMG) {
                renjuKeepTouch(x, y);
            }
            else {
                if (cLockImg.checked) {
                    putCheckerBoard(cBd.getPIndex(x, y));
                }
                else {
                    if (!timerContinueSetCutDiv)
                        timerContinueSetCutDiv = setTimeout(continueSetCutDivStart, 10);
                }
            }

        }

        function canvasClick(x, y) {
            //log(`event.button=${event.button}, typeof(x)=${typeof(x)}, x=${x}, y=${y}`);
            x = event.type == "click" ? event.pageX : x;
            y = event.type == "click" ? event.pageY : y;
            //log(`get=${playModel },ren=${MODEL_RENJU}`)
            if (playModel != MODEL_LOADIMG) {
                renjuClick(x, y);
            }
            else if (!cLockImg.checked) {
                if (cBd.isOut(x, y, cBd.canvas)) return;
                let p = { x: x, y: y };
                cBd.setxy(p, event.type == "click" ? 2 : 1);
                cBd.setCutDiv(p.x, p.y, true);
                cBd.resetP();
                cBd.printBorder();
            }
            else {
                let idx = cBd.getPIndex(x, y);
                if (idx < 0) return;
                let color = cAddwhite2.checked ? "white" : "black";
                if (cBd.P[idx].type != TYPE_EMPTY) {
                    cBd.P[idx].cle();
                }
                else {
                    cBd.P[idx].printNb(EMOJI_STAR_BLACK, color, cBd.gW, cBd.gH, color == "white" ? cBd.wNumColor : cBd.bNumColor);
                }
            }
        }

        function canvasDblClick(x, y) {

            if (playModel != MODEL_LOADIMG) {
                if (event.type == "dblclick")
                    renjuDblClick(event.pageX, event.pageY);
                else
                    renjuDblClick(x, y);
            }
        }

        function continueSetCutDivStart() {

            if (playModel != MODEL_LOADIMG ||
                cLockImg.checked)
                return;
            //log("continueSetCutDivStart")
            cBd.cleAllPointBorder();
            exitContinueSetCutDivMove = false;
            continueSetCutDivMove();
        }

        function continueSetCutDivMove() {
            //log("continueSetCutDivMove ");
            let x = parseInt(continueSetCutDivX);
            let y = parseInt(continueSetCutDivY);
            let p = { x: x, y: y };
            if (!cBd.isOut(x, y, cBd.canvas, parseInt(cBd.width) / 17))
            {
                cBd.setxy(p, 0.02);
                cBd.setCutDiv(p.x, p.y, true);
            }
            //if (timerContinueSetCutDiv != null) timerContinueSetCutDiv = setTimeout(continueSetCutDivMove, 150);
            timerContinueSetCutDiv = requestAnimationFrame(continueSetCutDivMove);
            if (exitContinueSetCutDivMove) {
                cancelAnimationFrame(timerContinueSetCutDiv);
                timerContinueSetCutDiv = null;
            }
        }

        function continueSetCutDivEnd() {
            //log("continueSetCutDivEnd")
            if (playModel != MODEL_LOADIMG || cLockImg.checked) return;
            exitContinueSetCutDivMove = true;
            cBd.resetP();
            cBd.printBorder();
        }

        return (canvas, bodyDiv) => {
            bodyDiv.addEventListener("contextmenu", bodyKeepTouch, true);
            bodyDiv.addEventListener("touchstart", bodyTouchStart, true);
            bodyDiv.addEventListener("touchend", bodyTouchEnd, true);
            bodyDiv.addEventListener("touchcancel", bodyTouchCancel, true);
            bodyDiv.addEventListener("touchleave", bodyTouchCancel, true);
            bodyDiv.addEventListener("touchmove", bodyTouchMove, true);
            bodyDiv.addEventListener("click", bodyClick, true);
            bodyDiv.addEventListener("dblclick", bodyDblClick, true);
        };
    })();


    function createHelpWindow() {

        let busy = false;
        let dw = document.documentElement.clientWidth;
        let dh = document.documentElement.clientHeight;
        let padding = dw > dh ? dw : dh;
        let scale = cBd.width / 820;
        const FULL_DIV = document.createElement("div");
        document.body.appendChild(FULL_DIV);
        FULL_DIV.style.zIndex = -99999;
        FULL_DIV.style.display = "none";

        const WIN_DIV = document.createElement("div");
        FULL_DIV.appendChild(WIN_DIV);

        const IFRAME_DIV = document.createElement("div");
        IFRAME_DIV.setAttribute("id", "wrapper");
        WIN_DIV.appendChild(IFRAME_DIV);

        const IFRAME = document.createElement("iframe");
        IFRAME.setAttribute("id", "helpWindow");
        IFRAME.setAttribute("name", "helpWindow");
        IFRAME_DIV.appendChild(IFRAME);

        const BUT_DIV = document.createElement("div");
        WIN_DIV.appendChild(BUT_DIV);

        const ICO_BACK = document.createElement("img");
        BUT_DIV.appendChild(ICO_BACK);
        ICO_BACK.src = "./pic/chevron-left.svg";
        //ICO_BACK.setAttribute("class", "button");
        ICO_BACK.oncontextmenu = (event) => {
            event.preventDefault();
        };
        setButtonClick(ICO_BACK, () => {
            IFRAME.src = "./help/renjuhelp/renjuhelp.html";
        });

        const ICO_CLOSE = document.createElement("img");
        BUT_DIV.appendChild(ICO_CLOSE);
        ICO_CLOSE.src = "./pic/close.svg";
        //ICO_CLOSE.setAttribute("class", "button");
        ICO_CLOSE.oncontextmenu = (event) => {
            event.preventDefault();
        }
        setButtonClick(ICO_CLOSE, closeHelpWindow);



        const CHILD_WINDOW = IFRAME.contentWindow;
        let getDocumentHeight = () => {};
        let getScrollPoints = () => {};


        function getScrollY() {

            return IFRAME_DIV.scrollTop;
        }


        function setScrollY(top) {
            //log(`IFRAME_DIV setScrollY, ${top}`)
            IFRAME_DIV.scrollTop = top;
        }


        function openHelpWindow(url) {
            if (busy) return;
            busy = true;
            let s = FULL_DIV.style;
            s.position = "fixed";
            s.backgroundColor = "#666";
            s.left = -padding + "px";
            s.top = -padding + "px";
            s.width = dw + padding * 2 + "px";
            s.height = dh + padding * 2 + "px";

            s = WIN_DIV.style;
            s.backgroundColor = "#666";
            s.position = "absolute";
            s.left = padding + (dw - 820) / 2 + "px";
            s.top = padding + 5 + "px";
            s.width = 820 + "px";
            s.height = (dh - 15) / scale + "px";
            s.transform = "scale(" + scale + ")";
            s.transformOrigin = "center top";

            s = IFRAME_DIV.style;
            s.backgroundColor = "#ddd";
            s.position = "absolute";
            s.left = 10 + "px";
            s.top = 10 + "px";
            s.width = 800 + "px";
            s.height = parseInt(WIN_DIV.style.height) - 20 + "px";
            s.zIndex = -1;

            s = IFRAME.style;
            s.backgroundColor = "#ddd";
            s.position = "absolute";
            s.left = 0 + "px";
            s.top = 0 + "px";
            s.width = "800px";
            s.height = s.height || "100%"; //保存旧高度，防止滚到顶部

            s = BUT_DIV.style;
            s.position = "absolute";
            s.left = (820 - 197) / 2 + "px";
            s.top = parseInt(WIN_DIV.style.height) - 78 * 1.5 + "px";
            s.width = "197px";
            s.height = "78px";
            s.opacity = "0.5";
            s.zIndex = 99999;

            s = ICO_BACK.style;
            s.backgroundColor = "#c0c0c0";
            s.position = "absolute";
            s.left = 0 + "px";
            s.top = 0 + "px";
            s.width = "78px";
            s.height = "78px";
            s.borderStyle = "solid";
            s.borderColor = "#fff";
            s.borderWidth = "0px";

            s = ICO_CLOSE.style;
            s.backgroundColor = "#c0c0c0";
            s.position = "absolute";
            s.left = 117 + "px";
            s.top = 0 + "px";
            s.width = "78px";
            s.height = "78px";
            s.borderStyle = "solid";
            s.borderColor = "#fff";
            s.borderWidth = "0px";

            FULL_DIV.style.display = "block";
            FULL_DIV.style.zIndex = 99999;
            FULL_DIV.setAttribute("class", "show");

            if (IFRAME.src.indexOf(url) + 1) {
                IFRAME.src = url; //保持上次滚动值，防止滚到顶部
                IFRAME.contentWindow.onhashchange(); //onhashchange 滚动目标元素到可视区域
            }
            else {
                IFRAME.src = url;
            }

        }


        function closeHelpWindow() {

            FULL_DIV.setAttribute("class", "hide");
            setTimeout(() => {
                FULL_DIV.style.zIndex = -99999;
                FULL_DIV.style.display = "none";
                //IFRAME.src = "";
                busy = false;
            }, 500);
        }


        IFRAME.onload = () => {

            if (navigator.userAgent.indexOf("iPhone") < 0) return;
            const SRC = IFRAME.contentWindow.location.href;

            getDocumentHeight = (() => { //添加结束标记，准确判断文档高度

                let iDoc = IFRAME.Document || IFRAME.contentWindow.document;
                const MARK_END = iDoc.createElement("a");
                iDoc.body.appendChild(MARK_END);
                return () => {
                    return CHILD_WINDOW.getAbsolutePos(MARK_END).y;
                }
            })();

            getScrollPoints = CHILD_WINDOW.getScrollPoints;
            if (navigator.userAgent.indexOf("iPhone") + 1) {
                CHILD_WINDOW.setScrollY = setScrollY;
                CHILD_WINDOW.getScrollY = getScrollY;
                const temp = CHILD_WINDOW.scrollToAnimation;
                CHILD_WINDOW.scrollToAnimation = (top) => {
                    //alert(`>>>parent animationFrameScroll ${getDocumentHeight()}`)
                    temp(top);
                }
            };

            CHILD_WINDOW.setScrollHeight = () => {
                IFRAME.style.height = getDocumentHeight() + "px";
            };

            CHILD_WINDOW.setScrollHeight();
        }


        const tempF = window.open;
        window.open = (url, target) => {
            log(`url=${url}, target=${target}`)
            if (target == "helpWindow") {
                openHelpWindow(url);
            }
            else {
                tempF(url, target);
            }
        }


    }


    function setClick(elem, callback = () => {}, timeout = 300) {
        let startX = 0,
            startY = 0;
        elem.onclick = (() => {
            let busy = false;
            return () => {
                if (busy) return;
                busy = true;
                setTimeout(() => { busy = false; }, 1000);
                setTimeout(() => {
                    callback();
                }, timeout); //延迟，避免某些浏览器触发窗口下一层elem的click事件。
            };
        })();

        elem.addEventListener("touchstart", (event) => {
            startX = event.changedTouches[0].pageX;
            startY = event.changedTouches[0].pageY;
        }, true);
        elem.addEventListener("touchend", (event) => {
            event.preventDefault();
            let tX = event.changedTouches[0].pageX;
            let tY = event.changedTouches[0].pageY;
            if ((Math.abs(startX - tX) < 30) && (Math.abs(startY - tY) < 30)) {
                elem.onclick();
            }
        }, true);
    }



    function setButtonClick(elem, callback = () => {}) {
        setClick(elem, () => {
            let bkColor = elem.style.opacity;
            elem.style.opacity = "0.2";
            setTimeout(() => {
                elem.style.opacity = bkColor;
                callback();
            }, 300);
        }, 0);
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
                return { type: TYPE_NUMBER, cmd: "auto", showNum: isShow };
            case cAddblack.checked:
                return { type: TYPE_BLACK, cmd: "black", showNum: isShow };
            case cAddwhite.checked:
                return { type: TYPE_WHITE, cmd: "white", showNum: isShow };
            case cLba.checked:
                return { type: TYPE_MARK, cmd: EMOJI_SQUARE_BLACK, showNum: isShow };
            case cLbb.checked:
                return { type: TYPE_MARK, cmd: EMOJI_ROUND_DOUBLE, showNum: isShow };
            case cLbc.checked:
                return { type: TYPE_MARK, cmd: EMOJI_TRIANGLE_BLACK, showNum: isShow };
            case cLbd.checked:
                return { type: TYPE_MARK, cmd: EMOJI_FORK, showNum: isShow };
            case cLABC.checked:

                switch (cLABC.input.value * 1) {
                    case 2:
                        // 搜索棋盘上最大的字母;
                        code = "A".charCodeAt(); // 65→90
                        for (idx = 0; idx < cBd.SLTX * cBd.SLTY; idx++) {
                            if ((cBd.P[idx].type == TYPE_MARK || cBd.P[idx].type == TYPE_BLACK || cBd.P[idx].type == TYPE_WHITE) && cBd.P[idx].text.length == 1) {
                                let tcode = cBd.P[idx].text.charCodeAt(0);
                                if (tcode >= code && tcode <= 90) {
                                    code = tcode < 90 ? tcode + 1 : tcode;
                                }
                            }
                        }
                        txt = String.fromCharCode(code);
                        return { type: TYPE_MARK, cmd: txt, showNum: isShow };

                    case 3:

                        // 搜索棋盘上最大的字母;
                        code = "a".charCodeAt(); // 65→90
                        for (idx = 0; idx < cBd.SLTX * cBd.SLTY; idx++) {
                            if ((cBd.P[idx].type == TYPE_MARK || cBd.P[idx].type == TYPE_BLACK || cBd.P[idx].type == TYPE_WHITE) && cBd.P[idx].text.length == 1) {
                                tcode = cBd.P[idx].text.charCodeAt(0);
                                if (tcode >= code && tcode <= 122) {
                                    code = tcode < 122 ? tcode + 1 : tcode;
                                }
                            }
                        }
                        txt = String.fromCharCode(code);
                        return { type: TYPE_MARK, cmd: txt, showNum: isShow };

                    case 4:
                        // 搜索棋盘上最大的数字
                        code = 1 // 1-225;
                        for (idx = 0; idx < cBd.SLTX * cBd.SLTY; idx++) {
                            if (cBd.P[idx].type == TYPE_MARK || cBd.P[idx].type == TYPE_BLACK || cBd.P[idx].type == TYPE_WHITE) {
                                tcode = cBd.P[idx].text * 1;
                                if (tcode >= code && tcode <= 225) {
                                    code = tcode < 225 ? tcode + 1 : tcode;
                                }
                            }
                        }
                        txt = code;
                        return { type: TYPE_MARK, cmd: txt, showNum: isShow };
                    case 5:
                        lbIdx = 0;
                        for (idx = 0; idx < cBd.SLTX * cBd.SLTY; idx++) {
                            if (cBd.P[idx].type == TYPE_MARK || cBd.P[idx].type == TYPE_BLACK || cBd.P[idx].type == TYPE_WHITE) {
                                tcode = cBd.P[idx].text;
                                let i = continueLabel.indexOf(tcode);
                                if (i >= lbIdx) {
                                    lbIdx = i < continueLabel.length - 1 ? i + 1 : i;
                                }
                            }
                        }
                        txt = continueLabel[lbIdx];
                        return { type: TYPE_MARK, cmd: txt, showNum: isShow };
                    case 6:
                        return { type: TYPE_MARK, cmd: EMOJI_STAR, showNum: isShow };
                    case 7:
                        return { type: TYPE_MARK, cmd: EMOJI_FOUL, showNum: isShow };

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
        let idx = cBd.getPIndex(x, y);
        if (playModel == MODEL_RENJU) {
            if (idx > -1) {
                let cmds = getRenjuCmd();
                let arr = cBd.getPointArray([]);
                if (cBd.oldCode) cmds.type = TYPE_NUMBER;
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
                    case TYPE_NUMBER:
                        cancelKeepTouck();
                        if (cBd.P[idx].type == TYPE_NUMBER) {
                            //点击棋子，触发悔棋
                            cBd.cleNb(idx, cmds.showNum);
                        }
                        else if (cBd.P[idx].type == TYPE_EMPTY || ((cBd.oldCode || cBd.P[idx].text == EMOJI_FOUL) && cBd.P[idx].type == TYPE_MARK)) {
                            // 添加棋子  wNb(idx,color,showNum)
                            let isF = isFoul(idx % 15, parseInt(idx / 15), arr);
                            cBd.wNb(idx, "auto", cmds.showNum, undefined, isF);
                        }
                        break;

                    case TYPE_BLACK:
                        if (cBd.P[idx].type == TYPE_WHITE || cBd.P[idx].type == TYPE_BLACK) {
                            //点击棋子，触发悔棋
                            cBd.cleNb(idx);
                        }
                        else if (cBd.P[idx].type == TYPE_EMPTY) {
                            // 添加棋子  wNb(idx,color,showNum)
                            cBd.wNb(idx, "black", cmds.showNum);
                        }
                        break;

                    case TYPE_WHITE:
                        if (cBd.P[idx].type == TYPE_WHITE || cBd.P[idx].type == TYPE_BLACK) {
                            //点击棋子，触发悔棋
                            cBd.cleNb(idx);
                        }
                        else if (cBd.P[idx].type == TYPE_EMPTY) {
                            // 添加棋子  wNb(idx,color,showNum)
                            cBd.wNb(idx, "white", cmds.showNum);
                        }
                        break;

                    case TYPE_MARK:
                        if (cBd.P[idx].type == TYPE_MARK || cBd.P[idx].type == TYPE_MOVE) {
                            // 点击标记，删除标记
                            cBd.cleLb(idx);
                        }
                        else if (cBd.P[idx].type == TYPE_EMPTY) {
                            // 添加标记 wLb(idx,text,color, showNum:isShow) 
                            cBd.wLb(idx, cmds.cmd, getRenjuLbColor());
                        }
                        else if (cBd.P[idx].type == TYPE_WHITE || cBd.P[idx].type == TYPE_BLACK) {
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
        else if (playModel == MODEL_LINE_EDIT) {
            cBd.drawLineStart(idx, getRenjuLbColor(), "line");
        }
        else if (playModel == MODEL_ARROW_EDIT) {
            cBd.drawLineStart(idx, getRenjuLbColor(), "arrow");
        }

    }


    function renjuDblClick(x, y) {

        if (busy()) return;
        let idx = cBd.getPIndex(x, y);
        if (idx > -1) {
            // 触发快速悔棋
            if (cBd.P[idx].type == TYPE_NUMBER) {
                if (idx != cBd.MS[cBd.MSindex]) {
                    for (let i = cBd.MSindex + 1; i > parseInt(cBd.P[idx].text); i--) {
                        cBd.cleNb(idx, getShowNum());
                    }
                }
                else { // 
                    if (!cancelKeepTouck()) renjuKeepTouch(x, y);
                }
            } // 触发，手动输入标记
            else if ((cBd.P[idx].type == TYPE_MARK || cBd.P[idx].type == TYPE_MOVE || cBd.P[idx].type == TYPE_EMPTY) && !cAutoadd.checked && !cAddblack.checked && !cAddwhite.checked) {
                inputLabel(idx);
            }

        }
    }


    function renjuKeepTouch(x, y) {

        if (busy()) return;
        let idx = cBd.getPIndex(x, y);
        if (idx < 0) return;
        let w = cBd.width * 0.8;
        let h;
        let l = (dw - w) / 2;
        let t = dh / 7;

        /*
        switch (cBd.P[idx].type) {
            case TYPE_NUMBER:
                if (idx == cBd.MS[cBd.MSindex]) {
                    let str = cBd.notShowLastNum ? "确认恢复 最后一手红色显示。" : "确认取消 最后一手红色显示。";
                    msg(str, undefined, undefined, undefined, undefined, undefined, undefined, undefined, function() {

                        if (cBd.setNotShowLastNum(idx)) {
                            if (getShowNum()) {
                                cBd.showNum();
                            }
                            else {
                                cBd.hideNum();
                            }
                        }
                    }, undefined, 2);
                }
                break;
            case TYPE_MARK:
                // 设置弹窗，让用户手动输入标记
                inputLabel(idx);
                break;
            case TYPE_EMPTY:
                // 设置弹窗，让用户手动输入标记
                inputLabel(idx);
                break;

        }
        */
        if (idx == cBd.MS[cBd.MSindex]) {
            let str = cBd.notShowLastNum ? "确认恢复 最后一手红色显示。" : "确认取消 最后一手红色显示。";
            msg(str, undefined, undefined, undefined, undefined, undefined, undefined, undefined, function() {

                if (cBd.setNotShowLastNum(idx)) {
                    if (getShowNum()) {
                        cBd.showNum();
                    }
                    else {
                        cBd.hideNum();
                    }
                }
            }, undefined, 2);
        }
        else {
            //log(`top=${window.scrollY}, left=${window.scrollX}`);
            cMenu.idx = idx;
            cMenu.showMenu(undefined, y - window.scrollY - cMenu.menu.fontSize * 2.5 * 3);
        }

    }


    function inputLabel(idx) {
        let w = cBd.width * 0.8;
        let h;
        let l = (dw - w) / 2;
        let t = dh / 7;
        let color = getRenjuLbColor();
        // 设置弹窗，让用户手动输入标记
        msg("", "input", l, t, w, h, "输入标记", undefined, function(msgStr) {
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
                            cBd.wNb(mv[i], "auto", true, undefined, undefined, 100);
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
        if (busy) window._loading.open("busy", 1600);
        return busy;
    }


    let share = (() => {
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
        const ICO_DOWNLOAD = document.createElement("img");
        imgWindow.appendChild(ICO_DOWNLOAD);
        ICO_DOWNLOAD.src = "./pic/docusign-white.svg";
        ICO_DOWNLOAD.oncontextmenu = (event) => {
            event.preventDefault();
        };

        const ICO_CLOSE = document.createElement("img");
        imgWindow.appendChild(ICO_CLOSE);
        ICO_CLOSE.src = "./pic/close-white.svg";
        ICO_CLOSE.oncontextmenu = (event) => {
            event.preventDefault();
        };

        function shareClose() {
            shareWindow.setAttribute("class", "hide");
            setTimeout(() => {
                shareWindow.parentNode.removeChild(shareWindow);
                sharing = false;
            }, ANIMATION_TIMEOUT);
        }

        return (cBoardColor) => {

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
            s.border = `0px solid `;

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
                shareImg.onload = function() {};
            }
            else {
                shareImg.src = cBd.canvas.toDataURL();
                //if (navigator.userAgent.indexOf("iPhone") +1) window.location.href = "data:application/png" + cBd.canvas.toDataURL().substr(14);
            }

            let h = parseInt((imgWidth - iWidth) / 2 / 2);
            let w = h * 4;
            let l = (imgWidth - w) / 2;
            let t = imgWidth - h - (imgWidth - iWidth) / 8;

            shareLabel.innerHTML = `<h1 style = "font-size: ${h*0.45}px;text-align: center;color:#f0f0f0">长按图片分享</h1>`;
            s = shareLabel.style;
            s.position = "absolute";
            s.width = w + "px";
            s.height = h + "px";
            s.top = (imgWidth - iWidth) / 8 + "px";
            s.left = l + "px";
            s.backgroundColor = imgWindow.style.backgroundColor || "#666666";

            s = ICO_DOWNLOAD.style;
            s.position = "absolute";
            s.width = (imgWidth - parseInt(shareImg.style.top) - parseInt(shareImg.style.height)) / 2 + "px";
            s.height = s.width;
            s.top = imgWidth - parseInt(s.width) * 1.5 + "px";
            s.left = imgWidth / 2 - parseInt(s.width) * 1.5 + "px";
            s.backgroundColor = "#787878";
            s.opacity = "0.8";
            setButtonClick(ICO_DOWNLOAD, () => {
                cBd.saveAsImage("png");
            });

            s = ICO_CLOSE.style;
            s.position = "absolute";
            s.width = ICO_DOWNLOAD.style.width;
            s.height = ICO_DOWNLOAD.style.height;
            s.top = ICO_DOWNLOAD.style.top;
            s.left = imgWidth / 2 + parseInt(s.width) * 0.5 + "px";
            s.backgroundColor = "#787878";
            s.opacity = "0.8";
            setButtonClick(ICO_CLOSE, () => {
                shareClose();
                if (cBd.backgroundColor != oldBackgroundColor || cBd.LbBackgroundColor != oldLbBackgroundColor) {
                    cBd.backgroundColor = oldBackgroundColor;
                    cBd.LbBackgroundColor = oldLbBackgroundColor;
                    cBd.refreshCheckerBoard();
                }
            });

            shareWindow.setAttribute("class", "show");
            setTimeout(() => { document.body.appendChild(shareWindow); }, 1);


        };
    })();

    return {
        "getPlayModel": () => { return playModel },
        "renjuModel": MODEL_RENJU,
        "imgModel": MODEL_LOADIMG,
        "lineModel": MODEL_LINE_EDIT,
        "arrowModel": MODEL_ARROW_EDIT,
        "cLockImgChecked": () => { return cLockImg.checked; },
        "cAddwhite2Checked": () => { return cAddwhite2.checked; },
        "putCheckerBoard": putCheckerBoard,
        "renjuKeepTouch": renjuKeepTouch,
        "renjuDblClick": renjuDblClick,
        "renjuClick": renjuClick,
        "getRenjuSelColor": getRenjuSelColor,
        "getRenjuLbColor": getRenjuLbColor,
        "reset": (cBoard, engine_, msg_, closeMsg_, appData_, documentWidth, documentHeight, param, bodyDiv) => {
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
            createHelpWindow();
            setCheckerBoardEvent(cBoard.canvas, bodyDiv);
        },
        "getEXWindow": () => { return exWindow },
    };
})();