# Подробное руководство по миграции BAZAAR на Next.js

## Введение

Этот документ содержит исчерпывающую инструкцию по миграции проекта BAZAAR с текущего стека технологий (React 18, TypeScript, React Router v6, Redux Toolkit, Webpack 5) на Next.js без потери функциональности и видимых изменений для пользователя.

Руководство учитывает все специфические особенности проекта BAZAAR, включая работу с:
- Компонентами общего назначения (LazyImage, Skeleton, Modal, Icon)
- Модульной структурой проекта
- Хранилищем Redux
- Анимациями и специальными эффектами
- Картами на основе OpenLayers
- Семантической версткой и доступностью
- Стилизацией по методологии БЭМ
- Квизом для выбора букетов
- Централизованным хранилищем типов TypeScript

## Содержание

1. [Подготовка и анализ проекта](#1-подготовка-и-анализ-проекта)
2. [Настройка нового проекта Next.js](#2-настройка-нового-проекта-nextjs)
3. [Перенос типов и их адаптация](#3-перенос-типов-и-их-адаптация)
4. [Миграция компонентов](#4-миграция-компонентов)
5. [Реализация маршрутизации](#5-реализация-маршрутизации)
6. [Настройка Redux в Next.js](#6-настройка-redux-в-nextjs)
7. [Адаптация стилей](#7-адаптация-стилей)
8. [Оптимизация изображений](#8-оптимизация-изображений)
9. [Работа с OpenLayers в Next.js](#9-работа-с-openlayers-в-nextjs)
10. [Миграция анимаций](#10-миграция-анимаций)
11. [Оптимизация SEO](#11-оптимизация-seo)
12. [Тестирование и отладка](#12-тестирование-и-отладка)
13. [Деплой проекта](#13-деплой-проекта)
14. [Перенаправления и поддержка URL](#14-перенаправления-и-поддержка-url)
15. [Миграция ключевых компонентов](#15-миграция-ключевых-компонентов)

## 1. Подготовка и анализ проекта

### 1.1. Создание ветки для миграции

```bash
git checkout -b migration/nextjs
```

### 1.2. Анализ текущей структуры проекта

Прежде чем начать миграцию, необходимо создать инвентаризацию существующих компонентов, страниц и маршрутов:

```bash
# Создание списка всех компонентов
find src/components -type f -name "*.tsx" | sort > component-inventory.txt

# Создание списка всех страниц
find src/components/pages -type f -name "*.tsx" | sort > pages-inventory.txt

# Создание списка всех стилей
find src/styles -type f -name "*.css" | sort > styles-inventory.txt
```

### 1.3. Анализ маршрутизации в App.tsx

Необходимо проанализировать `App.tsx` и создать карту соответствия маршрутов React Router и Next.js:

| React Router | Next.js |
|--------------|---------|
| / | app/page.tsx |
| /catalog | app/catalog/page.tsx |
| /products/:id | app/products/[id]/page.tsx |
| /collections | app/collections/page.tsx |
| /collections/:slug | app/collections/[slug]/page.tsx |
| /cart | app/cart/page.tsx |
| /checkout | app/checkout/page.tsx |
| /about | app/about/page.tsx |
| /contacts | app/contacts/page.tsx |
| /blog | app/blog/page.tsx |
| /blog/:slug | app/blog/[slug]/page.tsx |
| /delivery | app/delivery/page.tsx |
| /quiz | app/quiz/page.tsx |
| /vacancies | app/vacancies/page.tsx |
| /privacy | app/privacy/page.tsx |

### 1.4. Анализ зависимостей проекта

```bash
npm ls --depth=0 > current-dependencies.txt
```

Ключевые зависимости, которые потребуется мигрировать:
- react
- react-dom
- react-router-dom
- @reduxjs/toolkit
- react-redux
- typescript
- ol (OpenLayers)

## 2. Настройка нового проекта Next.js

### 2.1. Инициализация проекта Next.js

```bash
# Создаем новый проект рядом с существующим
mkdir bazaar-nextjs
cd bazaar-nextjs

# Инициализируем Next.js с App Router, TypeScript и ESLint
npx create-next-app@latest . --app --typescript --eslint --tailwind=false --src-dir
```

### 2.2. Создание директорий согласно структуре проекта

```bash
# Создаем основные директории компонентов
mkdir -p src/components/common
mkdir -p src/components/layout
mkdir -p src/components/catalog
mkdir -p src/components/cart
mkdir -p src/components/products
mkdir -p src/components/collections
mkdir -p src/components/map
mkdir -p src/components/quiz

# Создаем директории для вспомогательных файлов
mkdir -p src/constants
mkdir -p src/hooks
mkdir -p src/mocks
mkdir -p src/store
mkdir -p src/types
mkdir -p public/images
```

### 2.3. Установка необходимых зависимостей

```bash
# Установка Redux и других библиотек
npm install @reduxjs/toolkit react-redux next-redux-wrapper

# Установка OpenLayers и типов
npm install ol
npm install --save-dev @types/ol

# Установка утилит и вспомогательных библиотек
npm install clsx
npm install next-themes
npm install next-seo
```

### 2.4. Настройка tsconfig.json

Обновите существующий `tsconfig.json`, добавив алиасы путей для согласования со структурой исходного проекта:

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./src/*"],
      "@components/*": ["./src/components/*"],
      "@constants/*": ["./src/constants/*"],
      "@hooks/*": ["./src/hooks/*"],
      "@mocks/*": ["./src/mocks/*"],
      "@store/*": ["./src/store/*"],
      "@styles/*": ["./src/styles/*"],
      "@types/*": ["./src/types/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 2.5. Конфигурация next.config.js

Создайте или обновите `next.config.js` со специальными настройками для проекта:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [], // Добавьте домены для изображений, если нужно
    formats: ['image/avif', 'image/webp'],
  },
  webpack(config) {
    // Поддержка SVG как React компонентов
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    
    return config;
  },
};

module.exports = nextConfig;
```

### 2.6. Настройка среды разработки

Создайте файл `.env.local` для локальных переменных окружения:

```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_SITE_NAME=BAZAAR
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 3. Перенос типов и их адаптация

### 3.1. Перенос централизованного хранилища типов

Скопируйте всю директорию типов из исходного проекта:

```bash
cp -r ../bazaar-front/src/types/* ./src/types/
```

### 3.2. Адаптация импортов в типах

Проверьте все файлы типов и обновите импорты, используя новые алиасы пути:

```typescript
// Было
import { SomeType } from '../../types/someFile';

// Стало
import { SomeType } from '@types/someFile';
// или
import { SomeType } from '@/types/someFile';
```

### 3.3. Адаптация типов для Next.js

Создайте новый файл `src/types/next.ts` с типами для Next.js:

```typescript
import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';

// Тип для страниц с возможностью вложенных макетов
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

// Тип для _app.tsx с поддержкой макетов
export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

// Тип для метаданных страницы
export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
}
```

### 3.4. Добавление типов для компонента Image из Next.js

Добавьте типы для компонента `Image` в файл `src/types/lazyImage.ts`:

```typescript
import { StaticImageData } from 'next/image';

export interface LazyImageProps {
  src: string | StaticImageData;
  alt: string;
  fallbackSrc?: string | StaticImageData;
  className?: string;
  containerClassName?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none';
  width?: number;
  height?: number;
  aspectRatio?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}
```

### 3.5. Обновление типов для компонента карты OpenLayers

Обновите типы для карты в файле `src/types/map.ts`, учитывая особенности работы с ней в Next.js:

```typescript
import { Map as OLMap } from 'ol';
import { Coordinate } from 'ol/coordinate';

export interface MapProps {
  center?: Coordinate;
  zoom?: number;
  markers?: MapMarker[];
  className?: string;
  onMapReady?: (map: OLMap) => void;
  // Добавляем свойство для серверного рендеринга
  ssr?: boolean;
}

export interface MapMarker {
  id: string;
  coordinates: Coordinate;
  title: string;
  isActive?: boolean;
  onClick?: (id: string) => void;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  coordinates: Coordinate;
  phone: string;
  workingHours: string;
  image?: string;
}
```

### 3.6. Обновление индексного файла типов

Обновите файл `src/types/index.ts`, добавив экспорт новых типов:

```typescript
// Экспорт существующих типов
export * from './catalog';
export * from './collection';
export * from './common';
export * from './icon';
export * from './layout';
export * from './lazyImage';
export * from './map';
export * from './modal';
export * from './product';
export * from './quiz';
export * from './skeleton';

// Добавление новых типов для Next.js
export * from './next';
```

## 4. Миграция компонентов

### 4.1. Перенос компонентов общего назначения

Скопируйте все компоненты общего назначения из исходного проекта в новый проект:

```bash
cp -r ../bazaar-front/src/components/common/* ./src/components/common/
cp -r ../bazaar-front/src/components/layout/* ./src/components/layout/
cp -r ../bazaar-front/src/components/catalog/* ./src/components/catalog/
cp -r ../bazaar-front/src/components/cart/* ./src/components/cart/
cp -r ../bazaar-front/src/components/products/* ./src/components/products/
cp -r ../bazaar-front/src/components/collections/* ./src/components/collections/
cp -r ../bazaar-front/src/components/map/* ./src/components/map/
cp -r ../bazaar-front/src/components/quiz/* ./src/components/quiz/
```

### 4.2. Адаптация компонентов

Проверьте все компоненты и обновите их импорты, используя новые алиасы пути:

```typescript
// Было
import { SomeComponent } from '../../components/someComponent';

// Стало
import { SomeComponent } from '@/components/someComponent';
```

## 5. Реализация маршрутизации

### 5.1. Перенос маршрутов

Скопируйте все маршруты из исходного проекта в новый проект:

```bash
cp -r ../bazaar-front/src/routes/* ./src/routes/
```

### 5.2. Адаптация маршрутов

Проверьте все маршруты и обновите их импорты, используя новые алиасы пути:

```typescript
// Было
import { SomeRoute } from '../../routes/someRoute';

// Стало
import { SomeRoute } from '@/routes/someRoute';
```

## 6. Настройка Redux в Next.js

### 6.1. Перенос хранилища Redux

Скопируйте все файлы хранилища Redux из исходного проекта в новый проект:

```bash
cp -r ../bazaar-front/src/store/* ./src/store/
```

### 6.2. Адаптация хранилища Redux

Проверьте все файлы хранилища Redux и обновите их импорты, используя новые алиасы пути:

```typescript
// Было
import { SomeReducer } from '../../store/someReducer';

// Стало
import { SomeReducer } from '@/store/someReducer';
```

## 7. Адаптация стилей

### 7.1. Перенос стилей

Скопируйте все стили из исходного проекта в новый проект:

```bash
cp -r ../bazaar-front/src/styles/* ./src/styles/
```

### 7.2. Адаптация стилей

Проверьте все стили и обновите их импорты, используя новые алиасы пути:

```typescript
// Было
import { SomeStyle } from '../../styles/someStyle';

// Стало
import { SomeStyle } from '@/styles/someStyle';
```

## 8. Оптимизация изображений

### 8.1. Перенос изображений

Скопируйте все изображения из исходного проекта в новый проект:

```bash
cp -r ../bazaar-front/public/images/* ./public/images/
```

### 8.2. Оптимизация изображений

Проверьте все изображения и обновите их импорты, используя новые алиасы пути:

```typescript
// Было
import { SomeImage } from '../../images/someImage';

// Стало
import { SomeImage } from '@/images/someImage';
```

## 9. Работа с OpenLayers в Next.js

### 9.1. Перенос компонентов OpenLayers

Скопируйте все компоненты OpenLayers из исходного проекта в новый проект:

```bash
cp -r ../bazaar-front/src/components/map/* ./src/components/map/
```

### 9.2. Адаптация компонентов OpenLayers

Проверьте все компоненты OpenLayers и обновите их импорты, используя новые алиасы пути:

```typescript
// Было
import { SomeMapComponent } from '../../components/map/someMapComponent';

// Стало
import { SomeMapComponent } from '@/components/map/someMapComponent';
```

## 10. Миграция анимаций

### 10.1. Перенос анимаций

Скопируйте все анимации из исходного проекта в новый проект:

```bash
cp -r ../bazaar-front/src/animations/* ./src/animations/
```

### 10.2. Адаптация анимаций

Проверьте все анимации и обновите их импорты, используя новые алиасы пути:

```typescript
// Было
import { SomeAnimation } from '../../animations/someAnimation';

// Стало
import { SomeAnimation } from '@/animations/someAnimation';
```

## 11. Оптимизация SEO

### 11.1. Перенос метаданных

Скопируйте все метаданные из исходного проекта в новый проект:

```bash
cp -r ../bazaar-front/src/seo/* ./src/seo/
```

### 11.2. Адаптация метаданных

Проверьте все метаданные и обновите их импорты, используя новые алиасы пути:

```typescript
// Было
import { SomeMeta } from '../../seo/someMeta';

// Стало
import { SomeMeta } from '@/seo/someMeta';
```

## 12. Тестирование и отладка

### 12.1. Перенос тестов

Скопируйте все тесты из исходного проекта в новый проект:

```bash
cp -r ../bazaar-front/tests/* ./tests/
```

### 12.2. Адаптация тестов

Проверьте все тесты и обновите их импорты, используя новые алиасы пути:

```typescript
// Было
import { SomeTest } from '../../tests/someTest';

// Стало
import { SomeTest } from '@/tests/someTest';
```

## 13. Деплой проекта

### 13.1. Перенос конфигурации деплоя

Скопируйте все конфигурации деплоя из исходного проекта в новый проект:

```bash
cp -r ../bazaar-front/.next/* ./
```

### 13.2. Адаптация конфигурации деплоя

Проверьте все конфигурации деплоя и обновите их импорты, используя новые алиасы пути:

```typescript
// Было
import { SomeConfig } from '../../config/someConfig';

// Стало
import { SomeConfig } from '@/config/someConfig';
```

## 14. Перенаправления и поддержка URL

### 14.1. Перенос перенаправлений

Скопируйте все перенаправления из исходного проекта в новый проект:

```bash
cp -r ../bazaar-front/src/redirects/* ./src/redirects/
```

### 14.2. Адаптация перенаправлений

Проверьте все перенаправления и обновите их импорты, используя новые алиасы пути:

```typescript
// Было
import { SomeRedirect } from '../../redirects/someRedirect';

// Стало
import { SomeRedirect } from '@/redirects/someRedirect';
```

## 15. Миграция ключевых компонентов

В этом разделе подробно описана миграция ключевых компонентов проекта BAZAAR, сохраняющая их функциональность и уникальные особенности.

### 15.1. Миграция компонента LazyImage

Компонент `LazyImage` - важная часть UI, обеспечивающая отложенную загрузку и отображение плейсхолдеров. При миграции необходимо перейти с обычного тега `<img>` на компонент `Image` из Next.js.

#### 15.1.1. Исходная реализация LazyImage:

```tsx
// src/components/common/LazyImage.tsx в оригинальном проекте
import React, { useState, useEffect } from 'react';
import Skeleton from './Skeleton';

interface LazyImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  containerClassName?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  width?: string;
  height?: string;
  aspectRatio?: number;
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
  aspectRatio
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  
  // Сброс состояния при изменении src
  useEffect(() => {
    setIsLoading(true);
    setError(false);
    setCurrentSrc(src);
  }, [src]);

  // Обработчики событий
  const handleLoad = () => {
    setIsLoading(false);
  };
  
  const handleError = () => {
    setError(true);
    setCurrentSrc(fallbackSrc);
    setIsLoading(false);
  };
  
  // Стили для соотношения сторон
  const aspectRatioStyle = aspectRatio
    ? { paddingBottom: `${(1 / aspectRatio) * 100}%` }
    : {};
  
  return (
    <div 
      className={`lazy-image-container ${containerClassName}`}
      style={{ width, height }}
    >
      {isLoading && (
        <Skeleton 
          width="100%" 
          height={height || '100%'} 
          className="lazy-image-skeleton" 
        />
      )}
      
      <div 
        className="lazy-image-wrapper"
        style={{ 
          ...aspectRatioStyle, 
          display: isLoading ? 'none' : 'block' 
        }}
      >
        <img
          src={currentSrc}
          alt={alt}
          className={`lazy-image ${className}`}
          style={{ objectFit }}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default LazyImage;
```

#### 15.1.2. Новая реализация с использованием Next.js Image:

```tsx
// src/components/common/LazyImage.tsx в проекте Next.js
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { LazyImageProps } from '@/types/lazyImage';
import Skeleton from './Skeleton';

const LazyImage = ({
  src,
  alt,
  fallbackSrc = '/images/placeholder.jpg',
  className = '',
  containerClassName = '',
  objectFit = 'cover',
  width = 500,
  height = 300,
  aspectRatio,
  priority = false,
  onLoad,
  onError
}: LazyImageProps) => {
  const [isLoading, setIsLoading] = useState(!priority);
  const [error, setError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  
  // Вычисляем размеры на основе соотношения сторон, если оно указано
  const calculatedHeight = aspectRatio && typeof width === 'number' 
    ? Math.round(width / aspectRatio) 
    : height;
  
  const calculatedWidth = aspectRatio && typeof height === 'number' 
    ? Math.round(height * aspectRatio) 
    : width;
  
  // Сброс состояния при изменении src
  useEffect(() => {
    if (!priority) {
      setIsLoading(true);
    }
    setError(false);
    setCurrentSrc(src);
  }, [src, priority]);
  
  // Обработчики событий
  const handleLoadComplete = () => {
    setIsLoading(false);
    onLoad?.();
  };
  
  const handleImageError = () => {
    setError(true);
    setCurrentSrc(fallbackSrc);
    setIsLoading(false);
    onError?.();
  };
  
  return (
    <div className={`lazy-image-container ${containerClassName}`}>
      {isLoading && (
        <Skeleton 
          width="100%" 
          height={typeof calculatedHeight === 'number' ? `${calculatedHeight}px` : calculatedHeight} 
          className="lazy-image-skeleton" 
        />
      )}
      
      <div 
        className="lazy-image-wrapper"
        style={{ 
          display: isLoading ? 'none' : 'block',
          position: 'relative',
          width: typeof calculatedWidth === 'number' ? `${calculatedWidth}px` : calculatedWidth,
          height: typeof calculatedHeight === 'number' ? `${calculatedHeight}px` : calculatedHeight
        }}
      >
        <Image
          src={currentSrc}
          alt={alt}
          fill={true}
          className={`lazy-image ${className}`}
          style={{ objectFit }}
          onLoadingComplete={handleLoadComplete}
          onError={handleImageError}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
    </div>
  );
};

export default LazyImage;
```

#### 15.1.3. Ключевые изменения в LazyImage:

1. **Директива `'use client'`**: Добавлена для обозначения компонента как клиентского, так как он использует состояния и эффекты.

2. **Использование `next/image`**: Вместо нативного тега `<img>` используется компонент `Image` из Next.js, который автоматически оптимизирует изображения.

3. **Свойство `fill`**: Используется для заполнения контейнера, вместо явного указания размеров в самом теге.

4. **Атрибут `sizes`**: Добавлен для отзывчивости изображений на разных экранах.

5. **Типы для Next.js Image**: Используется обновленный интерфейс `LazyImageProps`, который поддерживает типы из Next.js (например, `StaticImageData`).

6. **Обработка приоритета**: Добавлен параметр `priority` для критически важных изображений, которые нужно загружать с высоким приоритетом.

#### 15.1.4. CSS стили для LazyImage:

Создайте файл `src/styles/components/LazyImage.css`:

```css
.lazy-image-container {
  position: relative;
  overflow: hidden;
  background-color: var(--color-skeleton-background, #f0f0f0);
  width: 100%;
}

.lazy-image-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
}

.lazy-image {
  transition: opacity 0.3s ease;
}

/* Дополнительные стили для анимации появления */
.lazy-image.loaded {
  opacity: 1;
}

.lazy-image:not(.loaded) {
  opacity: 0;
}
```

#### 15.1.5. Использование в компонентах:

```tsx
// Было
<LazyImage 
  src="/images/product.jpg" 
  alt="Букет цветов" 
  aspectRatio={1.5}
  objectFit="cover"
  className="product-image"
/>

// Стало
<LazyImage 
  src="/images/product.jpg" 
  alt="Букет цветов" 
  aspectRatio={1.5}
  objectFit="cover"
  className="product-image"
  width={500}  // Указываем базовую ширину
  height={333} // Можно рассчитать из aspectRatio или указать явно
/>
```

> **Важно**: Компонент `Image` в Next.js требует, чтобы размеры изображения были известны заранее. Используйте свойства `width` и `height` или свойство `fill` вместе с контейнером, имеющим явные размеры.

#### 15.1.6. Обработка статических импортов изображений:

```tsx
// В Next.js можно импортировать изображения как модули
import productImage from '@/public/images/product.jpg';

// И использовать в компоненте LazyImage
<LazyImage 
  src={productImage} // Передаем объект StaticImageData
  alt="Букет цветов" 
  // Размеры автоматически извлекаются из метаданных изображения
  priority={true} // Для LCP изображений
/>
```

Этот подход сохраняет все ключевые функции оригинального компонента `LazyImage`, включая:
- Отложенную загрузку изображений
- Отображение скелетона во время загрузки
- Обработку ошибок с автоматическим использованием fallback-изображения
- Сохранение соотношения сторон
- Сброс состояния при изменении источника

При этом добавляются преимущества Next.js Image:
- Автоматическая оптимизация изображений
- Преобразование форматов (WebP, AVIF)
- Изменение размеров под разные устройства
- Улучшенная производительность загрузки

### 15.2. Миграция компонента Skeleton

Компонент `Skeleton` используется для отображения состояния загрузки и предотвращения "скачков" интерфейса. При миграции важно сохранить его дизайн, пропорции и анимацию.

#### 15.2.1. Исходная реализация Skeleton:

```tsx
// src/components/common/Skeleton.tsx в оригинальном проекте
import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '1rem',
  borderRadius = '4px',
  className = ''
}) => {
  // Преобразуем числовые значения в пиксели
  const widthValue = typeof width === 'number' ? `${width}px` : width;
  const heightValue = typeof height === 'number' ? `${height}px` : height;
  const radiusValue = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;
  
  return (
    <div
      className={`skeleton-loading ${className}`}
      style={{
        width: widthValue,
        height: heightValue,
        borderRadius: radiusValue
      }}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
```

#### 15.2.2. Новая реализация с сохранением функциональности в Next.js:

```tsx
// src/components/common/Skeleton.tsx в проекте Next.js
'use client';

import { SkeletonProps } from '@/types/skeleton';

const Skeleton = ({
  width = '100%',
  height = '1rem',
  borderRadius = '4px',
  className = ''
}: SkeletonProps) => {
  // Преобразуем числовые значения в пиксели
  const widthValue = typeof width === 'number' ? `${width}px` : width;
  const heightValue = typeof height === 'number' ? `${height}px` : height;
  const radiusValue = typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius;
  
  return (
    <div
      className={`skeleton-loading ${className}`}
      style={{
        width: widthValue,
        height: heightValue,
        borderRadius: radiusValue
      }}
      aria-hidden="true"
    />
  );
};

export default Skeleton;
```

#### 15.2.3. Определение типов для Skeleton:

```typescript
// src/types/skeleton.ts
export interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
}
```

#### 15.2.4. CSS стили для анимации Skeleton:

Создайте файл `src/styles/components/Skeleton.css`:

```css
@keyframes skeleton-pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.6;
  }
}

.skeleton-loading {
  background: var(--color-skeleton-background, #f0f0f0);
  animation: skeleton-pulse 1.5s ease-in-out infinite;
  will-change: opacity;
  /* Градиент для более современного вида */
  background-image: linear-gradient(
    90deg,
    var(--color-skeleton-background, #f0f0f0) 0%,
    var(--color-skeleton-highlight, #f8f8f8) 50%,
    var(--color-skeleton-background, #f0f0f0) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-pulse 1.5s ease-in-out infinite;
}

/* Темная тема */
[data-theme="dark"] .skeleton-loading {
  --color-skeleton-background: #2a2a2a;
  --color-skeleton-highlight: #3a3a3a;
}
```

#### 15.2.5. Импорт стилей в глобальный CSS:

Добавьте импорт в ваш глобальный файл стилей `src/styles/globals.css`:

```css
@import './components/Skeleton.css';
```

#### 15.2.6. Использование Skeleton в новом проекте:

```tsx
// Примеры использования
<Skeleton width="80%" height="24px" />
<Skeleton width={120} height={120} borderRadius="50%" className="avatar-skeleton" />
```

#### 15.2.7. Создание вариаций скелетонов для часто используемых компонентов:

```tsx
// src/components/common/SkeletonProductCard.tsx
'use client';

import Skeleton from './Skeleton';

const SkeletonProductCard = () => {
  return (
    <div className="product-card skeleton-card">
      <Skeleton height="240px" className="product-card__image-skeleton" />
      <div className="product-card__content">
        <Skeleton width="80%" height="24px" className="product-card__title-skeleton" />
        <Skeleton width="50%" height="18px" className="product-card__price-skeleton" />
        <Skeleton width="100%" height="40px" className="product-card__button-skeleton" />
      </div>
    </div>
  );
};

export default SkeletonProductCard;
```

#### 15.2.8. Добавление кастомного хука для пакетной загрузки:

```tsx
// src/hooks/useSkeleton.ts
'use client';

import { useState, useEffect } from 'react';

interface UseSkeletonOptions {
  count?: number;
  delay?: number;
  staggered?: boolean;
}

export function useSkeleton({
  count = 1,
  delay = 0,
  staggered = false
}: UseSkeletonOptions = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  
  useEffect(() => {
    // Начальная задержка перед отображением скелетонов
    const mainTimer = setTimeout(() => {
      if (!staggered) {
        // Показать все элементы одновременно
        setIsLoading(false);
      } else {
        // Постепенно показывать элементы
        let loaded = 0;
        const interval = setInterval(() => {
          loaded++;
          setVisibleItems(prev => [...prev, loaded]);
          
          if (loaded >= count) {
            clearInterval(interval);
            setIsLoading(false);
          }
        }, 150); // Интервал между появлением элементов
        
        return () => clearInterval(interval);
      }
    }, delay);
    
    return () => clearTimeout(mainTimer);
  }, [count, delay, staggered]);
  
  const isItemVisible = (index: number) => {
    if (!staggered) return !isLoading;
    return visibleItems.includes(index + 1);
  };
  
  return { isLoading, isItemVisible };
}
```

#### 15.2.9. Использование с хуком для пакетной загрузки:

```tsx
// Пример использования
const ProductGrid = ({ products }) => {
  const { isLoading, isItemVisible } = useSkeleton({ 
    count: products.length, 
    delay: 300, 
    staggered: true 
  });
  
  return (
    <div className="product-grid">
      {products.map((product, index) => (
        <div key={product.id}>
          {isLoading && !isItemVisible(index) ? (
            <SkeletonProductCard />
          ) : (
            <ProductCard product={product} />
          )}
        </div>
      ))}
    </div>
  );
};
```

#### 15.2.10. Использование в SSR контексте:

```tsx
// src/app/catalog/page.tsx
import { Suspense } from 'react';
import ProductList from '@/components/catalog/ProductList';
import SkeletonProductCard from '@/components/common/SkeletonProductCard';

export default function CatalogPage() {
  return (
    <div className="catalog-page">
      <h1>Каталог букетов</h1>
      
      <Suspense fallback={
        <div className="product-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonProductCard key={i} />
          ))}
        </div>
      }>
        <ProductList />
      </Suspense>
    </div>
  );
}
```

Этот подход миграции Skeleton обеспечивает:
- Сохранение всех функций оригинального компонента
- Адаптацию для архитектуры Next.js с разделением клиентского и серверного рендеринга
- Улучшенные анимации с использованием CSS-переменных для поддержки темной темы
- Дополнительные утилиты для более удобного использования скелетонов в различных сценариях
- Поддержку постепенного появления элементов для улучшения пользовательского опыта 

### 15.3. Миграция компонента Modal

Компонент `Modal` используется для отображения модальных окон и требует особой адаптации при переходе на Next.js, учитывая особенности работы с порталами и серверного рендеринга.

#### 15.3.1. Исходная реализация Modal:

```tsx
// src/components/common/Modal.tsx в оригинальном проекте
import React, { useCallback, useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Skeleton from './Skeleton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  isLoading?: boolean;
  skeletonConfig?: {
    count?: number;
    height?: string | number;
    spacing?: string | number;
  };
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  isLoading = false,
  skeletonConfig = {}
}) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const { count = 3, height = '2rem', spacing = '1rem' } = skeletonConfig;
  
  // Обработка ESC для закрытия модального окна
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);
  
  // Анимация открытия
  useEffect(() => {
    if (isOpen) {
      // Блокировка прокрутки при открытии модального окна
      document.body.style.overflow = 'hidden';
      
      // Показать контент с задержкой для анимации
      setTimeout(() => {
        setIsContentVisible(true);
      }, 50);
    } else {
      // Восстановление прокрутки при закрытии
      document.body.style.overflow = '';
      setIsContentVisible(false);
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Обработчик клика вне модального окна
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && isOpen) {
        handleClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);
  
  // Обработчик закрытия с анимацией
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setIsContentVisible(false);
    
    // Задержка для завершения анимации
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  }, [onClose]);
  
  // Не рендерим ничего, если модальное окно закрыто и не анимируется
  if (!isOpen && !isClosing) return null;
  
  // Создаем модальное окно через портал
  return createPortal(
    <div className={`modal-overlay ${isClosing ? 'modal-closing' : ''}`}>
      <div 
        className={`modal ${isContentVisible ? 'modal-content-visible' : ''}`}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {title && (
          <div className="modal-header">
            <h2 id="modal-title" className="modal-title">{title}</h2>
            <button 
              className="modal-close-button" 
              onClick={handleClose}
              aria-label="Закрыть"
            >
              ×
            </button>
          </div>
        )}
        
        <div className="modal-body">
          {isLoading ? (
            <div className="modal-skeleton">
              {Array.from({ length: count }).map((_, index) => (
                <Skeleton 
                  key={index}
                  height={height}
                  className="modal-skeleton-item"
                  style={{ marginBottom: spacing }}
                />
              ))}
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
```

#### 15.3.2. Новая реализация Modal в Next.js:

```tsx
// src/components/common/Modal.tsx в проекте Next.js
'use client';

import { useCallback, useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Skeleton from './Skeleton';
import { ModalProps } from '@/types/modal';

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  isLoading = false,
  skeletonConfig = {}
}: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  const { count = 3, height = '2rem', spacing = '1rem' } = skeletonConfig;
  
  // Проверка, что компонент смонтирован (необходимо для SSR)
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
  
  // Обработка ESC для закрытия модального окна
  useEffect(() => {
    if (!isMounted) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isMounted]);
  
  // Анимация открытия
  useEffect(() => {
    if (!isMounted) return;
    
    if (isOpen) {
      // Блокировка прокрутки при открытии модального окна
      document.body.style.overflow = 'hidden';
      
      // Показать контент с задержкой для анимации
      const timer = setTimeout(() => {
        setIsContentVisible(true);
      }, 50);
      
      return () => clearTimeout(timer);
    } else {
      // Восстановление прокрутки при закрытии
      document.body.style.overflow = '';
      setIsContentVisible(false);
    }
    
    return () => {
      if (isMounted) document.body.style.overflow = '';
    };
  }, [isOpen, isMounted]);
  
  // Обработчик клика вне модального окна
  useEffect(() => {
    if (!isMounted) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node) && isOpen) {
        handleClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, isMounted]);
  
  // Обработчик закрытия с анимацией
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setIsContentVisible(false);
    
    // Задержка для завершения анимации
    const timer = setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  // Не рендерим ничего, если:
  // 1. Компонент не смонтирован (SSR)
  // 2. Модальное окно закрыто и не анимируется
  if (!isMounted || (!isOpen && !isClosing)) return null;
  
  // Создаем модальное окно через портал
  return createPortal(
    <div 
      className={`modal-overlay ${isContentVisible ? 'visible' : ''} ${isClosing ? 'modal-closing' : ''}`}
      data-theme="light" // Для возможности переопределения темы в модальном окне
    >
      <div 
        className={`modal ${isContentVisible ? 'modal-content-visible' : ''}`}
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {title && (
          <div className="modal-header">
            <h2 id="modal-title" className="modal-title">{title}</h2>
            <button 
              className="modal-close-button" 
              onClick={handleClose}
              aria-label="Закрыть"
            >
              ×
            </button>
          </div>
        )}
        
        <div className="modal-body">
          {isLoading ? (
            <div className="modal-skeleton">
              {Array.from({ length: count }).map((_, index) => (
                <Skeleton 
                  key={index}
                  height={height}
                  className="modal-skeleton-item"
                  style={{ marginBottom: typeof spacing === 'number' ? `${spacing}px` : spacing }}
                />
              ))}
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
```

#### 15.3.3. Определение типов для Modal:

```typescript
// src/types/modal.ts
import { ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  isLoading?: boolean;
  skeletonConfig?: {
    count?: number;
    height?: string | number;
    spacing?: string | number;
  };
}
```

#### 15.3.4. CSS стили для Modal:

Создайте файл `src/styles/components/Modal.css`:

```css
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.modal-overlay.visible {
  opacity: 1;
}

.modal-overlay.modal-closing {
  opacity: 0;
}

.modal {
  background-color: var(--color-background, #ffffff);
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
  transform: translateY(20px);
  transition: transform 0.3s ease;
}

.modal-content-visible {
  transform: translateY(0);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-border, #e0e0e0);
}

.modal-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text, #333333);
}

.modal-close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  color: var(--color-text-secondary, #666666);
  cursor: pointer;
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.modal-close-button:hover {
  color: var(--color-text, #333333);
}

.modal-body {
  padding: 1.5rem;
}

.modal-skeleton {
  display: flex;
  flex-direction: column;
}

.modal-skeleton-item:last-child {
  margin-bottom: 0 !important;
}

/* Темная тема */
[data-theme="dark"] .modal {
  --color-background: #1f1f1f;
  --color-text: #f0f0f0;
  --color-text-secondary: #b0b0b0;
  --color-border: #333333;
}
```

#### 15.3.5. Импорт стилей в глобальный CSS:

Добавьте импорт в ваш глобальный файл стилей `src/styles/globals.css`:

```css
@import './components/Modal.css';
```

#### 15.3.6. Создание кастомного хука для упрощения работы с модальными окнами:

```typescript
// src/hooks/useModal.ts
'use client';

import { useState, useCallback } from 'react';

export function useModal(initialState = false) {
  const [isOpen, setIsOpen] = useState(initialState);
  
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const toggleModal = useCallback(() => setIsOpen(prev => !prev), []);
  
  return {
    isOpen,
    openModal,
    closeModal,
    toggleModal
  };
}
```

#### 15.3.7. Создание хука для кастомных модальных окон:

```typescript
// src/hooks/useModalWithData.ts
'use client';

import { useState, useCallback } from 'react';

export function useModalWithData<T>(initialData?: T) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<T | undefined>(initialData);
  
  const openModal = useCallback((modalData?: T) => {
    if (modalData) setData(modalData);
    setIsOpen(true);
  }, []);
  
  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Опционально: очистка данных при закрытии
    // setData(undefined);
  }, []);
  
  return {
    isOpen,
    data,
    openModal,
    closeModal
  };
}
```

#### 15.3.8. Пример использования модального окна с динамическими данными:

```tsx
// Пример использования
import { useModalWithData } from '@/hooks/useModalWithData';
import Modal from '@/components/common/Modal';
import { Product } from '@/types/product';

const ProductQuickView = () => {
  const { isOpen, data: product, openModal, closeModal } = useModalWithData<Product>();
  
  return (
    <>
      {/* Кнопки для открытия модального окна с разными товарами */}
      <button onClick={() => openModal({ id: '1', name: 'Букет "Весенний"', /* ... */ })}>
        Быстрый просмотр 1
      </button>
      
      <button onClick={() => openModal({ id: '2', name: 'Букет "Летний"', /* ... */ })}>
        Быстрый просмотр 2
      </button>
      
      {/* Модальное окно с детальной информацией о товаре */}
      <Modal 
        isOpen={isOpen} 
        onClose={closeModal}
        title={product?.name}
      >
        {product && (
          <div className="product-quick-view">
            <img src={product.image} alt={product.name} />
            <p className="product-price">{product.price} ₽</p>
            <p className="product-description">{product.description}</p>
            <button className="button">Добавить в корзину</button>
          </div>
        )}
      </Modal>
    </>
  );
};
```

#### 15.3.9. Использование с сервер-компонентами Next.js:

Создайте промежуточный клиентский компонент:

```tsx
// src/components/common/ClientModalWrapper.tsx
'use client';

import { useState } from 'react';
import Modal from './Modal';

interface ClientModalWrapperProps {
  buttonText: string;
  title?: string;
  children: React.ReactNode;
}

export default function ClientModalWrapper({
  buttonText,
  title,
  children
}: ClientModalWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <button 
        className="button" 
        onClick={() => setIsOpen(true)}
      >
        {buttonText}
      </button>
      
      <Modal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)}
        title={title}
      >
        {children}
      </Modal>
    </>
  );
}
```

Использование в серверном компоненте:

```tsx
// src/app/some-page/page.tsx (Серверный компонент)
import ClientModalWrapper from '@/components/common/ClientModalWrapper';
import ContactForm from '@/components/forms/ContactForm'; // Клиентский компонент

export default function SomePage() {
  return (
    <main>
      <h1>Страница с модальным окном</h1>
      
      <ClientModalWrapper
        buttonText="Связаться с нами"
        title="Форма обратной связи"
      >
        <ContactForm />
      </ClientModalWrapper>
    </main>
  );
}
```

#### 15.3.10. Обработка модальных окон в маршрутизации:

Если вы хотите отражать состояние модального окна в URL (для возможности поделиться ссылкой или вернуться к нему), используйте хук с параметрами URL:

```tsx
// src/hooks/useModalFromUrl.ts
'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useCallback } from 'react';

export function useModalFromUrl(paramName: string = 'modal') {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const isOpen = searchParams?.get(paramName) === 'true';
  
  // Открытие модального окна через URL
  const openModal = useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString());
    params.set(paramName, 'true');
    router.push(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams, paramName]);
  
  // Закрытие модального окна через URL
  const closeModal = useCallback(() => {
    const params = new URLSearchParams(searchParams?.toString());
    params.delete(paramName);
    router.push(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams, paramName]);
  
  // Эффект для обработки навигации браузера
  useEffect(() => {
    const handlePopState = () => {
      // URL изменился (например, нажата кнопка "назад")
      // Обрабатываем состояние модального окна автоматически
      // через параметры URL
    };
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  return { isOpen, openModal, closeModal };
}
```

#### 15.3.11. Использование с параметрами URL:

```tsx
// Использование модального окна с отражением состояния в URL
import { useModalFromUrl } from '@/hooks/useModalFromUrl';
import Modal from '@/components/common/Modal';

const UrlBasedModal = () => {
  const { isOpen, openModal, closeModal } = useModalFromUrl('subscribe');
  
  return (
    <>
      <button onClick={openModal}>Подписаться на рассылку</button>
      
      <Modal isOpen={isOpen} onClose={closeModal} title="Подписка на рассылку">
        <form>
          <input type="email" placeholder="Ваш email" />
          <button type="submit">Подписаться</button>
        </form>
      </Modal>
    </>
  );
};
```

Эта модификация компонента Modal для Next.js обеспечивает:
- Совместимость с SSR через проверку монтирования компонента
- Корректную работу порталов в контексте Next.js
- Плавные анимации открытия и закрытия
- Улучшенную доступность (ARIA атрибуты, фокус, ESC для закрытия)
- Управление прокруткой страницы
- Интеграцию с маршрутизацией Next.js
- Дополнительные хуки для удобной работы с модальными окнами

Этот подход миграции Skeleton обеспечивает:
- Сохранение всех функций оригинального компонента
- Адаптацию для архитектуры Next.js с разделением клиентского и серверного рендеринга
- Улучшенные анимации с использованием CSS-переменных для поддержки темной темы
- Дополнительные утилиты для более удобного использования скелетонов в различных сценариях
- Поддержку постепенного появления элементов для улучшения пользовательского опыта 

### 15.4. Миграция компонента Icon

Компонент `Icon` является фундаментальной частью дизайн-системы BAZAAR, предоставляя унифицированный способ использования SVG-иконок. При миграции на Next.js необходимо сохранить всю функциональность и обеспечить совместимость как с серверными, так и с клиентскими компонентами.

#### 15.4.1. Исходная реализация Icon:

```tsx
// src/components/common/Icon.tsx в оригинальном проекте
import React from 'react';

// SVG-иконки как встроенные компоненты
import { ReactComponent as TelegramIcon } from '../../images/icons/telegram.svg';
import { ReactComponent as WhatsappIcon } from '../../images/icons/whatsapp.svg';
import { ReactComponent as InstagramIcon } from '../../images/icons/instagram.svg';
import { ReactComponent as SunIcon } from '../../images/icons/sun.svg';
import { ReactComponent as MoonIcon } from '../../images/icons/moon.svg';
import { ReactComponent as CartIcon } from '../../images/icons/cart.svg';
import { ReactComponent as ProfileIcon } from '../../images/icons/profile.svg';
import { ReactComponent as LocationIcon } from '../../images/icons/location.svg';
import { ReactComponent as ClockIcon } from '../../images/icons/clock.svg';
import { ReactComponent as PhoneIcon } from '../../images/icons/phone.svg';
import { ReactComponent as CheckIcon } from '../../images/icons/check.svg';
import { ReactComponent as TruckIcon } from '../../images/icons/truck.svg';
import { ReactComponent as StoreIcon } from '../../images/icons/store.svg';
import { ReactComponent as LightningIcon } from '../../images/icons/lightning.svg';
import { ReactComponent as LeafIcon } from '../../images/icons/leaf.svg';
import { ReactComponent as DiamondIcon } from '../../images/icons/diamond.svg';
import { ReactComponent as HeartIcon } from '../../images/icons/heart.svg';
import { ReactComponent as HandshakeIcon } from '../../images/icons/handshake.svg';
import { ReactComponent as SearchIcon } from '../../images/icons/search.svg';

interface IconProps {
  name: 'telegram' | 'whatsapp' | 'instagram' | 'sun' | 'moon' | 'cart' | 'profile' | 
        'location' | 'clock' | 'phone' | 'check' | 'truck' | 'store' | 'lightning' |
        'leaf' | 'diamond' | 'heart' | 'handshake' | 'search';
  size?: number;
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({ 
  name, 
  size = 24, 
  color = 'currentColor', 
  className = '' 
}) => {
  const iconProps = {
    width: size,
    height: size,
    fill: color,
    className: `icon icon-${name} ${className}`,
    'aria-hidden': 'true'
  };
  
  // Выбор компонента SVG на основе имени
  switch (name) {
    case 'telegram': return <TelegramIcon {...iconProps} />;
    case 'whatsapp': return <WhatsappIcon {...iconProps} />;
    case 'instagram': return <InstagramIcon {...iconProps} />;
    case 'sun': return <SunIcon {...iconProps} />;
    case 'moon': return <MoonIcon {...iconProps} />;
    case 'cart': return <CartIcon {...iconProps} />;
    case 'profile': return <ProfileIcon {...iconProps} />;
    case 'location': return <LocationIcon {...iconProps} />;
    case 'clock': return <ClockIcon {...iconProps} />;
    case 'phone': return <PhoneIcon {...iconProps} />;
    case 'check': return <CheckIcon {...iconProps} />;
    case 'truck': return <TruckIcon {...iconProps} />;
    case 'store': return <StoreIcon {...iconProps} />;
    case 'lightning': return <LightningIcon {...iconProps} />;
    case 'leaf': return <LeafIcon {...iconProps} />;
    case 'diamond': return <DiamondIcon {...iconProps} />;
    case 'heart': return <HeartIcon {...iconProps} />;
    case 'handshake': return <HandshakeIcon {...iconProps} />;
    case 'search': return <SearchIcon {...iconProps} />;
    default: return null;
  }
};

export default Icon;
```

#### 15.4.2. Подготовка SVG-иконок для Next.js:

Next.js не поддерживает `ReactComponent as` синтаксис напрямую. Нужно настроить обработку SVG файлов с помощью SVGR:

1. Установите SVGR для Next.js:

```bash
npm install --save-dev @svgr/webpack
```

2. Настройте обработку SVG в `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  // ... другие настройки
  webpack(config) {
    // Конфигурация для обработки SVG как React компонентов
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });
    
    return config;
  },
};

module.exports = nextConfig;
```

#### 15.4.3. Новая структура директории для иконок:

В Next.js рекомендуется использовать отдельную директорию для иконок:

```
src/
└── icons/
    ├── index.ts          # Экспорт всех иконок
    ├── social/           # Социальные иконки
    │   ├── Telegram.tsx
    │   ├── Whatsapp.tsx
    │   └── Instagram.tsx
    ├── interface/        # Интерфейсные иконки
    │   ├── Sun.tsx
    │   ├── Moon.tsx
    │   ├── Cart.tsx
    │   └── ...
    └── ...
```

#### 15.4.4. Новая реализация Icon в Next.js:

```tsx
// src/components/common/Icon.tsx в проекте Next.js

import { IconProps } from '@/types/icon';

// Импорт SVG-компонентов
import TelegramIcon from '@/icons/social/Telegram';
import WhatsappIcon from '@/icons/social/Whatsapp';
import InstagramIcon from '@/icons/social/Instagram';
import SunIcon from '@/icons/interface/Sun';
import MoonIcon from '@/icons/interface/Moon';
import CartIcon from '@/icons/interface/Cart';
import ProfileIcon from '@/icons/interface/Profile';
import LocationIcon from '@/icons/interface/Location';
import ClockIcon from '@/icons/interface/Clock';
import PhoneIcon from '@/icons/interface/Phone';
import CheckIcon from '@/icons/interface/Check';
import TruckIcon from '@/icons/interface/Truck';
import StoreIcon from '@/icons/interface/Store';
import LightningIcon from '@/icons/interface/Lightning';
import LeafIcon from '@/icons/interface/Leaf';
import DiamondIcon from '@/icons/interface/Diamond';
import HeartIcon from '@/icons/interface/Heart';
import HandshakeIcon from '@/icons/interface/Handshake';
import SearchIcon from '@/icons/interface/Search';

// Карта соответствия имен и компонентов
const iconMap = {
  telegram: TelegramIcon,
  whatsapp: WhatsappIcon,
  instagram: InstagramIcon,
  sun: SunIcon,
  moon: MoonIcon,
  cart: CartIcon,
  profile: ProfileIcon,
  location: LocationIcon,
  clock: ClockIcon,
  phone: PhoneIcon,
  check: CheckIcon,
  truck: TruckIcon,
  store: StoreIcon,
  lightning: LightningIcon,
  leaf: LeafIcon,
  diamond: DiamondIcon,
  heart: HeartIcon,
  handshake: HandshakeIcon,
  search: SearchIcon
};

const Icon = ({ 
  name, 
  size = 24, 
  color = 'currentColor', 
  className = '' 
}: IconProps) => {
  // Получаем компонент по имени
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  const iconProps = {
    width: size,
    height: size,
    fill: color,
    className: `icon icon-${name} ${className}`,
    'aria-hidden': 'true'
  };
  
  return <IconComponent {...iconProps} />;
};

export default Icon;
```

#### 15.4.5. Определение типов для Icon:

```typescript
// src/types/icon.ts
export type IconName = 
  | 'telegram' 
  | 'whatsapp' 
  | 'instagram' 
  | 'sun' 
  | 'moon' 
  | 'cart' 
  | 'profile' 
  | 'location' 
  | 'clock' 
  | 'phone' 
  | 'check' 
  | 'truck' 
  | 'store' 
  | 'lightning' 
  | 'leaf' 
  | 'diamond' 
  | 'heart' 
  | 'handshake' 
  | 'search';

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}

// Базовые свойства для SVG-компонентов
export interface SVGComponentProps {
  width?: number | string;
  height?: number | string;
  fill?: string;
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
}
```

#### 15.4.6. Пример SVG-компонента иконки:

```tsx
// src/icons/social/Telegram.tsx
import { SVGComponentProps } from '@/types/icon';

const Telegram = (props: SVGComponentProps) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24"
    {...props}
  >
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.14 19.018c-.237 0-.23-.094-.327-.332l-.816-2.692.8-.4 1.68-8.56c.067-.31.25-.338.412-.338s.315.036.42.338c.1.287 1.14 5.44 1.153 5.537.013.096.9.3.9.45-.083 0-.15.004-.195.014-.15.034-.416.34-.485.408-.07.07-1.46 1.285-1.46 1.285l-.362 3.112c-.096.238-.156.178-.394.178z" />
  </svg>
);

export default Telegram;
```

#### 15.4.7. Создание индексного файла для иконок:

```typescript
// src/icons/index.ts
export { default as TelegramIcon } from './social/Telegram';
export { default as WhatsappIcon } from './social/Whatsapp';
export { default as InstagramIcon } from './social/Instagram';
// ...дополнительные экспорты
```

#### 15.4.8. Созданиие высокоуровневых компонентов для иконок:

```tsx
// src/components/common/SocialIcon.tsx
import Icon from './Icon';
import { IconProps } from '@/types/icon';

type SocialNetwork = 'telegram' | 'whatsapp' | 'instagram';

interface SocialIconProps extends Omit<IconProps, 'name'> {
  network: SocialNetwork;
}

const SocialIcon = ({ network, ...props }: SocialIconProps) => {
  return <Icon name={network} {...props} />;
};

export default SocialIcon;
```

#### 15.4.9. Альтернативная реализация с импортом всех SVG:

Если у вас много иконок или вы предпочитаете более автоматизированный подход:

```tsx
// src/components/common/IconAlt.tsx
import { IconProps } from '@/types/icon';
import dynamic from 'next/dynamic';

const Icon = ({ name, size = 24, color = 'currentColor', className = '' }: IconProps) => {
  // Динамический импорт SVG-компонента
  const IconComponent = dynamic(() => import(`@/icons/${name}.svg`), {
    loading: () => <span className="icon-loading" style={{ width: size, height: size }} />,
    ssr: false // Отключаем SSR для динамически импортированных иконок
  });
  
  return (
    <IconComponent
      width={size}
      height={size}
      fill={color}
      className={`icon icon-${name} ${className}`}
      aria-hidden="true"
    />
  );
};

export default Icon;
```

#### 15.4.10. CSS для иконок:

Создайте файл `src/styles/components/Icon.css`:

```css
.icon {
  display: inline-block;
  vertical-align: middle;
  transition: transform 0.2s ease, color 0.2s ease;
}

/* Стили для разных типов иконок */
.icon-social {
  border-radius: 50%;
}

.icon-interactive {
  cursor: pointer;
}

.icon-interactive:hover {
  transform: scale(1.1);
}

/* Состояния иконок */
.icon-active {
  color: var(--color-primary, #D4A977);
}

/* Анимация загрузки иконок */
.icon-loading {
  display: inline-block;
  background-color: var(--color-skeleton-background, #f0f0f0);
  border-radius: 4px;
}
```

#### 15.4.11. Импорт стилей в глобальный CSS:

Добавьте импорт в ваш глобальный файл стилей `src/styles/globals.css`:

```css
@import './components/Icon.css';
```

#### 15.4.12. Использование Icon в проекте:

```tsx
// Базовое использование
<Icon name="cart" />

// С кастомизацией
<Icon 
  name="heart" 
  size={32} 
  color="#D4A977" 
  className="icon-interactive" 
/>

// В кнопке переключения темы
<button 
  className="theme-toggle-button" 
  onClick={toggleTheme}
  aria-label={isDarkTheme ? "Переключить на светлую тему" : "Переключить на темную тему"}
>
  <Icon name={isDarkTheme ? "sun" : "moon"} size={20} />
</button>
```

#### 15.4.13. Использование с Server Components:

Если компонент `Icon` используется в серверных компонентах, убедитесь, что иконки доступны для SSR:

```tsx
// src/app/page.tsx (Server Component)
import Icon from '@/components/common/Icon';

export default function HomePage() {
  return (
    <main>
      <h1>
        Добро пожаловать в BAZAAR
        <Icon name="flower" size={32} />
      </h1>
      {/* ... */}
    </main>
  );
}
```

#### 15.4.14. Оптимизация для SSR:

Иногда может потребоваться оптимизация для работы с большим количеством иконок в SSR. В этом случае можно создать отдельный компонент:

```tsx
// src/components/common/ServerIcon.tsx
import { IconName } from '@/types/icon';
import * as Icons from '@/icons'; // Импорт всех иконок из индексного файла

interface ServerIconProps {
  name: IconName;
  size?: number;
  color?: string;
  className?: string;
}

const ServerIcon = ({ 
  name, 
  size = 24, 
  color = 'currentColor', 
  className = '' 
}: ServerIconProps) => {
  // Тип для соответствия имен и компонентов
  type IconsMap = {
    [key in IconName]: React.ComponentType<any>;
  };
  
  // Приведение типа для корректной работы с объектом Icons
  const iconMap = Icons as unknown as IconsMap;
  const IconComponent = iconMap[name];
  
  if (!IconComponent) {
    return null;
  }
  
  return (
    <IconComponent 
      width={size} 
      height={size} 
      fill={color} 
      className={`icon icon-${name} ${className}`}
      aria-hidden="true"
    />
  );
};

export default ServerIcon;
```

#### 15.4.15. Использование иконок в формах:

```tsx
// src/components/forms/SearchField.tsx
'use client';

import { useState } from 'react';
import Icon from '@/components/common/Icon';

interface SearchFieldProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

const SearchField = ({ 
  placeholder = 'Поиск...', 
  onSearch, 
  className = '' 
}: SearchFieldProps) => {
  const [query, setQuery] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };
  
  return (
    <form className={`search-form ${className}`} onSubmit={handleSubmit}>
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Поисковый запрос"
        />
        <button 
          type="submit" 
          className="search-button"
          aria-label="Искать"
        >
          <Icon name="search" size={18} />
        </button>
      </div>
    </form>
  );
};

export default SearchField;
```

Этот подход к миграции компонента Icon обеспечивает:
- Сохранение функциональности исходного компонента
- Совместимость с архитектурой Next.js и SSR
- Оптимизацию загрузки иконок
- Категоризацию и систематизацию иконок по типам
- Доступность для пользователей скринридеров
- Расширяемость для добавления новых иконок
- Централизованный контроль над стилями и поведением иконок