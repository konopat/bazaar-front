import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogTitle?: string;
  ogDescription?: string;
}

/**
 * Хук для управления SEO метатегами на клиентской стороне
 * @param SEOProps Параметры SEO (title, description, keywords, ogImage, ogTitle, ogDescription)
 */
export const useSEO = ({ 
  title, 
  description, 
  keywords,
  ogImage, 
  ogTitle,
  ogDescription 
}: SEOProps) => {
  const location = useLocation();
  
  useEffect(() => {
    // Обновляем только если приложение работает в браузере
    if (typeof window === 'undefined') return;
    
    // Обновляем title
    if (title) {
      document.title = title;
    }
    
    // Обновляем мета-теги
    const updateMetaTag = (name: string, content?: string) => {
      if (!content) return;
      
      let metaTag = document.querySelector(`meta[name="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('name', name);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };
    
    const updateOGMetaTag = (property: string, content?: string) => {
      if (!content) return;
      
      let metaTag = document.querySelector(`meta[property="${property}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };
    
    // Обновляем стандартные мета-теги
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Обновляем Open Graph теги
    updateOGMetaTag('og:title', ogTitle || title);
    updateOGMetaTag('og:description', ogDescription || description);
    updateOGMetaTag('og:url', window.location.href);
    updateOGMetaTag('og:image', ogImage);
    
    // Обновляем canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', `${window.location.origin}${location.pathname}`);
    
  }, [title, description, keywords, ogImage, ogTitle, ogDescription, location.pathname]);
}; 