import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Icon, Style } from 'ol/style';
import { defaults as defaultControls } from 'ol/control';
import { Store } from '../types/map';

// Base64-encoded маркер SVG (гарантированно доступен)
const MARKER_ICON = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAzMiA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgMEM3LjE2NCAwIDAgNy4xNjQgMCAxNkMwIDI0IDE2IDQ4IDE2IDQ4QzE2IDQ4IDMyIDI0IDMyIDE2QzMyIDcuMTY0IDI0LjgzNiAwIDE2IDBaIiBmaWxsPSIjRDRBOTc3Ii8+PHBhdGggZD0iTTE2IDBDNy4xNjQgMCAwIDcuMTY0IDAgMTZDMCAyNCAxNiA0OCAxNiA0OEMxNiA0OCAzMiAyNCAzMiAxNkMzMiA3LjE2NCAyNC44MzYgMCAxNiAwWk0xNiAyMkMxMi42ODYgMjIgMTAgMTkuMzE0IDEwIDE2QzEwIDEyLjY4NiAxMi42ODYgMTAgMTYgMTBDMTkuMzE0IDEwIDIyIDEyLjY4NiAyMiAxNkMyMiAxOS4zMTQgMTkuMzE0IDIyIDE2IDIyWiIgZmlsbD0iIzRBNDMzQiIgZmlsbC1vcGFjaXR5PSIxIi8+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iNiIgZmlsbD0iI0I4OUY3QSIvPjwvc3ZnPg==`;

// Маркер для выбранного магазина
const SELECTED_MARKER_ICON = `data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAzMiA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgMEM3LjE2NCAwIDAgNy4xNjQgMCAxNkMwIDI0IDE2IDQ4IDE2IDQ4QzE2IDQ4IDMyIDI0IDMyIDE2QzMyIDcuMTY0IDI0LjgzNiAwIDE2IDBaIiBmaWxsPSIjQjg5RjdBIi8+PHBhdGggZD0iTTE2IDBDNy4xNjQgMCAwIDcuMTY0IDAgMTZDMCAyNCAxNiA0OCAxNiA0OEMxNiA0OCAzMiAyNCAzMiAxNkMzMiA3LjE2NCAyNC44MzYgMCAxNiAwWk0xNiAyMkMxMi42ODYgMjIgMTAgMTkuMzE0IDEwIDE2QzEwIDEyLjY4NiAxMi42ODYgMTAgMTYgMTBDMTkuMzE0IDEwIDIyIDEyLjY4NiAyMiAxNkMyMiAxOS4zMTQgMTkuMzE0IDIyIDE2IDIyWiIgZmlsbD0iIzRBNDMzQiIgZmlsbC1vcGFjaXR5PSIxIi8+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iOCIgZmlsbD0iI0Q0QTk3NyIvPjwvc3ZnPg==`;

interface UseMapOptions {
  onMapReady?: () => void;
  initialZoom?: number;
  maxZoom?: number;
  centerCoordinates?: [number, number]; // [широта, долгота]
}

export const useMap = (stores: Store[], selectedStoreId?: string, options?: UseMapOptions) => {
  const {
    onMapReady,
    initialZoom = 12,
    maxZoom = 19,
    centerCoordinates = [52.287430, 104.280094] // Иркутск по умолчанию [широта, долгота]
  } = options || {};

  // Мемоизируем координаты центра, чтобы избежать лишних перерисовок
  const memoizedCenter = useMemo(() => centerCoordinates, [
    centerCoordinates?.[0], 
    centerCoordinates?.[1]
  ]);

  // Мемоизируем zoom значения
  const memoizedZoom = useMemo(() => ({
    initial: initialZoom,
    max: maxZoom
  }), [initialZoom, maxZoom]);

  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  
  const vectorSourceRef = useRef(new VectorSource());
  const vectorLayerRef = useRef(
    new VectorLayer({
      source: vectorSourceRef.current,
      style: new Style({
        image: new Icon({
          src: MARKER_ICON,
          scale: 0.6,
          anchor: [0.5, 1],
          // Добавляем тень для маркера
          declutterMode: 'obstacle'
        }),
      }),
      zIndex: 2, // Указываем z-index для слоя маркеров
    })
  );

  // Функция инициализации карты
  const initializeMap = useCallback(() => {
    if (!mapRef.current) return;

    try {
      // Создаем карту
      const initialMap = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSM({
              attributions: []
            }),
          }),
          vectorLayerRef.current,
        ],
        view: new View({
          center: fromLonLat([memoizedCenter[1], memoizedCenter[0]]), // Конвертируем [широта, долгота] в [долгота, широта] для OL
          zoom: memoizedZoom.initial,
          maxZoom: memoizedZoom.max,
        }),
        controls: defaultControls({ zoom: true, rotate: false, attribution: false }),
      });

      // Настраиваем отслеживание загрузки тайлов
      const tileLayer = initialMap.getLayers().getArray()[0] as TileLayer<OSM>;
      const source = tileLayer.getSource() as OSM;
      
      let loadedTilesCount = 0;
      let totalRequests = 0;
      let hasErrors = false;
      
      source.on('tileloadstart', () => {
        totalRequests++;
      });
      
      source.on('tileloaderror', () => {
        hasErrors = true;
        if (hasErrors && loadedTilesCount < 4) {
          setErrorMessage('Сервис карт временно недоступен');
          setIsError(true);
          setIsLoading(false);
          onMapReady?.();
        }
      });

      source.on('tileloadend', () => {
        loadedTilesCount++;
        
        if (loadedTilesCount >= 4 && totalRequests > 0) {
          initialMap.updateSize();
          setIsLoading(false);
          onMapReady?.();
        }
      });

      setMap(initialMap);
      
      // Обновление размера карты
      initialMap.updateSize();
      
      // Таймаут для автоматического завершения загрузки
      const loadingTimeout = setTimeout(() => {
        initialMap.updateSize();
        
        if (loadedTilesCount > 0) {
          setIsLoading(false);
          onMapReady?.();
        } else {
          setErrorMessage('Сервис карт временно недоступен');
          setIsError(true);
          setIsLoading(false);
          onMapReady?.();
        }
      }, 5000);

      return { map: initialMap, loadingTimeout };
    } catch (error) {
      setErrorMessage('Сервис карт временно недоступен');
      setIsError(true);
      setIsLoading(false);
      onMapReady?.();
      return null;
    }
  }, [memoizedCenter, memoizedZoom, onMapReady]);

  // Инициализация карты
  useEffect(() => {
    const result = initializeMap();
    
    return () => {
      if (result) {
        clearTimeout(result.loadingTimeout);
        result.map.setTarget(undefined);
      }
    };
  }, [initializeMap]);

  // Обновление маркеров на карте
  useEffect(() => {
    if (!map || isError) return;

    try {
      // Очищаем все маркеры
      vectorSourceRef.current.clear();

      // Добавляем маркеры для каждого магазина
      const features = stores.map(store => {
        const feature = new Feature({
          geometry: new Point(fromLonLat([store.coordinates[1], store.coordinates[0]])), // Конвертируем [широта, долгота] в [долгота, широта] для OL
          properties: store,
        });

        // Устанавливаем стиль с разным размером и иконкой для выбранного маркера
        feature.setStyle(
          new Style({
            image: new Icon({
              src: store.id === selectedStoreId ? SELECTED_MARKER_ICON : MARKER_ICON,
              scale: store.id === selectedStoreId ? 0.8 : 0.6,
              anchor: [0.5, 1],
              // Добавляем эффект тени для маркеров
              opacity: 1
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
            center: fromLonLat([selectedStore.coordinates[1], selectedStore.coordinates[0]]), // Конвертируем [широта, долгота] в [долгота, широта] для OL
            zoom: 16,
            duration: 800,
          });
        }
      } else if (features.length > 0) {
        // Центрируем на всех магазинах
        map.getView().animate({
          center: fromLonLat([memoizedCenter[1], memoizedCenter[0]]), // Конвертируем [широта, долгота] в [долгота, широта] для OL
          zoom: memoizedZoom.initial,
          duration: 800,
        });
      }
    } catch (error) {
      setErrorMessage('Не удалось отобразить магазины на карте');
      setIsError(true);
      setIsLoading(false);
      onMapReady?.();
    }
  }, [stores, selectedStoreId, map, isError, memoizedCenter, memoizedZoom, onMapReady]);

  // Обработчик изменения размера окна
  useEffect(() => {
    const handleResize = () => {
      if (map && !isError) {
        map.updateSize();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [map, isError]);

  return {
    mapRef,
    isLoading,
    isError,
    errorMessage,
    map
  };
}; 