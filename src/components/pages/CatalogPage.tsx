import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product, products } from '../../mocks/products';
import ProductCard from '../catalog/ProductCard';
import ColorFilter from '../catalog/ColorFilter';
import PriceFilter from '../catalog/PriceFilter';
import useScrollToTop from '../../hooks/useScrollToTop';

const CatalogPage: React.FC = () => {
  useScrollToTop();
  
  const [searchParams] = useSearchParams();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<{ min: number; max: number | null } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Применяем фильтры из URL при загрузке страницы
  useEffect(() => {
    const priceMin = searchParams.get('priceMin');
    const priceMax = searchParams.get('priceMax');
    
    if (priceMin) {
      setSelectedPrice({
        min: parseInt(priceMin),
        max: priceMax ? parseInt(priceMax) : null
      });
    }
  }, [searchParams]);

  const filterAndSortProducts = () => {
    let filteredProducts = products;

    // Применяем фильтр по цене
    if (selectedPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price >= selectedPrice.min && 
        (selectedPrice.max === null || product.price <= selectedPrice.max)
      );
    }

    // Применяем фильтр по цвету
    if (selectedColor) {
      filteredProducts = filteredProducts.filter(product => product.color === selectedColor);
    }

    // Применяем поиск
    if (searchQuery) {
      filteredProducts = filteredProducts.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Применяем сортировку
    return filteredProducts.sort((a, b) => 
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );
  };

  const handleResetFilters = () => {
    setSelectedColor(null);
    setSelectedPrice(null);
    setSearchQuery('');
    setSortOrder('asc');
  };

  // Функция для форматирования цены
  const formatPriceFilter = (price: { min: number; max: number | null }) => {
    if (price.max === null) {
      return `от ₽${price.min}`;
    } else if (price.min === 0) {
      return `до ₽${price.max}`;
    } else {
      return `₽${price.min} - ₽${price.max}`;
    }
  };

  // Получаем список активных фильтров
  const getActiveFilters = () => {
    const filters = [];

    if (selectedColor) {
      filters.push({
        id: 'color',
        label: `Цвет: ${selectedColor}`,
        onRemove: () => setSelectedColor(null)
      });
    }

    if (selectedPrice) {
      filters.push({
        id: 'price',
        label: `Цена: ${formatPriceFilter(selectedPrice)}`,
        onRemove: () => setSelectedPrice(null)
      });
    }

    if (searchQuery) {
      filters.push({
        id: 'search',
        label: `Поиск: ${searchQuery}`,
        onRemove: () => setSearchQuery('')
      });
    }

    if (sortOrder !== 'asc') {
      filters.push({
        id: 'sort',
        label: 'Сначала дороже',
        onRemove: () => setSortOrder('asc')
      });
    }

    return filters;
  };

  const activeFilters = getActiveFilters();
  const isAnyFilterActive = activeFilters.length > 0;

  return (
    <div className="catalog">
      <div className="container">
        <div className="catalog__header">
          <h1 className="catalog__title">Каталог букетов</h1>
          <div className="catalog__search">
            <input
              type="text"
              className="catalog__search-input"
              placeholder="Поиск букетов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {isAnyFilterActive && (
          <div className="catalog__active-filters">
            {activeFilters.map(filter => (
              <button
                key={filter.id}
                className="catalog__filter-tag"
                onClick={filter.onRemove}
              >
                {filter.label}
                <span className="catalog__filter-tag-remove">×</span>
              </button>
            ))}
            <button 
              className="catalog__reset-all"
              onClick={handleResetFilters}
            >
              Сбросить все фильтры
            </button>
          </div>
        )}

        <div className="catalog__content">
          <aside className="catalog__filters">
            <div className="filters">
              <div className="filters__section">
                <ColorFilter
                  selectedColor={selectedColor}
                  onColorSelect={setSelectedColor}
                />
              </div>
              
              <div className="filters__section">
                <PriceFilter
                  selectedPrice={selectedPrice}
                  onPriceSelect={setSelectedPrice}
                />
              </div>

              <div className="filters__section">
                <h3 className="filters__title">Сортировка</h3>
                <select
                  className="catalog__sort-select"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                >
                  <option value="asc">Сначала дешевле</option>
                  <option value="desc">Сначала дороже</option>
                </select>

                {isAnyFilterActive && (
                  <button 
                    className="catalog__reset"
                    onClick={handleResetFilters}
                  >
                    Сбросить фильтры
                  </button>
                )}
              </div>
            </div>
          </aside>

          <div className="catalog__grid">
            {filterAndSortProducts().map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.title}
                description={product.description}
                price={product.price}
                image={product.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogPage; 