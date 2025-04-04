import { useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../common/Icon';
import Modal from '../common/Modal';
import '../../styles/pages/profile.css';
import { UserProfile, DeliveryAddress, Order, mockProfile, mockAddresses, mockOrders } from '../../mocks/user';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses' | 'favorites'>('profile');
  const [profile, setProfile] = useState<UserProfile>(mockProfile);
  const [addresses, setAddresses] = useState<DeliveryAddress[]>(mockAddresses);
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedProfile, setEditedProfile] = useState<UserProfile>(profile);
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [editedAddress, setEditedAddress] = useState<Partial<DeliveryAddress>>({});
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [detailOrderId, setDetailOrderId] = useState<number | null>(null);

  // Функция для форматирования даты
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  // Функция для форматирования цены
  const formatPrice = (price: number): string => {
    return price.toLocaleString('ru-RU') + ' ₽';
  };

  // Функция для получения текста статуса заказа
  const getStatusText = (status: Order['status']): string => {
    switch (status) {
      case 'pending':
        return 'В обработке';
      case 'delivered':
        return 'Доставлен';
      case 'cancelled':
        return 'Отменен';
      default:
        return 'Неизвестно';
    }
  };

  // Функция для сохранения профиля
  const handleSaveProfile = useCallback(() => {
    setProfile(editedProfile);
    setEditModalOpen(false);
  }, [editedProfile]);

  // Функция для сохранения адреса
  const handleSaveAddress = useCallback(() => {
    if (editingAddressId === null) {
      // Добавление нового адреса
      const newAddress: DeliveryAddress = {
        id: Date.now(),
        title: editedAddress.title || 'Новый адрес',
        address: editedAddress.address || '',
        isDefault: editedAddress.isDefault || false
      };
      setAddresses([...addresses, newAddress]);
    } else {
      // Обновление существующего адреса
      setAddresses(
        addresses.map(addr => 
          addr.id === editingAddressId 
            ? { ...addr, ...editedAddress } 
            : addr
        )
      );
    }
    setAddressModalOpen(false);
    setEditedAddress({});
    setEditingAddressId(null);
  }, [addresses, editedAddress, editingAddressId]);

  // Функция для удаления адреса
  const handleDeleteAddress = useCallback((id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  }, [addresses]);

  // Функция для открытия модального окна редактирования адреса
  const handleEditAddress = useCallback((address: DeliveryAddress) => {
    setEditedAddress(address);
    setEditingAddressId(address.id);
    setAddressModalOpen(true);
  }, []);

  // Функция для добавления нового адреса
  const handleAddAddress = useCallback(() => {
    setEditedAddress({});
    setEditingAddressId(null);
    setAddressModalOpen(true);
  }, []);

  // Функция для подготовки просмотра деталей заказа
  const handleViewOrderDetails = useCallback((orderId: number) => {
    setDetailOrderId(orderId);
  }, []);

  // Функция для закрытия деталей заказа
  const handleCloseOrderDetails = useCallback(() => {
    setDetailOrderId(null);
  }, []);

  return (
    <div className="profile-page">
      <div className="container">
        <h1 className="section-title section-title--centered">Личный кабинет</h1>
        
        <div className="profile-page__content">
          <div className="profile-page__sidebar">
            <div className="profile-nav">
              <button 
                className={`profile-nav__item ${activeTab === 'profile' ? 'profile-nav__item--active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <Icon name="profile" size={20} />
                <span>Профиль</span>
              </button>
              
              <button 
                className={`profile-nav__item ${activeTab === 'orders' ? 'profile-nav__item--active' : ''}`}
                onClick={() => setActiveTab('orders')}
              >
                <Icon name="cart" size={20} />
                <span>Заказы</span>
              </button>
              
              <button 
                className={`profile-nav__item ${activeTab === 'addresses' ? 'profile-nav__item--active' : ''}`}
                onClick={() => setActiveTab('addresses')}
              >
                <Icon name="location" size={20} />
                <span>Адреса доставки</span>
              </button>
              
              <button 
                className={`profile-nav__item ${activeTab === 'favorites' ? 'profile-nav__item--active' : ''}`}
                onClick={() => setActiveTab('favorites')}
              >
                <Icon name="heart" size={20} />
                <span>Избранное</span>
              </button>
            </div>
          </div>
          
          <div className="profile-page__main">
            {activeTab === 'profile' && (
              <div className="profile-info">
                <div className="profile-info__header">
                  <h2 className="section-title">Личная информация</h2>
                  <button 
                    className="button button--outline"
                    onClick={() => {
                      setEditedProfile(profile);
                      setEditModalOpen(true);
                    }}
                  >
                    Редактировать
                  </button>
                </div>
                
                <div className="profile-card">
                  <div className="profile-card__avatar">
                    {profile.avatar ? (
                      <img 
                        src={profile.avatar} 
                        alt={profile.name} 
                        className="profile-card__avatar-img" 
                      />
                    ) : (
                      <div className="profile-card__avatar-placeholder">
                        <Icon name="profile" size={48} />
                      </div>
                    )}
                  </div>
                  
                  <div className="profile-card__details">
                    <div className="profile-card__field">
                      <div className="profile-card__label">Имя</div>
                      <div className="profile-card__value">{profile.name}</div>
                    </div>
                    
                    <div className="profile-card__field">
                      <div className="profile-card__label">Электронная почта</div>
                      <div className="profile-card__value">{profile.email}</div>
                    </div>
                    
                    <div className="profile-card__field">
                      <div className="profile-card__label">Телефон</div>
                      <div className="profile-card__value">{profile.phone}</div>
                    </div>
                  </div>
                </div>
                
                <div className="profile-info__additional">
                  <h3 className="section-title">Безопасность</h3>
                  <button className="button button--outline">
                    Изменить пароль
                  </button>
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div className="profile-orders">
                <h2 className="section-title">История заказов</h2>
                
                {detailOrderId === null ? (
                  <div className="orders-list">
                    {orders.length > 0 ? (
                      orders.map(order => (
                        <div className="order-card" key={order.id}>
                          <div className="order-card__header">
                            <div className="order-card__id">Заказ #{order.id}</div>
                            <div className="order-card__date">{formatDate(order.date)}</div>
                            <div className={`order-card__status order-card__status--${order.status}`}>
                              {getStatusText(order.status)}
                            </div>
                          </div>
                          
                          <div className="order-card__body">
                            <div className="order-card__items">
                              {order.items.slice(0, 1).map(item => (
                                <div className="order-card__item" key={item.id}>
                                  <div className="order-card__item-image">
                                    <img src={item.image} alt={item.title} />
                                  </div>
                                  <div className="order-card__item-title">
                                    {item.title}
                                  </div>
                                </div>
                              ))}
                              {order.items.length > 1 && (
                                <div className="order-card__more">
                                  +{order.items.length - 1} еще
                                </div>
                              )}
                            </div>
                            
                            <div className="order-card__total">
                              <div className="order-card__total-label">Итого:</div>
                              <div className="order-card__total-value">
                                {formatPrice(order.total)}
                              </div>
                            </div>
                          </div>
                          
                          <div className="order-card__footer">
                            <button 
                              className="button button--outline"
                              onClick={() => handleViewOrderDetails(order.id)}
                            >
                              Подробнее
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="orders-empty">
                        <div className="orders-empty__icon">
                          <Icon name="cart" size={48} />
                        </div>
                        <p className="orders-empty__text">У вас пока нет заказов</p>
                        <Link to="/catalog" className="button button--primary">
                          Перейти в каталог
                        </Link>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="order-details">
                    <button 
                      className="order-details__back"
                      onClick={handleCloseOrderDetails}
                    >
                      &larr; Назад к заказам
                    </button>
                    
                    {(() => {
                      const order = orders.find(o => o.id === detailOrderId);
                      if (!order) return null;
                      
                      return (
                        <div className="order-details__content">
                          <div className="order-details__header">
                            <h3 className="section-title">Заказ #{order.id}</h3>
                            <div className="order-details__meta">
                              <div className="order-details__date">
                                <Icon name="clock" size={16} />
                                {formatDate(order.date)}
                              </div>
                              <div className={`order-details__status order-details__status--${order.status}`}>
                                {getStatusText(order.status)}
                              </div>
                            </div>
                          </div>
                          
                          <div className="order-details__items">
                            <h4 className="order-details__subtitle">Товары</h4>
                            {order.items.map(item => (
                              <div className="order-item" key={item.id}>
                                <div className="order-item__image">
                                  <img src={item.image} alt={item.title} />
                                </div>
                                <div className="order-item__info">
                                  <div className="order-item__title">{item.title}</div>
                                  <div className="order-item__price">
                                    {formatPrice(item.price)} × {item.quantity}
                                  </div>
                                </div>
                                <div className="order-item__total">
                                  {formatPrice(item.price * item.quantity)}
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="order-details__summary">
                            <div className="order-details__summary-row">
                              <div className="order-details__summary-label">Сумма заказа</div>
                              <div className="order-details__summary-value">{formatPrice(order.total)}</div>
                            </div>
                            <div className="order-details__summary-row">
                              <div className="order-details__summary-label">Доставка</div>
                              <div className="order-details__summary-value">Включена</div>
                            </div>
                            <div className="divider-accent"></div>
                            <div className="order-details__summary-row order-details__summary-row--total">
                              <div className="order-details__summary-label">Итого</div>
                              <div className="order-details__summary-value">{formatPrice(order.total)}</div>
                            </div>
                          </div>
                          
                          {order.status === 'delivered' && (
                            <div className="order-details__actions">
                              <button className="button button--outline">
                                Повторить заказ
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'addresses' && (
              <div className="profile-addresses">
                <div className="profile-addresses__header">
                  <h2 className="section-title">Адреса доставки</h2>
                  <button 
                    className="button button--outline"
                    onClick={handleAddAddress}
                  >
                    Добавить адрес
                  </button>
                </div>
                
                <div className="addresses-list">
                  {addresses.length > 0 ? (
                    addresses.map(address => (
                      <div className="address-card" key={address.id}>
                        <div className="address-card__content">
                          <div className="address-card__title">
                            {address.title}
                            {address.isDefault && (
                              <span className="address-card__default">По умолчанию</span>
                            )}
                          </div>
                          <div className="address-card__address">
                            {address.address}
                          </div>
                        </div>
                        
                        <div className="address-card__actions">
                          <button 
                            className="address-card__edit"
                            onClick={() => handleEditAddress(address)}
                          >
                            Изменить
                          </button>
                          <button 
                            className="address-card__delete"
                            onClick={() => handleDeleteAddress(address.id)}
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="addresses-empty">
                      <div className="addresses-empty__icon">
                        <Icon name="location" size={48} />
                      </div>
                      <p className="addresses-empty__text">
                        У вас пока нет сохраненных адресов доставки
                      </p>
                      <button 
                        className="button button--primary"
                        onClick={handleAddAddress}
                      >
                        Добавить адрес
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {activeTab === 'favorites' && (
              <div className="profile-favorites">
                <h2 className="section-title">Избранные товары</h2>
                
                <div className="favorites-empty">
                  <div className="favorites-empty__icon">
                    <Icon name="heart" size={48} />
                  </div>
                  <p className="favorites-empty__text">
                    В избранном пока нет товаров
                  </p>
                  <Link to="/catalog" className="button button--primary">
                    Перейти в каталог
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Модальное окно редактирования профиля */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Редактирование профиля"
      >
        <div className="profile-edit">
          <div className="profile-edit__field">
            <label className="profile-edit__label">Имя</label>
            <input
              type="text"
              className="profile-edit__input"
              value={editedProfile.name}
              onChange={(e) => setEditedProfile({...editedProfile, name: e.target.value})}
            />
          </div>
          
          <div className="profile-edit__field">
            <label className="profile-edit__label">Email</label>
            <input
              type="email"
              className="profile-edit__input"
              value={editedProfile.email}
              onChange={(e) => setEditedProfile({...editedProfile, email: e.target.value})}
            />
          </div>
          
          <div className="profile-edit__field">
            <label className="profile-edit__label">Телефон</label>
            <input
              type="tel"
              className="profile-edit__input"
              value={editedProfile.phone}
              onChange={(e) => setEditedProfile({...editedProfile, phone: e.target.value})}
            />
          </div>
          
          <div className="profile-edit__actions">
            <button
              className="button button--outline"
              onClick={() => setEditModalOpen(false)}
            >
              Отмена
            </button>
            <button
              className="button button--primary"
              onClick={handleSaveProfile}
            >
              Сохранить
            </button>
          </div>
        </div>
      </Modal>
      
      {/* Модальное окно добавления/редактирования адреса */}
      <Modal
        isOpen={addressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        title={editingAddressId !== null ? "Редактирование адреса" : "Добавление адреса"}
      >
        <div className="address-edit">
          <div className="address-edit__field">
            <label className="address-edit__label">Название</label>
            <input
              type="text"
              className="address-edit__input"
              placeholder="Например: Дом, Работа"
              value={editedAddress.title || ''}
              onChange={(e) => setEditedAddress({...editedAddress, title: e.target.value})}
            />
          </div>
          
          <div className="address-edit__field">
            <label className="address-edit__label">Адрес</label>
            <input
              type="text"
              className="address-edit__input"
              placeholder="Улица, дом, квартира"
              value={editedAddress.address || ''}
              onChange={(e) => setEditedAddress({...editedAddress, address: e.target.value})}
            />
          </div>
          
          <div className="address-edit__field address-edit__field--checkbox">
            <input
              type="checkbox"
              id="isDefault"
              checked={editedAddress.isDefault || false}
              onChange={(e) => setEditedAddress({...editedAddress, isDefault: e.target.checked})}
            />
            <label htmlFor="isDefault" className="address-edit__checkbox-label">
              Использовать как адрес по умолчанию
            </label>
          </div>
          
          <div className="address-edit__actions">
            <button
              className="button button--outline"
              onClick={() => setAddressModalOpen(false)}
            >
              Отмена
            </button>
            <button
              className="button button--primary"
              onClick={handleSaveAddress}
            >
              Сохранить
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProfilePage; 