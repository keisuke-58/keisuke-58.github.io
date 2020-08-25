fetch('/ini.json').then((response) => {
    console.log(response);
    if(!response || response.status !== 200 || response.type !== 'basic'){ throw 'ini.json error'; }
    return response.json();
}).then((json) => {
    console.log(json);

// install
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(json['cacheName']).then((cache) => {
            return cache.addAll(json['urlsToCache']);
        })
    );
});

// fetch cache load
self.addEventListener('fetch', (e) => {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then((response) => {
            if(!json['successiveCache']){
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
                        caches.open(json['cacheName']).then((cache) => {
                            cache.put(e.request, responseToCache);
                        });

                        return response;
                    })
                }
            }
        })
    );
});

// update service worker
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((cacheName) => {
            //return Promise.all(
                //cacheNames.map((cacheName) => {
                    //if(json['cacheAllowlist'].indexOf(cacheName) !== -1){
                        //return caches.delete(cacheName);
                    //}
                //})
            //);
            console.log(cacheName);
        })
    );
});
    
}).catch((error) => {
    console.log(error);
    alert('error : ' + error);
});