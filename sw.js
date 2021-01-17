var cacheFiles = [
  './404.html',
  './index.html'
]
// 定义缓存的key值
var cacheName = '20190303'



// 监听install事件，安装完成后，进行文件缓存
self.addEventListener('install', function(e) {

    // 找到key对应的缓存并且获得可以操作的cache对象
    var cacheOpenPromise = caches.open(cacheName).then(function(cache) {
        // 将需要缓存的文件加进来
        return cache.addAll(cacheFiles)
    })
    // 将promise对象传给event
    e.waitUntil(cacheOpenPromise)
})



self.addEventListener('fetch', function(e) {
    e.respondWith(
        /*
        // 判断当前请求是否需要缓存
        caches.match(e.request).then(function(cache) {
            // 有缓存就用缓存，没有就从新发请求获取
            return cache || fetch(e.request)
        }).catch(function(err) {
            console.log(err)
            // 缓存报错还直接从新发请求获取
            return fetch(e.request)
        })
        */
        fetch(e.request).then(function(response) {
            return response
        }).catch(function(err) {
            let url = e.request.url;
            if (url.indexOf("renju.html") > -1) {
                e.request.url = url.substr(0,url.length - 10) + "404.html"
                caches.match(e.request).then(function(cache) {
                    // 有缓存就用缓存，没有就从新发请求获取
                    return cache || fetch(e.request)
                }).catch(function(err) {
                    // 缓存报错还直接从新发请求获取
                    return fetch(e.request)
                })
            }
            else {
                return err
            }
        })
        
        
    )
})

