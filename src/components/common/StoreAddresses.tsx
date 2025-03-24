interface StoreAddressesProps {
  className?: string;
}

const StoreAddresses = ({ className = '' }: StoreAddressesProps) => {
  const addresses = [
    'Иркутск, Маршала Жукова (пр) 15А',
    'Иркутск, Байкальская 180/2',
    'Иркутск, Николая Гаврилова 4'
  ];
  
  return (
    <div className={`store-addresses ${className}`}>
      {addresses.map((address, index) => (
        <address key={index} className="store-addresses__item">
          {address}
        </address>
      ))}
    </div>
  );
};

export default StoreAddresses; 