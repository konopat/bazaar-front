import React, { useState } from 'react';

interface Vacancy {
  id: number;
  title: string;
  location: string;
  type: string;
  salary: string;
  description: string[];
  requirements: string[];
}

interface Benefit {
  id: number;
  icon: string;
  title: string;
  description: string;
}

const benefits: Benefit[] = [
  {
    id: 1,
    icon: '🌱',
    title: 'Профессиональный рост',
    description: 'Обучение у ведущих флористов, участие в мастер-классах и конкурсах'
  },
  {
    id: 2,
    icon: '💰',
    title: 'Достойная оплата',
    description: 'Конкурентная зарплата, премии за успехи и продажи'
  },
  {
    id: 3,
    icon: '🤝',
    title: 'Дружный коллектив',
    description: 'Поддерживающая атмосфера и совместные мероприятия'
  },
  {
    id: 4,
    icon: '📅',
    title: 'Гибкий график',
    description: 'Возможность выбора удобного графика работы'
  }
];

const vacancies: Vacancy[] = [
  {
    id: 1,
    title: 'Флорист',
    location: 'ТЦ "Карамель"',
    type: 'Полный день',
    salary: 'от 45 000 ₽',
    description: [
      'Создание букетов и композиций',
      'Консультирование клиентов',
      'Работа с кассой',
      'Уход за цветами'
    ],
    requirements: [
      'Опыт работы флористом от 1 года',
      'Знание основ флористики',
      'Творческий подход',
      'Клиентоориентированность'
    ]
  },
  {
    id: 2,
    title: 'Помощник флориста',
    location: 'ТЦ "Сильвер Молл"',
    type: 'Сменный график',
    salary: 'от 35 000 ₽',
    description: [
      'Помощь в создании букетов',
      'Уход за растениями',
      'Поддержание порядка',
      'Работа с клиентами'
    ],
    requirements: [
      'Желание учиться флористике',
      'Ответственность',
      'Аккуратность',
      'Позитивный настрой'
    ]
  },
  {
    id: 3,
    title: 'Курьер',
    location: 'Все магазины',
    type: 'Гибкий график',
    salary: 'от 40 000 ₽',
    description: [
      'Доставка букетов клиентам',
      'Работа с документами',
      'Прием оплаты',
      'Фотоотчет о доставке'
    ],
    requirements: [
      'Наличие автомобиля',
      'Опыт вождения от 2 лет',
      'Знание города',
      'Пунктуальность'
    ]
  }
];

const VacanciesPage: React.FC = () => {
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    resume: null as File | null,
    cover: ''
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        resume: e.target.files![0]
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки формы
    console.log('Form submitted:', formData);
  };

  return (
    <div className="vacancies">
      <div className="container">
        <section className="vacancies__hero">
          <h1 className="vacancies__title">Вакансии</h1>
          <p className="vacancies__subtitle">
            Присоединяйтесь к команде BAZAAR и станьте частью успешной компании
          </p>
        </section>

        <section className="vacancies__benefits">
          <h2 className="vacancies__section-title">Почему стоит работать с нами</h2>
          <div className="benefits__grid">
            {benefits.map(benefit => (
              <div key={benefit.id} className="benefit-card">
                <div className="benefit-card__icon">{benefit.icon}</div>
                <h3 className="benefit-card__title">{benefit.title}</h3>
                <p className="benefit-card__description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="vacancies__list">
          <h2 className="vacancies__section-title">Открытые вакансии</h2>
          <div className="vacancies__grid">
            {vacancies.map(vacancy => (
              <div
                key={vacancy.id}
                className={`vacancy-card ${selectedVacancy?.id === vacancy.id ? 'vacancy-card--active' : ''}`}
                onClick={() => setSelectedVacancy(vacancy)}
              >
                <div className="vacancy-card__header">
                  <h3 className="vacancy-card__title">{vacancy.title}</h3>
                  <span className="vacancy-card__salary">{vacancy.salary}</span>
                </div>
                <div className="vacancy-card__meta">
                  <span className="vacancy-card__location">
                    <span className="vacancy-card__icon">📍</span>
                    {vacancy.location}
                  </span>
                  <span className="vacancy-card__type">
                    <span className="vacancy-card__icon">🕒</span>
                    {vacancy.type}
                  </span>
                </div>
                <div className="vacancy-card__content">
                  <div className="vacancy-card__section">
                    <h4 className="vacancy-card__section-title">Обязанности:</h4>
                    <ul className="vacancy-card__list">
                      {vacancy.description.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="vacancy-card__section">
                    <h4 className="vacancy-card__section-title">Требования:</h4>
                    <ul className="vacancy-card__list">
                      {vacancy.requirements.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {selectedVacancy && (
          <section className="vacancies__form">
            <h2 className="vacancies__section-title">
              Откликнуться на вакансию {selectedVacancy.title}
            </h2>
            <form className="application-form" onSubmit={handleSubmit}>
              <div className="application-form__grid">
                <div className="application-form__field">
                  <label htmlFor="name" className="application-form__label">
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="application-form__input"
                    required
                  />
                </div>

                <div className="application-form__field">
                  <label htmlFor="phone" className="application-form__label">
                    Телефон
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="application-form__input"
                    required
                  />
                </div>

                <div className="application-form__field">
                  <label htmlFor="email" className="application-form__label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="application-form__input"
                    required
                  />
                </div>

                <div className="application-form__field application-form__field--full">
                  <label htmlFor="resume" className="application-form__label">
                    Резюме
                  </label>
                  <input
                    type="file"
                    id="resume"
                    name="resume"
                    onChange={handleFileChange}
                    className="application-form__file"
                    accept=".pdf,.doc,.docx"
                    required
                  />
                  <span className="application-form__file-hint">
                    Поддерживаемые форматы: PDF, DOC, DOCX
                  </span>
                </div>

                <div className="application-form__field application-form__field--full">
                  <label htmlFor="cover" className="application-form__label">
                    Сопроводительное письмо
                  </label>
                  <textarea
                    id="cover"
                    name="cover"
                    value={formData.cover}
                    onChange={(e) => setFormData({ ...formData, cover: e.target.value })}
                    className="application-form__textarea"
                    rows={5}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="button button--primary application-form__submit">
                Отправить заявку
              </button>
            </form>
          </section>
        )}

        <section className="vacancies__culture">
          <h2 className="vacancies__section-title">Наша корпоративная культура</h2>
          <div className="culture__content">
            <div className="culture__text">
              <p>
                В BAZAAR мы создаем не просто букеты – мы создаем настроение и дарим эмоции. 
                Наша команда – это увлеченные своим делом профессионалы, которые любят 
                свою работу и постоянно развиваются.
              </p>
              <p>
                Мы поддерживаем инициативу, ценим креативность и стремимся создать 
                комфортную атмосферу для каждого сотрудника. У нас регулярно проводятся 
                корпоративные мероприятия, мастер-классы и тренинги.
              </p>
            </div>
            <div className="culture__image">
              <img src="/images/team/culture.jpg" alt="Корпоративная культура" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VacanciesPage; 