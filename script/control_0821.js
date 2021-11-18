self.SCRIPT_VERSIONS["control"] = "v1116.02";
window.control = (() => {
    "use strict";
    const TEST_CONTROL = true;

    function log(param, type = "log") {
        const command = {
            log: () => { console.log(param) },
            info: () => { console.info(param) },
            error: () => { console.error(param) },
            warn: () => { console.warn(param) },
            assert: () => { console.assert(param) },
            clear: () => { console.clear(param) },
            count: () => { console.count(param) },
            group: () => { console.group(param) },
            groupCollapsed: () => { console.groupCollapsed(param) },
            groupEnd: () => { console.groupEnd(param) },
            table: () => { console.table(param) },
            time: () => { console.time(param) },
            timeEnd: () => { console.timeEnd(param) },
            trace: () => { console.trace(param) },
        }
        let print = command[type] || console.log;
        if (TEST_CONTROL && DEBUG)
            print(`[control.js]\n>> ` + param);
    }
    
    window.blockUnload = function(enable) {
        setTimeout(function(){
            if (isBusy(false) || 
            (cBd && (cBd.oldCode || cBd.threePoints.arr || (getRenjuSelColor() == cObjVCF.color && bArr(cBd.getPointArray([]), cObjVCF.arr)))) ||
            (RenjuLib && !RenjuLib.isEmpty())
            ) {
                window.onbeforeunload = function(e) {
                    e = e || window.event;
                    // 兼容IE8和Firefox 4之前的版本
                    if (e) {
                        e.returnValue = '离开提示';
                    }
                    // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
                    return '离开提示';
                }
                log("blockUnload(true)","info");
            }
            else {
                window.onbeforeunload = null;
                log("blockUnload(false)","info");
            }
        },0)
    };

    const MAX_THREAD_NUM = 0 || window.navigator.hardwareConcurrency - 2 || 4;
    setTimeout(function() {
        //alert(MAX_THREAD_NUM);
    }, 3000);
    const MODEL_RENJU = 0,
        MODEL_LOADIMG = 1,
        MODEL_LINE_EDIT = 2,
        MODEL_ARROW_EDIT = 3,
        MODEL_UNPACK_TREE = 4,
        MODEL_UNPACK_THREEPOINT = 5,
        MODEL_UNPACK_FOULPOINT = 6,
        MODEL_RENLIB = 7;

    let cBd,
        engine,
        msg,
        closeMsg,
        appData,
        dw,
        dh;

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
    let continueLabel = ["标记1", "标记2", "标记3", "标记4", "标记5"],
        parentNode,
        renjuCmddiv = null,
        renjuCmdSettings = {positions:[], defaultButtons:[], ButtonsIdx:[], idx:0},
        imgCmdDiv = null,
        imgCmdSettings = {positions:[], defaultButtons:[], ButtonsIdx:[], idx:0},
        onLoadCmdSettings = function() {},
        scaleCBoard = function() {},
        setShowNum = function() {},
        getShowNum = function() {},
        editButtons = function() {},
        
        blackwhiteRadioChecked = function() {},
        markRadioChecked = function() {},
        autoblackwhiteRadioChecked = function() {},
        
        cMenu = null,

        cLockImg = null,
        cPutBoard = null,
        cAutoPut = null,
        cCleAll = null,
        cShownum = null,
        cNewGame = null,
        cLocknum = null,
        cAutoadd = null,
        cAddblack = null,
        cAddwhite = null,
        cAddblack2 = null,
        cAddwhite2 = null,
        cLba = null,
        cLbb = null,
        cLbc = null,
        cLbd = null,
        cLbColor = null,
        cBack = null,
        cResetnum = null,
        cReset = null,
        cNextone = null,
        cInputcode = null,
        cOutputcode = null,
        cStart = null,
        cEnd = null,
        cPrevious = null,
        cNext = null,
        cFlipX = null,
        cFlipY = null,
        cCW = null,
        cCCW = null,
        cLABC = null,
        cMoveL = null,
        cMoveR = null,
        cMoveT = null,
        cMoveB = null,
        cCutImage = null,
        cSelBlack = null,
        cSelWhite = null,
        cPrintVCF = null,
        cFindPoint = null,
        cFindVCF = null,
        cCancelFind = null,
        cObjVCF = { arr: [], winMoves: [], color: 0, time: false }, // 保存VCF分支
        cLoadImg = null,
        cSLTX = null,
        cSLTY = null,
        cShare = null,
        cShareWhite = null,
        cCleLb = null,
        cHelp = null,
        exWindow,
        isCancelMenuClick = false, //iOS 长按弹出棋盘菜单后会误触发click事件。
        isCancelCanvasClick = false; //ios 长按放大棋盘会误触发click事件
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
            this.div.style.left = left + "px";
            this.div.style.top = top + "px";
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
                let h = ~~(t / 3600000);
                h = h < 10 ? "0" + h : h;
                let m = ~~((t % 3600000) / 60000);
                m = m < 10 ? "0" + m : m;
                let s = ~~((t % 60000) / 1000);
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
    
    function setRadio(buttons = [], callback = ()=>{}) {
        function check(but) {
            for (let i = buttons.length - 1; i >= 0; i--)
                buttons[i].setChecked(false);
            but.setChecked(true);
            callback.call(but);
        }
        for(let i=buttons.length-1; i>=0; i--)
            buttons[i].setontouchend(check);
        return check;
    }
    
    function setChecked(buttons = [], callback = () => {}) {
        function check(but) {
            but.setChecked(!but.checked);
            callback();
        }
        for (let i = buttons.length - 1; i >= 0; i--)
            buttons[i].setontouchend(check);
        return check;
    }
    
    function newGame() {
        engine.postMsg("cancelFind");
        let h1 = ~~(cBd.width);
        let h2 = ~~(cBd.canvas.height);
        scaleCBoard(false);
        cBd.cle();
        cBd.printCheckerBoard();
        cBd.resetNum = 0;
        cBd.firstColor = "black";
        cBd.hideCutDiv();
        cBd.drawLineEnd();
        cObjVCF.arr = [];
        playModel = MODEL_RENJU;
        blackwhiteRadioChecked(cSelBlack);
        markRadioChecked(cAutoadd);
        parentNode.style.top = h1 + parentNode.offsetTop - h2 + "px";
        parentNode.appendChild(renjuCmddiv);
        if (imgCmdDiv.parentNode) imgCmdDiv.parentNode.removeChild(imgCmdDiv);
        viewport1.resize();
        RenjuLib.closeLib();
        window.blockUnload && window.blockUnload();
    }
    
    function setMenuCheckBox(button, idx, idxs) {
        if(idxs.indexOf(idx)>-1){
            button.menu.lis[idx].checked = !button.menu.lis[idx].checked;
            if (button.menu.lis[idx].checked) {
                button.menu.lis[idx].innerHTML = button.input[idx].text + "  ✔";
            }
            else {
                button.menu.lis[idx].innerHTML = button.input[idx].text;
            }
        }
    }
    
    function setMenuRadio(button, idx, idxs) {
        for(let i=(idxs && idxs.length || button.input.length) - 1; i>=0; i--){
            button.menu.lis[i].checked = false;
            button.menu.lis[i].innerHTML = button.input[i].text;
        }
        button.menu.lis[idx].checked = true;
        button.menu.lis[idx].innerHTML = button.input[idx].text + "  ✔";
    }


    let putCheckerBoard = putBoard;

    function putBoard(idx) {
        if (idx < 0) return;
        let arr = cBd.getPointArray([]);
        newGame();
        cBd.unpackArray(!idx ? arr : changeCoordinate(arr, idx));
    }

    function changeCoordinate(arr, idx) {
        let nArr = getArr([]);
        idx = idx || 112;
        let l = 7 - ~~(idx % arr[0].length);
        l = l < 0 ? 0 : l;
        l = l + arr[0].length > 15 ? 15 - arr[0].length : l;
        let t = 7 - ~~(idx / arr.length);
        t = t < 0 ? 0 : t;
        t = t + arr.length > 15 ? 15 - arr.length : t;
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                nArr[i + t][j + l] = arr[i][j];
            }
        }
        return nArr;
    }

    function checkCommand(msgStr) {
        if (msgStr.indexOf("add") > -1) { // printMoves  || add Num
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
                if (!mv[i]) return true;
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
            return true;
        }
        else if (msgStr.indexOf("color==") > -1) {

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
        else if (msgStr.indexOf("caches") > -1) {

            window.logCaches();
            return;
        }
        else if (msgStr.indexOf("cache") > -1) {

            logCache(window.APP_VERSION)
            return;
        }
        else if (msgStr.indexOf("offline") > -1 || msgStr.indexOf("icon") > -1) {

            cBd.cutImg.style.width = ~~(cBd.canvas.width) + "px";
            cBd.cutImg.style.height = ~~(cBd.canvas.height) + "px";
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
        else if ((/{x:\d+\.*\d*,y:\d+\.*\d*}/).exec(msgStr)) {
            let sPoint = (/{x:\d+\.*\d*,y:\d+\.*\d*}/).exec(msgStr),
                x = String(sPoint).split(/[{x:,y}]/)[3],
                y = String(sPoint).split(/[{x:,y}]/)[6];
            RenjuLib.setCenterPos({ x: x * 1, y: y * 1 })
        }
        else if ((/\d+路/).exec(msgStr)) {
            let num = String((/\d+路/).exec(msgStr)).split("路")[0];
            RenjuLib.setCenterPos({ x: num / 2 + 0.5, y: num / 2 + 0.5 })
        }
        else if ((/postStart\(\d+\)/).exec(msgStr)) {
            let num = String((/postStart\(\d+\)/).exec(msgStr)).split(/[postStart\(\)]/)[10] || 0;
            RenjuLib.setPostStart(num * 1);
        }
        else if (msgStr.indexOf("colour") + 1) {
            RenjuLib.colour()
        }
        else {
            return false;
        }
        return true;
    }
    
    
    
    function createMenu(left, top, width, height, fontSize, options = [], onchange = ()=>{}){
        let menu = new button(cBd.parentNode, "select", left, top, width, height);
        menu.index = -1;
        menu.addOptions(options);
        menu.setonchange(onchange);
        menu.createMenu(left,
            undefined,
            width,
            undefined,
            fontSize,
            true,
            () => {
                    //log(`isCancelMenuClick=${isCancelMenuClick}`);
                let rt = isCancelMenuClick;
                setTimeout(() => {
                    isCancelMenuClick = false;
                }, 100);
                return rt;
            });
        return menu;
    }



    function createContextMenu(left, top, width, height, fontSize) {
        let p = { x: 0, y: 0 };
        cBd.xyObjToPage(p, cBd.viewBox);
        left = p.x + (parseInt(cBd.viewBox.style.width) - width) / 2;
        cMenu = createMenu(left, top, width, height, fontSize, [
            0, "设置",
            1, "打开",
            2, `保存`,
            3, `${EMOJI_SEARCH} 找点`,
            4, `${EMOJI_QUESTION} 解题`,
            5, "新棋局",
            6, "添加标记",
            7, "清空标记",
            8, "分享图片",
            9, "分享原图",
            10, `下手为${EMOJI_ROUND_ONE}`,
            11, "重置手数",
            12, "显示手数",
            13, "隐藏手数",
            14, "输入代码",
            15, "输出代码",
            16, `🔄 刷新页面`
        ],
        function(but) {
            if (isBusy()) return;
            let idx = but.idx;
            let x = but.menu.offsetLeft;
            let y = but.menu.offsetTop;
            switch (but.input.value * 1) {
                case 0:
                    cShownum.showMenu(x, y);
                    break;
                case 1:
                    cLoadImg.showMenu(x, y);
                    break;
                case 2:
                    cCutImage.showMenu(x, y);
                    break;
                case 3:
                    cFindPoint.showMenu(x, y);
                    break;
                case 4:
                    cFindVCF.showMenu(x, y);
                    break;
                case 5:
                    cNewGame.touchend();
                    break;
                case 6:
                    if (cBd.P[idx].type == TYPE_MARK || cBd.P[idx].type == TYPE_MOVE || cBd.P[idx].type == TYPE_EMPTY) {
                        inputLabel(idx);
                    }
                    break;
                case 7:
                    cCleLb.touchend();
                    break;
                case 8:
                    cShareWhite.touchend();
                    break;
                case 9:
                    cShare.touchend();
                    break;
                case 10:
                    cNextone.touchend();
                    break;
                case 11:
                    cResetnum.touchend();
                    break;
                case 12:
                    cBd.showNum();
                    setShowNum(true);
                    cBd.isShowNum = getShowNum();
                    break;
                case 13:
                    cBd.hideNum();
                    setShowNum(false);
                    cBd.isShowNum = getShowNum();
                    break;
                case 14:
                    cInputcode.touchend();
                    break;
                case 15:
                    cOutputcode.touchend();
                    break;
                case 16:
                    typeof window.reloadApp == "function" ? window.reloadApp() : window.location.reload();
                    break;
            }
        });
    }
    
    
    
    function moveButtons(settings){
        
        let buts =settings.defaultButtons,
            positions = settings.positions,
            buttonsIdx = settings.ButtonsIdx[settings.idx];
        for(let i=0; i<buts.length; i++){
            buts[i].hide();
        }
        
        for (let i = 0; i < buttonsIdx.length; i++) {
            buts[buttonsIdx[i]].move(positions[i].left, positions[i].top);
        }
    }
    
    function loadCmdSettings(key, settings) {
        if (key = "renjuCmdSettings") {
            renjuCmdSettings.ButtonsIdx = settings.ButtonsIdx || renjuCmdSettings.ButtonsIdx;
            renjuCmdSettings.idx = settings.idx || renjuCmdSettings.idx;
            moveButtons(renjuCmdSettings);
            onLoadCmdSettings();
        }
    }
    function saveCmdSettings(key, settings) {
        let obj = {
            ButtonsIdx: settings.ButtonsIdx,
            idx: settings.idx
        }
        appData.setObject(key, obj);
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

        w = sw / 5;
        

        cStart = new button(renjuCmddiv, "button", 0, 0, w, h);
        cStart.setText("‖<<");
        cStart.setontouchend(function() {
            if (isBusy()) return;
            cBd.toStart(getShowNum());
        });

        cPrevious = new button(renjuCmddiv, "button", 0, 0, w, h);
        cPrevious.setText(" <<");
        cPrevious.setontouchend(function() {
            if (isBusy()) return;
            cBd.toPrevious(getShowNum());
        });

        cNext = new button(renjuCmddiv, "button", 0, 0, w, h);
        cNext.setText(">>");
        cNext.setontouchend(function() {
            if (isBusy()) return;
            cBd.toNext(getShowNum());
        });

        cEnd = new button(renjuCmddiv, "button", 0, 0, w, h);
        cEnd.setText(" >>‖");
        cEnd.setontouchend(function() {
            if (isBusy()) return;
            cBd.toEnd(getShowNum());
        });


        cMoveL = new button(renjuCmddiv, "button", 0, 0, w, h);
        cMoveL.setColor("black");
        cMoveL.setText("←");
        cMoveL.setontouchend(function() {
            if (isBusy()) return;
            cBd.moveCheckerBoard("left");
        });

        cMoveR = new button(renjuCmddiv, "button", 0, 0, w, h);
        cMoveR.setColor("black");
        cMoveR.setText("→ ");
        cMoveR.setontouchend(function() {
            if (isBusy()) return;
            cBd.moveCheckerBoard("right");
        });

        cMoveT = new button(renjuCmddiv, "button", 0, 0, w, h);
        cMoveT.setColor("black");
        cMoveT.setText(" ↑");
        cMoveT.setontouchend(function() {
            if (isBusy()) return;
            cBd.moveCheckerBoard("top");
        });

        cMoveB = new button(renjuCmddiv, "button", 0, 0, w, h);
        cMoveB.setColor("black");
        cMoveB.setText("↓");
        cMoveB.setontouchend(function() {
            if (isBusy()) return;
            cBd.moveCheckerBoard("bottom");
        });

        cFlipY = new button(renjuCmddiv, "button", 0, 0, w, h);
        cFlipY.setText("↔180°");
        cFlipY.setontouchend(function() {
            if (isBusy()) return;
            cBd.boardFlipY(getShowNum());
        });

        cCW = new button(renjuCmddiv, "button", 0, 0, w, h);
        cCW.setText(" ↗90°");
        cCW.setontouchend(function() {
            if (isBusy()) return;
            cBd.boardCW(getShowNum());
        });

        cCleLb = new button(renjuCmddiv, "button", 0, 0, w, h);
        cCleLb.setColor("black");
        cCleLb.setText(" 清空标记");
        cCleLb.setontouchend(function() {
            if (isBusy()) return;
            cBd.removeMarkLine("all");
            cBd.removeMarkArrow("all");
            cBd.cleLb("all");
            cBd.threePoints = {};
        });

        cNewGame = new button(renjuCmddiv, "button", 0, 0, w, h);
        cNewGame.setText("新棋局");
        cNewGame.setontouchend(function() {
            if (isBusy()) return;
            newGame();
        });

        cInputcode = new button(renjuCmddiv, "button", 0, 0, w, h);
        cInputcode.setColor("black");
        cInputcode.setText("输入代码");

        function inputCode(msgStr) {
            // 成功设置棋盘 ，就开始解析棋盘摆盘
            !checkCommand(msgStr) &&
                cBd.unpackCode(getShowNum(), msgStr);

        }
        cInputcode.setontouchend(function() {
            if (isBusy()) return;
            let w = cBd.width * 0.8;
            let h = w;
            let l = (dw - w) / 2;
            let t = (dh - dw) / 4;
            t = t < 0 ? 1 : t;
            msg("长按下面空白区域，粘贴棋谱代码 " + "\n" + "-------------" + "\n\n", "input", l, t, w, h, "输入代码", undefined,
                inputCode, undefined, undefined, 10);
        });

        cOutputcode = new button(renjuCmddiv, "button", 0, 0, w, h);
        cOutputcode.setColor("black");
        cOutputcode.setText("输出代码");
        cOutputcode.setontouchend(function() {
            if (isBusy()) return;
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

        let fileInput = document.createElement("input");
        fileInput.setAttribute("type", "file");
        fileInput.style.display = "none";
        renjuCmddiv.appendChild(fileInput);
        
        let setMemoryMenu = createMenu(menuLeft, undefined, menuWidth, undefined, menuFontSize,
            [4,"4倍内存",
            5,"5倍内存",
            6,"6倍内存",
            7,"7倍内存",
            8,"8倍内存"],
            function(but){
                RenjuLib.setBufferScale(but.input.value*1);
            });
        
        cLoadImg = new button(renjuCmddiv, "select", 0, 0, w, h);
        cLoadImg.addOption(1, "打开 图片");
        cLoadImg.addOption(2, "打开 lib 棋谱");
        cLoadImg.addOption(3, "设置内存大小");
        cLoadImg.createMenu(menuLeft, undefined, menuWidth, undefined, menuFontSize);
        cLoadImg.setText("打开");
        cLoadImg.setonchange(function(but) {
            but.setText(`打开`);
            if (isBusy()) return;
            switch (but.input.value * 1) {
                case 1:
                    fileInput.accept = "image/*";
                    fileInput.onchange = openImg;
                    fileInput.click()
                    break;
                case 2:
                    fileInput.accept = "application/lib";
                    fileInput.onchange = openLib;
                    fileInput.click()
                    break;
                case 3:
                    setMemoryMenu.showMenu()
                    break;
            }
            but.input.value = 0;
        });

        function putImg() {
            let img = cBd.bakImg;
            let w = parseInt(img.width);
            let h = parseInt(img.height);
            let w1 = cBd.width;
            let h1 = cBd.width * h / w;
            let h2 = cBd.canvas.height;
            cBd.cle();
            scaleCBoard(false);
            // 画图之前，设置画布大小
            cBd.canvas.width = w1;
            cBd.canvas.height = h1;
            cBd.canvas.style.width = w1 + "px";
            cBd.canvas.style.height = h1 + "px";
            cBd.viewBox.style.height = cBd.canvas.style.height;
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

        function openImg() {
            if (isBusy()) return;
            engine.postMsg("cancelFind");
            cBd.drawLineEnd();
            let reader = new FileReader();
            let file = fileInput.files[0];
            fileInput.value = "";
            let img = cBd.bakImg;
            img.src = null;
            reader.onload = function() {
                img.src = reader.result;
            };
            reader.readAsDataURL(file);
            img.onload = function() {
                img.onload = null;
                cBd.oldXL = cBd.oldXR = 0;
                putImg();
            };
        }

        function openLib() {
            if (isBusy()) return;
            newGame();
            engine.postMsg("cancelFind");
            cBd.drawLineEnd();
            let file = fileInput.files[0];
            fileInput.value = "";
            RenjuLib.openLib(file);
        }

        cCutImage = new button(renjuCmddiv, "select", 0, 0, w, h);
        //cCutImage.addOption(0, "________图片________");
        //cCutImage.addOption(1, "分享图片");
        cCutImage.addOption(2, "JPEG/(*.jpg) ____ 压缩图片");
        cCutImage.addOption(3, "PNG /(*.png) ____ 清晰图片");
        cCutImage.addOption(4, "SVG /(*.svg) ____ 无损图片");
        cCutImage.addOption(5, "HTML/(*.html) ___ 无损文档");
        cCutImage.addOption(6, "PDF /(*.pdf) _____ 无损文档");
        //cCutImage.addOption(7, "________棋谱________");
        //cCutImage.addOption(8, "LIB /(*.lib) ______ 棋谱");
        cCutImage.createMenu(menuLeft, undefined, menuWidth, undefined, menuFontSize);
        cCutImage.setText(`保存`);
        cCutImage.setonchange(function(but) {
            but.setText(`保存`);
            if (isBusy()) return;
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
        
        cCancelFind = new button(renjuCmddiv, "button", 0, 0, w, h);
        //cCancelFind.show();
        cCancelFind.setText(`${EMOJI_STOP} 停止`);
        //cCancelFind.setColor("red");
        cCancelFind.setontouchend(function(but) {
            engine.postMsg("cancelFind");
            RenjuLib.isLoading() && RenjuLib.cancal();
        });

        cAutoadd = new button(renjuCmddiv, "radio", 0, 0, w, h);
        cAutoadd.setText(` ${EMOJI_ROUND_BLACK_WHITE} 棋`);
        cAutoadd.setChecked(1);

        cAddblack = new button(renjuCmddiv, "radio", 0, 0, w, h);
        cAddblack.setText(` ${EMOJI_ROUND_BLACK} 棋`);

        cAddwhite = new button(renjuCmddiv, "radio", 0, 0, w, h);
        cAddwhite.setText(` ${EMOJI_ROUND} 棋`);

        cNextone = new button(renjuCmddiv, "button", 0, 0, w, h);
        cNextone.setColor("black");
        cNextone.setText(`下手为${EMOJI_ROUND_ONE}`);
        cNextone.setontouchend(function() {
            if (isBusy()) return;
            cBd.setResetNum(cBd.MSindex + 1);
            cBd.isShowNum = getShowNum();
        });

        cLba = new button(renjuCmddiv, "radio", 0, 0, w, h);
        cLba.setText(` ${EMOJI_SQUARE_BLACK} `);

        cLbb = new button(renjuCmddiv, "radio", 0, 0, w, h);
        cLbb.setText(` ${EMOJI_ROUND_DOUBLE} `);

        cLABC = new button(renjuCmddiv, "select", 0, 0, w, h);
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

        cResetnum = new button(renjuCmddiv, "button", 0, 0, w, h);
        cResetnum.setColor("black");
        cResetnum.setText(" 重置手数");
        cResetnum.setontouchend(function() {
            if (isBusy()) return;
            cBd.setResetNum(0);
            setShowNum(true);
            cBd.isShowNum = getShowNum();
        });

        cLbc = new button(renjuCmddiv, "radio", 0, 0, w, h);
        cLbc.setText(` ${EMOJI_TRIANGLE_BLACK} `);

        cLbd = new button(renjuCmddiv, "radio", 0, 0, w, h);
        cLbd.setText(` ${EMOJI_FORK} `);

        cLbColor = new button(renjuCmddiv, "select", 0, 0, w, h);
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
        cLbColor.setText(`${EMOJI_PEN} 颜色`);
        cLbColor.setonchange(function(but) {
            //if (isBusy()) return;
            but.setColor(lbColor[but.input.value].color);
            but.setText(`${EMOJI_PEN} 颜色`);
            cLba.setColor(lbColor[but.input.value].color);
            cLbb.setColor(lbColor[but.input.value].color);
            cLbc.setColor(lbColor[but.input.value].color);
            cLbd.setColor(lbColor[but.input.value].color);
            cLABC.setColor(lbColor[but.input.value].color);
        });
        
        cPrintVCF = new button(renjuCmddiv, "select", 0, 0, w, h);
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
        cPrintVCF.setText("➩ VCF ");
        cPrintVCF.setonchange(function(but) {
            but.setText("➩ VCF ");
            if (isBusy()) return;
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

        cSelBlack = new button(renjuCmddiv, "checkbox", 0, 0, w, h);
        cSelBlack.setText("黑先");
        cSelBlack.setChecked(1);

        cSelWhite = new button(renjuCmddiv, "checkbox", 0, 0, w, h);
        cSelWhite.setText("白先");
        
        const CALCULATE = 1;
        let tMsg = [["3月21日，五子茶馆解题大赛"], ["比赛结束前，暂时关闭计算功能"]];

        cFindPoint = new button(renjuCmddiv, "select", 0, 0, w, h);
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
        cFindPoint.setText("找点");
        cFindPoint.setonchange(function(but) {
            but.setText("找点");
            if (isBusy()) return;
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

        cFindVCF = new button(renjuCmddiv, "select", 0, 0, w, h);
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
        cFindVCF.setText("解题");
        cFindVCF.setonchange(function(but) {
            but.setText("解题");
            if (isBusy()) return;
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

        cShareWhite = new button(renjuCmddiv, "button", 0, 0, w, h);
        cShareWhite.setColor("black");
        cShareWhite.setText(" 分享图片");
        cShareWhite.setontouchend(function() {
            if (isBusy()) return;
            share("white");
        });

        cShare = new button(renjuCmddiv, "button", 0, 0, w, h);
        cShare.setColor("black");
        cShare.setText(" 分享原图");
        cShare.setontouchend(function() {
            if (isBusy()) return;
            share();
        });
        
        let coordinateMenu = createMenu( menuLeft, t, menuWidth, h, menuFontSize,
                [0,"棋盘坐标:无坐标",
                1,"棋盘坐标:上下左右",
                2,"棋盘坐标:上左",
                3,"棋盘坐标:上右",
                4,"棋盘坐标:下右",
                5,"棋盘坐标:下左"],
                function(but){
                    if (isBusy()) return;
                    cBd.setCoordinate(but.input.value*1);
                }),
            cBoardSizeMenu = createMenu(menuLeft, t, menuWidth, h, menuFontSize,
                [15,"15路棋盘",
                14,"14路棋盘",
                13,"13路棋盘",
                12,"12路棋盘",
                11,"11路棋盘",
                10,"10路棋盘",
                9,"9路棋盘",
                8,"8路棋盘",
                7,"7路棋盘",
                6,"6路棋盘",],
                function(but){
                    if (isBusy()) return;
                    //newGame();
                    cBd.setSize(but.input.value*1);
                    scaleCBoard(false);
                    RenjuLib.setCenterPos({x:cBd.size/2+0.5, y:cBd.size/2+0.5});
                    RenjuLib.getAutoMove();
                }),
            cLoadRenjuSettingsMenu = createMenu(menuLeft, t, menuWidth, h, menuFontSize,
                [0,"默认",
                1,"设置1",
                2,"设置2",
                3,"设置3",
                4,"设置4",
                5,"设置5"],
                function(but){
                    if(isBusy()) return;
                    renjuCmdSettings.idx = but.input.value*1;
                    saveCmdSettings("renjuCmdSettings", renjuCmdSettings);
                    loadCmdSettings("renjuCmdSettings", renjuCmdSettings);
                }),
            cSaveRenjuSettingsMenu = createMenu(menuLeft, t, menuWidth, h, menuFontSize,
                [1, "设置1",
                2, "设置2",
                3, "设置3",
                4, "设置4",
                5, "设置5"],
                function(but){  
                    if(isBusy()) return;
                    renjuCmdSettings.idx = but.input.value * 1;
                    editButtons("renjuCmdSettings", renjuCmdSettings);
                }),
            cShownumTop = new button(renjuCmddiv, "button", 0, 0, w, h);
        
        cShownumTop.setText(" 设置 ");
        cShownumTop.setontouchend(function() {
            if (isBusy()) return;
            cShownum.defaultontouchend();
        });
        
        cShownum = new button(renjuCmddiv, "select", 0, 0, w, h);
        cShownum.addOption(0, "显示手数");
        cShownum.addOption(1, "显示禁手");
        cShownum.addOption(2, "显示线路");
        cShownum.addOption(3, "放大棋盘");
        cShownum.addOption(4, "设置棋盘大小");
        cShownum.addOption(5, "设置棋盘坐标");
        cShownum.addOption(6, "读取按键位置");
        cShownum.addOption(7, "设置按键位置");
        //cShownum.show();
        cShownum.setText(EMOJI_ROUND_ONE);
        //setShowNum(1);
        cShownum.createMenu(menuLeft, undefined, menuWidth, undefined, menuFontSize);
        cShownum.menu.lis[0].checked = true;
        cShownum.menu.lis[0].innerHTML = cShownum.input[0].text + "  ✔";
        cShownum.setonchange(function(but) {
            but.setText(EMOJI_ROUND_ONE);
            if (isBusy()) return;
            setMenuCheckBox(but, but.input.selectedIndex, [0,1,2]);
            switch (but.input.value * 1) {
                case 0:
                    if (but.menu.lis[0].checked) {
                        cBd.showNum();
                    }
                    else {
                        cBd.hideNum();
                    }
                    cBd.isShowNum = but.menu.lis[0].checked;
                    break;
                case 1:
                    cBd.isShowFoul = but.menu.lis[1].checked;
                    break;
                case 2:
                    cBd.isShowAutoLine = but.menu.lis[2].checked;
                    break;
                case 3:
                    scaleCBoard(!but.menu.lis[3].checked, 1);
                    break;
                case 4:
                    cBoardSizeMenu.showMenu(but.menu.offsetLeft, but.menu.offsetTop);
                    break;
                case 5:
                    coordinateMenu.showMenu(but.menu.offsetLeft, but.menu.offsetTop);
                    break;
                case 6:
                    cLoadRenjuSettingsMenu.showMenu(but.menu.offsetLeft, but.menu.offsetTop);
                    break;
                case 7:
                    cSaveRenjuSettingsMenu.showMenu(but.menu.offsetLeft, but.menu.offsetTop);
                    break;
            }
            cBd.autoShow();
        
            //but.setText(getShowNum()?EMOJI_ROUND_ONE :EMOJI_ROUND_BLACK);
        });
        cBd.onScale = function(){
            if(this.scale==1){
                cShownum.menu.lis[3].checked = false;
                cShownum.menu.lis[3].innerHTML = cShownum.input[3].text;
            }
            else{
                cShownum.menu.lis[3].checked = true;
                cShownum.menu.lis[3].innerHTML = cShownum.input[3].text + "  ✔";
            }
        };
        cBd.onSetSize = function(){
            cBoardSizeMenu.input.selectedIndex = 15 - this.size;
            setMenuRadio(cBoardSizeMenu, cBoardSizeMenu.input.selectedIndex);
            viewport1.scrollTop();
        };
        cBd.onSetCoordinate = function(){
            coordinateMenu.input.selectedIndex = this.coordinateType;
            setMenuRadio(coordinateMenu, coordinateMenu.input.selectedIndex);
            viewport1.scrollTop();
        };
        onLoadCmdSettings = function(){
            setMenuRadio(cLoadRenjuSettingsMenu, renjuCmdSettings.idx);
            viewport1.scrollTop();
        };
        scaleCBoard = function (isScale, timer = "now"){
            if(isScale){
                if(playModel != MODEL_LINE_EDIT &&
                    playModel != MODEL_ARROW_EDIT)
                        cBd.setScale(1.5, timer);
                else
                    showLabel(`${EMOJI_STOP} 画线模式,不能放大`);
            }
            else{
                cBd.setScale(1, timer);
            }
        };
    
        setShowNum = function(shownum) {
            cShownum.menu.lis[0].checked = !!shownum;
            if (cShownum.menu.lis[0].checked) {
                cShownum.menu.lis[0].innerHTML = cShownum.input[0].text + "  ✔";
            }
            else {
                cShownum.menu.lis[0].innerHTML = cShownum.input[0].text;
            }
        };
        getShowNum = function() {
            return cShownum.menu.lis[0].checked;
        };

        cHelp = new button(renjuCmddiv, "button", 0, 0, w, h);
        cHelp.setColor("black");
        cHelp.setText(" 帮助 ");
        cHelp.setontouchend(function() {
            if (isBusy()) return;
            window.open("./help/renjuhelp/renjuhelp.html", "helpWindow");
        });
        
        // blackwhiteRadioChecked = function
        blackwhiteRadioChecked = setRadio([cSelBlack,cSelWhite]);

        markRadioChecked = setRadio([cLba, cLbb, cLbc, cLbd, cAutoadd, cAddblack, cAddwhite, cLABC], function() {
            if (this != cLABC) {
                playModel = MODEL_RENJU;
                cBd.drawLineEnd();
            }
        });
        
        let topButtons = [
                cShareWhite,
                cShare,
                cShownumTop,
                cHelp],
            downButtons = [
                cStart,
                cPrevious,
                cNext,
                cEnd,
                cMoveL,
                cMoveR,
                cMoveT,
                cMoveB,
                cFlipY,
                cCW,
                cCleLb,
                cNewGame,
                cInputcode,
                cOutputcode,
                cLoadImg,
                cCutImage,
                cAutoadd,
                cAddblack,
                cAddwhite,
                cNextone,
                cLba,
                cLbb,
                cLABC,
                cResetnum,
                cLbc,
                cLbd,
                cLbColor,
                cPrintVCF,
                cSelBlack,
                cSelWhite,
                cFindPoint,
                cFindVCF];
                
        for (let i = 0; i < 9; i++) {  // set positions
            if (i === 0) {
                if (dw < dh) {
                    t = 0 - cBd.width - h * 2.5;
                    setTop(parentNode.offsetTop + t)
                }
                else {
                    t = 0;
                    setTop(0);
                }
            }
            else if (i === 1) {
                if (dw < dh)
                    t = 0;
                else
                    t += h * 1.5;
            }
            else {
                t += h * 1.5;
            }
            for (let j = 0; j < 4; j++) {
                renjuCmdSettings.positions.push({
                    left: w * j * 1.33,
                    top: t
                });
            }
        }
        renjuCmdSettings.defaultButtons = dw < dh ? topButtons.concat(downButtons) : downButtons.concat(topButtons);
        
        renjuCmdSettings.ButtonsIdx[0] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35];
        renjuCmdSettings.ButtonsIdx[1] = [0,1,2,3,4,5,6,7,12,13,14,15,20,21,22,23,24,25,26,27];
        renjuCmdSettings.ButtonsIdx[2] = [0,1,2,3,4,5,6,7,12,13,14,15,20,21,22,23,24,25,26,27,16,17,18,19];
        renjuCmdSettings.ButtonsIdx[3] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,20,21,22,23,24,25,26,27,16,17,18,19];
        renjuCmdSettings.ButtonsIdx[4] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,32,33,34,35,20,21,22,23,24,25,26,27,28,29,30,31,16,17,18,19];
        renjuCmdSettings.ButtonsIdx[5] = [0,1,2,3,4,5,6,7,12,13,14,15];
        
        renjuCmdSettings.idx = 0;
    
        moveButtons(renjuCmdSettings);
        
        editButtons = (() => {
            const VIEW = document.createElement("div"),
                IFRAME = document.createElement("div"),
                TITLE = document.createElement("div"),
                CLOSE_BUTTON = document.createElement("img");
            
            let p = {x:0, y:0},
                settingsKey = "settingsKey",
                pSettings,
                cBdLeft = 0,
                cBdTop = 0,
                pButtonsIdx = [],
                newButtonsIdx = [],
                Positions = [],
                DefaultButtons = [];
            
            p = {x:cBd.viewBox.offsetLeft, y:cBd.viewBox.offsetTop};
            cBd.xyObjToPage(p, cBd.viewBox);
            cBdLeft = p.x;
            cBdTop = p.y;
                
            let s = VIEW.style;
            s.position = "absolute";
            s.left = p.x + "px";
            s.top = p.y + "px";
            s.width = cBd.viewBox.style.width;
            s.height = cBd.viewBox.style.height;
            s.zIndex = 9999;
            //s.background = "green";
    
            IFRAME.setAttribute("id", "exWindow");
            s = IFRAME.style;
            s.position = "absolute";
            s.left = 0;
            s.top = 0;
            s.width = cBd.viewBox.style.width;
            s.height = cBd.viewBox.style.height;
            s.border = `${sw/260}px solid black`;
            s.background = "white";
            VIEW.appendChild(IFRAME);
            
            s = TITLE.style;
            s.color = "black";
            s.background = "white";
            s.left = "0px";
            s.top = "0px";
            s.width = "100%";
            s.textAlign = "center";
            s.fontSize = ~~(cBd.width/25) + "px";
            s.lineHeight = ~~(cBd.width/10) + "px";
            IFRAME.appendChild(TITLE);
            TITLE.innerHTML = "点击添加按键";

            CLOSE_BUTTON.src = "./pic/close.svg";
            CLOSE_BUTTON.oncontextmenu = (event) => {
                event.preventDefault();
            };
            setButtonClick(CLOSE_BUTTON, close);
            s = CLOSE_BUTTON.style;
            let sz = cBd.width / 10 + "px";
            s.position = "absolute";
            s.left = cBd.width - parseInt(sz) + "px";
            s.top = "0px";
            s.width = sz;
            s.height = sz;
            s.opacity = "0.5";
            s.backgroundColor = "#c0c0c0";
            VIEW.appendChild(CLOSE_BUTTON);
            
            let divs = [];
            for(let i=0; i<50; i++){
                divs[i] = document.createElement("div");
            }
            
            function close(){
                VIEW.setAttribute("class", "hideEXWindow");
                VIEW.parentNode && setTimeout(() => VIEW.parentNode.removeChild(VIEW), 350);
                msgbox("是否保存更改?","保存",undefined,"取消",undefined)
                .then(function(rt) {
                    if(rt==window.MSG_ENTER){ // save change
                        pButtonsIdx.length = 0;
                        for(let i=0; i<newButtonsIdx.length; i++){
                            pButtonsIdx[i] = newButtonsIdx[i];
                        }
                    }
                    saveCmdSettings(settingsKey, pSettings);
                    loadCmdSettings(settingsKey, pSettings);
                    //showButtons(pButtonsIdx, Positions, DefaultButtons);
                })
                .then(function(){
                    let checkSettingButton = false
                    for(let i=0; i<pButtonsIdx.length; i++){
                        if(DefaultButtons[pButtonsIdx[i]]==cShownumTop){
                            checkSettingButton = true;
                            break;
                        }
                    }
                    !checkSettingButton && msgbox("你隐藏了设置按钮，还能长按棋盘弹出设置");
                })
            }
            
            function showDiv(left, top, div, but){
                let divStyle = div.style,
                    buttonStyle = but.button.style,
                    buttonDivStyle = but.div.style;
                divStyle.position = buttonStyle.position;
                divStyle.padding = buttonStyle.padding;
                divStyle.zIndex = buttonStyle.zIndex;
                divStyle.margin = buttonStyle.margin;
                divStyle.borderRadius = buttonStyle.borderRadius;
                divStyle.outline = buttonStyle.outline;
                divStyle.textAlign = buttonStyle.textAlign;
                divStyle.lineHeight = buttonStyle.lineHeight;
                divStyle.backgroundColor = buttonStyle.backgroundColor;
                divStyle.fontSize = buttonStyle.fontSize;
                divStyle.color = buttonStyle.color;
                divStyle.opacity = buttonStyle.opacity;
                
                divStyle.top = top + "px";
                divStyle.left = left + "px";
                divStyle.width = buttonDivStyle.width;
                divStyle.height = buttonDivStyle.height;
                divStyle.borderStyle = buttonDivStyle.borderStyle;
                divStyle.borderWidth = buttonDivStyle.borderWidth;
                divStyle.borderColor = buttonDivStyle.borderColor;
                
                div.innerHTML = but.text;
                //log(`${divStyle.left}, ${divStyle.top}`)
                IFRAME.appendChild(div);
            }
            
            function hideDiv(div){
                div.parentNode && div.parentNode.removeChild(div);
            }
            
            function hideAllDiv(){
                for(let i=0; i<divs.length; i++){
                    hideDiv(divs[i]);
                }
            }
            
            function showButton(position, button) {
                button.move(position.left, position.top);
            }
            
            function hideAllButton(buttons) {
                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].hide();
                }
            }
            /*
            function showButtons(buttonsIdx, positions, defaultButtons) {
                hideAllButton(defaultButtons);
                for (let i = 0; i < buttonsIdx.length; i++) {
                    showButton(positions[i], defaultButtons[buttonsIdx[i]]);
                }
            }
            */
            return function(key, settings){
                let positions = settings.positions,
                    defaultButtons = settings.defaultButtons,
                    buttonsIdx = settings.ButtonsIdx[settings.idx],
                    p = {x:renjuCmddiv.offsetLeft, y:renjuCmddiv.offsetTop};
                cBd.xyObjToPage(p, renjuCmddiv.parentNode);
                let paddingLeft = p.x - cBdLeft,
                    paddingTop = ~~(CLOSE_BUTTON.offsetTop + parseInt(CLOSE_BUTTON.style.height) * 1.5);
                settingsKey = key;
                pSettings = settings;
                pButtonsIdx = buttonsIdx;
                newButtonsIdx = [];
                Positions  = positions;
                DefaultButtons = defaultButtons;
                hideAllButton(defaultButtons);
                hideAllDiv();
                VIEW.setAttribute("class", "showEXWindow");
                document.body.appendChild(VIEW);
                for(let i=0; i<defaultButtons.length; i++){
                    let left = paddingLeft + parseInt(positions[i].left),
                        top = paddingTop + ~~(i / 4) * parseInt(defaultButtons[i].height) * 1.5;
                    showDiv(left, top, divs[i], defaultButtons[i]);
                    setButtonClick(divs[i],function(){
                        hideDiv(divs[i]);
                        showButton(positions[newButtonsIdx.length], defaultButtons[i]);
                        newButtonsIdx.push(i);
                    });
                }
            }
        })();
        
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
            const EX_WINDOW_LEFT = parseInt(renjuCmdSettings.positions[8].left) + p.x + "px";
            const EX_WINDOW_TOP = parseInt(renjuCmdSettings.positions[8].top) + p.y + "px";
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
                EX_WINDOW.setAttribute("class", "showEXWindow");
                document.body.appendChild(EX_WINDOW); //插入body内，保证a标签可以工作。因为renjuCmddiv.parentNode屏蔽了浏览器触摸click
            }

            function closeWindow() {
                IFRAME.innerHTML = "";
                EX_WINDOW.setAttribute("class", "hideEXWindow");
                if (EX_WINDOW.parentNode) setTimeout(()=>EX_WINDOW.parentNode.removeChild(EX_WINDOW),350);
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
                "lbTime": lbTime,
                "saveData": appData.saveData,
                "setBusy": setBusy
            });

            RenjuLib.reset({
                isBusy: isBusy,
                setBusy: setBusy,
                newGame: newGame,
                cBoard: cBd,
                getShowNum: getShowNum,
                setPlayModel: (model) => { playModel = model }
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
            cBd.viewBox.style.height = cBd.canvas.style.height;
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
                    cBd.viewBox.style.height = cBd.canvas.style.height;
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
            autoblackwhiteRadioChecked(cAddwhite2);
        });



        cPutBoard = new button(imgCmdDiv, "button", w * 2.66, t, w, h);
        cPutBoard.show();
        cPutBoard.setColor("black");
        cPutBoard.setText(" 摆入棋盘");
        cPutBoard.setontouchend(function() {
            if (cBd.SLTX == cBd.size && cBd.SLTY == cBd.size) {
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
            for (let i = 15 * 15 - 1; i >= 0; i--) cBd.P[i].cle();
        });
        
        t += h*1.5;

        cAddblack2 = new button(imgCmdDiv, "radio", w * 0, t, w, h);
        cAddblack2.show();
        cAddblack2.setText(` ${EMOJI_ROUND_BLACK} 棋`);
        cAddblack2.setontouchend(function() {
            autoblackwhiteRadioChecked(cAddblack2);
        });

        cAddwhite2 = new button(imgCmdDiv, "radio", w * 1.33, t, w, h);
        cAddwhite2.show();
        cAddwhite2.setText(` ${EMOJI_ROUND} 棋`);
        cAddwhite2.setontouchend(function() {
            autoblackwhiteRadioChecked(cAddwhite2);
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


        autoblackwhiteRadioChecked = setRadio([cAddblack2,cAddwhite2],function(){
            if (!cLockImg.checked) {
                lockImg();
                cLockImg.setChecked(1);
            }
        });
        
        
        for (let i = 0; i < 9; i++) {  // set positions
            if (i === 0) t = 0;
            else t += h * 1.5;
            for (let j = 0; j < 4; j++) {
                imgCmdSettings.positions.push({
                    left: w * j * 1.33,
                    top: t
                });
            }
        }
        imgCmdSettings.defaultButtons = [
            cLockImg,
            cAutoPut,
            cPutBoard,
            cCleAll,
            cAddblack2,
            cAddwhite2,
            cSLTX,
            cSLTY
            ];
        
        imgCmdSettings.ButtonsIdx[0] = [0,1,2,3,4,5,6,7];
        
        imgCmdSettings.idx = 0;
    
        moveButtons(imgCmdSettings);
        
         
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
                isCancelCanvasClick = false;
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

            setTimeout(() => { isCancelMenuClick = false; isCancelCanvasClick = false }, 250);
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
                    if (true || !cBd.isOut(tX, tY, cBd.viewBox))
                        evt.preventDefault(); // 屏蔽浏览器双击放大 && clickEvent
                    if ((bodyPreviousTouch.length > 0) &&
                        (Math.abs(bodyPreviousTouch[0].pageX - tX) < 30) &&
                        (Math.abs(bodyPreviousTouch[0].pageY - tY) < 30)
                    ) {
                        bodyPreviousTouch.length = 0;
                        /////////这里添加双击事件////////
                        //通过 isOut 模拟 canvas事件
                        if (!cBd.isOut(tX, tY, cBd.viewBox)) {
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
                        if (!cBd.isOut(tX, tY, cBd.viewBox)) {
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
            cBd.xyPageToObj(p, cBd.viewBox);
            canvasClick(p.x, p.y);
        }

        function bodyDblClick(x, y) {

            let p = { x: 0, y: 0 };
            x = event.type == "click" ? event.pageX : x;
            y = event.type == "click" ? event.pageY : y;
            cBd.xyPageToObj(p, cBd.viewBox);
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
            if (!cBd.isOut(x, y, cBd.viewBox)) {
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
            if(isCancelCanvasClick) return;
            //log(`event.button=${event.button}, typeof(x)=${typeof(x)}, x=${x}, y=${y}`);
            x = event.type == "click" ? event.pageX : x;
            y = event.type == "click" ? event.pageY : y;
            //log(`get=${playModel },ren=${MODEL_RENJU}`)
            if (playModel != MODEL_LOADIMG) {
                renjuClick(x, y);
            }
            else if (!cLockImg.checked) {
                if (cBd.isOut(x, y, cBd.viewBox)) return;
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
            let x = ~~(continueSetCutDivX);
            let y = ~~(continueSetCutDivY);
            let p = { x: x, y: y };
            if (!cBd.isOut(x, y, cBd.viewBox, ~~(cBd.width) / 17))
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

        if (isBusy()) return;
        let idx = cBd.getPIndex(x, y);
        if (playModel == MODEL_RENJU || playModel == MODEL_RENLIB) {
            if (idx > -1) {
                let cmds = getRenjuCmd();
                let arr = cBd.getPointArray([]);
                if (cBd.oldCode || playModel == MODEL_RENLIB) cmds.type = TYPE_NUMBER;
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
                        else if (cBd.P[idx].type == TYPE_EMPTY || ((cBd.oldCode || playModel == MODEL_RENLIB || cBd.P[idx].text == EMOJI_FOUL) && cBd.P[idx].type == TYPE_MARK)) {
                            // 添加棋子  wNb(idx,color,showNum)
                            let isF = cBd.size==15 ? isFoul(idx % 15, ~~(idx / 15), arr) : false;
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

        if (isBusy()) return;
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

        if (isBusy()) return;
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
            if(!cBd.isOut(x, y, cBd.viewBox, -~~(cBd.width/8))){
                cMenu.idx = idx;
                cMenu.showMenu(undefined, y - window.scrollY - cMenu.menu.fontSize * 2.5 * 3);
            }
            else{
                isCancelCanvasClick = !!(navigator.userAgent.indexOf("iPhone") + 1);
                scaleCBoard(cBd.scale==1, 1);
            }
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
                if (checkCommand(msgStr)) return;
                let str = msgStr.substr(0, 3);
                cBd.cleLb(idx); // 清除原来标记，打印用户选定的标记
                if (str != "" && str != " ") cBd.wLb(idx, str, color);
            },
            function(msgStr) { //用户取消，删除标记
                //cBd.clePoint(idx);
            });
    }



    function isBusy(loading = true) {
        let busy =  cCancelFind.div.parentNode; //!cLoadImg.div.parentNode || !cCutImage.div.parentNode || !cFindVCF.div.parentNode || !cFindPoint.div.parentNode;
        if (busy && loading) window._loading.open("busy", 1600);
        return busy;
    }

    function setBusy(value) {
        if (value) {
            for(let i=renjuCmdSettings.ButtonsIdx[renjuCmdSettings.idx].length - 1; i >= 0; i--){
                renjuCmdSettings.defaultButtons[renjuCmdSettings.ButtonsIdx[renjuCmdSettings.idx][i]].hide();
            }
            cCancelFind.move(renjuCmdSettings.positions[6].left, renjuCmdSettings.positions[6].top, renjuCmdSettings.defaultButtons[0].width, renjuCmdSettings.defaultButtons[0].height);
            lbTime.move(renjuCmdSettings.positions[5].left, renjuCmdSettings.positions[5].top, renjuCmdSettings.defaultButtons[0].width, renjuCmdSettings.defaultButtons[0].height, ~~(parseInt(renjuCmdSettings.defaultButtons[0].width) / 4) + "px");
        }
        else {
            moveButtons(renjuCmdSettings);
            cCancelFind.hide();
            lbTime.close()
        }
        window.blockUnload && window.blockUnload(value);
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
            imgWidth = ~~(imgWidth * 3 / 4);
            s = imgWindow.style;
            s.position = "relative";
            s.width = imgWidth + "px";
            s.height = imgWidth + "px";
            s.top = ~~((dh - imgWidth) / 2) + "px";
            s.left = ~~((dw - imgWidth) / 2) + "px";
            s.backgroundColor = "#666666";
            s.border = `0px solid `;

            let iWidth = ~~(imgWidth * 3 / 5);
            shareImg.src = cBd.canvas.toDataURL();
            s = shareImg.style;
            s.position = "absolute";
            s.width = iWidth + "px";
            s.height = iWidth + "px";
            s.top = ~~((imgWidth - iWidth) / 2) + "px";
            s.left = ~~((imgWidth - iWidth) / 2) + "px";
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

            let h = ~~((imgWidth - iWidth) / 2 / 2);
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
        "setPlayModel": (model) => { playModel = model },
        "renjuModel": MODEL_RENJU,
        "imgModel": MODEL_LOADIMG,
        "lineModel": MODEL_LINE_EDIT,
        "arrowModel": MODEL_ARROW_EDIT,
        "libModel": MODEL_RENLIB,
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
        "loadCmdSettings": loadCmdSettings
    };
})();