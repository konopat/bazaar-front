/* eslint-disable no-restricted-globals */
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

// Предварительное кеширование файлов, созданных Webpack
precacheAndRoute(self.__WB_MANIFEST);

// Кеширование изображений
registerRoute(
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    cacheName: 'images',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 дней
      }),
    ],
  })
);

// Кеширование API-запросов
registerRoute(
  ({ url }) => url.pathname.startsWith('/api/'),
  new NetworkFirst({
    cacheName: 'api-responses',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 50,
        maxAgeSeconds: 5 * 60, // 5 минут
      }),
    ],
  })
);

// Статические ресурсы (CSS, JS)
registerRoute(
  ({ request }) => 
    request.destination === 'style' ||
    request.destination === 'script',
  new StaleWhileRevalidate({
    cacheName: 'static-resources',
  })
);

// Кеширование шрифтов
registerRoute(
  ({ request }) => request.destination === 'font',
  new CacheFirst({
    cacheName: 'fonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 365, // 1 год
      }),
    ],
  })
);

// Оффлайн-страница
const offlineFallbackPage = '/offline.html';

// Установка Service Worker и кеширование оффлайн-страницы
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('offline').then((cache) => {
      return cache.add(offlineFallbackPage);
    })
  );
});

// Показ оффлайн-страницы при отсутствии сети
self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(offlineFallbackPage);
      })
    );
  }
});

// Фоновая синхронизация для отложенных запросов (например, отправка данных формы)
self.addEventListener('sync', (event) => {
  if (event.tag === 'order-sync') {
    event.waitUntil(syncOrder());
  }
});

// Пример функции синхронизации заказа
async function syncOrder() {
  try {
    const ordersToSync = await localforage.getItem('pendingOrders') || [];
    
    for (const order of ordersToSync) {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });
      
      // Удаляем синхронизированный заказ из очереди
      const updatedOrders = ordersToSync.filter(o => o.id !== order.id);
      await localforage.setItem('pendingOrders', updatedOrders);
    }
  } catch (error) {
    console.error('Failed to sync orders:', error);
  }
}

// Уведомления о новых предложениях (пример Push API)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icons/icon-192x192.png',
      badge: '/icons/badge-96x96.png',
      data: {
        url: data.url || '/',
      },
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Обработка клика по уведомлению
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientsList) => {
      const url = event.notification.data.url;
      
      // Если уже открыто окно - фокусируемся на нем
      for (const client of clientsList) {
        if (client.url === url && 'focus' in client) {
          return client.focus();
        }
      }
      
      // Иначе открываем новое окно
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});