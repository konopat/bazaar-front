/**
 * Базовый интерфейс для продукта
 */
export interface Product {
  /** Идентификатор продукта */
  id: string | number;
  /** Цена продукта */
  price: number;
  /** URL изображения продукта */
  image: string;
  /** Описание продукта (опционально) */
  description?: string;
  /** Цвет продукта (опционально) */
  color?: string;
}

/**
 * Интерфейс для карточки продукта (полный)
 */
export interface ProductCardProps extends Product {
  /** Название товара для каталога */
  title?: string;
  /** Название товара для корзины */
  name?: string;
  /** Старая цена (для отображения скидки) */
  oldPrice?: number;
  /** Категория товара */
  category?: string;
  /** Флаг новинки */
  isNew?: boolean;
  /** Флаг бестселлера */
  isBestseller?: boolean;
  /** Флаг специального предложения */
  isSpecialOffer?: boolean;
  /** Флаг горячего предложения */
  isHot?: boolean;
  /** Флаг, показывающий что карточка отображается в корзине */
  inCart?: boolean;
  /** Обработчик клика по карточке */
  onClick?: () => void;
}

/**
 * Интерфейс для детальной информации о продукте
 */
export interface ProductDetailProps {
  /** Идентификатор продукта */
  id: number;
  /** Название товара */
  title: string;
  /** Цена продукта */
  price: number;
  /** URL изображения продукта */
  image: string;
  /** Описание продукта (опционально) */
  description?: string;
  /** Цвет продукта (опционально) */
  color?: string;
} 