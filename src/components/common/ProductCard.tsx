import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import LazyImage from './LazyImage';
import Modal from './Modal';
import ProductDetail from '../catalog/ProductDetail';
import AddToCartAnimation from '../catalog/AddToCartAnimation';

interface ProductCardProps {
  // Общие свойства
  id: string | number;
  price: number;
  image: string;
  description?: string;
  color?: string;
  
  // Свойства для каталога (названия как в каталоге)
  title?: string;
  
  // Свойства для корзины (названия как в корзине)
  name?: string;
  
  // Дополнительные свойства для разных контекстов
  oldPrice?: number;
  category?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  isSpecialOffer?: boolean;
  isHot?: boolean;
  inCart?: boolean; // Флаг, показывающий что карточка отображается в корзине
  
  // Колбэки
  onClick?: () => void;
}

const ProductCard = ({
  id,
  price,
  image,
  description,
  color,
  // Используем title или name в зависимости от контекста
  title,
  name,
  // Дополнительные свойства
  oldPrice,
  category,
  isNew = false,
  isBestseller = false,
  isSpecialOffer = false,
  isHot = false,
  inCart = false,
  onClick
}: ProductCardProps) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  
  // Получаем название товара (используем либо title, либо name)
  const productName = title || name || '';
  
  // Идентификатор товара (может быть строкой или числом)
  const productId = typeof id === 'string' ? parseInt(id) : id;

  // Форматирование цены
  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₽';
  };

  // Обработчик добавления в корзину с анимацией для каталога
  const handleAddToCartWithAnimation = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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
        id: productId,
        name: productName,
        price,
        quantity: 1,
        image
      }));
    }, 400); // Задержка соответствует времени анимации
  }, [dispatch, productId, productName, price, image]);

  // Обработчик добавления в корзину для выполнения без анимации
  const handleAddToCartSimple = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    dispatch(addToCart({
      id: productId,
      name: productName,
      price,
      quantity: 1,
      image
    }));
  }, [dispatch, productId, productName, price, image]);

  // Обработчик клика по карточке
  const handleCardClick = useCallback((e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    } else {
      e.preventDefault();
      setIsModalOpen(true);
    }
  }, [onClick]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Отображение для корзины (компактный вид)
  if (inCart) {
    return (
      <>
        <div className="product-card product-card--in-cart">
          <div className="product-card__link" onClick={handleCardClick}>
            <div className="product-card__image-container">
              <LazyImage
                src={image}
                alt={productName}
                fallbackSrc="/images/product-placeholder.jpg"
                containerClassName="product-card__image-wrapper"
                className="product-card__image"
                aspectRatio={1}
                key={`product-image-${id}`}
              />
            </div>

            <div className="product-card__content">
              <h3 className="product-card__name">{productName}</h3>
              <div className="product-card__price-container">
                <span className="product-card__price">{formatPrice(price)}</span>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={productName}
        >
          <ProductDetail 
            id={productId}
            title={productName}
            price={price}
            image={image}
            description={description}
            color={color}
          />
        </Modal>
      </>
    );
  }

  // Отображение для каталога (полный вид с кнопкой и анимацией)
  return (
    <>
      <div className="product-card" onClick={handleCardClick}>
        {/* Бейджи разных типов */}
        {isHot && <div className="product-card__badge product-card__badge--hot">Горячее предложение</div>}
        {isSpecialOffer && <div className="product-card__badge product-card__badge--special">Специальное предложение</div>}
        {isNew && <div className="product-card__badge product-card__badge--new">Новинка</div>}
        {isBestseller && <div className="product-card__badge product-card__badge--bestseller">Хит</div>}
        {oldPrice && <div className="product-card__badge product-card__badge--sale">
          -{Math.round((1 - price / oldPrice) * 100)}%
        </div>}
        
        <div className="product-card__image">
          <LazyImage
            src={image}
            alt={productName}
            fallbackSrc="/images/product-placeholder.jpg"
            className="product-card__image-content"
            containerClassName="product-card__image-wrapper"
            objectFit="cover"
            aspectRatio={1}
          />
        </div>
        
        <div className="product-card__content">
          {category && <div className="product-card__category">{category}</div>}
          <h3 className="product-card__title">{productName}</h3>
          <div className="product-card__price">
            {formatPrice(price)}
            {oldPrice && <span className="product-card__old-price">{formatPrice(oldPrice)}</span>}
          </div>
          <button 
            ref={buttonRef}
            className="button button--primary product-card__button"
            onClick={handleAddToCartWithAnimation}
            data-product-id={id}
            aria-label={`Добавить ${productName} в корзину`}
            id={`add-to-cart-${id}`}
          >
            В корзину
          </button>
        </div>
        
        {showAnimation && (
          <AddToCartAnimation
            productId={productId}
            isVisible={showAnimation}
            onAnimationEnd={() => setShowAnimation(false)}
            clickPosition={clickPosition}
          />
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={productName}
      >
        <ProductDetail 
          id={productId}
          title={productName}
          price={price}
          image={image}
          description={description}
          color={color}
        />
      </Modal>
    </>
  );
};

export default ProductCard; 