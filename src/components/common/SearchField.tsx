import React from 'react';
import Icon from './Icon';

import '../../styles/components/search-field.css';

interface SearchFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

const SearchField: React.FC<SearchFieldProps> = ({
  value,
  onChange,
  placeholder = 'Поиск...',
  className = '',
}) => {
  return (
    <div className={`search-field ${className}`}>
      <input
        type="text"
        className="search-field__input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label={placeholder}
      />
      <button className="search-field__button" aria-label="Искать">
        <Icon name="search" size={20} />
      </button>
    </div>
  );
};

export default SearchField; 