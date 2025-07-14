import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import '../../styles/components/add-to-cart-animation.css';

interface AddToCartAnimationProps {
  productId: number;
  isVisible: boolean;
  onAnimationEnd: () => void;
  clickPosition: { x: number; y: number };
}

const AddToCartAnimation: React.FC<AddToCartAnimationProps> = ({
  productId,
  isVisible,
  onAnimationEnd,
  clickPosition
}) => {
  const [animationStyle, setAnimationStyle] = useState<React.CSSProperties>({});
  const [debugInfo, setDebugInfo] = useState<string>('');
  const [trailDots, setTrailDots] = useState<{ id: number; style: React.CSSProperties }[]>([]);
  const animationRef = useRef<HTMLDivElement>(null);
  const animationStarted = useRef(false);
  const portalRef = useRef<HTMLDivElement | null>(null);
  const animationProgress = useRef(0);
  const currentPositionRef = useRef({ x: 0, y: 0 });
  const numTrailDots = 5; // Уменьшаем количество точек в следе

  useEffect(() => {
    if (!isVisible) {
      setAnimationStyle({});
      setTrailDots([]);
      animationStarted.current = false;
      animationProgress.current = 0;
      return;
    }

    console.log('Animation triggered with clickPosition:', clickPosition);

    // Находим кнопку корзины
    const cartButton = document.querySelector('.cart-button') as HTMLElement;
    
    if (!cartButton) {
      console.error('Не удалось найти кнопку корзины');
      setDebugInfo('Ошибка: кнопка корзины не найдена');
      onAnimationEnd();
      return;
    }
    
    // Получаем позицию кнопки корзины
    const cartRect = cartButton.getBoundingClientRect();
    const cartX = cartRect.left + (cartRect.width / 2);
    const cartY = cartRect.top + (cartRect.height / 2);
    
    console.log('Cart button found:', { cartX, cartY });
    
    // Используем позицию клика как начальную точку
    const startX = clickPosition.x;
    const startY = clickPosition.y;
    currentPositionRef.current = { x: startX, y: startY };
    
    // Начальный стиль анимации
    setAnimationStyle({
      position: 'fixed',
      top: `${startY}px`,
      left: `${startX}px`,
      width: '24px',
      height: '24px',
      borderRadius: '50%',
      backgroundColor: 'var(--color-badge)',
      opacity: 1,
      zIndex: 999999999,
      boxShadow: '0 0 10px rgba(var(--color-accent-rgb), 0.7)',
    });
    
    // Создаем элемент портала для анимации, если его еще нет
    if (!portalRef.current) {
      const portal = document.createElement('div');
      portal.id = 'animation-portal';
      document.body.appendChild(portal);
      portalRef.current = portal;
    }
    
    // Задержка перед началом анимации (уменьшена)
    const startDelay = 10;
    
    // Таймаут для начала анимации
    const animationStartTimeout = setTimeout(() => {
      if (!isVisible) return;
      
      animationStarted.current = true;
      
      // Продолжительность анимации
      const animationDuration = 350; // ms
      
      // Предварительно рассчитываем путь для более равномерного распределения точек
      const pathPoints: { x: number, y: number }[] = [];
      const numPoints = 30; // больше точек для более плавного пути
      
      for (let i = 0; i < numPoints; i++) {
        const t = i / (numPoints - 1);
        // Прямой путь с небольшим отклонением вверх в середине
        const midPointY = startY - Math.sin(Math.PI * t) * 30;
        const x = startX + (cartX - startX) * t;
        const y = startY + (cartY - startY) * t - Math.sin(Math.PI * t) * 30;
        pathPoints.push({ x, y });
      }
      
      // Анимируем движение к корзине
      setAnimationStyle(prev => ({
        ...prev,
        top: `${cartY}px`,
        left: `${cartX}px`,
        transition: `all ${animationDuration}ms cubic-bezier(0.25, 0.1, 0.25, 1.0)`,
        transform: 'scale(0.1)',
        opacity: 0.5,
      }));
      
      // Расстояние между точками следа (по времени)
      const trailInterval = animationDuration / (numTrailDots + 1);
      
      // Создаем следы за основной точкой
      for (let i = 1; i <= numTrailDots; i++) {
        const trailDelay = i * trailInterval;
        
        // Задержка перед созданием каждой точки следа
        setTimeout(() => {
          if (!isVisible) return;
          
          // Расчет прогресса для текущей точки следа (чуть позади основной анимации)
          const trailProgress = (trailDelay / animationDuration) * 0.8;
          const pointIndex = Math.floor(trailProgress * pathPoints.length);
          const point = pathPoints[Math.min(pointIndex, pathPoints.length - 1)];
          
          // Создаем точку следа
          setTrailDots(prevDots => {
            const newDot = {
              id: Date.now() + Math.random(),
              style: {
                position: 'fixed' as const,
                top: `${point.y}px`,
                left: `${point.x}px`,
                width: `16px`,
                height: `16px`,
                opacity: 0,
                transform: 'scale(0)',
                animation: 'dot-appear 300ms forwards',
                zIndex: 999999990 - i,
              }
            };
            
            // Удаляем старые точки, чтобы избежать переполнения
            const updatedDots = [...prevDots, newDot].slice(-numTrailDots);
            return updatedDots;
          });
        }, trailDelay);
      }
      
      console.log('Animation started towards cart:', { cartX, cartY });
      
      // Через время анимации создаем вспышку на корзине
      const cartFlashTimeout = setTimeout(() => {
        // Добавляем эффект вспышки на кнопке корзины
        cartButton.classList.add('cart-flash');
        
        // Удаляем эффект через некоторое время
        setTimeout(() => {
          cartButton.classList.remove('cart-flash');
        }, 300);
        
        console.log('Cart flash triggered');
      }, animationDuration);
      
      // Удаляем анимацию после завершения
      const animationEndTimeout = setTimeout(() => {
        // Завершаем анимацию
        onAnimationEnd();
        console.log('Animation completed');
      }, animationDuration + 300);
      
      // Возвращаем функцию очистки таймаутов
      return () => {
        clearTimeout(animationStartTimeout);
        clearTimeout(cartFlashTimeout);
        clearTimeout(animationEndTimeout);
      };
      
    }, startDelay);
    
    // Очистка при размонтировании
    return () => {
      clearTimeout(animationStartTimeout);
    };
  }, [isVisible, productId, onAnimationEnd, clickPosition]);

  // Очистка портала при размонтировании компонента
  useEffect(() => {
    return () => {
      if (portalRef.current && document.body.contains(portalRef.current)) {
        try {
          document.body.removeChild(portalRef.current);
          portalRef.current = null;
        } catch (e) {
          console.error('Ошибка при удалении портала:', e);
        }
      }
    };
  }, []);

  // Рендерим через портал для избежания проблем с overflow и z-index
  return ReactDOM.createPortal(
    <>
      {isVisible && (
        <>
          {/* Основной анимируемый элемент */}
          <div 
            ref={animationRef}
            className="animation-circle"
            style={animationStyle}
          />
          
          {/* Следы из простых точек */}
          {trailDots.map((dot) => (
            <div 
              key={dot.id} 
              className="animation-trail-dot"
              style={dot.style}
            />
          ))}
          
          {/* Отладочная информация */}
          {debugInfo && (
            <div style={{ 
              position: 'fixed', 
              top: '20px', 
              left: '20px', 
              backgroundColor: 'rgba(0,0,0,0.8)', 
              color: 'white', 
              padding: '10px', 
              zIndex: 999999, 
              maxWidth: '300px' 
            }}>
              {debugInfo}
            </div>
          )}
        </>
      )}
    </>,
    document.body
  );
};

export default AddToCartAnimation; 