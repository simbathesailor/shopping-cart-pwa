
const cacheName = 'cache-v1';
const precacheResources = ["/"];

self.addEventListener('install', event => {
  console.log('Service worker install event!');

  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(precacheResources);
      })
  );
});

self.addEventListener('activate', event => {
  console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
  console.log('Fetch intercepted for:', event.request.url);
  return fetch(event.request);
  // event.respondWith(caches.match(event.request)
  //   .then(cachedResponse => {
  //       if (cachedResponse) {
  //         return cachedResponse;
  //       }
  //       return fetch(event.request);
  //     })
  //   );
});


/**
 * add to home screen code
 */
