import React, { useState } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface Store {
  id: number;
  name: string;
  address: string;
  hours: string;
  phone: string;
  coordinates: [number, number];
}

const stores: Store[] = [
  {
    id: 1,
    name: 'BAZAAR в ТЦ "Карамель"',
    address: 'Маршала Жукова (пр) 15А',
    hours: '10:00 - 22:00',
    phone: '+7 (908) 774-00-15',
    coordinates: [52.287, 104.281]
  },
  {
    id: 2,
    name: 'BAZAAR в ТЦ "Сильвер Молл"',
    address: 'Байкальская 180/2',
    hours: '10:00 - 22:00',
    phone: '+7 (908) 774-00-16',
    coordinates: [52.257, 104.308]
  },
  {
    id: 3,
    name: 'BAZAAR в ТЦ "Новый"',
    address: 'Николая Гаврилова 4',
    hours: '10:00 - 22:00',
    phone: '+7 (908) 774-00-17',
    coordinates: [52.223, 104.338]
  }
];

const ContactsPage: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="contacts">
      <div className="container">
        <h1 className="contacts__title">Контакты</h1>

        <div className="contacts__content">
          <section className="contacts__section">
            <h2 className="contacts__subtitle">Наши магазины</h2>
            <div className="contacts__stores">
              {stores.map(store => (
                <div key={store.id} className="store-card">
                  <h3 className="store-card__title">{store.name}</h3>
                  <div className="store-card__info">
                    <div className="store-card__row">
                      <span className="store-card__icon">📍</span>
                      <span>{store.address}</span>
                    </div>
                    <div className="store-card__row">
                      <span className="store-card__icon">🕒</span>
                      <span>{store.hours}</span>
                    </div>
                    <div className="store-card__row">
                      <span className="store-card__icon">📞</span>
                      <a href={`tel:${store.phone}`} className="store-card__phone">
                        {store.phone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="contacts__section contacts__section--map">
            <h2 className="contacts__subtitle">Карта расположения</h2>
            <div className="contacts__map">
              {/* Здесь будет компонент карты */}
              <div className="contacts__map-placeholder">
                Карта загружается...
              </div>
            </div>
          </section>

          <section className="contacts__section contacts__section--form">
            <h2 className="contacts__subtitle">Напишите нам</h2>
            <form className="contacts__form" onSubmit={handleSubmit}>
              <div className="contacts__form-grid">
                <div className="contacts__form-field">
                  <label htmlFor="name" className="contacts__form-label">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="contacts__form-input"
                    required
                  />
                </div>

                <div className="contacts__form-field">
                  <label htmlFor="email" className="contacts__form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="contacts__form-input"
                    required
                  />
                </div>

                <div className="contacts__form-field">
                  <label htmlFor="phone" className="contacts__form-label">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="contacts__form-input"
                    required
                  />
                </div>

                <div className="contacts__form-field contacts__form-field--full">
                  <label htmlFor="message" className="contacts__form-label">
                    Сообщение
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="contacts__form-textarea"
                    required
                  />
                </div>
              </div>

              <button type="submit" className="button button--primary contacts__form-submit">
                Отправить сообщение
              </button>
            </form>
          </section>

          <section className="contacts__section contacts__section--social">
            <h2 className="contacts__subtitle">Мы в социальных сетях</h2>
            <div className="contacts__social">
              <a href="#" className="social-link">
                <span className="social-link__icon">📱</span>
                <span className="social-link__name">WhatsApp</span>
              </a>
              <a href="#" className="social-link">
                <span className="social-link__icon">💬</span>
                <span className="social-link__name">VK</span>
              </a>
              <a href="#" className="social-link">
                <span className="social-link__icon">✈️</span>
                <span className="social-link__name">Telegram</span>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;