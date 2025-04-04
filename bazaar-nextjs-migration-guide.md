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
21. [Миграция страниц проекта](#21-миграция-страниц-проекта)
22. [Миграция компонентов общего интерфейса](#22-миграция-компонентов-общего-интерфейса)
23. [Миграция общих компонентов (common components)](#23-миграция-общих-компонентов-common-components)
24. [Миграция компонентов каталога и корзины](#24-миграция-компонентов-каталога-и-корзины)
25. [Миграция компонентов магазинов и геолокации](#25-миграция-компонентов-магазинов-и-геолокации)
26. [Миграция форм и валидации](#26-миграция-форм-и-валидации)
27. [Заключительные рекомендации](#27-заключительные-рекомендации)
28. [Миграция стилей и CSS-файлов](#28-миграция-стилей-и-css-файлов)
29. [Миграция вспомогательных утилит и дополнительных файлов](#29-миграция-вспомогательных-утилит-и-дополнительных-файлов)
30. [Заключение и итоговая проверка миграции](#30-заключение-и-итоговая-проверка-миграции)

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

## 21. Миграция страниц проекта

Этот раздел содержит подробные инструкции по миграции каждой страницы из оригинального проекта BAZAAR в новую структуру Next.js App Router. В отличие от Pages Router, App Router использует файловую систему для определения маршрутов, где каждый route представлен директорией, а содержимое страницы находится в файле `page.tsx`.

### 21.1. Общие принципы миграции страниц

При миграции страниц из исходного проекта на Next.js следуйте следующим принципам:

1. **Структура маршрутов**: 
   - Создайте соответствующую директорию для каждого маршрута в папке `app/`
   - Для динамических маршрутов используйте синтаксис `[param]` в имени директории

2. **Разделение серверных и клиентских компонентов**:
   - Страницы (файлы `page.tsx`) могут быть серверными компонентами по умолчанию
   - Выделите интерактивные части в отдельные клиентские компоненты с директивой `'use client'`

3. **Загрузка данных**:
   - Используйте серверные компоненты для загрузки данных без необходимости в useEffect/useState
   - Обращение к API может происходить напрямую на сервере без раскрытия деталей клиенту

4. **Метаданные**:
   - Определите метаданные страницы (title, description) с помощью экспорта объекта `metadata` или функции `generateMetadata`

5. **Общие элементы для всех страниц**:
   - Разместите общие элементы (Header, Footer) в `app/layout.tsx`

Далее следуют инструкции для каждой конкретной страницы проекта.

### 21.2. Миграция HomePage.tsx

Исходный компонент `HomePage` отображает главную страницу сайта и включает следующие секции:
- Hero-секцию с заголовком и подзаголовком
- Блок популярных товаров
- Секцию коллекций по цене
- Информацию о доставке и преимуществах

При миграции на Next.js необходимо:

1. **Создать структуру директорий**:
```bash
mkdir -p src/app/(main)
touch src/app/(main)/page.tsx
touch src/app/(main)/loading.tsx
```

2. **Реализация компонента страницы**:
```tsx
// src/app/(main)/page.tsx
import { Metadata } from 'next';
import { ProductsList, Collections, DeliveryInfo } from '@/components';

export const metadata: Metadata = {
  title: 'BAZAAR - Магазин цветов в Иркутске',
  description: 'Свежие цветы и оригинальные букеты с доставкой по Иркутску',
};

// Функция для загрузки данных на сервере
async function getHomePageData() {
  // В Next.js можно выполнять асинхронные запросы непосредственно в компоненте
  // без хуков useEffect и useState
  const products = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products?featured=true`).then(r => r.json());
  return { products };
}

export default async function HomePage() {
  const { products } = await getHomePageData();

  return (
    <main className="home-page">
      <section className="hero">
        <div className="container">
          <h1 className="hero__title">Свежие цветы и оригинальные букеты</h1>
          <p className="hero__subtitle">
            Доставка по Иркутску в день заказа
          </p>
          <a href="/catalog" className="button button--primary hero__button">
            Перейти в каталог
          </a>
        </div>
      </section>

      <section className="featured-products">
        <div className="container">
          <h2 className="featured-products__title">Популярные букеты</h2>
          <ProductsList products={products} />
        </div>
      </section>

      <Collections products={products} />
      <DeliveryInfo />
    </main>
  );
}
```

3. **Создать компонент загрузки**:
```tsx
// src/app/(main)/loading.tsx
import { PageSkeleton } from '@/components/common';

export default function Loading() {
  return <PageSkeleton />;
}
```

4. **Преобразование компонентов в клиентские при необходимости**:
   - Если компоненты как ProductsList, Collections требуют интерактивности, добавьте директиву `'use client'` в их файлы

### 21.3. Миграция CatalogPage.tsx

Страница каталога отображает список товаров с фильтрацией и сортировкой. В Next.js потребуется:

1. **Создать структуру директорий**:
```bash
mkdir -p src/app/catalog
touch src/app/catalog/page.tsx
touch src/app/catalog/loading.tsx
```

2. **Реализация страницы каталога**:
```tsx
// src/app/catalog/page.tsx
import { Metadata } from 'next';
import { Filters } from '@/components/catalog/Filters';
import { ProductsList } from '@/components/catalog/ProductsList';
import { Sorter } from '@/components/catalog/Sorter';

export const metadata: Metadata = {
  title: 'Каталог цветов и букетов | BAZAAR',
  description: 'Широкий выбор букетов и цветочных композиций в магазине BAZAAR в Иркутске',
};

// Функция для получения параметров запроса и загрузки товаров
async function getCatalogData(searchParams) {
  const priceMin = searchParams.priceMin || '';
  const priceMax = searchParams.priceMax || '';
  const color = searchParams.color || '';
  const sort = searchParams.sort || 'popular';

  // Формируем URL запроса с параметрами
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
  if (priceMin) url.searchParams.append('priceMin', priceMin);
  if (priceMax) url.searchParams.append('priceMax', priceMax);
  if (color) url.searchParams.append('color', color);
  url.searchParams.append('sort', sort);

  const products = await fetch(url.toString()).then(r => r.json());
  return { products, filters: { priceMin, priceMax, color }, sort };
}

export default async function CatalogPage({ searchParams }) {
  const { products, filters, sort } = await getCatalogData(searchParams);

  return (
    <main className="catalog-page">
      <div className="container">
        <h1 className="catalog-page__title">Каталог букетов</h1>
        
        <div className="catalog-page__layout">
          {/* Боковая панель с фильтрами */}
          <aside className="catalog-page__sidebar">
            <Filters initialFilters={filters} />
          </aside>
          
          {/* Основной контент каталога */}
          <div className="catalog-page__content">
            <div className="catalog-page__sorter-wrapper">
              <Sorter initialSort={sort} />
            </div>
            
            <ProductsList products={products} />
          </div>
        </div>
      </div>
    </main>
  );
}
```

3. **Реализовать клиентские компоненты для интерактивных элементов**:
```tsx
// src/components/catalog/Filters.tsx
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ColorFilter } from './ColorFilter';
import { PriceFilter } from './PriceFilter';

export function Filters({ initialFilters }) {
  const router = useRouter();
  const [filters, setFilters] = useState(initialFilters);

  const handleFilterChange = (newFilters) => {
    // Объединяем новые фильтры с существующими
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    
    // Формируем URL с параметрами
    const searchParams = new URLSearchParams();
    if (updatedFilters.priceMin) searchParams.set('priceMin', updatedFilters.priceMin);
    if (updatedFilters.priceMax) searchParams.set('priceMax', updatedFilters.priceMax);
    if (updatedFilters.color) searchParams.set('color', updatedFilters.color);
    
    // Навигация с новыми параметрами без перезагрузки страницы
    router.push(`/catalog?${searchParams.toString()}`);
  };

  return (
    <div className="filters">
      <h2 className="filters__title">Фильтры</h2>
      
      <div className="filters__group">
        <h3 className="filters__group-title">Цена</h3>
        <PriceFilter 
          selectedPrice={{ min: filters.priceMin, max: filters.priceMax }}
          onPriceSelect={(price) => handleFilterChange({ 
            priceMin: price?.min || '', 
            priceMax: price?.max || '' 
          })}
        />
      </div>
      
      <div className="filters__group">
        <h3 className="filters__group-title">Цвет</h3>
        <ColorFilter 
          selectedColor={filters.color}
          onColorSelect={(color) => handleFilterChange({ color: color || '' })}
        />
      </div>
    </div>
  );
}
```

4. **Компонент загрузки**:
```tsx
// src/app/catalog/loading.tsx
import { PageSkeleton } from '@/components/common';

export default function Loading() {
  return <PageSkeleton />;
}
```

5. **Преобразование URL-параметров во время прямого перехода**:
   - Next.js автоматически передает searchParams в компонент страницы
   - Используйте middleware для сложной логики редиректов и преобразования URL-параметров
```

### 21.4. Миграция ProductPage.tsx

Страница продукта отображает детальную информацию о конкретном товаре. В Next.js эта страница становится динамическим маршрутом:

1. **Создать структуру директорий**:
```bash
mkdir -p src/app/products/[id]
touch src/app/products/[id]/page.tsx
touch src/app/products/[id]/error.tsx
touch src/app/products/[id]/not-found.tsx
```

2. **Реализация динамической страницы продукта**:
```tsx
// src/app/products/[id]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/components/catalog/ProductDetail';
import { RelatedProducts } from '@/components/catalog/RelatedProducts';

// Динамическая генерация метаданных на основе данных о продукте
export async function generateMetadata({ params }): Promise<Metadata> {
  const product = await getProductById(params.id);
  if (!product) return { title: 'Товар не найден | BAZAAR' };
  
  return {
    title: `${product.title} | Букеты и цветы BAZAAR`,
    description: product.description || 'Купить букет с доставкой в Иркутске',
    openGraph: {
      images: [{ url: product.image }],
    },
  };
}

// Функция загрузки данных о продукте
async function getProductById(id: string) {
  try {
    const product = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`).then(r => {
      if (!r.ok) return null;
      return r.json();
    });
    
    return product;
  } catch (error) {
    return null;
  }
}

// Функция загрузки похожих товаров
async function getRelatedProducts(id: string) {
  try {
    const relatedProducts = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/related/${id}`).then(r => r.json());
    return relatedProducts;
  } catch (error) {
    return [];
  }
}

export default async function ProductPage({ params }) {
  const product = await getProductById(params.id);
  
  // Если продукт не найден, отображаем страницу 404
  if (!product) {
    notFound();
  }
  
  // Параллельная загрузка похожих товаров
  const relatedProducts = await getRelatedProducts(params.id);

  return (
    <main className="product-page">
      <div className="container">
        <ProductDetail {...product} />
        
        {relatedProducts.length > 0 && (
          <section className="product-page__related">
            <h2 className="product-page__related-title">Похожие товары</h2>
            <RelatedProducts products={relatedProducts} />
          </section>
        )}
      </div>
    </main>
  );
}
```

3. **Создание страницы ошибки**:
```tsx
// src/app/products/[id]/error.tsx
'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Логирование ошибки на сервер
    console.error('Ошибка на странице продукта:', error);
  }, [error]);

  return (
    <div className="error-container">
      <h1>Произошла ошибка</h1>
      <p>Не удалось загрузить информацию о товаре.</p>
      <div className="error-actions">
        <button 
          onClick={() => reset()} 
          className="button button--primary"
        >
          Попробовать снова
        </button>
        <Link href="/catalog" className="button button--outline">
          Вернуться в каталог
        </Link>
      </div>
    </div>
  );
}
```

4. **Создание страницы Not Found (404)**:
```tsx
// src/app/products/[id]/not-found.tsx
import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="not-found-container">
      <h1>Товар не найден</h1>
      <p>Извините, запрашиваемый товар не существует или был удален.</p>
      <Link href="/catalog" className="button button--primary">
        Перейти в каталог
      </Link>
    </div>
  );
}
```

5. **Создание клиентского компонента ProductDetail**:
```tsx
// src/components/catalog/ProductDetail.tsx
'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';
import { LazyImage } from '@/components/common/LazyImage';
import { Icon } from '@/components/common/Icon';

export function ProductDetail({
  id,
  title,
  price,
  image,
  description,
  color
}) {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price) => {
    return price.toLocaleString('ru-RU') + ' ₽';
  };

  const handleAddToCart = () => {
    dispatch(addToCart({
      id,
      name: title,
      price,
      quantity: 1,
      image
    }));
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="product-detail">
      {/* Содержимое страницы продукта аналогично исходному компоненту */}
      {/* ... */}
    </div>
  );
}
```

### 21.5. Миграция CartPage.tsx

Страница корзины - это клиентский компонент с управлением состоянием:

1. **Создать структуру директорий**:
```bash
mkdir -p src/app/cart
touch src/app/cart/page.tsx
```

2. **Реализация страницы корзины**:
```tsx
// src/app/cart/page.tsx
import { Metadata } from 'next';
import { CartContent } from '@/components/cart/CartContent';

export const metadata: Metadata = {
  title: 'Корзина | BAZAAR',
  description: 'Оформление заказа и доставка цветов',
};

export default function CartPage() {
  return (
    <div className="container">
      <h1 className="cart-page__title">Корзина</h1>
      <CartContent />
    </div>
  );
}
```

3. **Создание клиентского компонента CartContent**:
```tsx
// src/components/cart/CartContent.tsx
'use client';

import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { 
  incrementQuantity, 
  decrementQuantity, 
  removeFromCart 
} from '@/store/cartSlice';
import { LazyImage } from '@/components/common/LazyImage';
import { RootState } from '@/store/store';

export function CartContent() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );
  
  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Ваша корзина пуста</h2>
        <p>Добавьте товары в корзину, чтобы оформить заказ</p>
        <Link href="/catalog" className="button button--primary">
          Перейти в каталог
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page__content">
      <div className="cart-items">
        {cartItems.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="cart-item__image-wrapper">
              <LazyImage
                src={item.image}
                alt={item.name}
                objectFit="cover"
                className="cart-item__image"
              />
            </div>
            
            <div className="cart-item__details">
              <h3 className="cart-item__name">{item.name}</h3>
              <div className="cart-item__price">{item.price.toLocaleString()} ₽</div>
            </div>
            
            <div className="cart-item__quantity">
              <button
                className="cart-item__quantity-btn"
                onClick={() => dispatch(decrementQuantity(item.id))}
                disabled={item.quantity <= 1}
              >
                -
              </button>
              <span className="cart-item__quantity-value">{item.quantity}</span>
              <button
                className="cart-item__quantity-btn"
                onClick={() => dispatch(incrementQuantity(item.id))}
              >
                +
              </button>
            </div>
            
            <div className="cart-item__total">
              {(item.price * item.quantity).toLocaleString()} ₽
            </div>
            
            <button
              className="cart-item__remove"
              onClick={() => dispatch(removeFromCart(item.id))}
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
      
      <div className="cart-summary">
        <div className="cart-summary__total">
          <span>Итого:</span>
          <span className="cart-summary__total-price">
            {totalPrice.toLocaleString()} ₽
          </span>
        </div>
        
        <Link href="/checkout" className="button button--primary cart-summary__checkout-btn">
          Оформить заказ
        </Link>
      </div>
    </div>
  );
}
```

4. **Адаптация Redux-хранилища для Next.js**:
```tsx
// src/providers/ReduxProvider.tsx
'use client';

import { Provider } from 'react-redux';
import { store } from '@/store/store';

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
```

5. **Интеграция провайдера в корневой лейаут**:
```tsx
// src/app/layout.tsx
import { ReduxProvider } from '@/providers/ReduxProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
```

### 21.6. Миграция NotFoundPage.tsx

В Next.js есть встроенная поддержка страницы 404, которую нужно создать в корне приложения:

1. **Создание файла Not Found**:
```bash
touch src/app/not-found.tsx
```

2. **Реализация глобальной страницы Not Found**:
```tsx
// src/app/not-found.tsx
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Страница не найдена | BAZAAR',
  description: 'Запрашиваемая страница не существует',
};

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="container">
        <h1 className="not-found-page__title">404</h1>
        <h2 className="not-found-page__subtitle">Страница не найдена</h2>
        <p className="not-found-page__text">
          Извините, запрашиваемая страница не существует или была удалена.
        </p>
        <Link href="/" className="button button--primary not-found-page__button">
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
```

3. **Кастомизация стилей**:
```css
/* src/styles/pages/not-found.css */
.not-found-page {
  padding: 80px 0;
  text-align: center;
}

.not-found-page__title {
  font-size: 120px;
  margin-bottom: 0;
  color: var(--color-primary);
}

.not-found-page__subtitle {
  font-size: 32px;
  margin-bottom: 20px;
}

.not-found-page__text {
  max-width: 500px;
  margin: 0 auto 30px;
  font-size: 18px;
}

.not-found-page__button {
  min-width: 200px;
}
```

### 21.7. Миграция BlogPage.tsx

Страница блога отображает список постов и требует пагинацию. В Next.js это реализуется через серверные компоненты:

1. **Создать структуру директорий**:
```bash
mkdir -p src/app/blog
touch src/app/blog/page.tsx
```

2. **Реализация страницы блога с пагинацией**:
```tsx
// src/app/blog/page.tsx
import { Metadata } from 'next';
import { Pagination } from '@/components/blog/Pagination';
import { BlogPostCard } from '@/components/common/BlogPostCard';

export const metadata: Metadata = {
  title: 'Блог о цветах и флористике | BAZAAR',
  description: 'Статьи о цветах, уходе за ними, флористических трендах и идеях подарков',
};

// Функция для получения параметров запроса и загрузки постов
async function getBlogPosts(searchParams) {
  const page = parseInt(searchParams.page || '1', 10);
  const limit = 6; // Количество постов на странице
  
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blog?page=${page}&limit=${limit}`
  ).then(r => r.json());
  
  return {
    posts: response.posts,
    totalPages: response.totalPages,
    currentPage: page
  };
}

export default async function BlogPage({ searchParams }) {
  const { posts, totalPages, currentPage } = await getBlogPosts(searchParams);

  return (
    <main className="blog-page">
      <div className="container">
        <h1 className="blog-page__title">Блог о цветах и флористике</h1>
        <p className="blog-page__description">
          Статьи о цветах, уходе за ними, флористических трендах и идеях подарков
        </p>
        
        <div className="blog-page__content">
          <div className="blog-page__grid">
            {posts.map(post => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
          
          {totalPages > 1 && (
            <Pagination 
              currentPage={currentPage} 
              totalPages={totalPages} 
              baseUrl="/blog" 
            />
          )}
        </div>
      </div>
    </main>
  );
}
```

3. **Создание компонента пагинации**:
```tsx
// src/components/blog/Pagination.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Pagination({ currentPage, totalPages, baseUrl }) {
  const pathname = usePathname();
  
  const generatePageUrl = (page) => {
    if (page === 1) return baseUrl;
    return `${baseUrl}?page=${page}`;
  };

  // Генерация массива с номерами страниц
  const getPageNumbers = () => {
    const pageNumbers = [];
    // Всегда показываем первую и последнюю страницу, 
    // а также 1-2 страницы до и после текущей
    
    const addPage = (page) => {
      if (
        page >= 1 && 
        page <= totalPages && 
        !pageNumbers.includes(page)
      ) {
        pageNumbers.push(page);
      }
    };
    
    // Первая страница
    addPage(1);
    
    // Страницы вокруг текущей
    for (let i = currentPage - 1; i <= currentPage + 1; i++) {
      addPage(i);
    }
    
    // Последняя страница
    addPage(totalPages);
    
    // Сортируем по возрастанию
    return pageNumbers.sort((a, b) => a - b);
  };

  const pageNumbers = getPageNumbers();

  return (
    <nav className="pagination" aria-label="Навигация по страницам">
      <ul className="pagination__list">
        {/* Кнопка "Назад" */}
        {currentPage > 1 && (
          <li className="pagination__item">
            <Link 
              href={generatePageUrl(currentPage - 1)}
              className="pagination__link pagination__link--prev"
              aria-label="Предыдущая страница"
            >
              ←
            </Link>
          </li>
        )}
        
        {/* Номера страниц */}
        {pageNumbers.map((page, index) => {
          // Если есть большой разрыв между страницами, добавляем многоточие
          if (index > 0 && page > pageNumbers[index - 1] + 1) {
            return (
              <li key={`ellipsis-${index}`} className="pagination__item pagination__item--ellipsis">
                <span>...</span>
              </li>
            );
          }
          
          return (
            <li key={page} className="pagination__item">
              <Link
                href={generatePageUrl(page)}
                className={`pagination__link ${
                  page === currentPage ? 'pagination__link--active' : ''
                }`}
              >
                {page}
              </Link>
            </li>
          );
        })}
        
        {/* Кнопка "Вперед" */}
        {currentPage < totalPages && (
          <li className="pagination__item">
            <Link 
              href={generatePageUrl(currentPage + 1)}
              className="pagination__link pagination__link--next"
              aria-label="Следующая страница"
            >
              →
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
```

4. **Миграция BlogPostCard**:
```tsx
// src/components/common/BlogPostCard.tsx
import Link from 'next/link';
import Image from 'next/image';

export function BlogPostCard({ post }) {
  const { id, title, excerpt, image, category, slug } = post;

  return (
    <article className="blog-card">
      <Link href={`/blog/${slug}`} className="blog-card__link-wrapper">
        <div className="blog-card__image-container">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="blog-card__image"
            style={{ objectFit: 'cover' }}
          />
          <span className="blog-card__category">{category.name}</span>
        </div>
        
        <div className="blog-card__content">
          <h3 className="blog-card__title">{title}</h3>
          <p className="blog-card__excerpt">{excerpt}</p>
          
          <div className="blog-card__action">
            <span className="blog-card__read-more">
              Читать дальше
              <span className="blog-card__arrow">→</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
```

5. **Миграция BlogPostPage для просмотра отдельной статьи**:
```bash
mkdir -p src/app/blog/[slug]
touch src/app/blog/[slug]/page.tsx
```

```tsx
// src/app/blog/[slug]/page.tsx
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { formatDate } from '@/utils/date';

// Динамическая генерация метаданных
export async function generateMetadata({ params }): Promise<Metadata> {
  const post = await getBlogPost(params.slug);
  if (!post) return { title: 'Статья не найдена | BAZAAR' };
  
  return {
    title: `${post.title} | Блог BAZAAR`,
    description: post.excerpt,
    openGraph: {
      images: [{ url: post.image }],
    },
  };
}

async function getBlogPost(slug: string) {
  try {
    const post = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog/${slug}`).then(r => {
      if (!r.ok) return null;
      return r.json();
    });
    
    return post;
  } catch (error) {
    return null;
  }
}

export default async function BlogPostPage({ params }) {
  const post = await getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <article className="blog-post">
      <div className="container">
        <header className="blog-post__header">
          <h1 className="blog-post__title">{post.title}</h1>
          <div className="blog-post__meta">
            <span className="blog-post__date">{formatDate(post.publishedAt)}</span>
            <span className="blog-post__category">{post.category.name}</span>
          </div>
        </header>
        
        <div className="blog-post__featured-image">
          <Image
            src={post.image}
            alt={post.title}
            width={1200}
            height={630}
            className="blog-post__image"
            priority
          />
        </div>
        
        <div 
          className="blog-post__content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}
```

// ... existing code ...

## 22. Миграция компонентов общего интерфейса

В этом разделе описывается процесс миграции основных компонентов общего интерфейса: Header, Footer, Navigation и других.

### 22.1. Миграция Header и компонентов навигации

Компонент Header является клиентским компонентом, так как содержит интерактивные элементы:

1. **Создание клиентского компонента Header**:
```tsx
// src/components/layout/Header.tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useTheme } from '@/hooks/useTheme';
import { BazaarLogo } from '../common/BazaarLogo';
import { Icon } from '../common/Icon';
import { Navigation } from './Navigation';
import { SideMenu } from './SideMenu';

export function Header() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { theme, toggleTheme } = useTheme();

  // Обработчик скролла для прилипающего хедера
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Управление состоянием body при открытии меню
  useEffect(() => {
    if (isSideMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSideMenuOpen]);

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
  };

  return (
    <>
      <div className={`header__top ${isHeaderSticky ? 'header__top--sticky' : ''}`}>
        <div className="header__top-content">
          <button 
            className={`burger-menu ${isSideMenuOpen ? 'burger-menu--active' : ''}`}
            onClick={toggleSideMenu}
            aria-label="Открыть меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <Link href="/" className="header__logo" aria-label="BAZAAR (БАЗААР) - Магазин. Цветы в Иркутске">
            <BazaarLogo />
            <span className="visually-hidden">BAZAAR</span>
          </Link>

          <div className="header__actions">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Включить ${theme === 'light' ? 'темную' : 'светлую'} тему`}
            >
              <Icon name={theme === 'light' ? 'sun' : 'moon'} />
            </button>

            <Link href="/profile" className="profile-button" aria-label="Профиль">
              <Icon name="profile" />
            </Link>

            <Link href="/cart" className="cart-button" aria-label="Корзина">
              <Icon name="cart" />
              {itemsCount > 0 && <span className="cart-button__count">{itemsCount}</span>}
            </Link>
          </div>
        </div>
      </div>

      <div className="header__bottom">
        <div className="container">
          <Navigation />
        </div>
      </div>

      <SideMenu 
        isOpen={isSideMenuOpen} 
        onClose={closeSideMenu}
      />
    </>
  );
}
```

2. **Миграция компонента Navigation**:
```tsx
// src/components/layout/Navigation.tsx
'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

const navigationItems = [
  { path: '/', label: 'Главная' },
  { path: '/catalog', label: 'Каталог' },
  { path: '/delivery', label: 'Доставка' },
  { path: '/about', label: 'О нас' },
  { path: '/contacts', label: 'Контакты' },
  { path: '/blog', label: 'Блог' }
];

interface NavigationProps {
  className?: string;
  onItemClick?: (item: { name: string; href: string }) => void;
}

export function Navigation({ className = '', onItemClick }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className={`nav ${className}`}>
      {navigationItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`nav__link ${pathname === item.path ? 'nav__link--active' : ''}`}
          onClick={() => onItemClick && onItemClick({ name: item.label, href: item.path })}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
```

3. **Миграция компонента SideMenu**:
```tsx
// src/components/layout/SideMenu.tsx
'use client';

import { useEffect } from 'react';
import { Navigation } from './Navigation';
import { SocialLinks } from '../common/SocialLinks';
import { StoreAddresses } from '../common/StoreAddresses';
import { PHONE_NUMBER } from '@/constants/contacts';

interface SideMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  // Обработчик нажатия Escape для закрытия меню
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleNavItemClick = () => {
    onClose();
  };

  return (
    <div 
      className={`side-menu ${isOpen ? 'side-menu--open' : ''}`}
      onClick={(e) => {
        // Закрытие при клике на затемненную область
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="side-menu__content">
        <Navigation className="side-menu__nav" onItemClick={handleNavItemClick} />
        
        <div className="side-menu__info">
          <h3 className="side-menu__subtitle">Наши магазины</h3>
          <StoreAddresses className="side-menu__stores" />
          
          <div className="side-menu__contacts">
            <a href={`tel:${PHONE_NUMBER}`} className="side-menu__main-phone">{PHONE_NUMBER}</a>
            <SocialLinks className="social-links--start" />
          </div>
        </div>
      </div>
    </div>
  );
}
```

### 22.2. Миграция компонента Footer

Footer чаще всего является статичным компонентом, но в Next.js любой компонент с интерактивностью должен быть клиентским:

```tsx
// src/components/layout/Footer.tsx
import Link from 'next/link';
import { BazaarLogo } from '@/components/common/BazaarLogo';
import { SocialLinks } from '@/components/common/SocialLinks';
import { StoreAddresses } from '@/components/common/StoreAddresses';
import { PHONE_NUMBER } from '@/constants/contacts';

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <Link href="/" className="footer__logo" aria-label="BAZAAR (БАЗААР) - Магазин. Цветы в Иркутске">
          <BazaarLogo />
        </Link>

        <div className="footer__container">
          <section className="footer__section">
            <div className="footer__contact">
              <h3 className="footer__title">Наши магазины</h3>
              <StoreAddresses className="footer__addresses" />
            </div>
          </section>

          <section className="footer__section">
            <h3 className="footer__title">Каталог</h3>
            <nav className="footer__nav">
              <Link href="/catalog/bouquets" className="footer__nav-link">Букеты</Link>
              <Link href="/catalog/compositions" className="footer__nav-link">Композиции</Link>
              <Link href="/delivery" className="footer__nav-link">Доставка</Link>
            </nav>
          </section>

          <section className="footer__section">
            <h3 className="footer__title">Компания</h3>
            <nav className="footer__nav">
              <Link href="/about" className="footer__nav-link">О нас</Link>
              <Link href="/vacancies" className="footer__nav-link">Вакансии</Link>
              <Link href="/contacts" className="footer__nav-link">Контакты</Link>
              <Link href="/blog" className="footer__nav-link">Блог</Link>
            </nav>
          </section>

          <section className="footer__section">
            <h3 className="footer__title">Связаться с нами</h3>
            <a href={`tel:${PHONE_NUMBER}`} className="footer__contact-item">
              {PHONE_NUMBER}
            </a>
            <SocialLinks className="social-links--start" />
          </section>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">© 2019 – {currentYear} BAZAAR</p>
          <Link href="/privacy" className="footer__nav-link">Политика конфиденциальности</Link>
        </div>
      </div>
    </footer>
  );
}
```

### 22.3. Интеграция Header и Footer в корневой Layout

В Next.js, компоненты которые должны быть на каждой странице, помещаются в корневой файл layout.tsx:

```tsx
// src/app/layout.tsx
import { Metadata } from 'next';
import { ReduxProvider } from '@/providers/ReduxProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | BAZAAR',
    default: 'BAZAAR - Цветы и букеты в Иркутске с доставкой',
  },
  description: 'Магазин цветов BAZAAR - свежие букеты с доставкой по Иркутску',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <ReduxProvider>
          <ThemeProvider>
            <div className="site-wrapper">
              <Header />
              <main className="main-content">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
```

// ... existing code ...

## 23. Миграция общих компонентов (common components)

В этом разделе описаны шаги по миграции часто используемых компонентов из директории `common`.

### 23.1. Миграция компонента BazaarLogo

Логотип BAZAAR можно перенести в Next.js без значительных изменений:

```tsx
// src/components/common/BazaarLogo.tsx
interface BazaarLogoProps {
  className?: string;
}

export function BazaarLogo({ className = '' }: BazaarLogoProps) {
  return (
    <svg 
      className={className} 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 629 88"
      aria-hidden="true"
    >
      {/* Содержимое SVG такое же, как в исходном компоненте */}
      <g id="XMLID271">
        <g id="XMLID270">
          {/* ... SVG содержимое ... */}
        </g>
      </g>
    </svg>
  );
}
```

### 23.2. Миграция компонента Icon

Компонент Icon предоставляет набор SVG-иконок для использования в приложении:

```tsx
// src/components/common/Icon.tsx
interface IconProps {
  name: string;
  size?: number;
  color?: string;
  className?: string;
}

export function Icon({ name, size = 24, color = 'currentColor', className = '' }: IconProps) {
  const icons = {
    telegram: <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z" />,
    whatsapp: <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />,
    // ... остальные иконки ...
  };

  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill={color}
      className={className}
      aria-hidden="true"
    >
      {icons[name]}
    </svg>
  );
}
```

### 23.3. Миграция компонента LazyImage

Для компонента LazyImage в Next.js лучше использовать встроенный компонент Image вместо кастомной реализации:

```tsx
// src/components/common/LazyImage.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Skeleton } from './Skeleton';

interface LazyImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  containerClassName?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  width?: number | string;
  height?: number | string;
  aspectRatio?: number;
  caption?: string;
}

export function LazyImage({
  src,
  alt,
  fallbackSrc = '/images/placeholder.png',
  className = '',
  containerClassName = '',
  objectFit = 'cover',
  width,
  height,
  aspectRatio,
  caption
}: LazyImageProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const imageStyle = {
    objectFit,
    width: '100%', 
    height: '100%',
  };
  
  // Обработчики событий
  const handleLoad = () => {
    setLoading(false);
  };
  
  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  // Определение размеров и пропорций
  let imageProps: any = {};
  
  if (aspectRatio) {
    // Для изображений с заданным соотношением сторон используем fill
    imageProps.fill = true;
    imageProps.sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  } else if (typeof width === 'number' && typeof height === 'number') {
    // Для изображений с явно заданными размерами
    imageProps.width = width;
    imageProps.height = height;
  } else {
    // Для других случаев, задаем стандартные размеры и используем fill
    imageProps.fill = true;
    imageProps.sizes = '100vw';
  }

  return (
    <figure 
      className={`lazy-image__container ${containerClassName}`}
      style={{
        position: 'relative',
        width: width || '100%',
        height: height || (aspectRatio ? 0 : '100%'),
        paddingBottom: aspectRatio ? `${(1 / aspectRatio) * 100}%` : undefined,
        margin: 0,
      }}
    >
      {/* Скелетон для загрузки */}
      {loading && (
        <div 
          className="lazy-image__skeleton"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        >
          <Skeleton
            width="100%"
            height="100%"
            className="lazy-image__skeleton-animation"
          />
        </div>
      )}
      
      <Image
        {...imageProps}
        src={error ? fallbackSrc : src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`lazy-image__img ${className} ${loading ? 'lazy-image__img--hidden' : ''}`}
        style={{
          ...imageStyle,
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      />
      
      {caption && <figcaption className="lazy-image__caption">{caption}</figcaption>}
    </figure>
  );
}
```

### 23.4. Миграция компонента Skeleton

Компонент Skeleton перенести в Next.js без существенных изменений:

```tsx
// src/components/common/Skeleton.tsx
interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string | number;
  className?: string;
  style?: React.CSSProperties;
}

export function Skeleton({ 
  width = '100%', 
  height = '1rem', 
  borderRadius = '4px',
  className = '',
  style = {}
}: SkeletonProps) {
  // Преобразуем числовые значения в строки с px
  const computedStyle = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
    borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
    ...style // Объединяем с дополнительными пользовательскими стилями
  };
  
  return (
    <div 
      className={`skeleton-loader ${className}`} 
      style={computedStyle}
      aria-hidden="true" 
      role="presentation" 
      data-testid="skeleton-loader" 
    />
  );
}
```

### 23.5. Миграция компонента Modal

Модальное окно требует клиентской реализации в Next.js из-за использования портала:

```tsx
// src/components/common/Modal.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Skeleton } from './Skeleton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  isLoading?: boolean;
  skeletonConfig?: {
    count: number;
    height: string | number;
    spacing: string;
  };
  className?: string;
  id?: string;
}

// Функция для вычисления ширины скроллбара
const getScrollbarWidth = () => {
  // Создаем элемент div с прокруткой
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  document.body.appendChild(outer);

  // Создаем внутренний div
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Рассчитываем ширину скроллбара
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Удаляем созданные элементы
  outer.parentNode?.removeChild(outer);

  return scrollbarWidth;
};

export function Modal({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  isLoading = false,
  skeletonConfig = { count: 3, height: '2rem', spacing: '1rem' },
  className = '',
  id = 'modal'
}: ModalProps) {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Устанавливаем флаг mounted после монтирования компонента
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Управление фокусом и блокировкой скролла
  useEffect(() => {
    if (!isOpen) return;
    
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements?.[0] as HTMLElement;
    const lastElement = focusableElements?.[focusableElements.length - 1] as HTMLElement;
    
    // Фокус на первом элементе при открытии
    if (firstElement) {
      firstElement.focus();
    }
    
    // Блокировка скролла
    const scrollbarWidth = getScrollbarWidth();
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);
  
  // Обработчики закрытия
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  
  // Добавляем обработчик нажатия Escape
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);
  
  // Обработчик для "ловушки" фокуса
  const handleFocusTrap = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    
    const focusableElements = modalRef.current?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (!focusableElements || focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    
    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      e.preventDefault();
    }
  };

  // Рендерим модальное окно только на клиенте
  if (!mounted) return null;
  
  const modalContent = isOpen && (
    <div 
      className="modal-overlay"
      onClick={handleOverlayClick}
      onKeyDown={handleFocusTrap}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? `${id}-title` : undefined}
    >
      <div 
        ref={modalRef}
        className={`modal ${className}`}
        tabIndex={-1}
      >
        <div className="modal__header">
          {title && <h2 id={`${id}-title`} className="modal__title">{title}</h2>}
          <button 
            className="modal__close" 
            onClick={onClose}
            aria-label="Закрыть"
          >
            ×
          </button>
        </div>
        
        <div className="modal__content" ref={contentRef}>
          {isLoading ? (
            <div className="modal__skeleton">
              {Array.from({ length: skeletonConfig.count }).map((_, index) => (
                <Skeleton 
                  key={`skeleton-${index}`}
                  height={skeletonConfig.height}
                  style={{ marginBottom: index < skeletonConfig.count - 1 ? skeletonConfig.spacing : 0 }}
                />
              ))}
            </div>
          ) : children}
        </div>
      </div>
    </div>
  );
  
  // Используем портал для рендеринга модального окна в конце body
  return mounted ? createPortal(modalContent, document.body) : null;
}
```

### 23.6. Миграция компонента BlogPostCard

Для BlogPostCard лучше использовать встроенный компонент Image из Next.js:

```tsx
// src/components/common/BlogPostCard.tsx
import Link from 'next/link';
import Image from 'next/image';

interface BlogPost {
  id: string | number;
  title: string;
  excerpt: string;
  image: string;
  category: {
    id: string | number;
    name: string;
  };
  slug: string;
}

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const { id, title, excerpt, image, category, slug } = post;

  return (
    <article className="blog-card">
      <Link href={`/blog/${slug}`} className="blog-card__link-wrapper">
        <div className="blog-card__image-container">
          <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="blog-card__image"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <span className="blog-card__category">{category.name}</span>
        </div>
        
        <div className="blog-card__content">
          <h3 className="blog-card__title">{title}</h3>
          <p className="blog-card__excerpt">{excerpt}</p>
          
          <div className="blog-card__action">
            <span className="blog-card__read-more">
              Читать дальше
              <span className="blog-card__arrow">→</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
```

// ... existing code ...

## 24. Миграция компонентов каталога и корзины

В этом разделе описывается процесс миграции компонентов, связанных с каталогом товаров и корзиной.

### 24.1. Миграция компонента ProductCard

Карточка товара - один из основных компонентов интерфейса магазина:

```tsx
// src/components/common/ProductCard.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/store/cartSlice';

interface ProductCardProps {
  id: string | number;
  title?: string;
  name?: string;
  price: number;
  oldPrice?: number;
  image: string;
  category?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  onClick?: () => void;
}

export function ProductCard({
  id,
  title,
  name, // Поддерживаем оба варианта названия
  price,
  oldPrice,
  image,
  category,
  isNew = false,
  isBestseller = false,
  onClick
}: ProductCardProps) {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  
  // Используем title или name в зависимости от переданного пропса
  const productName = title || name || 'Товар';
  
  // Форматирование цены с разделителями
  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₽';
  };
  
  // Обработчик добавления в корзину
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch(addToCart({
      id,
      name: productName,
      price,
      quantity: 1,
      image
    }));
  };

  return (
    <div 
      className="product-card" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <Link href={`/products/${id}`} className="product-card__link">
        <div className="product-card__image-container">
          <div style={{ position: 'relative', width: '100%', paddingBottom: '100%' }}>
            <Image
              src={image}
              alt={productName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="product-card__image"
              style={{ 
                objectFit: 'contain',
                transition: 'transform 0.3s ease',
                transform: isHovered ? 'scale(1.05)' : 'scale(1)'
              }}
            />
          </div>
          
          {/* Бейджи */}
          <div className="product-card__badges">
            {isNew && <span className="product-card__badge product-card__badge--new">Новинка</span>}
            {isBestseller && <span className="product-card__badge product-card__badge--bestseller">Хит</span>}
            {oldPrice && <span className="product-card__badge product-card__badge--sale">
              -{Math.round((1 - price / oldPrice) * 100)}%
            </span>}
          </div>
        </div>

        <div className="product-card__content">
          {category && <div className="product-card__category">{category}</div>}
          <h3 className="product-card__name">{productName}</h3>
          
          <div className="product-card__price-container">
            <span className="product-card__price">{formatPrice(price)}</span>
            {oldPrice && <span className="product-card__old-price">{formatPrice(oldPrice)}</span>}
          </div>
        </div>
      </Link>
      
      <button 
        className="product-card__add-to-cart button button--outline"
        onClick={handleAddToCart}
        aria-label={`Добавить ${productName} в корзину`}
      >
        В корзину
      </button>
    </div>
  );
}
```

### 24.2. Миграция компонента CartButton

Кнопка корзины показывает текущее количество товаров:

```tsx
// src/components/cart/CartButton.tsx
'use client';

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { Icon } from '@/components/common/Icon';

export function CartButton() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/cart" className="cart-button" aria-label="Корзина">
      <Icon name="cart" />
      {itemsCount > 0 && <span className="cart-button__count">{itemsCount}</span>}
    </Link>
  );
}
```

### 24.3. Миграция компонента AddToCartAnimation

Компонент для анимации добавления товара в корзину:

```tsx
// src/components/catalog/AddToCartAnimation.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface AddToCartAnimationProps {
  productId: number | string;
  isVisible: boolean;
  onAnimationEnd: () => void;
  clickPosition: { x: number; y: number };
}

export function AddToCartAnimation({
  productId,
  isVisible,
  onAnimationEnd,
  clickPosition
}: AddToCartAnimationProps) {
  const animationRef = useRef<HTMLDivElement>(null);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  
  // Получаем URL изображения товара из хранилища
  const productImage = useSelector((state: RootState) => {
    const product = state.products.items.find(p => p.id === productId);
    return product?.image || '';
  });
  
  // Вычисляем позицию кнопки корзины для анимации
  useEffect(() => {
    if (!isVisible) return;
    
    const cartButton = document.querySelector('.cart-button');
    if (cartButton) {
      const cartRect = cartButton.getBoundingClientRect();
      setTargetPosition({
        x: cartRect.left + cartRect.width / 2,
        y: cartRect.top + cartRect.height / 2
      });
    }
    
    // Запускаем анимацию
    const element = animationRef.current;
    if (element) {
      element.style.transform = `translate(${clickPosition.x}px, ${clickPosition.y}px) scale(1)`;
      
      // Даём время для применения начальных стилей
      setTimeout(() => {
        element.style.transform = `translate(${targetPosition.x}px, ${targetPosition.y}px) scale(0.1)`;
        element.style.opacity = '0';
      }, 10);
      
      // Завершаем анимацию
      setTimeout(() => {
        onAnimationEnd();
      }, 800);
    }
  }, [isVisible, clickPosition, targetPosition.x, targetPosition.y, onAnimationEnd]);
  
  if (!isVisible) return null;
  
  return (
    <div 
      ref={animationRef}
      className="add-to-cart-animation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundImage: `url(${productImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
        transition: 'transform 0.8s cubic-bezier(0.215, 0.610, 0.355, 1), opacity 0.8s cubic-bezier(0.215, 0.610, 0.355, 1)',
        opacity: 1,
        pointerEvents: 'none'
      }}
    />
  );
}
```

### 24.4. Миграция компонентов фильтров

#### Миграция ColorFilter

```tsx
// src/components/catalog/ColorFilter.tsx
'use client';

