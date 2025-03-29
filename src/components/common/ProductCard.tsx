import { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import LazyImage from './LazyImage';
import Modal from './Modal';
import ProductDetail from '../catalog/ProductDetail';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  category?: string;
  isNew?: boolean;
  isBestseller?: boolean;
  inCart?: boolean; // Флаг, показывающий что карточка отображается в корзине
  description?: string;
  color?: string;
}

const ProductCard = ({
  id,
  name,
  price,
  oldPrice,
  image,
  category,
  isNew = false,
  isBestseller = false,
  inCart = false,
  description,
  color
}: ProductCardProps) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Форматирование цены
  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₽';
  };

  // Обработчик добавления в корзину
  const handleAddToCart = useCallback((e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    dispatch(addToCart({
      id: parseInt(id),
      name,
      price,
      quantity: 1,
      image
    }));
  }, [dispatch, id, name, price, image]);

  const handleCardClick = useCallback((e: React.MouseEvent) => {
    // Не открываем модальное окно, если карточка находится в корзине
    if (inCart) return;
    
    e.preventDefault();
    setIsModalOpen(true);
  }, [inCart]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <div className={`product-card ${inCart ? 'product-card--in-cart' : ''}`}>
        <div className="product-card__link" onClick={handleCardClick}>
          <div className="product-card__image-container">
            {/* Использование компонента LazyImage для оптимизации загрузки */}
            <LazyImage
              src={image}
              alt={name}
              fallbackSrc="/images/product-placeholder.jpg"
              containerClassName="product-card__image-wrapper"
              className="product-card__image"
              aspectRatio={1} // квадратное изображение
              key={`product-image-${id}`} // Уникальный ключ для корректного обновления
            />
            
            {/* Бейджи показываем только если не в корзине */}
            {!inCart && (
              <div className="product-card__badges">
                {isNew && <span className="product-card__badge product-card__badge--new">Новинка</span>}
                {isBestseller && <span className="product-card__badge product-card__badge--bestseller">Хит</span>}
                {oldPrice && <span className="product-card__badge product-card__badge--sale">
                  -{Math.round((1 - price / oldPrice) * 100)}%
                </span>}
              </div>
            )}
          </div>

          <div className="product-card__content">
            {category && !inCart && <div className="product-card__category">{category}</div>}
            <h3 className="product-card__name">{name}</h3>
            
            <div className="product-card__price-container">
              <span className="product-card__price">{formatPrice(price)}</span>
              {oldPrice && !inCart && <span className="product-card__old-price">{formatPrice(oldPrice)}</span>}
            </div>
          </div>
        </div>
        
        {/* Кнопку добавления в корзину показываем только если не в корзине */}
        {!inCart && (
          <button 
            className="product-card__add-to-cart button button--outline"
            onClick={(e) => handleAddToCart(e)}
          >
            В корзину
          </button>
        )}
      </div>

      {/* Модальное окно только для карточек не в корзине */}
      {!inCart && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title={name}
        >
          <ProductDetail 
            id={parseInt(id)}
            title={name}
            price={price}
            image={image}
            description={description}
            color={color}
          />
        </Modal>
      )}
    </>
  );
};

export default ProductCard; 