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
      <h3 className="color-filter__title">По цвету</h3>
      <div className="color-filter__options">
        {colorOptions.map((option) => (
          <button
            key={option.id}
            className={`color-filter__option ${selectedColor === option.id ? 'color-filter__option--active' : ''}`}
            style={{ backgroundColor: option.color }}
            onClick={() => onColorSelect(selectedColor === option.id ? null : option.id)}
            title={option.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorFilter; 