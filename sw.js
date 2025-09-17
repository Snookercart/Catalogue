const CACHE_NAME = 'catalogue-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './page_001.png',
  './page_002.png',
  './page_003.png',
  './page_004.png',
  './page_005.png',
  './page_006.png',
  './page_007.png',
  './page_008.png',
  './page_009.png',
  './page_010.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
