import React, { useState } from 'react';
import { VACANCIES, Vacancy } from '../../mocks/vacancies';
import '../../styles/pages/vacancies.css';

const VacanciesPage: React.FC = () => {
  const [selectedVacancy, setSelectedVacancy] = useState<Vacancy | null>(null);
  
  const handleVacancyClick = (vacancy: Vacancy) => {
    setSelectedVacancy(vacancy);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="vacancies-page">
      <div className="container">
        <h1 className="section-title section-title--centered">Вакансии</h1>
        
        <div className="vacancies-page__content">
          {selectedVacancy ? (
            <div className="vacancy-details">
              <button 
                className="vacancy-details__back"
                onClick={() => setSelectedVacancy(null)}
              >
                ← Вернуться к списку вакансий
              </button>
              
              <h2 className="vacancy-details__title">{selectedVacancy.title}</h2>
              <div className="vacancy-details__meta">
                <span className="vacancy-details__location">{selectedVacancy.location}</span>
                <span className="vacancy-details__type">{selectedVacancy.type}</span>
                <span className="vacancy-details__salary">{selectedVacancy.salary}</span>
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
                <h3 className="vacancy-details__section-title">Условия:</h3>
                <ul className="vacancy-details__list">
                  {selectedVacancy.benefits.map((item, index) => (
                    <li key={index} className="vacancy-details__list-item">{item}</li>
                  ))}
                </ul>
              </div>
              
              <div className="vacancy-details__apply">
                <h3 className="vacancy-details__apply-title">Откликнуться на вакансию</h3>
                <p className="vacancy-details__apply-text">
                  Отправьте ваше резюме на адрес <a href="mailto:hr@bazaar.ru">hr@bazaar.ru</a> с указанием названия вакансии в теме письма.
                </p>
              </div>
            </div>
          ) : (
            <div className="vacancies-list">
              <p className="vacancies-list__intro">
                Присоединяйтесь к нашей команде профессионалов! Мы всегда рады талантливым и увлеченным людям, которые разделяют наши ценности и стремятся к росту и развитию.
              </p>
              
              {VACANCIES.map((vacancy) => (
                <div 
                  key={vacancy.id} 
                  className="vacancy-card"
                  onClick={() => handleVacancyClick(vacancy)}
                >
                  <h3 className="vacancy-card__title">{vacancy.title}</h3>
                  <div className="vacancy-card__meta">
                    <span className="vacancy-card__location">{vacancy.location}</span>
                    <span className="vacancy-card__type">{vacancy.type}</span>
                  </div>
                  <p className="vacancy-card__description">{vacancy.description}</p>
                  <div className="vacancy-card__salary">{vacancy.salary}</div>
                  <button className="vacancy-card__more">Подробнее</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VacanciesPage; 