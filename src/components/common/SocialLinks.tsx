import Icon from './Icon';
import { SOCIAL_NETWORKS } from '../../constants/contacts';

interface SocialLinksProps {
  className?: string;
}

const SocialLinks = ({ className = '' }: SocialLinksProps) => {
  return (
    <div className={`social-links ${className}`}>
      {SOCIAL_NETWORKS.map(link => (
        <a 
          key={link.name} 
          href={link.url} 
          className="social-links__item" 
          aria-label={link.label}
        >
          <Icon name={link.name} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks; 