importScripts('/digital-signage/ini.js');

// install
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(URLS_TO_CACHE);
        })
    );
});

// fetch cache load
self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => {
            if(!SUCCESSIVE_CACHE){
                return response ? response : fetch(e.request);
            }else{
                if(response){
                    return response;   
                }else{
                    // リクエストを複製
                    // リクエストはstreamのため１度しか使えないので複製
                    // １回はキャッシュ、もう１回はフェッチのために使用
                    let fetchRequest = e.request.clone();
                    return fetch(fetchRequest).then((response) => {
                        // 有効か否か
                        // basicによりリクエストの送信元と送信先のドメインが同じであることを示す。サードパーティのアセットへのリクエストがキャッシュされないことと同義
                        if(!response || response.status !== 200 || response.type !== 'basic'){
                            return response;
                        }
                        
                        // レスポンスの複製（stream）
                        // キャッシュ、ブラウザ用
                        let responseToCache = response.clone();
                        caches.open(CACHE_NAME).then((cache) => {
                            cache.put(e.request, responseToCache);
                        });

                        return response;
                    }).catch((error) => {
                       return response; 
                    });
                }
            }
        })
    );
});

// update service worker
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((cacheName) => {
            //console.log(cacheName);
            return Promise.all(
                CACHE_ALLOWLIST.map((cache) => {
                    if(cache.indexOf(cacheName) !== -1){
                        console.log(cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        /*caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if(!CACHE_ALLOWLIST.includes(key)){
                    console.log(key);
                    return caches.delete(key);
                }
            })
        ))*/
    );
});