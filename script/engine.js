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

    //-------------------------- COMMAND -------------------------------

    const COLOR_NAME = { "-1": "出界", 0: "空格", 1: "黑棋", 2: "白棋" };
    const COMMAND = {
        log: function(param) { log(param, "log") },
        info: function(param) { log(param, "info") },
        error: function(param) { log(param, "error") },
        warn: function(param) { log(param, "warn") },
        moves: function(param) { cBoard.printMoves(param.moves, param.firstColor) },
        vcfInfo: function(param) { this.result = param.vcfInfo },
        points: function(param) { this.result = param.points },
        levelBInfo: function(param) { this.result = param.levelBInfo }
    };

    function onmessage(e) {
        if (typeof e.data == "object") {
            if (e.data.cmd == "resolve")(this.resolve(), this.isBusy = false, log("resolve", "warn"));
            else typeof COMMAND[e.data.cmd] == "function" && COMMAND[e.data.cmd].call(this, e.data.param);
        }
    }

    function onerror(e) {
        log(e, "error");
        this.reject(e);
        this.isBusy = false;
    }

    //------------------------ Thread --------------------

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
        this.result = undefined;
        this.work = new Worker(this.url);
        if (this.work) this.run({ cmd: "setGameRules", param: { rules: gameRules } });
        else throw new Error(`createThread Error: work = ${this.work}`)
    }

    Thread.prototype.reset = function() {
        log("Thread Reset", "warn");
        if (this.work) this.work.terminate();
        this.init();
    }

    Thread.prototype.run = function({ cmd, param }) {
        return new Promise((resolve, reject) => {
            if (this.isBusy) { reject(new Error("Thread is busy")); return };
            this.resolve = resolve;
            this.reject = reject;
            this.onmessage = onmessage;
            this.onerror = onerror;
            this.isBusy = true;
            this.postMessage({ cmd: cmd, param: param });
        });
    }

    Thread.prototype.push = function(param) {
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

    //------------------------ THREADS --------------------

    const HD_CURRENT = window.navigator.hardwareConcurrency || 4,
        MAX_THREAD_NUM = 0xf8 & HD_CURRENT ? HD_CURRENT - 2 : 0xfe & HD_CURRENT ? HD_CURRENT - 1 : HD_CURRENT;
    let THREADS = new Array(MAX_THREAD_NUM);

    for (let i = 0; i < MAX_THREAD_NUM; i++) THREADS[i] = new Thread("./script/worker.js");

    function getFreeThread(threads = THREADS) {
        return new Promise((resolve, reject) => {
            let timer = setInterval(() => {
                for (let i = threads.length - 1; i >= 0; i--) {
                    if (!threads[i].isBusy) {
                        clearInterval(timer);
                        resolve(threads[i]);
                        return;
                    }
                }
            }, 0);
        });
    }

    function getThread() {
        return new Promise((resolve, reject) => {
            let timer = setInterval(() => {
                for (let i = threads.length - 1; i >= 0; i--) {
                    if (!threads[i].isLock) {
                        threads[i].lock();
                        clearInterval(timer);
                        resolve(threads[i]);
                        return;
                    }
                }
            }, 0);
        });
    }

    function reset() {
        THREADS.map(thread => thread.cancel());
    }

    function cancel() {
        log("cancel", "warn");
        return Promise.all(THREADS.map(thread => thread.cancel()));
    }

    //------------------------ Evaluator -------------------

    const LEVEL_THREE_POINTS_TXT = new Array(225);
    LEVEL_THREE_POINTS_TXT.fill(1).map((v, i) => {
        if (i < 2) LEVEL_THREE_POINTS_TXT[i] = `V`;
        else if (i < 100) LEVEL_THREE_POINTS_TXT[i] = `V${i}`;
        else LEVEL_THREE_POINTS_TXT[i] = `V++`;
    })

    function positionToMoves(position) {
        let blackMoves = [],
            whiteMoves = [],
            moves = [];
        position.map((color, idx) => {
            switch (color) {
                case 1:
                    blackMoves.push(idx);
                    break;
                case 2:
                    whiteMoves.push(idx);
                    break;
            }
        })

        log(`[${movesToName(blackMoves)}]\n[${movesToName(whiteMoves)}]\n[${movesToName(moves)}]`, "warn")
        for (let i = blackMoves.length - 1; i >= 0; i--) {
            moves.push(blackMoves.pop());
            if (whiteMoves.length) moves.push(whiteMoves.pop());
            else break;
        }

        if (blackMoves.length) {
            !(moves.length & 1) && moves.push(blackMoves.pop());
            for (let i = blackMoves.length - 1; i >= 0; i--) {
                moves.push(225, blackMoves.pop());
            }
        }
        else if (whiteMoves.length) {
            (moves.length & 1) && moves.push(whiteMoves.pop());
            for (let i = whiteMoves.length - 1; i >= 0; i--) {
                moves.push(225, whiteMoves.pop());
            }
        }
        log(`[${movesToName(blackMoves)}]\n[${movesToName(whiteMoves)}]\n[${movesToName(moves)}]`, "warn")
        return moves;
    }

    function getInitMoves(tree) {
        let initMoves = [],
            current = tree.root.down;
        while (current) {
            initMoves.push(current.idx);
            current = current.down;
        }
        initMoves[initMoves.length - 1] == 225 && initMoves.pop();
        return initMoves;
    }

    //param: {arr, color}
    function createTree(param, isInitMove = true) {
        let tree = new RenjuTree(undefined, undefined, { x: (cBoardSize + 1) / 2, y: (cBoardSize + 1) / 2 }),
            positionMoves = positionToMoves(param.arr),
            isPushPass = (positionMoves.length & 1) == (param.color & 1),
            current = tree.createPath(positionMoves.concat(isPushPass ? [225] : []));
        isInitMove && (tree.init = {
            MS: positionMoves,
            MSindex: positionMoves.length - 1,
            resetNum: positionMoves.length + (isPushPass ? 1 : 0)
        })
        return { tree, positionMoves, isPushPass, current };
    }

    //param: {arr, color}
    function getTestThreeInfo(param) {
        let infoArr = new Array(226);
        testThree(param.arr, param.color, infoArr);
        return infoArr;
    }

    function infoArrToPoints(infoArr) {
        return infoArr.map((info, idx) => {
            let isFoul = info & FOUL,
                isFree = info & FREE,
                foul_max_free = info & FOUL_MAX_FREE;
            if (isFoul) {
                return { idx: idx, boardTXT: EMOJI_FOUL, info: info }
            }
            else {
                switch (foul_max_free) {
                    case FIVE:
                        return { idx: idx, boardTXT: EMOJI_ROUND_FIVE, info: info }
                        case FOUR_FREE:
                            return { idx: idx, boardTXT: EMOJI_ROUND_FOUR, info: info }
                            case FOUR_NOFREE:
                                return { idx: idx, boardTXT: "4", info: info }
                                case THREE_FREE:
                                    return { idx: idx, boardTXT: EMOJI_ROUND_THREE, info: info }
                                    case THREE_NOFREE:
                                        return { idx: idx, boardTXT: "3", info: info }
                }
            }
        }).filter(point => !!point)
    }

    //param: {arr, color}
    function createTreePoints(param, callback) {
        let { tree, positionMoves, isPushPass, current } = createTree(param),
            points = infoArrToPoints(getTestThreeInfo(param));

        points.filter(callback).map(point => {
            let node = tree.newNode();
            node.idx = point.idx;
            node.boardTXT = point.boardTXT;
            current.addChild(node);
        })
        return Promise.resolve(tree);
    }

    //param: {arr, color, maxVCF, maxDepth, maxNode}
    async function getLevelThreePoint(idx, lineInfo, param, thread) {
        if (param.arr[idx] || THREE_FREE < (lineInfo & FOUL_MAX_FREE)) return;
        thread = thread || await getFreeThread();
        let arr = param.arr.slice(0);
        arr[idx] = param.color;

        let winMoves = await _findVCF({ arr: arr, color: param.color, maxVCF: param.maxVCF, maxDepth: param.maxDepth, maxNode: param.maxNode }, thread);
        if (winMoves.length) return { idx: idx, lineInfo: lineInfo, winMoves: winMoves };
    }

    //param: {arr, color, maxVCF, maxDepth, maxNode}
    async function getLevelThreePoints(param) {
        let infoArr = await getTestThreeInfo(param),
            ps = [];

        for (let idx = 0; idx < 225; idx++) {
            let thread = await getFreeThread();
            ps.push(getLevelThreePoint(idx, infoArr[idx], param, thread));
        }
        return (await Promise.all(ps)).filter(point => !!point)
    }

    //------------------------- exports --------------------

    function _setGameRules(rules) {
        setGameRules(rules);
        reset();
    }

    async function run(cmd, param, thread) {
        log(param, "log");
        thread = thread || await getFreeThread();
        return thread.run({ cmd: cmd, param: param })
            .then(() => thread.result)
            .catch(() => thread.result)
    }

    async function _findVCF({ arr, color, maxVCF, maxDepth, maxNode }, thread) {
        thread = thread || await getFreeThread();
        return thread.run({ cmd: "findVCF", param: { arr: arr, color: color, maxVCF: maxVCF, maxDepth: maxDepth, maxNode: maxNode } })
            .then(() => thread.result.winMoves[0] || [])
            .catch(() => [])
    }

    //parm: {arr, color, vcfMoves, includeFour}
    async function _getBlockVCF(param, thread) {
        thread = thread || await getFreeThread();
        return run("getBlockVCF", param, thread);
    }

    //parm: {arr, color, maxVCF, maxDepth, maxNode}
    async function _getLevelB(param, thread) {
        thread = thread || await getFreeThread();
        return run("getLevelB", param, thread);
    }

    //parm: {arr, color, maxVCF, maxDepth, maxNode}
    async function findVCF(param, thread) {
        thread = thread || await getFreeThread();
        let result = await run("findVCF", param, thread);
        return result;
    }

    //parm: {arr, color, vcfMoves, includeFour}
    async function getBlockVCF(param, thread) {
        let result = await _getBlockVCF(param, thread);
        return result;
    }

    //parm: {arr, color, maxVCF, maxDepth, maxNode}
    async function getLevelB(param, thread) {
        let result = await _getLevelB(param, thread);
        return result;
    }

    //parm: {arr, color, maxVCF}
    async function createTreeVCF(param, thread) {
        param.maxDepth = 180;
        param.maxNode = 1000000;
        thread = thread || await getFreeThread();
        let vcfInfo = await run("findVCF", param, thread),
            { tree, positionMoves, isPushPass, current } = createTree(param);

        vcfInfo.winMoves.map(vcfMoves => tree.createPathVCF(current, vcfMoves));
        tree.init.MS = getInitMoves(tree);

        0 == vcfInfo.winMoves.length && showLabel(`${EMOJI_FOUL_THREE} ${COLOR_NAME[param.color]} 查找VCF失败了 ${EMOJI_FOUL_THREE}`);
        return tree;
    }

    async function createTreeFive(param) {
        return createTreePoints(param, point => FIVE == (point.info & FOUL_MAX_FREE))
    }

    async function createTreeFour(param) {
        const CALLBACK = {
            0: point => (point.info & FOUL) || FOUR_NOFREE == (point.info & FOUL_MAX),
            1: point => (point.info & FOUL) || FOUR_FREE == (point.info & FOUL_MAX_FREE),
            2: point => (point.info & FOUL) || FOUR_NOFREE == (point.info & FOUL_MAX_FREE),
        }
        return createTreePoints(param, CALLBACK[param.ftype])
    }

    async function createTreeThree(param) {
        const CALLBACK = {
            0: point => (point.info & FOUL) || THREE_NOFREE == (point.info & FOUL_MAX),
            1: point => (point.info & FOUL) || THREE_FREE == (point.info & FOUL_MAX_FREE),
            2: point => (point.info & FOUL) || THREE_NOFREE == (point.info & FOUL_MAX_FREE),
        }
        return createTreePoints(param, CALLBACK[param.ftype])
    }

    async function createTreeWin(param) {
        let { tree, positionMoves, isPushPass, current } = createTree(param),
            levelBInfo = await _getLevelB(param),
            level = levelBInfo.levelInfo & 0xff;

        if (LEVEL_WIN == (getLevel(param.arr, 1) & 0xff) || LEVEL_WIN == (getLevel(param.arr, 2) & 0xff)) {
            showLabel(`棋局已结束`);
            return tree;
        }
        else if (level >= LEVEL_NOFREEFOUR) {
            let node = tree.newNode();
            node.idx = levelBInfo.levelInfo >> 8 & 0xff;
            node.boardTXT = "W";
            current.addChild(node);
            showLabel(`${COLOR_NAME[param.color]} 可以五连`);
            return tree;
        }
        else if (level == LEVEL_VCF) {
            tree.createPathVCF(current, levelBInfo.winMoves);
            tree.init.MS = getInitMoves(tree);
            showLabel(`${COLOR_NAME[param.color]} 有杀`);
            return tree;
        }
    }

    async function _createTreeLevelThree(param) {
        const CALLBACK = {
            0: point => true,
            1: point => point.winMoves && point.winMoves.length > 3,
            2: point => point.winMoves && point.winMoves.length == 3,
        }
        let { tree, positionMoves, isPushPass, current } = createTree(param),
            points = await getLevelThreePoints(param);
            
        points.filter(CALLBACK[param.ftype]).map(point => {
            let node = tree.newNode(),
                nodePass = tree.newNode();
            node.idx = point.idx;
            node.boardTXT = LEVEL_THREE_POINTS_TXT[point.winMoves.length];
            current.addChild(node);
            node.addChild(nodePass);
            tree.createPathVCF(nodePass, point.winMoves);
        })
        return tree;
    }

    async function createTreeLevelThree(param) {
        let tree = await createTreeWin(param);
        if (!tree) {
            tree = await _createTreeLevelThree(param);
        }
        return tree;
    }

    async function createTreePointsVCT(param) {
        let tree = await createTreeWin(param);
        if (!tree) {
            tree = await _createTreeLevelThree(param);
            tree.mergeTree(await createTreeFour(param));
        }
        return tree;
    }

    //------------------------ exports ----------------------

    return {
        MAX_THREAD_NUM: MAX_THREAD_NUM,
        setGameRules: _setGameRules,
        getFreeThread: getFreeThread,
        cancel: cancel,
        findVCF: findVCF,
        getBlockVCF: getBlockVCF,
        getLevelB: getLevelB,
        createTreeVCF: createTreeVCF,
        createTreeFive: createTreeFive,
        createTreeFour: createTreeFour,
        createTreeThree: createTreeThree,
        createTreePointsVCT: createTreePointsVCT,
        createTreeLevelThree: createTreeLevelThree,
        reset: () => {},
        //test
        _findVCF: _findVCF,
        getLevelThreePoints: getLevelThreePoints
    };
})();