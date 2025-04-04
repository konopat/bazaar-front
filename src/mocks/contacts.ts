export interface SocialNetwork {
  id: number;
  name: string;
  url: string;
  icon: string;
}

export interface WorkingHours {
  days: string;
  hours: string;
}

export interface WorkSchedule {
  id: number;
  type: string;
  hours: WorkingHours[];
}

export interface Store {
  id: number;
  name: string;
  address: string;
  phone: string;
  coordinates: [number, number];
  workSchedule: WorkSchedule;
  photo: string;
}

export const MAIN_PHONE = '+7 (999) 123-45-67';

export const SOCIAL_NETWORKS: SocialNetwork[] = [
  {
    id: 1,
    name: 'Instagram',
    url: 'https://instagram.com/bazaar.flowers',
    icon: 'instagram'
  },
  {
    id: 2,
    name: 'VK',
    url: 'https://vk.com/bazaar.flowers',
    icon: 'vk'
  },
  {
    id: 3,
    name: 'Telegram',
    url: 'https://t.me/bazaar_flowers',
    icon: 'telegram'
  },
  {
    id: 4,
    name: 'WhatsApp',
    url: 'https://wa.me/79991234567',
    icon: 'whatsapp'
  }
];

export const STORES: Store[] = [
  {
    id: 1,
    name: 'Базар Цветы на Ленина',
    address: 'Ленина пр., 42, Москва',
    phone: '+7 (999) 123-45-67',
    coordinates: [55.751244, 37.618423],
    workSchedule: {
      id: 1,
      type: 'Ежедневно',
      hours: [
        {
          days: 'Пн-Пт',
          hours: '9:00-21:00'
        },
        {
          days: 'Сб-Вс',
          hours: '10:00-20:00'
        }
      ]
    },
    photo: '/images/stores/store1.jpg'
  },
  {
    id: 2,
    name: 'Базар Цветы в ТЦ "Метрополис"',
    address: 'Ленинградское ш., 16А, стр. 8, Москва',
    phone: '+7 (999) 234-56-78',
    coordinates: [55.826479, 37.486742],
    workSchedule: {
      id: 2,
      type: 'По графику ТЦ',
      hours: [
        {
          days: 'Пн-Вс',
          hours: '10:00-22:00'
        }
      ]
    },
    photo: '/images/stores/store2.jpg'
  },
  {
    id: 3,
    name: 'Базар Цветы на Арбате',
    address: 'Арбат ул., 24, Москва',
    phone: '+7 (999) 345-67-89',
    coordinates: [55.752158, 37.591492],
    workSchedule: {
      id: 3,
      type: 'Ежедневно',
      hours: [
        {
          days: 'Пн-Вс',
          hours: '9:00-21:00'
        }
      ]
    },
    photo: '/images/stores/store3.jpg'
  },
  {
    id: 4,
    name: 'Базар Цветы в Сокольниках',
    address: 'Сокольническая пл., 4А, Москва',
    phone: '+7 (999) 456-78-90',
    coordinates: [55.789012, 37.678901],
    workSchedule: {
      id: 4,
      type: 'Ежедневно',
      hours: [
        {
          days: 'Пн-Пт',
          hours: '10:00-20:00'
        },
        {
          days: 'Сб-Вс',
          hours: '10:00-19:00'
        }
      ]
    },
    photo: '/images/stores/store4.jpg'
  }
]; 