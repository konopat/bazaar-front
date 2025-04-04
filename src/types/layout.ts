/**
 * Интерфейс для элемента навигации
 */
export interface NavItem {
  /** Название пункта меню */
  name: string;
  /** URL для перехода */
  href: string;
  /** Подпункты меню (для вложенной навигации) */
  children?: NavItem[];
  /** Флаг активности пункта */
  isActive?: boolean;
  /** Иконка для пункта меню (если нужна) */
  icon?: string;
}

/**
 * Интерфейс для компонента навигации
 */
export interface NavigationProps {
  /** Пункты навигации (не обязательно, компонент может иметь предопределенные пункты) */
  items?: NavItem[];
  /** Дополнительные CSS-классы */
  className?: string;
  /** Обработчик выбора пункта навигации */
  onItemClick?: (item: NavItem) => void;
  /** Обработчик клика по ссылке (для совместимости) */
  onLinkClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  /** Ориентация навигации */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * Интерфейс для компонента бокового меню
 */
export interface SideMenuProps {
  /** Флаг открытия меню */
  isOpen: boolean;
  /** Обработчик закрытия меню */
  onClose: () => void;
  /** Обработчик клика по ссылке (для совместимости) */
  onLinkClick?: (e: React.MouseEvent<HTMLElement>) => void;
  /** Пункты меню (не обязательно, компонент может иметь предопределенные пункты) */
  menuItems?: NavItem[];
  /** Дополнительные CSS-классы */
  className?: string;
  /** Позиция меню */
  position?: 'left' | 'right';
} 