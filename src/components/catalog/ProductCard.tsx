import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@store/cartSlice';
import AddToCartAnimation from './AddToCartAnimation';

interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  compact?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  image,
  compact = false
}) => {
  const dispatch = useDispatch();
  const [showAnimation, setShowAnimation] = useState(false);

  const handleAddToCart = () => {
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
    <div className={`product-card ${compact ? 'product-card--compact' : ''}`}>
      <div className="product-card__image-container">
        <img src={image} alt={name} className="product-card__image" />
      </div>
      <div className="product-card__content">
        <h3 className="product-card__title">{name}</h3>
        {!compact && <p className="product-card__description">{description}</p>}
        <div className="product-card__footer">
          <div className="product-card__price">{price} ₽</div>
          {!compact && (
            <button 
              className="product-card__button"
              onClick={handleAddToCart}
              data-product-id={id}
            >
              В корзину
            </button>
          )}
        </div>
      </div>
      <AddToCartAnimation
        productId={id}
        isVisible={showAnimation}
        onAnimationEnd={() => setShowAnimation(false)}
      />
    </div>
  );
};

export default ProductCard; 