        "use strict";
        let appData = (() => {
            const tBlack = 3; // 无序号 添加的黑棋
            const tWhite = 4; // 无序号 添加的黑棋
            let timerSave = null; // 保存,定时器

            let renjuSave = (cBd) => {
                if (timerSave) { // 如果之前的保存计划还没开始 取消计划。
                    clearTimeout(timerSave);
                }
                // 预定保存点击，
                timerSave = setTimeout(() => { saveData(cBd); }, 5000);
            }

            let renjuLoad = (cBd) => {
                setTimeout(() => { loadData(cBd); }, 300);
            }

            let saveData = (cBd) => {
            //console.log("saveData");
            let moves = cBd.getMoves();
            let whiteMoves = cBd.getMoves(tWhite);
            let blackMoves = cBd.getMoves(tBlack);
            if (moves != "" || whiteMoves != "" || blackMoves != "") {
                localStorage.setItem("moves", moves);
                localStorage.setItem("whiteMoves", whiteMoves);
                localStorage.setItem("blackMoves", blackMoves);
                localStorage.setItem("resetNum", cBd.resetNum);
                timerSave = null;
                //log("保存棋谱:" + moves);
            }
        }

        let loadData = (cBd) => {
            //console.log("loadData");
            let resetNum = localStorage.getItem("resetNum");
            let moves = localStorage.getItem("moves");
            let whiteMoves = localStorage.getItem("whiteMoves");
            let blackMoves = localStorage.getItem("blackMoves");
            if (parseInt(resetNum) > 0) cBd.resetNum = parseInt(resetNum);
            if (cBd.setMoves(moves)) cBd.unpackMoves(true);
            if (whiteMoves != "") cBd.unpackMoves(true, "white", whiteMoves);
            if (blackMoves != "") cBd.unpackMoves(true, "black", blackMoves);
        }

        // 数据量太大，localStorage存不下
        let saveContinueData = (data) => {
            let strData = JSON.stringify(data);
            //console.log(strData ? strData.length : "removeContinueData");
            localStorage.setItem("continueData", strData);
        }

        let loadContinueData = () => {
            let strData = localStorage.getItem("continueData");
            let data = strData ? JSON.parse(strData) : false;
            //console.log(data);
            return data;
        }

        return {
            "renjuSave": (cBd) => {
                renjuSave(cBd);
            },
            "renjuLoad": (cBd) => {
                renjuLoad(cBd);
            },
            "saveData": (cBd) => {
                saveData(cBd);
            },
            "loadData": (cBd) => {
                loadData(cBd);
            },
            "saveContinueData": (data) => {
                saveContinueData(data);
            },
            "loadContinueData": () => {
                return loadContinueData();
            },
        };
        })();