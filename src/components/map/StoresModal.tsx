import { useReducer, useEffect, useCallback, useMemo } from 'react';
import Modal from '../common/Modal';
import StoresMap from './StoresMap';
import StoresList from './StoresList';
import StoreDetails from './StoreDetails';
import Skeleton from '../common/Skeleton';
import { STORES } from '../../constants/contacts';
import { StoresModalProps } from '../../types/map';

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
  
  // Находим выбранный магазин
  const selectedStore = useMemo(() => {
    if (!selectedStoreId) return undefined;
    return STORES.find(store => store.id === selectedStoreId);
  }, [selectedStoreId]);
  
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
        <div className="stores-modal-layout">
          {/* Левая колонка с картой */}
          <div className="stores-modal-map-column">
            {/* Контейнер карты со скелетоном */}
            <div className="stores-map-wrapper" style={{ height: '100%', width: '100%', position: 'relative' }}>
              {isMapLoading && (
                <div className="stores-map__skeleton-container">
                  <Skeleton height="100%" width="100%" />
                </div>
              )}
              
              {/* Карта появится здесь с плавной анимацией opacity через CSS */}
              {showMap && (
                <div style={{ 
                  opacity: isMapLoading ? 0 : 1, 
                  transition: 'opacity 0.3s ease-in-out',
                  height: '100%',
                  width: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0
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
            
            {/* Детальная информация о выбранном магазине */}
            <div className="stores-modal-details-column">
              <StoreDetails store={selectedStore} />
            </div>
          </div>
          
          {/* Правая колонка со списком магазинов */}
          <div className="stores-modal-list-column">
            <h3 className="stores-section-title">Выберите магазин:</h3>
            
            {/* Используем компонент списка магазинов */}
            <StoresList
              stores={STORES}
              selectedStoreId={selectedStoreId}
              onStoreSelect={handleSelectStore}
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default StoresModal; 