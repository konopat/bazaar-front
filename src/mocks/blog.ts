export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: Category;
  slug: string;
  content: string;
  relatedPosts?: number[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export const CATEGORIES: Category[] = [
  { id: 1, name: 'Все', slug: 'all' },
  { id: 2, name: 'Советы', slug: 'tips' },
  { id: 3, name: 'Тренды', slug: 'trends' },
  { id: 4, name: 'История', slug: 'history' },
  { id: 5, name: 'Свадьба', slug: 'wedding' },
  { id: 6, name: 'Комнатные растения', slug: 'indoor-plants' },
  { id: 7, name: 'Сезонные цветы', slug: 'seasonal-flowers' }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: 'Как продлить жизнь срезанным цветам',
    excerpt: 'Простые советы, которые помогут сохранить свежесть и красоту букета на долгое время.',
    image: '/images/blog/cut-flowers.jpg',
    date: '2023-05-15',
    category: CATEGORIES[0],
    slug: 'how-to-extend-cut-flowers-life',
    content: `
      <h2>Основные правила ухода за срезанными цветами</h2>
      <p>Получив букет, многие из нас просто ставят его в вазу с водой. Однако для максимального продления жизни цветов стоит соблюдать несколько важных правил.</p>
      <h3>1. Правильная подготовка</h3>
      <p>Прежде чем поставить букет в вазу, обрежьте стебли под углом 45 градусов. Это увеличит поверхность для впитывания воды и продлит жизнь цветов. Используйте острые ножницы или нож, чтобы не повредить сосуды растения.</p>
      <h3>2. Чистая ваза и свежая вода</h3>
      <p>Ваза должна быть тщательно вымыта, чтобы предотвратить размножение бактерий. Вода должна быть комнатной температуры. Меняйте воду каждые 2-3 дня, одновременно подрезая стебли на 1-2 см.</p>
      <h3>3. Специальные добавки</h3>
      <p>Используйте специальные средства для продления жизни цветов, которые обычно прилагаются к букетам. Если такого нет, можно добавить в воду чайную ложку сахара и несколько капель лимонного сока или уксуса.</p>
      <h3>4. Правильное расположение</h3>
      <p>Не ставьте букет под прямые солнечные лучи, рядом с фруктами (они выделяют этилен, ускоряющий увядание) или возле радиаторов и кондиционеров.</p>
      <h2>Особенности ухода за разными видами цветов</h2>
      <p>Разные цветы требуют различного ухода. Например, розы любят прохладу и дополнительную подрезку стеблей под водой. Тюльпаны продолжают расти после срезки, поэтому их стебли можно не подрезать каждый день.</p>
      <p>Соблюдая эти несложные правила, вы сможете продлить жизнь букета и наслаждаться его красотой и ароматом гораздо дольше.</p>
    `,
    relatedPosts: [3, 7, 10]
  },
  {
    id: 2,
    title: 'Свадебные букеты: тренды сезона',
    excerpt: 'Обзор самых популярных свадебных букетов этого сезона — от классики до смелых экспериментов.',
    image: '/images/blog/wedding-bouquet.jpg',
    date: '2023-04-28',
    category: CATEGORIES[1],
    slug: 'wedding-bouquets-trends',
    content: `
      <h2>Модные тенденции свадебной флористики</h2>
      <p>Свадебный букет — важный аксессуар невесты, который должен гармонировать с образом и стилем торжества. Каждый сезон приносит новые тренды и интересные идеи.</p>
      <h3>Классика в новом прочтении</h3>
      <p>Классические белые и пастельные букеты остаются популярными, но с современными акцентами: асимметричные формы, добавление необычных элементов (суккуленты, ягоды, перья).</p>
      <h3>Природное вдохновение</h3>
      <p>Букеты в естественном стиле, словно только что собранные в саду или на лугу, — один из главных трендов. Они включают полевые цветы, травы, листья разных оттенков зеленого.</p>
      <h3>Смелые цветовые решения</h3>
      <p>На смену нежным пастельным оттенкам приходят яркие и насыщенные цвета: глубокий синий, насыщенный бордовый, терракотовый, желтый. Популярны контрастные сочетания и омбре.</p>
      <h3>Минимализм и сдержанность</h3>
      <p>Небольшие букеты из нескольких видов цветов или даже монобукеты становятся все более популярными благодаря своей элегантной простоте.</p>
      <h3>Экзотика и эклектика</h3>
      <p>Необычные цветы, тропические листья, сухоцветы и другие креативные элементы помогают создать уникальный и запоминающийся букет.</p>
      <h2>Как выбрать идеальный свадебный букет</h2>
      <p>При выборе букета учитывайте не только тренды, но и свои предпочтения, стиль платья, сезон и общую концепцию свадьбы. Не забывайте о практичности: букет должен быть удобным, не слишком тяжелым и желательно долго сохранять свежесть.</p>
      <p>Независимо от выбранного стиля, свадебный букет должен отражать индивидуальность невесты и стать прекрасным дополнением к ее образу в этот особенный день.</p>
    `,
    relatedPosts: [5, 12]
  },
  {
    id: 3,
    title: 'Лучшие цветы для осеннего букета',
    excerpt: 'Какие цветы и декоративные элементы выбрать для создания атмосферного осеннего букета.',
    image: '/images/blog/autumn-bouquet.jpg',
    date: '2023-09-10',
    category: CATEGORIES[2],
    slug: 'best-flowers-for-autumn-bouquet',
    content: `
      <h2>Осенняя палитра в вашем букете</h2>
      <p>Осень — особенное время для флористики, когда природа предлагает богатую палитру красок и множество интересных материалов для создания букетов.</p>
      <h3>Сезонные цветы</h3>
      <p>Хризантемы, астры, георгины, эустома, гиперикум — эти и другие осенние цветы станут отличной основой для букета. Они доступны в разных оттенках осенней гаммы: от золотистого и оранжевого до бордового и фиолетового.</p>
      <h3>Ягоды и плоды</h3>
      <p>Добавьте в композицию ягоды шиповника, рябины, калины, гиперикума, физалис. Они привнесут яркие акценты и сделают букет более объемным и интересным.</p>
      <h3>Декоративные элементы</h3>
      <p>Осенние листья разных оттенков, веточки с желудями, каштаны, шишки, сухоцветы — все это поможет создать атмосферный осенний букет.</p>
      <h3>Злаки и сухоцветы</h3>
      <p>Колоски пшеницы, овса, ячменя, сухие травы и лагурус добавят букету фактуру и придадут ему природную красоту.</p>
      <h2>Стили осенних букетов</h2>
      <p>Осенний букет может быть выполнен в разных стилях: от классического и романтичного до деревенского и эко-стиля. Последний особенно актуален осенью, когда природа дарит множество материалов.</p>
      <h3>Цветовые сочетания</h3>
      <p>Типичные осенние цвета — оранжевый, желтый, красный, коричневый, бордовый. Однако не стоит ограничиваться только ими. Фиолетовый, синий, зеленый также хорошо вписываются в осенние композиции, создавая интересные контрасты.</p>
      <p>Осенний букет — это маленькая частичка прекрасного времени года, которая принесет тепло и уют в ваш дом или станет отличным подарком для близких.</p>
    `,
    relatedPosts: [7, 9]
  }
]; 

export const POSTS_PER_PAGE = 4; 