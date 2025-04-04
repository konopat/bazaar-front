/* eslint-disable no-restricted-globals */
// Это упрощенная версия Service Worker для разработки

// Оффлайн-страница 
const OFFLINE_URL = '/offline.html';

// Кеширование основных ресурсов
const CACHE_NAME = 'bazaar-cache-v1';
const APP_SHELL_ASSETS = [
  '/',
  '/index.html',
  '/offline.html',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/apple-touch-icon.png',
  '/icons/favicon.ico',
  '/icons/favicon-32x32.png',
  '/icons/favicon-16x16.png'
];

// Кеширование дополнительных ресурсов
const ADDITIONAL_ASSETS = [
  '/images/logo.svg',
  '/images/og-image.jpg'
];

// При установке кешируем базовые ресурсы
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Кеширование базовых ресурсов');
        // Сначала кешируем основное приложение
        return cache.addAll(APP_SHELL_ASSETS)
          .then(() => {
            // Затем кешируем дополнительные ресурсы (некритичные)
            return cache.addAll(ADDITIONAL_ASSETS)
              .catch(err => console.log('Не удалось кешировать дополнительные ресурсы:', err));
          });
      })
      .then(() => {
        // Форсируем активацию нового service worker
        return self.skipWaiting();
      })
  );
});

// При активации очищаем старые кеши
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheName => {
          return cacheName !== CACHE_NAME;
        }).map(cacheName => {
          console.log(`Удаление устаревшего кеша: ${cacheName}`);
          return caches.delete(cacheName);
        })
      );
    }).then(() => {
      // Берем управление над всеми открытыми вкладками
      console.log('Service Worker активирован. Захватываем клиенты...');
      return self.clients.claim();
    })
  );
});

// Показ оффлайн-страницы при проблемах с сетью
self.addEventListener('fetch', event => {
  // Пропускаем запросы к API или внешним ресурсам
  if (event.request.url.includes('/api/') || 
      !event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Пропускаем запросы не-GET
  if (event.request.method !== 'GET') return;

  // Стратегия для навигационных запросов: Network-first, затем кеш
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match(event.request)
            .then(cachedResponse => {
              if (cachedResponse) {
                return cachedResponse;
              }
              return caches.match(OFFLINE_URL);
            });
        })
    );
    return;
  }

  // Для запросов к изображениям используем стратегию cache-first
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
          
          return fetch(event.request)
            .then(networkResponse => {
              const clonedResponse = networkResponse.clone();
              caches.open(CACHE_NAME).then(cache => {
                cache.put(event.request, clonedResponse);
              });
              return networkResponse;
            })
            .catch(() => {
              // Если не удалось получить изображение, возвращаем плейсхолдер или null
              const imageExt = event.request.url.split('.').pop().toLowerCase();
              if (['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp'].includes(imageExt)) {
                // Можно вернуть плейсхолдер, если есть
                return new Response(null, { status: 404 });
              }
              return new Response(null, { status: 404 });
            });
        })
    );
    return;
  }

  // Для других статических ресурсов используем стратегию stale-while-revalidate
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        const fetchPromise = fetch(event.request)
          .then(networkResponse => {
            // Обновляем кеш
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
            });
            return networkResponse;
          })
          .catch(error => {
            console.log('Не удалось загрузить ресурс:', error);
            // Если произошла ошибка, вернем кешированную версию
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // В противном случае вернем ошибку
            return new Response('Network error occurred', {
              status: 408,
              headers: { 'Content-Type': 'text/plain' }
            });
          });

        // Если кеш есть, вернем сразу, а в фоне обновим
        return cachedResponse || fetchPromise;
      })
  );
});

// Обработка сообщений от клиента
self.addEventListener('message', event => {
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
  }
  
  if (event.data === 'checkForUpdate') {
    self.registration.update();
  }
});

// Для отладки выводим информацию о SW
console.log('Сервис воркер для разработки загружен, версия: BAZAAR-DEV-1.0');
