import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { AppService } from './app.service';
import { SeoService } from './seo/seo.service';
import { join } from 'path';

// Необходимые импорты из клиентского кода
// @ts-ignore - так как в TypeScript может быть ошибка при импорте React-компонентов
const App = require('../../src/components/App').default;
// @ts-ignore 
const { Provider } = require('react-redux');
// @ts-ignore 
const { StaticRouter } = require('react-router-dom/server');
// @ts-ignore 
const { store } = require('../../src/store/store');

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly seoService: SeoService,
  ) {}

  @Get('/api/health')
  getHealth(): string {
    return this.appService.getHello();
  }

  @Get('*')
  async render(@Req() req: Request, @Res() res: Response) {
    if (
      req.path.startsWith('/api') || 
      req.path.endsWith('.js') || 
      req.path.endsWith('.css') || 
      req.path.endsWith('.ico') || 
      req.path.endsWith('.json') || 
      req.path.includes('.')
    ) {
      // Пропускаем API и статические файлы
      return res.status(404).send('Not found');
    }

    try {
      // Получаем SEO-метаданные для текущего пути
      const metaTags = this.seoService.getMetaTags(req.path);
      const structuredData = this.seoService.getStructuredData(req.path);
      const breadcrumbs = this.seoService.getBreadcrumbs(req.path);
      
      // Рендерим React-приложение
      const appComponent = React.createElement(
        Provider,
        { store },
        React.createElement(
          StaticRouter, 
          { location: req.url },
          React.createElement(App)
        )
      );
      
      const appHTML = ReactDOMServer.renderToString(appComponent);
      const initialState = store.getState();
      
      // Читаем шаблон HTML
      const indexPath = path.join(__dirname, '..', '..', 'dist', 'index.html');
      
      try {
        const indexHtml = fs.readFileSync(indexPath, 'utf8');
        
        // Внедряем SEO-метатеги и структурированные данные
        const html = this.injectSEO(
          indexHtml, 
          appHTML, 
          initialState,
          metaTags,
          structuredData,
          breadcrumbs
        );
        
        return res.send(html);
      } catch (error) {
        console.error('Ошибка чтения файла index.html:', error);
        return res.status(500).send('Internal Server Error: Cannot read index.html');
      }
    } catch (error) {
      console.error('Ошибка рендеринга:', error);
      return res.status(500).send('Internal Server Error');
    }
  }

  private injectSEO(
    html: string, 
    appHTML: string, 
    initialState: any,
    metaTags: any,
    structuredData: any,
    breadcrumbs: any
  ): string {
    // Заменяем title и добавляем мета-теги
    let updatedHtml = html
      .replace(/<title>.*?<\/title>/, `<title>${metaTags.title}</title>`)
      .replace(
        /<meta name="description".*?>/,
        `<meta name="description" content="${metaTags.description}" />`
      );

    // Добавляем остальные мета-теги, если их нет
    if (!html.includes('keywords')) {
      updatedHtml = updatedHtml.replace(
        '</head>',
        `<meta name="keywords" content="${metaTags.keywords || ''}" />\n</head>`
      );
    }
    
    if (!html.includes('canonical')) {
      updatedHtml = updatedHtml.replace(
        '</head>',
        `<link rel="canonical" href="${metaTags.canonicalUrl}" />\n</head>`
      );
    }
    
    // Open Graph теги
    if (!html.includes('og:title')) {
      updatedHtml = updatedHtml.replace(
        '</head>',
        `<meta property="og:title" content="${metaTags.ogTitle || metaTags.title}" />
        <meta property="og:description" content="${metaTags.ogDescription || metaTags.description}" />
        <meta property="og:url" content="${metaTags.canonicalUrl}" />
        <meta property="og:image" content="${metaTags.ogImage || ''}" />
        <meta property="og:type" content="website" />\n</head>`
      );
    }
    
    // Twitter Card теги
    if (!html.includes('twitter:card')) {
      updatedHtml = updatedHtml.replace(
        '</head>',
        `<meta name="twitter:card" content="${metaTags.twitterCard || 'summary'}" />
        <meta name="twitter:title" content="${metaTags.ogTitle || metaTags.title}" />
        <meta name="twitter:description" content="${metaTags.ogDescription || metaTags.description}" />
        <meta name="twitter:image" content="${metaTags.ogImage || ''}" />\n</head>`
      );
    }
    
    // PWA мета-теги
    if (!html.includes('theme-color')) {
      updatedHtml = updatedHtml.replace(
        '</head>',
        `<meta name="theme-color" content="#D4A977" />
        <link rel="manifest" href="/manifest.json" />\n</head>`
      );
    }
    
    // Добавляем структурированные данные
    let jsonLdScripts = '';
    
    if (structuredData) {
      jsonLdScripts += `
      <script type="application/ld+json">
        ${JSON.stringify(structuredData)}
      </script>
      `;
    }
    
    if (breadcrumbs) {
      jsonLdScripts += `
      <script type="application/ld+json">
        ${JSON.stringify(breadcrumbs)}
      </script>
      `;
    }
    
    // Внедряем React-приложение и Redux-состояние
    updatedHtml = updatedHtml
      .replace('<div id="root"></div>', `<div id="root">${appHTML}</div>`)
      .replace(
        '</body>',
        `${jsonLdScripts}
        <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}</script>
        </body>`
      );
    
    return updatedHtml;
  }
} 