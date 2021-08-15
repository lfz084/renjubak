var VERSION = "v0815.1";

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

// 缓存
self.addEventListener('install', function(event) {
    //postMsg(`service worker install...`);
    //self.skipWaiting();
    event.waitUntil(
        caches.open(VERSION).then(function(cache) {
            return cache.addAll([
                    './',
                    './index.html'
                  ]);
        })
    );
});

// 缓存更新
self.addEventListener('activate', function(event) {
    //postMsg(`service worker activate...`);
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    // 如果当前版本和缓存版本不一致
                    if (cacheName !== VERSION) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

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
        caches.match(event.request).then(response => {
            if (response.ok) {
                load.finish(_URL);
                //postMsg(`读取缓存成功 url=${_URL}`);
                getFetch();
                return response;
            }
            else {
                //postMsg(`从网络下载资源 url=${_URL}`);
                return getFetch();
            }
        })
        .catch(err => {
            //postMsg(`下载失败，重试一次 url=${_URL}`);
            return getFetch();
        })
    )

    function getFetch() {

        return new Promise((resolve, reject) => {
            fetch(event.request)
                .then(response => {
                    if (response.ok) {
                        load.finish(_URL);
                        //postMsg(`下载资源完成 url=${_URL}`);
                        let cloneRes = response.clone();
                        if (_URL.indexOf("blob:http") == -1) {
                            caches.open(VERSION).then(cache => {
                                cache.put(event.request, cloneRes);
                            });
                        }
                        resolve(response);
                    }
                    else {
                        load.finish(_URL);
                        reject();
                    }
                })
                .catch(err => {
                    load.finish(_URL);
                    reject();
                })
        })
    }
});

self.addEventListener('message', function(event) {
    if (event.data && event.data.type == "NEW_VERSION") {
        VERSION = event.data.version;
        postMsg(event.data)
    }
    else {
        postMsg(`serverWorker post: ${event.data}`)
    }
});

function postMsg(msg) {
    return self.clients.matchAll().then(function(clients) {
        return Promise.all(clients.map(function(client) {
            return client.postMessage(msg);
        }));
    });
}