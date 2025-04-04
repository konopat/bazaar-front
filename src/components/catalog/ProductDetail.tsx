import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../store/cartSlice';
import { ProductDetailProps } from '../../types';
import LazyImage from '../common/LazyImage';
import Icon from '../common/Icon';

const ProductDetail = ({
  id,
  title,
  price,
  image,
  description = 'Прекрасный букет из свежих цветов',
  color = 'разноцветный'
}: ProductDetailProps) => {
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);

  // Форматирование цены
  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₽';
  };

  // Обработчик добавления в корзину
  const handleAddToCart = useCallback(() => {
    dispatch(addToCart({
      id,
      name: title,
      price,
      quantity: 1,
      image
    }));
  }, [dispatch, id, title, price, image]);

  // Обработчик добавления в избранное
  const toggleFavorite = useCallback(() => {
    setIsFavorite(!isFavorite);
  }, [isFavorite]);

  return (
    <div className="product-detail">
      <div className="product-detail__container">
        <div className="product-detail__gallery">
          <div className="product-detail__image-wrapper">
            <LazyImage
              src={image}
              alt={title}
              fallbackSrc="/images/product-placeholder.jpg"
              className="product-detail__image"
              objectFit="cover"
            />
          </div>
        </div>
        
        <div className="product-detail__info">
          <p className="product-detail__description">{description}</p>
          
          <div className="product-detail__price-container">
            <span className="product-detail__price">{formatPrice(price)}</span>
          </div>
          
          <div className="product-detail__actions">
            <button 
              className="button button--primary product-detail__add-to-cart"
              onClick={handleAddToCart}
              data-product-id={id}
              aria-label={`Добавить ${title} в корзину`}
            >
              В корзину
            </button>
            <button 
              className={`product-detail__favorite ${isFavorite ? 'active' : ''}`}
              onClick={toggleFavorite}
              aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            >
              <Icon name="heart" size={24} />
            </button>
          </div>
          
          <div className="product-detail__details">
            <div className="product-detail__detail-item">
              <span>Доставка:</span>
              <span className="product-detail__detail-value">Бесплатно в пределах МКАД</span>
            </div>
            <div className="product-detail__detail-item">
              <span>Артикул:</span>
              <span className="product-detail__detail-value">BQ-{id.toString().padStart(4, '0')}</span>
            </div>
            <div className="product-detail__detail-item">
              <span>Категория:</span>
              <span className="product-detail__detail-value">Букеты</span>
            </div>
            <div className="product-detail__detail-item">
              <span>Цвет:</span>
              <span className="product-detail__detail-value">{color}</span>
            </div>
          </div>
          
          <div className="divider-accent"></div>
          
          <div className="product-detail__delivery-info">
            <div className="product-detail__delivery-item">
              <Icon name="truck" size={24} />
              <span>Быстрая доставка в день заказа</span>
            </div>
            <div className="product-detail__delivery-item">
              <Icon name="leaf" size={24} />
              <span>Только свежие цветы</span>
            </div>
          </div>
          
          <div className="product-detail__link-container">
            <Link to={`/products/${id}`} className="product-detail__link">
              Перейти на страницу товара
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 