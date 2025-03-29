import { memo } from 'react';
import { Store } from '../../hooks/useMap';
import { useStoreStatus } from '../../hooks/useStoreStatus';
import LazyImage from '../common/LazyImage';

interface StoreDetailsProps {
  store?: Store;
}

const StoreDetails = ({ store }: StoreDetailsProps) => {
  // Получаем статус работы магазина (безопасно, даже если store undefined)
  const { isOpen, statusText } = useStoreStatus(store?.workSchedule);

  // Если магазин не выбран, показываем сообщение
  if (!store) {
    return (
      <div className="store-details store-details--empty">
        <p className="store-details__message">Выберите магазин для просмотра деталей</p>
      </div>
    );
  }

  return (
    <div className="store-details">
      {/* Двухколоночный лэйаут для фото и информации */}
      <div className="store-details__layout">
        {/* Фото магазина (слева) */}
        <div className="store-details__photo-column">
          <LazyImage
            src={store.photo || ''}
            alt={`Магазин ${store.name}`}
            fallbackSrc="/images/store-placeholder.jpg"
            className="store-details__photo"
            containerClassName="store-details__photo-wrapper"
            objectFit="cover"
            key={`store-photo-${store.id}`}
          />
        </div>

        {/* Информация о магазине (справа) */}
        <div className="store-details__info-column">
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
    </div>
  );
};

export default memo(StoreDetails); 