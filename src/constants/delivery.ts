export interface DeliveryZone {
  id: number;
  name: string;
  price: number;
  timeRange: string;
  description?: string;
}

export interface DeliveryMethod {
  id: number;
  name: string;
  description: string;
  icon: string;
  features?: string[];
}

export interface DeliveryInfoItem {
  id: number;
  title: string;
  text: string;
}

export interface DeliveryStep {
  id: number;
  number: number;
  title: string;
  text: string;
}

export interface DeliveryTip {
  id: number;
  text: string;
}

export const DELIVERY_ZONES: DeliveryZone[] = [
  { 
    id: 1, 
    name: 'Центральный район', 
    price: 300, 
    timeRange: '30-60 минут',
    description: 'Доставка в историческую часть города и деловой центр'
  },
  { 
    id: 2, 
    name: 'В пределах МКАД', 
    price: 500, 
    timeRange: '1-2 часа',
    description: 'Доставка по всем районам в пределах кольцевой автодороги'
  },
  { 
    id: 3, 
    name: 'За МКАД до 10 км', 
    price: 800, 
    timeRange: '2-3 часа',
    description: 'Доставка в ближайшие пригороды и населенные пункты'
  },
  { 
    id: 4, 
    name: 'За МКАД более 10 км', 
    price: 1200, 
    timeRange: '3-4 часа',
    description: 'Доставка в отдаленные районы и населенные пункты области'
  }
];

export const DELIVERY_METHODS: DeliveryMethod[] = [
  {
    id: 1,
    name: 'Курьерская доставка',
    description: 'Наши курьеры бережно доставят ваш заказ в выбранное время и место',
    icon: '🚚',
    features: [
      'Бережная доставка в удобное время',
      'Предварительное согласование времени',
      'Фотоотчет о вручении букета'
    ]
  },
  {
    id: 2,
    name: 'Самовывоз',
    description: 'Вы можете забрать заказ самостоятельно в любом из наших магазинов',
    icon: '🏪',
    features: [
      'Экономия на доставке',
      'Возможность просмотра букета при получении',
      'Удобное расположение магазинов'
    ]
  },
  {
    id: 3,
    name: 'Срочная доставка',
    description: 'Доставка в течение 2 часов после оформления заказа',
    icon: '⚡',
    features: [
      'Доставка за 2 часа',
      'Доступна в центральных районах',
      'Идеальна для срочных случаев'
    ]
  }
];

export const DELIVERY_INFO: DeliveryInfoItem[] = [
  {
    id: 1,
    title: 'Время работы доставки',
    text: 'Доставка работает ежедневно с 9:00 до 21:00. Заказы, оформленные после 20:00, доставляются на следующий день.'
  },
  {
    id: 2,
    title: 'Особые условия',
    text: 'При заказе от 5000 ₽ доставка в пределах МКАД бесплатная. В праздничные дни может взиматься дополнительная плата за доставку.'
  },
  {
    id: 3,
    title: 'Проблемы с доставкой',
    text: 'В случае задержки доставки наши менеджеры обязательно свяжутся с вами. По всем вопросам вы можете обратиться по телефону: +7 (999) 123-45-67'
  }
];

export const DELIVERY_STEPS: DeliveryStep[] = [
  {
    id: 1,
    number: 1,
    title: 'Оформление заказа',
    text: 'Вы выбираете букет или композицию, указываете адрес и время доставки'
  },
  {
    id: 2,
    number: 2,
    title: 'Подготовка букета',
    text: 'Наши флористы собирают свежий букет непосредственно перед доставкой'
  },
  {
    id: 3,
    number: 3,
    title: 'Доставка',
    text: 'Курьер бережно доставляет букет по указанному адресу в выбранное время'
  },
  {
    id: 4,
    number: 4,
    title: 'Получение',
    text: 'Получатель принимает букет, а вы получаете фото доставленного заказа'
  }
];

export const DELIVERY_TIPS: DeliveryTip[] = [
  {
    id: 1,
    text: 'Убедитесь, что указан корректный адрес и номер телефона получателя'
  },
  {
    id: 2,
    text: 'Предупредите получателя о доставке, если это не сюрприз'
  },
  {
    id: 3,
    text: 'Сообщите курьеру о пропускной системе или других особенностях доставки заранее'
  },
  {
    id: 4,
    text: 'При заказе на конкретное время, учитывайте возможные пробки'
  }
]; 