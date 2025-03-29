import { useReducer, useEffect, useCallback } from 'react';
import Modal from '../common/Modal';
import StoresMap from './StoresMap';
import StoresList from './StoresList';
import Skeleton from '../common/Skeleton';
import { STORES } from '../../constants/contacts';
import { Store } from '../../hooks/useMap';

interface StoresModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Типы действий для reducer
type ActionType = 
  | { type: 'OPEN_MODAL' }
  | { type: 'INIT_MAP' }
  | { type: 'MAP_LOADED' }
  | { type: 'SELECT_STORE', payload: string }
  | { type: 'RESET' };

// Интерфейс состояния
interface State {
  selectedStoreId?: string;
  isMapLoading: boolean;
  showMap: boolean;
}

// Начальное состояние
const initialState: State = {
  selectedStoreId: undefined,
  isMapLoading: true,
  showMap: false
};

// Reducer для управления связанными состояниями
function reducer(state: State, action: ActionType): State {
  switch (action.type) {
    case 'OPEN_MODAL':
      return { ...state, isMapLoading: true, showMap: false };
    case 'INIT_MAP':
      return { ...state, showMap: true };
    case 'MAP_LOADED':
      return { ...state, isMapLoading: false };
    case 'SELECT_STORE':
      return { ...state, selectedStoreId: action.payload };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const StoresModal = ({ isOpen, onClose }: StoresModalProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedStoreId, isMapLoading, showMap } = state;
  
  // Сбрасываем состояния при закрытии и открытии модального окна
  useEffect(() => {
    if (isOpen) {
      // Сначала устанавливаем состояние загрузки
      dispatch({ type: 'OPEN_MODAL' });
      
      // Используем CSS-анимацию вместо setTimeout
      // Даем модальному окну время для появления, затем показываем карту
      const timeout = setTimeout(() => {
        dispatch({ type: 'INIT_MAP' });
      }, 300);
      
      return () => clearTimeout(timeout);
    } else {
      // При закрытии сбрасываем состояния
      dispatch({ type: 'RESET' });
    }
  }, [isOpen]);
  
  // Мемоизируем обработчики
  const handleMapReady = useCallback(() => {
    dispatch({ type: 'MAP_LOADED' });
  }, []);

  const handleSelectStore = useCallback((storeId: string) => {
    dispatch({ type: 'SELECT_STORE', payload: storeId });
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
        
        {/* Используем компонент списка магазинов */}
        <StoresList
          stores={STORES}
          selectedStoreId={selectedStoreId}
          onStoreSelect={handleSelectStore}
        />
        
        <h3 className="stores-section-title">Карта:</h3>
        
        {/* Контейнер карты со скелетоном */}
        <div className="stores-map__container">
          {isMapLoading && (
            <div className="stores-map__skeleton-container">
              <Skeleton height={300} width="100%" />
            </div>
          )}
          
          {/* Карта появится здесь с плавной анимацией opacity через CSS */}
          {showMap && (
            <div style={{ 
              opacity: isMapLoading ? 0 : 1, 
              transition: 'opacity 0.3s ease-in-out',
              height: '100%'
            }}>
              <StoresMap
                stores={STORES}
                selectedStoreId={selectedStoreId}
                onStoreSelect={handleSelectStore}
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