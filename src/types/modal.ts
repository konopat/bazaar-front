/**
 * Конфигурация скелетонов для модального окна
 */
export interface SkeletonConfig {
  /** Количество скелетонов */
  count?: number;
  /** Высота скелетона */
  height?: string | number;
  /** Отступ между скелетонами */
  spacing?: string | number;
}

/**
 * Интерфейс пропсов для компонента Modal
 */
export interface ModalProps {
  /** Флаг, определяющий, открыто ли модальное окно */
  isOpen: boolean;
  /** Функция для закрытия модального окна */
  onClose: () => void;
  /** Содержимое модального окна */
  children: React.ReactNode;
  /** Заголовок модального окна */
  title?: string;
  /** Флаг, указывающий на то, загружается ли содержимое */
  isLoading?: boolean;
  /** Конфигурация для скелетонов при загрузке */
  skeletonConfig?: SkeletonConfig;
  /** Дополнительный класс для модального окна */
  className?: string;
  /** HTML id для модального окна (для связывания с aria-labelledby) */
  id?: string;
} 