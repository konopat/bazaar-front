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
}

// Base64-encoded маркер SVG (гарантированно доступен)
const MARKER_ICON = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAzMiA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgMEM3LjE2NCAwIDAgNy4xNjQgMCAxNkMwIDI0IDE2IDQ4IDE2IDQ4QzE2IDQ4IDMyIDI0IDMyIDE2QzMyIDcuMTY0IDI0LjgzNiAwIDE2IDBaIiBmaWxsPSIjRkZGQkY2Ii8+PHBhdGggZD0iTTE2IDBDNy4xNjQgMCAwIDcuMTY0IDAgMTZDMCAyNCAxNiA0OCAxNiA0OEMxNiA0OCAzMiAyNCAzMiAxNkMzMiA3LjE2NCAyNC44MzYgMCAxNiAwWk0xNiAyMkMxMi42ODYgMjIgMTAgMTkuMzE0IDEwIDE2QzEwIDEyLjY4NiAxMi42ODYgMTAgMTYgMTBDMTkuMzE0IDEwIDIyIDEyLjY4NiAyMiAxNkMyMiAxOS4zMTQgMTkuMzE0IDIyIDE2IDIyWiIgZmlsbD0iI0Q0QTk3NyIgZmlsbC1vcGFjaXR5PSIwLjkiLz48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSI2IiBmaWxsPSIjRDRBOTc3Ii8+PC9zdmc+`;

const StoresMap = ({ stores, selectedStoreId, onStoreSelect }: StoresMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [isMapError, setIsMapError] = useState(false);
  const [isMapInitialized, setIsMapInitialized] = useState(false);
  const [isMapVisible, setIsMapVisible] = useState(false);
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

  // Задержка для инициализации карты, чтобы DOM был полностью готов
  useEffect(() => {
    // Задержка для инициализации DOM
    const initTimeout = setTimeout(() => {
      setIsMapInitialized(true);
    }, 300); // Увеличиваем задержку
    
    return () => clearTimeout(initTimeout);
  }, []);

  // Функция для обновления размеров карты
  const updateMapSize = () => {
    if (map && mapRef.current) {
      setTimeout(() => {
        map.updateSize();
        setIsMapVisible(true);
      }, 200);
    }
  };

  // Проверка видимости карты через MutationObserver
  useEffect(() => {
    if (!mapRef.current) return;

    // Создаем наблюдатель за изменениями
    const observer = new MutationObserver(() => {
      updateMapSize();
    });

    // Начинаем наблюдение
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class']
    });

    // Проверяем видимость через интервал
    const visibilityCheck = setInterval(() => {
      if (mapRef.current) {
        const rect = mapRef.current.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          updateMapSize();
        }
      }
    }, 500);

    return () => {
      observer.disconnect();
      clearInterval(visibilityCheck);
    };
  }, [map]);

  // Инициализация карты
  useEffect(() => {
    if (!mapRef.current || !isMapInitialized) return;

    // Проверяем, что контейнер имеет размеры
    const containerRect = mapRef.current.getBoundingClientRect();
    if (containerRect.width === 0 || containerRect.height === 0) {
      // Пробуем ещё раз через 300ms
      const retryTimeout = setTimeout(() => {
        setIsMapInitialized(false);
        setTimeout(() => setIsMapInitialized(true), 100);
      }, 300);
      
      return () => clearTimeout(retryTimeout);
    }

    try {
      // Создаем карту при монтировании компонента
      const initialMap = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM(),
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
      
      source.on('tileloaderror', () => {
        setIsMapError(true);
      });

      setMap(initialMap);
      
      // Обновляем размер карты после полной инициализации
      setTimeout(() => {
        initialMap.updateSize();
        setIsMapVisible(true);
      }, 500);

      // Удаляем карту при размонтировании компонента
      return () => {
        initialMap.setTarget(undefined);
      };
    } catch (error) {
      console.error('Ошибка при инициализации карты:', error);
      setIsMapError(true);
    }
  }, [isMapInitialized]);

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
            zoom: 15,
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
      setIsMapError(true);
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
    <div className={`stores-map ${isMapVisible ? 'stores-map--visible' : ''}`}>
      <div className="stores-map__container" ref={mapRef}>
        {isMapError && (
          <div className="stores-map__error">
            <p>Не удалось загрузить карту. Пожалуйста, проверьте подключение к интернету или попробуйте позже.</p>
          </div>
        )}
      </div>
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
    </div>
  );
};

export default StoresMap; 