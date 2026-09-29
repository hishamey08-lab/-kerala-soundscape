const CACHE_NAME = "echoes-of-kerala-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./Logo.png",
    "./background.png.png",
    "./poster1.png.jpg",
    "./poster2.png.jpg",
    "./poster3.png.jpg",
    "./poster4.png.jpg"
];

self.addEventListener("install", event => {

    event.waitUntil(

        caches
            .open(CACHE_NAME)
            .then(cache => {

                return cache.addAll(
                    FILES_TO_CACHE
                );

            })

    );

    self.skipWaiting();

});


self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys =>

            Promise.all(

                keys
                    .filter(
                        key =>
                            key !== CACHE_NAME
                    )
                    .map(
                        key =>
                            caches.delete(key)
                    )

            )

        )

    );

    self.clients.claim();

});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches
            .match(event.request)
            .then(cachedResponse => {

                return (
                    cachedResponse ||
                    fetch(event.request)
                );

            })

    );

});
