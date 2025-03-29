# Компонент LazyImage для оптимизации загрузки изображений

## Описание

`LazyImage` - это простой и эффективный компонент для оптимизированной загрузки изображений с поддержкой следующих возможностей:

- Отображение скелетона во время загрузки изображения
- Автоматическое использование запасного изображения при ошибках загрузки
- Настройка соотношения сторон и способа отображения (object-fit)
- Поддержка всех стандартных атрибутов изображения (alt, title, srcset и т.д.)

## Установка

Компонент уже включен в проект и готов к использованию.

## Использование

```tsx
import LazyImage from '../components/common/LazyImage';

// Простой пример
<LazyImage
  src="/images/product.jpg"
  alt="Описание продукта"
/>

// Пример с дополнительными параметрами
<LazyImage
  src="/images/product.jpg"
  alt="Описание продукта"
  fallbackSrc="/images/placeholder.jpg"
  containerClassName="product-image-container"
  className="product-image"
  aspectRatio={1} // Квадратное изображение
  objectFit="cover"
/>
```

## Пропсы

| Проп | Тип | По умолчанию | Описание |
|------|-----|-------------|----------|
| `src` | string | - | URL изображения (обязательный) |
| `alt` | string | - | Альтернативный текст для изображения (обязательный) |
| `fallbackSrc` | string | '/images/store-placeholder.jpg' | URL запасного изображения при ошибке загрузки |
| `className` | string | '' | Класс для элемента `img` |
| `containerClassName` | string | '' | Класс для контейнера изображения |
| `skeletonClassName` | string | '' | Класс для скелетона загрузки |
| `aspectRatio` | number | undefined | Соотношение сторон (ширина/высота), например 16/9 |
| `objectFit` | 'cover' \| 'contain' \| 'fill' \| 'none' \| 'scale-down' | 'cover' | Способ отображения изображения |

Компонент также принимает все стандартные атрибуты HTML-элемента `img`.

## Примеры использования

### Карточка продукта
```tsx
<LazyImage
  src={product.image}
  alt={product.name}
  fallbackSrc="/images/product-placeholder.jpg"
  containerClassName="product-card__image-wrapper"
  className="product-card__image"
  aspectRatio={1}
/>
```

### Изображение баннера
```tsx
<LazyImage
  src={banner.imageUrl}
  alt={banner.title}
  containerClassName="banner__image-container"
  className="banner__image"
  aspectRatio={16/9}
  objectFit="cover"
/>
```

### Аватар пользователя
```tsx
<LazyImage
  src={user.avatar}
  alt={`${user.name}'s avatar`}
  fallbackSrc="/images/user-placeholder.png"
  containerClassName="user-avatar-container"
  className="user-avatar"
  aspectRatio={1}
  objectFit="cover"
/>
```

## Важное примечание

При использовании в компонентах, где требуется обновление изображения (например, при выборе другого элемента из списка), рекомендуется добавлять атрибут `key`:

```tsx
<LazyImage
  src={store.photo}
  alt={`Магазин ${store.name}`}
  key={`store-photo-${store.id}`} // Гарантирует обновление при смене магазина
  // другие пропсы...
/>
```

Это гарантирует корректное отображение скелетона при каждой смене источника изображения. 