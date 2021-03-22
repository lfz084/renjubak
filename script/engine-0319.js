"use strict";
let engine = (() => {
    let maxThread = 4;
    let work = [];
    let works = [];
    let cObjVCF = { arr: [], winMoves: [], color: 0, time: false }; // 保存VCF分支
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
    let setCmd = () => { //calculate start
        //msg ("","msgbox",0,cBd.height,dw+8,dh-cBd.height,"停止计算",null,
        //  cancelFind,null,null,"auto");
        cFP.hide();
        cVCF.hide();
        cBd.removeMarkLine(cBd.autoLines);
        let but = cVCF;
        cCancel.move(but.left, but.top, but.width, but.height);
        let lb = cFP;
        labelTime.move(lb.left, lb.top, lb.width, lb.height, parseInt(parseInt(lb.width) / 4) + "px");
        openNoSleep();
    };
    let callback = () => { // calculate end
        cFP.show();
        cFP.setText("找点");
        cVCF.show();
        cVCF.setText("解题");
        cBd.refreshMarkLine("all");
        cBd.refreshMarkArrow("all");
        cBd.autoShow();
        cCancel.hide();
        labelTime.close();
        closeMsg();
        saveContinueData();
        closeNoSleep();
    };
    let printMsg = () => {
        let fclr = cObjVCF.color == 1 ? "黑棋" : "白棋";
        //console.log(cObjVCF.winMoves)
        if (cObjVCF.winMoves.length) {
            msg("✔ " + fclr + " 找到 " + cObjVCF.winMoves.length + "套 VCF,用时 " + cObjVCF.time + "秒");
        }
        else {
            msg("❌❌❌ " + fclr + " 查找VCF失败了❌❌❌");
        }
    };
    let cleLb = (idx) => {
        cBd.cleLb(idx, false);
        /*
        if (typeof(idx) == "string" && idx == "all") {
            for (let i = 0; i < cBd.SLTX * cBd.SLTY; i++) {
                if (cBd.P[i].type == tLb || cBd.P[i].type == tLbMoves) {
                    cBd.P[idx].cle();
                    cBd.clePointB(idx);
                    //refreshLine.call(cBd, i);
                }
            }
        }
        else {
            if (cBd.P[idx].type == tLb || cBd.P[idx].type == tLbMoves) {
                cBd.P[idx].cle();
                cBd.clePointB(idx);
                //refreshLine.call(cBd, idx);
            }
        }
        */
    }
    let wLb = (idx, text, color) => {
        cBd.wLb(idx, text, color, null, false);
        /*
        if (idx < 0) return;
        if (cBd.P[idx].type != tEmpty) {
            if (cBd.P[idx].type == tLb || cBd.P[idx].type == tLbMoves) {
                cBd.P[idx].cle();
                cBd.clePointB(idx);
            }
            else {
                cBd.P[idx].cle();
                cBd.clePointB(idx);
            }
        }
        cBd.P[idx].color = color;
        cBd.P[idx].bkColor = null;
        cBd.P[idx].type = tLb;
        cBd.P[idx].text = text;
        //cBd.refreshMarkLine(idx);
        cBd.printPointB(idx, cBd.P[idx].text, cBd.P[idx].color, null, null, cBd.P[idx].bkColor);
        cBd.refreshMarkArrow(idx);
        */
    }
    let createWork = (commands) => {

        let defaultCmd = {
            "vConsole": (p) => { console.log(p) },
            "cleLb": (p) => { cleLb(p[0]); },
            "wLb": (p) => { wLb(p[0], p[1], p[2]); },
            "printMoves": (p) => { cBd.printMoves(p[0], p[1]); },
        }
        for (let cmd in commands) { // add commands
            defaultCmd[cmd] = commands[cmd];
        }
        let wk = new Worker("./script/worker-0315.js");
        wk.onmessage = (e) => {
            labelTime.setPrePostTimer(new Date().getTime());
            let cmd = e.data.cmd;
            let p = e.data.parameter;
            let f = defaultCmd;
            wk.onerror = () => {
                alert(`${cmd} worker error`);
            };
            //console.log(cmd);
            if (typeof(f[cmd]) == "function") f[cmd](p);
        };
        return wk;
    };

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
                    if (work && typeof(work.terminate) == "function") work.terminate();
                    for (let i = 0; i < works.length; i++) works[i].terminate();
                    for (let i = cBd.SLTX * cBd.SLTY - 1; i >= 0; i--) {
                        if (typeof(cBd.P[i].text) == "number" || cBd.P[i].text == "●" || cBd.P[i].text == "⊙") {
                            cleLb(i);
                        }
                    }
                    if (tree) {
                        cBd.addTree(tree);
                        tree = null;
                    }
                    callback();
                },
                "findThreePoint": () => {
                    let newarr = getArr([]);
                    findThreePoint(param[0], param[1], newarr, param[3]);
                    cBd.printArray(newarr, "③", param[3] == onlyFree ? "red" : "black");
                    callback();
                },
                "findTTPoint": () => {
                    let newarr = getArr([]);
                    findTTPoint(param[0], 1, newarr);
                    cBd.printArray(newarr, "❌", "red");
                    callback();
                },
                "findFFPoint": () => {
                    let newarr = getArr([]);
                    findFFPoint(param[0], 1, newarr);
                    cBd.printArray(newarr, "❌", "red");
                    callback();
                },
                "findSixPoint": () => {
                    let newarr = getArr([]);
                    findSixPoint(param[0], 1, newarr, param[3]);
                    cBd.printArray(newarr, "❌", "red");
                    callback();
                },
                "findFoulPoint": () => {
                    let newarr = getArr([]);
                    findFoulPoint(param[0], newarr, param[3]);
                    cBd.printArray(newarr, "❌", "red");
                    callback();
                },
                "findFivePoint": () => {
                    let newarr = getArr([]);
                    findFivePoint(param[0], param[1], newarr, param[3]);
                    cBd.printArray(newarr, "⑤", "red");
                    callback();
                },
                "findFourPoint": () => {
                    let newarr = getArr([]);
                    findFourPoint(param[0], param[1], newarr, param[3]);
                    cBd.printArray(newarr, "④", param[3] == onlyFree ? "red" : "black");
                    callback();
                },
                "vctSelectPoint": () => {
                    work = createWork({
                        "printSearchPoint": (p) => { cBd.printSearchPoint(0, p[0], p[1], p[2]); },
                        "vctSelectPointEnd": (p) => {
                            callback();
                            work.terminate();
                        },
                    });
                    work.postMessage({ "cmd": cmd, parameter: param });
                },
                "findVCT": () => {
                    tree = null;
                    let arr = param[0];
                    let color = param[1];
                    work = createWork({
                        "findVCT_End": (p) => {
                            tree = p[0];
                            if (tree) {
                                //console.log(tree);
                                cBd.addTree(tree);
                                tree = null;
                            }
                            callback();
                            work.terminate();
                        },
                    });
                    work.postMessage({ "cmd": cmd, parameter: [param[0], param[1], param[2], param[3], param[4], param[5]] });
                },
                "blockCatchFoul": () => {
                    work = createWork({
                        "blockCatchFoul_End": (p) => {
                            callback();
                            work.terminate();
                            if (p[0] == -1) {
                                msg("❌❌❌ 没有找到冲四抓禁 ❌❌❌");
                            }
                            else if (p[0] == 0) {
                                msg("❌❌❌ 没有成立的解禁点 ❌❌❌");
                            }
                        },
                    });
                    work.postMessage({ "cmd": cmd, parameter: param });
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
                            if (cObjVCF.winMoves.length) setTimeout(() => { cBd.printMoves(cObjVCF.winMoves[0], cObjVCF.color); }, 1100);
                            callback();
                            printMsg();
                            work.terminate();
                        },
                        "saveContinueData": (p) => {
                            //console.log(p[0]);
                            saveContinueData(p[0], p[1] ? cBd : null);
                        },
                    });
                    work.postMessage({ "cmd": cmd, parameter: param });
                },
                "isTwoVCF": () => {
                    tree = null;
                    let color = param[0];
                    let arr = param[1];
                    let newarr = param[2];
                    work = createWork();
                    work.onmessage = (e) => {
                        labelTime.setPrePostTimer(new Date().getTime());
                        newarr = e.data.parameter[0];
                        continuefun();
                    };
                    let lvl = (cmd == "isLevelThreePoint") ? { level: 2 } : null;
                    let selFour = (cmd != "isLevelThreePoint" && cmd != "isTwoVCF");
                    work.postMessage({ "cmd": "selectPoint", parameter: [arr, color, newarr, null, null, true, lvl, null, null, selFour] });
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
                        //console.log(sPoint.length);
                        if (sPoint.length == 0) { callback(); return; };

                        let workCount = 0;
                        for (let i = 0; i < maxThread; i++) {
                            if (sPoint.length) {
                                works[i] = createWork({
                                    "wLb": (p) => {
                                        cBd.printSearchPoint(i);
                                        wLb(p[0], p[1], p[2]);
                                    },
                                    "addTree": (p) => {
                                        if (tree) {
                                            tree.childNode.push(p[0].childNode[0]);
                                        }
                                        else {
                                            tree = p[0];
                                        }
                                    },
                                    "printSearchPoint": (p) => { cBd.printSearchPoint(i, p[0], p[1], p[2]); },
                                    "end": (p) => {
                                        let idx = sPoint.length ? sPoint.splice(0, 1) * 1 : -1;
                                        if (idx > -1) {
                                            cBd.printSearchPoint(i, idx, "⊙", "green");
                                            works[i].postMessage({ "cmd": cmd, parameter: [idx, param[0], param[1], param[3], param[4], param[5], param[6]] });
                                        }
                                        else {
                                            works[i].terminate();
                                            cBd.printSearchPoint(i);
                                            workCount--;
                                            if (workCount == 0) {
                                                if (tree) {
                                                    cBd.addTree(tree);
                                                    tree = null;
                                                }
                                                callback();
                                            }
                                        }
                                    },
                                });
                                workCount++;

                                let idx = sPoint.splice(0, 1);
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
                            cleLb("all");
                            if (p[0].length) {
                                msg(fclr + "找到VCF，开始分析防点...... ", null, null, null, null, null, null, null, null, null, 0);
                                closeMsg(2000);
                            }
                            else {
                                work.terminate();
                                callback();
                                msg("❌❌❌ " + fclr + " 没有VCF ❌❌❌");
                            }
                        },
                        "getBlockVCFEnd": (p) => {
                            closeMsg();
                            work.terminate();
                            callback();
                            sPoint = p[0];
                            if (sPoint.length) {

                            }
                            else {
                                callback();
                                msg("❌❌❌没有成立的防点❌❌❌");
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
                                msg(fclr + "找到VCF，开始分析防点...... ", null, null, null, null, null, null, null, null, null, 0);
                                closeMsg(2000);
                            }
                            else {
                                work.terminate();
                                callback();
                                msg("❌❌❌ " + fclr + " 没有VCF ❌❌❌");
                            }
                        },
                        "getBlockVCFbEnd": (p) => {
                            let fclr = p[1] == 1 ? "黑棋" : "白棋";
                            closeMsg();
                            work.terminate();
                            sPoint = p[0];
                            if (sPoint.length) {
                                //console.log("sPoint = " + sPoint);
                                for (let i = 0; i < sPoint.length; i++) {
                                    wLb(sPoint[i], "●", "#888888");
                                }
                                msg(fclr + "开始验证防点...... ", null, null, null, null, null, null, null, null, null, 0);
                                closeMsg(2000);
                                excludeBP("isBlockVCF");
                            }
                            else {
                                callback();
                                msg("❌❌❌没有成立的防点❌❌❌");
                            }
                        },
                    });

                    work.postMessage({ "cmd": cmd, parameter: [param[0], param[1], 1, null, null, null] });

                    let excludeBP = (cmd, parameter) => {
                        let workCount = 0;
                        for (let i = 0; i < maxThread; i++) {
                            if (sPoint.length) {
                                works[i] = createWork({
                                    "wLb": (p) => {
                                        cBd.printSearchPoint(i);
                                        wLb(p[0], p[1], p[2]);
                                    },
                                    "printSearchPoint": (p) => { cBd.printSearchPoint(i, p[0], p[1], p[2]); },
                                    "end": (p) => {
                                        let idx = sPoint.length ? sPoint.splice(0, 1) : -1;
                                        if (idx > -1) {
                                            cBd.printSearchPoint(i, idx, "⊙", "green");
                                            works[i].postMessage({ "cmd": cmd, parameter: [idx, param[1], param[0], param[3], param[4], param[5], param[6]] });
                                        }
                                        else {
                                            works[i].terminate();
                                            cBd.printSearchPoint(i);
                                            workCount--;
                                            if (workCount == 0) {
                                                callback();
                                            }
                                        }
                                    },
                                });
                                workCount++;

                                let idx = sPoint.splice(0, 1);
                                cBd.printSearchPoint(i, idx, "⊙", "green");
                                works[i].postMessage({ "cmd": cmd, parameter: [idx, param[1], param[0], param[3], param[4], param[5], param[6]] });
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