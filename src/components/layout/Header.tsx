import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import type { MouseEvent } from 'react';
import Navigation from './Navigation';
import useTheme from '@hooks/useTheme';
import BazaarLogo from '../common/BazaarLogo';
import Icon from '../common/Icon';
import SideMenu from './SideMenu';

const Header: React.FC = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { theme, toggleTheme } = useTheme();

  // Обработчик скролла для прилипающего хедера
  useEffect(() => {
    const handleScroll = () => {
      setIsHeaderSticky(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Объединенный обработчик для внешних событий
  useEffect(() => {
    const handleGlobalEvents = (e: Event) => {
      if (e.type === 'keydown' && (e as KeyboardEvent).key === 'Escape' && isSideMenuOpen) {
        setIsSideMenuOpen(false);
      }
      
      if (e.type === 'mousedown') {
        const menu = document.querySelector('.side-menu');
        const burger = document.querySelector('.burger-menu');
        
        if (menu && 
            !menu.contains(e.target as Node) && 
            !burger?.contains(e.target as Node) &&
            isSideMenuOpen) {
          setIsSideMenuOpen(false);
        }
      }
    };

    if (isSideMenuOpen) {
      document.addEventListener('mousedown', handleGlobalEvents);
      document.addEventListener('keydown', handleGlobalEvents);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleGlobalEvents);
      document.removeEventListener('keydown', handleGlobalEvents);
      document.body.style.overflow = '';
    };
  }, [isSideMenuOpen]);

  const toggleSideMenu = useCallback((e: MouseEvent) => {
    e.stopPropagation();
    setIsSideMenuOpen(prev => !prev);
  }, []);

  return (
    <>
      <div className={`header__top ${isHeaderSticky ? 'header__top--sticky' : ''}`}>
        <div className="header__top-content">
          <button 
            className={`burger-menu ${isSideMenuOpen ? 'burger-menu--active' : ''}`}
            onClick={toggleSideMenu}
            aria-label="Открыть меню"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <Link to="/" className="header__logo" aria-label="BAZAAR (БАЗААР) - Магазин. Цветы в Иркутске">
            <BazaarLogo />
            <span className="visually-hidden">BAZAAR</span>
          </Link>

          <div className="header__actions">
            <button 
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={`Включить ${theme === 'light' ? 'темную' : 'светлую'} тему`}
            >
              <Icon name={theme === 'light' ? 'sun' : 'moon'} />
            </button>

            <Link to="/profile" className="profile-button" aria-label="Профиль">
              <Icon name="profile" />
            </Link>

            <Link to="/cart" className="cart-button" aria-label="Корзина">
              <Icon name="cart" />
              {itemsCount > 0 && <span className="cart-button__count">{itemsCount}</span>}
            </Link>
          </div>
        </div>
      </div>

      <div className="header__bottom">
        <div className="container">
          <Navigation />
        </div>
      </div>

      <SideMenu 
        isOpen={isSideMenuOpen} 
        onLinkClick={toggleSideMenu} 
      />
    </>
  );
};

export default Header; 