import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '@store/store';
import Icon from '../common/Icon';
import BazaarLogo from '../common/BazaarLogo';
import SideMenu from './SideMenu';
import useTheme from '../../hooks/useTheme';
import '../../styles/components/header.css';
import Navigation from './Navigation';
import { IconName } from '../../types/icon';


const Header: React.FC = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  
  // Использование хука для управления темой
  const { theme, themeMode, cycleThemeMode } = useTheme();

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

  // Проверяем, можно ли установить PWA
  const [showInstallButton, setShowInstallButton] = useState(false);
  useEffect(() => {
    if ('deferredPrompt' in window) {
      const checkInstallable = () => {
        if (window.deferredPrompt) {
          setShowInstallButton(true);
        } else {
          setShowInstallButton(false);
        }
      };

      // Проверяем при монтировании
      checkInstallable();

      // Слушаем событие beforeinstallprompt
      const handleBeforeInstallPrompt = () => {
        checkInstallable();
      };

      // Слушаем событие appinstalled
      const handleAppInstalled = () => {
        setShowInstallButton(false);
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', handleAppInstalled);

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
      };
    }
  }, []);

  // Обработчик установки PWA
  const handleInstallPWA = () => {
    if (window.deferredPrompt) {
      window.deferredPrompt.prompt();
      
      window.deferredPrompt.userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('Пользователь установил приложение');
        } else {
          console.log('Пользователь отказался от установки');
        }
        window.deferredPrompt = null;
        setShowInstallButton(false);
      });
    }
  };

  const toggleSideMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  const closeSideMenu = () => {
    setIsSideMenuOpen(false);
  };
  
  // Определяем иконку и подсказку для кнопки темы
  const getThemeButtonProps = () => {
    switch (themeMode) {
      case 'light':
        return {
          icon: 'sun' as IconName,
          label: 'Переключить на темную тему'
        };
      case 'dark':
        return {
          icon: 'moon' as IconName,
          label: 'Переключить на автоматический режим'
        };
      case 'auto':
        // В автоматическом режиме показываем иконку в зависимости от текущей темы
        return {
          icon: theme === 'light' ? 'sun' as IconName : 'moon' as IconName,
          label: 'Переключить на светлую тему'
        };
    }
  };
  
  const themeButtonProps = getThemeButtonProps();

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
              className={`theme-toggle ${themeMode === 'auto' ? 'theme-toggle--auto' : ''}`}
              onClick={cycleThemeMode}
              aria-label={themeButtonProps.label}
              title={themeButtonProps.label}
            >
              <Icon name={themeButtonProps.icon} />
            </button>

            {showInstallButton && (
              <button
                id="install-button"
                className="theme-toggle"
                onClick={handleInstallPWA}
                aria-label="Установить приложение"
              >
                <Icon name="download" />
              </button>
            )}

            <Link to="/profile" className="profile-button desktop-only" aria-label="Профиль">
              <Icon name="profile" />
            </Link>

            <Link to="/cart" className="cart-button desktop-only" aria-label="Корзина">
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
        onClose={closeSideMenu}
      />
    </>
  );
};

export default Header; 