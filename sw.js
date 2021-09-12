var VERSION = "v0912.09";
var myInit = {
    cache: "reload"
};
var response_err = `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>404 err</title><style>body{width:800px}.main-view{word-wrap:break-word;position:absolute;top:0;left:0;right:0;bottom:0;margin:auto;width:500px;height:500px;border-radius:50px;background:#ddd;text-align:center}#info{position:absolute;top:10px;width:500px;height:250px;text-align:center}#link{position:absolute;top:260px;width:500px;height:250px;text-align:center}#refresh{font-size:70px;border-radius:50%;border:0}#refresh:hover{color:#858;opacity:.38}h1{font-size:25px;font-weight:blod;line-height:1.5}a{color:#636;font-size:26px;font-weight:blod;text-decoration:underline;line-height:1.8;cursor:pointer}a:link{color:#636;text-decoration:underline}a:visited{color:#525;text-decoration:underline}a:hover{color:#858;text-decoration:underline}a:active{color:blue;text-decoration:underline}</style></head><body><script>const HOMES = [ "https://lfz084.gitee.io/renju/", "https://lfz084.github.io/", "http://localhost:7700/" ]; const HOME = location.href.indexOf(HOMES[0]) + 1 ? HOMES[0] : location.href.indexOf(HOMES[1]) + 1 ? HOMES[1] : HOMES[2]; function clk(filename) { const URL = HOME + filename; window.open(URL, "_self"); } document.body.onload = () => { document.getElementById("refresh").onclick = () => { window.location.reload(); }; document.getElementById("home").onclick = () => { clk("index.html"); }; document.getElementById("renju").onclick = () => { clk("renju.html"); }; document.getElementById("tuya").onclick = () => { clk("tuya.html"); }; document.getElementById("url").innerHTML = window.location.href; if (window.top != window.self) document.getElementById("link").style.display = "none"; }</script><div class="main-view"><div id="info"><h1 id="url"></h1><h1>没有找到你要打开的页面</h1></br><button id="refresh">🔄</button></div><div id="link"><br><a id="home">返回主页</a></br><a id="renju">摆棋小工具</a></br><a id="tuya">五子棋涂鸦</a></br></div></div></body></html>`
// 加载进度功能。
//通过监视 fetch 事件，与窗口通信实现
let load = (() => {
    let urls = [];
    let timer = null;

    function pushURL(url) {
        if (urls.indexOf(url) < 0) {
            urls.push(url);
        }
    }

    function removeURL(url) {
        let idx = urls.indexOf(url);
        if (idx + 1) {
            urls.splice(idx, 1);
        }
    }

    function interval() {
        if (urls.length == 0) {
            clearInterval(timer);
            timer = null;
            postMsg(`load finish`);
        }
    }

    return {
        loading: (msg) => {
            let url = msg;
            let filename = url.split("/").pop();
            if (["worker",
                "emoji",
                "Evaluator",
                "renju",
                "IntervalPost",
                "RenjuTree",
                "UNICODE2GBK",
                "JFile",
                "JPoint",
                "LibraryFile",
                "MoveList",
                "MoveNode",
                "Stack",
                "RenLibDoc",
                "work_ReadLib",
                "RenjuLib"
            ].indexOf(filename.split(/[\-\_\.]/)[0]) + 1) return;
            if (!timer) {
                timer = setInterval(interval, 100);
            }
            postMsg(`loading......${url}`);
            pushURL(url);

        },
        finish: (msg) => {
            let url = msg;
            removeURL(url);
        }
    };
})();

function postMsg(msg, client) {
    if (client && typeof client.postMessage == "function") {
        return client.postMessage(msg);
    }
    return self.clients.matchAll().then(function(clients) {
        return Promise.all(clients.map(function(client) {
            return client.postMessage(msg);
        }));
    });
}

function initCaches() {
    return caches.open(VERSION)
        .then(function(cache) {
            return cache.addAll([
                        './404.html'
                      ]);
        })
}

function deleteOldCaches() {
    return caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.map(function(cacheName) {
                // 如果当前版本和缓存版本不一致
                if (cacheName !== VERSION) {
                    return caches.delete(cacheName);
                }
            })
        );
    })
}


