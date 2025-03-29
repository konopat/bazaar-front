import { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import StoresMap from './StoresMap';

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
  const [isRendered, setIsRendered] = useState(false);
  
  // Устанавливаем флаг, что модальное окно отрендерено
  useEffect(() => {
    if (isOpen) {
      // Убеждаемся, что модальное окно полностью открыто перед инициализацией карты
      const timeout = setTimeout(() => {
        console.log('Модальное окно открыто, инициализируем карту');
        setIsRendered(true);
      }, 500); // Увеличиваем задержку до 500мс
      
      return () => clearTimeout(timeout);
    } else {
      setIsRendered(false);
    }
  }, [isOpen]);
  
  // Сбрасываем выбранный магазин при закрытии модального окна
  useEffect(() => {
    if (!isOpen) {
      // Небольшая задержка для анимации закрытия
      const timeout = setTimeout(() => {
        setSelectedStoreId(undefined);
      }, 300);
      
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Наши магазины">
      {(isOpen || isRendered) && (
        <StoresMap
          stores={stores}
          selectedStoreId={selectedStoreId}
          onStoreSelect={setSelectedStoreId}
        />
      )}
    </Modal>
  );
};

export default StoresModal; 