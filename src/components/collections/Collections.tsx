import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../mocks/products';
import ProductCard from '../catalog/ProductCard';

interface CollectionProps {
  products: Product[];
}

const Collections: React.FC<CollectionProps> = ({ products }) => {
  const navigate = useNavigate();

  const collections = [
    { 
      id: 'cheap',
      title: 'до ₽3000',
      filter: { min: 0, max: 3000 },
      items: products.filter(p => p.price <= 3000).slice(0, 6)
    },
    { 
      id: 'medium',
      title: 'до ₽5000',
      filter: { min: 3000, max: 5000 },
      items: products.filter(p => p.price > 3000 && p.price <= 5000).slice(0, 6)
    },
    { 
      id: 'expensive',
      title: 'дороже ₽5000',
      filter: { min: 5000, max: null },
      items: products.filter(p => p.price > 5000).slice(0, 6)
    }
  ];

  const handleShowAll = (filter: { min: number; max: number | null }) => {
    const searchParams = new URLSearchParams();
    searchParams.set('priceMin', filter.min.toString());
    if (filter.max) {
      searchParams.set('priceMax', filter.max.toString());
    }
    navigate(`/catalog?${searchParams.toString()}`);
  };

  return (
    <section className="collections">
        <h2 className="collections__title">Коллекции по цене</h2>
        <p className="collections__subtitle">Подборки букетов в разных ценовых категориях, чтобы вы могли найти идеальный вариант для любого случая и бюджета</p>
        
        <div className="collections__grid">
          {collections.map(collection => (
            <div key={collection.id} className="collection">
              <h3 className="collection__title">{collection.title}</h3>
              <div className="collection__items">
                {collection.items.map(product => (
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
              <button 
                className="collection__button"
                onClick={() => handleShowAll(collection.filter)}
              >
                Показать все
              </button>
            </div>
          ))}
        </div>
    </section>
  );
};

export default Collections; 