// 缓存
self.addEventListener('install', function(event) {
    //postMsg(`service worker install...`, event.clientID);
    self.skipWaiting();
    /*
    event.waitUntil(
        initCaches()
    );*/
});

// 缓存更新
self.addEventListener('activate', function(event) {
    //postMsg(`service worker activate...`, event.clientID);
    /*event.waitUntil(
        deleteOldCaches()
    );*/
});

// 捕获请求并返回缓存数据
self.addEventListener('fetch', function(event) {

    const URL_VERSION = "?v=" + VERSION;
    const _URL = event.request.url.split("?")[0] + URL_VERSION;
    const filename = _URL.split("/").pop();
    const type = _URL.split(".").pop();
    const NEW_CACHE = ["html", "htm"].indexOf(type) + 1 > 0;
    if (filename.indexOf(type) + 1) {
        load.loading(_URL);
    }
    else {
        postMsg(`fetch [${_URL}]`);
    }
    //postMsg(`请求资源 url=${_URL}`, event.clientID);
    /*
    if (NEW_CACHE)
        event.respondWith(netFirst())
    else*/
    event.respondWith(cacheFirst())


    function myFetch() {
        return new Promise((resolve, reject) => {
            let req = _URL == "https://lfz084.github.io/icon.ico" + URL_VERSION ?
                new Request("https://lfz084.gitee.io/renju/icon.ico" + URL_VERSION, myInit) :
                _URL == "https://lfz084.github.io/icon.png" + URL_VERSION ?
                new Request("https://lfz084.gitee.io/renju/icon.png" + URL_VERSION, myInit) :
                new Request(_URL, myInit),
                nRequest = new Request(req.url.split("?")[0] + "?v=" + new Date().getTime(), myInit);
        fetch(nRequest)
                .then(response => {
                    load.finish(_URL);
                    if (!response.ok) throw new Error(`response = ${response}`);
                    //postMsg(`下载资源完成 url=${_URL}`, event.clientID);
                    let cloneRes = response.clone();
                    if (_URL.indexOf("blob:http") == -1) {
                        caches.open(VERSION)
                            .then(cache => {
                                cache.put(new Request(_URL, myInit), response)
                            })
                    }
                    resolve(cloneRes);
                })
                .catch(err => {
                    load.finish(_URL);
                    reject(err);
                })
        })
    }

    function loadCache(refresh) {
        return caches.open(VERSION)
            .then(cache => {
                return cache.match(new Request(_URL, myInit))
                    .then(response => {
                        load.finish(_URL);
                        if (!response.ok) throw new Error("response is undefined");
                        refresh && NEW_CACHE && myFetch();
                        return response;
                    })
            })
    }

    function fetchErr() {
        const myHeaders = { "Content-Type": 'text/html; charset=utf-8' };
        const init = {
            status: 200,
            statusText: "OK",
            headers: myHeaders
        }
        let request = new Request("./404.html");
        return caches.match(request)
            .then(response => {
                if (response.ok)
                    return response;
                else
                    return new Response(response_err, init)
            })
            .catch(() => {
                return new Response(response_err, init)
            })
    }

    function cacheFirst() {
        return loadCache(true)
            .catch(() => {
                //postMsg(`没有缓存，从网络下载资源 url=${_URL}`, event.clientID);
                return myFetch();
            })
            .catch(err => {
                //postMsg(`404.html ${err.message}`, event.clientID);
                return fetchErr();
            })
    }

    function netFirst() {
        return myFetch()
            .catch(() => {
                return loadCache()
            })
            .catch(err => {
                return fetchErr()
            })
    }
});

self.addEventListener('message', function(event) {
    if (event.data && event.data.type == "NEW_VERSION") {
        if (event.data.version != VERSION) {
            VERSION = event.data.version;
            myInit = {
                cache: "reload"
            };
        }
        postMsg(event.data, event.clientID)
    }
    else {
        postMsg(`serverWorker post: ${event.data}`, event.clientID)
    }
});