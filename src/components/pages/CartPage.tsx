import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@store/store';
import { removeFromCart, updateQuantity } from '@store/cartSlice';

const CartPage: React.FC = () => {
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: '',
  });

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = useSelector((state: RootState) => state.cart.total);
  const dispatch = useDispatch();

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleRemoveItem = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет логика отправки заказа
    console.log('Order submitted:', {
      items: cartItems,
      total,
      deliveryType,
      ...formData,
    });
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart cart--empty">
        <div className="container">
          <h1 className="cart__title">Корзина пуста</h1>
          <p className="cart__message">
            Какой отличный день, чтоб подарить цветок!
          </p>
          <a href="/catalog" className="button button--primary">
            Перейти в каталог
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="container">
        <h1 className="cart__title">Корзина</h1>
        
        <div className="cart__content">
          <div className="cart__items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item__image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item__info">
                  <h3 className="cart-item__title">{item.name}</h3>
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
            <div className="cart__summary">
              <div className="cart__summary-row">
                <span>Товары ({cartItems.length})</span>
                <span>{total} ₽</span>
              </div>
              <div className="cart__summary-row">
                <span>Доставка</span>
                <span>{deliveryType === 'delivery' ? '300 ₽' : 'Бесплатно'}</span>
              </div>
              <div className="cart__summary-total">
                <span>Итого</span>
                <span>{total + (deliveryType === 'delivery' ? 300 : 0)} ₽</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="cart__form">
              <div className="cart__form-section">
                <h3 className="cart__form-title">Способ получения</h3>
                <div className="cart__delivery-type">
                  <label className="radio">
                    <input
                      type="radio"
                      name="deliveryType"
                      value="delivery"
                      checked={deliveryType === 'delivery'}
                      onChange={() => setDeliveryType('delivery')}
                    />
                    <span>Доставка</span>
                  </label>
                  <label className="radio">
                    <input
                      type="radio"
                      name="deliveryType"
                      value="pickup"
                      checked={deliveryType === 'pickup'}
                      onChange={() => setDeliveryType('pickup')}
                    />
                    <span>Самовывоз</span>
                  </label>
                </div>
              </div>

              <div className="cart__form-section">
                <h3 className="cart__form-title">Контактные данные</h3>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="cart__input"
                />
                <input
                  type="tel"
                  placeholder="Телефон"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="cart__input"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="cart__input"
                />
                {deliveryType === 'delivery' && (
                  <input
                    type="text"
                    placeholder="Адрес доставки"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    required
                    className="cart__input"
                  />
                )}
                <textarea
                  placeholder="Комментарий к заказу"
                  value={formData.comment}
                  onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                  className="cart__textarea"
                />
              </div>

              <button type="submit" className="button button--primary cart__submit">
                Оформить заказ
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 