"use strict";
let engine = (() => {
    let maxThread = 4;
    let work = [];
    let works = [];
    let cObjVCF = {}; //{ arr: [], winMoves: [], color: 0, time: false }; // 保存VCF分支
    let cBd;
    let cVCF;
    let cFP;
    let cCancel;
    let labelTime;
    let closeMsg;
    let closeNoSleep;
    let saveContinueData;
    let save = {};
    let tree = null;
    let oldTree = null;
    let oldCode = "";
    let treeKeyMap = new Map();
    let threePoints = null;
    let oldThreePoints = null;
    let removeTree = () => {
        oldTree = cBd.oldCode == "" ? null : cBd.tree;
        oldCode = cBd.oldCode;
        cBd.oldCode = "";
        cBd.tree = new cBd.node();
        cBd.cleLb("all");
    };
    let addOldTree = (oldTree) => {
        if (oldTree) {
            cBd.oldCode = oldCode;
            cBd.tree = oldTree;
        }
    };
    let cleThreePoints = () => {
        oldThreePoints = cBd.threePoints;
        cBd.cleThreePoints();
        cBd.cleLb("all");
    };
    let addThreePoint = (oldThreePoints) => {
        if (oldThreePoints && oldThreePoints.arr) {
            cBd.threePoints = oldThreePoints;
            for (let i = cBd.threePoints.points.length - 1; i >= 0; i--) {
                if (cBd.threePoints.points[i]) {
                    cBd.wLb(i, cBd.threePoints.points[i].txt, cBd.threePoints.points[i].txtColor, undefined, false);
                }
            }
        }
    };
    let setCmd = () => { //calculate start
        //msg ("","msgbox",0,cBd.height,dw+8,dh-cBd.height,"停止计算",null,
        //  cancelFind,null,null,"auto");
        cFP.hide();
        cVCF.hide();
        removeTree();
        cleThreePoints();
        cBd.showFoul(false, true);
        cBd.removeMarkArrow("all");
        cBd.removeMarkLine("all");
        cBd.removeMarkLine(cBd.autoLines);
        let but = cVCF;
        cCancel.move(but.left, but.top, but.width, but.height);
        let lb = cFP;
        labelTime.move(lb.left, lb.top, lb.width, lb.height, parseInt(parseInt(lb.width) / 4) + "px");
        openNoSleep();
        tree = null;
        treeKeyMap = new Map();
        threePoints = null;
    };
    let callback = () => { // calculate end
        if (work && typeof(work.terminate) == "function") { work.terminate();
            work = null }
        for (let i = 0; i < works.length; i++) { if (works[i] && works[i].terminate) { works[i].terminate();
                works[i] = null; } }
        cBd.cleSearchPoint();
        let isShowLabel;
        if (tree) {
            tree.keyMap = treeKeyMap;
            cBd.addTree(tree);
            tree = null;
            treeKeyMap = new Map();
            isShowLabel = true;
        }
        if (threePoints) {
            cBd.threePoints = threePoints;
            threePoints = null;
            isShowLabel = true;
        }
        cFP.show();
        cFP.setText("找点");
        cVCF.show();
        cVCF.setText("解题");
        /*
        cBd.refreshMarkLine("all");
        cBd.refreshMarkArrow("all");
        cBd.autoShow();
        */
        cCancel.hide();
        labelTime.close();
        closeMsg();
        saveContinueData();
        closeNoSleep();
        if (isShowLabel) msgbox("点击标记 展开分支 点击 [<<] 可以退出", undefined, undefined, undefined, undefined, 0);
    };
    let printMsg = () => {
        let fclr = cObjVCF.color == 1 ? "黑棋" : "白棋";
        //console.log(cObjVCF.winMoves)
        if (cObjVCF.winMoves.length) {
            msgbox("✔ " + fclr + " 找到 " + cObjVCF.winMoves.length + "套 VCF,用时 " + cObjVCF.time + "秒", undefined, undefined, undefined, undefined, 0);
        }
        else {
            msgbox("❌❌❌ " + fclr + " 查找VCF失败了❌❌❌", undefined, undefined, undefined, undefined, 0);
        }
    };
    let cleLb = (idx) => {
        cBd.cleLb(idx, false);
    }
    let wLb = (idx, text, color) => {
        cBd.wLb(idx, text, color, null, false);
    }
    let createWork = (commands) => {

        let defaultCmd = {
            "showLabel": (p) => {
                showLabel.show(p[0],p[1]);
                //msgbox(p[0], undefined, undefined, undefined, undefined, 0, p[1]);
            },
            "vConsole": (p) => { console.log(p) },
            "cleLb": (p) => { cleLb(p[0]); },
            "wLb": (p) => { wLb(p[0], p[1], p[2]); },
            "printMoves": (p) => { cBd.printMoves(p[0], p[1]); },
            "printSearchPoint": (p) => { cBd.printSearchPoint(0, p[0], p[1], p[2]); },
        }
        for (let cmd in commands) { // add commands
            defaultCmd[cmd] = commands[cmd];
        }
        let wk = new Worker("./script/worker-0515.js");
        wk.onmessage = (e) => {
            labelTime.setPrePostTimer(new Date().getTime());
            let cmd = e.data.cmd;
            let p = e.data.parameter;
            let f = defaultCmd;
            //console.log(cmd);
            wk.onerror = () => {
                alert(`${cmd} worker error`);
                wk.terminate();
                wk = null;
            };
            if (typeof(f[cmd]) == "function") f[cmd](p);
        };

        return wk;
    };
    
    function label() {
        this.isShowLabel = true;
    }
    label.prototype.show = function (txt, timer) {
        if (!this.isShowLabel) return;
        this.isShowLabel = false;
        msgbox(txt, undefined, undefined, undefined, undefined, 0, timer);
        let lb = this;
        setTimeout(()=>{lb.isShowLabel = true;},1500);
    };
    let showLabel = new label();

    return {
        reset: (param) => {
            maxThread = param.maxThread;
            cObjVCF = param.cObjVCF;
            cBd = param.cBoard;
            cVCF = param.cFindVCF;
            cFP = param.cFindPoint;
            cCancel = param.cCancelFind;
            labelTime = param.lbTime;
            msg = param.msg;
            closeMsg = param.closeMsg;
            closeNoSleep = param.closeNoSleep;
            saveContinueData = param.saveContinueData;
            save = param.saveData;
        },
        postMsg: (cmd, param) => {
            //console.log(cmd);
            let cmdList = {
                "cancelFind": () => {
                    //if (work && typeof(work.terminate) == "function") work.terminate();
                    //for (let i = 0; i < works.length; i++) works[i].terminate();
                    for (let i = cBd.SLTX * cBd.SLTY - 1; i >= 0; i--) {
                        if (typeof(cBd.P[i].text) == "number" || cBd.P[i].text == "●" || cBd.P[i].text == "⊙") {
                            cleLb(i);
                        }
                    }
                    callback();
                },
                "findThreePoint": () => {
                    let newarr = getArr([]);
                    addThreePoint(oldThreePoints);
                    findThreePoint(param[0], param[1], newarr, param[3]);
                    cBd.printArray(newarr, "③", param[3] == onlyFree ? "red" : "black");
                    callback();
                },
                "findTTPoint": () => {
                    addThreePoint(oldThreePoints);
                    let newarr = getArr([]);
                    findTTPoint(param[0], 1, newarr);
                    cBd.printArray(newarr, "❌", "red");
                    callback();
                },
                "findFFPoint": () => {
                    addThreePoint(oldThreePoints);
                    let newarr = getArr([]);
                    findFFPoint(param[0], 1, newarr);
                    cBd.printArray(newarr, "❌", "red");
                    callback();
                },
                "findSixPoint": () => {
                    addThreePoint(oldThreePoints);
                    let newarr = getArr([]);
                    findSixPoint(param[0], 1, newarr, param[3]);
                    cBd.printArray(newarr, "❌", "red");
                    callback();
                },
                "findFoulPoint": () => {
                    addThreePoint(oldThreePoints);
                    let newarr = getArr([]);
                    findFoulPoint(param[0], newarr, param[3]);
                    cBd.printArray(newarr, "❌", "red");
                    callback();
                },
                "findFivePoint": () => {
                    addThreePoint(oldThreePoints);
                    let newarr = getArr([]);
                    findFivePoint(param[0], param[1], newarr, param[3]);
                    cBd.printArray(newarr, "⑤", "red");
                    callback();
                },
                "findFourPoint": () => {
                    addThreePoint(oldThreePoints);
                    let newarr = getArr([]);
                    findFourPoint(param[0], param[1], newarr, param[3]);
                    cBd.printArray(newarr, "④", param[3] == onlyFree ? "red" : "black");
                    callback();
                },
                "vctSelectPoint": () => {
                    //threePoints = null;
                    let arr = param[1];
                    let color = param[0];
                    cBd.cleLb("all");
                    let lvl;
                    work = createWork({
                        "getLevelB_End": (p) => {
                            lvl = p[0];
                            continuefun();
                        },
                        "addThreePoint": (p) => {
                            if (!threePoints) {
                                threePoints = {};
                                threePoints.arr = arr;
                                threePoints.color = color;
                                threePoints.points = [];
                                threePoints.index = -1;
                            }
                            threePoints.points[p[0]] = p[1];
                        },
                        "printSearchPoint": (p) => { cBd.printSearchPoint(0, p[0], p[1], p[2]); },
                        "vctSelectPoint_End": (p) => {
                            /*if (threePoints) {
                                //console.log(threePoints)
                                cBd.threePoints = threePoints;
                                threePoints = null;
                            }*/
                            callback();
                            //work.terminate();
                        },
                    });
                    work.postMessage({ "cmd": "getLevelB", parameter: [param[1], param[0], getArr([])] });
                    let continuefun = () => {
                        if (lvl.level >= 4) {
                            let newarr = getArr([]);
                            findFivePoint(param[1], param[0], newarr, param[3]);
                            cBd.printArray(newarr, "⑤", "red");
                            callback();
                            msgbox(`${param[0]==1?"黑棋" : "白棋"} 有五连点`, undefined, undefined, undefined, undefined, 0);
                        }
                        else if (lvl.level >= 3) {
                            cBd.printMoves(lvl.moves, param[0]);
                            callback();
                            msgbox(`${param[0]==1?"黑棋" : "白棋"} 有 ${lvl.moves.length>3?"VCF":lvl.moves.length>1?`${param[0]==1?"43杀":"43杀(冲4再44,冲4冲4抓)"}`:`${param[0]==1?"活四":"活四(44,冲4抓)"}`}`, undefined, undefined, undefined, undefined, 0);
                        }
                        else {
                            work.postMessage({ "cmd": cmd, parameter: param });
                        }
                    };
                },
                "findVCT": () => {
                    //tree = null;
                    //treeKeyMap = new Map();
                    let arr = param[0];
                    let color = param[1];
                    work = createWork({
                        "findVCT_End": (p) => {
                            tree = p[0];
                            /*if (tree) {
                                //console.log(tree);
                                tree.keyMap = treeKeyMap;
                                cBd.addTree(tree);
                                tree = null;
                                treeKeyMap = new Map();
                            }*/
                            callback();
                            //work.terminate();
                        },
                    });
                    work.postMessage({ "cmd": cmd, parameter: [param[0], param[1], param[2], param[3], param[4], param[5]] });
                },
                "blockCatchFoul": () => {
                    //tree = null;
                    //treeKeyMap = new Map();
                    let lvl;
                    work = createWork({
                        "addTree": (p) => {
                            if (tree) {
                                tree.childNode.push(p[0].childNode[0]);
                            }
                            else {
                                tree = p[0];
                            }
                        },
                        "getLevelB_End": (p) => {
                            lvl = p[0];
                            continuefun();
                        },
                        "blockCatchFoul_End": (p) => {
                            /*if (tree) {
                                tree.keyMap = treeKeyMap;
                                cBd.addTree(tree);
                                tree = null;
                                treeKeyMap = new Map();
                            }*/
                            callback();
                            //work.terminate();
                            if (p[0] == -1) {
                                msgbox("❌❌❌ 没有找到冲四抓禁 ❌❌❌", undefined, undefined, undefined, undefined, 0);
                            }
                            else if (p[0] == 0) {
                                msgbox("❌❌❌ 没有成立的解禁点 ❌❌❌", undefined, undefined, undefined, undefined, 0);
                            }
                        },
                    });
                    work.postMessage({ "cmd": "getLevelB", parameter: [param[0], 1, getArr([])] });
                    let continuefun = () => {
                        if (lvl.level >= 4) {
                            let newarr = getArr([]);
                            findFivePoint(param[0], 1, newarr);
                            cBd.printArray(newarr, "⑤", "red");
                            callback();
                            msgbox(`${"黑棋"} 有五连点`, undefined, undefined, undefined, undefined, 0);
                        }
                        else if (lvl.level >= 3) {
                            cBd.printMoves(lvl.moves, 1);
                            callback();
                            msgbox(`${"黑棋"} 有 ${lvl.moves.length>3?"VCF":lvl.moves.length>1?`${"43杀"}`:`${"活四"}`}`, undefined, undefined, undefined, undefined, 0);
                        }
                        else {
                            work.postMessage({ "cmd": cmd, parameter: param });
                        }
                    };
                },
                "findVCF": () => {
                    work = createWork({
                        "findVCF_addVCF": (p) => {
                            cObjVCF.arr = copyArr([], p[3]);
                            cObjVCF.winMoves = [];
                            cObjVCF.color = p[1];
                            cObjVCF.time = p[2];
                            for (let i = 0; i < p[0].length; i++) {
                                cObjVCF.winMoves.push(p[0][i].slice(0));
                            }
                        },
                        "findVCF_End": (p) => {
                            cObjVCF.arr = copyArr([], p[3]);
                            cObjVCF.winMoves = [];
                            cObjVCF.color = p[1];
                            cObjVCF.time = p[2];
                            for (let i = 0; i < p[0].length; i++) {
                                cObjVCF.winMoves.push(p[0][i].slice(0));
                            }
                            cleLb("all");
                            addOldTree(oldTree);
                            if (cObjVCF.winMoves.length) setTimeout(() => { cBd.printMoves(cObjVCF.winMoves[0], cObjVCF.color); }, 1100);
                            callback();
                            printMsg();
                            //work.terminate();
                        },
                        "saveContinueData": (p) => {
                            //console.log(p[0]);
                            saveContinueData(p[0], p[1] ? cBd : null);
                        },
                    });
                    work.postMessage({ "cmd": cmd, parameter: param });
                },
                "isTwoVCF": () => {
                    /*tree = null;
                    treeKeyMap = new Map();
                    threePoints = null;*/
                    let color = param[0];
                    let arr = param[1];
                    let newarr = param[2];
                    let level1, level2;
                    work = createWork({
                        "getLevelB_End": (p) => {
                            if (level1 == undefined) {
                                level1 = p[0];
                                work.postMessage({ "cmd": "getLevelB", parameter: [arr, color, getArr([]), null, 1] });
                            }
                            else if (level2 == undefined) {
                                level2 = p[0];
                                if (level1.level >= 3) {
                                    let str = `${color == 1 ? "黑棋" : "白棋"} ${`${level1.level>=4 ? "进攻级别 >= 冲4" : param[3]==onlySimpleWin?"进攻级别 >= 43杀":"进攻级别 >= 活3" },\n继续计算可能会得到错误的结果`}`;
                                    if (cmd == "isLevelThreePoint") {
                                        if (param[3] == onlySimpleWin && (level2.level < 3)) {
                                            postMsg();
                                        }
                                        else {
                                            opMsg(str);
                                        }
                                    }
                                    else if (cmd == "isTwoVCF") {
                                        opMsg(str);
                                    }
                                    else {
                                        if (level1.level >= 4) {
                                            opMsg(str);
                                        }
                                        else {
                                            postMsg();
                                        }
                                    }
                                }
                                else {
                                    postMsg();
                                }
                            }
                        },
                        "selectPoint_End": (p) => {
                            labelTime.setPrePostTimer(new Date().getTime());
                            newarr = p[0];
                            continuefun();
                            //work.terminate();
                        },
                    });
                    console.log(work);
                    work.postMessage({ "cmd": "getLevelB", parameter: [arr, color, getArr([])] });
                    let lvl = (cmd == "isLevelThreePoint") ? { level: 2 } : null;
                    let selFour = (cmd != "isLevelThreePoint" && cmd != "isTwoVCF");
                    let opMsg = (str) => {
                        msg(str, "msgbox", null, null, null, null, "继续", null,
                            function(msgStr) {
                                postMsg();
                            },
                            function() {
                                //work.terminate();
                                callback();
                            }, 2, 2);
                    }
                    let postMsg = () => {
                        work.postMessage({ "cmd": "selectPoint", parameter: [arr, color, newarr, null, null, true, lvl, null, null, selFour] });
                    };

                    //selectPoint(arr, color, newarr, null, null, true, { level: 2 });
                    let continuefun = () => {
                        if (cmd == "isTwoVCF") findThreePoint(arr, color, newarr, onlyFree, -9999); //排除活三
                        let sPoint = [];
                        let pnt = aroundPoint[112];
                        for (let i = 0; i < 225; i++) {
                            let x = pnt.point[i].x;
                            let y = pnt.point[i].y;
                            if (newarr[y][x] == 0) {
                                sPoint.push(y * 15 + x);
                                wLb(y * 15 + x, "●", "#888888");
                            }
                            else {
                                cleLb(y * 15 + x);
                            }
                        }
                        //console.log(sPoint);
                        if (sPoint.length == 0) { callback(); return; };

                        let workCount = 0;
                        for (let i = 0; i < maxThread; i++) {
                            if (sPoint.length) {
                                console.log(works[i]);
                                works[i] = createWork({
                                    "addTree": (p) => {
                                        if (tree) {
                                            tree.childNode.push(p[0].childNode[0]);
                                        }
                                        else {
                                            tree = p[0];
                                        }
                                    },
                                    "addTreeKeyMap": (p) => {
                                        treeKeyMap.set(p[0], p[1]);
                                        //console.log(p[1]);
                                    },
                                    "addThreePoint": (p) => {
                                        if (!threePoints) {
                                            threePoints = {};
                                            threePoints.arr = arr;
                                            threePoints.color = color;
                                            threePoints.points = [];
                                            threePoints.index = -1;
                                        }
                                        threePoints.points[p[0]] = p[1];
                                    },
                                    "printSearchPoint": (p) => { cBd.printSearchPoint(i, p[0], p[1], p[2]); },
                                    /*
                                    "wLb": (p) => {
                                        cBd.printSearchPoint(i);
                                        wLb(p[0], p[1], p[2]);
                                    },
                                    */
                                    "end": (p) => {
                                        let idx = sPoint.length ? sPoint.splice(0, 1)[0] : -1;
                                        if (idx > -1) {
                                            cBd.printSearchPoint(i, idx, "⊙", "green");
                                            works[i].postMessage({ "cmd": cmd, parameter: [idx, param[0], param[1], param[3], param[4], param[5], param[6]] });
                                        }
                                        else {
                                            //works[i].terminate();
                                            cBd.printSearchPoint(i);
                                            workCount--;
                                            if (workCount == 0) {
                                                /*if (tree) {
                                                    tree.keyMap = treeKeyMap;
                                                    cBd.addTree(tree);
                                                    tree = null;
                                                    treeKeyMap = new Map();
                                                }
                                                if (threePoints) {
                                                    //console.log(threePoints)
                                                    cBd.threePoints = threePoints;
                                                    threePoints = null;
                                                }*/
                                                callback();
                                            }
                                        }
                                    },
                                });
                                workCount++;

                                let idx = sPoint.splice(0, 1)[0];
                                cBd.printSearchPoint(i, idx, "⊙", "green");;
                                works[i].postMessage({ "cmd": cmd, parameter: [idx, param[0], param[1], param[3], param[4], param[5], param[6]] });
                            }
                        }
                    };
                },
                "getBlockVCF": () => {
                    let sPoint = [];
                    work = createWork({
                        "findVCF_End": (p) => {
                            let fclr = p[1] == 1 ? "黑棋" : "白棋";
                            cleLb("all");
                            if (p[0].length) {
                                msgbox(fclr + "找到VCF，开始分析防点...... ", undefined, undefined, undefined, undefined, 0);
                            }
                            else {
                                //work.terminate();
                                callback();
                                msgbox("❌❌❌ " + fclr + " 没有VCF ❌❌❌", undefined, undefined, undefined, undefined, 0);
                            }
                        },
                        "getBlockVCF_End": (p) => {
                            closeMsg();
                            //work.terminate();
                            callback();
                            sPoint = p[0];
                            if (sPoint.length) {

                            }
                            else {
                                callback();
                                msgbox("❌❌❌没有成立的防点❌❌❌", undefined, undefined, undefined, undefined, 0);
                            }
                        },
                    });

                    work.postMessage({ "cmd": cmd, parameter: [param[0], param[1], 1, null, null, null] });

                },
                "getBlockVCFb": () => {
                    let sPoint = [];
                    work = createWork({
                        "findVCF_End": (p) => {
                            let fclr = p[1] == 1 ? "黑棋" : "白棋";
                            cleLb("all");
                            if (p[0].length) {
                                msgbox(fclr + "找到VCF，开始分析防点...... ", undefined, undefined, undefined, undefined, 0);
                            }
                            else {
                                //work.terminate();
                                callback();
                                msgbox("❌❌❌ " + fclr + " 没有VCF ❌❌❌", undefined, undefined, undefined, undefined, 0);
                            }
                        },
                        "getBlockVCFb_End": (p) => {
                            let fclr = p[1] == 1 ? "黑棋" : "白棋";
                            closeMsg();
                            //work.terminate();
                            sPoint = p[0];
                            if (sPoint.length) {
                                //console.log("sPoint = " + sPoint);
                                for (let i = 0; i < sPoint.length; i++) {
                                    wLb(sPoint[i], "●", "#888888");
                                }
                                msgbox(fclr + "开始验证防点...... ", undefined, undefined, undefined, undefined, 0);
                                excludeBP("isBlockVCF");
                            }
                            else {
                                callback();
                                msgbox("❌❌❌没有成立的防点❌❌❌", undefined, undefined, undefined, undefined, 0);
                            }
                        },
                    });

                    work.postMessage({ "cmd": cmd, parameter: [param[0], param[1], 1, null, null, null] });

                    let excludeBP = (cmd) => {
                        let workCount = 0;
                        for (let i = 0; i < maxThread; i++) {
                            if (sPoint.length) {
                                works[i] = createWork({
                                    "printSearchPoint": (p) => { cBd.printSearchPoint(i, p[0], p[1], p[2]); },
                                    /*
                                    "wLb": (p) => {
                                        //cBd.printSearchPoint(i);
                                        wLb(p[0], p[1], p[2]);
                                    },
                                    */
                                    "end": (p) => {
                                        let idx = sPoint.length ? sPoint.splice(0, 1)[0] : -1;
                                        if (idx > -1) {
                                            cBd.printSearchPoint(i, idx, "⊙", "green");
                                            works[i].postMessage({ "cmd": cmd, parameter: [idx, param[1], param[0], param[3], param[4], param[5], param[6]] });
                                        }
                                        else {
                                            //works[i].terminate();
                                            cBd.printSearchPoint(i);
                                            workCount--;
                                            if (workCount == 0) {
                                                callback();
                                            }
                                        }
                                    },
                                });
                                workCount++;
                                let idx = sPoint.splice(0, 1)[0];
                                cBd.printSearchPoint(i, idx, "⊙", "green");
                                works[i].postMessage({ "cmd": cmd, parameter: [idx, param[1], param[0], param[3], param[4], param[5], param[6]] });
                            }
                        }

                    }
                },
                "getBlockVCFTree": () => {
                    //tree = new Node();
                    let paths = [];
                    work = createWork({
                        "findVCF_End": (p) => {
                            let fclr = p[1] == 1 ? "黑棋" : "白棋";
                            cleLb("all");
                            if (p[0].length) {
                                msgbox(fclr + "找到VCF，开始分析防点...... ", undefined, undefined, undefined, undefined, 0);
                            }
                            else {
                                //work.terminate();
                                callback();
                                msgbox("❌❌❌ " + fclr + " 没有VCF ❌❌❌", undefined, undefined, undefined, undefined, 0);
                            }
                        },
                        "getBlockVCFTree_End": (p) => {
                            let fclr = p[1] == 1 ? "黑棋" : "白棋";
                            closeMsg();
                            //work.terminate();
                            paths = p[0];
                            //console.log(paths.length)
                            if (paths.length) {
                                for (let i = 0; i < paths.length; i++) {
                                    wLb(paths[i][0], "●", "#888888");
                                }
                                msgbox(fclr + "开始验证防点...... ", undefined, undefined, undefined, undefined, 0);
                                excludePath("isBlockVCFPath");
                            }
                            else {
                                callback();
                                msgbox("❌❌❌没有成立的防点❌❌❌", undefined, undefined, undefined, undefined, 0);
                            }
                        },
                    });

                    work.postMessage({ "cmd": cmd, parameter: [param[0], param[1], 1, null, null, null] });

                    let excludePath = (cmd) => {
                        let pathsLength = paths.length;
                        let workCount = 0;
                        for (let i = 0; i < maxThread; i++) {
                            if (paths.length) {
                                works[i] = createWork({
                                    "printSearchPoint": (p) => { cBd.printSearchPoint(i, p[0], p[1], p[2]); },
                                    /*
                                    "wLb": (p) => {
                                        //cBd.printSearchPoint(i);
                                        wLb(p[0], p[1], p[2]);
                                    },
                                    */
                                    "end": (p) => {
                                        if (p[0].length) {
                                            //console.log(`blockPath___>> ${p[0]}`)
                                            if (!tree) { tree = new Node();
                                                tree.firstColor = param[1] == 2 ? "black" : "white"; }
                                            for (let i = p[0].length - 1; i >= 0; i--) {
                                                let nd = movesToNode(p[0][i], tree);
                                                nd.txt = "○";
                                                let pNode = nd.parentNode;

                                                while (pNode && pNode != tree) {
                                                    if (pNode.txt) break;
                                                    pNode.txt = "○";
                                                    pNode = pNode.parentNode;
                                                }
                                            }
                                        }
                                        let path = paths.length ? paths.splice(0, 1)[0] : false;
                                        if (path) {
                                            cBd.printSearchPoint(i, path[0], "⊙", "green");
                                            works[i].postMessage({ "cmd": cmd, parameter: [path, param[1], param[0], param[3], `${pathsLength-paths.length}/${pathsLength}`, param[5], param[6]] });
                                        }
                                        else {
                                            //works[i].terminate();
                                            cBd.printSearchPoint(i);
                                            workCount--;
                                            console.log(`-${i}`)
                                            if (workCount == 0) {
                                                /*if (tree.childNode.length) {
                                                    tree.keyMap = treeKeyMap;
                                                    tree.firstColor = param[1] == 2 ? "black" : "white";
                                                    cBd.addTree(tree);
                                                    tree = null;
                                                    treeKeyMap = new Map();
                                                }*/
                                                callback();
                                            }
                                        }
                                    },
                                });
                                workCount++;
                                let path = paths.splice(0, 1)[0];
                                cBd.printSearchPoint(i, path[0], "⊙", "green");
                                works[i].postMessage({ "cmd": cmd, parameter: [path, param[1], param[0], param[3], `${pathsLength-paths.length}/${pathsLength}`, param[5], param[6]] });
                            }
                        }

                    }

                },
                "default": () => {
                    work = createWork();
                    work.postMessage({ "cmd": cmd, parameter: param });
                },
            };
            cmdList.isFourWinPoint = cmdList.isThreeWinPoint = cmdList.isLevelThreePoint = cmdList.isSimpleWin = cmdList.isTwoVCF;
            save(cBd);
            if (cmd != "cancelFind") setCmd();
            typeof(cmdList[cmd]) == "function" ? (cmdList[cmd]()) : (cmdList["default"]());
        },
    };

})();
