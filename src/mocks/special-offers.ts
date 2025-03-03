export interface SpecialOffer {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  isHot?: boolean;
}

export const specialOffers: SpecialOffer[] = [
  {
    id: 1,
    title: 'Экспресс-букет',
    description: 'Уникальный сборный букет на вкус нашего флориста',
    price: 1500,
    image: '/images/special/express.jpg'
  },
  {
    id: 2,
    title: 'Букет для учителя',
    description: 'Большой букет, собранный специально к 1 сентября',
    price: 3740,
    image: '/images/special/teacher.jpg',
    isHot: true
  },
  {
    id: 3,
    title: 'Миллион алых роз',
    description: 'Монобукет из роз. Сосчитаете сколько их на самом деле?',
    price: 3900,
    image: '/images/special/roses.jpg'
  }
]; 