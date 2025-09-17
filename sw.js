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
