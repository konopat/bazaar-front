import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SeoModule } from './seo/seo.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'dist'),
      exclude: ['/api*', '/sitemap.xml', '/robots.txt'],
    }),
    SeoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 