import React from 'react';

interface PriceOption {
  id: string;
  label: string;
  min: number;
  max: number | null;
}

interface PriceFilterProps {
  selectedPrice: { min: number; max: number | null } | null;
  onPriceSelect: (price: { min: number; max: number | null } | null) => void;
}

const priceOptions: PriceOption[] = [
  { id: '3000', label: 'до ₽3000', min: 0, max: 3000 },
  { id: '5000', label: '₽3000 - ₽5000', min: 3000, max: 5000 },
  { id: '10000', label: 'от ₽5000', min: 5000, max: null },
];

const PriceFilter: React.FC<PriceFilterProps> = ({ selectedPrice, onPriceSelect }) => {
  return (
    <div className="price-filter">
      <h3 className="color-filter__title">По цене</h3>
      <div className="price-filter__options">
        {priceOptions.map((option) => (
          <button
            key={option.id}
            className={`price-filter__option ${
              selectedPrice?.min === option.min && selectedPrice?.max === option.max 
                ? 'price-filter__option--active' 
                : ''
            }`}
            onClick={() => onPriceSelect(
              selectedPrice?.min === option.min && selectedPrice?.max === option.max
                ? null 
                : { min: option.min, max: option.max }
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PriceFilter; 