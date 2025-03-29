import type { IconName } from '../types/icon';

// Основной номер телефона
export const PHONE_NUMBER = '+7 (908) 774-00-15';

// Интерфейс для социальной сети
export interface SocialNetwork {
  name: IconName;
  label: string;
  url: string;
}

// Список социальных сетей
export const SOCIAL_NETWORKS: SocialNetwork[] = [
  { name: 'telegram', label: 'Telegram', url: '#' },
  { name: 'whatsapp', label: 'WhatsApp', url: '#' },
  { name: 'instagram', label: 'Instagram', url: '#' },
];

// Интерфейс для магазина
export interface Store {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number]; // [долгота, широта]
}

// Список магазинов
export const STORES: Store[] = [
  {
    id: '1',
    name: 'Центральный магазин',
    address: 'Иркутск, Маршала Жукова (пр) 15А',
    coordinates: [104.280094, 52.287430],
  },
  {
    id: '2',
    name: 'Магазин на Байкальской',
    address: 'Иркутск, Байкальская 180/2',
    coordinates: [104.281763, 52.289056],
  },
  {
    id: '3',
    name: 'Магазин на Гаврилова',
    address: 'Иркутск, Николая Гаврилова 4',
    coordinates: [104.285513, 52.286052],
  },
]; 