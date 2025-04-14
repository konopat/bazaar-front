import BazaarLogo from '@components/common/BazaarLogo';
import SocialLinks from '@components/common/SocialLinks';
import { Link } from 'react-router-dom';
import StoreAddresses from '../common/StoreAddresses';
import { PHONE_NUMBER } from '../../constants/contacts';
import Icon from '@components/common/Icon';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
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
            <a href={`tel:${PHONE_NUMBER}`} className="footer__contact-item">
              {PHONE_NUMBER}
            </a>
            <SocialLinks className="social-links--start" />
          </section>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">© 2019 – {currentYear} BAZAAR</p>
          <Link to="/privacy" className="footer__nav-link">Политика конфиденциальности</Link>
        </div>
      </div>
      
      <div className="mobile-footer">
        <nav className="mobile-nav">
          <Link to="/" className="mobile-nav__item">
            <Icon name="store" />
            <span className="mobile-nav__label">Главная</span>
          </Link>
          <Link to="/catalog" className="mobile-nav__item">
            <Icon name="search" />
            <span className="mobile-nav__label">Каталог</span>
          </Link>
          <Link to="/profile" className="mobile-nav__item">
            <Icon name="profile" />
            <span className="mobile-nav__label">Профиль</span>
          </Link>
          <Link to="/cart" className="mobile-nav__item">
            <Icon name="cart" />
            {itemsCount > 0 && <span className="mobile-nav__badge">{itemsCount}</span>}
            <span className="mobile-nav__label">Корзина</span>
          </Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer; 