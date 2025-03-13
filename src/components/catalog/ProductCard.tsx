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
    <Link to={`/product/${id}`} className="special-offer">
      {isHot && <div className="special-offer__badge">Горячее предложение</div>}
      <div className="special-offer__image">
        <img src={image} alt={name} />
      </div>
      <div className="special-offer__content">
        <h3 className="special-offer__title">{name}</h3>
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
    </Link>
  );
};

export default ProductCard; 