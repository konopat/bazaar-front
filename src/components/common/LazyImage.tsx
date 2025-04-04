import { useState, useEffect, useRef } from 'react';
import Skeleton from './Skeleton';
import { LazyImageProps } from '../../types';
import '../../styles/components/LazyImage.css';

/**
 * Компонент для отображения изображений со скелетоном загрузки.
 * Предотвращает сдвиги макета и обеспечивает плавную загрузку.
 * 
 * @param {LazyImageProps} props - Пропсы компонента
 * @returns {React.ReactElement} LazyImage компонент
 */
const LazyImage = ({
  src,
  alt,
  fallbackSrc = '/images/placeholder.png',
  className = '',
  containerClassName = '',
  objectFit = 'contain',
  width = '100%',
  height = '100%',
  aspectRatio,
  caption
}: LazyImageProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Сбрасываем состояние загрузки при изменении источника изображения
  useEffect(() => {
    setLoading(true);
    setError(false);
    
    // Проверяем, загружено ли уже изображение из кэша
    if (imgRef.current && imgRef.current.complete) {
      setLoading(false);
    }
  }, [src]);
  
  /**
   * Обработчик успешной загрузки изображения
   */
  const handleLoad = () => {
    setLoading(false);
  };
  
  /**
   * Обработчик ошибки загрузки изображения
   */
  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  // Базовые стили контейнера (сбрасываем стандартные отступы)
  const baseContainerStyle: React.CSSProperties = {
    margin: 0, // Сбрасываем margins для figure
    width, 
    height
  };

  // Дополнительные стили для контейнера с соотношением сторон
  const aspectRatioContainerStyle: React.CSSProperties = aspectRatio
    ? {
        ...baseContainerStyle,
        position: 'relative',
        height: 0,
        // paddingBlockEnd работает не везде для аспектного соотношения, поэтому дублируем свойства
        paddingBlockEnd: `${(1 / aspectRatio) * 100}%`,
        paddingBottom: `${(1 / aspectRatio) * 100}%` // Для старых браузеров
      }
    : baseContainerStyle;

  // Стили для изображения
  const imageStyle: React.CSSProperties = aspectRatio
    ? {
        objectFit,
        position: 'absolute',
        // Используем логические и физические свойства для максимальной совместимости
        insetBlockStart: 0,
        insetBlockEnd: 0,
        insetInlineStart: 0,
        insetInlineEnd: 0,
        inset: 0, // Сокращенное свойство для поддерживающих браузеров
        width: '100%',
        height: '100%'
      }
    : {
        objectFit,
        width: '100%',
        height: '100%'
      };

  // Стили для контейнера скелетона
  const skeletonContainerStyle: React.CSSProperties = aspectRatio
    ? {
        position: 'absolute',
        // Логические свойства позиционирования
        insetBlockStart: 0,
        insetBlockEnd: 0,
        insetInlineStart: 0,
        insetInlineEnd: 0,
        inset: 0, // Сокращенное свойство для поддерживающих браузеров
        width: '100%',
        height: '100%'
      }
    : {
        width: '100%',
        height: '100%'
      };

  return (
    <figure 
      className={`lazy-image__container ${containerClassName}`} 
      style={aspectRatioContainerStyle}
    >
      {/* Скелетон-загрузчик */}
      {loading && (
        <span 
          className="lazy-image__skeleton" 
          style={skeletonContainerStyle}
          role="presentation"
        >
          <Skeleton
            width="100%"
            height="100%"
            className="lazy-image__skeleton-animation"
          />
        </span>
      )}
      
      <img
        ref={imgRef}
        className={`lazy-image__img ${className} ${loading ? 'lazy-image__img--hidden' : ''}`}
        src={error ? fallbackSrc : src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        style={imageStyle}
        loading="lazy" // Встроенная ленивая загрузка для современных браузеров
      />
      
      {/* Подпись к изображению для лучшей семантики */}
      {caption && <figcaption className="lazy-image__caption">{caption}</figcaption>}
    </figure>
  );
};

export default LazyImage; 