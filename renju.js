var loadApp = () => { // 按顺序加载应用
        "use strict";
        const TEST_LOADAPP = true;

        function log(param) {
            if (TEST_LOADAPP && DEBUG)
                console.log(`[renju.js]\n>> ` + param);
        }

        window.URL_HOMES = ["https://lfz084.gitee.io/renju/",
        "https://lfz084.github.io/",
        "http://localhost:7700/"];
        window.URL_HOME = location.href.indexOf(URL_HOMES[0]) + 1 ? URL_HOMES[0] :
            location.href.indexOf(URL_HOMES[1]) + 1 ? URL_HOMES[1] : URL_HOMES[2];

        window.d = document;
        window.dw = d.documentElement.clientWidth;
        window.dh = d.documentElement.clientHeight;
        window.cWidth = dw < dh ? dw * 0.95 : dh * 0.95; //棋盘宽度
        cWidth = dw < dh ? cWidth : dh < dw / 2 ? dh : dw / 2;

        window.viewport1 = null; // 控制缩放
        window.vConsole = null; // 调试工具
        window.openNoSleep = () => {}; //打开防休眠
        window.closeNoSleep = () => {}; //关闭防休眠
        let cBoard = null; //棋盘对象

        window.alert = function(name) { //更改默认标题
            const IFRAME = document.createElement('IFRAME');
            IFRAME.style.display = 'none';
            IFRAME.setAttribute('src', 'data:text/plain,');
            document.documentElement.appendChild(IFRAME);
            window.frames[0].window.alert(name);
            IFRAME.parentNode.removeChild(IFRAME);
        };

        window._loading = (function() { //控制加载动画
            let timer = null;
            const WIN_LOADING = document.createElement("div"),
                ANIMA = document.createElement("div"),
                LABEL = document.createElement("div"),
                DW = document.documentElement.clientWidth,
                DH = document.documentElement.clientHeight;
            const triangle = `<div class="center-body"><div class="loader-ball-51"><div></div><div></div><div></div></div></div>`,
                ball = `<div class="center-body"><div class="loader-ball-38"><div></div><div></div><div></div><div></div><div></div></div></div>`,
                black_white = `<div class="center-body"><div class="loader-ball-11"></div></div>`;
            let lock = false;
            let s = WIN_LOADING.style;
            s.position = "fixed";
            s.width = "150px";
            s.height = "150px";
            s.left = (DW - 150) / 2 + "px";
            s.top = (DH - 150) / 2 + "px";
            s.zIndex = 0xffffff;
            //s.background = "#777";
            //s.opacity = "0.68";
            s.transform = `scale(${Math.min(DW, DH)/430})`;
            WIN_LOADING.setAttribute("class", "finish");

            s = ANIMA.style;
            s.position = "absolute";
            s.width = "150px";
            s.height = "150px";
            s.left = "0px";
            s.top = "0px";
            ANIMA.innerHTML = black_white;
            WIN_LOADING.appendChild(ANIMA);

            s = LABEL.style;
            s.position = "absolute";
            s.width = "150px";
            s.height = "25px";
            s.left = "0px";
            s.top = "150px";
            s.fontSize = "15px";
            s.textAlign = "center";
            s.lineHeight = "25px";
            WIN_LOADING.appendChild(LABEL);

            return {
                open: (msg) => { //打开动画
                    if (lock) return;
                    log("_loading.open")
                    if (!WIN_LOADING.parentNode) document.body.appendChild(WIN_LOADING);
                    if (timer) {
                        clearTimeout(timer);
                    }
                    timer = setTimeout(() => {
                        if (WIN_LOADING.parentNode) WIN_LOADING.parentNode.removeChild(WIN_LOADING);
                    }, 15 * 1000);
                },
                close: (msg) => { //关闭动画
                    if (lock) return;
                    log("_loading.close")
                    if (timer) {
                        clearTimeout(timer);
                    }
                    timer = setTimeout(() => {
                        if (WIN_LOADING.parentNode) WIN_LOADING.parentNode.removeChild(WIN_LOADING);
                        LABEL.innerHTML = "";
                    }, 500);
                },
                lock: (value = false) => { lock = value }, //锁定后，不开打开或关闭
                text: (text = "") => { //动画标题，可以用来显示进度百分百
                    LABEL.innerHTML = text;
                },
            };
        })();

        function resetNoSleep() { //设置防休眠
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

        function loadCss(url) { //加载css
            const filename = url.split("/").pop()
            return new Promise((resolve, reject) => {
                let head = document.getElementsByTagName('head')[0];
                let _link = document.createElement('link');
                _link.rel = "preload";
                _link.as = "style";
                _link.href = url;
                head.appendChild(_link);
                let link = document.createElement('link');
                link.type = 'text/css';
                link.rel = 'stylesheet';
                link.onload = () => {
                    log(`loadCss = ${filename}`);
                    setTimeout(() => {
                        resolve();
                    }, 0);
                }
                link.onerror = (err) => {
                    log(`loadCss_Error =[] ${filename} `);
                    reject(err);
                }
                link.href = url;
                head.appendChild(link);
            });
        }

        function loadFont(url) { //加载字体文件
            const filename = url.split("/").pop()
            return new Promise((resolve, reject) => {
                function reqListener() {
                    log(`loadFont = ${filename}`);
                    setTimeout(() => {
                        resolve();
                    }, 0);
                }
                let oReq = new XMLHttpRequest();
                oReq.addEventListener("load", reqListener);
                oReq.open("GET", url);
                oReq.send();
            });
        }

        function loadFile(url) { //加载字体文件
            const filename = url.split("/").pop()
            return new Promise((resolve, reject) => {
                function reqListener() {
                    log(`loadFile = ${filename}`);
                    setTimeout(() => {
                        resolve();
                    }, 0);
                }
                let oReq = new XMLHttpRequest();
                oReq.addEventListener("load", reqListener);
                oReq.open("GET", url);
                oReq.send();
            });
        }

        function loadScript(url) { //加载脚本
            const filename = url.split("/").pop()
            return new Promise((resolve, reject) => {
                let oHead = document.getElementsByTagName('HEAD').item(0);
                let oScript = document.createElement("script");
                oHead.appendChild(oScript);
                oScript.type = "text/javascript";
                oScript.rel = "preload";
                oScript.as = "script";
                oScript.onload = () => {
                    log(`loadScript = ${filename}`);
                    setTimeout(() => {
                        resolve();
                    }, 0);
                }
                oScript.onerror = (err) => {
                    log(`loadScript_Error = ${filename} `);
                    reject(err);
                }
                oScript.src = url;
            });
        }

        function createScript(code) { // 用code 创建脚步
            return new Promise((resolve, reject) => {
                let oHead = document.getElementsByTagName('HEAD').item(0);
                let oScript = document.createElement("script");
                oHead.appendChild(oScript);
                oScript.type = "text/javascript";
                oScript.text = code;
                resolve();
            });
        }

        Promise.queue = function(thenables) { // 顺序执行 thenable
            return new Promise((resolve, reject) => {
                function nextPromise() {
                    if (thenables.length) {
                        let t = thenables[0];
                        thenables.splice(0, 1);
                        Promise.resolve(t)
                            .then(nextPromise)
                            .catch((err) => {
                                reject(err);
                            })
                    }
                    else {
                        return resolve();
                    }
                }
                nextPromise();
            })
        }

        function createThenable(loadFun, fileName, callback) { // 返回thenable
            return {
                then: function(onFulfill, onReject) {
                    onFulfill(
                        loadFun(fileName)
                        .then(() => {
                            return new Promise((resolve, reject) => {
                                if (typeof callback == "function") callback();
                                setTimeout(() => {
                                    resolve();
                                }, 0)
                            });
                        })
                    )
                }
            };
        }

        function createThenables(loadFun, config) {
            let ts = [];
            for (let i = 0; i < config.length; i++) {
                ts.push(createThenable(loadFun, config[i][0], config[i][1]));
            }
            return ts;
        }

        function loadAll(loadFun, config, ayc = false) {
            const thenables = createThenables(loadFun, config);
            if (ayc) {
                let ps = [];
                for (let i = 0; i < thenables.length; i++) {
                    ps.push(Promise.resolve(thenables[i]));
                }
                return Promise.all(ps);
            }
            else {
                return Promise.queue(thenables);
            }
        }

        function loadCssAll(config, ayc = false) {
            return loadAll(loadCss, config, ayc);
        }

        function loadFontAll(config, ayc = false) {
            return loadAll(loadFont, config, ayc);
        }

        function loadScriptAll(config, ayc = false) {
            return loadAll(loadScript, config, ayc);
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
                        if (MSG.indexOf("loading...") + 1) {
                            window._loading.open(MSG);
                            //log(`open`);
                        }
                        else if (MSG.indexOf("load finish") + 1) {
                            window._loading.close(MSG);
                            //log(`close`);
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
            const IS_DEBUG = localStorage.getItem("debug");
            if (IS_DEBUG == "true") {
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
                bodyDiv.setAttribute("class", "finish");
                
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
        .then(() => { 
            window._loading.open("loading...");
            window._loading.lock(true);
            window._loading.text("0%");
            return loadCssAll([
                ["style/loaders.css"],
                ["style/main.css"],
            ],true)
        })
        .then(() => {
            window._loading.text("5%");
            return loadFontAll([
                ["style/font/PFSCMedium1.woff"],
                ["style/font/PFSCMedium1.ttf"],
                ["style/font/PFSCHeavy1.ttf"],
                ["style/font/PFSCHeavy1.woff"],
            ], true) 
        })
        .then(() => { 
            window._loading.text("30%");
            return loadScriptAll([  //顺序 同步加载
                ["script/viewport-0721.js",()=>{
                    window.viewport1 = new view(dw);
                }],
                ["script/vConsole/vconsole.min.js",()=>{
                    openVConsole();
                }],
                ["script/button-0721.js"],
                ["script/emoji.js"],// first load emoji
                ],false)
        })
        .then(() => {
            window._loading.text("50%");
            return loadScriptAll([
                ["script/checkerBoard-0721.js"],
                ["script/control_0721.js"],
                ["script/msgbox-0721.js"],
                ["script/appData-0721.js"],
                ["script/worker-0721.js"],
                ["script/engine-0721.js"],
                ["script/NoSleep.min.js"],
                ["script/jsPDF/jspdf.umd_01.js"],
                ], true)
        })
        .then(() => {
            window._loading.text("90%");
            return loadScriptAll([
                ["script/jsPDF/PFSCMedium.js"],
                ["script/jsPDF/PFSCHeavy.js"],
            ], true)
        })
        .then(()=>{
            window._loading.text("99%");
            resetNoSleep();
            const UI = createUI();
            window.viewport1.resize();
            window._loading.lock(false);
            window._loading.close("load finish");
            setTimeout(() => {
                UI.style.opacity = "1";
            }, 300);
            log(window.navigator.userAgent)
            window.DEBUG = true;
            window.jsPDF = window.jspdf.jsPDF;})
        .catch((err)=>{
            setTimeout(() => {
                const MSG = "打开网页出错, 准备刷新\n" + err;
                alert(MSG);
                window.location.reload();
            },0);});
};