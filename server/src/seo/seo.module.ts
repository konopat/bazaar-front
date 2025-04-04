import { Module } from '@nestjs/common';
import { SeoService } from './seo.service';
import { SitemapController } from './sitemap.controller';
import { SitemapService } from './sitemap.service';

@Module({
  controllers: [SitemapController],
  providers: [SeoService, SitemapService],
  exports: [SeoService, SitemapService],
})
export class SeoModule {} 