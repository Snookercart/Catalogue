// ✅ Service Worker for Catalogue Flipbook
const CACHE_NAME = "catalogue-v1";

// Generate array for pages 001 to 048
const pages = Array.from({ length: 48 }, (_, i) => {
  const num = String(i + 1).padStart(3, "0");
  return `./page_${num}.png`;
});

// Static assets to cache
const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  ...pages
];

// Install event → cache all files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("📦 Caching assets...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate event → delete old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log("🧹 Deleting old cache:", name);
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
          new Response("⚠️ You are offline. Please check your connection.")
        )
      );
    })
  );
});
