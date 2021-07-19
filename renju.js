
var loadApp = () => {

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
                IMG_LOAD = document.createElement("img"),
                DW = document.documentElement.clientWidth,
                DH = document.documentElement.clientHeight;

            let s = WIN_LOADING.style;
            s.position = "fixed";
            s.width = "150px";
            s.height = "150px";
            s.left = (DW - 150) / 2 + "px";
            s.top = (DH - 150) / 2 + "px";
            s.zIndex = 0x100000;
            s.transform = `scale(${DW/800})`;
            //document.body.appendChild(WIN_LOADING);

            s = IMG_LOAD.style;
            s.position = "absolute";
            s.width = "150px";
            s.height = "150px";
            s.left = "0px";
            s.top = "0px";
            s.opacity = "0.68";
            IMG_LOAD.src = "./pic/ball-triangle.svg";
            WIN_LOADING.appendChild(IMG_LOAD);

            return {
                open: (msg) => {
                    if (!WIN_LOADING.parentNode) document.body.appendChild(WIN_LOADING);
                    if (timer) {
                        clearTimeout(timer);
                    }
                    timer = setTimeout(() => {
                        if (WIN_LOADING.parentNode) WIN_LOADING.parentNode.removeChild(WIN_LOADING);
                    }, 3 * 1000);
                },
                close: (msg) => {
                    //if (!WIN_LOADING.parentNode) document.body.appendChild(WIN_LOADING);
                    if (timer) {
                        clearTimeout(timer);
                    }
                    timer = setTimeout(() => {
                        if (WIN_LOADING.parentNode) WIN_LOADING.parentNode.removeChild(WIN_LOADING);
                    }, 100);
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
                        //console.log("noSleep.enable()")
                    }
                    else {
                        noSleep.disable();
                        //console.log("noSleep.disable()")
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

            return new Promise((resolve, reject) => {
                let oHead = document.getElementsByTagName('HEAD').item(0);
                let oScript = document.createElement("script");
                oHead.appendChild(oScript);
                oScript.type = "text/javascript";
                oScript.onload = () => {
                    console.log(`loadScript = ${src}`);
                    resolve();
                }
                oScript.onerror = () => {
                    console.log(`loadScript_Error =[] ${src} `);
                    reject();
                }
                oScript.src = src;
            });
        }

        function loadScriptAll() {
            const scriptList = ["script/viewport.js",
                "script/button.js",
                "script/engine.js",
                "script/appData.js",
                "script/control_0715.js",
                "script/msgbox.js",
                "script/checkerBoard.js",
                "script/worker.js",
                "script/NoSleep.min.js",
                "script/vConsole/vconsole.min.js",
                "script/jsPDF/jspdf.umd_01.js",
                "script/jsPDF/PFSCMedium.js",
                "script/jsPDF/PFSCHeavy.js",
                ];

            return new Promise((resolve, reject) => {
                loadScript(scriptList[0])
                    .then(() => { 
                        window.viewport = new view(dw);
                        return loadScript(scriptList[1]) })
                    .then(() => { return loadScript(scriptList[2]) })
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
                        console.log(' >>> ' + e.target.state);
                    });
                    navigator.serviceWorker.addEventListener("message", function(event) {
                        const MSG = event.data;
                        //console.log(MSG);
                        if (MSG.indexOf("load finish") + 1) {
                            window._loading.close(MSG);
                            //console.log(`close`);
                        }
                        else if (MSG.indexOf("loading...") + 1) {
                            window._loading.open(MSG);
                            //console.log(`open`);
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
                            console.log(`serviceWorker.state=${serviceWorker.state}`)
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
                
                setTimeout(()=>{
                    viewport.resize()
                },500);
            }
            catch (err) {
                if (!reload()) document.body.innerHTML = `<div><h1>出错啦</h1><h3><p>${err}</p><h3><h2><a onclick="window.location.reload()">点击刷新</a></h2></div>
                                `;
            }
        }

    registerserviceWorker()
        .then(() => { return loadScriptAll() })
        .then(()=>{
                openVConsole();
                resetNoSleep();
                createUI();
        })
        .catch((err)=>{
            alert(err);
        })
};