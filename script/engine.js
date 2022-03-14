if (self.SCRIPT_VERSIONS) self.SCRIPT_VERSIONS["engine"] = "v1202.12";
window.engine = (function() {
    "use strict";
    const TEST_ENGINE = false;

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
        if (TEST_ENGINE && DEBUG)
            print(`[engine.js]\n>> ` + param);
    }

    const COLOR_NAME = { "-1": "出界", 0: "空格", 1: "黑棋", 2: "白棋" };
    const COMMAND = {
        log: function (param) {log(param, "log")},
        info: function (param) {info(param, "info")},
        error: function (param) {error(param, "error")},
        warn: function (param) {warn(param, "warn")},
        moves: function (param) {cBoard.printMoves(param.moves, param.firstColor)},
        vcfInfo: function (param) {this.vcfInfo = param.vcfInfo; log(param.vcfInfo, "log")},
    };

    function onmessage(e) {
        log(`work.onmessage: ${typeof e.data == "object"}, ${typeof e.data == "object" && "resolve" in e.data}, ${e.data}`, "info");
        if (typeof e.data == "object") {
            if (e.data.cmd == "resolve") (this.resolve(), this.isBusy = false/*, this.reset()*/);
            else typeof COMMAND[e.data.cmd]=="function" && COMMAND[e.data.cmd].call(this, e.data.param);
        }
    }

    function onerror(e) {
        log(e, "error");
        this.reject(e);
        this.isBusy = false;
        //this.reset();
    }

    //------------------------ Thread --------------------
    
    const HD_CURRENT = window.navigator.hardwareConcurrency || 4,
        MAX_THREAD_NUM = 0xf8 & HD_CURRENT ? HD_CURRENT - 2 : 0xfe & HD_CURRENT ? HD_CURRENT - 1 : HD_CURRENT;
    let THREADS = new Array(MAX_THREAD_NUM);
        
    class Thread {
        set onmessage(fun) {
            if (typeof fun == "function") {
                this.work.onmessage = fun.bind(this);
            }
        }
        set onerror(fun) {
            if (typeof fun == "function") {
                this.work.onerror = fun.bind(this);
            }
        }
        constructor(url) {
            this.url = url;
            this.init();
        }
    }
    
    Thread.prototype.init = function() {
        this.isLock = false;
        this.isBusy = false;
        this.resolve = function() {};
        this.reject = function() {};
        this.work = new Worker(this.url);
        if (!this.work) throw new Error(`createThread Error: work = ${this.work}`)
    }
    
    Thread.prototype.reset = function() {
        log("Thread Reset", "warn");
        if (this.work) this.work.terminate();
        this.init();
    }

    Thread.prototype.run = function({cmd, param}) {
        return new Promise((resolve, reject) => {
            if (this.isBusy) {reject(new Error("Thread is busy")); return};
            this.resolve = resolve;
            this.reject = reject;
            this.onmessage = onmessage;
            this.onerror = onerror;
            this.isBusy = true;
            this.postMessage({cmd: cmd, param: param});
        });
    }

    Thread.prototype.puse = function(param) {
        return new Promise((resolve, reject) => {

        });
    }

    Thread.prototype.cancel = function(param) {
        return new Promise((resolve, reject) => {
            this.reject();
            this.reset();
            resolve();
        });
    }
    
    Thread.prototype.lock = function() {
        this.isLock = true;
    }
    
    Thread.prototype.unlock = function() {
        this.isLock = false;
    }

    Thread.prototype.postMessage = function(param) {
        this.work.postMessage(param);
    }


    for(let i = 0; i < MAX_THREAD_NUM; i++) THREADS[i] = new Thread("./script/worker.js");
    
    function getThread() {
        return new Promise((resolve, reject) => {
            let timer = setInterval(() => {
                for(let i = 0; i < MAX_THREAD_NUM; i++) {
                    if (!THREADS[i].isLock) {
                        THREADS[i].lock();
                        clearInterval(timer);
                        resolve(THREADS[i]);
                        return;
                    }
                }
            }, 0);
        });
    }
    
    function cancel() {
        return Promise.all(THREADS.map(thread => thread.cancel()));
    }
    //-----------------------------------------------------
    
    async function _findVCF({arr, color, maxVCF, maxDepth, maxNode}, thread) {
        thread = thread || await getThread();
        return thread.run({cmd: "findVCF", param: {arr:arr, color:color, maxVCF:maxVCF, maxDepth:maxDepth, maxNode:maxNode}})
            .then(() => thread.vcfInfo.winMoves[0] || [])
            .catch(() => [])
    }
    
    async function findVCF(param, thread) {
        thread = thread || await getThread();
        return thread.run({ cmd: "findVCF", param: param })
            .then(() => thread.vcfInfo)
    }
    
    //-----------------------------------------------------

    return {
        MAX_THREAD_NUM: MAX_THREAD_NUM,
        getThread: getThread,
        cancel: cancel,
        findVCF: findVCF
    };
})();
