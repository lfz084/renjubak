self.SCRIPT_VERSIONS["renju"] = "v1202.29";
var loadApp = () => { // 按顺序加载应用
    "use strict";
    const TEST_LOADAPP = true;
    const TEST_SERVER_WORKER = true;
    let logCommands = [];
    function log(param, type = "log") {
        const command = {
            log: ()=>{console.log(param)},
            info: ()=>{console.info(param)},
            error: ()=>{console.error(param)},
            warn: ()=>{console.warn(param)},
            assert: ()=>{console.assert(param)},
            clear: ()=>{console.clear(param)},
            count: ()=>{console.count(param)},
            group: ()=>{console.group(param)},
            groupCollapsed: ()=>{console.groupCollapsed(param)},
            groupEnd: ()=>{console.groupEnd(param)},
            table: ()=>{console.table(param)},
            time: ()=>{console.time(param)},
            timeEnd: ()=>{console.timeEnd(param)},
            trace: ()=>{console.trace(param)},
        }
        let print = command[type] || console.log;
        if (TEST_LOADAPP && DEBUG) {
            print(`[renju.js]\n>> ` + param);
        }
    }
    
    function testConsole(){
        console.clear("clear")
        console.info("info")
        console.error("error")
        console.warn("warn")
        console.assert("assert")
        console.count("count")
        console.group("group")
        console.group("group1")
        console.groupEnd("groupEnd")
        console.groupCollapsed("groupCollapsed")
        console.groupCollapsed("groupCollapsed1")
        console.groupEnd("groupEnd")
        console.table("table")
        console.time("time")
        console.timeEnd("timeEnd")
        console.trace("trace")
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
    cWidth = dw < dh ? cWidth : dh < ~~(dw / 2 * 0.985) ? dh : ~~(dw / 2 * 0.985);

    window.viewport1 = null; // 控制缩放
    window.vConsole = null; // 调试工具
    window.openNoSleep = () => {}; //打开防休眠
    window.closeNoSleep = () => {}; //关闭防休眠
    window.cBoard = null; //棋盘对象

    window.alert = function(name) { //更改默认标题
        const IFRAME = document.createElement('IFRAME');
        IFRAME.style.display = 'none';
        IFRAME.setAttribute('src', 'data:text/plain,');
        document.documentElement.appendChild(IFRAME);
        window.frames[0].window.alert(name);
        IFRAME.parentNode.removeChild(IFRAME);
    };
    
    window.addEventListener("error", function(err){
        log(err.Stack || err.message || err, "error");
        //alert(err.Stack || err.message || err);
    });
    
    window._loading = (function() { //控制加载动画
        let timer = null;
        const WIN_LOADING = document.createElement("div"),
            ANIMA = document.createElement("div"),
            LABEL = document.createElement("div"),
            DW = document.documentElement.clientWidth,
            DH = document.documentElement.clientHeight;
        const triangle = `<div class="center-body"><div class="loader-ball-51"><div></div><div></div><div></div></div></div>`,
            ball = `<div class="center-body"><div class="loader-ball-38"><div></div><div></div><div></div><div></div><div></div></div></div>`,
            black_white = `<div class="center-body"><div class="loader-ball-11"></div></div>`,
            busy = `<div class="center-body"><div class="loader-circle-101"></div></div>`;
        const ANIMA_NANE = {
            "triangle": triangle,
            "ball": ball,
            "black_white": black_white,
            "busy": busy,
        }
        let lock = false;
        let s = WIN_LOADING.style;
        s.position = "fixed";
        s.width = "150px";
        s.height = "150px";
        s.left = (DW - 150) / 2 + "px";
        s.top = (DH - 150) / 2 + "px";
        s.zIndex = 0xffffff;
        s.transform = `scale(${Math.min(DW, DH)/430})`;
        WIN_LOADING.setAttribute("class", "finish");

        s = ANIMA.style;
        s.position = "absolute";
        s.width = "150px";
        s.height = "150px";
        s.left = "0px";
        s.top = "0px";
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
        s.background = "none";
        s.opacity = 0.7;
        WIN_LOADING.appendChild(LABEL);

        return {
            open: (animaName, _timeout) => { //打开动画
                if (lock) return;
                //log("_loading.open","warn");
                if (!WIN_LOADING.parentNode) {
                    ANIMA.innerHTML = ANIMA_NANE[animaName] || black_white;
                    document.body.appendChild(WIN_LOADING);
                }
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    if (!lock && WIN_LOADING.parentNode) WIN_LOADING.parentNode.removeChild(WIN_LOADING);
                }, _timeout || 30 * 1000);
            },
            close: () => { //关闭动画
                if (lock) return;
                //log("_loading.close","warn");
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    if (WIN_LOADING.parentNode) WIN_LOADING.parentNode.removeChild(WIN_LOADING);
                    LABEL.innerHTML = "";
                    LABEL.style.background = "none";
                }, 500);
            },
            lock: (value = false) => { lock = value }, //锁定后，不开打开或关闭
            text: (text = "") => { //动画标题，可以用来显示进度百分百
                LABEL.innerHTML = text;
                if(text) LABEL.style.background = "white";
            },
        };
    })();
    /*
    window.SaveResponse = function SaveResponse() {
        this.count = 0;
        this.response;
    }

    SaveResponse.prototype.saveResponse = function(request, cacheName = window.APP_VERSION) {
        let _self = this;

        function put() {
            return new Promise((resolve, reject) => {
                function newRequest(err) {
                    let myInit = { cache: "reload" };
                    fetch(request, myInit)
                        .then(response => {
                            if (_self.count++ >= 3) {
                                const MSG = `${err ? err.message: ""}\n put cache Error: count > 3 (${request.url.split("/").pop()})`
                                log(MSG, "error")
                                reject(new Error(MSG))
                                return;
                            }
                            //log(`putCache [${request.url.split("/").pop()}] \ncacheName = ${cacheName} --> ${_self.count}`)
                            if (!response.ok) throw new Error("response not OK")
                            _self.response = response;
                            return caches.open(cacheName)
                                .then(cache => {
                                    let cloneRes = _self.response.clone();
                                    cache.put(request, cloneRes)
                                    setTimeout(() => {
                                        cache.match(request)
                                            .then(response => {
                                                if (response && response.ok)
                                                    resolve(response)
                                                else
                                                    newRequest()
                                            })
                                            .catch (err => {
                                                    newRequest(err)
                                            })
                                    }, 200)
                                })
                                .catch(err => {
                                    setTimeout(() => {
                                        newRequest(err)
                                    }, 200)
                                })
                        })
                        .catch(err => {
                            setTimeout(() => {
                                newRequest(err)
                            }, 200)
                        })
                }
                newRequest();
            })
        }

        return new Promise((resolve, reject) => {
            if ("caches" in window) {
                put().then(resolve).catch(reject)
            }
            else {
                resolve()
            }
        })
    }
    */
    window.logCaches = function() {
        if ("caches" in window) {
            let cs = `_____________________\n`;
            return caches.keys()
                .then(function(cachesNames) {
                    cachesNames.length==0 && typeof showLabel=="function" && showLabel(`️⚠ ️缓存异常 不能离线运行 刷新一下吧!`);
                    cs += `________ 离线缓存 ${cachesNames.length}个 ________\n\n`
                    cachesNames.forEach(function(cache, index, array) {
                        cs += `.\t[${cache}]\n`
                    });
                    cs += `_____________________\n`;
                    log(cs, "warn");
                    return Promise.resolve();
                });
        }
        else {
            return Promise.resolve()
        }
    }

    window.logCache = function(cacheName) {
        if ("caches" in window) {
            let cs = `_____________________\n`;
            return caches.open(cacheName)
                .then(function(cache) {
                    return cache.keys()
                        .then(function(keys) {
                            keys.length==0 && typeof showLabel=="function" && showLabel(`️⚠ ️缓存异常 不能离线运行 刷新一下吧!`);
                            cs += `______ [${cacheName}]  ${keys.length} 个文件 ______\n\n`
                            keys.forEach(function(request, index, array) {
                                cs += `.\t${request.url.split("/").pop()}\n`
                            });
                            cs += `_____________________\n`;
                            log(cs);
                            return Promise.resolve();
                        });
                })
        }
        else {
            return Promise.resolve();
        }
    }

    function initNoSleep() { //设置防休眠
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
    /*
    function putCache(url) {
        return new Promise((resolve, reject) => {
            new SaveResponse().saveResponse(new Request(url))
                .then(response => {
                    resolve()
                })
                .catch(err => {
                    log(`putCache Error: ${err.message}`, "error")
                    reject(err)
                })
        })
    }
    
    function downloadSource(){
        let ps=[];
        let keys = Object.keys(window.SOURCE_FILES);
        for(let i=0; i<keys.length; i++){
            ps.push(putCache(window.SOURCE_FILES[keys[i]] + "?v=" + window.APP_VERSION));
        }
        return Promise.all(ps.slice(0,29))
            .then(()=> log("---更新离线缓存--->ok", "warn"))
            .catch(err =>log(`---更新离线缓存失败---> ${err.message}`, "error"))
    }
    */
    function loadCss(url) { //加载css
        url = url.split("?")[0] + window.URL_VERSION;
        const filename = url.split("/").pop().split("?")[0];
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
                //log(`loadCss "${filename}"`);
                setTimeout(() => {
                    resolve()
                }, 0)
            }
            link.onerror = (err) => {
                let message = `loadCss_Error: "${filename}"`;
                reject(new Error(message));
                //log(message);
            }
            link.href = url;
            head.appendChild(link);
        });
    }
    
    function loadFile(url, msgTitle = "loadFile_Error") { //加载文件
        url = url.split("?")[0] + window.URL_VERSION;
        const filename = url.split("/").pop().split("?")[0];
        return new Promise((resolve, reject) => {
            function reqListener() {
                //log(`${msgTitle} "${filename}"`);
                setTimeout(() => {
                    resolve()
                }, 0)
            }

            function err(err) {
                let message = `${msgTitle}: "${filename}"`;
                reject(new Error(message));
                //log(message);
            }
            let oReq = new XMLHttpRequest();
            oReq.addEventListener("load", reqListener);
            oReq.addEventListener("error", err);
            oReq.open("GET", url);
            oReq.send();
        });
    }

    function loadFont(url) { //加载字体文件
        return loadFile(url, "loadFont_Error");
    }

    function loadTxT(url) { //加载文件
        return loadFile(url, "loadTxT_Error");
    }

    function loadScript(url) { //加载脚本
        url = url.split("?")[0] + window.URL_VERSION;
        const filename = url.split("/").pop().split("?")[0];
        return new Promise((resolve, reject) => {
            let oHead = document.getElementsByTagName('HEAD').item(0);
            let oScript = document.createElement("script");
            oHead.appendChild(oScript);
            oScript.type = "text/javascript";
            oScript.rel = "preload";
            oScript.as = "script";
            oScript.onload = () => {
                //log(`loadScript "${filename}"`);
                setTimeout(() => {
                    let key = filename.split(/[\-\_\.]/)[0];
                    window.checkScriptVersion(key)
                        .then(() => {
                            setTimeout(() => {
                                resolve()
                            }, 0)
                        })
                        .catch(reject)
                }, 0);
            }
            oScript.onerror = (err) => {
                let message = `loadScript_Error: "${filename}"\n${err.message}`;
                reject(new Error(message));
                //log(message,"error");
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
            setTimeout(resolve, 100);
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
                        .catch(reject)
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
                    Promise.resolve()
                    .then(() => {
                        return new Promise((resolve, reject) => {
                            function _timeout() {
                                reject(new Error(`Error: 连接网络超时\n文件"${fileName}"下载失败`));
                            }
                            setTimeout(_timeout, 30 * 1000);
                            loadFun(fileName)
                                .then(resolve)
                                .catch(reject)
                        })
                    })
                    .then(() => {
                        return new Promise((resolve, reject) => {
                            setTimeout(() => {
                                try {
                                    let p;
                                    if (typeof callback == "function") p = callback();
                                    if (typeof p == "object" &&
                                        typeof p.then == "function" &&
                                        typeof p.catch == "function") {
                                        p.then(resolve).catch(reject) // p == Promise
                                    }
                                    else {
                                        resolve();
                                    }
                                }
                                catch (err) {
                                    reject(err)
                                }
                            }, 0)
                        });
                    })
                )
            },
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

    function loadFileAll(config, ayc = false) {
        return loadAll(loadFile, config, ayc);
    }

    function loadScriptAll(config, ayc = false) {
        return loadAll(loadScript, config, ayc);
    }

    let serviceWorker_state,
        serviceWorker_state_history = [];

    function registerserviceWorker() {
        return new Promise((resolve, reject) => {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.addEventListener('statechange', function(e) {
                    log(' >>> ' + e.target.state);
                });
                navigator.serviceWorker.addEventListener("message", function(event) {
                    if (typeof event.data == "string") {
                        const MSG = event.data;
                        TEST_SERVER_WORKER && log(`[serviceWorker onmessage: ${event.data}]`, "warn")
                        if (MSG.indexOf("loading...") + 1) {
                            window._loading.open();
                            //log(`open`);
                        }
                        else if (MSG.indexOf("load finish") + 1) {
                            window._loading.close();
                            //log(`close`);
                        }
                    }
                    else {
                        TEST_SERVER_WORKER && log(`[serviceWorker onmessage: ${event.data}]`, "warn")
                    }
                });
                // 开始注册service workers
                navigator.serviceWorker.register('./sw.js', {
                    scope: './'
                }).then(function(registration) {
                    var serviceWorker;
                    function statechange(state){
                        serviceWorker_state = state;
                        serviceWorker_state_history.push(serviceWorker_state)
                        //log(`serviceWorker.state=${serviceWorker_state}`, "warn");
                        if (serviceWorker_state == "activated" ||
                            serviceWorker_state == "waiting" ||
                            serviceWorker_state == "redundant")
                            resolve()
                    }
                    function registerError(){
                        reject(new Error("注册 serviceWorker 失败"))
                    }
                    if (registration.installing) {
                        serviceWorker = registration.installing;
                    } else if (registration.waiting) {
                        serviceWorker = registration.waiting;
                    } else if (registration.active) {
                        serviceWorker = registration.active;
                    }
                    if (serviceWorker) {
                        statechange(serviceWorker.state)
                        serviceWorker.addEventListener('statechange', function(e) {
                            statechange(e.target.state)
                        });
                        setTimeout(registerError, 15 * 1000);
                    }
                    else{
                        registerError();
                    }
                    
                }).catch(function(error) {
                    reject(new Error(error));
                });
            } else {
                resolve();
            }
        });
    }
    
    function fetchTXT(url) {
        if (url.indexOf("https://") == -1 && url.indexOf("http://") == -1) {
            url = URL_HOME + url;
        }
        alert(url)
        return new Promise((resolve, reject) => {
            let text = "",
                timer;
            alert(`${navigator.serviceWorker}, ${navigator.serviceWorker.controller}`)
            if (navigator.serviceWorker && navigator.serviceWorker.controller) {
                navigator.serviceWorker.onmessage = function(event) {
                    console.error(event.data)
                    if (event.data.type == "text") {
                        text = event.data.text;
                        rm();
                    }
                }
            
                function rm() {
                    navigator.serviceWorker.onmessage = undefined;
                    clearTimeout(timer);
                    resolve(text);
                }
                navigator.serviceWorker.controller.postMessage({ cmd: "fetchTXT", url: url });
                timer = setTimeout(rm, 30 * 1000);
            }
            else {
                resolve(text);
            }
        })
    }
    /*
    setTimeout(()=>{
    fetchTXT("renju.html").then(alert)
    },5000)
    */

    function upData() {  // find UpData open msg
        function getNewVersion() {
            return new Promise((resolve, reject) => {
                loadTxT("./renju.html?v=" + window.APP_VERSION)
                    .then(txt => {
                        const versionCode = (/\"v\d+\.*\d*\"\;/).exec(txt);
                        const version = versionCode ?
                            String(versionCode).split(/[\"\;]/)[1] :
                            undefined;
                        resolve({
                            version: version,
                            isNewVersion: version && version != window.APP_VERSION
                        })
                    })
                    .catch(err => {
                        reject(err)
                    })
            })
        }

        if ("serviceWorker" in navigator) {
            return getNewVersion()
                .then(version => {
                    if (version.isNewVersion)
                        return msgbox("发现新版本 是否立即更新？", "立即更新", undefined, "下次更新")
                            .then(({butCode}) => {
                                butCode == MSG_ENTER && window.reloadApp();
                                return Promise.resolve(version.version);
                            })
                            .catch(()=>{
                                return Promise.resolve();
                            })
                    return Promise.resolve();
                })
                .catch(()=>{
                    return Promise.resolve();
                })
        }
        else {
            return Promise.resolve()
        }
    }
    
    function searchUpData() {
        const TIMER_NEXT = 30 * 1000;
        let count = 0;
        function search() {
            if (count++ > 5) return;
            //log(`searchUpData ---> ${count}`, "warn");
            upData()
                .then(version => {
                    //log(`[${version}]`)
                    version || setTimeout(search, TIMER_NEXT)
                })
                .catch(err => {
                    log(`[${err}]`, "error")
                    setTimeout(search, TIMER_NEXT)
                })
        }
        if ("serviceWorker" in navigator) {
            setTimeout(search, 5 * 1000);
        }
        return Promise.resolve();
    }

    function autoShowUpDataInformation() {
        function lineWrap(str){
            return str.split(/\\n|<br>/).join("\n")
        }
        if ("localStorage" in window) {
            const OLD_VERDION = localStorage.getItem("RENJU_APP_VERSION");
            if (OLD_VERDION != window.APP_VERSION &&
                window.CHECK_VERSION &&
                (serviceWorker_state == "activated" ||
                    serviceWorker_state == "redundant" ||
                    serviceWorker_state == undefined)
            )
            {
                let infoArr = window.UPDATA_INFO[window.APP_VERSION];
                let lineNum = infoArr ? infoArr.length + 7 : 1;
                let Msg = lineNum > 1 ? "\n\t" : "";
                Msg += `摆棋小工具 更新完毕`;
                if (infoArr) {
                    Msg += `\n\t_____________________ `;
                    Msg += `\n\t版本： ${window.APP_VERSION}\n`;
                    for (let i = 0; i < infoArr.length; i++)
                        Msg += `\n\t${strLen(i+1, 2)}. ${lineWrap(infoArr[i])}`
                    Msg += `\n\t_____________________ `;
                }
                lineNum==1 ? showLabel(Msg): 
                    msg({ text: Msg, 
                        butNum: 2, 
                        lineNum: lineNum, 
                        textAlign: lineNum > 1 ? "left" : "center",
                        enterTXT: "关闭",
                        cancelTXT: "历史记录", 
                        callEnter: () => {}, 
                        callCancel: () => {window.open("./help/renjuhelp/versionHistory.html","helpWindow")}
                    });
                localStorage.setItem("RENJU_APP_VERSION", window.APP_VERSION);
                return true;
            }
        }
    }

    function logVersions() {
        let Msg = ` CHECK_VERSION = ${window.CHECK_VERSION}\n`;
        Msg += `_____________________\n\n `;
        Msg += `${strLen("主页  ", 30)}  版本号: ${window.APP_VERSION}\n`;
        for (let key in window.SCRIPT_VERSIONS) {
            Msg += `${strLen(key + ".js  ", 20, "-")}  版本号: ${self.SCRIPT_VERSIONS[key]}\n`;
        }
        Msg += `_____________________\n\n `;
        log(Msg, "warn")
    }

    function openVConsole() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    const IS_DEBUG = localStorage.getItem("debug");
                    if (IS_DEBUG == "true") {
                        if (vConsole == null) vConsole = new VConsole();
                        resolve(vConsole)
                    }
                    else{
                        resolve()
                    }
                }
                catch (err) {
                    reject(err)
                }
            }, 0)
        })
    }

    function testBrowser() {
        let Msg = "";
        Msg += `_____________________\n\n `;
        Msg += `serviceWorker: ${"serviceWorker" in navigator}\n`;
        Msg += `Worker: ${"Worker" in window}\n`;
        Msg += `caches: ${"caches" in window}\n`;
        const canvas = document.createElement("canvas");
        Msg += `canvas: ${!!canvas.getContext}\n`
        Msg += `canvas.toBlob: ${typeof canvas.toBlob=="function"}\n`;
        Msg += `canvas.toDataURL: ${typeof canvas.toDataURL=="function"}\n`;
        Msg += `localStorage: ${"localStorage" in window}\n`;
        Msg += `msSaveOrOpenBlob in navigator: ${"msSaveOrOpenBlob" in navigator}\n`;
        Msg += `download in HTMLAnchorElement.prototype: ${"download"  in HTMLAnchorElement.prototype}\n`;
        Msg += `_____________________\n\n `;
        Msg += `\nuserAgent: ${window.navigator.userAgent}\n`
        Msg += `_____________________\n\n `;
        window.TEST_INFORMATION = window.BROWSER_INFORMATION = "\nBROWSER_INFORMATION:\n" + Msg;
        //log("testBrowser:\n" + Msg);
    }

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
            setTimeout(() => { bodyDiv.style.opacity = "1" }, 300);

            let upDiv = d.createElement("div");
            bodyDiv.appendChild(upDiv);
            upDiv.style.position = "absolute";
            upDiv.style.width = "0px";
            upDiv.style.height = "0px";
            upDiv.style.left = dw > dh ? ~~((dw - cWidth * 2) / 2) + "px" : (dw - cWidth) / 2 + "px";
            upDiv.style.top = dw > dh ? (dh - cWidth) / 2 + "px" : cWidth + "px";
            //upDiv.style.backgroundColor = "green";

            let downDiv = d.createElement("div");
            bodyDiv.appendChild(downDiv);
            downDiv.style.position = "absolute";
            downDiv.style.width = "0px";
            downDiv.style.height = "0px";
            downDiv.style.left = dw > dh ? ~~((dw - cWidth * 2) / 2) + cWidth + "px" : "0px";
            downDiv.style.top = dw > dh ? parseInt(upDiv.style.top) + ~~(cWidth / 13) + "px" : cWidth * 2.06 + "px";
            //downDiv.style.backgroundColor = "blue";

            cBoard = new CheckerBoard(upDiv, 0, 0, cWidth, cWidth);
            cBoard.printCheckerBoard();

            control.reset(cBoard, engine, msg, closeMsg, appData, dw, dh, [downDiv, 0, 0, cWidth, cWidth], bodyDiv);
            if(window.gameCode) cBoard.unpackCode(true, window.gameCode);
            else appData.renjuLoad(cBoard);

            return bodyDiv;
        }
        catch (err) {
            document.body.innerHTML = `<div><h1>出错啦</h1><h3><p>${err}</p></h3><h2><a onclick="window.reloadApp()">点击刷新</a></h2></div>`;
        }
    }



    return registerserviceWorker()
        .then(() => {
            return window.checkScriptVersion("renju")
        })
        .then(() => {
            window._loading.open();
            window._loading.lock(true);
            window._loading.text("0%");
            return loadCssAll([
                [SOURCE_FILES["loaders"]],
                [SOURCE_FILES["main"]],
                ], true)
        })
        .then(() => {
            window._loading.text("5%");
            return loadFontAll([
                [SOURCE_FILES["PFSCMedium1_woff"]],
                [SOURCE_FILES["PFSCMedium1_ttf"]],
                [SOURCE_FILES["PFSCHeavy1_ttf"]],
                [SOURCE_FILES["PFSCHeavy1_woff"]],
                [SOURCE_FILES["RenLib_wasm"]]  //WebAssembly
                ], true)
        })
        .then(() => {
            window._loading.text("20%");
            return loadScriptAll([ //顺序加载
                [SOURCE_FILES["Viewport"], () => {
                    window.viewport1 = new View(dw);
                }],
                [SOURCE_FILES["vconsole"], () => {
                    testBrowser();
                    return openVConsole()
                        .then(() => {
                            log(`serviceWorker.state: ${serviceWorker_state_history.join(" --> ")}`, "warn")
                        })
                }],
                [SOURCE_FILES["emoji"]], // first load emoji
                [SOURCE_FILES["EvaluatorWebassembly"]],
                [SOURCE_FILES["EvaluatorJScript"]],
                [SOURCE_FILES["TypeBuffer"]],
                ], false)
        })      
        .then(() => {
            window._loading.text("25%");
            return loadScriptAll([
                [SOURCE_FILES["Button"]],
                [SOURCE_FILES["Evaluator"]],
                [SOURCE_FILES["String2Buffer"]],
                [SOURCE_FILES["RenjuTree"]],
                ], true)
        })
        .then(() => {
            window._loading.text("35%");
            return loadScriptAll([
                [SOURCE_FILES["CheckerBoard"]],
                [SOURCE_FILES["control"]],
                [SOURCE_FILES["msgbox"]],
                [SOURCE_FILES["appData"]],
                [SOURCE_FILES["engine"]],
                [SOURCE_FILES["NoSleep"]],
                [SOURCE_FILES["jspdf"]],
                ], true)
        })
        .then(() => {
            window._loading.text("60%");
            return loadScriptAll([
                [SOURCE_FILES["PFSCMedium"]],
                [SOURCE_FILES["PFSCHeavy"]],
                ], true)
        })
        .then(() => {
            window._loading.text("75%");
            return loadScriptAll([
                [SOURCE_FILES["worker"]],
                [SOURCE_FILES["IntervalPost"]],
                [SOURCE_FILES["UNICODE2GBK"]],
                [SOURCE_FILES["JFile"]],
                [SOURCE_FILES["JPoint"]],
                [SOURCE_FILES["LibraryFile"]],
                [SOURCE_FILES["MoveList"]],
                [SOURCE_FILES["MoveNode"]],
                [SOURCE_FILES["Stack"]],
                [SOURCE_FILES["RenLibDoc"]],
                [SOURCE_FILES["work_ReadLib"]],
                [SOURCE_FILES["RenjuLib"]],
                [SOURCE_FILES["RenLibDoc_wasm"]]
                ], true)
        })
        .then(() => {
            window._loading.text("91%");
            return loadFileAll([
                [SOURCE_FILES["404_html"]],
                [SOURCE_FILES["renju_html"]],
                ], true)
        })
        .then(() => {
            window._loading.text("99%");
            removeMlog();
            initNoSleep();
            const UI = createUI();
            window.viewport1.resize();
            window._loading.lock(false);
            window._loading.close();
            window.DEBUG = true;
            window.jsPDF = window.jspdf.jsPDF;
            log(window.TEST_INFORMATION, "info");
            logVersions();
            if (autoShowUpDataInformation())    //提示新版本 更新已经完成
                return //downloadSource()  //下载缓存文件
        })
        .then(()=>{
            return logCaches()  // print caches information
                .then(() => {
                    return logCache(window.APP_VERSION)
                })
                .then(searchUpData)
        })
        .catch((err) => {
            if (typeof err == "object" && err.type) {
                err = err.message || err.type;
            }
            if (err == "reload") {
                setTimeout(() => window.reloadApp(), 1000);
                return;
            }
            else {
                const MSG = "❌" + "打开网页出错, 准备刷新" + "\n\n" + err;
                alert(MSG)
                window.reloadApp()
            }
        });
};
