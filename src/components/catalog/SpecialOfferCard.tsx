import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@store/cartSlice';
import AddToCartAnimation from './AddToCartAnimation';

interface SpecialOfferCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  isHot?: boolean;
}

const SpecialOfferCard: React.FC<SpecialOfferCardProps> = ({
  id,
  title,
  price,
  image,
  isHot
}) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Запоминаем позицию клика
    setClickPosition({ x: e.clientX, y: e.clientY });
    
    // Показываем анимацию
    setShowAnimation(true);
    
    // Добавляем в корзину после завершения анимации
    setTimeout(() => {
      dispatch(addToCart({
        id,
        name: title,
        price,
        quantity: 1,
        image
      }));
    }, 400); // Задержка соответствует времени анимации
  };

  return (
    <div className="special-offer-card">
      <div className="special-offer-card__image-container">
        <img
          src={image}
          alt={title}
          className="special-offer-card__image"
        />
      </div>
      <div className="special-offer-card__content">
        <h3 className="special-offer-card__title">{title}</h3>
        <div className="special-offer-card__price-and-action">
          <div className="special-offer-card__price">
            {price} ₽
          </div>
          <button 
            className="button button--primary special-offer-card__button"
            onClick={handleAddToCart}
            data-product-id={id}
            aria-label={`Добавить ${title} в корзину`}
            id={`add-to-cart-special-${id}`}
          >
            В корзину
          </button>
        </div>
      </div>
      
      <AddToCartAnimation 
        productId={id} 
        isVisible={showAnimation} 
        onAnimationEnd={() => setShowAnimation(false)}
        clickPosition={clickPosition}
      />
    </div>
  );
};

export default SpecialOfferCard; 