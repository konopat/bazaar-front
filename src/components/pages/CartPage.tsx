import { useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { removeFromCart, updateQuantity } from '../../store/cartSlice';
import Icon from '../common/Icon';
import ProductCard from '../common/ProductCard';
import '../../styles/cart.css';

const CartPage = () => {
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Обработчик изменения количества товара
  const handleQuantityChange = useCallback((id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      dispatch(removeFromCart(id));
      return;
    }
    
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  }, [dispatch]);

  // Обработчик удаления товара из корзины
  const handleRemoveItem = useCallback((id: number) => {
    dispatch(removeFromCart(id));
  }, [dispatch]);

  // Обработчик применения промокода
  const handleApplyPromo = useCallback(() => {
    // Моковая логика проверки промокода
    if (promoCode.toUpperCase() === 'DISCOUNT') {
      setPromoApplied(true);
      setPromoDiscount(500);
    } else {
      alert('Промокод недействителен');
    }
  }, [promoCode]);

  // Обработчики изменения количества (оптимизированы)
  const handleDecrease = useCallback((id: number, quantity: number) => {
    handleQuantityChange(id, quantity - 1);
  }, [handleQuantityChange]);

  const handleIncrease = useCallback((id: number, quantity: number) => {
    handleQuantityChange(id, quantity + 1);
  }, [handleQuantityChange]);

  // Расчет суммы корзины
  const { subtotal, deliveryCost, total } = useMemo(() => {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryCost = 500;
    const total = subtotal + deliveryCost - promoDiscount;
    
    return { subtotal, deliveryCost, total };
  }, [cartItems, promoDiscount]);

  // Форматирование цены
  const formatPrice = useCallback((price: number) => {
    return price.toLocaleString('ru-RU') + ' ₽';
  }, []);

  return (
    <div className="cart-page">
      <div className="container">
        <h1 className="section-title section-title--centered">Корзина</h1>
        
        {cartItems.length > 0 ? (
          <div className="cart-page__content">
            <div className="cart-page__items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item__product">
                    <ProductCard
                      id={item.id.toString()}
                      name={item.name}
                      price={item.price}
                      image={item.image}
                      inCart={true}
                    />
                  </div>
                  <div className="cart-item__controls">
                    <div className="cart-item__quantity">
                      <button 
                        className="cart-item__quantity-btn"
                        onClick={() => handleDecrease(item.id, item.quantity)}
                        aria-label="Уменьшить количество"
                      >
                        —
                      </button>
                      <span className="cart-item__quantity-value">{item.quantity}</span>
                      <button 
                        className="cart-item__quantity-btn"
                        onClick={() => handleIncrease(item.id, item.quantity)}
                        aria-label="Увеличить количество"
                      >
                        +
                      </button>
                    </div>
                    <div className="cart-item__total">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                    <button 
                      className="cart-item__remove"
                      onClick={() => handleRemoveItem(item.id)}
                      aria-label="Удалить товар"
                    >
                      <Icon name="check" size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="cart-page__sidebar">
              <div className="cart-summary">
                <h2 className="section-title cart-summary__title">Сумма заказа</h2>
                
                <div className="cart-summary__row">
                  <span className="cart-summary__label">Товары</span>
                  <span className="cart-summary__value">{formatPrice(subtotal)}</span>
                </div>
                
                <div className="cart-summary__row">
                  <span className="cart-summary__label">Доставка</span>
                  <span className="cart-summary__value">{formatPrice(deliveryCost)}</span>
                </div>
                
                {promoApplied && (
                  <div className="cart-summary__row cart-summary__row--discount">
                    <span className="cart-summary__label">Скидка</span>
                    <span className="cart-summary__value">-{formatPrice(promoDiscount)}</span>
                  </div>
                )}
                
                <div className="divider-accent cart-summary__divider"></div>
                
                <div className="cart-summary__row cart-summary__row--total">
                  <span className="cart-summary__label">Итого</span>
                  <span className="cart-summary__value">{formatPrice(total)}</span>
                </div>
                
                <div className="cart-summary__promo">
                  <input
                    type="text"
                    placeholder="Введите промокод"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="cart-summary__promo-input"
                  />
                  <button 
                    className="button button--outline" 
                    onClick={handleApplyPromo}
                  >
                    Применить
                  </button>
                </div>
                
                <Link to="/checkout" className="button button--primary cart-summary__checkout-btn">
                  Оформить заказ
                </Link>
              </div>
              
              <div className="cart-help">
                <p className="cart-help__text">
                  Нужна помощь с заказом? Позвоните нам:
                </p>
                <a href="tel:+79991234567" className="cart-help__phone">
                  <Icon name="phone" size={16} /> +7 (999) 123-45-67
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="cart-page__empty">
            <div className="cart-empty">
              <div className="cart-empty__icon">
                <Icon name="cart" size={64} />
              </div>
              <p className="cart-empty__message">
                Ваша корзина пуста
              </p>
              <p className="cart-empty__submessage">
                Какой хороший день, чтобы подарить цветок
              </p>
              <Link to="/catalog" className="button button--primary cart-empty__button">
                Перейти в каталог
              </Link>
            </div>
          </div>
        )}
        
        <div className="cart-page__continue-shopping">
          <Link to="/catalog" className="cart-page__continue-link">
            ← Продолжить покупки
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 