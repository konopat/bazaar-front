import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const CartPage: React.FC = () => {
  // Моковые данные корзины
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: 'Букет "Весеннее настроение"',
      price: 3200,
      quantity: 1,
      image: '/images/bouquets/bouquet1.jpg'
    },
    {
      id: 2,
      name: 'Композиция "Нежность"',
      price: 2800,
      quantity: 2,
      image: '/images/bouquets/bouquet2.jpg'
    },
    {
      id: 3,
      name: 'Букет "Яркий день"',
      price: 3500,
      quantity: 1,
      image: '/images/bouquets/bouquet3.jpg'
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  // Обработчик изменения количества товара
  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Обработчик удаления товара из корзины
  const handleRemoveItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  // Обработчик применения промокода
  const handleApplyPromo = () => {
    // Моковая логика проверки промокода
    if (promoCode.toUpperCase() === 'DISCOUNT') {
      setPromoApplied(true);
      setPromoDiscount(500);
    } else {
      alert('Промокод недействителен');
    }
  };

  // Расчет суммы корзины
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryCost = 500;
  const total = subtotal + deliveryCost - promoDiscount;

  return (
    <div className="cart">
      <div className="container">
        <h1 className="section-title section-title--centered">Корзина</h1>
        
        {cartItems.length > 0 ? (
          <div className="cart__content">
            <div className="cart__items">
              {cartItems.map(item => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item__image-container">
                    <img src={item.image} alt={item.name} className="cart-item__image" />
                  </div>
                  <div className="cart-item__details">
                    <h3 className="cart-item__name">{item.name}</h3>
                    <div className="cart-item__price">{item.price} ₽</div>
                  </div>
                  <div className="cart-item__quantity">
                    <button 
                      className="cart-item__quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="cart-item__quantity-value">{item.quantity}</span>
                    <button 
                      className="cart-item__quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="cart-item__total">
                    {item.price * item.quantity} ₽
                  </div>
                  <button 
                    className="cart-item__remove"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            
            <div className="cart__sidebar">
              <div className="cart-summary">
                <h2 className="cart-summary__title">Сумма заказа</h2>
                
                <div className="cart-summary__row">
                  <span className="cart-summary__label">Товары</span>
                  <span className="cart-summary__value">{subtotal} ₽</span>
                </div>
                
                <div className="cart-summary__row">
                  <span className="cart-summary__label">Доставка</span>
                  <span className="cart-summary__value">{deliveryCost} ₽</span>
                </div>
                
                {promoApplied && (
                  <div className="cart-summary__row cart-summary__row--discount">
                    <span className="cart-summary__label">Скидка по промокоду</span>
                    <span className="cart-summary__value">-{promoDiscount} ₽</span>
                  </div>
                )}
                
                <div className="cart-summary__divider"></div>
                
                <div className="cart-summary__row cart-summary__row--total">
                  <span className="cart-summary__label">Итого</span>
                  <span className="cart-summary__value">{total} ₽</span>
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
                    className="button button--apply-promo" 
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
                  +7 (999) 123-45-67
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="cart__empty">
            <div className="cart-empty">
              <p className="cart-empty__message">
                Ваша корзина пуста
              </p>
              <p className="cart-empty__submessage">
                Добавьте товары в корзину, чтобы оформить заказ
              </p>
              <Link to="/catalog" className="button button--primary cart-empty__button">
                Перейти в каталог
              </Link>
            </div>
          </div>
        )}
        
        <div className="cart__continue-shopping">
          <Link to="/catalog" className="cart__continue-link">
            ← Продолжить покупки
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 