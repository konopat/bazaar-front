import React from 'react';
import { 
  DELIVERY_INFO, 
  DELIVERY_METHODS, 
  DELIVERY_STEPS, 
  DELIVERY_TIPS, 
  DELIVERY_ZONES 
} from '../../constants/delivery';
import Icon from '../common/Icon';

// Функция для сопоставления эмодзи с именами иконок
const getIconNameForMethod = (emoji: string) => {
  switch (emoji) {
    case '🚚':
      return 'truck';
    case '🏪':
      return 'store';
    case '⚡':
      return 'lightning';
    default:
      return 'truck'; // Иконка по умолчанию
  }
};

const DeliveryPage: React.FC = () => {
  return (
    <div className="delivery">
      <div className="container">
        <h1 className="section-title section-title--centered">Доставка</h1>
        
        <section className="delivery__section">
          <h2 className="section-title">Способы доставки</h2>
          <div className="delivery__methods">
            {DELIVERY_METHODS.map(method => (
              <div key={method.id} className="delivery-method">
                <div className="delivery-method__icon">
                  <Icon 
                    name={getIconNameForMethod(method.icon)} 
                    size={18} 
                    color="currentColor" 
                  />
                </div>
                <div className="delivery-method__content">
                  <h3 className="delivery-method__title">{method.name}</h3>
                  <p className="delivery-method__description">{method.description}</p>
                  {method.features && (
                    <ul className="delivery-method__features">
                      {method.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <div className="divider-accent"></div>
        
        <section className="delivery__section">
          <h2 className="section-title">Зоны доставки и стоимость</h2>
          <div className="delivery__zones">
            <div className="delivery-zones__header">
              <div className="delivery-zones__header-item">Район</div>
              <div className="delivery-zones__header-item">Стоимость</div>
              <div className="delivery-zones__header-item">Время доставки</div>
              <div className="delivery-zones__header-item">Примечание</div>
            </div>
            {DELIVERY_ZONES.map(zone => (
              <div key={zone.id} className="delivery-zone">
                <div className="delivery-zone__name">{zone.name}</div>
                <div className="delivery-zone__price">{zone.price} ₽</div>
                <div className="delivery-zone__time">{zone.timeRange}</div>
                <div className="delivery-zone__description">{zone.description}</div>
              </div>
            ))}
          </div>
        </section>
        
        <div className="divider-accent"></div>
        
        <section className="delivery__section">
          <h2 className="section-title">Важная информация</h2>
          <div className="delivery__info">
            {DELIVERY_INFO.map(item => (
              <div key={item.id} className="info-item">
                <h3 className="info-item__title">{item.title}</h3>
                <p className="info-item__text">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
        
        <div className="divider-accent"></div>
        
        <section className="delivery__section">
          <h2 className="section-title">Как происходит доставка</h2>
          <div className="delivery__steps">
            {DELIVERY_STEPS.map(step => (
              <div key={step.id} className="delivery-step">
                <div className="delivery-step__number">{step.number}</div>
                <div className="delivery-step__content">
                  <h3 className="delivery-step__title">{step.title}</h3>
                  <p className="delivery-step__text">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <div className="divider-accent"></div>
        
        <section className="delivery__section delivery__section--tips">
          <h2 className="section-title">Советы по получению заказа</h2>
          <ul className="delivery__tips">
            {DELIVERY_TIPS.map(tip => (
              <li key={tip.id} className="delivery__tip">
                {tip.text}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default DeliveryPage; 