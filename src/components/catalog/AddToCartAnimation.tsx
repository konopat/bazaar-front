import React, { useState, useEffect } from 'react';
import Icon from '../common/Icon';

interface AddToCartAnimationProps {
  productId: number;
  isVisible: boolean;
  onAnimationEnd: () => void;
}

const AddToCartAnimation: React.FC<AddToCartAnimationProps> = ({
  productId,
  isVisible,
  onAnimationEnd
}) => {
  const [style, setStyle] = useState({
    transform: 'translate(0, 0)',
    opacity: 0
  });

  useEffect(() => {
    if (isVisible) {
      const productButton = document.querySelector(`[data-product-id="${productId}"]`);
      const cartButton = document.querySelector('.cart-button');

      if (productButton && cartButton) {
        const productRect = productButton.getBoundingClientRect();
        const cartRect = cartButton.getBoundingClientRect();

        // Установка начальной позиции
        setStyle({
          transform: `translate(${productRect.left}px, ${productRect.top}px)`,
          opacity: 1
        });

        // Запуск анимации с небольшой задержкой для улучшения восприятия
        setTimeout(() => {
          requestAnimationFrame(() => {
            setStyle({
              transform: `translate(${cartRect.left}px, ${cartRect.top}px) scale(0.3)`,
              opacity: 0
            });
          });
        }, 50);

        // Завершение анимации
        setTimeout(() => {
          onAnimationEnd();
        }, 1000);
      }
    }
  }, [isVisible, productId, onAnimationEnd]);

  if (!isVisible) return null;

  return (
    <div 
      className="add-to-cart-animation"
      style={style}
      aria-hidden="true"
    >
      <Icon name="cart" color="#FFFFFF" size={16} />
    </div>
  );
};

export default AddToCartAnimation; 