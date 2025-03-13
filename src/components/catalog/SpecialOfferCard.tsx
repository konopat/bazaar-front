import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '@store/cartSlice';
import AddToCartAnimation from './AddToCartAnimation';

interface SpecialOfferCardProps {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  isHot?: boolean;
}

const SpecialOfferCard: React.FC<SpecialOfferCardProps> = ({
  id,
  title,
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
      name: title,
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
        <img src={image} alt={title} />
      </div>
      <div className="product-card__content">
        <h3 className="product-card__title">{title}</h3>
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

export default SpecialOfferCard; 