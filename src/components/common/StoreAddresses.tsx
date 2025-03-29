import { STORES } from '../../constants/contacts';

interface StoreAddressesProps {
  className?: string;
}

const StoreAddresses = ({ className = '' }: StoreAddressesProps) => {
  return (
    <div className={`store-addresses ${className}`}>
      {STORES.map((store) => (
        <address key={store.id} className="store-addresses__item">
          {store.address}
        </address>
      ))}
    </div>
  );
};

export default StoreAddresses; 