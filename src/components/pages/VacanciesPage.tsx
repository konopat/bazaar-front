import React, { useState } from 'react';

interface Vacancy {
  id: number;
  title: string;
  location: string;
  type: string; // full-time, part-time
  salary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

const VACANCIES: Vacancy[] = [
  {
    id: 1,
    title: 'Флорист',
    location: 'Москва',
    type: 'Полная занятость',
    salary: 'от 40 000 ₽',
    description: 'Ищем талантливого флориста с художественным вкусом и любовью к цветам в наш магазин в центре города',
    responsibilities: [
      'Создание букетов и композиций по каталогу',
      'Разработка авторских композиций',
      'Консультирование клиентов по выбору цветов и уходу за ними',
      'Оформление витрины и рабочего пространства'
    ],
    requirements: [
      'Опыт работы флористом от 1 года',
      'Знание основ флористики',
      'Умение работать в команде',
      'Ответственность и пунктуальность',
      'Креативное мышление'
    ],
    benefits: [
      'Официальное трудоустройство',
      'График работы 2/2',
      'Профессиональное развитие',
      'Дружная команда',
      'Скидки на продукцию'
    ]
  },
  {
    id: 2,
    title: 'Курьер',
    location: 'Москва',
    type: 'Гибкий график',
    salary: 'от 30 000 ₽',
    description: 'Приглашаем ответственных и пунктуальных курьеров для доставки цветочных композиций по городу',
    responsibilities: [
      'Доставка букетов и композиций клиентам',
      'Прием оплаты',
      'Отчетность по выполненным заказам',
      'Поддержание презентабельного вида заказа'
    ],
    requirements: [
      'Наличие личного автомобиля (желательно)',
      'Знание города',
      'Вежливость и коммуникабельность',
      'Ответственность и пунктуальность'
    ],
    benefits: [
      'Гибкий график работы',
      'Компенсация расходов на топливо',
      'Чаевые от клиентов',
      'Дружный коллектив'
    ]
  },
  {
    id: 3,
    title: 'Менеджер по продажам',
    location: 'Москва',
    type: 'Полная занятость',
    salary: 'от 50 000 ₽',
    description: 'Требуется энергичный менеджер по продажам для работы с корпоративными клиентами и организации мероприятий',
    responsibilities: [
      'Поиск и привлечение новых клиентов',
      'Работа с существующей клиентской базой',
      'Подготовка коммерческих предложений',
      'Проведение переговоров',
      'Заключение договоров'
    ],
    requirements: [
      'Опыт работы в продажах от 1 года',
      'Навыки ведения переговоров',
      'Уверенный пользователь ПК',
      'Грамотная речь',
      'Ориентированность на результат'
    ],
    benefits: [
      'Официальное трудоустройство',
      'График 5/2 с 9:00 до 18:00',
      'Оклад + % от продаж',
      'Корпоративное обучение',
      'Карьерный рост'
    ]
  }
];

const VacanciesPage: React.FC = () => {
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);

  const handleVacancyClick = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy);
  };

  const handleBack = () => {
    setSelectedVacancy(null);
  };

  return (
    <div className="vacancies">
      <div className="container">
        <h1 className="section-title section-title--centered">Вакансии</h1>
        
        {!selectedVacancy ? (
          <>
            <p className="vacancies__intro">
              Мы всегда в поиске талантливых и увлеченных своим делом людей. 
              Если вы хотите стать частью нашей команды и развиваться в сфере флористики, 
              ознакомьтесь с нашими открытыми вакансиями.
            </p>
            
            <div className="vacancies__list">
              {VACANCIES.map(vacancy => (
                <div 
                  key={vacancy.id} 
                  className="vacancy-card" 
                  onClick={() => handleVacancyClick(vacancy)}
                >
                  <h2 className="vacancy-card__title">{vacancy.title}</h2>
                  <div className="vacancy-card__details">
                    <span className="vacancy-card__location">{vacancy.location}</span>
                    <span className="vacancy-card__type">{vacancy.type}</span>
                  </div>
                  <div className="vacancy-card__salary">{vacancy.salary}</div>
                  <p className="vacancy-card__description">{vacancy.description}</p>
                  <button className="button button--primary vacancy-card__button">
                    Подробнее
                  </button>
                </div>
              ))}
            </div>
            
            <div className="vacancies__contact">
              <h2 className="section-title">Не нашли подходящую вакансию?</h2>
              <p className="vacancies__contact-text">
                Отправьте нам ваше резюме, и мы свяжемся с вами, когда появится подходящая позиция.
              </p>
              <a href="mailto:hr@bazaar.ru" className="button button--primary">
                Отправить резюме
              </a>
            </div>
          </>
        ) : (
          <div className="vacancy-details">
            <button 
              className="vacancy-details__back-button"
              onClick={handleBack}
            >
              ← Назад к списку вакансий
            </button>
            
            <h2 className="vacancy-details__title">{selectedVacancy.title}</h2>
            
            <div className="vacancy-details__header">
              <div className="vacancy-details__info">
                <span className="vacancy-details__location">{selectedVacancy.location}</span>
                <span className="vacancy-details__type">{selectedVacancy.type}</span>
                <span className="vacancy-details__salary">{selectedVacancy.salary}</span>
              </div>
            </div>
            
            <p className="vacancy-details__description">{selectedVacancy.description}</p>
            
            <div className="vacancy-details__section">
              <h3 className="vacancy-details__section-title">Обязанности:</h3>
              <ul className="vacancy-details__list">
                {selectedVacancy.responsibilities.map((item, index) => (
                  <li key={index} className="vacancy-details__list-item">{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="vacancy-details__section">
              <h3 className="vacancy-details__section-title">Требования:</h3>
              <ul className="vacancy-details__list">
                {selectedVacancy.requirements.map((item, index) => (
                  <li key={index} className="vacancy-details__list-item">{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="vacancy-details__section">
              <h3 className="vacancy-details__section-title">Что мы предлагаем:</h3>
              <ul className="vacancy-details__list">
                {selectedVacancy.benefits.map((item, index) => (
                  <li key={index} className="vacancy-details__list-item">{item}</li>
                ))}
              </ul>
            </div>
            
            <div className="vacancy-details__apply">
              <h3 className="vacancy-details__apply-title">Откликнуться на вакансию</h3>
              <p className="vacancy-details__apply-text">
                Отправьте ваше резюме на почту <a href="mailto:hr@bazaar.ru">hr@bazaar.ru</a> с указанием вакансии в теме письма.
              </p>
              <p className="vacancy-details__apply-text">
                Или позвоните нам по телефону: <a href="tel:+79991234567">+7 (999) 123-45-67</a>
              </p>
              <a 
                href={`mailto:hr@bazaar.ru?subject=Вакансия: ${selectedVacancy.title}`} 
                className="button button--primary vacancy-details__apply-button"
              >
                Отправить резюме
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VacanciesPage; 