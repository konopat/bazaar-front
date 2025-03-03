import React, { useState, useEffect } from 'react';

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

        // Устанавливаем начальную позицию
        setStyle({
          transform: `translate(${productRect.left}px, ${productRect.top}px)`,
          opacity: 1
        });

        // Запускаем анимацию
        requestAnimationFrame(() => {
          setStyle({
            transform: `translate(${cartRect.left}px, ${cartRect.top}px) scale(0.3)`,
            opacity: 0
          });
        });

        // Завершаем анимацию
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
    >
      🛍️
    </div>
  );
};

export default AddToCartAnimation; 