import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-page__content">
          <h1 className="section-title section-title--centered">404</h1>
          <p className="not-found-page__subtitle">Страница не найдена</p>
          <p className="not-found-page__text">К сожалению, запрашиваемая вами страница не существует или была перемещена.</p>
          <div className="not-found-page__actions">
            <Link to="/" className="button button--primary not-found-page__btn">
              Вернуться на главную
            </Link>
            <Link to="/catalog" className="button button--outline not-found-page__btn">
              Перейти в каталог
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 