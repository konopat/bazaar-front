import { memo } from 'react';
import { useMap } from '../../hooks/useMap';
import StoresList from './StoresList';
import { StoresMapProps } from '../../types/map';
import 'ol/ol.css';
import '../../styles/components/StoresMap.css';

// Иконка для ошибки
const ERROR_ICON = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const StoresMap = ({ 
  stores, 
  selectedStoreId, 
  onStoreSelect, 
  onMapReady, 
  hideStoresList = false 
}: StoresMapProps) => {
  // Используем хук для всей логики карты
  const { 
    mapRef, 
    isLoading, 
    isError, 
    errorMessage 
  } = useMap(stores, selectedStoreId, {
    onMapReady,
    initialZoom: 12,
    maxZoom: 19,
    centerCoordinates: [52.287430, 104.280094] // Иркутск - изменен порядок: [широта, долгота]
  });

  return (
    <div className={`stores-map ${!isLoading ? 'stores-map--visible' : ''}`} style={{ height: '100%', width: '100%' }}>
      <div className="stores-map__container" ref={mapRef} style={{ height: '100%', width: '100%' }}>
        {/* Сообщение об ошибке */}
        {isError && (
          <div className="stores-map__error">
            <ERROR_ICON />
            <p>{errorMessage || 'Сервис карт временно недоступен'}</p>
          </div>
        )}
      </div>
      
      {/* Список магазинов отображается только если не скрыт */}
      {!hideStoresList && onStoreSelect && (
        <StoresList
          stores={stores}
          selectedStoreId={selectedStoreId}
          onStoreSelect={onStoreSelect}
        />
      )}
    </div>
  );
};

export default memo(StoresMap);