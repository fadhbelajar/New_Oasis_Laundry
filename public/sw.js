self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("al-mawaddah-smartpos-v1").then((cache) => {
      return cache.addAll([
        "/",
        "/dashboard",
        "/dashboard/pos",
        "/dashboard/inventory",
        "/dashboard/laundry",
        "/dashboard/finance",
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== "al-mawaddah-smartpos-v1")
          .map((name) => caches.delete(name))
      );
    })
  );
});