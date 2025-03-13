import React, { useState } from 'react';
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

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  price,
  image,
  isHot
}) => {
  const dispatch = useDispatch();
  const [showAnimation, setShowAnimation] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault(); // Предотвращаем переход по ссылке при клике на кнопку
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
    <Link to={`/product/${id}`} className="product-card">
      {isHot && <div className="product-card__badge">Горячее предложение</div>}
      <div className="product-card__image">
        <img src={image} alt={name} />
      </div>
      <div className="product-card__content">
        <h3 className="product-card__title">{name}</h3>
        <p className="product-card__description">{description}</p>
        <div className="product-card__price">{price} ₽</div>
        <button 
          className="button button--primary product-card__button"
          onClick={handleAddToCart}
          data-product-id={id}
        >
          В корзину
        </button>
      </div>
      <AddToCartAnimation
        productId={id}
        isVisible={showAnimation}
        onAnimationEnd={() => setShowAnimation(false)}
      />
    </Link>
  );
};

export default ProductCard; 