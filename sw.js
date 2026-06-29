/*
we have three steps
1 => load(install)
2 => activate(upcoming versions)
3 => fetch from cash or from internet
*/
const cacheName = "App_V2";
const cacheAssets = [
    //root
    "/",
    "/index.html",
    //style
    "/css/style.css",
    "/css/home.css",
    "/css/goals.css",
    "/css/navHeader.css",
    "/css/note.css",
    "/css/timer.css",
    "/css/todoList.css",
    //js
    "/js/index.js",
    "/js/main.js",
    "/js/goals.js",
    "/js/navHeader.js",
    "/js/note.js",
    "/js/timer.js",
    "/js/todoList.js",
    //pages
    "/pages/home.html",
    "/pages/goals.html",
    "/pages/note.html",
    "/pages/timer.html",
    "/pages/todoList.html",
    //info
    "/assets/imgs/icon.png",
    "/manifest.json",
];

// install
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheName)
            .then(
                (cache) => cache.addAll(cacheAssets)
            ).then(() => self.skipWaiting())
    )
})

// activate cache
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys()
            .then(
                (keys) => {
                    return Promise.all(
                        keys.filter(
                            (key) => key !== cacheName
                        ).map(
                            (key) => caches.delete(key)
                        )
                    )
                }
            )
    )
})

// fetch
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(
                cacheResponse => {
                    if (cacheResponse)
                        return cacheResponse
                    return fetch(event.request)
                        .then(
                            networkResponse => {
                                return caches.open(cacheName)
                                    .then(
                                        cache => {
                                            cache.put(event.request, networkResponse.clone())
                                            return networkResponse
                                        }
                                    )
                            }
                        )
                }
            ).catch(
                Error => console.log(Error("Erorr Happend"))
            )
    )
})
