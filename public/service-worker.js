const CACHE_NAME = "Selman";
const urlsToCache = [
  "/",
  "/src/App.js",
  "/src/index.js",
  "/src/components/BottomNavigation.js",
  "/src/components/dbOperations.js",
  "/src/components/FavoritesComponent.js",
  "/src/components/FavoritesPage.js",
  "/src/components/Home",
  "/src/components/InputForm.js",
  "/src/components/SideBarMenu.js",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
