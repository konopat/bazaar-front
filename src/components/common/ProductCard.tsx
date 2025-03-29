import { Link } from 'react-router-dom';
import LazyImage from './LazyImage';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category?: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

const ProductCard = ({
  id,
  name,
  price,
  oldPrice,
  image,
  category,
  isNew = false,
  isBestseller = false
}: ProductCardProps) => {
  // Форматирование цены
  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₽';
  };

  return (
    <div className="product-card">
      <Link to={`/products/${id}`} className="product-card__link">
        <div className="product-card__image-container">
          {/* Использование компонента LazyImage для оптимизации загрузки */}
          <LazyImage
            src={image}
            alt={name}
            fallbackSrc="/images/product-placeholder.jpg"
            containerClassName="product-card__image-wrapper"
            className="product-card__image"
            aspectRatio={1} // квадратное изображение
            key={`product-image-${id}`} // Уникальный ключ для корректного обновления
          />
          
          {/* Бейджи */}
          <div className="product-card__badges">
            {isNew && <span className="product-card__badge product-card__badge--new">Новинка</span>}
            {isBestseller && <span className="product-card__badge product-card__badge--bestseller">Хит</span>}
            {oldPrice && <span className="product-card__badge product-card__badge--sale">
              -{Math.round((1 - price / oldPrice) * 100)}%
            </span>}
          </div>
        </div>

        <div className="product-card__content">
          {category && <div className="product-card__category">{category}</div>}
          <h3 className="product-card__name">{name}</h3>
          
          <div className="product-card__price-container">
            <span className="product-card__price">{formatPrice(price)}</span>
            {oldPrice && <span className="product-card__old-price">{formatPrice(oldPrice)}</span>}
          </div>
        </div>
      </Link>
      
      <button className="product-card__add-to-cart button button--outline">
        В корзину
      </button>
    </div>
  );
};

export default ProductCard; 