import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '@store/cartSlice';
import AddToCartAnimation from './AddToCartAnimation';
import LazyImage from '../common/LazyImage';

interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  image: string;
  isHot?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  image,
  isHot
}) => {
  const dispatch = useDispatch();
  const [showAnimation, setShowAnimation] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Add to cart clicked for product:', id);
    
    // Сохраняем позицию клика мыши
    setClickPosition({ x: e.clientX, y: e.clientY });
    
    // Добавляем эффект нажатия кнопки
    if (buttonRef.current) {
      buttonRef.current.classList.add('clicked');
      setTimeout(() => {
        buttonRef.current?.classList.remove('clicked');
      }, 200);
    }
    
    // Запускаем анимацию перед добавлением в корзину
    setShowAnimation(true);
    
    // Откладываем фактическое добавление товара до завершения анимации
    setTimeout(() => {
      dispatch(addToCart({
        id,
        name: title,
        price,
        quantity: 1,
        image
      }));
    }, 400); // Обновленная задержка для синхронизации с анимацией
  };

  return (
    <Link to={`/product/${id}`} className="product-card">
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
          id={`add-to-cart-${id}`}
        >
          В корзину
        </button>
      </div>
      {showAnimation && (
        <AddToCartAnimation
          productId={id}
          isVisible={showAnimation}
          onAnimationEnd={() => setShowAnimation(false)}
          clickPosition={clickPosition}
        />
      )}
    </Link>
  );
};

export default ProductCard; 