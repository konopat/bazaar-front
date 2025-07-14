# BAZAAR - Онлайн-магазин букетов

Элегантный интернет-магазин по продаже цветочных букетов с современным дизайном и функциональностью PWA (Progressive Web App).

## 🌟 Особенности

- ⚡ Быстрая загрузка с оптимизированной сборкой
- 📱 PWA с поддержкой установки на мобильные устройства  
- 🎨 Красивый дизайн в стиле модного дома с золотыми акцентами
- 🌙 Поддержка тёмной и светлой тем
- 📍 Интерактивная карта магазинов
- 🛒 Полнофункциональная корзина
- 🎯 Квиз для подбора букета
- 🚀 SEO-оптимизация
- 📴 Поддержка оффлайн-режима

## 🛠 Технологический стек

### Frontend
- **React 18** - современные хуки и Concurrent Mode
- **TypeScript** - типизация для надёжности кода
- **Redux Toolkit** - управление состоянием
- **React Router v6** - роутинг SPA
- **Webpack 5** - сборщик с code splitting
- **Workbox** - service worker для PWA
- **OpenLayers** - интерактивные карты

### Инструменты разработки
- **ESLint** - статический анализ кода
- **Babel** - транспиляция для совместимости
- **webpack-dev-server** - hot reload в разработке
- **gh-pages** - автоматический деплой

## 📁 Структура проекта

```
bazaar-front/
├── dist/                   # Собранное приложение
├── public/                 # Статические файлы
│   ├── icons/             # PWA иконки
│   ├── images/            # Изображения
│   ├── manifest.json      # PWA манифест
│   ├── index.html         # HTML шаблон
│   └── offline.html       # Оффлайн страница
├── src/                   # Исходный код
│   ├── components/        # React компоненты
│   │   ├── common/        # Переиспользуемые компоненты
│   │   ├── layout/        # Компоненты макета
│   │   ├── pages/         # Страницы приложения
│   │   ├── cart/          # Компоненты корзины
│   │   ├── catalog/       # Компоненты каталога
│   │   ├── map/           # Компоненты карты
│   │   └── ...           
│   ├── store/             # Redux хранилище
│   ├── types/             # TypeScript типы
│   ├── hooks/             # Пользовательские хуки
│   ├── styles/            # CSS стили
│   ├── mocks/             # Моковые данные
│   ├── constants/         # Константы
│   ├── utils/             # Утилиты
│   ├── service-worker.js  # Service Worker для PWA
│   └── index.tsx          # Точка входа
├── package.json           # Зависимости и скрипты
├── webpack.config.js      # Конфигурация сборки
├── tsconfig.json          # Конфигурация TypeScript
└── README.md              # Документация
```

## 🚀 Быстрый старт

### Требования
- Node.js >= 16.x
- npm >= 8.x

### Установка
```bash
# Клонирование репозитория
git clone https://github.com/konopat/bazaar-front.git
cd bazaar-front

# Установка зависимостей
npm install
```

### Разработка
```bash
# Запуск dev-сервера с hot reload
npm start
# или
npm run dev

# Приложение доступно по адресу http://localhost:3000
```

### Сборка и деплой
```bash
# Создание production сборки
npm run build

# Анализ размера бандла
npm run build:analyze

# Предварительный просмотр сборки
npm run preview

# Деплой на GitHub Pages
npm run deploy
```

### Другие полезные команды
```bash
# Линтинг кода
npm run lint
npm run lint:fix

# Проверка типов TypeScript
npm run type-check

# Очистка папки сборки
npm run clean
```

## 🎨 Компонентная архитектура

### Общие компоненты (`src/components/common/`)

#### LazyImage
Оптимизированная загрузка изображений с плейсхолдерами:
```tsx
<LazyImage 
  src="/images/bouquet.jpg" 
  alt="Красивый букет" 
  aspectRatio={1.5}
  objectFit="cover"
/>
```

#### Modal
Универсальные модальные окна с анимацией:
```tsx
<Modal 
  isOpen={isOpen} 
  onClose={() => setIsOpen(false)}
  title="Заголовок"
>
  <div>Содержимое модального окна</div>
</Modal>
```

#### ProductCard
Карточки товаров с анимацией добавления в корзину:
```tsx
<ProductCard 
  product={product}
  onAddToCart={handleAddToCart}
/>
```

### Управление состоянием

