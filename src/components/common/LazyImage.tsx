import { useState, useEffect, useRef } from 'react';
import Skeleton from './Skeleton';
import '../../styles/components/LazyImage.css';

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
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Важно! Сбрасываем состояние загрузки при изменении источника изображения
  useEffect(() => {
    setLoading(true);
    setError(false);
    
    // Проверяем, загружено ли уже изображение из кэша
    if (imgRef.current && imgRef.current.complete) {
      setLoading(false);
    }
  }, [src]);
  
  const handleLoad = () => {
    setLoading(false);
  };
  
  const handleError = () => {
    setLoading(false);
    setError(true);
  };

  // Вычисляем стили контейнера с учетом соотношения сторон
  const containerStyle: React.CSSProperties = aspectRatio
    ? {
        position: 'relative',
        width,
        height: 0,
        paddingBottom: `${(1 / aspectRatio) * 100}%`
      }
    : { width, height };

  // Вычисляем стили для изображения
  const imageStyle: React.CSSProperties = {
    objectFit,
    ...(aspectRatio
      ? {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }
      : {})
  };

  return (
    <div 
      className={`lazy-image__container ${containerClassName}`} 
      style={containerStyle}
    >
      {/* Скелетон всегда находится в том же контейнере, что и изображение */}
      {loading && (
        <div className="lazy-image__skeleton" style={aspectRatio ? { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' } : {}}>
          <Skeleton
            width="100%"
            height="100%"
            className="lazy-image__skeleton-animation"
          />
        </div>
      )}
      
      <img
        ref={imgRef}
        className={`lazy-image__img ${className} ${loading ? 'lazy-image__img--hidden' : ''}`}
        src={error ? fallbackSrc : src}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        style={imageStyle}
      />
    </div>
  );
};

export default LazyImage; 