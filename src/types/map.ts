/**
 * Базовая информация о магазине
 */
export interface Store {
  /** Идентификатор магазина */
  id: string;
  /** Название магазина */
  name: string;
  /** Адрес магазина */
  address: string;
  /** Координаты магазина [широта, долгота] */
  coordinates: [number, number];
  /** Телефон магазина (опциональный) */
  phone?: string;
  /** URL изображения магазина (опциональный) */
  photo?: string;
  /** Расписание работы магазина (опциональное) */
  workSchedule?: {
    monday: { open: string; close: string; dayOff: boolean };
    tuesday: { open: string; close: string; dayOff: boolean };
    wednesday: { open: string; close: string; dayOff: boolean };
    thursday: { open: string; close: string; dayOff: boolean };
    friday: { open: string; close: string; dayOff: boolean };
    saturday: { open: string; close: string; dayOff: boolean };
    sunday: { open: string; close: string; dayOff: boolean };
  };
}

/**
 * Интерфейс для компонента списка магазинов
 */
export interface StoresListProps {
  /** Список магазинов */
  stores: Store[];
  /** ID выбранного магазина */
  selectedStoreId?: string;
  /** Обработчик выбора магазина */
  onStoreSelect: (storeId: string) => void;
  /** Дополнительные CSS-классы */
  className?: string;
}

/**
 * Интерфейс для компонента детальной информации о магазине
 */
export interface StoreDetailsProps {
  /** Информация о магазине */
  store?: Store;
  /** Дополнительные CSS-классы */
  className?: string;
}

/**
 * Интерфейс для компонента карты магазинов
 */
export interface StoresMapProps {
  /** Список магазинов */
  stores: Store[];
  /** ID выбранного магазина */
  selectedStoreId?: string;
  /** Обработчик выбора магазина */
  onStoreSelect?: (storeId: string) => void;
  /** Обработчик готовности карты */
  onMapReady?: () => void;
  /** Флаг скрытия списка магазинов */
  hideStoresList?: boolean;
  /** Начальный зум карты */
  initialZoom?: number;
  /** Дополнительные CSS-классы */
  className?: string;
}

/**
 * Интерфейс для модального окна с картой магазинов
 */
export interface StoresModalProps {
  /** Флаг открытия модального окна */
  isOpen: boolean;
  /** Обработчик закрытия */
  onClose: () => void;
  /** Начальное состояние магазина для отображения (опциональное) */
  initialStore?: Store;
} 