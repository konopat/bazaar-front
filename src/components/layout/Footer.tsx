import React from 'react';
import BazaarLogo from '@components/common/BazaarLogo';
import SocialLinks from '@components/common/SocialLinks';
import { Link } from 'react-router-dom';
import StoreAddresses from '../common/StoreAddresses';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <Link to="/" className="footer__logo" aria-label="BAZAAR (БАЗААР) - Магазин. Цветы в Иркутске">
          <BazaarLogo />
        </Link>

        <div className="footer__container">
          <section className="footer__section">
            <div className="footer__contact">
              <h3 className="footer__title">Наши магазины</h3>
              <StoreAddresses className="footer__addresses" />
            </div>
          </section>

          <section className="footer__section">
            <h3 className="footer__title">Каталог</h3>
            <nav className="footer__nav">
              <Link to="/catalog/bouquets" className="footer__nav-link">Букеты</Link>
              <Link to="/catalog/compositions" className="footer__nav-link">Композиции</Link>
              <Link to="/delivery" className="footer__nav-link">Доставка</Link>
            </nav>
          </section>

          <section className="footer__section">
            <h3 className="footer__title">Компания</h3>
            <nav className="footer__nav">
              <Link to="/about" className="footer__nav-link">О нас</Link>
              <Link to="/vacancies" className="footer__nav-link">Вакансии</Link>
              <Link to="/contacts" className="footer__nav-link">Контакты</Link>
              <Link to="/blog" className="footer__nav-link">Блог</Link>
            </nav>
          </section>

          <section className="footer__section">
            <h3 className="footer__title">Связаться с нами</h3>
            <a href="tel:+79087740015" className="footer__contact-item">
              +7 (908) 774-00-15
            </a>
            <SocialLinks className="footer__social" />
          </section>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">© 2019 – {currentYear} BAZAAR</p>
          <Link to="/privacy" className="footer__nav-link">Политика конфиденциальности</Link>
        </div>
      </div>
      
      <div className="mobile-footer">
       
      </div>
    </footer>
  );
};

export default Footer; 