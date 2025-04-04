import React from 'react';
import { ColorFilterProps } from '../../types/catalog';

// Используем внутренний тип для опций цвета, он не должен быть экспортирован, так как специфичен только для этого компонента
interface ColorOption {
  id: string;
  name: string;
  color: string;
}

const colorOptions: ColorOption[] = [
  { id: 'red', name: 'Красный', color: '#b22222' },
  { id: 'pink', name: 'Розовый', color: '#e6b3bf' },
  { id: 'white', name: 'Белый', color: '#f5f5dc' },
  { id: 'yellow', name: 'Желтый', color: '#f7dc6f' },
  { id: 'purple', name: 'Фиолетовый', color: '#8b458b' },
  { id: 'blue', name: 'Синий', color: '#4682b4' },
];

const ColorFilter: React.FC<ColorFilterProps> = ({ selectedColor, onColorSelect }) => {
  return (
    <div className="color-filter">
      <div className="color-filter__buttons">
        {colorOptions.map((option) => (
          <button 
            key={option.id}
            className={`color-filter__button ${selectedColor === option.id ? 'color-filter__button--active' : ''}`}
            onClick={() => onColorSelect(selectedColor === option.id ? null : option.id)}
            title={option.name}
          >
            <span 
              className="color-filter__color-circle" 
              style={{ backgroundColor: option.color }}
            ></span>
            <span className="color-filter__name">{option.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorFilter; 