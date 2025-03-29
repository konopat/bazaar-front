import { useState, useEffect } from 'react';
import Skeleton from './Skeleton';
import './LazyImage.css';

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

/**
 * Компонент для отображения изображений со скелетоном загрузки
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
  aspectRatio
}: LazyImageProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Важно! Сбрасываем состояние загрузки при изменении источника изображения
  useEffect(() => {
    setLoading(true);
    setError(false);
  }, [src]);
  
  const handleLoad = () => {
    setLoading(false);
  };
  
  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  // Вычисляем стили контейнера с учетом соотношения сторон
  const containerStyle = {
    width, 
    height,
    // Если задано соотношение сторон, применяем его
    ...(aspectRatio ? {
      paddingBottom: `${(1 / aspectRatio) * 100}%`,
      height: 0
    } : {})
  };

  return (
    <div 
      className={`lazy-image__container ${containerClassName}`} 
      style={containerStyle}
    >
      {loading && (
        <div className="lazy-image__skeleton">
          <Skeleton
            width="100%"
            height="100%"
            className="lazy-image__skeleton-animation"
          />
        </div>
      )}
      
      <img
        className={`lazy-image__img ${className} ${loading ? 'lazy-image__img--hidden' : ''}`}
        src={error ? fallbackSrc : src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        style={{ 
          objectFit,
          // Если задано соотношение сторон, позиционируем изображение абсолютно
          ...(aspectRatio ? {
            position: 'absolute',
            top: 0,
            left: 0
          } : {})
        }}
      />
    </div>
  );
};

export default LazyImage; 