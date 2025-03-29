import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import '../../styles/components/Modal.css';
import Skeleton from './Skeleton';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  isLoading?: boolean;
  skeletonConfig?: {
    count?: number;
    height?: string | number;
    spacing?: string | number;
  };
}

const Modal = ({ 
  isOpen, 
  onClose, 
  children, 
  title, 
  isLoading = false,
  skeletonConfig = { count: 3, height: '2rem', spacing: '1rem' }
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  
  // Упрощенная логика определения темы
  const isDarkTheme = document.body.classList.contains('theme-dark');

  // Мемоизированный обработчик закрытия
  const handleClose = useCallback(() => {
    setIsClosing(true);
    setIsContentVisible(false);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  }, [onClose]);

  // Эффект для открытия модального окна с CSS-анимацией
  useEffect(() => {
    if (isOpen) {
      // Задержка для анимации открытия, затем показываем контент
      const timeout = setTimeout(() => {
        setIsContentVisible(true);
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Эффект для обработки нажатия клавиши Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleClose]);

  // Мемоизированные скелетоны для предотвращения лишних перерисовок
  const skeletons = useMemo(() => {
    if (!isLoading) return null;
    
    const { count = 3, height = '2rem', spacing = '1rem' } = skeletonConfig;
    const skeletonsArray = [];
    
    for (let i = 0; i < count; i++) {
      skeletonsArray.push(
        <div key={i} style={{ marginBottom: typeof spacing === 'number' ? `${spacing}px` : spacing }}>
          <Skeleton height={height} />
        </div>
      );
    }
    
    return skeletonsArray;
  }, [isLoading, skeletonConfig]);

  if (!isOpen && !isClosing) return null;

  const modalClass = isDarkTheme ? 'modal theme-dark' : 'modal';
  
  // Создаем модальное окно с правильной темой
  const portalContent = (
    <div 
      className={`modal-overlay ${isClosing ? 'modal-overlay--closing' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className={`${modalClass} ${isClosing ? 'modal--closing' : ''}`} ref={modalRef}>
        <div className="modal__header">
          {title && <h2 className="modal__title fashion-heading">{title}</h2>}
          <button 
            className="modal__close" 
            onClick={handleClose}
            aria-label="Закрыть"
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>
        <div className={`modal__content ${isContentVisible ? 'modal__content--visible' : ''}`}>
          {isLoading ? (
            <div className="modal__skeleton-container">
              {skeletons}
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(portalContent, document.body);
};

export default Modal; 