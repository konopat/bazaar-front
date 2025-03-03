import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationProps {
  className?: string;
  onLinkClick?: (e: React.MouseEvent) => void;
}

const navigationItems = [
  { path: '/', label: 'Главная' },
  { path: '/catalog', label: 'Каталог' },
  { path: '/delivery', label: 'Доставка' },
  { path: '/about', label: 'О нас' },
  { path: '/contacts', label: 'Контакты' },
  { path: '/blog', label: 'Блог' }
];

const Navigation: React.FC<NavigationProps> = ({ className = '', onLinkClick }) => {
  const location = useLocation();

  return (
    <nav className={`nav ${className}`}>
      {navigationItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav__link ${location.pathname === item.path ? 'nav__link--active' : ''}`}
          onClick={onLinkClick}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation; 