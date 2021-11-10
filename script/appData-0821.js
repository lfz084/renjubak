self.SCRIPT_VERSIONS["appData"] = "v1110.00";
window.appData = (() => {
    "use strict";
    const TYPE_BLACK = 3; // 无序号 添加的黑棋
    const TYPE_WHITE = 4; // 无序号 添加的黑棋
    let initialCBoard = { resetNum: 0, moves: [], whiteMoves: [], blackMoves: [] }; //开始计算时棋盘状态
    let timerSave = null; // 保存,定时器

    let renjuSave = (cBd) => {
        if (timerSave) { // 如果之前的保存计划还没开始 取消计划。
            clearTimeout(timerSave);
        }
        // 预定保存点击，
        timerSave = setTimeout(() => { saveData(cBd); }, 5000);
    };

    let renjuLoad = (cBd) => {
        setTimeout(() => { loadData(cBd); }, 300);
    };

    let saveData = (cBd) => {
        //console.log("saveData");
        let moves,
            whiteMoves,
            blackMoves,
            firstColor,
            resetNum,
            cBoardSize = cBd.size,
            coordinateType = cBd.coordinateType;
        if (cBd.oldCode) {
            let codeStr = cBd.oldCode;
            let st = 0;
            let end = codeStr.indexOf("{");
            end = end == -1 ? codeStr.length : end;
            moves = cBd.setMoves(codeStr.slice(st, end));
            st = end + 1;
            end = codeStr.indexOf("}{", st);
            end = end == -1 ? codeStr.length : end;
            blackMoves = cBd.setMoves(codeStr.slice(st, end)) || "";
            st = end + 2;
            end = codeStr.length;
            whiteMoves = cBd.setMoves(codeStr.slice(st, end)) || "";
            firstColor = cBd.oldFirstColor;
            resetNum = cBd.oldResetNum;
            /*
            console.log(moves)
            console.log(blackMoves)
            console.log(whiteMoves)
            */
        }
        else {
            moves = cBd.getMoves();
            whiteMoves = cBd.getMoves(TYPE_WHITE);
            blackMoves = cBd.getMoves(TYPE_BLACK);
            firstColor = cBd.firstColor;
            resetNum = cBd.resetNum;
        }

        if (moves != "" || whiteMoves != "" || blackMoves != "") {
            localStorage.setItem("moves", moves);
            localStorage.setItem("whiteMoves", whiteMoves);
            localStorage.setItem("blackMoves", blackMoves);
            localStorage.setItem("resetNum", resetNum);
            localStorage.setItem("firstColor", firstColor);
            localStorage.setItem("cBoardSize", cBoardSize);
            localStorage.setItem("coordinateType", coordinateType);
            timerSave = null;
            //log("保存棋谱:" + moves);
        }
    };

    let loadData = (cBd) => {
        //console.log("loadData");
        let firstColor = localStorage.getItem("firstColor"),
            resetNum = localStorage.getItem("resetNum"),
            moves = localStorage.getItem("moves"),
            whiteMoves = localStorage.getItem("whiteMoves"),
            blackMoves = localStorage.getItem("blackMoves"),
            cBoardSize = localStorage.getItem("cBoardSize"),
            coordinateType = localStorage.getItem("coordinateType");
            
        /*
        console.log(moves)
        console.log(blackMoves)
        console.log(whiteMoves)
        */
        if ((cBoardSize != "undefined") && cBoardSize) cBd.setSize(parseInt(cBoardSize));
        if ((coordinateType != "undefined") && coordinateType) cBd.setCoordinate(parseInt(coordinateType));
        if ((firstColor != "undefined") && firstColor) cBd.firstColor = firstColor;
        if (parseInt(resetNum) > 0) cBd.resetNum = parseInt(resetNum);
        if (cBd.setMoves(moves)) cBd.unpackMoves(true);
        if (whiteMoves != "") cBd.unpackMoves(true, "white", whiteMoves);
        if (blackMoves != "") cBd.unpackMoves(true, "black", blackMoves);
    };

    // 数据量太大，localStorage存不下
    let saveContinueData = (data, cBd) => {
        return;
        if (typeof(data) == "object") {
            if (cBd) {
                initialCBoard.resetNum = cBd.resetNum;
                initialCBoard.moves = cBd.getMoves();
                initialCBoard.whiteMoves = cBd.getMoves(TYPE_WHITE);
                initialCBoard.blackMoves = cBd.getMoves(TYPE_BLACK);
            }
            data.moves = initialCBoard.moves;
            data.whiteMoves = initialCBoard.whiteMoves;
            data.blackMoves = initialCBoard.blackMoves;
            data.resetNum = initialCBoard.resetNum;
        }
        let strData = JSON.stringify(data);
        //console.log(strData ? strData.length : "saveContinueData");
        localStorage.setItem("continueData", strData);
    };

    let loadContinueData = (cBd) => {
        let strData = localStorage.getItem("continueData");
        localStorage.removeItem("continueData");
        //console.log(strData);
        let data = (strData != "undefined") &&  strData  ? JSON.parse(strData) : false;
        if (typeof(data) == "object") {
            //console.log("load")
            cBd.cle();
            if (parseInt(data.resetNum) > 0) cBd.resetNum = parseInt(data.resetNum);
            if (cBd.setMoves(data.moves)) cBd.unpackMoves(true);
            if (data.whiteMoves != "") cBd.unpackMoves(true, "white", data.whiteMoves);
            if (data.blackMoves != "") cBd.unpackMoves(true, "black", data.blackMoves);
        }
        //console.log(data);
        return data;

    };
    
    let getKey = key => {
        return localStorage.getItem(key);
    };
    
    let setKey = (key, value) => {
        return localStorage.setItem(key, value);
    };
    
    let removeKey = key => {
        return localStorage.removeItem(key);
    };

    return {
        "renjuSave": renjuSave,
        "renjuLoad": renjuLoad,
        "saveData": saveData,
        "loadData": loadData,
        "saveContinueData": saveContinueData,
        "loadContinueData": loadContinueData,
        "getKey": getKey,
        "setKey": setKey,
        "removeKey": removeKey,
    };
})();