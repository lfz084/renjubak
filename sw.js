var VERSION = "v0817.6";
var myInit = {
    cache: "no-store"
};

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
            if (["worker", "emoji", "Evaluator"].indexOf(filename.split(/[\-\_\.]/)[0]) + 1) return;
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

function postMsg(msg) {
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

/*
// 缓存
self.addEventListener('install', function(event) {
    //postMsg(`service worker install...`);
    //self.skipWaiting();
    
    event.waitUntil(
        initCaches()
    );
});

// 缓存更新
self.addEventListener('activate', function(event) {
    //postMsg(`service worker activate...`);
    event.waitUntil(
        deleteOldCaches()
    );
});*/

// 捕获请求并返回缓存数据
self.addEventListener('fetch', function(event) {

    const _URL = event.request.url;
    const filename = _URL.split("/").pop();
    const type = _URL.split(".").pop();
    if (filename.indexOf(type) + 1) {
        load.loading(_URL);
    }
    else {
        postMsg(`fetch [${_URL}]`);
    }
    //postMsg(`请求资源 url=${_URL}`);
    event.respondWith(
        caches.open(VERSION)
        .then(cache => {
            return cache.match(event.request)
                .then(response => {
                    if (response.ok) {
                        load.finish(_URL);
                        //postMsg(`读取缓存成功 url=${_URL}`);
                        //myFetch();
                        return response;
                    }
                    else {
                        //postMsg(`缓存错误，从网络下载资源 url=${_URL}`);
                        return myFetch();
                    }
                })
                .catch(err => {
                    //postMsg(`没有缓存，从网络下载资源 url=${_URL}`);
                    return myFetch();
                })
                .catch(err => {
                    //postMsg(`404.html ${err.message}`);
                    let request = new Request("./404.html");
                    return cache.match(request)
                })
        })
    )

    function myFetch() {
        return new Promise((resolve, reject) => {
            fetch(event.request, myInit)
                .then(response => {
                    if (response.ok) {
                        load.finish(_URL);
                        //postMsg(`下载资源完成 url=${_URL}`);
                        let cloneRes = response.clone();
                        if (_URL.indexOf("blob:http") == -1) {
                            caches.open(VERSION)
                                .then(cache => {
                                    cache.put(event.request, cloneRes)
                                })
                        }
                        resolve(response);
                    }
                    else {
                        load.finish(_URL);
                        reject(response);
                    }
                })
                .catch(err => {
                    load.finish(_URL);
                    reject(err);
                })
        })
    }
});

self.addEventListener('message', function(event) {
    if (event.data && event.data.type == "NEW_VERSION") {
        if (event.data.version != VERSION) {
            VERSION = event.data.version;
            myInit = {
                cache: "no-store"
            };
        }
        postMsg(event.data)
    }
    else {
        postMsg(`serverWorker post: ${event.data}`)
    }
});