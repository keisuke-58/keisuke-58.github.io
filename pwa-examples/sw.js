importScripts('/pwa-examples/ini.js');
/*const CACHE_NAME = 'k-58-v1';
const SUCCESSIVE_CACHE = true;
const URLS_TO_CACHE = [
    '/pwa-examples/index.html',
    '/pwa-examples/github.js',
    '/pwa-examples/style.css',
    '/pwa-examples/ini.js',
    '/pwa-examples/android-chrome-192x192.png',
    '/pwa-examples/android-chrome-512x512.png'
];
const CACHE_ALLOWLIST = [
    'k-58-v2'
];*/


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
            console.log(cacheName);
            /*return Promise.all(
                cacheNames.map((cacheName) => {
                    if(CACHE_ALLOWLIST.indexOf(cacheName) !== -1){
                        return caches.delete(cacheName);
                    }
                })
            );*/
        })
    );
});