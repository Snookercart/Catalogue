// ✅ Service Worker for Catalogue Flipbook
const CACHE_NAME = "catalogue-v1";

// Add all assets you want to cache
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./page_001.png",
  "./page_002.png",
  "./page_003.png",
  "./page_004.png",
  "./page_005.png",
  "./page_006.png",
  "./page_007.png",
  "./page_008.png",
  "./page_009.png",
  "./page_010.png",
  "./page_011.png",
  "./page_012.png",
  "./page_013.png",
  "./page_014.png",
  "./page_015.png",
  "./page_016.png",
  "./page_017.png",
  "./page_018.png",
  "./page_019.png",
  "./page_020.png",
  "./page_021.png",
  "./page_022.png",
  "./page_023.png",
  "./page_024.png",
  "./page_025.png",
  "./page_026.png",
  "./page_027.png",
  "./page_028.png",
  "./page_029.png",
  "./page_030.png",
  "./page_031.png",
  "./page_032.png",
  "./page_033.png",
  "./page_034.png",
  "./page_035.png",
  "./page_036.png",
  "./page_037.png",
  "./page_038.png",
  "./page_039.png",
  "./page_040.png",
  "./page_041.png",
  "./page_042.png",
  "./page_043.png",
  "./page_044.png",
  "./page_045.png",
  "./page_046.png",
  "./page_047.png",
  "./page_048.png"
  // add more if you have more pages
];

// Install event → cache all files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching assets...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event → clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log("Deleting old cache:", name);
            return caches.delete(name);
          }
        })
      )
    )
  );
});

// Fetch event → serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() =>
          new Response("You are offline. Please check connection.")
        )
      );
    })
  );
});
