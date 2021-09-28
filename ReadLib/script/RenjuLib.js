if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["RenjuLib"] = "v0929.01";
window.RenjuLib = (() => {
    "use strict";
    //console.log(exports);
    const TEST_RENLIB = true;

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
            trace: () => { console.trace(param) }
        }
        let print = command[type] || console.log;
        if (TEST_RENLIB && DEBUG)
            print(`[RenjuLib.js]\n>> ` + param);
    }

    let url = "./ReadLib/script/work_ReadLib.js",
        enable = false,
        errCount = 0,
        wk,
        timer,
        sTime,
        pathStrack = [],
        tree,
        isBusy,
        setBusy,
        newGame,
        cBoard,
        getShowNum,
        setPlayModel,
        lock = false;

    const MODEL_RENLIB = 7;

    const CMD = {
        /*
        addBranchArray: function(branchArray) {
            pathStrack = pathStrack.concat(branchArray);
            log(branchArray);
        },
        addTree: function(tree) {
            //new RenjuTree(tree).addBranchArray(pathStrack)
            addTree(tree);
        },
        createTree: function(data) {
            createTree(data);
        },
        */
        loading: function(data) {
            loading(data);
        },
        finish: function() {
            lock = true;
            newGame();
            lock = false;
            setPlayModel(MODEL_RENLIB);
            enable = true;
            finish();
        },
        alert: function(msg) {
            alert(msg);
        },
        log: function(msg) {
            log(msg, "log");
        },
        warn: function(msg) {
            log(msg, "warn");
        },
        info: function(msg) {
            log(msg, "info");
        },
        error: function(msg) {
            log(msg, "error");
        },
        showCBoard: function(data) {
            showCBoard(data);
        },
        autoMove: function(data) {
            autoMove(data);
        }
    };

    function createWorker() {
        if (errCount > 5) return;
        wk = new Worker(url);
        wk.onmessage = function(e) {
            if (typeof e.data == "object") {
                sTime = new Date().getTime();
                typeof CMD[e.data.cmd] == "function" ? CMD[e.data.cmd](e.data.parameter) :
                    e.data.constructor.name == "Error" ? onError(e.data) :
                    otherMessage(e.data);
            }
            else {
                otherMessage(e.data);
            }
        };
        wk.onerror = function(e) {
            onError(e);
        };
        //log(`createWorker, wk = ${wk}, \nurl = "${url}"`, "info");
        return wk;
    }

    function removeWorker() {
        wk.terminate();
        wk = null;
    }

    function load(file) {
        setBusy(true);
        wk && removeWorker();
        enable = false;
        wk = createWorker();
        wk.postMessage({ cmd: "openLib", parameter: file });
        timer = setInterval(catchErr, 1000);
        sTime = new Date().getTime();
    }

    function setLoading(message) {
        window._loading.open();
        window._loading.text(message);
    }

    function loading(data) {
        let current = data.current,
            end = data.end,
            count = data.count;
        setLoading(`${~~(current / end * 10000) / 100}%  /  ${count}`);
    }
    /*
    function createTree(data) {
        let current = data.current,
            end = data.end;
        setLoading(`${current} / ${end}`);
    }

    function addTree(tree) {
        function next(nd) {
            if (nd.childNode.length == 1) {
                nd = nd.childNode[0];
                cBoard.toNext(getShowNum());
                setTimeout(() => { next(nd) }, 0);
            }
        }
        let nd = tree;
        newGame();
        cBoard.addTree(nd);
        setTimeout(()=>next(nd),1000);
    }
    */
    function finish() {
        setBusy();
        window._loading.close();
        clearInterval(timer);
        timer = null;
    }

    function onError(err) {
        errCount++;
        alert(`WorKer Error: ${err.message || err}`);
        log(`WorKer Error: wk = ${wk.constructor.name}, \nerr = ${err}, \nerr.message = ${err.message}`, "error");
        finish();
        wk && removeWorker();
        enable = false;
        //wk = createWorker();
    }

    function catchErr() {
        new Date().getTime() - sTime > 15 * 1000 ? onError(new Error("打开文件出错了: 解码过程出现错误")) : undefined;
    }

    function otherMessage(message) {
        log(message, "warn");
    }

    function showCBoard(data) {
        let nodes = data.nodes,
            innerHTML = data.innerHTML;
        //log(data)
        if (!isEqual(data.position, cBoard.getPointArray())) return;

        cBoard.cleLb("all");
        for (let i = 0; i < nodes.length; i++) {
            cBoard.wLb(nodes[i].idx, nodes[i].txt, "black");
        }
        let exWindow = control.getEXWindow();
        exWindow.innerHTML(innerHTML);
        if (innerHTML) exWindow.openWindow();
    }

    function autoMove(path) {
        for (let i = 0; i < path.length; i++) {
            cBoard.wNb(path[i], "auto", getShowNum(), undefined, undefined, 0);
        }
    }

    function isEqual(arr1, arr2) {
        for (let i = 0; i < 15; i++) {
            for (let j = 0; j < 15; j++) {
                if (arr1[i][j] != arr2[i][j])
                    return false;
            }
        }
        return true;
    }


    return {
        reset: function(param) {
            isBusy = param.isBusy;
            setBusy = param.setBusy;
            newGame = param.newGame;
            cBoard = param.cBoard;
            getShowNum = param.getShowNum;
            setPlayModel = param.setPlayModel;
        },
        openLib: function(file) {
            if (isBusy()) return;
            load(file);
        },
        closeLib: function() {
            if (lock) return;
            wk && removeWorker();
            enable = false;
            //wk = createWorker();
        },
        cancal: function() {
            finish();
            wk && removeWorker();
            enable = false;
            //wk = createWorker();
        },
        getBranchNodes: function(param) {
            if (enable) {
                //log(param)
                wk.postMessage({ cmd: "getBranchNodes", parameter: param })
            }
        }
    }
})()