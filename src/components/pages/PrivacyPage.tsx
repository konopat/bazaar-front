import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="privacy">
      <div className="container">
        <h1 className="section-title section-title--centered">Политика конфиденциальности</h1>
        
        <div className="privacy__content">
          <section className="privacy__section">
            <h2 className="section-title">Общие положения</h2>
            <p className="privacy__text">
              Настоящая политика конфиденциальности определяет порядок обработки и защиты персональных данных физических лиц, пользующихся сервисами интернет-магазина Bazaar.
            </p>
            <p className="privacy__text">
              Политика конфиденциальности действует в отношении всех персональных данных, которые Bazaar может получить от пользователя во время использования сайта, программ и продуктов интернет-магазина.
            </p>
          </section>
          
          <section className="privacy__section">
            <h2 className="section-title">Сбор и использование персональных данных</h2>
            <p className="privacy__text">
              Базаар собирает и обрабатывает следующие персональные данные:
            </p>
            <ul className="privacy__list">
              <li className="privacy__list-item">Фамилия, имя, отчество</li>
              <li className="privacy__list-item">Адрес электронной почты</li>
              <li className="privacy__list-item">Номер телефона</li>
              <li className="privacy__list-item">Адрес доставки</li>
              <li className="privacy__list-item">История заказов</li>
              <li className="privacy__list-item">IP-адрес, данные файлов cookie</li>
            </ul>
            <p className="privacy__text">
              Персональные данные используются в следующих целях:
            </p>
            <ul className="privacy__list">
              <li className="privacy__list-item">Оформление заказов на сайте интернет-магазина</li>
              <li className="privacy__list-item">Доставка заказанных товаров</li>
              <li className="privacy__list-item">Осуществление клиентской поддержки</li>
              <li className="privacy__list-item">Предоставление пользователю информации о товарах и услугах</li>
              <li className="privacy__list-item">Улучшение качества услуг и удобства использования сайта</li>
              <li className="privacy__list-item">Проведение статистических и иных исследований</li>
            </ul>
          </section>
          
          <section className="privacy__section">
            <h2 className="section-title">Условия обработки персональных данных</h2>
            <p className="privacy__text">
              Обработка персональных данных пользователя осуществляется с момента их получения и до момента отзыва согласия пользователя на обработку его персональных данных.
            </p>
            <p className="privacy__text">
              Обработка персональных данных осуществляется Базаар в соответствии с Федеральным законом от 27.07.2006 N 152-ФЗ &quot;О персональных данных&quot;.
            </p>
            <p className="privacy__text">
              Базаар принимает необходимые организационные и технические меры для защиты персональных данных от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий третьих лиц.
            </p>
          </section>
          
          <section className="privacy__section">
            <h2 className="section-title">Права пользователя</h2>
            <p className="privacy__text">
              Пользователь имеет право:
            </p>
            <ul className="privacy__list">
              <li className="privacy__list-item">Получать информацию, касающуюся обработки его персональных данных</li>
              <li className="privacy__list-item">Требовать уточнения, блокирования или уничтожения своих персональных данных</li>
              <li className="privacy__list-item">Отозвать свое согласие на обработку персональных данных</li>
            </ul>
            <p className="privacy__text">
              Для реализации указанных прав пользователь может обратиться к Базаар с соответствующим запросом, направив письмо на адрес электронной почты: privacy@bazaar.ru
            </p>
          </section>
          
          <section className="privacy__section">
            <h2 className="section-title">Файлы cookie</h2>
            <p className="privacy__text">
              Сайт использует файлы cookie и аналогичные технологии для улучшения работы сайта и повышения удобства его использования.
            </p>
            <p className="privacy__text">
              Файлы cookie представляют собой небольшие текстовые файлы, которые сохраняются на устройстве пользователя и помогают сайту запоминать информацию о посещениях.
            </p>
            <p className="privacy__text">
              Пользователь может отключить или ограничить использование файлов cookie путем изменения настроек браузера.
            </p>
          </section>
          
          <section className="privacy__section">
            <h2 className="section-title">Изменение политики конфиденциальности</h2>
            <p className="privacy__text">
              Базаар имеет право вносить изменения в настоящую Политику конфиденциальности без согласия пользователя.
            </p>
            <p className="privacy__text">
              Новая редакция Политики конфиденциальности вступает в силу с момента ее размещения на сайте, если иное не предусмотрено новой редакцией.
            </p>
            <p className="privacy__text">
              Действующая редакция Политики конфиденциальности размещается на странице по адресу: bazaar.ru/privacy
            </p>
          </section>
          
          <section className="privacy__section">
            <h2 className="section-title">Контактная информация</h2>
            <p className="privacy__text">
              По всем вопросам, связанным с обработкой персональных данных, пожалуйста, обращайтесь:
            </p>
            <p className="privacy__text">
              <strong>Электронная почта:</strong> privacy@bazaar.ru<br />
              <strong>Телефон:</strong> +7 (999) 123-45-67<br />
              <strong>Адрес:</strong> г. Москва, ул. Цветочная, д. 1
            </p>
          </section>
          
          <div className="privacy__updated">
            <p className="privacy__updated-text">
              Последнее обновление: 10 мая 2023 года
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage; 