interface ColorOption {
  id: string;
  name: string;
  color: string;
}

interface ColorFilterProps {
  selectedColor: string | null;
  onColorSelect: (color: string | null) => void;
}

const colorOptions: ColorOption[] = [
  { id: 'red', name: 'Красный', color: '#b22222' },
  { id: 'pink', name: 'Розовый', color: '#e6b3bf' },
  { id: 'white', name: 'Белый', color: '#f5f5dc' },
  { id: 'yellow', name: 'Желтый', color: '#f7dc6f' },
  { id: 'purple', name: 'Фиолетовый', color: '#8b458b' },
  { id: 'blue', name: 'Синий', color: '#4682b4' },
];

export function ColorFilter({ selectedColor, onColorSelect }: ColorFilterProps) {
  return (
    <div className="color-filter">
      <div className="color-filter__buttons">
        {colorOptions.map((option) => (
          <button 
            key={option.id}
            className={`color-filter__button ${selectedColor === option.id ? 'color-filter__button--active' : ''}`}
            onClick={() => onColorSelect(selectedColor === option.id ? null : option.id)}
            title={option.name}
          >
            <span 
              className="color-filter__color-circle" 
              style={{ backgroundColor: option.color }}
            ></span>
            <span className="color-filter__name">{option.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
```

#### Миграция PriceFilter

```tsx
// src/components/catalog/PriceFilter.tsx
'use client';

import { useState } from 'react';

interface PriceOption {
  id: string;
  label: string;
  min: number;
  max: number | null;
}

interface PriceFilterProps {
  selectedPrice: { min?: number | string; max?: number | string } | null;
  onPriceSelect: (price: { min: number; max: number | null } | null) => void;
}

const priceOptions: PriceOption[] = [
  { id: '3000', label: 'до ₽3000', min: 0, max: 3000 },
  { id: '5000', label: '₽3000 - ₽5000', min: 3000, max: 5000 },
  { id: '10000', label: 'от ₽5000', min: 5000, max: null },
];

export function PriceFilter({ selectedPrice, onPriceSelect }: PriceFilterProps) {
  const [minPrice, setMinPrice] = useState<string>(
    selectedPrice?.min?.toString() || ''
  );
  const [maxPrice, setMaxPrice] = useState<string>(
    selectedPrice?.max?.toString() || ''
  );

  const handleApplyCustomPrice = () => {
    const min = parseInt(minPrice) || 0;
    const max = maxPrice ? parseInt(maxPrice) : null;
    onPriceSelect({ min, max });
  };

  const isPriceSelected = (option: PriceOption) => {
    if (!selectedPrice) return false;
    
    const minMatch = selectedPrice.min === option.min;
    const maxMatch = 
      (selectedPrice.max === option.max) || 
      (!selectedPrice.max && !option.max);
      
    return minMatch && maxMatch;
  };

  return (
    <div className="price-filter">
      <div className="filters__checkbox-group">
        {priceOptions.map((option) => (
          <label key={option.id} className="filters__checkbox-label">
            <input
              type="checkbox"
              className="filters__checkbox-input"
              checked={isPriceSelected(option)}
              onChange={() => onPriceSelect(
                isPriceSelected(option)
                  ? null 
                  : { min: option.min, max: option.max }
              )}
            />
            <span className="filters__checkbox-custom"></span>
            {option.label}
          </label>
        ))}
      </div>

      <div className="filters__price-range">
        <div className="filters__price-inputs">
          <input
            type="number"
            className="filters__price-input"
            placeholder="От"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            className="filters__price-input"
            placeholder="До"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <button 
          className="button button--outline button--small" 
          onClick={handleApplyCustomPrice}
          style={{ width: '100%' }}
        >
          Применить
        </button>
      </div>
    </div>
  );
}
```

### 24.5. Миграция компонента Collections

Коллекции товаров по категориям цен:

```tsx
// src/components/collections/Collections.tsx
'use client';

import { useRouter } from 'next/navigation';
import { ProductCard } from '@/components/common/ProductCard';

interface Product {
  id: string | number;
  title: string;
  price: number;
  image: string;
}

interface CollectionProps {
  products: Product[];
}

export function Collections({ products }: CollectionProps) {
  const router = useRouter();

  const collections = [
    { 
      id: 'cheap',
      title: 'до ₽3000',
      filter: { min: 0, max: 3000 },
      items: products.filter(p => p.price <= 3000).slice(0, 6)
    },
    { 
      id: 'medium',
      title: 'до ₽5000',
      filter: { min: 3000, max: 5000 },
      items: products.filter(p => p.price > 3000 && p.price <= 5000).slice(0, 6)
    },
    { 
      id: 'expensive',
      title: 'дороже ₽5000',
      filter: { min: 5000, max: null },
      items: products.filter(p => p.price > 5000).slice(0, 6)
    }
  ];

  const handleShowAll = (filter: { min: number; max: number | null }) => {
    const searchParams = new URLSearchParams();
    searchParams.set('priceMin', filter.min.toString());
    if (filter.max) {
      searchParams.set('priceMax', filter.max.toString());
    }
    router.push(`/catalog?${searchParams.toString()}`);
  };

  return (
    <section className="collections">
      <h2 className="collections__title">Коллекции по цене</h2>
      <p className="collections__subtitle">
        Подборки букетов в разных ценовых категориях, чтобы вы могли найти идеальный вариант для любого случая и бюджета
      </p>
      
      <div className="collections__grid">
        {collections.map(collection => (
          <div key={collection.id} className="collection">
            <h3 className="collection__title">{collection.title}</h3>
            <div className="collection__items">
              {collection.items.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  title={product.title}
                  price={product.price}
                  image={product.image}
                />
              ))}
            </div>
            <button 
              className="collection__button"
              onClick={() => handleShowAll(collection.filter)}
            >
              Показать все
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
```

### 24.6. Миграция комплексного компонента BouquetQuiz

Квиз для подбора букета:

```tsx
// src/components/quiz/BouquetQuiz.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const BUDGET_OPTIONS = [
  { id: 'budget-1', label: 'До 3000 ₽', value: '3000' },
  { id: 'budget-2', label: '3000-5000 ₽', value: '3000-5000' },
  { id: 'budget-3', label: '5000-7000 ₽', value: '5000-7000' },
  { id: 'budget-4', label: 'От 7000 ₽', value: '7000+' },
];

export function BouquetQuiz() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    budget: '',
    occasion: '',
    wishes: '',
    name: '',
    phone: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Максимальное количество шагов
  const maxSteps = 3;
  
  // Проверка доступности шага
  const isStepAvailable = (stepId: number) => {
    // Первый шаг всегда доступен
    if (stepId === 1) return true;
    
    // Для второго шага должен быть выбран бюджет
    if (stepId === 2) return !!formData.budget;
    
    // Для третьего шага должны быть заполнены пожелания
    if (stepId === 3) return !!formData.wishes;
    
    return false;
  };
  
  // Обработчик нажатия на шаг
  const handleStepClick = (stepId: number) => {
    if (isStepAvailable(stepId)) {
      setCurrentStep(stepId);
    }
  };
  
  // Обработчики для разных шагов
  const handleBudgetSelect = (budget: string) => {
    setFormData({ ...formData, budget });
    setCurrentStep(2);
  };
  
  const handleWishesSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
  };
  
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Отправка данных на сервер
      await fetch('/api/bouquet-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      // Перенаправление на страницу "спасибо"
      router.push('/thank-you');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setIsSubmitting(false);
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="bouquet-quiz">
      <div className="bouquet-quiz__header">
        <h2 className="bouquet-quiz__title">Подберем идеальный букет</h2>
        <p className="bouquet-quiz__subtitle">
          Ответьте на несколько вопросов, и мы предложим варианты, которые подойдут именно вам
        </p>
      </div>
      
      <div className="bouquet-quiz__steps">
        {Array.from({ length: maxSteps }).map((_, index) => {
          const stepId = index + 1;
          return (
            <button
              key={stepId}
              className={`bouquet-quiz__step ${currentStep === stepId ? 'bouquet-quiz__step--active' : ''} ${
                isStepAvailable(stepId) ? 'bouquet-quiz__step--available' : ''
              }`}
              onClick={() => handleStepClick(stepId)}
              disabled={!isStepAvailable(stepId)}
            >
              {stepId}
            </button>
          );
        })}
      </div>
      
      <div className="bouquet-quiz__content">
        {currentStep === 1 && (
          <div className="bouquet-quiz__step-content">
            <h3 className="bouquet-quiz__step-title">Выберите бюджет</h3>
            <div className="bouquet-quiz__budget-options">
              {BUDGET_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  className={`bouquet-quiz__budget-option ${
                    formData.budget === option.value ? 'bouquet-quiz__budget-option--selected' : ''
                  }`}
                  onClick={() => handleBudgetSelect(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="bouquet-quiz__step-content">
            <h3 className="bouquet-quiz__step-title">Ваши пожелания</h3>
            <form onSubmit={handleWishesSubmit} className="bouquet-quiz__form">
              <div className="bouquet-quiz__form-group">
                <label className="bouquet-quiz__label">
                  Повод:
                  <input
                    type="text"
                    className="bouquet-quiz__input"
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    placeholder="День рождения, юбилей, свидание..."
                  />
                </label>
              </div>
              <div className="bouquet-quiz__form-group">
                <label className="bouquet-quiz__label">
                  Особые пожелания:
                  <textarea
                    className="bouquet-quiz__textarea"
                    value={formData.wishes}
                    onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                    placeholder="Опишите ваши предпочтения: цвета, цветы, стиль..."
                    required
                  />
                </label>
              </div>
              <div className="bouquet-quiz__buttons">
                <button type="button" className="bouquet-quiz__button bouquet-quiz__button--back" onClick={handlePrevStep}>
                  Назад
                </button>
                <button type="submit" className="bouquet-quiz__button bouquet-quiz__button--next">
                  Далее
                </button>
              </div>
            </form>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="bouquet-quiz__step-content">
            <h3 className="bouquet-quiz__step-title">Ваши контакты</h3>
            <form onSubmit={handleContactSubmit} className="bouquet-quiz__form">
              <div className="bouquet-quiz__form-group">
                <label className="bouquet-quiz__label">
                  Имя:
                  <input
                    type="text"
                    className="bouquet-quiz__input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ваше имя"
                    required
                  />
                </label>
              </div>
              <div className="bouquet-quiz__form-group">
                <label className="bouquet-quiz__label">
                  Телефон:
                  <input
                    type="tel"
                    className="bouquet-quiz__input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+7 (___) ___-__-__"
                    required
                  />
                </label>
              </div>
              <div className="bouquet-quiz__buttons">
                <button type="button" className="bouquet-quiz__button bouquet-quiz__button--back" onClick={handlePrevStep}>
                  Назад
                </button>
                <button 
                  type="submit" 
                  className="bouquet-quiz__button bouquet-quiz__button--submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Отправка...' : 'Отправить'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
```

// ... existing code ...

## 25. Миграция компонентов магазинов и геолокации

В этом разделе описывается процесс миграции компонентов, связанных с магазинами и картами.

### 25.1. Миграция компонента StoresList

Компонент списка магазинов:

```tsx
// src/components/stores/StoresList.tsx
import { Store } from '@/types/store';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/common/Icon';

interface StoresListProps {
  stores: Store[];
  activeStoreId?: string;
  onStoreClick?: (storeId: string) => void;
}

export function StoresList({ stores, activeStoreId, onStoreClick }: StoresListProps) {
  return (
    <div className="stores-list">
      {stores.map(store => (
        <div
          key={store.id}
          className={`store-item ${activeStoreId === store.id ? 'store-item--active' : ''}`}
          onClick={() => onStoreClick && onStoreClick(store.id)}
        >
          {store.image && (
            <div className="store-item__image-container">
              <Image
                src={store.image}
                alt={store.name}
                width={120}
                height={80}
                className="store-item__image"
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}
          
          <div className="store-item__content">
            <h3 className="store-item__name">{store.name}</h3>
            
            <div className="store-item__info">
              <div className="store-item__address">
                <Icon name="location" />
                <span>{store.address}</span>
              </div>
              
              <div className="store-item__hours">
                <Icon name="clock" />
                <span>{store.workingHours}</span>
              </div>
              
              <div className="store-item__phone">
                <Icon name="phone" />
                <a href={`tel:${store.phone.replace(/\D/g, '')}`} className="store-item__phone-link">
                  {store.phone}
                </a>
              </div>
            </div>
            
            <div className="store-item__actions">
              <button 
                className="store-item__button store-item__button--directions"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`https://maps.google.com/maps?q=${store.coordinates[1]},${store.coordinates[0]}`, '_blank');
                }}
              >
                Маршрут
              </button>
              
              <Link 
                href={`/contacts#${store.id}`} 
                className="store-item__button store-item__button--details"
                onClick={(e) => e.stopPropagation()}
              >
                Подробнее
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 25.2. Миграция компонента StoresMap

Карта с маркерами магазинов требует особого внимания при миграции на Next.js:

```tsx
// src/components/map/StoresMap.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { Style, Icon } from 'ol/style';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { Store } from '@/types/store';

interface StoresMapProps {
  stores: Store[];
  activeStoreId?: string;
  onMarkerClick?: (storeId: string) => void;
  centerOnActiveStore?: boolean;
}

export function StoresMap({ 
  stores, 
  activeStoreId, 
  onMarkerClick,
  centerOnActiveStore = false
}: StoresMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const olMapRef = useRef<Map | null>(null);
  const [isMapInitialized, setIsMapInitialized] = useState(false);

  // Инициализация карты
  useEffect(() => {
    if (!mapRef.current) return;
    
    // При SSR window может быть недоступен, проверяем что мы в браузере
    if (typeof window === 'undefined') return;
    
    // Стандартный стиль для маркеров
    const defaultStyle = new Style({
      image: new Icon({
        src: '/images/marker.svg',
        scale: 1,
        anchor: [0.5, 1],
      }),
    });
    
    // Стиль для активного маркера
    const activeStyle = new Style({
      image: new Icon({
        src: '/images/marker-active.svg',
        scale: 1.2,
        anchor: [0.5, 1],
      }),
    });
    
    // Создаем источник данных для маркеров
    const vectorSource = new VectorSource({
      features: [],
    });
    
    // Создаем слой с маркерами
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });
    
    // Центр карты (среднее значение координат магазинов или центр города)
    const defaultCenter = stores.length > 0
      ? [stores[0].coordinates[0], stores[0].coordinates[1]]
      : [104.2811, 52.2853]; // Центр Иркутска
    
    // Создаем карту
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat(defaultCenter),
        zoom: 12,
      }),
    });
    
    olMapRef.current = map;
    
    // Добавляем обработчик клика по карте
    map.on('click', (event) => {
      const features = map.getFeaturesAtPixel(event.pixel);
      if (features && features.length > 0) {
        const storeId = features[0].get('id');
        if (storeId && onMarkerClick) {
          onMarkerClick(storeId);
        }
      }
    });
    
    // Изменение курсора при наведении на маркер
    map.on('pointermove', (event) => {
      const pixel = map.getEventPixel(event.originalEvent);
      const hit = map.hasFeatureAtPixel(pixel);
      const target = map.getTarget();
      const element = typeof target === 'string'
        ? document.getElementById(target)
        : target as HTMLElement;
      
      if (element) {
        element.style.cursor = hit ? 'pointer' : '';
      }
    });
    
    setIsMapInitialized(true);
    
    return () => {
      if (olMapRef.current) {
        olMapRef.current.setTarget(undefined);
        olMapRef.current = null;
      }
    };
  }, []);
  
  // Обновление маркеров при изменении stores или activeStoreId
  useEffect(() => {
    if (!olMapRef.current || !isMapInitialized) return;
    
    const map = olMapRef.current;
    const vectorLayer = map.getLayers().getArray().find(
      layer => layer instanceof VectorLayer
    ) as VectorLayer<VectorSource>;
    
    if (!vectorLayer) return;
    
    const source = vectorLayer.getSource();
    source.clear();
    
    // Добавляем маркеры для каждого магазина
    const features = stores.map(store => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([store.coordinates[0], store.coordinates[1]])),
        id: store.id,
        name: store.name,
      });
      
      // Устанавливаем стиль в зависимости от активности
      feature.setStyle(
        store.id === activeStoreId
          ? new Style({
              image: new Icon({
                src: '/images/marker-active.svg',
                scale: 1.2,
                anchor: [0.5, 1],
              }),
            })
          : new Style({
              image: new Icon({
                src: '/images/marker.svg',
                scale: 1,
                anchor: [0.5, 1],
              }),
            })
      );
      
      return feature;
    });
    
    source.addFeatures(features);
    
    // Центрируем карту на активном маркере, если нужно
    if (centerOnActiveStore && activeStoreId) {
      const activeStore = stores.find(store => store.id === activeStoreId);
      if (activeStore) {
        map.getView().animate({
          center: fromLonLat([activeStore.coordinates[0], activeStore.coordinates[1]]),
          zoom: 15,
          duration: 500,
        });
      }
    }
  }, [stores, activeStoreId, isMapInitialized, centerOnActiveStore]);
  
  return <div ref={mapRef} className="stores-map" />;
}
```

### 25.3. Миграция компонента StoresModal

Модальное окно для выбора магазина:

```tsx
// src/components/stores/StoresModal.tsx
'use client';

import { useState } from 'react';
import { Modal } from '@/components/common/Modal';
import { StoresList } from './StoresList';
import { StoresMap } from '@/components/map/StoresMap';
import { Store } from '@/types/store';
import { Icon } from '@/components/common/Icon';

interface StoresModalProps {
```

## 27. Заключительные рекомендации

В этом разделе приведены итоговые рекомендации по миграции проекта BAZAAR на Next.js и дальнейшему развитию приложения.

### 27.1. Поэтапная миграция и развертывание

Для успешной миграции большого проекта, как BAZAAR, рекомендуется использовать поэтапный подход:

1. **Параллельное развертывание**:
   - Сохраните старый проект в работающем состоянии, пока не будет полностью готов и протестирован новый проект
   - Используйте отдельный домен или поддомен для новой версии (например, `next.bazaar.com`)

2. **Миграция компонентов по приоритетам**:
   - Сначала мигрируйте общие компоненты (LazyImage, Icon, Modal)
   - Затем страницы, начиная с наиболее критичных (главная, каталог, страница продукта)
   - В конце мигрируйте более сложные функции (корзина, оформление заказа)

3. **Постепенное переключение пользователей**:
   - Когда новый проект будет полностью готов, начните переводить небольшой процент пользователей (например, 5%)
   - Мониторьте производительность и ошибки
   - Постепенно увеличивайте процент пользователей, пока все пользователи не будут на новой версии

### 27.2. Мониторинг и оптимизация производительности

После миграции важно настроить мониторинг и продолжать оптимизацию:

1. **Метрики Web Vitals**:
   - Настройте отслеживание Core Web Vitals (LCP, FID, CLS)
   - Используйте Next.js Analytics или внешние сервисы (Google Analytics, Vercel Analytics)

2. **Оптимизация LCP (Largest Contentful Paint)**:
   - Приоритизируйте загрузку изображений-героев, используя `priority` в компоненте `Image`
   - Внедрите предварительную загрузку критичных ресурсов

3. **Улучшение FID (First Input Delay)**:
   - Разделите тяжелый JavaScript на чанки
   - Используйте стратегии ленивой загрузки для несущественных компонентов
   - Применяйте серверные компоненты где это возможно

4. **Минимизация CLS (Cumulative Layout Shift)**:
   - Всегда указывайте размеры для изображений
   - Применяйте скелетоны для загрузки динамического контента
   - Убедитесь, что шрифты не вызывают смещения

### 27.3. Современные практики для Next.js

Воспользуйтесь всеми преимуществами современного Next.js:

1. **App Router и React Server Components**:
   - По умолчанию создавайте серверные компоненты
   - Выносите интерактивные части в отдельные клиентские компоненты с директивой `'use client'`
   - Используйте маршрутные группы для организации вложенных макетов

2. **Server Actions для форм**:
   - Обрабатывайте формы на сервере с использованием Server Actions
   - Применяйте статическую и серверную валидацию одновременно

3. **Параллельные и последовательные данные**:
   - Используйте `Promise.all` для параллельной загрузки независимых данных
   - Применяйте последовательные запросы, когда данные зависят от предыдущих результатов

4. **Streaming и постепенная загрузка UI**:
   - Используйте Suspense для выделения порций UI, которые должны отображаться постепенно
   - Создавайте осмысленные состояния загрузки для каждой части интерфейса

### 27.4. Интеграция с внешними сервисами

1. **Платежные системы**:
   - Обновите интеграцию с платежными системами с учетом серверных компонентов
   - Используйте API Routes для скрытия конфиденциальных данных

2. **CMS и контент**:
   - Интегрируйте CMS через Server Components для улучшения производительности
   - Настройте генерацию статических страниц для контента, который редко меняется

3. **Аналитика и отслеживание**:
   - Используйте Next.js Script для оптимизированной загрузки аналитических скриптов
   - Добавьте атрибут `strategy="afterInteractive"` для аналитики

### 27.5. Дальнейшее развитие проекта

После успешной миграции рекомендуется:

1. **Экспериментировать с другими фичами Next.js**:
   - Middleware для кастомной обработки запросов
   - Edge Runtime для функционала, требующего минимальной задержки
   - On-Demand Revalidation для обновления статического контента по запросу

2. **Улучшить пользовательский опыт**:
   - Внедрить прогрессивную загрузку изображений для улучшения LCP
   - Добавить поддержку офлайн-режима через Service Workers
   - Реализовать Server-Sent Events для обновлений заказа в реальном времени

3. **Масштабирование и инфраструктура**:
   - Настроить автоматическое масштабирование в зависимости от нагрузки
   - Использовать CDN для глобального распространения контента
   - Внедрить географически распределенную базу данных для минимизации задержек

4. **Локализация и интернационализация**:
   - Внедрить множественные языки, используя i18n возможности Next.js
   - Адаптировать форматы дат, чисел и валют для разных регионов
   - Оптимизировать локальный поиск для каждого языка

### 27.6. Финальная проверка миграции

Перед окончательным переходом на Next.js, удостоверьтесь что:

1. **Все функции работают как ожидается**:
   - Все компоненты были перенесены и протестированы
   - Маршрутизация работает идентично оригиналу
   - Данные загружаются и отображаются корректно

2. **Производительность улучшилась**:
   - Сравните метрики Lighthouse до и после миграции
   - Убедитесь, что Core Web Vitals в пределах рекомендуемых значений
   - Проверьте время полной загрузки на разных устройствах

3. **SEO не пострадало**:
   - Проверьте, что все метаданные переносятся правильно
   - Убедитесь, что старые URL корректно перенаправляются на новые
   - Протестируйте индексацию новых страниц

4. **Аксессибилити соответствует стандартам**:
   - Проверьте соответствие WCAG 2.1 AA
   - Протестируйте с использованием скринридеров
   - Убедитесь, что фокус клавиатуры работает правильно

Следуя этим рекомендациям, вы успешно мигрируете BAZAAR на современный стек Next.js, получив преимущества в производительности, SEO и пользовательском опыте, а также создадите основу для дальнейшего развития проекта.

## 28. Миграция стилей и CSS-файлов

В этом разделе описана детальная стратегия миграции стилей из оригинального проекта BAZAAR в Next.js, с сохранением методологии БЭМ и поддержкой как светлой, так и темной темы.

### 28.1. Общая структура и подход к стилям в Next.js

Next.js поддерживает несколько подходов к стилизации:

1. **Глобальные стили** - CSS-файлы, импортируемые в приложение глобально
2. **CSS Modules** - локальные стили с автоматически генерируемыми уникальными именами классов
3. **CSS-in-JS** - стили, определяемые непосредственно в JavaScript 
4. **SASS/SCSS** - препроцессоры CSS с дополнительными возможностями

Для нашего проекта BAZAAR будем использовать подход, наиболее близкий к оригинальному:
- Глобальные стили для общих правил, переменных и базовых компонентов
- CSS-файлы для компонентов с сохранением структуры БЭМ
- Импорт стилей компонентов в глобальный файл стилей

### 28.2. Структура директории стилей

```bash
mkdir -p src/styles/components
mkdir -p src/styles/pages
```

Создадим структуру директорий, аналогичную оригинальному проекту:

```
src/
└── styles/
    ├── base.css             # Базовые стили (сброс, основные элементы HTML)
    ├── variables.css        # CSS-переменные (цвета, размеры, отступы)
    ├── fonts.css            # Шрифты
    ├── globals.css          # Точка входа для всех стилей
    ├── components/          # Стили для компонентов
    │   ├── button.css       # Стили для кнопок
    │   ├── header.css       # Стили для шапки
    │   ├── footer.css       # Стили для подвала 
    │   ├── ...
    └── pages/               # Стили для страниц
        ├── home.css         # Стили для главной страницы
        ├── catalog.css      # Стили для каталога
        ├── ...
```

### 28.3. Миграция переменных и темы

Ключевой файл `variables.css` содержит все CSS-переменные проекта и определяет цветовую схему:

```css
/* src/styles/variables.css */
:root {
  /* Размеры контейнера */
  --container-max-width: 1200px;

  /* Цвета (основная тема) */
  --color-primary: #D4A977; /* Золотой */
  --color-primary-rgb: 212, 169, 119;
  --color-secondary: #353535; /* Темно-серый */
  --color-secondary-rgb: 53, 53, 53;
  --color-accent: #E9695E; /* Красный */
  --color-accent-rgb: 233, 105, 94;
  
  /* Фоны */
  --color-background: #FFFFFF;
  --color-background-light: #F9F9F9;
  --color-background-dark: #F0F0F0;
  --color-card-background: #FFFFFF;
  
  /* Текст */
  --color-text: #303030;
  --color-text-light: #606060;
  --color-text-secondary: #909090;
  
  /* Границы */
  --color-border: #E0E0E0;
  --color-border-light: #F0F0F0;
  
  /* Скелетоны и плейсхолдеры */
  --color-skeleton-base: #F0F0F0;
  --color-skeleton-highlight: #F8F8F8;
  
  /* Границы и тени */
  --border-radius: 8px;
  --border-radius-sm: 4px;
  --border-radius-lg: 12px;
  --border-radius-xl: 16px;
  --border-radius-round: 50%;
  
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 6px 16px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 8px 24px rgba(0, 0, 0, 0.12);
  
  /* Отступы */
  --spacing-xs: 0.25rem; /* 4px */
  --spacing-sm: 0.5rem;  /* 8px */
  --spacing-md: 1rem;    /* 16px */
  --spacing-lg: 1.5rem;  /* 24px */
  --spacing-xl: 2rem;    /* 32px */
  --spacing-2xl: 3rem;   /* 48px */
  --spacing-3xl: 4rem;   /* 64px */
  
  /* Шрифты */
  --font-family-primary: 'Montserrat', sans-serif;
  --font-family-secondary: 'Playfair Display', serif;
  --font-family-accent: 'Cormorant Garamond', serif;
  
  /* Размеры шрифтов */
  --font-size-xs: 0.75rem;   /* 12px */
  --font-size-sm: 0.875rem;  /* 14px */
  --font-size-md: 1rem;      /* 16px */
  --font-size-lg: 1.125rem;  /* 18px */
  --font-size-xl: 1.25rem;   /* 20px */
  --font-size-2xl: 1.5rem;   /* 24px */
  --font-size-3xl: 2rem;     /* 32px */
  --font-size-4xl: 2.5rem;   /* 40px */
  
  /* Анимации */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s ease;
  --transition-slow: 0.5s ease;
  
  /* Z-индексы */
  --z-index-dropdown: 100;
  --z-index-sticky: 200;
  --z-index-fixed: 300;
  --z-index-modal-backdrop: 400;
  --z-index-modal: 500;
  --z-index-toast: 600;
  --z-index-tooltip: 700;
}

/* Стили для темной темы */
.theme-dark {
  /* Цвета (темная тема) */
  --color-primary: #EBBC7E; /* Светло-золотой */
  --color-primary-rgb: 235, 188, 126;
  --color-secondary: #F0F0F0; /* Светло-серый */
  --color-secondary-rgb: 240, 240, 240;
  --color-accent: #FF6B61; /* Яркий красный */
  --color-accent-rgb: 255, 107, 97;
  
  /* Фоны */
  --color-background: #1A1A1A;
  --color-background-light: #242424;
  --color-background-dark: #121212;
  --color-card-background: #242424;
  
  /* Текст */
  --color-text: #F0F0F0;
  --color-text-light: #D0D0D0;
  --color-text-secondary: #A0A0A0;
  
  /* Границы */
  --color-border: #333333;
  --color-border-light: #404040;
  
  /* Скелетоны и плейсхолдеры */
  --color-skeleton-base: #2A2A2A;
  --color-skeleton-highlight: #3A3A3A;
  
  /* Тени с меньшей прозрачностью для темной темы */
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.25);
  --shadow-lg: 0 6px 16px rgba(0, 0, 0, 0.3);
  --shadow-xl: 0 8px 24px rgba(0, 0, 0, 0.35);
}

/* Адаптивные переменные для разных размеров экрана */
@media (min-width: 1025px) {
  :root {
    --container-max-width: 1200px;
  }
}

@media (max-width: 768px) {
  :root {
    --spacing-xl: 1.5rem;
    --spacing-2xl: 2rem;
    --spacing-3xl: 3rem;
  }
}
```

### 28.4. Глобальные стили

Создадим файл `globals.css`, который будет точкой входа для всех стилей:

```css
/* src/styles/globals.css */
/* Импорт шрифтов */
@import './fonts.css';

/* Импорт переменных */
@import './variables.css';

/* Импорт базовых стилей */
@import './base.css';

/* Импорт компонентов */
@import './components/button.css';
@import './components/header.css';
@import './components/hero.css';
@import './components/color-filter.css';
@import './components/collections.css';
@import './components/catalog.css';
@import './components/quiz.css';
@import './components/add-to-cart-animation.css';
@import './components/product-card.css';
@import './components/special-offer.css';
@import './components/footer.css';
@import './components/social-links.css';
@import './components/skeleton.css';
@import './components/store-addresses.css';
@import './components/decorative.css';
@import './components/product-detail.css';
@import './components/modal.css';
@import './components/lazy-image.css';

/* Импорт стилей страниц */
@import './pages/home.css';
@import './pages/catalog.css';
@import './pages/cart.css';
@import './pages/payment.css';
@import './pages/delivery.css';
@import './pages/about.css';
@import './pages/contacts.css';
@import './pages/blog.css';
@import './pages/blog-post.css';
@import './pages/vacancies.css';
@import './pages/privacy.css';
@import './pages/product.css';
@import './pages/profile.css';
```

### 28.5. Интеграция стилей в Next.js

Для интеграции стилей в Next.js, добавим импорт в корневой файл `layout.tsx`:

```tsx
// src/app/layout.tsx
import { Metadata } from 'next';
import { ReduxProvider } from '@/providers/ReduxProvider';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | BAZAAR',
    default: 'BAZAAR - Цветы и букеты в Иркутске с доставкой',
  },
  description: 'Магазин цветов BAZAAR - свежие букеты с доставкой по Иркутску',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="app">
        <ThemeProvider>
          <ReduxProvider>
            <Header />
            <main className="main">
              {children}
            </main>
            <Footer />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 28.6. Провайдер для темной темы

В Next.js для поддержки темной темы рекомендуется использовать библиотеку `next-themes`:

```bash
npm install next-themes
```

Затем создадим провайдер темы:

```tsx
// src/providers/ThemeProvider.tsx
'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Предотвращаем гидратацию
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={true}
      value={{
        light: 'light',
        dark: 'theme-dark',
      }}
    >
      {children}
    </NextThemeProvider>
  );
}
```

И хук для управления темой:

```tsx
// src/hooks/useTheme.ts
'use client';

import { useTheme as useNextTheme } from 'next-themes';

export function useTheme() {
  const { resolvedTheme, setTheme } = useNextTheme();
  const theme = resolvedTheme === 'theme-dark' || resolvedTheme === 'dark' ? 'dark' : 'light';

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'theme-dark' : 'light');
  };

  return { theme, toggleTheme };
}
```

### 28.7. Миграция стилей компонента кнопки

```css
/* src/styles/components/button.css */
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-family: var(--font-family-primary);
  font-size: var(--font-size-md);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border: none;
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
  color: var(--color-text);
  background-color: var(--color-background-light);
  border: 1px solid var(--color-border);
  text-decoration: none;
}

.button--primary {
  background-color: var(--color-primary);
  color: var(--color-secondary);
  border: 1px solid var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.button--primary:hover {
  background-color: var(--color-secondary);
  color: var(--color-primary);
  border-color: var(--color-secondary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.button--secondary {
  background-color: var(--color-secondary);
  color: var(--color-primary);
  border: 1px solid var(--color-secondary);
  box-shadow: var(--shadow-sm);
}

.button--secondary:hover {
  background-color: var(--color-primary);
  color: var(--color-secondary);
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.button--outline {
  background-color: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-text);
}

.button--outline:hover {
  background-color: var(--color-text);
  color: var(--color-background);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Другие варианты кнопок */
.button--gold {
  background: linear-gradient(135deg, #D4A977 0%, #E7C597 50%, #D4A977 100%);
  color: var(--color-secondary);
  border: none;
  box-shadow: var(--shadow-sm);
}

.button--gold:hover {
  background: linear-gradient(135deg, #E7C597 0%, #D4A977 50%, #E7C597 100%);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Состояние отключенной кнопки */
.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  transform: none !important;
  box-shadow: none !important;
}

/* Эффект пульсации при нажатии */
.button::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.3) 10%, transparent 10.01%);
  background-repeat: no-repeat;
  background-position: 50%;
  transform: scale(10, 10);
  opacity: 0;
  transition: transform 0.6s, opacity 0.6s;
}

.button:active::after {
  transform: scale(0, 0);
  opacity: 0.3;
  transition: 0s;
}

/* Стили для темной темы */
.theme-dark .button--primary {
  background-color: var(--color-primary);
  color: var(--color-background-dark);
  border-color: var(--color-primary);
}

.theme-dark .button--primary:hover {
  background-color: var(--color-background-light);
  color: var(--color-primary);
  border-color: var(--color-background-light);
}

.theme-dark .button--secondary {
  background-color: var(--color-secondary);
  color: var(--color-background-dark);
  border-color: var(--color-secondary);
}

.theme-dark .button--secondary:hover {
  background-color: var(--color-primary);
  color: var(--color-background-dark);
  border-color: var(--color-primary);
}

.theme-dark .button--outline {
  background-color: transparent;
  color: var(--color-text);
  border-color: var(--color-text);
}

.theme-dark .button--outline:hover {
  background-color: var(--color-text);
  color: var(--color-background-dark);
}

.theme-dark .button--gold {
  background: linear-gradient(135deg, #EBBC7E 0%, #F5D6A0 50%, #EBBC7E 100%);
  color: var(--color-background-dark);
}

/* Размеры кнопок */
.button--small {
  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
}

.button--large {
  padding: 1rem 2rem;
  font-size: var(--font-size-lg);
  letter-spacing: 0.08em;
}

/* Кнопка на всю ширину контейнера */
.button--full-width {
  width: 100%;
}

/* Иконки в кнопках */
.button__icon {
  margin-right: 0.5rem;
}

.button__icon--end {
  margin-right: 0;
  margin-left: 0.5rem;
}

/* Кнопка только с иконкой */
.button--icon-only {
  padding: 0.75rem;
  width: auto;
  height: auto;
  min-width: 3rem;
  min-height: 3rem;
}

.button--icon-only:hover {
  transform: translateY(-2px);
}

.button--icon-only.button--small {
  padding: 0.5rem;
  min-width: 2.5rem;
  min-height: 2.5rem;
}

.button--icon-only.button--large {
  padding: 1rem;
  min-width: 3.5rem;
  min-height: 3.5rem;
}

/* Состояние загрузки */
.button--loading {
  position: relative;
  color: transparent !important;
}

.button--loading::after {
  content: '';
  position: absolute;
  width: 1.2em;
  height: 1.2em;
  top: calc(50% - 0.6em);
  left: calc(50% - 0.6em);
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-top-color: currentColor;
  border-radius: 50%;
  animation: button-loading 0.8s infinite linear;
  pointer-events: none;
  opacity: 1;
  transform: none;
  transition: none;
}

@keyframes button-loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Текстовая кнопка */
.button--text {
  background: none;
  border: none;
  padding: 0.5rem;
  text-transform: none;
  letter-spacing: normal;
  position: relative;
}

.button--text::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0.5rem;
  right: 0.5rem;
  height: 1px;
  background-color: currentColor;
  transform: scaleX(0);
  transition: transform var(--transition-normal);
  transform-origin: left center;
}

.button--text:hover::after {
  transform: scaleX(1);
}

.button--text:hover {
  background: none;
  transform: none;
  box-shadow: none;
}

.button--text:active {
  opacity: 0.7;
}

.theme-dark .button--text {
  color: var(--color-text);
}

.theme-dark .button--text::after {
  background-color: var(--color-text);
}

.theme-dark .button--text:hover {
  color: var(--color-primary);
}

/* Анимация нажатия на кнопку добавления в корзину */
.product-card__button.clicked {
  animation: pulse 0.3s ease-out;
}

/* Показать адреса магазинов */
.button--show-addresses {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  text-transform: none;
  letter-spacing: normal;
  color: var(--color-primary);
  font-size: var(--font-size-sm);
  display: inline-flex;
  align-items: center;
  text-decoration: underline;
}

.button--show-addresses:hover {
  background: none;
  box-shadow: none;
  transform: none;
  text-decoration: none;
  color: var(--color-text);
}

.theme-dark .button--show-addresses {
  color: var(--color-primary);
}

.theme-dark .button--show-addresses:hover {
  color: var(--color-text);
}
```

### 28.8. Миграция стилей компонента AddToCartAnimation

```css
/* src/styles/components/add-to-cart-animation.css */
:root {
  --color-badge: #ff4e50;
  --color-badge-rgb: 255, 78, 80;
  --color-accent-rgb: 255, 78, 80;
}

/* Анимируемый элемент */
.animation-circle {
  border-radius: 50%;
  background-color: var(--color-badge);
  box-shadow: 0 0 10px rgba(var(--color-badge-rgb), 0.8);
  pointer-events: none;
}

/* Точки следа */
.animation-trail-dot {
  position: fixed;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--color-badge);
  opacity: 0;
  pointer-events: none;
  box-shadow: 0 0 5px rgba(var(--color-badge-rgb), 0.6);
}

/* Анимация появления точки */
@keyframes dot-appear {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  40% {
    opacity: 0.8;
    transform: scale(1.2);
  }
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
}

/* Анимация вспышки корзины при добавлении */
@keyframes cart-pulse {
  0% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.15);
    filter: brightness(1.3);
  }
  100% {
    transform: scale(1);
    filter: brightness(1);
  }
}

/* Класс для создания эффекта вспышки на корзине */
.cart-flash {
  animation: cart-pulse 0.3s ease-out;
}
```
// ... existing code ...

### 28.9. Миграция стилей компонента Collections

```css
/* src/styles/components/collections.css */
/* 
* Компонент: Коллекции по цене
* Описание: Стили для отображения коллекций товаров по ценовым категориям
*/

/* Заголовок секции - выравнивание по левому краю */
.collections__title {
  font-size: var(--font-size-3xl);
  color: var(--color-text);
  text-align: start; /* Выравнивание по левому краю */
  margin-block-end: var(--spacing-md);
  font-weight: 400;
  letter-spacing: 0.05em;
}

/* Описание секции - выравнивание по левому краю */
.collections__subtitle {
  font-size: var(--font-size-md);
  color: var(--color-text);
  text-align: start; /* Выравнивание по левому краю */
  margin-block-end: var(--spacing-xl);
  max-inline-size: 700px;
  margin-inline: 0; /* Убираем автоматические отступы */
  font-weight: 300;
  line-height: 1.6;
}

/* Сетка коллекций - одна коллекция в строку */
.collections__grid {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

/* Карточка коллекции */
.collection {
  background-color: var(--color-background-light);
  border-radius: var(--border-radius);
  overflow: hidden;
  border: 1px solid var(--color-border);
  transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.collection:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

/* Заголовок коллекции */
.collection__title {
  font-size: var(--font-size-xl);
  color: var(--color-text);
  margin-block-end: var(--spacing-md);
  padding-block-start: var(--spacing-lg);
  padding-inline: var(--spacing-lg);
  font-weight: 400;
  letter-spacing: 0.05em;
}

/* Сетка товаров в коллекции - 3 карточки в ряд */
.collection__items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-md);
  padding-inline: var(--spacing-lg);
  padding-block-end: var(--spacing-md);
}

/* Кнопка "Показать все" */
.collection__button {
  display: inline-block;
  background-color: transparent;
  border: 1px solid var(--color-text);
  color: var(--color-text);
  text-align: center;
  padding-block: var(--spacing-sm);
  padding-inline: var(--spacing-lg);
  margin-block: var(--spacing-md);
  margin-inline-start: var(--spacing-lg);
  text-decoration: none;
  font-size: var(--font-size-sm);
  transition: all var(--transition-normal);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border-radius: var(--border-radius-sm);
}

.collection__button:hover {
  background-color: var(--color-primary);
  color: var(--color-secondary);
  border-color: var(--color-primary);
  cursor: pointer;
}

/* Адаптивность */
@media (max-width: 1024px) {
  .collection__items {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--spacing-sm);
  }
}

@media (max-width: 768px) {
  .collections {
    padding-inline: var(--spacing-md);
  }
  
  .collection__title {
    font-size: var(--font-size-lg);
    padding-inline: var(--spacing-md);
  }
  
  .collection__items {
    grid-template-columns: 1fr; /* Одна карточка в ряд на мобильных */
    padding-inline: var(--spacing-md);
  }
  
  .collection__button {
    margin-inline-start: var(--spacing-md);
  }
}
```

### 28.10. Миграция стилей компонента ColorFilter

```css
/* src/styles/components/color-filter.css */
/* Стили фильтра по цветам */
.color-filter {
  width: 100%;
}

.color-filter__buttons {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.color-filter__button {
  display: flex;
  align-items: center;
  background: none;
  border: none;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-lg);
  cursor: pointer;
  transition: all var(--transition-normal);
  margin-bottom: var(--spacing-xs);
  position: relative;
}

.color-filter__button:hover {
  background-color: var(--color-background-light);
  transform: translateY(-2px);
}

.color-filter__button--active {
  background-color: var(--color-background-light);
  box-shadow: var(--shadow-sm);
}

.color-filter__button--active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 2px;
  background-color: var(--color-primary);
  border-radius: 1px;
}

.color-filter__color-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: inline-block;
  margin-right: var(--spacing-sm);
  border: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
  transition: all var(--transition-normal);
}

.color-filter__button--active .color-filter__color-circle {
  transform: scale(1.1);
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px var(--color-background), 0 0 0 3px var(--color-primary);
}

.color-filter__name {
  font-size: var(--font-size-sm);
  color: var(--color-text);
  transition: color var(--transition-normal);
}

.color-filter__button:hover .color-filter__name {
  color: var(--color-primary);
}

/* Темная тема */
.theme-dark .color-filter__button:hover {
  background-color: var(--color-card-background-dark);
}

.theme-dark .color-filter__button--active {
  background-color: var(--color-card-background-dark);
}

.theme-dark .color-filter__button--active::after {
  background-color: var(--color-primary-dark-theme);
}

.theme-dark .color-filter__color-circle {
  border-color: var(--color-border-dark);
}

.theme-dark .color-filter__button--active .color-filter__color-circle {
  border-color: var(--color-primary-dark-theme);
  box-shadow: 0 0 0 2px var(--color-background-dark), 0 0 0 3px var(--color-primary-dark-theme);
}

.theme-dark .color-filter__name {
  color: var(--color-text-dark);
}

.theme-dark .color-filter__button:hover .color-filter__name {
  color: var(--color-primary-dark-theme);
}

/* Медиа-запросы */
@media (max-width: 1024px) {
  .color-filter__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 768px) {
  .color-filter__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 576px) {
  .color-filter__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### 28.11. Миграция стилей компонента PriceCategories

```css
/* src/styles/components/price-categories.css */
/* Стили ценовых категорий */
.price-categories {
  padding: var(--spacing-2xl) 0;
  background: var(--color-background);
}

.price-categories__container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
}

.price-categories__title {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.price-categories__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--spacing-lg);
}

.price-category {
  background: var(--color-white);
  border-radius: var(--border-radius-lg);
  overflow: hidden;
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

.price-category:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.price-category__header {
  padding: var(--spacing-lg);
  background: var(--color-primary);
  color: var(--color-white);
}

.price-category__title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

.price-category__range {
  font-size: var(--font-size-sm);
  opacity: 0.8;
}

.price-category__content {
  padding: var(--spacing-lg);
}

.price-category__list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.price-category__item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  color: var(--color-text);
}

.price-category__item-icon {
  color: var(--color-primary);
  font-size: var(--font-size-lg);
}

.price-category__button {
  width: 100%;
}

/* Медиа-запросы */
@media (max-width: 1024px) {
  .price-categories__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .price-categories__grid {
    grid-template-columns: 1fr;
  }
}

/* Темная тема */
.theme-dark .price-categories {
  background: var(--color-background-dark);
}

.theme-dark .price-category {
  background: var(--color-background-darker);
}

.theme-dark .price-category__header {
  background: var(--color-primary-dark);
}

.theme-dark .price-category__item {
  color: var(--color-text-light);
}

.theme-dark .price-category__item-icon {
  color: var(--color-primary-light);
}
```

### 28.12. Миграция стилей компонента Footer

```css
/* src/styles/components/footer.css */
/* Стили футера */
.footer {
  padding: var(--spacing-2xl) 0;
  margin-top: auto;
}

.footer__container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--spacing-xl);
  padding: 0 var(--spacing-lg);
}

.footer__section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.footer__logo {
  display: block;
  margin-block-end: var(--spacing-xl);
}

.footer__logo svg {
  color: var(--color-text);
  height: var(--font-size-xl);
  width: auto;
}

.footer__title {
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: var(--spacing-sm);
}

.footer__nav {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer__nav-link {
  color: var(--color-text);
  text-decoration: none;
  transition: color var(--transition-base);
}

.footer__nav-link:hover {
  color: var(--color-primary);
}

.footer__contact {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.footer__contact-item {
  font-style: normal;
  color: var(--color-text);
}

.footer__bottom {
  margin-top: var(--spacing-2xl);
  padding-top: var(--spacing-xl);
  border-top: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--color-text);
}

/* Медиа-запросы */
@media (max-width: 1024px) {
  .footer__container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .footer__container {
    grid-template-columns: 1fr;
  }

  .footer__section {
    text-align: center;
  }

  .footer__logo {
    justify-content: center;
  }

  .footer__bottom {
    flex-direction: column;
    gap: var(--spacing-md);
    text-align: center;
  }
}

/* Темная тема */
.theme-dark .footer {
  background: var(--color-background-darker);
}

.theme-dark .footer__nav-link:hover {
  color: var(--color-primary);
}
```

### 28.13. Миграция стилей компонента SearchField

```css
/* src/styles/components/search-field.css */
/* 
* Компонент: SearchField
* Описание: Унифицированная поисковая строка для использования на разных страницах
*/

.search-field {
  position: relative;
  display: flex;
  width: 100%;
}

.search-field__input {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-md) var(--spacing-md) var(--spacing-xl);
  border: 1px solid var(--color-border);
  border-radius: var(--border-radius);
  font-size: var(--font-size-md);
  background-color: var(--color-background-light);
  color: var(--color-text);
  transition: all var(--transition-normal);
}

.search-field__input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: var(--shadow-sm);
}

.search-field__button {
  position: absolute;
  right: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-field__button:hover {
  color: var(--color-primary);
}

/* Темная тема */
.theme-dark .search-field__input {
  background-color: var(--color-card-background-dark);
  border-color: var(--color-border-dark);
  color: var(--color-text-dark);
}

.theme-dark .search-field__input:focus {
  border-color: var(--color-primary-dark-theme);
}

.theme-dark .search-field__button {
  color: var(--color-text-secondary-dark);
}

.theme-dark .search-field__button:hover {
  color: var(--color-primary-dark-theme);
}

/* Адаптивность */
@media (max-width: 768px) {
  .search-field__input {
    padding: var(--spacing-sm) var(--spacing-md) var(--spacing-sm) var(--spacing-xl);
    font-size: var(--font-size-sm);
  }
}
```

### 28.14. Миграция стилей компонента Skeleton

```css
/* src/styles/components/skeleton.css */
/* Базовый скелетон-загрузчик */
.skeleton-loader {
  background: linear-gradient(
    90deg,
    var(--color-skeleton-base) 0%,
    var(--color-skeleton-highlight) 50%,
    var(--color-skeleton-base) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease infinite;
}

/* Стили для страничного скелетона */
.page-skeleton {
  padding: var(--spacing-lg);
  max-width: 1200px;
  margin: 0 auto;
}

.page-skeleton__header {
  margin-bottom: var(--spacing-2xl);
}

.page-skeleton__title {
  margin-bottom: var(--spacing-md);
}

.page-skeleton__subtitle {
  margin-bottom: var(--spacing-lg);
}

.page-skeleton__content {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

.page-skeleton__card {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-lg);
  background-color: var(--color-background);
}

.page-skeleton__image {
  border-radius: var(--border-radius-md);
}

.page-skeleton__button {
  margin-top: auto;
}

/* Анимация скелетона */
@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* Темная тема */
.theme-dark .page-skeleton__card {
  background-color: var(--color-background-dark);
}
```

### 28.15. Миграция стилей компонента социальных сетей

```css
/* src/styles/components/social-links.css */
/* 
* Компонент: Социальные сети (SocialLinks)
* Описание: Стилизация блока с иконками социальных сетей
*/

.social-links {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

/* Модификаторы выравнивания */
.social-links--end {
  justify-content: flex-end;
}

.social-links--start {
  justify-content: flex-start;
}

.social-links--center {
  justify-content: center;
}

.social-links__item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--color-text);
  background-color: transparent;
  border-radius: 50%;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}

.social-links__item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color-light-gray);
  border-radius: 50%;
  transform: scale(0);
  transition: transform var(--transition-normal);
  z-index: -1;
  pointer-events: none;
}

.social-links__item svg {
  color: var(--color-text);
  width: 22px;
  height: 22px;
  transition: transform var(--transition-fast), color var(--transition-normal);
}

.social-links__item:hover {
  color: var(--color-primary);
  transform: translateY(-2px);
}

.social-links__item:hover::before {
  transform: scale(1);
}

.social-links__item:hover svg {
  transform: scale(1.1);
  color: var(--color-primary);
}

.social-links__item:active svg {
  transform: scale(0.95);
}

/* Темная тема */
.theme-dark .social-links__item {
  color: var(--color-text-light-dark);
}

.theme-dark .social-links__item svg {
  color: var(--color-text-light-dark);
}

.theme-dark .social-links__item::before {
  background: var(--color-border-dark);
}

.theme-dark .social-links__item:hover svg {
  color: var(--color-secondary-light);
}
```

### 28.16. Адаптация импортов в компонентах

При миграции компонентов необходимо заменить импорты CSS файлов:

Было:
```jsx
import '../../styles/components/button.css';
```

Стало:
В Next.js с App Router глобальные стили импортируются в корневой `layout.tsx`, поэтому в компонентах не нужно импортировать CSS файлы.

### 28.17. Стили в компонентах (CSS-in-JS подход)

Для стилей, которые зависят от состояния компонента или должны быть динамическими, можно использовать inline-стили:

```jsx
// Пример использования inline-стилей
<div 
  className="animation-trail-dot"
  style={{
    left: `${dot.x}px`,
    top: `${dot.y}px`,
    opacity: dot.opacity,
    animation: `dot-appear ${dot.duration}ms forwards`,
  }}
/>
```

Для более сложных случаев можно использовать CSS-in-JS библиотеки, такие как `styled-components` или `emotion`, но это требует дополнительной настройки.

### 28.18. Поддержка темной темы

Next.js не имеет встроенной поддержки темной темы, но мы можем использовать пакет `next-themes` для управления темами:

```bash
npm install next-themes
```

```jsx
// src/providers/ThemeProvider.tsx
'use client';

import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { ReactNode, useEffect, useState } from 'react';

export function ThemeProvider({ children }: { children: ReactNode }) {
  // Предотвращаем гидратацию
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="light"
      value={{
        light: 'light',
        dark: 'theme-dark'
      }}
    >
      {children}
    </NextThemeProvider>
  );
}
```

Затем используем провайдер в корневом `layout.tsx`:

```jsx
import { ThemeProvider } from '@/providers/ThemeProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <ThemeProvider>
          {/* ... */}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### 28.19. Использование логических CSS свойств

В проекте BAZAAR используются логические CSS свойства вместо физических (direction-based) для лучшей поддержки интернационализации:

```css
/* Использование логических свойств */
.element {
  margin-block-start: 1rem;  /* вместо margin-top */
  margin-block-end: 1rem;    /* вместо margin-bottom */
  margin-inline-start: 1rem; /* вместо margin-left для LTR */
  margin-inline-end: 1rem;   /* вместо margin-right для LTR */
  
  padding-block: 1rem;       /* padding сверху и снизу */
  padding-inline: 1rem;      /* padding слева и справа */
  
  inline-size: 100%;         /* вместо width */
  block-size: 100%;          /* вместо height */
}
```

Этот подход следует сохранить и в Next.js проекте для обеспечения лучшей доступности и возможности будущей интернационализации.

### 28.20. Оптимизация CSS для продакшн

Для оптимизации CSS в продакшн-сборке Next.js можно использовать CSS Minimizer Plugin, который по умолчанию включен в оптимизацию Next.js.

Для дополнительной оптимизации CSS можно добавить PostCSS плагины в файл `postcss.config.js`:

```js
module.exports = {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
    'postcss-logical': {}, // Для конвертации логических свойств в физические для старых браузеров
    'cssnano': process.env.NODE_ENV === 'production' ? {
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
      }],
    } : false
  },
};
```

### 28.21. Рекомендации по дальнейшему улучшению стилей

1. **Внедрение CSS Modules**: Для больших проектов стоит рассмотреть переход на CSS Modules для лучшей инкапсуляции стилей компонентов.

2. **Использование Sass/SCSS**: Next.js имеет встроенную поддержку Sass. Можно переименовать файлы `.css` в `.scss` и добавить препроцессор для более мощных возможностей (миксины, вложенность).

3. **Критический CSS**: Использовать инлайн-критический CSS для ускорения загрузки страницы.

4. **Прогрессивное улучшение**: Обеспечить базовую функциональность для браузеров без поддержки современных CSS-фич.

5. **Семантическое использование классов**: Продолжать следовать методологии БЭМ для структурированного и понятного CSS.
// ... existing code ...

## 29. Миграция вспомогательных утилит и дополнительных файлов

В процессе миграции на Next.js важно учесть не только основные компоненты и страницы, но и вспомогательные утилиты, которые обеспечивают правильную работу приложения. В этом разделе рассмотрим миграцию вспомогательных функций и файлов.

### 29.1. Миграция файлов изображений

При миграции изображений следует учесть, что в Next.js лучше всего размещать статические изображения в директории `public` или использовать компонент `Image` из Next.js.

```bash
# Структура папок для статических ресурсов
public/
  ├── images/
  │   ├── logo.svg
  │   ├── icons/
  │   ├── backgrounds/
  │   ├── products/
  │   └── banners/
  ├── fonts/
  │   ├── SourceSansPro-Regular.woff2
  │   └── SourceSansPro-Bold.woff2
  └── favicon.ico
```

### 29.2. Миграция хуков

Переносим пользовательские хуки из проекта в новую структуру Next.js:

```jsx
// src/hooks/useLocalStorage.ts
'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  // Состояние для хранения значения
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Инициализация при первом рендере
  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.log('Ошибка получения из localStorage:', error);
    }
  }, [key]);

  // Функция для обновления значения
  const setValue = (value: T) => {
    try {
      // Сохраняем в состоянии
      setStoredValue(value);
      
      // Сохраняем в localStorage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.log('Ошибка сохранения в localStorage:', error);
    }
  };

  return [storedValue, setValue];
}
```

### 29.3. Миграция утилит для работы с датами

```typescript
// src/utils/date.ts
// Форматирование даты
export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
};

// Получение относительного времени
export const getRelativeTime = (date: Date): string => {
  const rtf = new Intl.RelativeTimeFormat('ru', { numeric: 'auto' });
  const now = new Date();
  const diffInMs = date.getTime() - now.getTime();
  const diffInDays = Math.round(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) return 'Сегодня';
  if (diffInDays === 1) return 'Завтра';
  if (diffInDays === -1) return 'Вчера';
  
  if (diffInDays > 0 && diffInDays < 7) return rtf.format(diffInDays, 'day');
  if (diffInDays < 0 && diffInDays > -7) return rtf.format(diffInDays, 'day');
  
  return formatDate(date);
};
```

### 29.4. Миграция утилит для валидации

```typescript
// src/utils/validation.ts
// Валидация email
export const isValidEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Валидация телефона (российский формат)
export const isValidPhone = (phone: string): boolean => {
  const re = /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
  return re.test(phone);
};

// Форматирование телефона
export const formatPhone = (phone: string): string => {
  let cleaned = ('' + phone).replace(/\D/g, '');
  
  // Проверяем длину
  if (cleaned.length < 10 || cleaned.length > 11) return phone;
  
  // Добавляем 7, если номер начинается с 9, 8 или не хватает первой цифры
  if (cleaned.length === 10) {
    cleaned = '7' + cleaned;
  } else if (cleaned.startsWith('8')) {
    cleaned = '7' + cleaned.substring(1);
  }
  
  // Форматируем
  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/);
  if (match) {
    return `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`;
  }
  
  return phone;
};
```

### 29.5. Миграция утилит для работы с ценами

```typescript
// src/utils/price.ts
// Форматирование цены
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0
  }).format(price);
};

