import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '@store/cartSlice';
import AddToCartAnimation from './AddToCartAnimation';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  isHot?: boolean;
}

const ProductCard = ({
  id,
  name,
  description,
  price,
  image,
  isHot
}: ProductCardProps) => {
  const dispatch = useDispatch();
  const [showAnimation, setShowAnimation] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart({
      id,
      name,
      price,
      quantity: 1,
      image
    }));
    setShowAnimation(true);
  };

  return (
    <article className="product-card">
      <Link to={`/product/${id}`} className="product-card__link">
        {isHot && (
          <div className="product-card__badge" aria-label="Горячее предложение">
            Горячее предложение
          </div>
        )}
        <div className="product-card__image">
          <img src={image} alt={name} loading="lazy" />
        </div>
        <div className="product-card__content">
          <h3 className="product-card__title">{name}</h3>
          <p className="product-card__description">{description}</p>
          <div className="product-card__bottom">
            <div className="product-card__price" aria-label={`Цена: ${price} рублей`}>
              {price} ₽
            </div>
            <button 
              type="button"
              className="button button--primary product-card__button"
              onClick={handleAddToCart}
              data-product-id={id}
              aria-label={`Добавить ${name} в корзину`}
            >
              В корзину
            </button>
          </div>
        </div>
      </Link>
      <AddToCartAnimation
        productId={id}
        isVisible={showAnimation}
        onAnimationEnd={() => setShowAnimation(false)}
      />
    </article>
  );
};

export default ProductCard; 