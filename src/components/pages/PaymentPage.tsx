import React from 'react';

const PaymentPage: React.FC = () => {
  return (
    <div className="payment">
      <div className="container">
        <h1 className="payment__title">Способы оплаты</h1>
        
        <div className="payment__content">
          <section className="payment__section">
            <h2 className="payment__subtitle">Онлайн оплата</h2>
            <div className="payment__methods">
              <div className="payment-method">
                <div className="payment-method__icon">💳</div>
                <div className="payment-method__info">
                  <h3 className="payment-method__title">Банковской картой</h3>
                  <p className="payment-method__description">
                    Visa, MasterCard, МИР. Безопасная оплата через защищенное соединение
                  </p>
                </div>
              </div>

              <div className="payment-method">
                <div className="payment-method__icon">📱</div>
                <div className="payment-method__info">
                  <h3 className="payment-method__title">СБП</h3>
                  <p className="payment-method__description">
                    Система быстрых платежей. Оплата через QR-код в приложении вашего банка
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="payment__section">
            <h2 className="payment__subtitle">Оплата при получении</h2>
            <div className="payment__methods">
              <div className="payment-method">
                <div className="payment-method__icon">💵</div>
                <div className="payment-method__info">
                  <h3 className="payment-method__title">Наличными</h3>
                  <p className="payment-method__description">
                    Оплата наличными курьеру при доставке или в магазине при самовывозе
                  </p>
                </div>
              </div>

              <div className="payment-method">
                <div className="payment-method__icon">💳</div>
                <div className="payment-method__info">
                  <h3 className="payment-method__title">Картой при получении</h3>
                  <p className="payment-method__description">
                    Оплата картой через терминал у курьера или на кассе магазина
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="payment__section">
            <h2 className="payment__subtitle">Корпоративным клиентам</h2>
            <div className="payment__methods">
              <div className="payment-method">
                <div className="payment-method__icon">🏢</div>
                <div className="payment-method__info">
                  <h3 className="payment-method__title">Безналичный расчет</h3>
                  <p className="payment-method__description">
                    Оплата по счету для юридических лиц. Закрывающие документы предоставляются
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="payment__section payment__section--info">
            <h2 className="payment__subtitle">Важная информация</h2>
            <div className="payment__info-list">
              <div className="payment__info-item">
                <h3>Безопасность</h3>
                <p>
                  Все платежи проходят через защищенное соединение. 
                  Мы не храним данные ваших карт.
                </p>
              </div>
              <div className="payment__info-item">
                <h3>Возврат средств</h3>
                <p>
                  В случае отмены заказа средства возвращаются на карту 
                  в течение 3-5 рабочих дней.
                </p>
              </div>
              <div className="payment__info-item">
                <h3>Чеки</h3>
                <p>
                  После оплаты вы получите электронный чек на указанную 
                  почту или телефон.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage; 