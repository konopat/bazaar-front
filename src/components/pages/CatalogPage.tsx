import React, { useState } from 'react';
import { Product, products } from '../../mocks/products';
import ProductCard from '../catalog/ProductCard';
import ColorFilter from '../catalog/ColorFilter';

const CatalogPage: React.FC = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortType, setSortType] = useState('default');

  const filterProducts = (products: Product[]) => {
    return products.filter(product => {
      const matchesColor = !selectedColor || product.color === selectedColor;
      const matchesSearch = !searchQuery || 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesColor && matchesSearch;
    });
  };

  const sortProducts = (products: Product[]) => {
    switch (sortType) {
      case 'price-asc':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...products].sort((a, b) => b.price - a.price);
      case 'name-asc':
        return [...products].sort((a, b) => a.title.localeCompare(b.title));
      case 'name-desc':
        return [...products].sort((a, b) => b.title.localeCompare(a.title));
      default:
        return products;
    }
  };

  const filteredAndSortedProducts = sortProducts(filterProducts(products));

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

        <div className="catalog__content">
          <div className="catalog__filters">
            <div className="filters">
              <ColorFilter
                selectedColor={selectedColor}
                onColorSelect={setSelectedColor}
              />
              <div className="filters__section">
                <h3 className="filters__title">Сортировка</h3>
                <select
                  className="catalog__sort-select"
                  value={sortType}
                  onChange={(e) => setSortType(e.target.value)}
                >
                  <option value="default">По умолчанию</option>
                  <option value="price-asc">Сначала дешевле</option>
                  <option value="price-desc">Сначала дороже</option>
                  <option value="name-asc">По названию (А-Я)</option>
                  <option value="name-desc">По названию (Я-А)</option>
                </select>
              </div>
              <div className="filters__section">
                <h3 className="filters__title">Цена</h3>
                <div className="filters__price-ranges">
                  <label className="filters__price-range">
                    <input
                      type="radio"
                      name="price-range"
                      value="all"
                      checked={!selectedColor}
                      onChange={() => setSelectedColor(null)}
                    />
                    Все цены
                  </label>
                  <label className="filters__price-range">
                    <input
                      type="radio"
                      name="price-range"
                      value="0-3000"
                      checked={selectedColor === '0-3000'}
                      onChange={() => setSelectedColor('0-3000')}
                    />
                    До 3000 ₽
                  </label>
                  <label className="filters__price-range">
                    <input
                      type="radio"
                      name="price-range"
                      value="3000-5000"
                      checked={selectedColor === '3000-5000'}
                      onChange={() => setSelectedColor('3000-5000')}
                    />
                    3000 - 5000 ₽
                  </label>
                  <label className="filters__price-range">
                    <input
                      type="radio"
                      name="price-range"
                      value="5000-10000"
                      checked={selectedColor === '5000-10000'}
                      onChange={() => setSelectedColor('5000-10000')}
                    />
                    5000 - 10000 ₽
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="catalog__grid">
            {filteredAndSortedProducts.map(product => (
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