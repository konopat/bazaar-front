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
  { id: 'red', name: 'Красный', color: '#ff6b6b' },
  { id: 'pink', name: 'Розовый', color: '#fab1a0' },
  { id: 'white', name: 'Белый', color: '#ffffff' },
  { id: 'yellow', name: 'Желтый', color: '#ffeaa7' },
  { id: 'purple', name: 'Фиолетовый', color: '#a29bfe' },
  { id: 'blue', name: 'Синий', color: '#74b9ff' },
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