import React, { useState } from 'react';
import { 
  STORES, 
  SOCIAL_NETWORKS, 
  PHONE_NUMBER, 
  CONTACT_FORM_FIELDS 
} from '../../constants/contacts';
import StoresModal from '../map/StoresModal';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactsPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    
    // Сбрасываем форму через 3 секунды
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      setFormSubmitted(false);
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Получить день недели для отображения расписания (0 - понедельник)
  const getTodaySchedule = (store: typeof STORES[0]) => {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const today = new Date().getDay();
    const dayIndex = today === 0 ? 6 : today - 1; // переводим с воскресенья=0 на понедельник=0
    const dayName = days[dayIndex] as keyof typeof store.workSchedule;
    
    const schedule = store.workSchedule[dayName];
    if (schedule.dayOff) return 'Выходной';
    return `${schedule.open} - ${schedule.close}`;
  };

  return (
    <div className="contacts">
      <div className="container">
        <h1 className="fashion-heading fashion-heading--centered">Контакты</h1>
        
        <section className="gold-frame">
          <h2 className="fashion-heading">Наши магазины</h2>
          <div className="contacts__stores">
            {STORES.map(store => (
              <div key={store.id} className="store-card decorative-border">
                <h3 className="store-card__name gradient-text">{store.name}</h3>
                <div className="store-card__info">
                  <div className="store-card__row">
                    <span className="store-card__icon gold-block">📍</span>
                    <span className="store-card__address">{store.address}</span>
                  </div>
                  <div className="store-card__row">
                    <span className="store-card__icon gold-block">🕒</span>
                    <span className="store-card__hours">
                      {getTodaySchedule(store)}
                      <small className="store-card__today">Сегодня</small>
                    </span>
                  </div>
                  <div className="store-card__row">
                    <span className="store-card__icon gold-block">📞</span>
                    <a href={`tel:${store.phone}`} className="store-card__phone">
                      {store.phone}
                    </a>
                  </div>
                </div>
                <div className="store-card__photo">
                  <img src={store.photo} alt={store.name} />
                </div>
              </div>
            ))}
          </div>
          
          <div className="contacts__map-button-container">
            <button 
              className="button button--gold"
              onClick={() => setIsMapModalOpen(true)}
            >
              Посмотреть на карте
            </button>
          </div>
        </section>
        
        <div className="divider-gold"></div>
        
        <section className="gold-frame">
          <h2 className="fashion-heading">Напишите нам</h2>
          {formSubmitted ? (
            <div className="contacts__form-success">
              <div className="contacts__form-success-icon gold-block">✓</div>
              <h3 className="contacts__form-success-title gradient-text">Сообщение отправлено</h3>
              <p className="contacts__form-success-text">
                Спасибо за ваше сообщение! Наши менеджеры свяжутся с вами в ближайшее время.
              </p>
            </div>
          ) : (
            <form className="contacts__form" onSubmit={handleSubmit}>
              <div className="contacts__form-grid">
                {CONTACT_FORM_FIELDS.map(field => (
                  <div 
                    key={field.id} 
                    className={`contacts__form-field ${field.type === 'textarea' ? 'contacts__form-field--full' : ''}`}
                  >
                    <label htmlFor={field.id} className="contacts__form-label">
                      {field.label}
                    </label>
                    {field.type === 'textarea' ? (
                      <textarea
                        id={field.id}
                        name={field.name}
                        value={formData[field.name as keyof ContactFormData]}
                        onChange={handleChange}
                        className="contacts__form-textarea"
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    ) : (
                      <input
                        type={field.type}
                        id={field.id}
                        name={field.name}
                        value={formData[field.name as keyof ContactFormData]}
                        onChange={handleChange}
                        className="contacts__form-input"
                        placeholder={field.placeholder}
                        required={field.required}
                      />
                    )}
                  </div>
                ))}
              </div>

              <button type="submit" className="button button--gold contacts__form-submit">
                Отправить сообщение
              </button>
            </form>
          )}
        </section>
        
        <div className="divider-gold"></div>
        
        <section className="gold-frame">
          <h2 className="fashion-heading">Мы в социальных сетях</h2>
          <div className="contacts__social">
            {SOCIAL_NETWORKS.map(network => (
              <a key={network.name} href={network.url} className="social-link decorative-border floral-accent">
                <span className="social-link__icon gold-block">
                  <i className={`icon-${network.name}`}></i>
                </span>
                <span className="social-link__name gradient-text">{network.label}</span>
              </a>
            ))}
          </div>
          
          <div className="contacts__main-phone">
            <div className="contacts__phone-label">Основной телефон для связи:</div>
            <a href={`tel:${PHONE_NUMBER}`} className="contacts__phone gradient-text">{PHONE_NUMBER}</a>
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

export default ContactsPage;