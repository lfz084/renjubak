var VERSION = 'v0718';

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
            if (url.indexOf("worker.js")+1) return;
            if (!timer) {
                timer = setInterval(interval, 1000);
                postMsg(`loading......`);
            }
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
    postMsg(`service worker install...`);
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
    postMsg(`service worker activate...`);
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
    load.loading(_URL);
    //postMsg(`请求资源\n url=${_URL}`);
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response.ok) {
                load.finish(_URL);
                //postMsg(`读取缓存成功\n url=${_URL}`);
                getFetch();
                return response;
            }
            else {
                //postMsg(`从网络下载资源\n url=${_URL}`);
                return getFetch();
            }
        })
        .catch(err => {
            //postMsg(`下载失败，重试一次\n url=${_URL}`);
            return getFetch();
        })
    )

    function getFetch() {

        return new Promise((resolve, reject) => {
            fetch(event.request)
                .then(response => {
                    if (response.ok) {
                        load.finish(_URL);
                        //postMsg(`下载资源完成\n url=${_URL}`);
                        let cloneRes = response.clone();
                        caches.open(VERSION).then(cache => {
                            cache.put(event.request, cloneRes);
                        });
                        resolve(response);
                    }
                    else {
                        reject();
                    }
                })
                .catch(err => {
                    reject();
                })
        })
    }
});

function postMsg(msg) {
    return self.clients.matchAll().then(function(clients) {
        return Promise.all(clients.map(function(client) {
            return client.postMessage(msg);
        }));
    });
}