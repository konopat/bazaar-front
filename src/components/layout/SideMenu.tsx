import React from 'react';
import type { MouseEvent } from 'react';
import Navigation from './Navigation';
import SocialLinks from '../common/SocialLinks';
import StoreAddresses from '../common/StoreAddresses';
import { PHONE_NUMBER } from '../../constants/contacts';

interface SideMenuProps {
  isOpen: boolean;
  onLinkClick: (e: MouseEvent<HTMLElement>) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ isOpen, onLinkClick }) => {
  return (
    <div className={`side-menu ${isOpen ? 'side-menu--open' : ''}`}>
      <div className="side-menu__content">
        <Navigation className="side-menu__nav" onLinkClick={onLinkClick} />
        
        <div className="side-menu__info">
          <h3 className="side-menu__subtitle">Наши магазины</h3>
          <StoreAddresses className="side-menu__stores" />
          
          <div className="side-menu__contacts">
            <a href={`tel:${PHONE_NUMBER}`} className="side-menu__main-phone">{PHONE_NUMBER}</a>
            <SocialLinks className="social-links--start" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenu; 