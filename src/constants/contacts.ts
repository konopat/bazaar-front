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
  coordinates: [number, number]; // [широта, долгота]
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
    coordinates: [52.247377, 104.360790],
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
    coordinates: [52.258128, 104.319171],
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
    coordinates: [52.288591, 104.271129],
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

// Интерфейс для формы контактов
export interface ContactFormField {
  id: string;
  name: string;
  label: string;
  type: string;
  required: boolean;
  placeholder?: string;
}

// Поля формы обратной связи
export const CONTACT_FORM_FIELDS: ContactFormField[] = [
  {
    id: 'name',
    name: 'name',
    label: 'Ваше имя',
    type: 'text',
    required: true,
    placeholder: 'Введите ваше имя'
  },
  {
    id: 'email',
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    placeholder: 'Введите ваш email'
  },
  {
    id: 'phone',
    name: 'phone',
    label: 'Телефон',
    type: 'tel',
    required: true,
    placeholder: 'Введите ваш номер телефона'
  },
  {
    id: 'message',
    name: 'message',
    label: 'Сообщение',
    type: 'textarea',
    required: true,
    placeholder: 'Введите ваше сообщение'
  }
]; 