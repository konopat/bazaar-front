/**
 * Интерфейс пропсов для компонента Skeleton
 */
export interface SkeletonProps {
  /** Ширина скелетона (строка или число в пикселях) */
  width?: string | number;
  /** Высота скелетона (строка или число в пикселях) */
  height?: string | number;
  /** Радиус скругления углов (строка или число в пикселях) */
  borderRadius?: string | number;
  /** Дополнительные CSS-классы */
  className?: string;
  /** Дополнительные инлайн-стили */
  style?: React.CSSProperties;
} 