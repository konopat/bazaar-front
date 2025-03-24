import Icon from './Icon';

interface SocialLinksProps {
  className?: string;
}

const SocialLinks = ({ className = '' }: SocialLinksProps) => {
  const socialLinks = [
    { name: 'telegram' as const, label: 'Telegram', url: '#' },
    { name: 'whatsapp' as const, label: 'WhatsApp', url: '#' },
    { name: 'instagram' as const, label: 'Instagram', url: '#' },
  ];

  return (
    <div className={`social-links ${className}`}>
      {socialLinks.map(link => (
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