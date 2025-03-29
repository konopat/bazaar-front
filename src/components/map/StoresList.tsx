import { memo } from 'react';
import { Store } from '../../hooks/useMap';

interface StoresListProps {
  stores: Store[];
  selectedStoreId?: string;
  onStoreSelect: (storeId: string) => void;
}

const StoresList = ({ stores, selectedStoreId, onStoreSelect }: StoresListProps) => {
  return (
    <div className="stores-map__list">
      {stores.map(store => (
        <button
          key={store.id}
          className={`stores-map__store-button ${
            store.id === selectedStoreId ? 'stores-map__store-button--active' : ''
          }`}
          onClick={() => onStoreSelect(store.id)}
        >
          <h3 className="stores-map__store-name">{store.name}</h3>
          <p className="stores-map__store-address">{store.address}</p>
        </button>
      ))}
    </div>
  );
};

export default memo(StoresList); 