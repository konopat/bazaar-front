import React from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import App from '@components/App';
import '@styles/main.css';

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
  }
}