const CACHE_NAME = "catalogue-flipbook-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  ...Array.from({ length: 48 }, (_, i) => {
    const num = String(i + 1).padStart(3, "0");
    return `./page_${num}.png`;
  })
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("📦 Caching flipbook pages and assets...");
      return cache.addAll(urlsToCache).catch(err => {
        console.error("❌ Failed to cache:", err);
      });
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            console.log("🧹 Removing old cache:", name);
            return caches.delete(name);
          }
        })
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() =>
          new Response("⚠️ You are offline.")
        )
      );
    })
  );
});
