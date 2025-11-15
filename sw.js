const CACHE_NAME = 'persistentNotesv1.0';
// List the files you want to cache for offline use.
// ALL paths must be relative to the root of the GitHub Pages site (e.g., /<repository-name>/index.html).
const urlsToCache = [
  'https://dependentchemical.github.io/persistentNotes/',
  'https://dependentchemical.github.io/persistentNotes/favicon-512.png',
  'https://dependentchemical.github.io/persistentNotes/favicon-192.png',
  'https://dependentchemical.github.io/persistentNotes/index.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - return response
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Optional: Clean up old caches during activation
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});