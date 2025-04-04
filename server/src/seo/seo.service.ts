import { Injectable } from '@nestjs/common';

export interface MetaTags {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterCard?: string;
}

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: any;
}

@Injectable()
export class SeoService {
  getMetaTags(path: string): MetaTags {
    // Базовые метатеги по умолчанию
    const defaultTags: MetaTags = {
      title: 'BAZAAR - Онлайн-магазин букетов',
      description: 'Красивые букеты с доставкой. Широкий выбор цветочных композиций для любого случая.',
      keywords: 'букеты, цветы, доставка цветов, флористика',
      canonicalUrl: `https://bazaar-flowers.ru${path}`,
      ogTitle: 'BAZAAR - Стильные букеты',
      ogDescription: 'Красивые букеты с доставкой',
      ogImage: 'https://bazaar-flowers.ru/images/og-image.jpg',
      twitterCard: 'summary_large_image',
    };

    // Настройка метатегов в зависимости от пути
    if (path === '/') {
      return {
        ...defaultTags,
        title: 'BAZAAR - Изысканные букеты с доставкой',
        description: 'Магазин стильных букетов на любой случай. Свежие цветы, профессиональные флористы, быстрая доставка.',
      };
    } 
    else if (path.startsWith('/catalog')) {
      return {
        ...defaultTags,
        title: 'Каталог букетов | BAZAAR',
        description: 'Выбирайте из нашей коллекции стильных букетов. Свежие цветы, быстрая доставка.',
        keywords: 'каталог букетов, купить букет, заказать цветы',
      };
    } 
    else if (path.startsWith('/products/')) {
      // Здесь в реальном приложении будут данные продукта из БД
      const productId = path.split('/').pop();
      
      return {
        ...defaultTags,
        title: `Букет "Весенний" | BAZAAR`,
        description: `Букет "Весенний" - яркая композиция из свежих цветов, которая принесет радость и улыбку.`,
        keywords: 'букет весенний, купить букет, весенние цветы',
        ogTitle: `Букет "Весенний"`,
        ogImage: `https://bazaar-flowers.ru/images/products/${productId}.jpg`,
      };
    }
    else if (path === '/contacts') {
      return {
        ...defaultTags,
        title: 'Контакты | BAZAAR',
        description: 'Свяжитесь с нами для заказа букетов. Наши флористы готовы помочь вам выбрать идеальный букет.',
        keywords: 'контакты цветочного магазина, заказ букетов, доставка цветов',
      };
    }
    else if (path === '/about') {
      return {
        ...defaultTags,
        title: 'О нас | BAZAAR',
        description: 'BAZAAR - это команда профессиональных флористов, создающих уникальные букеты с 2015 года.',
        keywords: 'о магазине цветов, флористика, история компании',
      };
    }
    else if (path === '/delivery') {
      return {
        ...defaultTags,
        title: 'Доставка цветов | BAZAAR',
        description: 'Быстрая доставка букетов по городу. Специальные условия для срочной доставки.',
        keywords: 'доставка букетов, доставка цветов, курьер',
      };
    }
    else if (path === '/cart') {
      return {
        ...defaultTags,
        title: 'Корзина | BAZAAR',
        description: 'Ваша корзина покупок в магазине BAZAAR.',
        ogTitle: 'Оформление заказа в BAZAAR',
      };
    }
    
    return defaultTags;
  }

  getStructuredData(path: string): StructuredData | null {
    // Базовая разметка Organization
    const organizationData: StructuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'BAZAAR',
      url: 'https://bazaar-flowers.ru',
      logo: 'https://bazaar-flowers.ru/images/logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+7-XXX-XXX-XX-XX',
        contactType: 'customer service'
      },
      sameAs: [
        'https://instagram.com/bazaar_flowers',
        'https://vk.com/bazaar_flowers'
      ]
    };

    // Для главной страницы
    if (path === '/') {
      return organizationData;
    }
    
    // Для страницы продукта
    if (path.startsWith('/products/')) {
      const productId = path.split('/').pop();
      
      return {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: 'Букет "Весенний"',
        image: `https://bazaar-flowers.ru/images/products/${productId}.jpg`,
        description: 'Яркая композиция из свежих весенних цветов',
        offers: {
          '@type': 'Offer',
          priceCurrency: 'RUB',
          price: '2500',
          availability: 'https://schema.org/InStock',
          url: `https://bazaar-flowers.ru${path}`
        },
        brand: {
          '@type': 'Brand',
          name: 'BAZAAR'
        }
      };
    }
    
    // Для страницы контактов
    if (path === '/contacts') {
      return {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'BAZAAR',
        image: 'https://bazaar-flowers.ru/images/logo.png',
        '@id': 'https://bazaar-flowers.ru',
        url: 'https://bazaar-flowers.ru',
        telephone: '+7-XXX-XXX-XX-XX',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'улица Примерная, 123',
          addressLocality: 'Москва',
          postalCode: '123456',
          addressCountry: 'RU'
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: [
            'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
          ],
          opens: '09:00',
          closes: '21:00'
        }
      };
    }

    return organizationData;
  }

  getBreadcrumbs(path: string): StructuredData | null {
    if (path === '/') return null;
    
    const pathParts = path.split('/').filter(part => part);
    const breadcrumbItems = [];
    
    // Домашняя страница всегда первая
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 1,
      name: 'Главная',
      item: 'https://bazaar-flowers.ru'
    });
    
    let currentPath = '';
    pathParts.forEach((part, index) => {
      currentPath += `/${part}`;
      const position = index + 2; // +2 потому что домашняя страница уже добавлена
      
      let name = part.charAt(0).toUpperCase() + part.slice(1);
      if (part === 'catalog') name = 'Каталог';
      if (part === 'contacts') name = 'Контакты';
      if (part === 'about') name = 'О нас';
      if (part === 'delivery') name = 'Доставка';
      if (part === 'products') name = 'Товар';
      
      breadcrumbItems.push({
        '@type': 'ListItem',
        position,
        name,
        item: `https://bazaar-flowers.ru${currentPath}`
      });
    });
    
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems
    };
  }
} 