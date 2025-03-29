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

// Интерфейс для времени работы
export interface WorkingHours {
  open: string; // Время открытия в формате "HH:MM"
  close: string; // Время закрытия в формате "HH:MM"
  dayOff: boolean; // Выходной день или нет
}

// Интерфейс для рабочего расписания
export interface WorkSchedule {
  monday: WorkingHours;
  tuesday: WorkingHours;
  wednesday: WorkingHours;
  thursday: WorkingHours;
  friday: WorkingHours;
  saturday: WorkingHours;
  sunday: WorkingHours;
}

// Интерфейс для магазина
export interface Store {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number]; // [долгота, широта]
  phone: string; // Телефон магазина
  workSchedule: WorkSchedule; // Расписание работы
  photo: string; // URL фотографии входной группы
}

// Список магазинов
export const STORES: Store[] = [
  {
    id: '1',
    name: 'Центральный магазин',
    address: 'Иркутск, Маршала Жукова 15А',
    coordinates: [104.280094, 52.287430],
    phone: '+7 (3952) 48-66-77',
    workSchedule: {
      monday: { open: '10:00', close: '19:00', dayOff: false },
      tuesday: { open: '10:00', close: '19:00', dayOff: false },
      wednesday: { open: '10:00', close: '19:00', dayOff: false },
      thursday: { open: '10:00', close: '19:00', dayOff: false },
      friday: { open: '10:00', close: '19:00', dayOff: false },
      saturday: { open: '10:00', close: '18:00', dayOff: false },
      sunday: { open: '10:00', close: '18:00', dayOff: false }
    },
    photo: '/images/stores/store-central.jpg'
  },
  {
    id: '2',
    name: 'Магазин на Байкальской',
    address: 'Иркутск, Байкальская 180/2',
    coordinates: [104.281763, 52.289056],
    phone: '+7 (3952) 48-77-88',
    workSchedule: {
      monday: { open: '09:00', close: '20:00', dayOff: false },
      tuesday: { open: '09:00', close: '20:00', dayOff: false },
      wednesday: { open: '09:00', close: '20:00', dayOff: false },
      thursday: { open: '09:00', close: '20:00', dayOff: false },
      friday: { open: '09:00', close: '20:00', dayOff: false },
      saturday: { open: '10:00', close: '19:00', dayOff: false },
      sunday: { open: '10:00', close: '19:00', dayOff: false }
    },
    photo: '/images/stores/store-baikalskaya.jpg'
  },
  {
    id: '3',
    name: 'Магазин на Гаврилова',
    address: 'Иркутск, Николая Гаврилова 4',
    coordinates: [104.285513, 52.286052],
    phone: '+7 (3952) 48-99-00',
    workSchedule: {
      monday: { open: '09:00', close: '19:00', dayOff: false },
      tuesday: { open: '09:00', close: '19:00', dayOff: false },
      wednesday: { open: '09:00', close: '19:00', dayOff: false },
      thursday: { open: '09:00', close: '19:00', dayOff: false },
      friday: { open: '09:00', close: '19:00', dayOff: false },
      saturday: { open: '10:00', close: '18:00', dayOff: false },
      sunday: { open: '', close: '', dayOff: true }
    },
    photo: '/images/stores/store-gavrilova.jpg'
  },
]; 