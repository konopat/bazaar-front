import { IconName } from "./icon";
import { BlogPost } from "../mocks/blog";
import React from 'react';

/**
 * Интерфейс для компонента логотипа
 */
export interface BazaarLogoProps {
  /** Вариант отображения (полный или компактный) */
  variant?: 'full' | 'compact';
  /** Размер логотипа */
  size?: 'small' | 'medium' | 'large';
  /** Дополнительные CSS-классы */
  className?: string;
}

/**
 * Интерфейс для карточки блога
 */
export interface BlogPostCardProps {
  /** Данные о посте блога */
  post: BlogPost;
  /** Дополнительные CSS-классы */
  className?: string;
}

/**
 * Интерфейс для поля поиска
 */
export interface SearchFieldProps {
  /** Значение поля поиска */
  value: string;
  /** Обработчик изменения значения */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Плейсхолдер */
  placeholder?: string;
  /** Дополнительные CSS-классы */
  className?: string;
}

/**
 * Интерфейс для компонента социальных ссылок
 */
export interface SocialLinksProps {
  /** Список социальных сетей для отображения */
  networks?: Array<'telegram' | 'whatsapp' | 'instagram'>;
  /** Размер иконок */
  iconSize?: number;
  /** Цвет иконок */
  iconColor?: string;
  /** Дополнительные CSS-классы */
  className?: string;
  /** Отображать текст с названием соцсети */
  showText?: boolean;
}

/**
 * Интерфейс для компонента адресов магазинов
 */
export interface StoreAddressesProps {
  /** Дополнительные CSS-классы */
  className?: string;
  /** Компактный режим отображения */
  compact?: boolean;
} 