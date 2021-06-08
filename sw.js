var VERSION = 'v1';

// 缓存
self.addEventListener('install', function(event) {
    event.waitUntil(
        
    );
});

// 缓存更新
self.addEventListener('activate', function(event) {
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

    event.respondWith(
        fetch(event.request)
        .then(response => {
            let cloneRes = response.clone();
            caches.open(VERSION).then(cache => {
                cache.put(event.request, cloneRes);
            });
            return responseh;
        })
        .catch(err => {
            return caches.match(event.request);
        })
    )

});