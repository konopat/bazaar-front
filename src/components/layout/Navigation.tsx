import { Link, useLocation } from 'react-router-dom';
import { NavigationProps } from '../../types/layout';

const navigationItems = [
  { path: '/', label: 'Главная' },
  { path: '/catalog', label: 'Каталог' },
  { path: '/delivery', label: 'Доставка' },
  { path: '/about', label: 'О нас' },
  { path: '/contacts', label: 'Контакты' },
  { path: '/blog', label: 'Блог' }
];

const Navigation: React.FC<NavigationProps> = ({ className = '', onItemClick }) => {
  const location = useLocation();

  return (
    <nav className={`nav ${className}`}>
      {navigationItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav__link ${location.pathname === item.path ? 'nav__link--active' : ''}`}
          onClick={(e) => onItemClick && onItemClick({ name: item.label, href: item.path })}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default Navigation; 