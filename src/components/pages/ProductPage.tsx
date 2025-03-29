import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../store/cartSlice';
import LazyImage from '../common/LazyImage';
import Icon from '../common/Icon';
import { Product, products } from '../../mocks/products';
import ProductCard from '../catalog/ProductCard';
import AddToCartAnimation from '../catalog/AddToCartAnimation';
import Skeleton from '../common/Skeleton';
import '../../styles/pages/product.css';
// Импортируем CSS для компонента ProductDetail
import '../../styles/components/product-detail.css';

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [showAnimation, setShowAnimation] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [clickPosition, setClickPosition] = useState({ x: 0, y: 0 });
  
  // Получение данных о продукте
  useEffect(() => {
    // Имитируем загрузку данных с сервера
    setLoading(true);
    
    // Находим товар по id
    const foundProduct = products.find(p => p.id === Number(id));
    
    // Устанавливаем таймаут для имитации загрузки
    const timer = setTimeout(() => {
      setProduct(foundProduct || null);
      
      // Находим похожие товары (того же цвета или с похожей ценой)
      if (foundProduct) {
        const similar = products.filter(p => 
          p.id !== foundProduct.id && 
          (p.color === foundProduct.color || 
          Math.abs(p.price - foundProduct.price) < 1000)
        ).slice(0, 4);
        
        setRelatedProducts(similar);
      }
      
      setLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, [id]);
  
  // Форматирование цены
  const formatPrice = (price: number) => {
    return price.toLocaleString('ru-RU') + ' ₽';
  };
  
  // Обработчик добавления в корзину
  const handleAddToCart = (e: React.MouseEvent) => {
    if (!product) return;

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
        id: product.id,
        name: product.title,
        price: product.price,
        quantity: 1,
        image: product.image
      }));
    }, 400);
  };
  
  // Обработчик добавления в избранное
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  
  if (loading) {
    return (
      <div className="product-page">
        <div className="container">
          <div className="product-page__content">
            <div className="product-page__gallery">
              <div className="product-page__image-wrapper">
                <Skeleton width="100%" height="100%" />
              </div>
            </div>
            <div className="product-page__info">
              <Skeleton width="120px" height="20px" className="product-page__skeleton-category" />
              <Skeleton width="80%" height="36px" className="product-page__skeleton-title" />
              <Skeleton width="100%" height="100px" className="product-page__skeleton-description" />
              <Skeleton width="180px" height="30px" className="product-page__skeleton-price" />
              <Skeleton width="100%" height="48px" className="product-page__skeleton-button" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="product-page">
        <div className="container">
          <div className="product-page__error">
            <h2 className="section-title">Товар не найден</h2>
            <p>К сожалению, товар с указанным идентификатором не существует.</p>
            <Link to="/catalog" className="button button--primary">Вернуться в каталог</Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="product-page">
      <div className="container">
        {/* Хлебные крошки */}
        <div className="product-page__breadcrumbs">
          <Link to="/">Главная</Link>
          <span className="product-page__breadcrumbs-separator">/</span>
          <Link to="/catalog">Каталог</Link>
          <span className="product-page__breadcrumbs-separator">/</span>
          <span>{product.title}</span>
        </div>
        
        {/* Основной контент */}
        <div className="product-page__content">
          {/* Галерея изображений */}
          <div className="product-page__gallery">
            <div className="product-page__image-wrapper">
              <LazyImage
                src={product.image}
                alt={product.title}
                fallbackSrc="/images/product-placeholder.jpg"
                className="product-page__image"
                objectFit="cover"
              />
            </div>
          </div>
          
          {/* Информация о товаре */}
          <div className="product-page__info">
            <div className="product-page__category">Букет цветов</div>
            <h1 className="section-title">{product.title}</h1>
            <p className="product-page__description">{product.description}</p>
            
            {/* Цена */}
            <div className="product-page__price-container">
              <span className="product-page__price">{formatPrice(product.price)}</span>
            </div>
            
            {/* Действия с товаром */}
            <div className="product-page__actions">
              <button 
                ref={buttonRef}
                className="button button--primary product-page__add-to-cart"
                onClick={handleAddToCart}
                data-product-id={product.id}
                aria-label={`Добавить ${product.title} в корзину`}
              >
                В корзину
              </button>
              <button 
                className={`product-page__favorite ${isFavorite ? 'active' : ''}`}
                onClick={toggleFavorite}
                aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
              >
                <Icon name="heart" size={24} />
              </button>
              
              {showAnimation && (
                <AddToCartAnimation
                  productId={product.id}
                  isVisible={showAnimation}
                  onAnimationEnd={() => setShowAnimation(false)}
                  clickPosition={clickPosition}
                />
              )}
            </div>
            
            {/* Дополнительная информация */}
            <div className="product-page__details">
              <div className="product-page__detail-item">
                <span>Доставка:</span>
                <span className="product-page__detail-value">Бесплатно в пределах МКАД</span>
              </div>
              <div className="product-page__detail-item">
                <span>Артикул:</span>
                <span className="product-page__detail-value">BQ-{product.id.toString().padStart(4, '0')}</span>
              </div>
              <div className="product-page__detail-item">
                <span>Категория:</span>
                <span className="product-page__detail-value">Букеты</span>
              </div>
              <div className="product-page__detail-item">
                <span>Цвет:</span>
                <span className="product-page__detail-value">{product.color}</span>
              </div>
            </div>
            
            {/* Декоративный разделитель */}
            <div className="divider-accent"></div>
            
            {/* Описание доставки */}
            <div className="product-page__delivery-info">
              <div className="product-page__delivery-item">
                <Icon name="truck" size={24} />
                <span>Быстрая доставка в день заказа</span>
              </div>
              <div className="product-page__delivery-item">
                <Icon name="leaf" size={24} />
                <span>Только свежие цветы</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Похожие товары */}
        {relatedProducts.length > 0 && (
          <div className="product-page__related">
            <h2 className="section-title section-title--centered">Похожие товары</h2>
            <div className="divider-accent"></div>
            <div className="product-page__related-grid">
              {relatedProducts.map(relatedProduct => (
                <ProductCard
                  key={relatedProduct.id}
                  id={relatedProduct.id}
                  title={relatedProduct.title}
                  price={relatedProduct.price}
                  image={relatedProduct.image}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage; 