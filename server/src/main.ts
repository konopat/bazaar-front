import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Включаем сжатие ответов
  app.use(compression());
  
  // Настройка PWA заголовков
  app.use((req, res, next) => {
    if (req.url.includes('service-worker.js')) {
      res.setHeader('Service-Worker-Allowed', '/');
      res.setHeader('Cache-Control', 'no-cache');
    }
    
    if (req.url.includes('manifest.json')) {
      res.setHeader('Content-Type', 'application/manifest+json');
    }
    
    next();
  });
  
  await app.listen(3001);
  console.log('Сервер запущен на порту 3001');
}

bootstrap(); 