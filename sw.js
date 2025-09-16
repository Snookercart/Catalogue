const CACHE_NAME = 'catalogue-v1';
const urlsToCache = [
  './index.html',
  './page_001.png',
  './page_002.png',
  './page_003.png',
  './page_004.png',
  './page_005.png',
  './page_006.png',
  './page_007.png',
  './page_008.png',
  './page_009.png',
  './page_010.png',
  './page_011.png',
  './page_012.png',
  './page_013.png',
  './page_014.png',
  './page_015.png',
  './page_016.png',
  './page_017.png',
  './page_018.png',
  './page_019.png',
  './page_020.png',
  './page_021.png',
  './page_022.png',
  './page_023.png',
  './page_024.png',
  './page_025.png',
  './page_026.png',
  './page_027.png',
  './page_028.png',
  './page_029.png',
  './page_030.png',
  './page_031.png',
  './page_032.png',
  './page_033.png',
  './page_034.png',
  './page_035.png',
  './page_036.png',
  './page_037.png',
  './page_038.png',
  './page_039.png',
  './page_040.png',
  './page_041.png',
  './page_042.png',
  './page_043.png',
  './page_044.png',
  './page_045.png',
  './page_046.png',
  './page_047.png',
  './page_048.png'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
