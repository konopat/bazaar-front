# Подробная инструкция по миграции проекта BAZAAR на Next.js

## Введение

Данный документ содержит пошаговую инструкцию миграции проекта BAZAAR с текущего стека (React 18, TypeScript, React Router v6, Redux Toolkit, Webpack 5) на Next.js без потери функциональности и визуальных изменений для пользователя.

## Содержание

1. [Подготовка и анализ проекта](#1-подготовка-и-анализ-проекта)
2. [Настройка нового проекта Next.js](#2-настройка-нового-проекта-nextjs)
3. [Перенос компонентов и общей структуры](#3-перенос-компонентов-и-общей-структуры)
4. [Миграция маршрутизации](#4-миграция-маршрутизации)
5. [Настройка Redux в Next.js](#5-настройка-redux-в-nextjs)
6. [Перенос стилей](#6-перенос-стилей)
7. [Миграция API и данных](#7-миграция-api-и-данных)
8. [Оптимизация изображений](#8-оптимизация-изображений)
9. [Настройка SEO](#9-настройка-seo)
10. [PWA-функциональность](#10-pwa-функциональность)
11. [Тестирование](#11-тестирование)
12. [Деплой и окружения](#12-деплой-и-окружения)
13. [Перенаправления и поддержка старых URL](#13-перенаправления-и-поддержка-старых-url)

## 1. Подготовка и анализ проекта

### 1.1. Создание ветки для миграции

```bash
git checkout -b migration/nextjs
```

### 1.2. Анализ зависимостей

```bash
npm ls --depth=0 > current-dependencies.txt
```

### 1.3. Инвентаризация компонентов

Создайте документ с перечислением всех компонентов и страниц:

```bash
find src/components -type f -name "*.tsx" | sort > component-inventory.txt
find src/pages -type f -name "*.tsx" | sort > pages-inventory.txt
```

### 1.4. Создание карты маршрутов

Проанализируйте файлы с маршрутизацией в текущем проекте (обычно `App.tsx` или отдельный файл роутинга) и создайте документ с соответствием между текущими маршрутами React Router и будущими маршрутами Next.js:

Пример:
```
React Router: /products/:id -> Next.js: /products/[id]
React Router: /collections/:slug -> Next.js: /collections/[slug]
```

## 2. Настройка нового проекта Next.js

### 2.1. Инициализация Next.js проекта

```bash
# Создайте новый каталог рядом с существующим
mkdir bazaar-nextjs
cd bazaar-nextjs

# Инициализируйте проект Next.js с TypeScript
npx create-next-app@latest . --typescript --eslint --tailwind false --app false --src-dir true --import-alias "@/*"
```

### 2.2. Установка необходимых зависимостей

```bash
# Redux и связанные библиотеки
npm install @reduxjs/toolkit react-redux next-redux-wrapper

# Дополнительные зависимости из старого проекта
npm install ol # OpenLayers для карт

# Для PWA
npm install next-pwa

# Для SEO
npm install next-seo
```

### 2.3. Настройка tsconfig.json

Обновите `tsconfig.json` для соответствия настройкам оригинального проекта:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@constants/*": ["src/constants/*"],
      "@hooks/*": ["src/hooks/*"],
      "@images/*": ["src/images/*"],
      "@mocks/*": ["src/mocks/*"],
      "@store/*": ["src/store/*"],
      "@styles/*": ["src/styles/*"],
      "@types/*": ["src/types/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```

### 2.4. Создание базовой структуры каталогов

```bash
mkdir -p src/components/common
mkdir -p src/components/layout
mkdir -p src/components/pages
mkdir -p src/components/catalog
mkdir -p src/components/cart
mkdir -p src/components/products
mkdir -p src/components/collections
mkdir -p src/components/map
mkdir -p src/components/quiz
mkdir -p src/constants
mkdir -p src/hooks
mkdir -p src/images
mkdir -p src/mocks
mkdir -p src/store
mkdir -p src/styles
mkdir -p src/types
mkdir -p src/pages/api
mkdir -p src/fonts
mkdir -p public/images
```

### 2.5. Настройка next.config.js

Создайте файл `next.config.js` с базовой конфигурацией:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [], // Добавьте домены для изображений, если нужно
  },
  webpack(config) {
    // Добавьте любые кастомные настройки webpack
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    return config;
  },
};

module.exports = nextConfig;
```

## 3. Перенос компонентов и общей структуры

### 3.1. Перенос типов

Перенесите все типы из `src/types` в новый проект, сохраняя структуру:

```bash
cp -r ../bazaar-front/src/types/* src/types/
```

Обновите импорты, если необходимо, для использования алиасов Next.js:

```typescript
// Было
import { ProductType } from '../../types/product';

// Стало
import { ProductType } from '@/types/product';
```

### 3.2. Перенос общих компонентов

Начните с переноса общих компонентов, таких как LazyImage, Skeleton, Modal и Icon:

```bash
cp -r ../bazaar-front/src/components/common/* src/components/common/
```

Обновите импорты для Next.js:

```typescript
// Было
import Skeleton from '../Skeleton';

// Стало
import Skeleton from '@/components/common/Skeleton';
```

### 3.3. Создание базового макета

Создайте файл `src/components/layout/Layout.tsx`:

```tsx
import React from 'react';
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title = 'BAZAAR - Магазин цветочных букетов',
  description = 'Эксклюзивные цветочные букеты с доставкой' 
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
```

### 3.4. Перенос компонентов макета

Перенесите компоненты Header и Footer:

```bash
cp -r ../bazaar-front/src/components/layout/* src/components/layout/
```

Скорректируйте импорты и учтите особенности Next.js (например, замените `<Link>` из React Router на `<Link>` из Next.js):

```tsx
// Было
import { Link } from 'react-router-dom';

// Стало
import Link from 'next/link';

// Было
<Link to="/catalog">Каталог</Link>

// Стало
<Link href="/catalog">Каталог</Link>
```

### 3.5. Перенос остальных компонентов

Методично перенесите все остальные компоненты, обновляя импорты:

```bash
cp -r ../bazaar-front/src/components/catalog/* src/components/catalog/
cp -r ../bazaar-front/src/components/cart/* src/components/cart/
# И так далее для всех директорий с компонентами
```

## 4. Миграция маршрутизации

### 4.1. Создание страниц в Next.js

В Next.js каждый файл в директории `pages` становится маршрутом. Создайте файлы для каждого маршрута из карты маршрутов (шаг 1.4):

#### Главная страница (`src/pages/index.tsx`):

```tsx
import Layout from '@/components/layout/Layout';
import HomePage from '@/components/pages/HomePage';

export default function Home() {
  return (
    <Layout title="BAZAAR - Цветочный магазин" description="Эксклюзивные букеты с доставкой">
      <HomePage />
    </Layout>
  );
}
```

#### Страница каталога (`src/pages/catalog/index.tsx`):

```tsx
import Layout from '@/components/layout/Layout';
import CatalogPage from '@/components/pages/CatalogPage';

export default function Catalog() {
  return (
    <Layout title="Каталог букетов | BAZAAR" description="Наш каталог цветочных композиций">
      <CatalogPage />
    </Layout>
  );
}
```

#### Динамическая страница товара (`src/pages/products/[id].tsx`):

```tsx
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import ProductPage from '@/components/pages/ProductPage';
import { GetServerSideProps } from 'next';
import { getProductById } from '@/api/products'; // Создайте этот файл для API-запросов
import { Product } from '@/types/product';

// Типы для пропсов страницы
interface ProductPageProps {
  product: Product | null;
}

export default function ProductDetail({ product }: ProductPageProps) {
  const router = useRouter();
  const { id } = router.query;
  
  // Обработка состояния загрузки
  if (router.isFallback) {
    return <Layout><div>Загрузка...</div></Layout>;
  }
  
  // Обработка ошибки
  if (!product) {
    return (
      <Layout title="Товар не найден | BAZAAR">
        <div>Товар не найден</div>
      </Layout>
    );
  }
  
  return (
    <Layout 
      title={`${product.name} | BAZAAR`} 
      description={product.description?.substring(0, 160)}
    >
      <ProductPage product={product} />
    </Layout>
  );
}

// Получение данных на сервере
export const getServerSideProps: GetServerSideProps<ProductPageProps> = async (context) => {
  const id = context.params?.id as string;
  
  try {
    const product = await getProductById(id);
    
    return {
      props: {
        product,
      },
    };
  } catch (error) {
    // В случае ошибки вернем null для обработки на клиенте
    return {
      props: {
        product: null,
      },
    };
  }
};
```

### 4.2. Создание API-маршрутов

В Next.js можно создавать серверные API-эндпоинты. Создайте файл `src/pages/api/products/[id].ts`:

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';
import { Product } from '@/types/product';
import { products } from '@/mocks/products'; // Для примера используем моковые данные

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Product | { message: string }>
) {
  const { id } = req.query;
  
  if (req.method === 'GET') {
    const product = products.find(p => p.id === id);
    
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Товар не найден' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Метод ${req.method} не разрешен` });
  }
}
```

### 4.3. Создание 404 страницы

Создайте файл `src/pages/404.tsx`:

```tsx
import Layout from '@/components/layout/Layout';
import Link from 'next/link';

export default function Custom404() {
  return (
    <Layout title="Страница не найдена | BAZAAR">
      <div className="error-page">
        <h1>404 - Страница не найдена</h1>
        <p>К сожалению, страница, которую вы ищете, не существует.</p>
        <Link href="/">
          <a className="button">Вернуться на главную</a>
        </Link>
      </div>
    </Layout>
  );
}
```

## 5. Настройка Redux в Next.js

### 5.1. Создание хранилища Redux

Создайте файл `src/store/store.ts`:

```typescript
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import cartReducer from './cartSlice';

export const makeStore = () => 
  configureStore({
    reducer: {
      cart: cartReducer,
      // Добавьте другие редьюсеры здесь
    },
    devTools: process.env.NODE_ENV !== 'production',
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const wrapper = createWrapper<AppStore>(makeStore);
```

### 5.2. Перенос среза корзины

Создайте файл `src/store/cartSlice.ts`, перенеся и адаптировав логику из старого проекта:

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { CartItem, Product } from '@/types/product';
import { RootState } from './store';

interface CartState {
  items: CartItem[];
  totalAmount: number;
}

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

const calculateTotalAmount = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({
          ...product,
          quantity: 1,
        });
      }
      
      state.totalAmount = calculateTotalAmount(state.items);
    },
    // Добавьте другие редьюсеры (removeFromCart, updateQuantity и т.д.)
  },
  // Обработка гидратации состояния с сервера
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.cart,
      };
    },
  },
});

export const { addToCart } = cartSlice.actions;

// Селекторы
export const selectCartItems = (state: RootState) => state.cart.items;
export const selectCartTotalAmount = (state: RootState) => state.cart.totalAmount;
export const selectCartItemsCount = (state: RootState) => 
  state.cart.items.reduce((count, item) => count + item.quantity, 0);

export default cartSlice.reducer;
```

### 5.3. Интеграция Redux с Next.js

Создайте файл `src/pages/_app.tsx`:

```tsx
import { AppProps } from 'next/app';
import { wrapper } from '@/store/store';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
```

### 5.4. Создание хуков для Redux

Создайте файл `src/hooks/redux.ts`:

```typescript
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '@/store/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

## 6. Перенос стилей

### 6.1. Глобальные стили

Создайте файл `src/styles/globals.css` и перенесите в него все глобальные стили из текущего проекта:

```bash
cp ../bazaar-front/src/index.css src/styles/globals.css
```

### 6.2. Перенос стилей компонентов

Перенесите все CSS-файлы из директории стилей:

```bash
cp -r ../bazaar-front/src/styles/* src/styles/
```

### 6.3. Перенос шрифтов

```bash
cp -r ../bazaar-front/src/fonts/* src/fonts/
```

Добавьте загрузку шрифтов в `src/pages/_document.tsx`:

```tsx
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="ru">
        <Head>
          <link rel="preload" href="/fonts/font-name.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
          {/* Добавьте другие шрифты */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

## 7. Миграция API и данных

### 7.1. Создание API-клиента

Создайте файл `src/api/client.ts`:

```typescript
export const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function fetchJson<T>(url: string, options: RequestInit = {}): Promise<T> {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`Ошибка API: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Ошибка при выполнении запроса:', error);
    throw error;
  }
}
```

### 7.2. Создание API-функций для товаров

Создайте файл `src/api/products.ts`:

```typescript
import { fetchJson, API_URL } from './client';
import { Product } from '@/types/product';

export async function getProducts(): Promise<Product[]> {
  return fetchJson<Product[]>(`${API_URL}/products`);
}

export async function getProductById(id: string): Promise<Product> {
  return fetchJson<Product>(`${API_URL}/products/${id}`);
}

export async function getProductsByCollection(collectionId: string): Promise<Product[]> {
  return fetchJson<Product[]>(`${API_URL}/collections/${collectionId}/products`);
}
```

### 7.3. Перенос моковых данных

Если проект использует моковые данные, перенесите их:

```bash
cp -r ../bazaar-front/src/mocks/* src/mocks/
```

## 8. Оптимизация изображений

### 8.1. Использование компонента Image из Next.js

Замените стандартные теги `<img>` и компонент `LazyImage` на оптимизированный `Image` из Next.js.

Пример миграции компонента `LazyImage`:

```tsx
import Image from 'next/image';
import { useState } from 'react';
import Skeleton from './Skeleton';

interface LazyImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  containerClassName?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  width?: number;
  height?: number;
  aspectRatio?: number;
  priority?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  fallbackSrc = '/images/placeholder.jpg',
  className = '',
  containerClassName = '',
  objectFit = 'cover',
  width,
  height,
  aspectRatio,
  priority = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Рассчитываем высоту, если указано соотношение сторон
  const calculatedHeight = aspectRatio && width ? Math.round(width / aspectRatio) : height;
  
  const handleLoad = () => {
    setIsLoading(false);
  };
  
  const handleError = () => {
    setError(true);
    setIsLoading(false);
  };
  
  return (
    <div className={`lazy-image-container ${containerClassName}`}>
      {isLoading && <Skeleton width="100%" height={height || '100%'} />}
      
      <div style={{ display: isLoading ? 'none' : 'block' }}>
        <Image
          src={error ? fallbackSrc : src}
          alt={alt}
          width={width || 300}
          height={calculatedHeight || 300}
          className={className}
          style={{ objectFit }}
          onLoad={handleLoad}
          onError={handleError}
          priority={priority}
        />
      </div>
    </div>
  );
};

export default LazyImage;
```

### 8.2. Перенос изображений в директорию public

```bash
cp -r ../bazaar-front/src/images/* public/images/
```

### 8.3. Настройка конфигурации изображений в next.config.js

Обновите `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.example.com'], // Добавьте домены внешних источников изображений
    formats: ['image/avif', 'image/webp'],
  },
  // Остальная конфигурация...
};

module.exports = nextConfig;
```

## 9. Настройка SEO

### 9.1. Настройка next-seo

Создайте файл `src/lib/seo-config.ts`:

```typescript
import { DefaultSeoProps } from 'next-seo';

const DEFAULT_TITLE = 'BAZAAR - Эксклюзивные цветочные букеты';
const DEFAULT_DESCRIPTION = 'Магазин эксклюзивных цветочных букетов с доставкой. Уникальные композиции на любой случай.';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bazaar-flowers.ru';

export const defaultSEOConfig: DefaultSeoProps = {
  title: DEFAULT_TITLE,
  description: DEFAULT_DESCRIPTION,
  canonical: SITE_URL,
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    site_name: 'BAZAAR',
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'BAZAAR - Цветочный магазин',
      },
    ],
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
  ],
};
```

### 9.2. Интеграция SEO в _app.tsx

Обновите `src/pages/_app.tsx`:

```tsx
import { AppProps } from 'next/app';
import { DefaultSeo } from 'next-seo';
import { wrapper } from '@/store/store';
import { defaultSEOConfig } from '@/lib/seo-config';
import '@/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...defaultSEOConfig} />
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
```

### 9.3. Использование SEO на страницах

Обновите страницы для использования компонента `NextSeo`:

```tsx
import { NextSeo } from 'next-seo';
import Layout from '@/components/layout/Layout';
import ProductPage from '@/components/pages/ProductPage';

export default function ProductDetail({ product }) {
  return (
    <>
      <NextSeo
        title={`${product.name} | BAZAAR`}
        description={product.description?.substring(0, 160)}
        openGraph={{
          title: `${product.name} | BAZAAR`,
          description: product.description?.substring(0, 160),
          images: [
            {
              url: product.images[0],
              width: 800,
              height: 600,
              alt: product.name,
            },
          ],
        }}
      />
      <Layout>
        <ProductPage product={product} />
      </Layout>
    </>
  );
}
```

## 10. PWA-функциональность

### 10.1. Настройка PWA с next-pwa

Обновите `next.config.js`:

```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Остальная конфигурация...
};

module.exports = withPWA(nextConfig);
```

### 10.2. Создание Web App Manifest

Создайте файл `public/manifest.json`:

```json
{
  "name": "BAZAAR - Цветочный магазин",
  "short_name": "BAZAAR",
  "description": "Эксклюзивные букеты с доставкой",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FFFFFF",
  "theme_color": "#D4A977",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any maskable"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 10.3. Добавление Service Worker

Расширенная настройка Service Worker осуществляется через конфигурацию `next-pwa`. Дополнительно можно создать файл для кастомизации:

Создайте файл `worker/index.js`:

```javascript
// Этот файл будет объединен с автоматически сгенерированным Service Worker

// Кастомная обработка событий
self.addEventListener('push', (event) => {
  const data = event.data.json();
  
  const options = {
    body: data.body,
    icon: '/icons/icon-192.png',
    badge: '/icons/badge-72.png',
    vibrate: [100, 50, 100],
    data: {
      url: data.url,
    },
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});
```

## 11. Тестирование

### 11.1. Подготовка тестовой среды

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
```

### 11.2. Настройка Jest

Создайте файл `jest.config.js`:

```javascript
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  dir: './',
});

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
```

### 11.3. Настройка команд для тестирования

Обновите `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest",
    "test:watch": "jest --watch"
  }
}
```

### 11.4. Миграция существующих тестов

Перенесите и адаптируйте существующие тесты из старого проекта.

## 12. Деплой и окружения

### 12.1. Настройка переменных окружения

Создайте файлы:
- `.env.local` - для локальной разработки
- `.env.development` - для среды разработки
- `.env.production` - для продакшена

Пример `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 12.2. Настройка скриптов для разных окружений

Обновите `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "build:analyze": "ANALYZE=true next build",
    "start": "next start",
    "lint": "next lint"
  }
}
```

### 12.3. Настройка CI/CD

Пример GitHub Actions (файл `.github/workflows/deploy.yml`):

```yaml
name: Deploy Next.js app

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run tests
        run: npm test
        
      - name: Build project
        run: npm run build
        env:
          NEXT_PUBLIC_API_URL: ${{ secrets.NEXT_PUBLIC_API_URL }}
          NEXT_PUBLIC_SITE_URL: ${{ secrets.NEXT_PUBLIC_SITE_URL }}
          
      - name: Deploy to hosting
        # Здесь добавьте команды для вашего хостинга (Vercel, Netlify и т.д.)
```

## 13. Перенаправления и поддержка старых URL

### 13.1. Настройка перенаправлений

Добавьте в `next.config.js`:

```javascript
module.exports = withPWA({
  // ...другие настройки
  
  async redirects() {
    return [
      // Пример перенаправления со старого формата URL на новый
      {
        source: '/catalog/item/:id',
        destination: '/products/:id',
        permanent: true,
      },
      // Другие перенаправления
    ];
  },
});
```

### 13.2. Поддержка legacy-маршрутов

Для сохранения поддержки старых маршрутов создайте соответствующие файлы в директории `pages`:

Пример `src/pages/catalog/item/[id].tsx`:

```tsx
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params as { id: string };
  
  return {
    redirect: {
      destination: `/products/${id}`,
      permanent: true,
    },
  };
};

// Функция-заглушка (компонент никогда не будет рендериться из-за перенаправления)
export default function LegacyProductPage() {
  return null;
}
```

## Заключение

После выполнения всех шагов инструкции вы получите полнофункциональное Next.js-приложение с сохранением всей функциональности исходного проекта BAZAAR, но с преимуществами SSR, улучшенным SEO и PWA-возможностями.

Преимущества миграции:
1. Серверный рендеринг для улучшения производительности и SEO
2. Встроенная оптимизация изображений
3. Автоматический код-сплиттинг для ускорения загрузки
4. Простая настройка PWA
5. Встроенные API-роуты
6. Улучшенные возможности кэширования

Рекомендации по дальнейшей оптимизации:
1. Использовать getStaticProps/getStaticPaths для страниц, которые можно рендерить статически
2. Настроить Incremental Static Regeneration для динамического обновления статических страниц
3. Внедрить аналитику с помощью Next.js Analytics
4. Улучшить кэширование на стороне сервера и клиента 