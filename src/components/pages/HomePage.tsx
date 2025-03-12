import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import BouquetQuiz from '../quiz/BouquetQuiz';
import ColorFilter from '../catalog/ColorFilter';
import PriceFilter from '../catalog/PriceFilter';
import ProductCard from '../catalog/ProductCard';
import SpecialOfferCard from '../catalog/SpecialOfferCard';
import Collections from '../collections/Collections';
import { Product, products } from '../../mocks/products';
import { specialOffers } from '../../mocks/special-offers';

const HomePage: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<{ min: number; max: number | null } | null>(null);
  const [isCardSticky, setIsCardSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const quizRef = useRef<HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const filterProductsByPrice = (minPrice: number, maxPrice: number) => {
    return products.filter(product => 
      product.price >= minPrice && 
      product.price <= maxPrice &&
      (!selectedColor || product.color === selectedColor)
    );
  };

  const filterAndSortProducts = () => {
    let filteredProducts = products;

    // Применяем фильтр по цене
    if (selectedPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= selectedPrice.min && 
        (selectedPrice.max === null || product.price <= selectedPrice.max)
      );
    }

    // Применяем фильтр по цвету
    if (selectedColor) {
      filteredProducts = filteredProducts.filter(product => product.color === selectedColor);
    }

    // Применяем поиск
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Применяем сортировку
    return filteredProducts.sort((a, b) => 
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );
  };

  const handleResetFilters = () => {
    setSelectedColor(null);
    setSelectedPrice(null);
    setSearchQuery('');
    setSortOrder('asc');
  };

  useEffect(() => {
    const handleScroll = () => {
      if (sidebarRef.current && quizRef.current) {
        const headerHeight = 100;
        const sidebarTop = sidebarRef.current.getBoundingClientRect().top;
        const quizTop = quizRef.current.getBoundingClientRect().top;
        
        if (window.innerWidth > 1024) {
          setIsCardSticky(sidebarTop <= headerHeight && quizTop > window.innerHeight);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    const specialOffersSection = document.querySelector('.special-offers');
    if (specialOffersSection) {
      specialOffersSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="home">
      <section className="hero">
        <div className="container">
          <div className="hero__info">
            <div className="hero__stores">
              <p className="hero__stores-text">3 магазина в Иркутске – есть самовывоз</p>
              <button className="hero__stores-button" onClick={toggleMobileMenu}>
                Показать адреса
              </button>
            </div>
            <div className="hero__contacts">
              <a href="tel:+79087740015" className="hero__phone">+7 (908) 774-00-15</a>
              <div className="hero__social">
                <a href="#" className="hero__social-link" aria-label="Telegram">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"/>
                  </svg>
                </a>
                <a href="#" className="hero__social-link" aria-label="WhatsApp">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </a>
                <a href="#" className="hero__social-link" aria-label="Instagram">
                  <svg width="24" height="24" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <h1 className="hero__title">Доставка цветов в Иркутске</h1>
          <p className="hero__subtitle">Купите букет от 1 500 рублей</p>
          <Link to="/catalog" className="button button--primary hero__button">
            Открыть каталог
          </Link>

          <button className="hero__scroll" onClick={scrollToContent} aria-label="Прокрутить вниз">
            <svg className="hero__scroll-icon" width="24" height="24" viewBox="0 0 24 24">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
          </button>
        </div>
      </section>

      <div className="container">
        <div className="home__content">
          <div className="home__main">
            <section className="special-offers">
              <h2 className="section-title">Специальные предложения</h2>
              <div className="special-offers__grid">
                {specialOffers.map(offer => (
                  <SpecialOfferCard
                    key={offer.id}
                    {...offer}
                  />
                ))}
              </div>
            </section>

            <Collections products={products} />

            <section className="quiz-section" ref={quizRef}>
              <div className="container">
                <h2 className="section-title">Сложно определиться?</h2>
                <BouquetQuiz />
              </div>
            </section>
          </div>

          <aside className="home__sidebar" ref={sidebarRef}>
            <article className={`adsblock ${isCardSticky ? 'sticky' : ''}`}>
              <div className="adsblock__image">
                <img 
                  src="/images/masterclass.jpg" 
                  alt="Мастер-класс флористики"
                />
              </div>
              <div className="adsblock__content">
                <h3 className="adsblock__title">
                  Мастер-класс для начинающих флористов
                </h3>
                <p className="adsblock__free">БЕСПЛАТНО</p>
                <button className="button button--primary adsblock__button">
                  Хочу стать флористом
                </button>
              </div>
            </article>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default HomePage; 