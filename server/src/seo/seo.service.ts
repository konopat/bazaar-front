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
    return {
      title: 'BAZAAR - Онлайн-магазин букетов',
      description: 'Красивые букеты с доставкой. Широкий выбор цветочных композиций для любого случая.',
      keywords: 'букеты, цветы, доставка цветов, флористика',
      canonicalUrl: `https://bazaar-flowers.ru${path}`,
      ogTitle: 'BAZAAR - Стильные букеты',
      ogDescription: 'Красивые букеты с доставкой',
      ogImage: 'https://bazaar-flowers.ru/images/og-image.jpg',
      twitterCard: 'summary_large_image',
    };
  }

  getStructuredData(path: string): StructuredData | null {
    // Базовая разметка Organization
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'BAZAAR',
      url: 'https://bazaar-flowers.ru',
    };
  }

  getBreadcrumbs(path: string): StructuredData | null {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: []
    };
  }
} 