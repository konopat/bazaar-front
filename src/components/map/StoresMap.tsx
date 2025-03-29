import { useEffect, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon } from 'ol/style';
import { defaults as defaultControls } from 'ol/control';
import Skeleton from '../common/Skeleton';
import 'ol/ol.css';
import '../../styles/components/StoresMap.css';

interface Store {
  id: string;
  name: string;
  address: string;
  coordinates: [number, number];
}

interface StoresMapProps {
  stores: Store[];
  selectedStoreId?: string;
  onStoreSelect?: (storeId: string) => void;
  onMapReady?: () => void;
  hideStoresList?: boolean; // Параметр для скрытия списка магазинов
}

// Base64-encoded маркер SVG (гарантированно доступен)
const MARKER_ICON = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAzMiA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgMEM3LjE2NCAwIDAgNy4xNjQgMCAxNkMwIDI0IDE2IDQ4IDE2IDQ4QzE2IDQ4IDMyIDI0IDMyIDE2QzMyIDcuMTY0IDI0LjgzNiAwIDE2IDBaIiBmaWxsPSIjRkZGQkY2Ii8+PHBhdGggZD0iTTE2IDBDNy4xNjQgMCAwIDcuMTY0IDAgMTZDMCAyNCAxNiA0OCAxNiA0OEMxNiA0OCAzMiAyNCAzMiAxNkMzMiA3LjE2NCAyNC44MzYgMCAxNiAwWk0xNiAyMkMxMi42ODYgMjIgMTAgMTkuMzE0IDEwIDE2QzEwIDEyLjY4NiAxMi42ODYgMTAgMTYgMTBDMTkuMzE0IDEwIDIyIDEyLjY4NiAyMiAxNkMyMiAxOS4zMTQgMTkuMzE0IDIyIDE2IDIyWiIgZmlsbD0iI0Q0QTk3NyIgZmlsbC1vcGFjaXR5PSIwLjkiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSI2IiBmaWxsPSIjRDRBOTc3Ii8+PC9zdmc+`;

// Иконка для ошибки
const ERROR_ICON = () => (
  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 8V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Компонент скелетона для карты
const MapSkeleton = () => (
  <div className="stores-map__skeleton">
    <div className="stores-map__skeleton-content">
      <Skeleton width="100%" height={40} className="stores-map__skeleton-title" />
      
      <div className="stores-map__skeleton-grid">
        <div className="stores-map__skeleton-area">
          <Skeleton height={200} className="stores-map__skeleton-main" />
          <div className="stores-map__skeleton-details">
            <Skeleton height={24} width="80%" />
            <Skeleton height={16} width="60%" />
          </div>
        </div>
        
        <div className="stores-map__skeleton-points">
          {Array.from({length: 4}).map((_, i) => (
            <div key={i} className="stores-map__skeleton-point">
              <Skeleton height={10} width={10} borderRadius="50%" />
              <Skeleton height={16} width={`${40 + i * 15}%`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const StoresMap = ({ stores, selectedStoreId, onStoreSelect, onMapReady, hideStoresList = false }: StoresMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [isMapError, setIsMapError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const vectorSourceRef = useRef(new VectorSource());
  const vectorLayerRef = useRef(
    new VectorLayer({
      source: vectorSourceRef.current,
      style: new Style({
        image: new Icon({
          src: MARKER_ICON,
          scale: 0.5,
          anchor: [0.5, 1],
        }),
      }),
    })
  );

  // Инициализация карты
  useEffect(() => {
    if (!mapRef.current) return;
    
    // Начинаем загрузку
    setIsLoading(true);
    
    // Небольшая задержка для отображения скелетона
    const initTimeout = setTimeout(() => {
      try {
        console.log('Инициализируем карту...');
        // Создаем карту при монтировании компонента
        const initialMap = new Map({
          target: mapRef.current as HTMLElement,
          layers: [
            new TileLayer({
              source: new OSM({
                attributions: []
              }),
            }),
            vectorLayerRef.current,
          ],
          view: new View({
            center: fromLonLat([104.280094, 52.287430]), // Иркутск
            zoom: 12,
            maxZoom: 19,
          }),
          controls: defaultControls({ zoom: true, rotate: false, attribution: false }),
        });

        // Добавляем обработчик ошибок при загрузке тайлов
        const tileLayer = initialMap.getLayers().getArray()[0] as TileLayer<OSM>;
        const source = tileLayer.getSource() as OSM;
        
        // Счетчик для отслеживания успешных загрузок тайлов
        let loadedTilesCount = 0;
        let totalRequests = 0;
        let hasErrors = false;
        
        // Отслеживаем начало загрузки каждого тайла
        source.on('tileloadstart', () => {
          totalRequests++;
        });
        
        // Обработчик ошибок загрузки тайлов
        source.on('tileloaderror', () => {
          hasErrors = true;
          console.log('Ошибка загрузки тайла');
          // Только при критическом количестве ошибок показываем сообщение
          if (hasErrors && loadedTilesCount < 4) {
            setErrorMessage('Сервис карт временно недоступен');
            setIsMapError(true);
            setIsLoading(false);
            onMapReady?.();
          }
        });

        // Отслеживаем успешную загрузку тайлов
        source.on('tileloadend', () => {
          loadedTilesCount++;
          console.log(`Загружен тайл ${loadedTilesCount} из ${totalRequests}`);
          
          // Если загружено достаточно тайлов, считаем карту загруженной
          if (loadedTilesCount >= 4 && totalRequests > 0) {
            console.log('Достаточно тайлов загружено, карта готова');
            setTimeout(() => {
              initialMap.updateSize();
              setIsLoading(false);
              onMapReady?.();
            }, 300);
          }
        });

        setMap(initialMap);
        
        // Обязательно обновим размер карты после изменения видимости
        setTimeout(() => {
          initialMap.updateSize();
        }, 300);
        
        // Автоматическое завершение по таймауту
        const loadingTimeout = setTimeout(() => {
          if (isLoading) {
            console.log('Сработал таймаут загрузки карты');
            // Если карта всё еще загружается, принудительно обновляем размер
            initialMap.updateSize();
            
            // Если загружено несколько тайлов, считаем карту загруженной с предупреждением
            if (loadedTilesCount > 0) {
              setIsLoading(false);
              onMapReady?.();
            } else {
              // Если не загружено ни одного тайла, считаем это ошибкой
              setErrorMessage('Сервис карт временно недоступен');
              setIsMapError(true);
              setIsLoading(false);
              onMapReady?.();
            }
          }
        }, 5000); // Сокращаем таймаут до 5 секунд

        // Удаляем карту при размонтировании компонента
        return () => {
          clearTimeout(loadingTimeout);
          clearTimeout(initTimeout);
          initialMap.setTarget(undefined);
        };
      } catch (error) {
        console.error('Ошибка при инициализации карты:', error);
        setErrorMessage('Сервис карт временно недоступен');
        setIsMapError(true);
        setIsLoading(false);
        onMapReady?.();
      }
    }, 100);
    
    return () => {
      clearTimeout(initTimeout);
    };
  }, [onMapReady]);

  // Обновление маркеров на карте
  useEffect(() => {
    if (!map || isMapError) return;

    try {
      // Очищаем все маркеры
      vectorSourceRef.current.clear();

      // Добавляем маркеры для каждого магазина
      const features = stores.map(store => {
        const feature = new Feature({
          geometry: new Point(fromLonLat(store.coordinates)),
          properties: store,
        });

        // Устанавливаем стиль с разным размером для выбранного маркера
        feature.setStyle(
          new Style({
            image: new Icon({
              src: MARKER_ICON,
              scale: store.id === selectedStoreId ? 0.7 : 0.5,
              anchor: [0.5, 1],
            }),
          })
        );

        return feature;
      });

      // Добавляем маркеры на карту
      vectorSourceRef.current.addFeatures(features);

      // Центрируем карту на выбранном магазине
      if (selectedStoreId) {
        const selectedStore = stores.find(store => store.id === selectedStoreId);
        if (selectedStore) {
          map.getView().animate({
            center: fromLonLat(selectedStore.coordinates),
            zoom: 16, // Уменьшенный зум для комфортного отображения
            duration: 800,
          });
        }
      } else if (features.length > 0) {
        // Если нет выбранного магазина, но есть маркеры, центрируем карту так, чтобы показать все маркеры
        const irkutskCenter = [104.280094, 52.287430]; // Центр Иркутска
        map.getView().animate({
          center: fromLonLat(irkutskCenter),
          zoom: 12,
          duration: 800,
        });
      }
    } catch (error) {
      console.error('Ошибка при обновлении маркеров:', error);
      setErrorMessage('Не удалось отобразить магазины на карте');
      setIsMapError(true);
      setIsLoading(false);
      onMapReady?.();
    }
  }, [stores, selectedStoreId, map, isMapError]);

  // Обработчик изменения размера окна
  useEffect(() => {
    const handleResize = () => {
      if (map && !isMapError) {
        map.updateSize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [map, isMapError]);

  return (
    <div className={`stores-map ${!isLoading ? 'stores-map--visible' : ''}`}>
      <div className="stores-map__container" ref={mapRef}>
        {/* Сообщение об ошибке */}
        {isMapError && (
          <div className="stores-map__error">
            <ERROR_ICON />
            <p>{errorMessage || 'Сервис карт временно недоступен'}</p>
          </div>
        )}
      </div>
      
      {/* Список магазинов (отображается только если не скрыт) */}
      {!hideStoresList && (
        <div className="stores-map__list">
          {stores.map(store => (
            <button
              key={store.id}
              className={`stores-map__store-button ${
                store.id === selectedStoreId ? 'stores-map__store-button--active' : ''
              }`}
              onClick={() => onStoreSelect?.(store.id)}
            >
              <h3 className="stores-map__store-name">{store.name}</h3>
              <p className="stores-map__store-address">{store.address}</p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StoresMap; 