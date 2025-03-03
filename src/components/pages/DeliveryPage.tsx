import React from 'react';

interface DeliveryZone {
  id: number;
  name: string;
  price: number;
  time: string;
  description: string;
}

const deliveryZones: DeliveryZone[] = [
  {
    id: 1,
    name: 'Центр города',
    price: 300,
    time: '1-2 часа',
    description: 'Свердловский, Правобережный и Октябрьский районы'
  },
  {
    id: 2,
    name: 'Пригород',
    price: 500,
    time: '2-3 часа',
    description: 'Ленинский район, Молодежный, Первомайский'
  },
  {
    id: 3,
    name: 'Отдаленные районы',
    price: 700,
    time: '3-4 часа',
    description: 'Мельничная Падь, Марково, Дзержинск'
  }
];

const DeliveryPage: React.FC = () => {
  return (
    <div className="delivery">
      <div className="container">
        <h1 className="delivery__title">Доставка букетов</h1>

        <div className="delivery__content">
          <section className="delivery__section">
            <h2 className="delivery__subtitle">Способы получения</h2>
            <div className="delivery__methods">
              <div className="delivery-method">
                <div className="delivery-method__icon">🚗</div>
                <div className="delivery-method__info">
                  <h3 className="delivery-method__title">Курьерская доставка</h3>
                  <p className="delivery-method__description">
                    Доставка до двери курьером в удобное для вас время
                  </p>
                  <ul className="delivery-method__features">
                    <li>Предварительный звонок</li>
                    <li>Отправка фото букета перед доставкой</li>
                    <li>Возможность бесконтактной доставки</li>
                  </ul>
                </div>
              </div>

              <div className="delivery-method">
                <div className="delivery-method__icon">🏪</div>
                <div className="delivery-method__info">
                  <h3 className="delivery-method__title">Самовывоз</h3>
                  <p className="delivery-method__description">
                    Бесплатный самовывоз из наших магазинов
                  </p>
                  <ul className="delivery-method__features">
                    <li>3 точки самовывоза в городе</li>
                    <li>Удобное расположение</li>
                    <li>Можно забрать через 30 минут после заказа</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="delivery__section">
            <h2 className="delivery__subtitle">Зоны и стоимость доставки</h2>
            <div className="delivery__zones">
              {deliveryZones.map(zone => (
                <div key={zone.id} className="delivery-zone">
                  <div className="delivery-zone__header">
                    <h3 className="delivery-zone__title">{zone.name}</h3>
                    <span className="delivery-zone__price">{zone.price} ₽</span>
                  </div>
                  <div className="delivery-zone__info">
                    <div className="delivery-zone__time">
                      <span className="delivery-zone__label">Время доставки:</span>
                      <span className="delivery-zone__value">{zone.time}</span>
                    </div>
                    <p className="delivery-zone__description">{zone.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="delivery__section">
            <h2 className="delivery__subtitle">Наши магазины</h2>
            <div className="delivery__shops">
              <div className="delivery-shop">
                <h3 className="delivery-shop__title">ТЦ "Карамель"</h3>
                <p className="delivery-shop__address">Маршала Жукова (пр) 15А</p>
                <p className="delivery-shop__hours">10:00 - 22:00</p>
              </div>
              <div className="delivery-shop">
                <h3 className="delivery-shop__title">ТЦ "Сильвер Молл"</h3>
                <p className="delivery-shop__address">Байкальская 180/2</p>
                <p className="delivery-shop__hours">10:00 - 22:00</p>
              </div>
              <div className="delivery-shop">
                <h3 className="delivery-shop__title">ТЦ "Новый"</h3>
                <p className="delivery-shop__address">Николая Гаврилова 4</p>
                <p className="delivery-shop__hours">10:00 - 22:00</p>
              </div>
            </div>
          </section>

          <section className="delivery__section delivery__section--info">
            <h2 className="delivery__subtitle">Важная информация</h2>
            <div className="delivery__info-list">
              <div className="delivery__info-item">
                <h3>Срочная доставка</h3>
                <p>
                  Доставка в течение 1 часа при наличии свободных курьеров.
                  Дополнительная плата 300 ₽.
                </p>
              </div>
              <div className="delivery__info-item">
                <h3>Время доставки</h3>
                <p>
                  Доставка осуществляется ежедневно с 8:00 до 22:00.
                  Возможна доставка в нерабочее время по договоренности.
                </p>
              </div>
              <div className="delivery__info-item">
                <h3>Праздничные дни</h3>
                <p>
                  В праздничные дни рекомендуем оформлять заказы заранее.
                  Возможно увеличение сроков доставки.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DeliveryPage; 