import { Controller, Get, Res, Req } from '@nestjs/common';
import { Response, Request } from 'express';
import { SitemapService } from './sitemap.service';

@Controller()
export class SitemapController {
  constructor(private readonly sitemapService: SitemapService) {}

  @Get('sitemap.xml')
  async getSitemap(@Res() res: Response): Promise<void> {
    const sitemap = await this.sitemapService.generateSitemap();
    res.header('Content-Type', 'application/xml');
    res.send(sitemap);
  }

  @Get('robots.txt')
  getRobots(@Req() req: Request, @Res() res: Response): void {
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    const robots = this.sitemapService.generateRobots(baseUrl);
    res.header('Content-Type', 'text/plain');
    res.send(robots);
  }
} 