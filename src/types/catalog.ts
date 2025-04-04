/**
 * Интерфейс для анимации добавления в корзину
 */
export interface AddToCartAnimationProps {
  /** Идентификатор продукта */
  productId: number;
  /** Флаг видимости анимации */
  isVisible: boolean;
  /** Позиция клика для старта анимации */
  clickPosition: { x: number; y: number };
  /** Обработчик окончания анимации */
  onAnimationEnd: () => void;
}

/**
 * Интерфейс для цветового фильтра
 */
export interface ColorFilterProps {
  /** Выбранный цвет (может быть null, если ничего не выбрано) */
  selectedColor: string | null;
  /** Обработчик выбора цвета */
  onColorSelect: (color: string | null) => void;
  /** Дополнительные CSS-классы */
  className?: string;
}

/**
 * Интерфейс для фильтра цены
 */
export interface PriceFilterProps {
  /** Выбранный диапазон цен */
  selectedPrice: { min: number; max: number | null } | null;
  /** Обработчик выбора диапазона цен */
  onPriceSelect: (price: { min: number; max: number | null } | null) => void;
  /** Дополнительные CSS-классы */
  className?: string;
} 