// Расчет скидки
export const calculateDiscount = (originalPrice: number, discountPrice: number): number => {
  if (originalPrice <= 0 || discountPrice >= originalPrice) return 0;
  
  const discount = Math.round(((originalPrice - discountPrice) / originalPrice) * 100);
  return discount;
};

// Форматирование скидки
export const formatDiscount = (discount: number): string => {
  return `-${discount}%`;
};
```

### 29.6. Миграция утилит для работы с URL и SEO

```typescript
// src/utils/url.ts
// Создание URL-имени из строки
export const slugify = (str: string): string => {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Создание канонического URL
export const getCanonicalUrl = (path: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bazaar-flowers.ru';
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`;
};

// Получение OpenGraph изображения
export const getOgImageUrl = (imageUrl: string): string => {
  if (!imageUrl) return '';
  
  if (imageUrl.startsWith('http')) {
    return imageUrl;
  }
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://bazaar-flowers.ru';
  return `${baseUrl}${imageUrl.startsWith('/') ? imageUrl : `/${imageUrl}`}`;
};
```

### 29.7. Миграция constants-файлов

```typescript
// src/constants/routes.ts
export const ROUTES = {
  HOME: '/',
  CATALOG: '/catalog',
  PRODUCT: '/catalog/[slug]',
  CART: '/cart',
  CHECKOUT: '/checkout',
  ABOUT: '/about',
  CONTACTS: '/contacts',
  DELIVERY: '/delivery',
  BLOG: '/blog',
  BLOG_POST: '/blog/[slug]',
  STORES: '/stores',
  ACCOUNT: '/account',
  WISHLIST: '/wishlist',
  QUIZ: '/quiz',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  LOGIN: '/login',
  REGISTER: '/register',
};

// src/constants/config.ts
export const CONFIG = {
  SITE_NAME: 'BAZAAR',
  SITE_DESCRIPTION: 'Интернет-магазин цветов и букетов',
  DEFAULT_META_IMAGE: '/images/og-image.jpg',
  SOCIAL_MEDIA: {
    INSTAGRAM: 'https://instagram.com/bazaar',
    FACEBOOK: 'https://facebook.com/bazaar',
    TELEGRAM: 'https://t.me/bazaar',
    WHATSAPP: 'https://wa.me/79001112233',
  },
  CONTACTS: {
    PHONE: '+7 (900) 111-22-33',
    EMAIL: 'info@bazaar-flowers.ru',
    ADDRESS: 'г. Москва, ул. Цветочная, д. 42',
  },
  CURRENCY: 'RUB',
  DEFAULT_LANGUAGE: 'ru',
  DELIVERY_REGIONS: ['Москва', 'Санкт-Петербург', 'Казань'],
};
```

### 29.8. Миграция файлов локализации

```typescript
// src/i18n/messages.ts
export const MESSAGES = {
  COMMON: {
    LOADING: 'Загрузка...',
    ERROR: 'Произошла ошибка',
    TRY_AGAIN: 'Попробовать снова',
    SAVE: 'Сохранить',
    CANCEL: 'Отмена',
    CLOSE: 'Закрыть',
    BACK: 'Назад',
    NEXT: 'Далее',
    SUBMIT: 'Отправить',
    VIEW_ALL: 'Смотреть все',
    SEE_MORE: 'Подробнее',
    NOT_FOUND: 'Не найдено',
    SEARCH: 'Поиск',
    MENU: 'Меню',
  },
  CART: {
    TITLE: 'Корзина',
    EMPTY_CART: 'Ваша корзина пуста',
    CONTINUE_SHOPPING: 'Продолжить покупки',
    PROCEED_TO_CHECKOUT: 'Оформить заказ',
    CLEAR_CART: 'Очистить корзину',
    TOTAL: 'Итого',
    ITEM: 'товар',
    ITEMS: 'товара',
    MANY_ITEMS: 'товаров',
    REMOVE_ITEM: 'Удалить товар',
    QUANTITY: 'Количество',
    ADDED_TO_CART: 'Товар добавлен в корзину',
  },
  PRODUCT: {
    ADD_TO_CART: 'В корзину',
    BUY_NOW: 'Купить сейчас',
    ADD_TO_WISHLIST: 'В избранное',
    DELIVERY_INFO: 'Информация о доставке',
    DETAILS: 'Детали',
    DESCRIPTION: 'Описание',
    SPECIFICATIONS: 'Характеристики',
    REVIEWS: 'Отзывы',
    RELATED_PRODUCTS: 'Похожие товары',
    OUT_OF_STOCK: 'Нет в наличии',
    IN_STOCK: 'В наличии',
  },
  FORM: {
    NAME: 'Имя',
    EMAIL: 'Email',
    PHONE: 'Телефон',
    MESSAGE: 'Сообщение',
    REQUIRED_FIELD: 'Обязательное поле',
    INVALID_EMAIL: 'Некорректный email',
    INVALID_PHONE: 'Некорректный номер телефона',
    THANKS_MESSAGE: 'Спасибо за ваше сообщение! Мы свяжемся с вами в ближайшее время.',
  },
  CHECKOUT: {
    DELIVERY_ADDRESS: 'Адрес доставки',
    PAYMENT_METHOD: 'Способ оплаты',
    ORDER_SUMMARY: 'Ваш заказ',
    PLACE_ORDER: 'Разместить заказ',
    SHIPPING: 'Доставка',
    DISCOUNT: 'Скидка',
  },
};
```

### 29.9. Рекомендации по миграции вспомогательных файлов

1. **Проверка импортов**: При переносе вспомогательных файлов убедитесь, что все импорты обновлены в соответствии с новой структурой проекта.

2. **Клиентские компоненты**: Отметьте любые компоненты, использующие браузерные API, как клиентские с помощью директивы `'use client'`.
