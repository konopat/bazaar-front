export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  color: string;
}

export const products: Product[] = [
  // До 3000 рублей
  {
    id: 1,
    title: 'Нежное облако',
    description: 'Воздушный букет из белых хризантем',
    price: 2500,
    image: '/images/bouquets/cloud.jpg',
    color: 'white'
  },
  {
    id: 2,
    title: 'Весенний рассвет',
    description: 'Яркий букет из тюльпанов разных оттенков',
    price: 2800,
    image: '/images/bouquets/sunrise.jpg',
    color: 'pink'
  },
  {
    id: 3,
    title: 'Солнечный день',
    description: 'Композиция из желтых гербер и хризантем',
    price: 2700,
    image: '/images/bouquets/sunny.jpg',
    color: 'yellow'
  },
  {
    id: 4,
    title: 'Лавандовые мечты',
    description: 'Букет из лавандовых эустом',
    price: 2900,
    image: '/images/bouquets/lavender.jpg',
    color: 'purple'
  },
  {
    id: 5,
    title: 'Морской бриз',
    description: 'Букет из синих ирисов и белых роз',
    price: 2600,
    image: '/images/bouquets/breeze.jpg',
    color: 'blue'
  },
  {
    id: 6,
    title: 'Розовый зефир',
    description: 'Нежный букет из розовых гвоздик',
    price: 2400,
    image: '/images/bouquets/pink.jpg',
    color: 'pink'
  },
  {
    id: 7,
    title: 'Огненный закат',
    description: 'Яркий букет из оранжевых лилий',
    price: 2900,
    image: '/images/bouquets/sunset.jpg',
    color: 'red'
  },
  {
    id: 8,
    title: 'Белая элегантность',
    description: 'Изысканный букет из белых калл',
    price: 2800,
    image: '/images/bouquets/elegance.jpg',
    color: 'white'
  },
  {
    id: 9,
    title: 'Фиолетовое чудо',
    description: 'Букет из фиолетовых альстромерий',
    price: 2700,
    image: '/images/bouquets/purple.jpg',
    color: 'purple'
  },
  {
    id: 10,
    title: 'Весенняя свежесть',
    description: 'Букет из белых и желтых нарциссов',
    price: 2500,
    image: '/images/bouquets/fresh.jpg',
    color: 'yellow'
  },

  // До 5000 рублей
  {
    id: 11,
    title: 'Королевский шарм',
    description: 'Роскошный букет из красных роз',
    price: 4500,
    image: '/images/bouquets/royal.jpg',
    color: 'red'
  },
  {
    id: 12,
    title: 'Розовая нежность',
    description: 'Букет из розовых пионов и роз',
    price: 4800,
    image: '/images/bouquets/tenderness.jpg',
    color: 'pink'
  },
  {
    id: 13,
    title: 'Белая роскошь',
    description: 'Элегантный букет из белых орхидей',
    price: 4700,
    image: '/images/bouquets/luxury.jpg',
    color: 'white'
  },
  {
    id: 14,
    title: 'Летний сад',
    description: 'Яркий микс из садовых цветов',
    price: 4200,
    image: '/images/bouquets/garden.jpg',
    color: 'yellow'
  },
  {
    id: 15,
    title: 'Сиреневый туман',
    description: 'Букет из сиреневых роз и эустом',
    price: 4600,
    image: '/images/bouquets/purple-mist.jpg',
    color: 'purple'
  },
  {
    id: 16,
    title: 'Голубая лагуна',
    description: 'Букет из голубых гортензий',
    price: 4900,
    image: '/images/bouquets/lagoon.jpg',
    color: 'blue'
  },
  {
    id: 17,
    title: 'Огненная страсть',
    description: 'Букет из красных и оранжевых роз',
    price: 4700,
    image: '/images/bouquets/passion.jpg',
    color: 'red'
  },
  {
    id: 18,
    title: 'Нежный шелк',
    description: 'Букет из розовых пионовидных роз',
    price: 4500,
    image: '/images/bouquets/silk.jpg',
    color: 'pink'
  },
  {
    id: 19,
    title: 'Белый бриллиант',
    description: 'Букет из белых роз и фрезий',
    price: 4800,
    image: '/images/bouquets/diamond.jpg',
    color: 'white'
  },
  {
    id: 20,
    title: 'Фиолетовый шик',
    description: 'Букет из фиолетовых роз и лизиантусов',
    price: 4600,
    image: '/images/bouquets/violet.jpg',
    color: 'purple'
  },

  // До 10000 рублей
  {
    id: 21,
    title: 'Премиум роскошь',
    description: 'Роскошный букет из 101 красной розы',
    price: 9500,
    image: '/images/bouquets/premium.jpg',
    color: 'red'
  },
  {
    id: 22,
    title: 'Розовая мечта',
    description: 'Пышный букет из розовых пионов',
    price: 8500,
    image: '/images/bouquets/dream.jpg',
    color: 'pink'
  },
  {
    id: 23,
    title: 'Белоснежная роскошь',
    description: 'VIP букет из белых орхидей и роз',
    price: 9000,
    image: '/images/bouquets/snow.jpg',
    color: 'white'
  },
  {
    id: 24,
    title: 'Солнечный люкс',
    description: 'Премиум букет из желтых роз и орхидей',
    price: 8800,
    image: '/images/bouquets/sunny-lux.jpg',
    color: 'yellow'
  },
  {
    id: 25,
    title: 'Фиолетовый рай',
    description: 'Роскошный букет из фиолетовых орхидей',
    price: 9200,
    image: '/images/bouquets/purple-paradise.jpg',
    color: 'purple'
  },
  {
    id: 26,
    title: 'Голубая мечта',
    description: 'Букет из голубых гортензий и орхидей',
    price: 9500,
    image: '/images/bouquets/blue-dream.jpg',
    color: 'blue'
  },
  {
    id: 27,
    title: 'Красный бархат',
    description: 'Премиальный букет из красных пионовидных роз',
    price: 9800,
    image: '/images/bouquets/red-velvet.jpg',
    color: 'red'
  },
  {
    id: 28,
    title: 'Розовый сапфир',
    description: 'VIP букет из розовых роз и орхидей',
    price: 9300,
    image: '/images/bouquets/pink-sapphire.jpg',
    color: 'pink'
  },
  {
    id: 29,
    title: 'Белый бриллиант люкс',
    description: 'Роскошный букет из белых пионов и роз',
    price: 9600,
    image: '/images/bouquets/white-diamond.jpg',
    color: 'white'
  },
  {
    id: 30,
    title: 'Фиолетовая роскошь',
    description: 'Премиум букет из фиолетовых роз и калл',
    price: 9400,
    image: '/images/bouquets/purple-luxury.jpg',
    color: 'purple'
  }
]; 