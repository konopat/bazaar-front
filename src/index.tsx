import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import App from '@components/App';
import '@styles/main.css';

// Типы для PWA
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

// Регистрация Service Worker для PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('SW зарегистрирован:', registration);
      })
      .catch(error => {
        console.log('Ошибка регистрации SW:', error);
      });

    // Добавляем обработчики для установки PWA
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      // Предотвращаем стандартный prompt браузера
      e.preventDefault();
      // Сохраняем событие, чтобы вызвать его позже
      window.deferredPrompt = e as BeforeInstallPromptEvent;
      
      // Можно показать свою кнопку установки приложения
      const installButton = document.getElementById('install-button');
      if (installButton) {
        installButton.style.display = 'block';
        installButton.addEventListener('click', installApp);
      }
    });

    // Функция для установки приложения
    function installApp() {
      const promptEvent = window.deferredPrompt;
      if (!promptEvent) {
        return;
      }
      
      // Показываем диалог установки приложения
      promptEvent.prompt();
      
      // Ждем результата от пользователя
      promptEvent.userChoice.then((result: { outcome: 'accepted' | 'dismissed' }) => {
        console.log('Результат установки PWA:', result.outcome);
        // Обнуляем отложенный prompt, он может быть использован только один раз
        window.deferredPrompt = null;
        
        // Скрываем кнопку установки
        const installButton = document.getElementById('install-button');
        if (installButton) {
          installButton.style.display = 'none';
        }
      });
    }

    // Отслеживаем, когда приложение установлено
    window.addEventListener('appinstalled', (evt) => {
      console.log('PWA успешно установлено');
      // Скрываем кнопку установки
      const installButton = document.getElementById('install-button');
      if (installButton) {
        installButton.style.display = 'none';
      }
    });
  });
}

// Получение предзагруженного состояния с сервера
const preloadedState = window.__INITIAL_STATE__;

// Обновление состояния хранилища, если оно есть
let appStore = store;
if (preloadedState) {
  // Создаем новый store с предзагруженным состоянием
  const { configureStore } = require('@reduxjs/toolkit');
  const rootReducer = require('@store/store').rootReducer;
  
  appStore = configureStore({
    reducer: rootReducer,
    preloadedState
  });
}

const appElement = document.getElementById('root') as HTMLElement;

// Используем гидратацию для SSR или обычный рендеринг
if (appElement.innerHTML.trim().length > 0) {
  // Гидратация для SSR
  hydrateRoot(
    appElement,
    <React.StrictMode>
      <Provider store={appStore}>
        <App />
      </Provider>
    </React.StrictMode>
  );
} else {
  // Обычный рендеринг без SSR (резервный вариант)
  const root = createRoot(appElement);
  root.render(
    <React.StrictMode>
      <Provider store={appStore}>
        <App />
      </Provider>
    </React.StrictMode>
  );
}

// Добавляем типы для TypeScript
declare global {
  interface Window {
    __INITIAL_STATE__?: any;
    deferredPrompt?: BeforeInstallPromptEvent | null;
  }
}