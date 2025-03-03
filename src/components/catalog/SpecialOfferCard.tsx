import React, { useState } from 'react';
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

  const handleAddToCart = () => {
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
    <div className="special-offer">
      {isHot && <div className="special-offer__badge">Горячее предложение</div>}
      <div className="special-offer__image">
        <img src={image} alt={title} />
      </div>
      <div className="special-offer__content">
        <h3 className="special-offer__title">{title}</h3>
        <p className="special-offer__description">{description}</p>
        <div className="special-offer__price">{price} ₽</div>
        <button 
          className="button button--primary special-offer__button"
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
    </div>
  );
};

export default SpecialOfferCard; 