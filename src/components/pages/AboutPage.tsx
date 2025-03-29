import React, { useState } from 'react';
import { STORES } from '../../constants/contacts';
import { 
  TEAM_MEMBERS, 
  COMPANY_VALUES, 
  HISTORY_MILESTONES, 
  ABOUT_COMPANY_TEXT 
} from '../../constants/about';
import StoresModal from '../map/StoresModal';
import Icon from '../common/Icon';

// Функция для сопоставления эмодзи с именами иконок
const getIconNameForValue = (emoji: string) => {
  switch (emoji) {
    case '🌱':
      return 'leaf';
    case '💎':
      return 'diamond';
    case '❤️':
      return 'heart';
    case '🤝':
      return 'handshake';
    default:
      return 'leaf'; // Иконка по умолчанию
  }
};

const AboutPage: React.FC = () => {
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [activeTeamMember, setActiveTeamMember] = useState<number | null>(null);

  // Обработчик для открытия детальной информации о сотруднике
  const handleTeamMemberClick = (id: number) => {
    setActiveTeamMember(activeTeamMember === id ? null : id);
  };

  return (
    <div className="about">
      <div className="container">
        <h1 className="section-title section-title--centered">О нас</h1>
        
        <section className="about__section">
          <h2 className="section-title">История нашего бренда</h2>
          <div className="about__content">
            <div className="framed-image">
              <img src="/images/about/about-history.jpg" alt="История Bazaar" />
            </div>
            <div className="about__text-block">
              <p className="about__paragraph">{ABOUT_COMPANY_TEXT.main}</p>
              <p className="about__paragraph">{ABOUT_COMPANY_TEXT.philosophy}</p>
              <p className="about__paragraph">{ABOUT_COMPANY_TEXT.quality}</p>
            </div>
          </div>
          
          <div className="divider-accent"></div>
          
          <div className="about__timeline">
            {HISTORY_MILESTONES.map(milestone => (
              <div key={milestone.id} className="milestone">
                <div className="milestone__year">{milestone.year}</div>
                <div className="milestone__content">
                  <h3 className="milestone__title">{milestone.title}</h3>
                  <p className="milestone__description">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <div className="divider-accent"></div>
        
        <section className="about__section">
          <h2 className="section-title">Наша команда</h2>
          <div className="about__team">
            {TEAM_MEMBERS.map(member => (
              <div 
                key={member.id} 
                className={`team-card ${activeTeamMember === member.id ? 'team-card--active' : ''}`}
                onClick={() => handleTeamMemberClick(member.id)}
              >
                <div className="team-card__photo-wrapper">
                  <img src={member.photo} alt={member.name} className="team-card__photo" />
                </div>
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__position">{member.position}</p>
                {activeTeamMember === member.id && (
                  <div className="team-card__bio fade-in">
                    <p>{member.bio}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        
        <div className="divider-accent"></div>
        
        <section className="about__section">
          <h2 className="section-title">Наши ценности</h2>
          <div className="about__values">
            {COMPANY_VALUES.map(value => (
              <div key={value.id} className="value-card">
                <div className="value-card__icon">
                  <Icon 
                    name={getIconNameForValue(value.icon)} 
                    size={18} 
                    color="currentColor" 
                  />
                </div>
                <h3 className="value-card__title">{value.title}</h3>
                <p className="value-card__text">{value.text}</p>
              </div>
            ))}
          </div>
        </section>
        
        <div className="divider-accent"></div>
        
        <section className="about__section">
          <h2 className="section-title">Где нас найти</h2>
          <p className="about__text about__text--centered">
            Мы расположены в самых удобных локациях города. У нас {STORES.length} магазина, где вы можете выбрать готовые букеты или заказать индивидуальную композицию.
          </p>
          <div className="about__stores-map">
            <div className="about__stores-list">
              {STORES.map(store => (
                <div key={store.id} className="store-card">
                  <h3 className="store-card__name">{store.name}</h3>
                  <p className="store-card__address">{store.address}</p>
                  <p className="store-card__phone">{store.phone}</p>
                </div>
              ))}
            </div>
            <div className="about__map-button-container">
              <button 
                className="button button--primary"
                onClick={() => setIsMapModalOpen(true)}
              >
                Посмотреть на карте
              </button>
            </div>
          </div>
        </section>
      </div>

      <StoresModal 
        isOpen={isMapModalOpen} 
        onClose={() => setIsMapModalOpen(false)} 
      />
    </div>
  );
};

export default AboutPage; 