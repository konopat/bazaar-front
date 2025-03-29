import { useState, useEffect, useRef } from 'react';
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
import SocialLinks from '@components/common/SocialLinks';
import StoresModal from '../map/StoresModal';
import { PHONE_NUMBER, STORES } from '../../constants/contacts';
import LazyImage from '@components/common/LazyImage';

const HomePage: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<{ min: number; max: number | null } | null>(null);
  const [isCardSticky, setIsCardSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isStoresModalOpen, setIsStoresModalOpen] = useState(false);
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
              <p className="hero__stores-text">{STORES.length} магазина в Иркутске – есть самовывоз</p>
              <button 
                className="hero__stores-button button--underline" 
                onClick={() => setIsStoresModalOpen(true)}
              >
                Показать адреса
              </button>
            </div>
            <div className="hero__contacts">
              <a href={`tel:${PHONE_NUMBER}`} className="hero__phone">{PHONE_NUMBER}</a>
              <SocialLinks className="hero__social" />
            </div>
          </div>

          <h1 className="hero__title">Доставка цветов в&nbsp;Иркутске</h1>
          <p className="hero__subtitle">Купите букет от&nbsp;1&nbsp;500 рублей</p>
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

          </div>

          <aside className="home__sidebar" ref={sidebarRef}>
            <article className={`adsblock ${isCardSticky ? 'sticky' : ''}`}>
              <div className="adsblock__image">
                <LazyImage 
                  src="/images/masterclass.jpg" 
                  alt="Мастер-класс флористики"
                  containerClassName="adsblock__img-wrapper"
                  className="adsblock__img"
                  objectFit="cover"
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
        <section className="quiz-section" ref={quizRef}>
          <div className="container">
            <BouquetQuiz />
          </div>
        </section>
      </div>

      <StoresModal 
        isOpen={isStoresModalOpen} 
        onClose={() => setIsStoresModalOpen(false)} 
      />
    </main>
  );
};

export default HomePage; 