import React from 'react';
import { 
  DELIVERY_ZONES, 
  DELIVERY_METHODS, 
  DELIVERY_INFO, 
  DELIVERY_STEPS, 
  DELIVERY_TIPS 
} from '../../constants/delivery';

const DeliveryPage: React.FC = () => {
  return (
    <div className="delivery">
      <div className="container">
        <h1 className="fashion-heading fashion-heading--centered">Доставка</h1>
        
        <section className="gold-frame">
          <h2 className="fashion-heading">Способы доставки</h2>
          <div className="delivery__methods">
            {DELIVERY_METHODS.map(method => (
              <div key={method.id} className="delivery-method decorative-border">
                <div className="delivery-method__icon">{method.icon}</div>
                <div className="delivery-method__content">
                  <h3 className="delivery-method__title gradient-text">{method.name}</h3>
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
        
        <div className="divider-gold"></div>
        
        <section className="gold-frame">
          <h2 className="fashion-heading">Зоны доставки и стоимость</h2>
          <div className="delivery__zones">
            <div className="delivery-zones__header">
              <div className="delivery-zones__header-item gradient-text">Район</div>
              <div className="delivery-zones__header-item gradient-text">Стоимость</div>
              <div className="delivery-zones__header-item gradient-text">Время доставки</div>
              <div className="delivery-zones__header-item gradient-text">Примечание</div>
            </div>
            {DELIVERY_ZONES.map(zone => (
              <div key={zone.id} className="delivery-zone decorative-border">
                <div className="delivery-zone__name">{zone.name}</div>
                <div className="delivery-zone__price gradient-text">{zone.price} ₽</div>
                <div className="delivery-zone__time">{zone.timeRange}</div>
                <div className="delivery-zone__description">{zone.description}</div>
              </div>
            ))}
          </div>
        </section>
        
        <div className="divider-gold"></div>
        
        <section className="gold-frame">
          <h2 className="fashion-heading">Важная информация</h2>
          <div className="delivery__info">
            {DELIVERY_INFO.map(item => (
              <div key={item.id} className="info-item decorative-border">
                <h3 className="info-item__title gradient-text">{item.title}</h3>
                <p className="info-item__text">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
        
        <div className="divider-gold"></div>
        
        <section className="gold-frame">
          <h2 className="fashion-heading">Как происходит доставка</h2>
          <div className="delivery__steps">
            {DELIVERY_STEPS.map(step => (
              <div key={step.id} className="delivery-step decorative-border">
                <div className="delivery-step__number gold-block">{step.number}</div>
                <div className="delivery-step__content">
                  <h3 className="delivery-step__title gradient-text">{step.title}</h3>
                  <p className="delivery-step__text">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <div className="divider-gold"></div>
        
        <section className="gold-frame delivery__section--tips">
          <h2 className="fashion-heading">Советы по получению заказа</h2>
          <ul className="delivery__tips">
            {DELIVERY_TIPS.map(tip => (
              <li key={tip.id} className="delivery__tip floral-accent">
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