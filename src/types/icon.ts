/**
 * Типы иконок, доступные в приложении
 */
export type IconName = 
  | 'telegram' 
  | 'whatsapp' 
  | 'instagram' 
  | 'sun' 
  | 'moon' 
  | 'cart' 
  | 'profile'
  | 'location' 
  | 'clock' 
  | 'phone' 
  | 'check' 
  | 'truck' 
  | 'store' 
  | 'lightning'
  | 'leaf' 
  | 'diamond' 
  | 'heart' 
  | 'handshake' 
  | 'search'
  | 'download';

/**
 * Интерфейс пропсов компонента Icon
 */
export interface IconProps {
  /** Название иконки из предопределенного набора */
  name: IconName;
  /** Размер иконки в пикселях */
  size?: number;
  /** Цвет иконки (любое допустимое значение CSS color) */
  color?: string;
  /** Дополнительные CSS-классы */
  className?: string;
} 