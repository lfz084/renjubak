if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["RenjuLib"] = "v1116.00";
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
        isLoading = false,
        lock = false,
        colour = false,
        buffer_scale = 5,
        post_number_start = 999999999,
        centerPos = {x:8, y:8};

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
        onerror: function(err){
            onError(err);
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
        showBranchs: function(data) {
            showBranchs(data);
        },
        autoMove: function(data) {
            autoMove(data);
        }
    };
    
    function setBufferScale(scl = 5) {
        buffer_scale = scl;
        showLabel(`设置${scl}倍内存,1M的lib文件会占用${scl}M内存`);
    }
    
    function setPostStart(start = 0){
        post_number_start = start;
        alert(`post_number_start = ${post_number_start}`);
    }
    
    function setCenterPos(point = {x:8, y:8}) {
        centerPos = point;
        enable && showLabel(`中心点: (${centerPos.x}, ${centerPos.y})`);
    }

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
        isLoading = true;
        wk = createWorker();
        wk.postMessage({ cmd: "setBufferScale", parameter: buffer_scale });
        wk.postMessage({ cmd: "setPostStart", parameter: post_number_start });
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
            count = data.count,
            message = `${~~(current / end * 100)}%`;
            if(typeof count=="number") message += `  /  ${count}`;
        setLoading(message);
        sTime = new Date().getTime();
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
        isLoading = false;
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
        new Date().getTime() - sTime > 30 * 1000 ? onError(new Error("打开文件出错了: 解码过程出现错误")) : undefined;
    }

    function otherMessage(message) {
        log(message, "warn");
    }

    function showBranchs(data) {
        let nodes = data.nodes,
            innerHTML = data.innerHTML,
            nextMove = { idx: -1, level: -2 },
            level = ["l", "L", "c", "c5", "c4", "c3", "c2", "c1", "w", "W", "a", "a5", "a4", "a3", "a2", "a1"];
        //log(data)
        if (!isEqual(data.position, cBoard.getPointArray())) return;
        console.info(data.nodes)
        cBoard.cleLb("all");
        for (let i = 0; i < nodes.length; i++) {
            if (cBoard.size < 14 || cBoard.nextColor()===2 || !isFoul(nodes[i].idx % 15, ~~(nodes[i].idx / 15), data.position)) {
                cBoard.wLb(nodes[i].idx, nodes[i].txt, colour ? nodes[i].color : "black");
                if (nextMove.level < level.indexOf(nodes[i].txt)) {
                    nextMove.level = level.indexOf(nodes[i].txt);
                    nextMove.idx = nodes[i].idx;
                }
            }
        }
        if (cBoard.MSindex + 1 === cBoard.MS.length && nextMove.idx > -1) cBoard.MS.push(nextMove.idx);
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
        for (let i = 0; i < arr1.length; i++) {
            for (let j = 0; j < arr1[i].length; j++) {
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
        isEmpty: function(){
            return !enable;
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
        showBranchs: function(param) {
            enable && (wk.postMessage({ cmd: "setCenterPos", parameter: centerPos }),
                wk.postMessage({ cmd: "showBranchs", parameter: param }))
        },
        isLoading: function() {
            return isLoading;
        },
        colour: function() {
            colour = !colour;
        },
        getAutoMove: function(){
            enable && (cBoard.toStart(),cBoard.toPrevious(),
                wk.postMessage({ cmd: "getAutoMove", parameter: undefined }));
        },
        setCenterPos: setCenterPos,
        setBufferScale: setBufferScale,
        setPostStart: setPostStart
    }
})()