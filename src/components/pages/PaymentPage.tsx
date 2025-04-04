import React from 'react';
import { PaymentMethod } from '../../types/payment';

const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 1,
    name: 'Банковские карты',
    description: 'Visa, MasterCard, МИР и другие',
    icon: '💳'
  },
  {
    id: 2,
    name: 'Онлайн-оплата',
    description: 'СБП, ЮMoney, WebMoney и другие',
    icon: '🌐'
  },
  {
    id: 3,
    name: 'Наличными',
    description: 'При получении заказа',
    icon: '💵'
  }
];

const PaymentPage: React.FC = () => {
  return (
    <div className="payment">
      <div className="container">
        <h1 className="section-title section-title--centered">Оплата</h1>

        <section className="payment__section">
          <h2 className="section-title">Способы оплаты</h2>
          <div className="payment__methods">
            {PAYMENT_METHODS.map(method => (
              <div key={method.id} className="payment-method">
                <div className="payment-method__icon">{method.icon}</div>
                <div className="payment-method__content">
                  <h3 className="payment-method__title">{method.name}</h3>
                  <p className="payment-method__description">{method.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="payment__section">
          <h2 className="section-title">Процесс оплаты</h2>
          <div className="payment__steps">
            <div className="payment-step">
              <div className="payment-step__number">1</div>
              <div className="payment-step__content">
                <h3 className="payment-step__title">Выбор товаров</h3>
                <p className="payment-step__text">
                  Выберите понравившиеся товары и добавьте их в корзину
                </p>
              </div>
            </div>
            
            <div className="payment-step">
              <div className="payment-step__number">2</div>
              <div className="payment-step__content">
                <h3 className="payment-step__title">Оформление заказа</h3>
                <p className="payment-step__text">
                  Заполните информацию о доставке и выберите способ оплаты
                </p>
              </div>
            </div>
            
            <div className="payment-step">
              <div className="payment-step__number">3</div>
              <div className="payment-step__content">
                <h3 className="payment-step__title">Оплата</h3>
                <p className="payment-step__text">
                  Выполните оплату выбранным способом
                </p>
              </div>
            </div>
            
            <div className="payment-step">
              <div className="payment-step__number">4</div>
              <div className="payment-step__content">
                <h3 className="payment-step__title">Подтверждение</h3>
                <p className="payment-step__text">
                  Получите подтверждение заказа на email и в SMS
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="payment__section">
          <h2 className="section-title">Часто задаваемые вопросы</h2>
          <div className="payment__faq">
            <div className="faq-item">
              <h3 className="faq-item__question">Безопасна ли оплата на сайте?</h3>
              <p className="faq-item__answer">
                Да, мы используем современные протоколы безопасности и не храним данные ваших карт. 
                Оплата происходит через защищенное соединение.
              </p>
            </div>
            
            <div className="faq-item">
              <h3 className="faq-item__question">Когда списываются деньги с карты?</h3>
              <p className="faq-item__answer">
                Средства списываются сразу после подтверждения заказа. 
                В случае отмены заказа, деньги будут возвращены в течение 3-14 банковских дней.
              </p>
            </div>
            
            <div className="faq-item">
              <h3 className="faq-item__question">Можно ли оплатить заказ при получении?</h3>
              <p className="faq-item__answer">
                Да, вы можете оплатить заказ наличными или картой при получении. 
                Обратите внимание, что при самовывозе доступны все способы оплаты.
              </p>
            </div>
            
            <div className="faq-item">
              <h3 className="faq-item__question">Выдаете ли вы чек?</h3>
              <p className="faq-item__answer">
                Да, при любом способе оплаты мы предоставляем электронный чек, 
                который приходит на вашу электронную почту.
              </p>
            </div>
          </div>
        </section>

        <section className="payment__section">
          <h2 className="section-title">Корпоративным клиентам</h2>
          <div className="payment__corporate">
            <p className="payment__corporate-text">
              Для корпоративных клиентов мы предлагаем возможность оплаты по безналичному расчету.
              Работаем как с юридическими лицами, так и с ИП.
            </p>
            <div className="payment__corporate-benefits">
              <div className="corporate-benefit">
                <h3 className="corporate-benefit__title">Документы</h3>
                <p className="corporate-benefit__text">
                  Предоставляем полный пакет документов: договор, счет, накладные
                </p>
              </div>
              <div className="corporate-benefit">
                <h3 className="corporate-benefit__title">Отсрочка платежа</h3>
                <p className="corporate-benefit__text">
                  Возможна отсрочка платежа для постоянных клиентов
                </p>
              </div>
              <div className="corporate-benefit">
                <h3 className="corporate-benefit__title">Скидки</h3>
                <p className="corporate-benefit__text">
                  Индивидуальные скидки при регулярных заказах
                </p>
              </div>
            </div>
            <p className="payment__corporate-contact">
              По вопросам сотрудничества обращайтесь по телефону +7 (999) 123-45-67 
              или по email: corporate@bazaar.ru
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaymentPage; 