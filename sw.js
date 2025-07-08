// ✅ Nama cache, bisa diganti versi kalau update
const CACHE_NAME = 'pwa-belanja-v1';

// ✅ Daftar file yang akan disimpan di cache
const FILES_TO_CACHE = [
  '/pwa-belanja-anak-kost/',
  '/pwa-belanja-anak-kost/index.html',
  '/pwa-belanja-anak-kost/styles.css',
  '/pwa-belanja-anak-kost/app.js',
  '/pwa-belanja-anak-kost/manifest.json',
  '/pwa-belanja-anak-kost/icons/icon-192.png',
  '/pwa-belanja-anak-kost/icons/icon-512.png'
];

// ✅ Proses instalasi Service Worker
self.addEventListener('install', event => {
  console.log('[Service Worker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[Service Worker] Caching files');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// ✅ Aktivasi Service Worker, hapus cache lama
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate');
  event.waitUntil(
    caches.keys().then(keyList =>
      Promise.all(
        keyList.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// ✅ Ambil file dari cache dulu, kalau gagal baru fetch ke jaringan
self.addEventListener('fetch', event => {
  console.log('[Service Worker] Fetch', event.request.url);
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
