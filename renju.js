var loadApp = () => { // 按顺序加载应用
        "use strict";
        const TEST_LOADAPP = true;

        function log(param) {
            if (TEST_LOADAPP && DEBUG)
                console.log(`[renju.js]>>` + param);
        }
        
        window.URL_HOMES = ["https://lfz084.gitee.io/renju/",
        "https://lfz084.github.io/",
        "http://localhost:7700/"];
        window.URL_HOME = location.href.indexOf(URL_HOMES[0]) + 1 ? URL_HOMES[0] :
            location.href.indexOf(URL_HOMES[1]) + 1 ? URL_HOMES[1] : URL_HOMES[2];

        window.d = document;
        window.dw = d.documentElement.clientWidth;
        window.dh = d.documentElement.clientHeight;
        window.cWidth = dw < dh ? dw * 0.95 : dh * 0.95;
        cWidth = dw < dh ? cWidth : dh < dw / 2 ? dh : dw / 2;

        window.viewport = null;
        window.vConsole = null;
        window.openNoSleep = () => {};
        window.closeNoSleep = () => {};
        let cBoard = null; //棋盘对象

        window.alert = function(name) {
            const IFRAME = document.createElement('IFRAME');
            IFRAME.style.display = 'none';
            IFRAME.setAttribute('src', 'data:text/plain,');
            document.documentElement.appendChild(IFRAME);
            window.frames[0].window.alert(name);
            IFRAME.parentNode.removeChild(IFRAME);
        };

        window._loading = (() => {
            let timer = null;
            const WIN_LOADING = document.createElement("div"),
                DW = document.documentElement.clientWidth,
                DH = document.documentElement.clientHeight;

            let s = WIN_LOADING.style;
            s.position = "fixed";
            s.width = "150px";
            s.height = "150px";
            s.left = (DW - 150) / 2 + "px";
            s.top = (DH - 150) / 2 + "px";
            s.zIndex = 0x100000;
            //s.background = "#777";
            //s.opacity = "0.68";
            s.transform = `scale(${Math.min(DW, DH)/430})`;
            WIN_LOADING.innerHTML = `<div class="center-body"><div class="loader-ball-11"></div></div>`;
            //WIN_LOADING.innerHTML = `<div class="center-body"><div class="loader-ball-51"><div></div><div></div><div></div></div></div>`;
            //WIN_LOADING.innerHTML = `<div class="center-body"><div class="loader-ball-38"><div></div><div></div><div></div><div></div><div></div></div></div>`;
            //document.body.appendChild(WIN_LOADING);
            return {
                open: (msg) => {
                    if (!WIN_LOADING.parentNode) document.body.appendChild(WIN_LOADING);
                    if (timer) {
                        clearTimeout(timer);
                    }
                    timer = setTimeout(() => {
                        if (WIN_LOADING.parentNode) WIN_LOADING.parentNode.removeChild(WIN_LOADING);
                    }, 15 * 1000);
                },
                close: (msg) => {
                    //return;
                    if (timer) {
                        clearTimeout(timer);
                    }
                    timer = setTimeout(() => {
                        if (WIN_LOADING.parentNode) WIN_LOADING.parentNode.removeChild(WIN_LOADING);
                    }, 500);
                }
            };
        })();

        function resetNoSleep() {
            let noSleep;
            let isNoSleep = false; // bodyTouchStart 防止锁屏
            let noSleepTime = 0;
            if (typeof NoSleep == "function") {
                noSleep = new NoSleep();
                setInterval(function() {
                    if (isNoSleep) {
                        noSleep.enable();
                        //log("noSleep.enable()")
                    }
                    else {
                        noSleep.disable();
                        //log("noSleep.disable()")
                    }
                }, 15 * 1000);
            }
            window.openNoSleep = function() {
                if (noSleep) {
                    isNoSleep = true;
                }
            };
            window.closeNoSleep = function() {
                isNoSleep = false;
            };
        }

        function loadScript(src) {

            const filename = src.split("/").pop()
            return new Promise((resolve, reject) => {
                let oHead = document.getElementsByTagName('HEAD').item(0);
                let oScript = document.createElement("script");
                oHead.appendChild(oScript);
                oScript.type = "text/javascript";
                oScript.onload = () => {
                    log(`loadScript = ${filename}`);
                    resolve();
                }
                oScript.onerror = () => {
                    log(`loadScript_Error =[] ${filename} `);
                    reject();
                }
                oScript.src = src;
            });
        }

        function createScript(code) {

            return new Promise((resolve, reject) => {
                let oHead = document.getElementsByTagName('HEAD').item(0);
                let oScript = document.createElement("script");
                oHead.appendChild(oScript);
                oScript.type = "text/javascript";
                oScript.text = code;
                resolve();
            });
        }

        function loadScriptAll() {
            const scriptList = [
                "script/viewport.js",
                "script/vConsole/vconsole.min.js",
                "script/button-0721.js",
                "script/engine.js",
                "script/appData.js",
                "script/control_0721.js",
                "script/msgbox-0721.js",
                "script/checkerBoard-0721.js",
                "script/worker.js",
                "script/NoSleep.min.js",
                "script/jsPDF/jspdf.umd_01.js",
                "script/jsPDF/PFSCMedium.js",
                "script/jsPDF/PFSCHeavy.js",
                ];

            return new Promise((resolve, reject) => {
                loadScript(scriptList[0])
                    .then(() => {
                        window.viewport = new view(dw);
                        return loadScript(scriptList[1])
                    })
                    .then(() => {
                        openVConsole();
                        return loadScript(scriptList[2])
                    })
                    .then(() => { return loadScript(scriptList[3]) })
                    .then(() => { return loadScript(scriptList[4]) })
                    .then(() => { return loadScript(scriptList[5]) })
                    .then(() => { return loadScript(scriptList[6]) })
                    .then(() => { return loadScript(scriptList[7]) })
                    .then(() => { return loadScript(scriptList[8]) })
                    .then(() => { return loadScript(scriptList[9]) })
                    .then(() => { return loadScript(scriptList[10]) })
                    .then(() => { return loadScript(scriptList[11]) })
                    .then(() => { return loadScript(scriptList[12]) })
                    .then(() => {
                        createScript(`var { jsPDF } = window.jspdf;`);
                        resolve();
                    })
                    .catch((err) => {
                        reject(err);
                    })
            });
        }

        function registerserviceWorker() {

            return new Promise((resolve, reject) => {
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.addEventListener('statechange', function(e) {
                        log(' >>> ' + e.target.state);
                    });
                    navigator.serviceWorker.addEventListener("message", function(event) {
                        const MSG = event.data;
                        log(MSG);
                        if (MSG.indexOf("load finish") + 1) {
                            window._loading.close(MSG);
                            //log(`close`);
                        }
                        else if (MSG.indexOf("loading...") + 1) {
                            window._loading.open(MSG);
                            //log(`open`);
                        }
                    });
                    // 开始注册service workers
                    navigator.serviceWorker.register('./sw.js', {
                        scope: './'
                    }).then(function(registration) {
                        var serviceWorker;
                        if (registration.installing) {
                            serviceWorker = registration.installing;
                        } else if (registration.waiting) {
                            serviceWorker = registration.waiting;
                        } else if (registration.active) {
                            serviceWorker = registration.active;
                        }
                        if (serviceWorker) {
                            log(`serviceWorker.state=${serviceWorker.state}`)
                        }
                        resolve();
                    }).catch(function(error) {
                        reject(error);
                    });
                } else {
                    resolve();
                }
            });
        }

        function openVConsole() {
            if (String(window.location).indexOf("http://localhost") == 0) {
                if (vConsole == null) vConsole = new VConsole();
            }
        }

        var reload = (() => {
                    let count = 0;
                    return () => {
                            if (count++< 3) return false;
                setTimeout(() => { window.location.reload() }, 1000);
                return true;
            }
        })();

        function createUI() {
            try {
                let bodyDiv = d.createElement("div");
                d.body.appendChild(bodyDiv);
                bodyDiv.style.position = "absolute";
                bodyDiv.style.width = "100%";
                bodyDiv.style.height = dw < dh ? cWidth * 4 + "px" : "100%";
                bodyDiv.style.left = "0px";
                bodyDiv.style.top = "0px";
                bodyDiv.style.opacity = "0";
                //bodyDiv.style.backgroundColor = "black";
                
                let upDiv = d.createElement("div");
                bodyDiv.appendChild(upDiv);
                upDiv.style.position = "absolute";
                upDiv.style.width = "0px";
                upDiv.style.height = "0px";
                upDiv.style.left = dw > dh ? parseInt((dw - cWidth * 2) / 2) + "px" : (dw - cWidth) / 2 + "px";
                upDiv.style.top = dw > dh ? (dh - cWidth) / 2 + "px" : cWidth + "px";
                //upDiv.style.backgroundColor = "green";

                let downDiv = d.createElement("div");
                bodyDiv.appendChild(downDiv);
                downDiv.style.position = "absolute";
                downDiv.style.width = "0px";
                downDiv.style.height = "0px";
                downDiv.style.left = dw > dh ? parseInt((dw - cWidth * 2) / 2) + cWidth + "px" : "0px";
                downDiv.style.top = dw > dh ? parseInt(upDiv.style.top) + parseInt(cWidth / 13) + "px" : cWidth * 2.06 + "px";
                //downDiv.style.backgroundColor = "blue";

                cBoard = new checkerBoard(upDiv, 0, 0, cWidth, cWidth);
                cBoard.printCheckerBoard();

                control.reset(cBoard, engine, msg, closeMsg, appData, dw, dh, [downDiv, 0, 0, cWidth, cWidth], bodyDiv);
                appData.renjuLoad(cBoard);
                
                return bodyDiv;
            }
            catch (err) {
                if (!reload()) document.body.innerHTML = `<div><h1>出错啦</h1><h3><p>${err}</p><h3><h2><a onclick="window.location.reload()">点击刷新</a></h2></div>
                                `;
            }
        }

    registerserviceWorker()
        .then(() => { return loadScriptAll() })
        .then(()=>{
                resetNoSleep();
                const UI = createUI();
                viewport.resize();
                setTimeout(() => {
                    UI.style.opacity = "1";
                }, 500);
                window.DEBUG = false;
        })
        .catch((err)=>{
            alert(err);
        })
};