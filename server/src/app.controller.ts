import { Controller, Get, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { AppService } from './app.service';
import { SeoService } from './seo/seo.service';

// В dev режиме SSR не будет работать из-за сложностей с настройкой
// Вместо этого возвращаем HTML шаблон без серверного рендеринга
// Это нормально, так как для GitHub Pages SSR не нужен

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
    // Статические файлы и API
    if (
      req.path.startsWith('/api') || 
      req.path.endsWith('.js') || 
      req.path.endsWith('.css') || 
      req.path.endsWith('.ico') || 
      req.path.endsWith('.json') || 
      req.path.includes('.')
    ) {
      return res.status(404).send('Not found');
    }

    try {
      // Базовые SEO метатеги
      const metaTags = {
        title: 'BAZAAR - Цветы и букеты с доставкой',
        description: 'Большой выбор свежих цветов и букетов с доставкой',
      };

      try {
        // Пытаемся прочитать HTML из dist
        const indexPath = path.join(__dirname, '..', '..', 'dist', 'index.html');
        const indexHtml = fs.readFileSync(indexPath, 'utf8');
        
        // Заменяем только базовые метатеги
        let html = indexHtml
          .replace(/<title>.*?<\/title>/, `<title>${metaTags.title}</title>`)
          .replace(
            /<meta name="description".*?>/,
            `<meta name="description" content="${metaTags.description}" />`
          );
        
        return res.send(html);
      } catch (error) {
        // Если не удалось прочитать файл, перенаправляем на клиентский сервер
        console.error('Ошибка при чтении HTML:', error.message);
        return res.redirect('http://localhost:3000' + req.originalUrl);
      }
    } catch (error) {
      console.error('Ошибка рендеринга:', error);
      return res.status(500).send('Internal Server Error');
    }
  }
} 