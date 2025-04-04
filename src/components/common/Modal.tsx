import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ModalProps } from '../../types';
import '../../styles/components/Modal.css';
import Skeleton from './Skeleton';

// Функция для вычисления ширины скроллбара
const getScrollbarWidth = () => {
  // Создаем элемент с прокруткой
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  document.body.appendChild(outer);
  
  // Создаем внутренний элемент
  const inner = document.createElement('div');
  outer.appendChild(inner);
  
  // Вычисляем ширину скроллбара
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  
  // Удаляем временные элементы
  outer.parentNode?.removeChild(outer);
  
  return scrollbarWidth;
};

// Устанавливаем CSS-переменную при загрузке
if (typeof document !== 'undefined') {
  document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);
}

/**
 * Компонент модального окна с анимацией и поддержкой доступности.
 * Создаётся через React Portal и поддерживает темную/светлую тему.
 * 
 * @param {ModalProps} props - Пропсы компонента
 * @returns {React.ReactPortal | null} Модальное окно или null, если оно закрыто
 */
const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  isLoading = false,
  skeletonConfig = { count: 3, height: '2rem', spacing: '1rem' },
  className = '',
  id = 'modal'
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [initialFocusSet, setInitialFocusSet] = useState(false);
  
  // Упрощенная логика определения темы
  const isDarkTheme = document.body.classList.contains('theme-dark');

  // ID для связывания с ARIA-атрибутами
  const titleId = `${id}-title`;
  const contentId = `${id}-content`;

  /**
   * Обработчик закрытия модального окна с анимацией
   */
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setIsContentVisible(false);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  }, [onClose]);

  // Эффект для фокуса и анимации при открытии
  useEffect(() => {
    if (isOpen) {
      // Задержка для анимации открытия, затем показываем контент
      const timeout = setTimeout(() => {
        setIsContentVisible(true);
        
        // Устанавливаем фокус на модальное окно или первый фокусируемый элемент
        if (!initialFocusSet && modalRef.current) {
          const focusableElements = modalRef.current.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusableElements.length > 0) {
            (focusableElements[0] as HTMLElement).focus();
          } else {
            modalRef.current.focus();
          }
          setInitialFocusSet(true);
        }
      }, 150);
      
      return () => clearTimeout(timeout);
    } else {
      setInitialFocusSet(false);
    }
  }, [isOpen, initialFocusSet]);

  // Эффект для обработки нажатия клавиши Escape и блокировки прокрутки
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    // Сохраняем активный элемент, чтобы вернуть фокус после закрытия
    const activeElement = document.activeElement as HTMLElement;
    
    // Сохраняем текущую позицию скролла
    const scrollY = window.scrollY;

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      
      // Блокируем скролл с сохранением текущей позиции
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      
      // Восстанавливаем скролл при закрытии
      if (document.body.style.position === 'fixed') {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      }
      
      // Возвращаем фокус при закрытии модального окна
      if (!isOpen && activeElement) {
        setTimeout(() => {
          activeElement.focus();
        }, 0);
      }
    };
  }, [isOpen, handleClose]);

  /**
   * Обработчик перехвата фокуса внутри модального окна (фокус-ловушка)
   */
  const handleFocusTrap = (e: React.KeyboardEvent) => {
    if (e.key === 'Tab' && modalRef.current) {
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      if (focusableElements.length === 0) return;
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  };

  // Мемоизированные скелетоны для предотвращения лишних перерисовок
  const skeletons = useMemo(() => {
    if (!isLoading) return null;
    
    const { count = 3, height = '2rem', spacing = '1rem' } = skeletonConfig;
    const skeletonsArray = [];
    
    for (let i = 0; i < count; i++) {
      skeletonsArray.push(
        <div key={i} style={{ marginBlockEnd: typeof spacing === 'number' ? `${spacing}px` : spacing }}>
          <Skeleton height={height} />
        </div>
      );
    }
    
    return skeletonsArray;
  }, [isLoading, skeletonConfig]);

  // Если модальное окно закрыто и не в процессе закрытия, не рендерим его
  if (!isOpen && !isClosing) return null;

  const modalClass = `modal ${isDarkTheme ? 'theme-dark' : ''} ${className}`;
  
  // Создаем модальное окно с правильной темой
  const portalContent = (
    // Устанавливаем роль dialog для доступности
    <section 
      className={`modal-overlay ${isClosing ? 'modal-overlay--closing' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={contentId}
    >
      <div 
        className={`${modalClass} ${isClosing ? 'modal--closing' : ''}`} 
        ref={modalRef}
        tabIndex={-1} // Делаем элемент фокусируемым
        onKeyDown={handleFocusTrap}
        id={id}
      >
        <header className="modal__header">
          {title && <h2 className="modal__title fashion-heading" id={titleId}>{title}</h2>}
          <button 
            className="modal__close" 
            onClick={handleClose}
            aria-label="Закрыть"
            type="button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </header>
        <div 
          className={`modal__content ${isContentVisible ? 'modal__content--visible' : ''}`}
          id={contentId}
        >
          {isLoading ? (
            <div className="modal__skeleton-container">
              {skeletons}
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </section>
  );

  return createPortal(portalContent, document.body);
};

export default Modal; 