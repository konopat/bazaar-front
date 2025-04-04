import { Injectable } from '@nestjs/common';

@Injectable()
export class SitemapService {
  private readonly baseUrl = 'https://bazaar-flowers.ru';

  async generateSitemap(): Promise<string> {
    // В реальном приложении данные будут получены из базы данных
    const urls = [
      { loc: '/', priority: '1.0', changefreq: 'daily' },
      { loc: '/catalog', priority: '0.9', changefreq: 'daily' },
      { loc: '/about', priority: '0.7', changefreq: 'weekly' },
      { loc: '/contacts', priority: '0.7', changefreq: 'monthly' },
      { loc: '/delivery', priority: '0.7', changefreq: 'weekly' },
      { loc: '/payment', priority: '0.7', changefreq: 'monthly' },
      // Данные о продуктах (в реальном приложении - из базы данных)
      { loc: '/products/1', priority: '0.8', changefreq: 'weekly' },
      { loc: '/products/2', priority: '0.8', changefreq: 'weekly' },
      { loc: '/products/3', priority: '0.8', changefreq: 'weekly' },
      // Коллекции
      { loc: '/catalog/birthday', priority: '0.8', changefreq: 'weekly' },
      { loc: '/catalog/wedding', priority: '0.8', changefreq: 'weekly' },
      { loc: '/catalog/anniversary', priority: '0.8', changefreq: 'weekly' },
    ];
    
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    urls.forEach(url => {
      sitemap += '  <url>\n';
      sitemap += `    <loc>${this.baseUrl}${url.loc}</loc>\n`;
      sitemap += `    <changefreq>${url.changefreq}</changefreq>\n`;
      sitemap += `    <priority>${url.priority}</priority>\n`;
      sitemap += '  </url>\n';
    });
    
    sitemap += '</urlset>';
    return sitemap;
  }
  
  generateRobots(baseUrl?: string): string {
    const url = baseUrl || this.baseUrl;
    
    return `User-agent: *
Allow: /

# Запрещаем индексацию служебных страниц
Disallow: /admin/
Disallow: /api/
Disallow: /cart
Disallow: /checkout
Disallow: /auth

# Запрещаем индексацию поиска
Disallow: /search?*

# Карта сайта
Sitemap: ${url}/sitemap.xml
`;
  }
} 