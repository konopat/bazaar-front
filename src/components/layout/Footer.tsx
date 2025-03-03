import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__column">
            <Link to="/" className="footer__logo">BAZAAR</Link>
            <div className="footer__addresses">
              <h4>Адреса:</h4>
              <p>Иркутск, Маршала Жукова (пр) 15А</p>
              <p>Иркутск, Байкальская 180/2</p>
              <p>Иркутск, Николая Гаврилова 4</p>
            </div>
          </div>
          
          <div className="footer__column">
            <h4>Каталог</h4>
            <nav className="footer__nav">
              <Link to="/catalog/bouquets" className="footer__link">Букеты</Link>
              <Link to="/catalog/compositions" className="footer__link">Композиции</Link>
              <Link to="/delivery" className="footer__link">Доставка</Link>
            </nav>
          </div>
          
          <div className="footer__column">
            <h4>Компания</h4>
            <nav className="footer__nav">
              <Link to="/about" className="footer__link">О нас</Link>
              <Link to="/vacancies" className="footer__link">Вакансии</Link>
              <Link to="/contacts" className="footer__link">Контакты</Link>
              <Link to="/blog" className="footer__link">Блог</Link>
            </nav>
          </div>

          <div className="footer__column">
            <div className="footer__contacts">
              <a href="tel:+79087740015" className="footer__phone">+7 (908) 774-00-15</a>
              <div className="footer__social">
                <a href="#" className="footer__social-link">WhatsApp</a>
                <a href="#" className="footer__social-link">VK</a>
                <a href="#" className="footer__social-link">Telegram</a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer__bottom">
          <p className="footer__copyright">© 2024 BAZAAR</p>
          <Link to="/privacy" className="footer__link">Политика конфиденциальности</Link>
        </div>
      </div>
      
      <div className="mobile-footer">
        <a href="tel:+79087740015" className="mobile-footer__phone">
          <span className="mobile-footer__icon">📞</span>
        </a>
        <div className="mobile-footer__messengers">
          <a href="#" className="mobile-footer__messenger">WhatsApp</a>
          <a href="#" className="mobile-footer__messenger">VK</a>
          <a href="#" className="mobile-footer__messenger">Telegram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 