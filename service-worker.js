/* === Piano for ALL – MUSICEDU Service Worker === */

const CACHE_NAME = 'musicedu-v1';
const OFFLINE_URL = '/MUSICEDU/offline.html';

/* Files to pre-cache for offline use */
const ASSETS_TO_CACHE = [
  '/MUSICEDU/',
  '/MUSICEDU/index.html',
  '/MUSICEDU/styles/main.css',
  '/MUSICEDU/styles/components.css',
  '/MUSICEDU/scripts/main.js',
  '/MUSICEDU/scripts/analytics.js',
  '/MUSICEDU/assets/icons/icon-192.png',
  '/MUSICEDU/assets/icons/icon-512.png',
  '/MUSICEDU/seo/sitemap.xml',
  '/MUSICEDU/seo/robots.txt',
  OFFLINE_URL
];

/* Install Service Worker */
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Pre-caching assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

/* Activate Service Worker and remove old caches */
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

/* Fetch Handler */
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Return cached asset if available
      if (response) return response;
      // Fetch from network and cache dynamically
      return fetch(event.request).then(fetchRes => {
        return caches.open(CACHE_NAME).then(cache => {
          cache.put(event.request.url, fetchRes.clone());
          return fetchRes;
        });
      }).catch(() => caches.match(OFFLINE_URL));
    })
  );
});