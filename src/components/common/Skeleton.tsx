import { SkeletonProps } from '../../types';

/**
 * Компонент Skeleton для отображения состояния загрузки данных.
 * Используется для предотвращения "скачков" в интерфейсе во время загрузки.
 * 
 * @param {SkeletonProps} props - Пропсы компонента
 * @returns {React.ReactElement} Компонент скелетона
 * 
 * @example
 * // Базовое использование
 * <Skeleton height="200px" />
 * 
 * @example
 * // С кастомными стилями
 * <Skeleton 
 *   width="80%" 
 *   height="24px" 
 *   borderRadius="12px"
 *   className="product-title-skeleton"
 * />
 */
const Skeleton = ({ 
  width = '100%', 
  height = '1rem', 
  borderRadius = '4px',
  className = '',
  style = {}
}: SkeletonProps) => {
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
      aria-hidden="true" // Скрываем от скринридеров
      role="presentation" // Указываем роль для лучшей семантики
      data-testid="skeleton-loader" // Идентификатор для тестирования
    />
  );
};

export default Skeleton; 