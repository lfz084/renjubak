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
        levelBInfo: function(param) { this.result = param.levelBInfo },
        selectPoints: function(param) { this.result = param.selectArr },
    };

    function onmessage(e) {
        if (typeof e.data == "object") {
            if (e.data.cmd == "resolve")(this.resolve(this.result), this.isBusy = false, log("resolve", "warn"));
            else typeof COMMAND[e.data.cmd] == "function" && COMMAND[e.data.cmd].call(this, e.data.param);
        }
    }

    function onerror(e) {
        this.reject(this.result);
        this.isBusy = false;
        log(e, "error");
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
            this.isLock = false;
            this.init();
        }
    }

    Thread.prototype.init = function() {
        this.isBusy = false;
        this.resolve = function() {};
        this.reject = function() {};
        this.result = undefined;
        this.work = new Worker(this.url);
        if (this.work) this.run({ cmd: "setGameRules", param: { rules: gameRules } })
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
            this.isBusy = true;
            this.resolve = resolve;
            this.reject = reject;
            this.onmessage = onmessage;
            this.onerror = onerror;
            this.postMessage({ cmd: cmd, param: param });
        });
    }

    Thread.prototype.push = function(param) {
        return new Promise((resolve, reject) => {

        });
    }

    Thread.prototype.cancel = function(param) {
        return new Promise((resolve) => {
            this.reject(this.result);
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
    let THREADS = new Array(MAX_THREAD_NUM),
        canceling = false;

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
        if (canceling) return;
        canceling = true;
        let count = 0,
            timer = setInterval(() => {
                count = THREADS.find(thread => thread.isBusy) ? 0 : count + 1;
                console.log(count)
                if (count > 10) {
                    clearInterval(timer);
                    canceling = false;
                    console.log("engine.cancel", "warn")
                }
            }, 100)
    }

    //------------------------ Evaluator -------------------

    const DEFAULT_BOARD_TXT = ["", "●", "○", "◐"];
    const FILTER_THREE_NODE = {
            0: node => (node.info & FOUL) || THREE_NOFREE == (node.info & FOUL_MAX),
            1: node => (node.info & FOUL) || THREE_FREE == (node.info & FOUL_MAX_FREE),
            2: node => (node.info & FOUL) || THREE_NOFREE == (node.info & FOUL_MAX_FREE)
        },
        FILTER_FOUR_NODE = {
            0: node => (node.info & FOUL) || FOUR_NOFREE == (node.info & FOUL_MAX),
            1: node => (node.info & FOUL) || FOUR_FREE == (node.info & FOUL_MAX_FREE),
            2: node => (node.info & FOUL) || FOUR_NOFREE == (node.info & FOUL_MAX_FREE)
        },
        FILTER_VCF_NODE = {
            0: node => true,
            1: node => node.winMoves && node.winMoves.length > 3,
            2: node => node.winMoves && node.winMoves.length == 3
        },
        FILTER_THREE = {
            0: (info, idx) => THREE_NOFREE == (info & FOUL_MAX) ? idx : undefined,
            1: (info, idx) => THREE_FREE == (info & FOUL_MAX_FREE) ? idx : undefined,
            2: (info, idx) => THREE_NOFREE == (info & FOUL_MAX_FREE) ? idx : undefined
        },
        FILTER_FOUR = {
            0: (info, idx) => FOUR_NOFREE == (info & FOUL_MAX) ? idx : undefined,
            1: (info, idx) => FOUR_FREE == (info & FOUL_MAX_FREE) ? idx : undefined,
            2: (info, idx) => FOUR_NOFREE == (info & FOUL_MAX_FREE) ? idx : undefined
        },
        FILTER_VCF = {
            0: (info, idx) => idx,
            1: (info, idx) => node.winMoves && node.winMoves.length > 3 ? idx : undefined,
            2: (info, idx) => node.winMoves && node.winMoves.length == 3 ? idx : undefined
        };

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

        //log(`[${movesToName(blackMoves)}]\n[${movesToName(whiteMoves)}]\n[${movesToName(moves)}]`, "warn")
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
        //log(`[${movesToName(blackMoves)}]\n[${movesToName(whiteMoves)}]\n[${movesToName(moves)}]`, "warn")
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

    function infoArrToNodes(infoArr) {
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
        }).filter(node => !!node)
    }

    //param: {arr, color}
    function getNodes(param, callback) {
        let nodes = infoArrToNodes(getTestThreeInfo(param));
        return nodes.filter(callback);
    }

    //param: {arr, color}
    function getPoints(param, callback) {
        let infoArr = getTestThreeInfo(param);
        return infoArr.map(callback).filter(idx => idx != undefined);
    }

    //param: {arr, color}
    function createTreeNodes(param, callback) {
        let { tree, positionMoves, isPushPass, current } = createTree(param),
            nodes = getNodes(param, callback);

        nodes.map(node => {
            let nNode = tree.newNode();
            nNode.idx = node.idx;
            nNode.boardTXT = node.boardTXT;
            current.addChild(nNode);
        })
        return Promise.resolve(tree);
    }

    //param: {arr, color, ftype}
    function getNodesThree(param) {
        return getNodes(param, FILTER_THREE_NODE[param.ftype])
    }

    //param: {arr, color, ftype}
    function getNodesFour(param) {
        return getNodes(param, FILTER_FOUR_NODE[param.ftype])
    }

    //param: {arr, color, ftype}
    function getPointsThree(param) {
        return getPoints(param, FILTER_THREE[param.ftype])
    }

    //param: {arr, color, ftype}
    function getPointsFour(param) {
        return getPoints(param, FILTER_FOUR[param.ftype])
    }

    //param: {arr, color, maxVCF, maxDepth, maxNode}
    async function getLevelThreeNode(idx, lineInfo, param, thread) {
        if (param.arr[idx] || THREE_FREE < (lineInfo & FOUL_MAX_FREE)) return;
        let arr = param.arr.slice(0);
        arr[idx] = param.color;

        let winMoves = await _findVCF({ arr: arr, color: param.color, maxVCF: param.maxVCF, maxDepth: param.maxDepth, maxNode: param.maxNode }, thread);
        if (winMoves.length) return { idx: idx, lineInfo: lineInfo, winMoves: winMoves };
    }

    //param: {arr, color, maxVCF, maxDepth, maxNode}
    async function getLevelThreeNodes(param) {
        let infoArr = getTestThreeInfo(param),
            sltArr = await _selectPoints(param),
            ps = [];

        for (let idx = 0; idx < 225; idx++) {
            if (sltArr[idx]) {
                let thread = await getFreeThread();
                if (canceling) break;
                ps.push(getLevelThreeNode(idx, infoArr[idx], param, thread));
            }
        }
        return (await Promise.all(ps) || []).filter(node => !!node);
    }

    //param: {arr, color, radius, maxVCF, maxDepth, maxNode}
    async function getLevelThreePoints(param, nextMoves) {
        //try{
        let infoArr = getTestThreeInfo(param),
            ps = [];
        for (let i = nextMoves.length - 1; i >= 0; i--) {
            let thread = await getFreeThread(),
                idx = nextMoves[i];
            if (canceling) break;
            ps.push(getLevelThreeNode(idx, infoArr[idx], param, thread));
        }
        return (await Promise.all(ps) || []).filter(node => !!node).map(node => node.idx);
        //}
        //catch(err) {
        //console.error(`getLevelThreePoints: ${err}`)
        //}
    }

    //param: {arr, color, radius, maxVCF, maxDepth, maxNode, ftype}
    async function getPointsVCT(param) {
        //try{
        let nextMoves = [],
            sortArr = new Array(225).fill(0),
            fPoints = getPointsFour(param),
            tPoints;
        param.color = INVERT_COLOR[param.color];
        nextMoves = await _nextMoves(param);
        param.color = INVERT_COLOR[param.color];

        tPoints = await getLevelThreePoints(param, nextMoves);
        nextMoves.map(idx => sortArr[idx] = 2)
        fPoints.map(idx => sortArr[idx]++);
        tPoints.map(idx => sortArr[idx]++);
        //console.info(`${movesToName(fPoints)}`)
        //console.warn(`${movesToName(tPoints)}`)
        return sortArr.map((v, idx) => v > 2 ? idx : undefined).filter(idx => idx != undefined);
        //}
        //catch(err) {
        //console.error(`getPointsVCT: ${err}`)
        //}
    }

    //param: {arr, color, radius, maxVCF, maxDepth, maxNode}
    async function _nextMoves(param) {
        //try{
        let thread,
            infoArr = [],
            blkPoints = [],
            ps = [];

        thread = await getFreeThread();
        ps.push(getBlockPoints(param, thread)
            .then(points => blkPoints = points))
        param.color = INVERT_COLOR[param.color];
        infoArr = getTestThreeInfo(param);
        param.color = INVERT_COLOR[param.color];
        await Promise.all(ps);

        return blkPoints.filter(idx => !(infoArr[idx] & FOUL));
        //}
        //catch(err) {
        //console.error(`_nextMoves: ${err}`)
        //}
    }

    //------------------------- exports --------------------

    function _setGameRules(rules) {
        setGameRules(rules);
        reset();
    }

    async function wait(timer) {
        return new Promise(resolve => setTimeout(resolve, timer))
    }

    async function run(cmd, param, thread) {
        //try{
        log(param, "log");
        thread = thread || await getFreeThread();
        return thread.run({ cmd: cmd, param: param });
        //}
        //catch(err) {
        //console.error(`run: ${err}`)
        //}
    }

    //param: {arr, color, radius, maxVCF, maxDepth, maxNode}
    async function _selectPoints(param, thread) {
        //try{
        thread = thread || await getFreeThread();
        return await run("selectPoints", param, thread) || new Array(225);
        //}
        //catch(err) {
        //console.error(`_selectPoints: ${err}`)
        //}
    }

    async function _findVCF({ arr, color, maxVCF, maxDepth, maxNode }, thread) {
        thread = thread || await getFreeThread();
        return (await thread.run({ cmd: "findVCF", param: { arr: arr, color: color, maxVCF: maxVCF, maxDepth: maxDepth, maxNode: maxNode } })).winMoves[0] || [];
    }

    //parm: {arr, color, vcfMoves, includeFour}
    async function _getBlockVCF(param, thread) {
        thread = thread || await getFreeThread();
        return await run("getBlockVCF", param, thread) || [];
    }

    //parm: {arr, color, maxVCF, maxDepth, maxNode}
    async function _getLevelB(param, thread) {
        thread = thread || await getFreeThread();
        return await run("getLevelB", param, thread) || levelBInfo;
    }

    //param: {points, arr, color, maxVCF, maxDepth, maxNode}
    async function _excludeBlockVCF(param, thread) {
        thread = thread || await getFreeThread();
        return await run("excludeBlockVCF", param, thread) || [];
    }

    //parm: {arr, color, maxVCF, maxDepth, maxNode}
    async function findVCF(param, thread) {
        thread = thread || await getFreeThread();
        return await run("findVCF", param, thread) || vcfInfo;
    }

    //param: {arr, color, vcfMoves, includeFour, maxVCF, maxDepth, maxNode}
    async function excludeBlockVCF(param, thread) {
        thread = thread || await getFreeThread();
        param.points = await _getBlockVCF(param, thread);
        return _excludeBlockVCF(param, thread);
    }

    //param: {arr, color, radius, maxVCF, maxDepth, maxNode}
    async function getBlockPoints(param, thread) {
        //try{
        thread = thread || await getFreeThread();
        return await run("getBlockPoints", param, thread) || [];
        //}
        //catch(err) {
        //console.error(`getBlockPoints: ${err}`)
        //}
    }

    //parm: {arr, color, maxVCF, maxDepth, maxNode}
    async function createTreeVCF(param) {
        let tree = await createTreeWin(param, LEVEL_NOFREEFOUR);
        if (!tree) {
            let vcfInfo = await findVCF(param),
                { tree, positionMoves, isPushPass, current } = createTree(param);

            vcfInfo.winMoves.map(vcfMoves => tree.createPathVCF(current, vcfMoves));
            tree.init.MS = getInitMoves(tree);

            0 == vcfInfo.winMoves.length && showLabel(`${EMOJI_FOUL_THREE} ${COLOR_NAME[param.color]} 查找VCF失败了 ${EMOJI_FOUL_THREE}`);
            return tree;
        }
        return tree;
    }

    //parm: {arr, color}
    async function createTreeFive(param) {
        return createTreeNodes(param, node => FIVE == (node.info & FOUL_MAX_FREE))
    }

    //parm: {arr, color, ftype}
    async function createTreeFour(param) {
        return createTreeNodes(param, FILTER_FOUR_NODE[param.ftype])
    }

    //parm: {arr, color, ftype}
    async function createTreeThree(param) {
        return createTreeNodes(param, FILTER_THREE_NODE[param.ftype])
    }

    //parm: {arr, color}
    async function createTreeWin(param, winLevel = LEVEL_VCF) {
        let { tree, positionMoves, isPushPass, current } = createTree(param),
            levelBInfo,
            level,
            fiveIdx;

        if (winLevel > LEVEL_VCF) {
            levelBInfo = getLevel(param.arr, param.color);
            level = levelBInfo & 0xff;
            fiveIdx = levelBInfo >> 8 & 0xff;
        }
        else {
            levelBInfo = await _getLevelB(param);
            level = levelBInfo.levelInfo & 0xff;
            fiveIdx = levelBInfo.levelInfo >> 8 & 0xff;
        }

        if (LEVEL_WIN == (getLevel(param.arr, 1) & 0xff) || LEVEL_WIN == (getLevel(param.arr, 2) & 0xff)) {
            showLabel(`棋局已结束`);
            return tree;
        }
        else if (level >= LEVEL_NOFREEFOUR) {
            let node = tree.newNode();
            node.idx = fiveIdx;
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
        return undefined;
    }

    //parm: {arr, color, ftype}
    async function _createTreeLevelThree(param) {
        let { tree, positionMoves, isPushPass, current } = createTree(param),
            nodes = await getLevelThreeNodes(param);

        nodes.filter(FILTER_VCF_NODE[param.ftype]).map(node => {
            let nNode = tree.newNode(),
                nodePass = tree.newNode();
            nNode.idx = node.idx;
            nNode.boardTXT = LEVEL_THREE_POINTS_TXT[node.winMoves.length];
            current.addChild(nNode);
            nNode.addChild(nodePass);
            tree.createPathVCF(nodePass, node.winMoves);
        })
        return tree;
    }

    //parm: {arr, color, ftype}
    async function createTreeLevelThree(param) {
        let tree = await createTreeWin(param);
        if (!tree) {
            tree = await _createTreeLevelThree(param);
        }
        return tree;
    }

    //parm: {arr, color}
    async function createTreePointsVCT(param) {
        let tree = await createTreeWin(param);
        if (!tree) {
            tree = await _createTreeLevelThree(param);
            tree.mergeTree(await createTreeFour(param));
        }
        return tree;
    }

    //parm: {arr, color, radius, maxVCF, maxDepth, maxNode, maxVCT, maxDepthVCT, maxNodeVCT, ftype}
    async function createTreeVCT(param) {
        let winTree = await createTreeWin(param);
        if (winTree) return winTree;

        let { tree, positionMoves, isPushPass, current } = createTree(param),
            arr = param.arr,
            stack = [],
            moves = [],
            count = 0;

        while (current) {
            //console.log(`--------`)
            //console.log(movesToName(arr.map((v, idx) => v == 1 ? idx : -1).filter(v => v > -1)))
            //console.info(movesToName(arr.map((v, idx) => v == 2 ? idx : -1).filter(v => v > -1)))
            //console.log(`--------`)
            console.log(count++);
            if (0 == moves.length || 0 == tree.positionNodes(positionMoves.concat(moves), 7).length) {
                let points = moves.length & 1 ? await _nextMoves(param) : await getPointsVCT(param),
                    color = moves.length & 1 ? INVERT_COLOR[param.color] : param.color;
                //console.info(movesToName(points))

                for (let i = points.length - 1; i >= 0; i--) {
                    tree.addChild(current, tree.newNode(points[i], DEFAULT_BOARD_TXT[color]));
                }
            }
            else {
                console.warn(`${movesToName(moves)}, ${moves.length}, ${moves.length & 1}`)
            }

            //console.info(`${movesToName(current.getChilds().map(nd=>nd.idx))}`)
            current = current.down;

            //console.log(`${!current  || moves.length >= param.maxDepthVCT}, ${moves.length}, ${param.maxDepthVCT}`)
            if (!current || moves.length >= param.maxDepthVCT) {
                current = undefined;
                if (stack.length) {
                    let elm = stack.pop();
                    current = elm.node;
                    for (let i = moves.length - 1; i >= elm.len; i--) {
                        //cBoard.cleNb(moves[i], true);
                        arr[moves.pop()] = 0;
                    }
                }
            }

            if (current) {
                //console.info(`right: ${idxToName(current.right && current.right.idx)}`)
                if (current.right) stack.push({ node: current.right, len: moves.length });
                arr[current.idx] = moves.length & 1 ? INVERT_COLOR[param.color] : param.color;
                moves.push(current.idx);
                //cBoard.wNb(current.idx, "auto", true)
                //await wait(1000)
            }
            if (canceling) break;
        }
        console.warn(`count: ${count}`)
        return tree;
    }

    //------------------------ exports ----------------------

    return {
        MAX_THREAD_NUM: MAX_THREAD_NUM,
        setGameRules: _setGameRules,
        getFreeThread: getFreeThread,
        cancel: cancel,
        findVCF: findVCF,
        getBlockVCF: _getBlockVCF,
        getLevelB: _getLevelB,
        createTreeVCF: createTreeVCF,
        createTreeFive: createTreeFive,
        createTreeFour: createTreeFour,
        createTreeThree: createTreeThree,
        createTreePointsVCT: createTreePointsVCT,
        createTreeLevelThree: createTreeLevelThree,
        excludeBlockVCF: excludeBlockVCF,
        getBlockPoints: getBlockPoints,
        createTreeVCT: createTreeVCT,
        reset: () => {},
        //test
        _findVCF: _findVCF,
        _nextMoves: _nextMoves,
        getLevelThreeNodes: getLevelThreeNodes,
        getLevelThreePoints: getLevelThreePoints,
        getPointsVCT: getPointsVCT
    };

})();
