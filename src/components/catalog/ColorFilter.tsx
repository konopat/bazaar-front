import React from 'react';

interface ColorOption {
  id: string;
  name: string;
  color: string;
}

interface ColorFilterProps {
  selectedColor: string | null;
  onColorSelect: (color: string | null) => void;
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
      <div className="filters__checkbox-group">
        {colorOptions.map((option) => (
          <label key={option.id} className="filters__checkbox-label">
            <input
              type="checkbox"
              className="filters__checkbox-input"
              checked={selectedColor === option.id}
              onChange={() => onColorSelect(selectedColor === option.id ? null : option.id)}
            />
            <span className="filters__checkbox-custom"></span>
            <span className="color-filter__color" style={{ backgroundColor: option.color }}></span>
            {option.name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default ColorFilter; 