/* eslint-disable no-restricted-globals */
// Это упрощенная версия Service Worker для разработки

// Оффлайн-страница 
const OFFLINE_URL = '/offline.html';

// Кеширование основных ресурсов
const CACHE_NAME = 'bazaar-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/offline.html',
  '/index.html',
  '/manifest.json'
];

// При установке кешируем базовые ресурсы
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кеширование базовых ресурсов');
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
  self.skipWaiting();
});

// При активации очищаем старые кеши
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          return caches.delete(cacheName);
        })
      );
    })
  );
  self.clients.claim();
});

// Показ оффлайн-страницы при проблемах с сетью
self.addEventListener('fetch', event => {
  // Пропускаем запросы не-GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .catch(() => {
        // При ошибке, показываем оффлайн-страницу для навигации
        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_URL);
        }
        
        // Для других запросов пытаемся получить из кеша
        return caches.match(event.request);
      })
  );
});

console.log('Сервис воркер для разработки загружен');
