if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["RenjuLib"] = "v0912.09";
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
        getShowNum;

    const CMD = {
        addBranchArray: function(branchArray) {
            pathStrack = pathStrack.concat(branchArray);
            log(branchArray);
        },
        addTree: function(tree) {
            //new RenjuTree(tree).addBranchArray(pathStrack)
            addTree(tree);
        },
        loading: function(data) {
            loading(data);
        },
        createTree: function(data) {
            createTree(data);
        },
        finish: function() {
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
        }
    };

    function createWorker(url) {
        if (errCount > 5) return;
        let work = new Worker(url);
        work.onmessage = function(e) {
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
        work.onerror = function(e) {
            onError(e);
        };
        //log(`createWorker, wk = ${work}, \nurl = "${url}"`, "info");
        return work;
    }

    function removeWorker(work) {
        work.terminate();
        work = null;
    }

    function load(file) {
        setBusy(true);
        wk.postMessage(file);
        timer = setInterval(catchErr, 30000);
        sTime = new Date().getTime();
    }

    function setLoading(message) {
        window._loading.open();
        window._loading.text(message);
    }

    function loading(data) {
        let current = data.current,
            end = data.end;
        setLoading(~~(current / end * 10000) / 100 + "%");
    }

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
        next(nd);
    }

    function finish() {
        setBusy();
        window._loading.close();
        clearInterval(timer);
        timer = null;
        removeWorker(wk);
        wk = createWorker(url);
    }

    function onError(err) {
        errCount++;
        alert(`WorKer Error: ${err.message || err}`);
        log(`WorKer Error: wk = ${wk.constructor.name}, \nerr = ${err}, \nerr.message = ${err.message}`, "error");
        finish();
    }

    function catchErr() {
        new Date().getTime() - sTime > 10 * 1000 ? onError(new Error("打开文件出错了: 解码过程出现错误")) : undefined;
    }

    function otherMessage(message) {
        log(message, "warn");
    }


    return {
        reset: function(param) {
            isBusy = param.isBusy;
            setBusy = param.setBusy;
            newGame = param.newGame;
            cBoard = param.cBoard;
            getShowNum = param.getShowNum;
            setTimeout(() => { wk = createWorker(url) }, 0);
        },
        addLib: function(file) {
            if (isBusy()) return;
            load(file);
        },
        cancal: function() {
            finish();
        }
    }
})()