/**
 * Интерфейс для коллекции продуктов
 */
export interface Collection {
  /** Идентификатор коллекции */
  id: string | number;
  /** Название коллекции */
  name: string;
  /** Описание коллекции */
  description?: string;
  /** URL изображения коллекции */
  imageUrl: string;
  /** Ссылка на страницу коллекции */
  url: string;
  /** Количество товаров в коллекции */
  productCount?: number;
  /** Флаг новой коллекции */
  isNew?: boolean;
}

/**
 * Интерфейс для компонента коллекций
 */
export interface CollectionProps {
  /** Список коллекций */
  collections: Collection[];
  /** Дополнительные CSS-классы */
  className?: string;
  /** Компактный режим отображения */
  compact?: boolean;
  /** Максимальное количество коллекций для отображения */
  limit?: number;
} 