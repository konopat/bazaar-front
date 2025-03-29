import { memo } from 'react';
import { Store } from '../../hooks/useMap';
import { useStoreStatus } from '../../hooks/useStoreStatus';

interface StoreDetailsProps {
  store?: Store;
}

const StoreDetails = ({ store }: StoreDetailsProps) => {
  // Если магазин не выбран, показываем сообщение
  if (!store) {
    return (
      <div className="store-details store-details--empty">
        <p className="store-details__message">Выберите магазин для просмотра деталей</p>
      </div>
    );
  }

  // Получаем статус работы магазина
  const { isOpen, statusText } = useStoreStatus(store.workSchedule);

  return (
    <div className="store-details">
      {/* Фото магазина */}
      <div className="store-details__photo-container">
        <img 
          src={store.photo} 
          alt={`Магазин ${store.name}`} 
          className="store-details__photo" 
          onError={(e) => {
            // Если изображение не загрузилось, показываем заглушку
            (e.target as HTMLImageElement).src = '/images/store-placeholder.jpg';
          }}
        />
      </div>

      {/* Информация о магазине */}
      <div className="store-details__info">
        <h3 className="store-details__name">{store.name}</h3>
        
        <div className="store-details__address">
          <span className="store-details__icon">📍</span>
          <span>{store.address}</span>
        </div>
        
        <div className="store-details__phone">
          <span className="store-details__icon">📞</span>
          <a href={`tel:${store.phone}`} className="store-details__link">{store.phone}</a>
        </div>
        
        <div className={`store-details__status ${isOpen ? 'store-details__status--open' : 'store-details__status--closed'}`}>
          <span className="store-details__icon">{isOpen ? '✓' : '✕'}</span>
          <span>{statusText}</span>
        </div>
      </div>
    </div>
  );
};

export default memo(StoreDetails); 