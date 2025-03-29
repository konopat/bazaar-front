import React, { useState, useRef, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '@store/cartSlice';
import AddToCartAnimation from './AddToCartAnimation';
import LazyImage from '../common/LazyImage';
import Modal from '../common/Modal';
import ProductDetail from './ProductDetail';
import { Link } from 'react-router-dom';

interface SpecialOfferCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  isHot?: boolean;
  description?: string;
  color?: string;
}

const SpecialOfferCard = ({
  id,
  title,
  price,
  image,
  isHot,
  description,
  color
}: SpecialOfferCardProps) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
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
  }, [dispatch, id, title, price, image]);

  const handleCardClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div className="product-card" onClick={handleCardClick}>
        {isHot && <div className="product-card__badge">Горячее предложение</div>}
        <div className="product-card__image">
          <LazyImage
            src={image}
            alt={title}
            fallbackSrc="/images/product-placeholder.jpg"
            className="product-card__image-content"
            containerClassName="product-card__image-wrapper"
            objectFit="cover"
            aspectRatio={1}
            key={`special-offer-image-${id}`}
          />
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
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={title}
      >
        <ProductDetail 
          id={id}
          title={title}
          price={price}
          image={image}
          description={description}
          color={color}
        />
      </Modal>
    </>
  );
};

export default SpecialOfferCard; 