Redux Toolkit для глобального состояния:
```tsx
// store/cartSlice.ts
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // логика добавления в корзину
    }
  }
});
```

### TypeScript типы

Централизованное управление типами в `src/types/`:
```tsx
// types/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

// types/index.ts
export * from './product';
export * from './cart';
```

## 🔧 Конфигурация

### Webpack алиасы
Настроены удобные импорты:
```tsx
import { ProductCard } from '@components/common/ProductCard';
import { useCart } from '@hooks/useCart';
import { Product } from '@types';
```

### PWA конфигурация
- Service Worker с кешированием
- Манифест для установки
- Оффлайн поддержка
- Иконки для разных устройств

### SEO оптимизация
- 🎯 **Динамические мета-теги** на каждой странице (useSEO хук)
- 📋 **Автоматическая XML sitemap** (33 товара + статические страницы)
- 🤖 **robots.txt** для управления индексацией
- 📊 **Structured Data** (JSON-LD) для поисковиков
- 🌐 **Open Graph** и Twitter Cards
- 🔗 **Canonical URLs** автоматически
- ⚡ **Core Web Vitals** оптимизированы

## 📱 PWA функциональность

### Установка приложения
Пользователи могут установить приложение как нативное на:
- Android устройства
- iOS устройства (через Safari)
- Desktop (Chrome, Edge, Safari)

### Оффлайн режим
- Кеширование статических ресурсов
- Оффлайн страница при отсутствии соединения
- Синхронизация данных при восстановлении связи

## 🎭 Темизация

Поддержка светлой и тёмной тем через CSS переменные:
```css
:root {
  --color-primary: #D4A977;
  --color-background: #FFFBF6;
  --color-text: #2C2C2C;
}

[data-theme="dark"] {
  --color-background: #121212;
  --color-text: #FFFFFF;
}
```

## 📍 Карты и магазины

Интеграция с OpenLayers для:
- Отображения магазинов на карте
- Выбора ближайшего магазина
- Расчёта зон доставки

## 🛒 E-commerce функции

- Каталог товаров с фильтрацией
- Корзина с подсчётом стоимости
- Формы оформления заказа
- Квиз для подбора букета
- Коллекции и рекомендации

## 🚀 Производительность

### Code Splitting
Автоматическое разделение кода по маршрутам:
```tsx
const HomePage = lazy(() => import('./pages/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage'));
```

### Оптимизация изображений
- Lazy loading для изображений
- Автоматическое сжатие
- WebP формат где поддерживается

### Кеширование
- Service Worker кеширование
- HTTP кеширование статики
- Мемоизация компонентов

## 📦 Деплой на GitHub Pages

Настроен автоматический деплой:
1. `npm run deploy` - собирает и деплоит проект
2. Настроены правильные пути для GitHub Pages
3. PWA работает с поддоменом

### URL проекта
🌐 **Демо**: https://konopat.github.io/bazaar-front/

## 🔍 Линтинг и качество кода

- ESLint с правилами React и TypeScript
- Автоматическое форматирование
- Проверка типов TypeScript
- Предкоммит хуки (планируется)

## 🧪 Тестирование

Настроен Jest для unit тестов:
```bash
npm test
```

## 📈 Мониторинг и аналитика

- Webpack Bundle Analyzer для анализа размера
- Lighthouse для аудита производительности
- PWA проверки

## 🤝 Разработка

### Добавление новых компонентов
1. Создайте компонент в соответствующей папке
2. Добавьте TypeScript типы в `src/types/`
3. Используйте алиасы для импортов
4. Следуйте установленным паттернам

### Добавление новых страниц
1. Создайте компонент в `src/components/pages/`
2. Добавьте маршрут в `App.tsx`
3. Добавьте lazy loading если необходимо

### Работа с состоянием
1. Создайте slice в `src/store/`
2. Добавьте типы в `src/types/`
3. Подключите к store

## 🛡 Безопасность

- Валидация данных на клиенте
- Санитизация пользовательского ввода
- Безопасные HTTP заголовки
- HTTPS принудительно на продакшене

## 📚 Дополнительные ресурсы

- [React документация](https://react.dev/)
- [TypeScript документация](https://www.typescriptlang.org/)
- [Redux Toolkit документация](https://redux-toolkit.js.org/)
- [PWA документация](https://web.dev/progressive-web-apps/)

## 📄 Лицензия

Проект разработан для демонстрационных целей.

---

**Поддержка**: При возникновении вопросов создайте issue в репозитории. 