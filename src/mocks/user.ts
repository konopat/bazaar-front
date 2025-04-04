export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

export interface DeliveryAddress {
  id: number;
  title: string;
  address: string;
  isDefault: boolean;
}

export interface OrderItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: number;
  date: string;
  status: 'pending' | 'delivered' | 'cancelled';
  total: number;
  items: OrderItem[];
}

export const mockProfile: UserProfile = {
  name: 'Анна Смирнова',
  email: 'anna@example.com',
  phone: '+7 (999) 123-45-67',
  avatar: '/images/profile/avatar.jpg'
};

export const mockAddresses: DeliveryAddress[] = [
  {
    id: 1,
    title: 'Дом',
    address: 'ул. Цветочная, д. 7, кв. 42',
    isDefault: true
  },
  {
    id: 2,
    title: 'Работа',
    address: 'ул. Ленина, д. 15, офис 301',
    isDefault: false
  }
];

export const mockOrders: Order[] = [
  {
    id: 1001,
    date: '2023-05-15',
    status: 'delivered',
    total: 3500,
    items: [
      {
        id: 11,
        title: 'Королевский шарм',
        image: '/images/bouquets/royal.jpg',
        price: 3500,
        quantity: 1
      }
    ]
  },
  {
    id: 1002,
    date: '2023-06-10',
    status: 'delivered',
    total: 6900,
    items: [
      {
        id: 22,
        title: 'Розовая мечта',
        image: '/images/bouquets/dream.jpg',
        price: 4500,
        quantity: 1
      },
      {
        id: 3,
        title: 'Солнечный день',
        image: '/images/bouquets/sunny.jpg',
        price: 2400,
        quantity: 1
      }
    ]
  },
  {
    id: 1003,
    date: '2023-07-03',
    status: 'pending',
    total: 5600,
    items: [
      {
        id: 29,
        title: 'Белый бриллиант люкс',
        image: '/images/bouquets/white-diamond.jpg',
        price: 5600,
        quantity: 1
      }
    ]
  }
]; 