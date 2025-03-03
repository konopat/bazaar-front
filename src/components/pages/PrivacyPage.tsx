import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="privacy">
      <div className="container">
        <h1 className="privacy__title">Политика конфиденциальности</h1>
        <div className="privacy__content">
          <section className="privacy__section">
            <h2 className="privacy__subtitle">1. Общие положения</h2>
            <p className="privacy__text">
              Настоящая политика конфиденциальности описывает принципы обработки и защиты информации о физических лицах, которую мы получаем при использовании сайта BAZAAR.
            </p>
          </section>

          <section className="privacy__section">
            <h2 className="privacy__subtitle">2. Какую информацию мы собираем</h2>
            <div className="privacy__list">
              <div className="privacy__item">
                <h3 className="privacy__item-title">Персональные данные</h3>
                <p className="privacy__text">
                  При оформлении заказа или регистрации мы можем собирать следующую информацию:
                </p>
                <ul className="privacy__bullet-list">
                  <li>Имя и фамилию</li>
                  <li>Контактный телефон</li>
                  <li>Email адрес</li>
                  <li>Адрес доставки</li>
                </ul>
              </div>
              <div className="privacy__item">
                <h3 className="privacy__item-title">Техническая информация</h3>
                <p className="privacy__text">
                  При использовании сайта мы автоматически получаем:
                </p>
                <ul className="privacy__bullet-list">
                  <li>IP-адрес</li>
                  <li>Информацию о браузере</li>
                  <li>Данные файлов cookie</li>
                  <li>Время доступа</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="privacy__section">
            <h2 className="privacy__subtitle">3. Как мы используем информацию</h2>
            <p className="privacy__text">
              Собранная информация используется для:
            </p>
            <ul className="privacy__bullet-list">
              <li>Обработки и доставки заказов</li>
              <li>Улучшения работы сайта</li>
              <li>Отправки информационных сообщений</li>
              <li>Предоставления персонализированных рекомендаций</li>
            </ul>
          </section>

          <section className="privacy__section">
            <h2 className="privacy__subtitle">4. Защита информации</h2>
            <p className="privacy__text">
              Мы принимаем необходимые организационные и технические меры для защиты персональной информации от неправомерного или случайного доступа, уничтожения, изменения, блокирования, копирования, распространения, а также от иных неправомерных действий с ней третьих лиц.
            </p>
          </section>

          <section className="privacy__section">
            <h2 className="privacy__subtitle">5. Права пользователя</h2>
            <p className="privacy__text">
              Вы имеете право:
            </p>
            <ul className="privacy__bullet-list">
              <li>Получить информацию о хранящихся данных</li>
              <li>Требовать исправления неверных данных</li>
              <li>Требовать удаления данных</li>
              <li>Отозвать согласие на обработку данных</li>
            </ul>
          </section>

          <section className="privacy__section">
            <h2 className="privacy__subtitle">6. Контакты</h2>
            <p className="privacy__text">
              По всем вопросам, связанным с обработкой персональных данных, вы можете обратиться к нам:
            </p>
            <div className="privacy__contacts">
              <p>Email: privacy@bazaar.ru</p>
              <p>Телефон: +7 (908) 774-00-15</p>
              <p>Адрес: г. Иркутск, ул. Маршала Жукова, 15А</p>
            </div>
          </section>

          <section className="privacy__section privacy__section--update">
            <p className="privacy__update">
              Последнее обновление: 1 марта 2024 года
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage; 