import { useState, useEffect, useCallback } from 'react';
import Modal from '../common/Modal';
import StoresMap from './StoresMap';
import Skeleton from '../common/Skeleton';

interface Store {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number];
}

interface StoresModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Реальные координаты (примерно) для Иркутска
const stores: Store[] = [
  {
    id: '1',
    name: 'Центральный магазин',
    address: 'ул. Ленина, 30, Иркутск',
    coordinates: [104.280094, 52.287430], // Более точные координаты центра Иркутска
  },
  {
    id: '2',
    name: 'Магазин на Кирова',
    address: 'ул. Кирова, 10, Иркутск',
    coordinates: [104.281763, 52.289056], // Немного северо-восточнее
  },
  {
    id: '3',
    name: 'Магазин на Карла Маркса',
    address: 'ул. Карла Маркса, 20, Иркутск',
    coordinates: [104.285513, 52.286052], // Восточнее
  },
];

const StoresModal = ({ isOpen, onClose }: StoresModalProps) => {
  const [selectedStoreId, setSelectedStoreId] = useState<string>();
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);
  
  // Сбрасываем состояния при закрытии и открытии модального окна
  useEffect(() => {
    if (isOpen) {
      // Сначала устанавливаем состояние загрузки
      setIsMapLoading(true);
      
      // Даем модальному окну время для появления, затем показываем карту
      const timeout = setTimeout(() => {
        console.log('Модальное окно открыто, инициализируем карту');
        setShowMap(true);
      }, 300);
      
      return () => clearTimeout(timeout);
    } else {
      // При закрытии сбрасываем состояния
      setShowMap(false);
      setSelectedStoreId(undefined);
    }
  }, [isOpen]);
  
  // Обработчик события, когда карта готова и загружена
  const handleMapReady = useCallback(() => {
    console.log('Карта загружена, скрываем скелетон');
    setIsMapLoading(false);
  }, []);

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Наши магазины"
      isLoading={false}
    >
      <div className="stores-modal-content">
        <h3 className="stores-section-title">Выберите магазин:</h3>
        
        {/* Показываем список магазинов сразу */}
        <div className="stores-map__list">
          {stores.map(store => (
            <button
              key={store.id}
              className={`stores-map__store-button ${
                store.id === selectedStoreId ? 'stores-map__store-button--active' : ''
              }`}
              onClick={() => setSelectedStoreId(store.id)}
            >
              <h3 className="stores-map__store-name">{store.name}</h3>
              <p className="stores-map__store-address">{store.address}</p>
            </button>
          ))}
        </div>
        
        <h3 className="stores-section-title">Карта:</h3>
        
        {/* Контейнер карты со скелетоном */}
        <div className="stores-map__container">
          {isMapLoading && (
            <div className="stores-map__skeleton-container">
              <Skeleton height={300} width="100%" />
            </div>
          )}
          
          {/* Карта появится здесь, когда модалка полностью открыта */}
          {showMap && (
            <div style={{ 
              opacity: isMapLoading ? 0 : 1, 
              transition: 'opacity 0.3s ease-in-out',
              height: '100%'
            }}>
              <StoresMap
                stores={stores}
                selectedStoreId={selectedStoreId}
                onStoreSelect={setSelectedStoreId}
                onMapReady={handleMapReady}
                hideStoresList={true}
              />
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default StoresModal; 