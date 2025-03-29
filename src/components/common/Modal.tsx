import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import '../../styles/components/Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isClosing, setIsClosing] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setIsContentVisible(false);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  // Эффект для открытия модального окна
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
  }, [isOpen, onClose]);

  if (!isOpen && !isClosing) return null;

  return createPortal(
    <div 
      className={`modal-overlay ${isClosing ? 'modal-overlay--closing' : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className={`modal ${isClosing ? 'modal--closing' : ''}`} ref={modalRef}>
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
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal; 