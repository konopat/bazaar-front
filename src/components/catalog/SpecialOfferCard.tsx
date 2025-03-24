import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
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
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Запоминаем позицию клика
    setClickPosition({ x: e.clientX, y: e.clientY });
    
    // Добавляем эффект нажатия кнопки
    if (buttonRef.current) {
      buttonRef.current.classList.add('clicked');
      setTimeout(() => {
        buttonRef.current?.classList.remove('clicked');
      }, 200);
    }
    
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
    <Link to={`/product/${id}`} className="product-card">
      {isHot && <div className="product-card__badge">Горячее предложение</div>}
      <div className="product-card__image">
        <img src={image} alt={title} />
      </div>
      <div className="product-card__content">
        <h3 className="product-card__title">{title}</h3>
        <div className="product-card__price">{price} ₽</div>
        <button 
          ref={buttonRef}
          className="button button--primary product-card__button"
          onClick={handleAddToCart}
          data-product-id={id}
          aria-label={`Добавить ${title} в корзину`}
          id={`add-to-cart-special-${id}`}
        >
          В корзину
        </button>
      </div>
      
      <AddToCartAnimation 
        productId={id} 
        isVisible={showAnimation} 
        onAnimationEnd={() => setShowAnimation(false)}
        clickPosition={clickPosition}
      />
    </Link>
  );
};

export default SpecialOfferCard; 