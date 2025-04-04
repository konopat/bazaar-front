import React, { useState } from 'react';
import { PriceFilterProps } from '../../types/catalog';

// Внутренний тип для опций цены
interface PriceOption {
  id: string;
  label: string;
  min: number;
  max: number | null;
}

const priceOptions: PriceOption[] = [
  { id: '3000', label: 'до ₽3000', min: 0, max: 3000 },
  { id: '5000', label: '₽3000 - ₽5000', min: 3000, max: 5000 },
  { id: '10000', label: 'от ₽5000', min: 5000, max: null },
];

const PriceFilter: React.FC<PriceFilterProps> = ({ selectedPrice, onPriceSelect }) => {
  const [minPrice, setMinPrice] = useState<string>(selectedPrice?.min?.toString() || '');
  const [maxPrice, setMaxPrice] = useState<string>(selectedPrice?.max?.toString() || '');

  const handleApplyCustomPrice = () => {
    const min = parseInt(minPrice) || 0;
    const max = maxPrice ? parseInt(maxPrice) : null;
    onPriceSelect({ min, max });
  };

  return (
    <div className="price-filter">
      <div className="filters__checkbox-group">
        {priceOptions.map((option) => (
          <label key={option.id} className="filters__checkbox-label">
            <input
              type="checkbox"
              className="filters__checkbox-input"
              checked={selectedPrice?.min === option.min && selectedPrice?.max === option.max}
              onChange={() => onPriceSelect(
                selectedPrice?.min === option.min && selectedPrice?.max === option.max
                  ? null 
                  : { min: option.min, max: option.max }
              )}
            />
            <span className="filters__checkbox-custom"></span>
            {option.label}
          </label>
        ))}
      </div>

      <div className="filters__price-range">
        <div className="filters__price-inputs">
          <input
            type="number"
            className="filters__price-input"
            placeholder="От"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
          <input
            type="number"
            className="filters__price-input"
            placeholder="До"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
        <button 
          className="button button--outline button--small" 
          onClick={handleApplyCustomPrice}
          style={{ width: '100%' }}
        >
          Применить
        </button>
      </div>
    </div>
  );
};

export default PriceFilter; 