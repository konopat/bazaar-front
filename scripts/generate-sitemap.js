const fs = require('fs');
const path = require('path');

// Импортируем товары из мокового файла
const mocksPath = path.join(__dirname, '../src/mocks/products.ts');
const productsContent = fs.readFileSync(mocksPath, 'utf8');

// Простой парсинг для извлечения id товаров (в будущем заменить на API)
const productIds = [];
const matches = productsContent.matchAll(/id:\s*(\d+)/g);
for (const match of matches) {
  productIds.push(match[1]);
}

const baseUrl = 'https://konopat.github.io/bazaar-front';

// Статические страницы
const staticPages = [
  { url: '/', changefreq: 'daily', priority: '1.0' },
  { url: '/catalog', changefreq: 'daily', priority: '0.9' },
  { url: '/delivery', changefreq: 'weekly', priority: '0.8' },
  { url: '/about', changefreq: 'monthly', priority: '0.7' },
  { url: '/contacts', changefreq: 'monthly', priority: '0.8' },
  { url: '/blog', changefreq: 'weekly', priority: '0.6' },
  { url: '/privacy', changefreq: 'yearly', priority: '0.3' }
];

// Динамические страницы товаров
const productPages = productIds.map(id => ({
  url: `/products/${id}`,
  changefreq: 'weekly',
  priority: '0.7'
}));

// Генерируем XML
const generateSitemap = () => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Добавляем статические страницы
  staticPages.forEach(page => {
    xml += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  // Добавляем страницы товаров
  productPages.forEach(page => {
    xml += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
  });

  xml += `
</urlset>`;

  return xml;
};

// Записываем файл
const sitemap = generateSitemap();
const outputPath = path.join(__dirname, '../public/sitemap.xml');

fs.writeFileSync(outputPath, sitemap);

console.log(`✅ Sitemap сгенерирован: ${productIds.length} товаров + ${staticPages.length} статических страниц`);
console.log(`📁 Файл сохранён: ${outputPath}`);

// В будущем этот скрипт можно запускать:
// 1. При сборке проекта
// 2. По cron на сервере 
// 3. При добавлении новых товаров через API 