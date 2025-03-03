import React from 'react';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  photo: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Анна Петрова',
    position: 'Главный флорист',
    photo: '/images/team/florist1.jpg',
    description: 'Более 10 лет опыта в создании уникальных букетов. Победитель международных конкурсов флористики.'
  },
  {
    id: 2,
    name: 'Михаил Иванов',
    position: 'Арт-директор',
    photo: '/images/team/florist2.jpg',
    description: 'Отвечает за визуальную концепцию букетов и оформление магазинов. Преподаватель школы флористики.'
  },
  {
    id: 3,
    name: 'Елена Сидорова',
    position: 'Флорист-декоратор',
    photo: '/images/team/florist3.jpg',
    description: 'Специализируется на свадебной флористике и оформлении мероприятий. Создает незабываемые композиции.'
  }
];

const AboutPage: React.FC = () => {
  return (
    <div className="about">
      <div className="container">
        <section className="about__hero">
          <h1 className="about__title">О компании BAZAAR</h1>
          <p className="about__subtitle">
            Мы создаем букеты с любовью и вниманием к каждой детали
          </p>
        </section>

        <section className="about__section">
          <div className="about__grid">
            <div className="about__content">
              <h2 className="about__subtitle">Наша история</h2>
              <p className="about__text">
                BAZAAR начал свою историю в 2015 году с небольшого цветочного магазина 
                в центре Иркутска. За эти годы мы выросли до сети из трех магазинов и 
                стали одним из ведущих флористических салонов города.
              </p>
              <p className="about__text">
                Наша миссия — делать жизнь людей ярче и радостнее через искусство 
                флористики. Мы верим, что каждый букет — это история, которая может 
                рассказать о чувствах лучше любых слов.
              </p>
            </div>
            <div className="about__image">
              <img src="/images/about/store.jpg" alt="Наш первый магазин" />
            </div>
          </div>
        </section>

        <section className="about__section about__section--values">
          <h2 className="about__subtitle">Наши ценности</h2>
          <div className="about__values">
            <div className="value-card">
              <div className="value-card__icon">🌱</div>
              <h3 className="value-card__title">Качество</h3>
              <p className="value-card__description">
                Мы работаем только с проверенными поставщиками и отбираем лучшие цветы
              </p>
            </div>
            <div className="value-card">
              <div className="value-card__icon">💝</div>
              <h3 className="value-card__title">Индивидуальный подход</h3>
              <p className="value-card__description">
                Каждый букет создается с учетом ваших пожеланий и предпочтений
              </p>
            </div>
            <div className="value-card">
              <div className="value-card__icon">🚀</div>
              <h3 className="value-card__title">Оперативность</h3>
              <p className="value-card__description">
                Быстрая доставка и возможность срочного заказа букета
              </p>
            </div>
          </div>
        </section>

        <section className="about__section">
          <h2 className="about__subtitle">Наша команда</h2>
          <div className="about__team">
            {teamMembers.map(member => (
              <div key={member.id} className="team-card">
                <div className="team-card__photo">
                  <img src={member.photo} alt={member.name} />
                </div>
                <div className="team-card__content">
                  <h3 className="team-card__name">{member.name}</h3>
                  <p className="team-card__position">{member.position}</p>
                  <p className="team-card__description">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="about__section about__section--stats">
          <div className="about__stats">
            <div className="stat-card">
              <div className="stat-card__number">8+</div>
              <div className="stat-card__label">Лет опыта</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__number">50k+</div>
              <div className="stat-card__label">Букетов создано</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__number">15k+</div>
              <div className="stat-card__label">Довольных клиентов</div>
            </div>
            <div className="stat-card">
              <div className="stat-card__number">3</div>
              <div className="stat-card__label">Магазина в городе</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage; 