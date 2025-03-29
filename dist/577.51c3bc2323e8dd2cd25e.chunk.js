"use strict";(self.webpackChunkbazaar_front=self.webpackChunkbazaar_front||[]).push([[577],{1843:(n,e,o)=>{o.d(e,{A:()=>s});var t=o(1601),a=o.n(t),r=o(6314),i=o.n(r)()(a());i.push([n.id,'.stores-map {\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-xl);\n  height: 600px;\n  margin-top: var(--spacing-sm);\n  opacity: 0;\n  transition: opacity var(--transition-slow);\n}\n\n.stores-map--visible {\n  opacity: 1;\n}\n\n.stores-map__container {\n  flex: 1;\n  border-radius: var(--border-radius);\n  overflow: hidden;\n  position: relative;\n  box-shadow: var(--shadow-primary);\n  border: 1px solid var(--color-border);\n  min-height: 400px;\n  width: 100%;\n}\n\n[data-theme="dark"] .stores-map__container {\n  box-shadow: 0 4px 12px rgba(212, 169, 119, 0.2);\n  border: 1px solid rgba(212, 169, 119, 0.4);\n}\n\n.stores-map__error {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: var(--spacing-lg);\n  text-align: center;\n  background-color: var(--color-background);\n  color: var(--color-text);\n  z-index: 2;\n}\n\n[data-theme="dark"] .stores-map__error {\n  background-color: rgba(18, 18, 18, 0.9);\n  color: #F4E8DD;\n}\n\n.stores-map__error p {\n  max-width: 300px;\n  font-size: var(--font-size-md);\n  line-height: 1.5;\n}\n\n.stores-map__skeleton {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--color-background);\n  z-index: 10;\n  padding: var(--spacing-xl);\n}\n\n[data-theme="dark"] .stores-map__skeleton,\n:root[data-theme="dark"] .stores-map__skeleton,\nhtml[data-theme="dark"] .stores-map__skeleton,\nbody[data-theme="dark"] .stores-map__skeleton {\n  background-color: #121212;\n}\n\n.stores-map__skeleton-content {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-xl);\n}\n\n.stores-map__skeleton-title {\n  margin-bottom: var(--spacing-md);\n}\n\n.stores-map__skeleton-grid {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-md);\n}\n\n.stores-map__skeleton-area {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-md);\n}\n\n.stores-map__skeleton-main {\n  min-height: 200px;\n  margin-bottom: var(--spacing-md);\n}\n\n.stores-map__skeleton-details {\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-sm);\n}\n\n.stores-map__skeleton-points {\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-md);\n  margin-top: var(--spacing-xl);\n}\n\n.stores-map__skeleton-point {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-sm);\n}\n\n/* Удаляем старые стили для спиннера */\n.stores-map__loading-icon {\n  display: none;\n}\n\n.stores-map__loading-text {\n  display: none;\n}\n\n.stores-map__list {\n  width: 100%;\n  overflow-y: auto;\n  padding-right: var(--spacing-xs);\n  max-height: 200px;\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--spacing-md);\n}\n\n.stores-map__store-button {\n  flex: 1;\n  min-width: 200px;\n  text-align: left;\n  padding: var(--spacing-md);\n  border: 1px solid var(--color-border);\n  border-radius: var(--border-radius);\n  background: none;\n  cursor: pointer;\n  transition: all var(--transition-normal);\n  position: relative;\n  overflow: hidden;\n}\n\n[data-theme="dark"] .stores-map__store-button {\n  border-color: rgba(212, 169, 119, 0.4);\n  background-color: rgba(18, 18, 18, 0.3);\n}\n\n.stores-map__store-button::before {\n  content: \'\';\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 3px;\n  height: 100%;\n  background: var(--gradient-primary);\n  transform: scaleY(0);\n  transform-origin: bottom;\n  transition: transform var(--transition-normal);\n}\n\n.stores-map__store-button:hover {\n  border-color: var(--color-primary);\n  background-color: rgba(var(--primary-rgb), 0.03);\n  box-shadow: var(--shadow-sm);\n}\n\n[data-theme="dark"] .stores-map__store-button:hover {\n  background-color: rgba(212, 169, 119, 0.1);\n  box-shadow: 0 2px 8px rgba(212, 169, 119, 0.2);\n}\n\n.stores-map__store-button:hover::before {\n  transform: scaleY(1);\n}\n\n.stores-map__store-button--active {\n  border-color: var(--color-primary);\n  background-color: rgba(var(--primary-rgb), 0.06);\n  box-shadow: var(--shadow-sm);\n}\n\n[data-theme="dark"] .stores-map__store-button--active {\n  background-color: rgba(212, 169, 119, 0.2);\n  box-shadow: 0 2px 8px rgba(212, 169, 119, 0.3);\n}\n\n.stores-map__store-button--active::before {\n  transform: scaleY(1);\n}\n\n.stores-map__store-name {\n  font-family: var(--font-family-secondary);\n  font-size: var(--font-size-lg);\n  color: var(--color-text);\n  margin: 0 0 var(--spacing-sm);\n}\n\n[data-theme="dark"] .stores-map__store-name {\n  color: #F4E8DD;\n}\n\n.stores-map__store-address {\n  font-size: var(--font-size-sm);\n  color: var(--color-text-light);\n  margin: 0;\n}\n\n[data-theme="dark"] .stores-map__store-address {\n  color: #D4A977;\n}\n\n/* Стили для OpenLayers */\n.ol-control {\n  background: none;\n}\n\n.ol-zoom {\n  top: var(--spacing-md);\n  right: var(--spacing-md);\n  left: auto;\n}\n\n.ol-zoom button {\n  background-color: var(--color-background);\n  color: var(--color-text);\n  border: 1px solid var(--color-primary);\n  margin: 2px;\n  transition: all var(--transition-normal);\n}\n\n[data-theme="dark"] .ol-zoom button {\n  background-color: rgba(18, 18, 18, 0.8);\n  color: #F4E8DD;\n  border-color: #D4A977;\n}\n\n.ol-zoom button:hover {\n  background-color: var(--color-primary);\n  color: #FFFFFF;\n}\n\n[data-theme="dark"] .ol-zoom button:hover {\n  background-color: #D4A977;\n  color: #121212;\n}\n\n@keyframes spin {\n  0% {\n    transform: rotate(0deg);\n  }\n  100% {\n    transform: rotate(360deg);\n  }\n}\n\n/* Адаптивные стили */\n@media (min-width: 768px) {\n  .stores-map {\n    flex-direction: row;\n  }\n  \n  .stores-map__list {\n    width: 300px;\n    max-height: none;\n    flex-direction: column;\n    flex-wrap: nowrap;\n  }\n  \n  .stores-map__store-button {\n    min-width: auto;\n    margin-bottom: var(--spacing-md);\n    flex: none;\n  }\n}\n\n.stores-map__hidden {\n  opacity: 0;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n}\n\n.stores-map__skeleton-container {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 5;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  background-color: var(--color-background);\n}\n\n[data-theme="dark"] .stores-map__skeleton-container {\n  background-color: rgba(18, 18, 18, 0.8);\n}\n\n.stores-modal-content {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  gap: var(--spacing-md);\n}\n\n.stores-modal-content .stores-map__container {\n  min-height: 300px;\n  height: 300px;\n  position: relative;\n  border-radius: var(--border-radius);\n  overflow: hidden;\n  box-shadow: var(--shadow-primary);\n  border: 1px solid var(--color-border);\n}\n\n.stores-modal-content .stores-map__list {\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-md);\n  max-height: none;\n  width: 100%;\n  height: auto;\n  overflow: visible;\n  flex-wrap: nowrap;\n}\n\n/* На мобильных - отображаем в столбик */\n@media (max-width: 767px) {\n  .stores-modal-content .stores-map__list {\n    flex-direction: column;\n  }\n\n  .stores-modal-content .stores-map__store-button {\n    width: 100%;\n  }\n}\n\n/* На планшетах и выше можно отобразить в ряд */\n@media (min-width: 768px) {\n  .stores-modal-content .stores-map__list {\n    flex-direction: row;\n    flex-wrap: wrap;\n  }\n\n  .stores-modal-content .stores-map__store-button {\n    flex: 1;\n    min-width: 200px;\n  }\n}\n\n.stores-map-wrapper {\n  flex: 2;\n  min-height: 300px;\n  border-radius: var(--border-radius);\n  overflow: hidden;\n  box-shadow: var(--shadow-primary);\n  border: 1px solid var(--color-border);\n}\n\n[data-theme="dark"] .stores-map-wrapper {\n  box-shadow: 0 4px 12px rgba(212, 169, 119, 0.2);\n  border: 1px solid rgba(212, 169, 119, 0.4);\n}\n\n.stores-modal-details-column {\n  flex: 1;\n  min-height: 250px;\n  border-radius: var(--border-radius);\n  overflow: hidden;\n  box-shadow: var(--shadow-sm);\n  border: 1px solid var(--color-border);\n}\n\n[data-theme="dark"] .stores-modal-details-column {\n  border-color: rgba(212, 169, 119, 0.3);\n  box-shadow: 0 2px 8px rgba(212, 169, 119, 0.1);\n}\n\n.stores-modal-list-column {\n  flex: 1;\n}\n\n.stores-modal-list-column .stores-map__list {\n  max-height: 300px;\n  overflow-y: auto;\n  flex-direction: column;\n  flex-wrap: nowrap;\n}\n\n.stores-modal-list-column .stores-map__store-button {\n  width: 100%;\n  min-width: auto;\n}\n\n/* Адаптивные стили для десктопов */\n@media (min-width: 768px) {\n  .stores-modal-layout {\n    flex-direction: row;\n    align-items: stretch;\n    height: 600px;\n  }\n  \n  .stores-modal-map-column {\n    flex: 3;\n    min-height: 100%;\n    max-width: 65%;\n  }\n  \n  .stores-modal-list-column {\n    flex: 2;\n    max-width: 35%;\n    display: flex;\n    flex-direction: column;\n  }\n  \n  .stores-modal-list-column .stores-map__list {\n    flex: 1;\n    max-height: none;\n  }\n  \n  .stores-map-wrapper {\n    height: 60% !important;\n  }\n  \n  .stores-modal-details-column {\n    height: 40%;\n  }\n}\n\n/* Обновленные стили для компонента StoreDetails с двухколоночным лэйаутом */\n.store-details {\n  padding: var(--spacing-md);\n  border-radius: var(--border-radius);\n  background-color: var(--color-background);\n  height: 100%;\n}\n\n[data-theme="dark"] .store-details {\n  background-color: rgba(18, 18, 18, 0.8);\n}\n\n.store-details--empty {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  text-align: center;\n  padding: var(--spacing-xl);\n  color: var(--color-text-light);\n  font-style: italic;\n}\n\n.store-details__layout {\n  display: flex;\n  height: 100%;\n  gap: var(--spacing-md);\n}\n\n.store-details__photo-column {\n  flex: 1;\n  min-width: 120px;\n  height: 100%;\n  overflow: hidden;\n  border-radius: var(--border-radius);\n  border: 1px solid var(--color-border);\n  position: relative;\n}\n\n[data-theme="dark"] .store-details__photo-column {\n  border-color: rgba(212, 169, 119, 0.3);\n}\n\n.store-details__photo-skeleton {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  z-index: 2;\n  border-radius: var(--border-radius);\n  overflow: hidden;\n}\n\n.store-details__skeleton-animation {\n  background: linear-gradient(90deg, \n    var(--color-skeleton-start) 0%, \n    var(--color-skeleton-end) 50%, \n    var(--color-skeleton-start) 100%);\n  background-size: 200% 100%;\n  animation: shimmer 2s infinite;\n}\n\n[data-theme="dark"] .store-details__skeleton-animation {\n  background: linear-gradient(90deg, \n    rgba(32, 32, 32, 0.8) 0%, \n    rgba(48, 48, 48, 0.8) 50%, \n    rgba(32, 32, 32, 0.8) 100%);\n  background-size: 200% 100%;\n}\n\n@keyframes shimmer {\n  0% {\n    background-position: 200% 0;\n  }\n  100% {\n    background-position: -200% 0;\n  }\n}\n\n.store-details__photo {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n  transition: transform var(--transition-normal), opacity var(--transition-normal);\n}\n\n.store-details__photo--loading {\n  opacity: 0;\n}\n\n.store-details__photo:not(.store-details__photo--loading):hover {\n  transform: scale(1.05);\n}\n\n.store-details__info-column {\n  flex: 2;\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-sm);\n}\n\n.store-details__name {\n  font-family: var(--font-family-secondary);\n  font-size: var(--font-size-lg);\n  color: var(--color-text);\n  margin: 0 0 var(--spacing-sm);\n}\n\n[data-theme="dark"] .store-details__name {\n  color: #F4E8DD;\n}\n\n.store-details__address,\n.store-details__phone,\n.store-details__status {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-sm);\n  font-size: var(--font-size-sm);\n  color: var(--color-text);\n  margin: 0;\n}\n\n.store-details__icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n}\n\n.store-details__link {\n  color: var(--color-primary);\n  text-decoration: none;\n  transition: color var(--transition-normal);\n}\n\n.store-details__link:hover {\n  color: var(--color-primary-dark);\n  text-decoration: underline;\n}\n\n[data-theme="dark"] .store-details__link {\n  color: #D4A977;\n}\n\n[data-theme="dark"] .store-details__link:hover {\n  color: #E8D6C6;\n}\n\n.store-details__status--open {\n  color: var(--color-success);\n}\n\n.store-details__status--closed {\n  color: var(--color-error);\n}\n\n[data-theme="dark"] .store-details__status--open {\n  color: #6CBB87;\n}\n\n[data-theme="dark"] .store-details__status--closed {\n  color: #E57373;\n}\n\n/* Адаптивные стили для мобильных устройств */\n@media (max-width: 576px) {\n  .store-details__layout {\n    flex-direction: column;\n  }\n  \n  .store-details__photo-column {\n    height: 150px;\n    width: 100%;\n  }\n}\n\n/* Адаптивные стили для компонента StoreDetails */\n@media (min-width: 768px) {\n  .stores-modal-map-column {\n    position: relative;\n  }\n  \n  .stores-modal-details-column {\n    flex: 1;\n    max-height: 300px;\n    overflow-y: auto;\n  }\n}\n\n/* Исправляем отображение карты в модальном окне */\n.stores-modal-map-column .stores-map {\n  height: 100%;\n  margin-top: 0;\n  opacity: 1;\n}\n\n/* Исправляем контейнер карты в модальном окне */\n.stores-modal-map-column .stores-map__container {\n  min-height: 100%;\n  height: 100%;\n  position: relative;\n}\n\n/* В модальном окне скелетон должен полностью покрывать область карты */\n.stores-map-wrapper .stores-map__skeleton-container {\n  border-radius: var(--border-radius);\n}\n\n/* Убедимся, что карта занимает все доступное пространство */\n.stores-map-wrapper .stores-map,\n.stores-map-wrapper .stores-map__container {\n  height: 100% !important;\n  width: 100% !important;\n  min-height: inherit !important;\n  max-height: inherit !important;\n}\n\n.stores-section-title {\n  font-family: var(--font-family-secondary);\n  font-size: var(--font-size-lg);\n  color: var(--color-text);\n  margin: 0 0 var(--spacing-sm);\n  position: relative;\n  padding-left: var(--spacing-md);\n}\n\n.stores-section-title::before {\n  content: \'\';\n  position: absolute;\n  left: 0;\n  top: 50%;\n  transform: translateY(-50%);\n  width: 3px;\n  height: 70%;\n  background: var(--gradient-primary);\n  border-radius: 2px;\n}\n\n[data-theme="dark"] .stores-section-title {\n  color: #F4E8DD;\n}\n\n/* Обновленные стили для модального окна с двухколоночным лэйаутом */\n.stores-modal-layout {\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-lg);\n  width: 100%;\n}\n\n.stores-modal-map-column {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-md);\n  min-height: 600px;\n}\n\n.stores-map-wrapper {\n  flex: 2;\n  min-height: 300px;\n  border-radius: var(--border-radius);\n  overflow: hidden;\n  box-shadow: var(--shadow-primary);\n  border: 1px solid var(--color-border);\n}\n\n[data-theme="dark"] .stores-map-wrapper {\n  box-shadow: 0 4px 12px rgba(212, 169, 119, 0.2);\n  border: 1px solid rgba(212, 169, 119, 0.4);\n}\n\n.stores-modal-details-column {\n  flex: 1;\n  min-height: 250px;\n  border-radius: var(--border-radius);\n  overflow: hidden;\n  box-shadow: var(--shadow-sm);\n  border: 1px solid var(--color-border);\n}\n\n[data-theme="dark"] .stores-modal-details-column {\n  border-color: rgba(212, 169, 119, 0.3);\n  box-shadow: 0 2px 8px rgba(212, 169, 119, 0.1);\n}\n\n.stores-modal-list-column {\n  flex: 1;\n}\n\n.stores-modal-list-column .stores-map__list {\n  max-height: 300px;\n  overflow-y: auto;\n  flex-direction: column;\n  flex-wrap: nowrap;\n}\n\n.stores-modal-list-column .stores-map__store-button {\n  width: 100%;\n  min-width: auto;\n}\n\n/* Адаптивные стили для десктопов */\n@media (min-width: 768px) {\n  .stores-modal-layout {\n    flex-direction: row;\n    align-items: stretch;\n    height: 600px;\n  }\n  \n  .stores-modal-map-column {\n    flex: 3;\n    min-height: 100%;\n    max-width: 65%;\n  }\n  \n  .stores-modal-list-column {\n    flex: 2;\n    max-width: 35%;\n    display: flex;\n    flex-direction: column;\n  }\n  \n  .stores-modal-list-column .stores-map__list {\n    flex: 1;\n    max-height: none;\n  }\n  \n  .stores-map-wrapper {\n    height: 60% !important;\n  }\n  \n  .stores-modal-details-column {\n    height: 40%;\n  }\n} ',""]);const s=i},3120:(n,e,o)=>{o.d(e,{A:()=>s});var t=o(1601),a=o.n(t),r=o(6314),i=o.n(r)()(a());i.push([n.id,'.modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  animation: modalFadeIn 0.3s ease-in-out;\n  padding: 20px;\n}\n\n.modal-overlay--closing {\n  animation: modalFadeOut 0.3s ease-in-out forwards;\n}\n\n.modal {\n  background: var(--color-background);\n  border-radius: var(--border-radius);\n  padding: 24px;\n  width: 90vw;\n  max-width: 900px;\n  max-height: 90vh;\n  overflow-y: auto;\n  position: relative;\n  box-shadow: var(--shadow-md);\n  animation: modalSlideIn 0.3s ease-in-out;\n  display: flex;\n  flex-direction: column;\n}\n\n:root[data-theme="dark"] .modal, \nhtml[data-theme="dark"] .modal, \nbody[data-theme="dark"] .modal {\n  background: #121212;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);\n}\n\n.modal--closing {\n  animation: modalSlideOut 0.3s ease-in-out forwards;\n}\n\n.modal__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n  flex-shrink: 0;\n}\n\n.modal__title {\n  font-family: var(--font-family-secondary);\n  font-size: var(--font-size-2xl);\n  color: var(--color-text);\n  margin: 0;\n  position: relative;\n}\n\n:root[data-theme="dark"] .modal__title, \nhtml[data-theme="dark"] .modal__title, \nbody[data-theme="dark"] .modal__title {\n  color: #F4E8DD;\n}\n\n.modal__title::after {\n  content: \'\';\n  position: absolute;\n  bottom: -8px;\n  left: 0;\n  width: 50px;\n  height: 2px;\n  background: var(--gradient-primary);\n}\n\n.modal__close {\n  background: none;\n  border: none;\n  padding: 12px;\n  margin: -12px;\n  cursor: pointer;\n  color: var(--color-text);\n  transition: color var(--transition-normal);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n:root[data-theme="dark"] .modal__close, \nhtml[data-theme="dark"] .modal__close, \nbody[data-theme="dark"] .modal__close {\n  color: #F4E8DD;\n}\n\n.modal__close:hover {\n  color: var(--color-primary);\n}\n\n.modal__close svg {\n  fill: currentColor;\n}\n\n.modal__content {\n  color: var(--color-text);\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  min-height: 200px;\n  opacity: 0;\n  transition: opacity 0.3s ease-in-out;\n  position: relative;\n}\n\n:root[data-theme="dark"] .modal__content, \nhtml[data-theme="dark"] .modal__content, \nbody[data-theme="dark"] .modal__content {\n  color: #F4E8DD;\n}\n\n.modal__content--visible {\n  opacity: 1;\n}\n\n.modal__skeleton-container {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  min-height: 200px;\n}\n\n.modal__skeleton-container .skeleton-loader {\n  border-radius: var(--border-radius);\n}\n\n:root[data-theme="dark"] .modal__skeleton-container .skeleton-loader, \nhtml[data-theme="dark"] .modal__skeleton-container .skeleton-loader, \nbody[data-theme="dark"] .modal__skeleton-container .skeleton-loader {\n  background: linear-gradient(\n    90deg,\n    rgba(60, 60, 60, 1) 0%,\n    rgba(80, 80, 80, 1) 50%,\n    rgba(60, 60, 60, 1) 100%\n  );\n  background-size: 200% 100%;\n  animation: skeleton-loading 1.5s ease infinite;\n}\n\n@keyframes modalFadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes modalFadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n@keyframes modalSlideIn {\n  from {\n    transform: translateY(-20px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n\n@keyframes modalSlideOut {\n  from {\n    transform: translateY(0);\n    opacity: 1;\n  }\n  to {\n    transform: translateY(20px);\n    opacity: 0;\n  }\n}\n\n@media (max-width: 768px) {\n  .modal {\n    width: 100%;\n    height: 100%;\n    max-width: 100%;\n    max-height: 100%;\n    border-radius: 0;\n  }\n} ',""]);const s=i},3285:(n,e,o)=>{o.d(e,{A:()=>y});var t=o(4848),a=o(6540),r=o(6905),i=o(5072),s=o.n(i),l=o(7825),d=o.n(l),c=o(7659),m=o.n(c),p=o(5056),u=o.n(p),h=o(540),g=o.n(h),x=o(1113),f=o.n(x),_=o(3474),v={};v.styleTagTransform=f(),v.setAttributes=u(),v.insert=m().bind(null,"head"),v.domAPI=d(),v.insertStyleElement=g();s()(_.A,v);_.A&&_.A.locals&&_.A.locals;var b=function(){return b=Object.assign||function(n){for(var e,o=1,t=arguments.length;o<t;o++)for(var a in e=arguments[o])Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n},b.apply(this,arguments)};const y=function(n){var e=n.src,o=n.alt,i=n.fallbackSrc,s=void 0===i?"/images/placeholder.png":i,l=n.className,d=void 0===l?"":l,c=n.containerClassName,m=void 0===c?"":c,p=n.objectFit,u=void 0===p?"contain":p,h=n.width,g=void 0===h?"100%":h,x=n.height,f=void 0===x?"100%":x,_=n.aspectRatio,v=(0,a.useState)(!0),y=v[0],k=v[1],w=(0,a.useState)(!1),I=w[0],M=w[1];(0,a.useEffect)((function(){k(!0),M(!1)}),[e]);var D=_?{position:"relative",width:g,height:0,paddingBottom:"".concat(1/_*100,"%")}:{width:g,height:f},j=b({objectFit:u},_?{position:"absolute",top:0,left:0,width:"100%",height:"100%"}:{});return(0,t.jsxs)("div",{className:"lazy-image__container ".concat(m),style:D,children:[y&&(0,t.jsx)("div",{className:"lazy-image__skeleton",style:_?{position:"absolute",top:0,left:0,width:"100%",height:"100%"}:{},children:(0,t.jsx)(r.A,{width:"100%",height:"100%",className:"lazy-image__skeleton-animation"})}),(0,t.jsx)("img",{className:"lazy-image__img ".concat(d," ").concat(y?"lazy-image__img--hidden":""),src:I?s:e,alt:o,onLoad:function(){k(!1)},onError:function(){k(!1),M(!0)},style:j})]})}},3474:(n,e,o)=>{o.d(e,{A:()=>s});var t=o(1601),a=o.n(t),r=o(6314),i=o.n(r)()(a());i.push([n.id,"/* Стили для компонента LazyImage */\n\n.lazy-image__container {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  background-color: var(--color-skeleton-start);\n  border-radius: var(--border-radius, 8px);\n}\n\n.lazy-image__skeleton {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  border-radius: inherit;\n}\n\n.lazy-image__skeleton-animation {\n  background: linear-gradient(\n    90deg,\n    var(--color-skeleton-start),\n    var(--color-skeleton-end),\n    var(--color-skeleton-start)\n  );\n  background-size: 200% 100%;\n  animation: skeleton-loading 1.5s infinite;\n  height: 100%;\n  width: 100%;\n}\n\n.lazy-image__img {\n  display: block;\n  width: 100%;\n  height: 100%;\n  transition: opacity 0.2s ease-in-out;\n  position: relative;\n  z-index: 2;\n}\n\n.lazy-image__img--hidden {\n  opacity: 0;\n}\n\n@keyframes skeleton-loading {\n  0% {\n    background-position: -100% 0;\n  }\n  100% {\n    background-position: 100% 0;\n  }\n}\n\n/* Специальные стили для темной темы */\n.theme-dark .lazy-image__container {\n  background-color: var(--color-background-dark);\n}\n\n.theme-dark .lazy-image__skeleton-animation {\n  background: linear-gradient(\n    90deg,\n    var(--color-skeleton-start-dark),\n    var(--color-skeleton-end-dark),\n    var(--color-skeleton-start-dark)\n  );\n  background-size: 200% 100%;\n  animation: skeleton-loading 1.5s infinite;\n}\n\n@keyframes skeleton-loading-dark {\n  0% {\n    background-position: -200% 0;\n  }\n  100% {\n    background-position: 200% 0;\n  }\n}\n\n/* Варианты соотношения сторон */\n.lazy-image-container--square {\n  aspect-ratio: 1/1;\n}\n\n.lazy-image-container--4x3 {\n  aspect-ratio: 4/3;\n}\n\n.lazy-image-container--16x9 {\n  aspect-ratio: 16/9;\n}\n\n.lazy-image-container--3x4 {\n  aspect-ratio: 3/4;\n}\n\n.lazy-image-container--2x3 {\n  aspect-ratio: 2/3;\n}\n\n/* Различные object-fit преднастройки */\n.lazy-image--cover {\n  object-fit: cover;\n}\n\n.lazy-image--contain {\n  object-fit: contain;\n}\n\n.lazy-image--fill {\n  object-fit: fill;\n}\n\n/* Модификаторы для эффектов при наведении */\n.lazy-image--zoom:hover {\n  transform: scale(1.1);\n}\n\n.lazy-image--no-zoom:hover {\n  transform: none;\n}\n\n/* Улучшение производительности с помощью hardware acceleration */\n.lazy-image__img, \n.lazy-image__skeleton {\n  transform: translateZ(0);\n  backface-visibility: hidden;\n  will-change: opacity, transform;\n}\n\n/* Оптимизация для браузеров на базе WebKit */\n@supports (-webkit-overflow-scrolling: touch) {\n  .lazy-image__skeleton-animation {\n    /* Улучшение производительности на iOS */\n    -webkit-transform: translateZ(0);\n  }\n} ",""]);const s=i},6577:(n,e,o)=>{o.d(e,{A:()=>H});var t=o(4848),a=o(6540),r=o(961),i=o(5072),s=o.n(i),l=o(7825),d=o.n(l),c=o(7659),m=o.n(c),p=o(5056),u=o.n(p),h=o(540),g=o.n(h),x=o(1113),f=o.n(x),_=o(3120),v={};v.styleTagTransform=f(),v.setAttributes=u(),v.insert=m().bind(null,"head"),v.domAPI=d(),v.insertStyleElement=g();s()(_.A,v);_.A&&_.A.locals&&_.A.locals;var b=o(6905);const y=function(n){var e=n.isOpen,o=n.onClose,i=n.children,s=n.title,l=n.isLoading,d=void 0!==l&&l,c=n.skeletonConfig,m=void 0===c?{count:3,height:"2rem",spacing:"1rem"}:c,p=(0,a.useRef)(null),u=(0,a.useState)(!1),h=u[0],g=u[1],x=(0,a.useState)(!1),f=x[0],_=x[1],v=document.body.classList.contains("theme-dark"),y=(0,a.useCallback)((function(){g(!0),_(!1),setTimeout((function(){g(!1),o()}),300)}),[o]);(0,a.useEffect)((function(){if(e){var n=setTimeout((function(){_(!0)}),150);return function(){return clearTimeout(n)}}}),[e]),(0,a.useEffect)((function(){var n=function(n){"Escape"===n.key&&y()};return e&&(document.addEventListener("keydown",n),document.body.style.overflow="hidden"),function(){document.removeEventListener("keydown",n),document.body.style.overflow=""}}),[e,y]);var k=(0,a.useMemo)((function(){if(!d)return null;for(var n=m.count,e=void 0===n?3:n,o=m.height,a=void 0===o?"2rem":o,r=m.spacing,i=void 0===r?"1rem":r,s=[],l=0;l<e;l++)s.push((0,t.jsx)("div",{style:{marginBottom:"number"==typeof i?"".concat(i,"px"):i},children:(0,t.jsx)(b.A,{height:a})},l));return s}),[d,m]);if(!e&&!h)return null;var w=v?"modal theme-dark":"modal",I=(0,t.jsx)("div",{className:"modal-overlay ".concat(h?"modal-overlay--closing":""),onClick:function(n){n.target===n.currentTarget&&y()},children:(0,t.jsxs)("div",{className:"".concat(w," ").concat(h?"modal--closing":""),ref:p,children:[(0,t.jsxs)("div",{className:"modal__header",children:[s&&(0,t.jsx)("h2",{className:"modal__title fashion-heading",children:s}),(0,t.jsx)("button",{className:"modal__close",onClick:y,"aria-label":"Закрыть",children:(0,t.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})})})]}),(0,t.jsx)("div",{className:"modal__content ".concat(f?"modal__content--visible":""),children:d?(0,t.jsx)("div",{className:"modal__skeleton-container",children:k}):i})]})});return(0,r.createPortal)(I,document.body)};var k=o(9816),w=o(1765),I=o(7852),M=o(2620),D=o(6173),j=o(6717),A=o(4294),z=o(9701),N=o(2412),E=o(9276),S=o(9700),T=o(4307),C="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAzMiA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgMEM3LjE2NCAwIDAgNy4xNjQgMCAxNkMwIDI0IDE2IDQ4IDE2IDQ4QzE2IDQ4IDMyIDI0IDMyIDE2QzMyIDcuMTY0IDI0LjgzNiAwIDE2IDBaIiBmaWxsPSIjRDRBOTc3Ii8+PHBhdGggZD0iTTE2IDBDNy4xNjQgMCAwIDcuMTY0IDAgMTZDMCAyNCAxNiA0OCAxNiA0OEMxNiA0OCAzMiAyNCAzMiAxNkMzMiA3LjE2NCAyNC44MzYgMCAxNiAwWk0xNiAyMkMxMi42ODYgMjIgMTAgMTkuMzE0IDEwIDE2QzEwIDEyLjY4NiAxMi42ODYgMTAgMTYgMTBDMTkuMzE0IDEwIDIyIDEyLjY4NiAyMiAxNkMyMiAxOS4zMTQgMTkuMzE0IDIyIDE2IDIyWiIgZmlsbD0iIzRBNDMzQiIgZmlsbC1vcGFjaXR5PSIxIi8+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iNiIgZmlsbD0iI0I4OUY3QSIvPjwvc3ZnPg==";const O=(0,a.memo)((function(n){var e=n.stores,o=n.selectedStoreId,a=n.onStoreSelect;return(0,t.jsx)("div",{className:"stores-map__list",children:e.map((function(n){return(0,t.jsxs)("button",{className:"stores-map__store-button ".concat(n.id===o?"stores-map__store-button--active":""),onClick:function(){return a(n.id)},children:[(0,t.jsx)("h3",{className:"stores-map__store-name",children:n.name}),(0,t.jsx)("p",{className:"stores-map__store-address",children:n.address})]},n.id)}))})}));o(5045);var L=o(1843),Z={};Z.styleTagTransform=f(),Z.setAttributes=u(),Z.insert=m().bind(null,"head"),Z.domAPI=d(),Z.insertStyleElement=g();s()(L.A,Z);L.A&&L.A.locals&&L.A.locals;var P=function(){return(0,t.jsxs)("svg",{width:"64",height:"64",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[(0,t.jsx)("path",{d:"M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:"M12 8V12",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),(0,t.jsx)("path",{d:"M12 16H12.01",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})]})};const R=(0,a.memo)((function(n){var e=n.stores,o=n.selectedStoreId,r=n.onStoreSelect,i=n.onMapReady,s=n.hideStoresList,l=void 0!==s&&s,d=function(n,e,o){var t=o||{},r=t.onMapReady,i=t.initialZoom,s=void 0===i?12:i,l=t.maxZoom,d=void 0===l?19:l,c=t.centerCoordinates,m=void 0===c?[104.280094,52.28743]:c,p=(0,a.useMemo)((function(){return m}),[null==m?void 0:m[0],null==m?void 0:m[1]]),u=(0,a.useMemo)((function(){return{initial:s,max:d}}),[s,d]),h=(0,a.useRef)(null),g=(0,a.useState)(null),x=g[0],f=g[1],_=(0,a.useState)(!1),v=_[0],b=_[1],y=(0,a.useState)(!0),O=y[0],L=y[1],Z=(0,a.useState)(""),P=Z[0],R=Z[1],Y=(0,a.useRef)(new N.A),B=(0,a.useRef)(new z.A({source:Y.current,style:new E.Ay({image:new S.A({src:C,scale:.6,anchor:[.5,1],declutterMode:"obstacle"})}),zIndex:2})),F=(0,a.useCallback)((function(){if(h.current)try{var n=new k.A({target:h.current,layers:[new I.A({source:new M.A({attributions:[]})}),B.current],view:new w.Ay({center:(0,D.Rb)(p),zoom:u.initial,maxZoom:u.max}),controls:(0,T.N)({zoom:!0,rotate:!1,attribution:!1})}),e=n.getLayers().getArray()[0].getSource(),o=0,t=0;e.on("tileloadstart",(function(){t++})),e.on("tileloaderror",(function(){o<4&&(R("Сервис карт временно недоступен"),b(!0),L(!1),null==r||r())})),e.on("tileloadend",(function(){++o>=4&&t>0&&(n.updateSize(),L(!1),null==r||r())})),f(n),n.updateSize();var a=setTimeout((function(){n.updateSize(),o>0?(L(!1),null==r||r()):(R("Сервис карт временно недоступен"),b(!0),L(!1),null==r||r())}),5e3);return{map:n,loadingTimeout:a}}catch(n){return R("Сервис карт временно недоступен"),b(!0),L(!1),null==r||r(),null}}),[p,u,r]);return(0,a.useEffect)((function(){var n=F();return function(){n&&(clearTimeout(n.loadingTimeout),n.map.setTarget(void 0))}}),[F]),(0,a.useEffect)((function(){if(x&&!v)try{Y.current.clear();var o=n.map((function(n){var o=new j.A({geometry:new A.A((0,D.Rb)(n.coordinates)),properties:n});return o.setStyle(new E.Ay({image:new S.A({src:n.id===e?"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iNDgiIHZpZXdCb3g9IjAgMCAzMiA0OCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgMEM3LjE2NCAwIDAgNy4xNjQgMCAxNkMwIDI0IDE2IDQ4IDE2IDQ4QzE2IDQ4IDMyIDI0IDMyIDE2QzMyIDcuMTY0IDI0LjgzNiAwIDE2IDBaIiBmaWxsPSIjQjg5RjdBIi8+PHBhdGggZD0iTTE2IDBDNy4xNjQgMCAwIDcuMTY0IDAgMTZDMCAyNCAxNiA0OCAxNiA0OEMxNiA0OCAzMiAyNCAzMiAxNkMzMiA3LjE2NCAyNC44MzYgMCAxNiAwWk0xNiAyMkMxMi42ODYgMjIgMTAgMTkuMzE0IDEwIDE2QzEwIDEyLjY4NiAxMi42ODYgMTAgMTYgMTBDMTkuMzE0IDEwIDIyIDEyLjY4NiAyMiAxNkMyMiAxOS4zMTQgMTkuMzE0IDIyIDE2IDIyWiIgZmlsbD0iIzRBNDMzQiIgZmlsbC1vcGFjaXR5PSIxIi8+PGNpcmNsZSBjeD0iMTYiIGN5PSIxNiIgcj0iOCIgZmlsbD0iI0Q0QTk3NyIvPjwvc3ZnPg==":C,scale:n.id===e?.8:.6,anchor:[.5,1],opacity:1})})),o}));if(Y.current.addFeatures(o),e){var t=n.find((function(n){return n.id===e}));t&&x.getView().animate({center:(0,D.Rb)(t.coordinates),zoom:16,duration:800})}else o.length>0&&x.getView().animate({center:(0,D.Rb)(p),zoom:u.initial,duration:800})}catch(n){R("Не удалось отобразить магазины на карте"),b(!0),L(!1),null==r||r()}}),[n,e,x,v,p,u,r]),(0,a.useEffect)((function(){var n=function(){x&&!v&&x.updateSize()};return window.addEventListener("resize",n),function(){window.removeEventListener("resize",n)}}),[x,v]),{mapRef:h,isLoading:O,isError:v,errorMessage:P,map:x}}(e,o,{onMapReady:i,initialZoom:12,maxZoom:19,centerCoordinates:[104.280094,52.28743]}),c=d.mapRef,m=d.isLoading,p=d.isError,u=d.errorMessage;return(0,t.jsxs)("div",{className:"stores-map ".concat(m?"":"stores-map--visible"),style:{height:"100%",width:"100%"},children:[(0,t.jsx)("div",{className:"stores-map__container",ref:c,style:{height:"100%",width:"100%"},children:p&&(0,t.jsxs)("div",{className:"stores-map__error",children:[(0,t.jsx)(P,{}),(0,t.jsx)("p",{children:u||"Сервис карт временно недоступен"})]})}),!l&&r&&(0,t.jsx)(O,{stores:e,selectedStoreId:o,onStoreSelect:r})]})}));var Y=o(3285);const B=(0,a.memo)((function(n){var e,o=n.store,r=(e=null==o?void 0:o.workSchedule,(0,a.useMemo)((function(){if(!e)return{isOpen:!1,statusText:"Информация о часах работы недоступна"};var n=new Date,o=n.getHours(),t=n.getMinutes(),a=["sunday","monday","tuesday","wednesday","thursday","friday","saturday"],r=a[n.getDay()],i=e[r];if(!i)return{isOpen:!1,statusText:"Информация о часах работы недоступна"};if(i.dayOff){for(var s=null,l="",d=1;d<=7;d++){(b=new Date).setDate(n.getDate()+d);var c=a[b.getDay()];if(e[c]&&!e[c].dayOff){s=c,l=(y={monday:"понедельника",tuesday:"вторника",wednesday:"среды",thursday:"четверга",friday:"пятницы",saturday:"субботы",sunday:"воскресенья"})[c];break}}return s&&e[s].open?{isOpen:!1,statusText:"Закрыто до ".concat(e[s].open," ").concat(l)}:{isOpen:!1,statusText:"Закрыто"}}if(!i.open||!i.close)return{isOpen:!1,statusText:"Информация о часах работы недоступна"};var m=60*o+t,p=i.open.split(":").map(Number),u=p[0],h=p[1],g=i.close.split(":").map(Number),x=g[0],f=g[1],_=60*u+h;if(m>=_&&m<60*x+f)return{isOpen:!0,statusText:"Открыто до ".concat(i.close)};if(m<_)return{isOpen:!1,statusText:"Откроется в ".concat(i.open)};s=null;var v=1;for(d=1;d<=7;d++){var b;if((b=new Date).setDate(n.getDate()+d),c=a[b.getDay()],e[c]&&!e[c].dayOff){s=c,v=d;break}}if(s&&e[s].open){var y=["завтра","послезавтра"],k=v<=2?y[v-1]:"через ".concat(v," дня");return{isOpen:!1,statusText:"Закрыто, откроется ".concat(k," в ").concat(e[s].open)}}return{isOpen:!1,statusText:"Закрыто"}}),[e])),i=r.isOpen,s=r.statusText;return o?(0,t.jsx)("div",{className:"store-details",children:(0,t.jsxs)("div",{className:"store-details__layout",children:[(0,t.jsx)("div",{className:"store-details__photo-column",children:(0,t.jsx)(Y.A,{src:o.photo||"",alt:"Магазин ".concat(o.name),fallbackSrc:"/images/store-placeholder.jpg",className:"store-details__photo",containerClassName:"store-details__photo-wrapper",objectFit:"cover"},"store-photo-".concat(o.id))}),(0,t.jsxs)("div",{className:"store-details__info-column",children:[(0,t.jsx)("h3",{className:"store-details__name",children:o.name}),(0,t.jsxs)("div",{className:"store-details__address",children:[(0,t.jsx)("span",{className:"store-details__icon",children:"📍"}),(0,t.jsx)("span",{children:o.address})]}),(0,t.jsxs)("div",{className:"store-details__phone",children:[(0,t.jsx)("span",{className:"store-details__icon",children:"📞"}),(0,t.jsx)("a",{href:"tel:".concat(o.phone),className:"store-details__link",children:o.phone})]}),(0,t.jsxs)("div",{className:"store-details__status ".concat(i?"store-details__status--open":"store-details__status--closed"),children:[(0,t.jsx)("span",{className:"store-details__icon",children:i?"✓":"✕"}),(0,t.jsx)("span",{children:s})]})]})]})}):(0,t.jsx)("div",{className:"store-details store-details--empty",children:(0,t.jsx)("p",{className:"store-details__message",children:"Выберите магазин для просмотра деталей"})})}));var F=o(9170),Q=function(){return Q=Object.assign||function(n){for(var e,o=1,t=arguments.length;o<t;o++)for(var a in e=arguments[o])Object.prototype.hasOwnProperty.call(e,a)&&(n[a]=e[a]);return n},Q.apply(this,arguments)},G={selectedStoreId:void 0,isMapLoading:!0,showMap:!1};function W(n,e){switch(e.type){case"OPEN_MODAL":return Q(Q({},n),{isMapLoading:!0,showMap:!1});case"INIT_MAP":return Q(Q({},n),{showMap:!0});case"MAP_LOADED":return Q(Q({},n),{isMapLoading:!1});case"SELECT_STORE":return Q(Q({},n),{selectedStoreId:e.payload});case"RESET":return G;default:return n}}const H=function(n){var e=n.isOpen,o=n.onClose,r=(0,a.useReducer)(W,G),i=r[0],s=r[1],l=i.selectedStoreId,d=i.isMapLoading,c=i.showMap,m=(0,a.useMemo)((function(){if(l)return F.ZZ.find((function(n){return n.id===l}))}),[l]);(0,a.useEffect)((function(){if(e){s({type:"OPEN_MODAL"});var n=setTimeout((function(){s({type:"INIT_MAP"})}),300);return function(){return clearTimeout(n)}}s({type:"RESET"})}),[e]);var p=(0,a.useCallback)((function(){s({type:"MAP_LOADED"})}),[]),u=(0,a.useCallback)((function(n){s({type:"SELECT_STORE",payload:n})}),[]);return(0,t.jsx)(y,{isOpen:e,onClose:o,title:"Наши магазины",isLoading:!1,children:(0,t.jsx)("div",{className:"stores-modal-content",children:(0,t.jsxs)("div",{className:"stores-modal-layout",children:[(0,t.jsxs)("div",{className:"stores-modal-map-column",children:[(0,t.jsxs)("div",{className:"stores-map-wrapper",style:{height:"100%",width:"100%",position:"relative"},children:[d&&(0,t.jsx)("div",{className:"stores-map__skeleton-container",children:(0,t.jsx)(b.A,{height:"100%",width:"100%"})}),c&&(0,t.jsx)("div",{style:{opacity:d?0:1,transition:"opacity 0.3s ease-in-out",height:"100%",width:"100%",position:"absolute",top:0,left:0},children:(0,t.jsx)(R,{stores:F.ZZ,selectedStoreId:l,onStoreSelect:u,onMapReady:p,hideStoresList:!0})})]}),(0,t.jsx)("div",{className:"stores-modal-details-column",children:(0,t.jsx)(B,{store:m})})]}),(0,t.jsxs)("div",{className:"stores-modal-list-column",children:[(0,t.jsx)("h3",{className:"stores-section-title",children:"Выберите магазин:"}),(0,t.jsx)(O,{stores:F.ZZ,selectedStoreId:l,onStoreSelect:u})]})]})})})}}}]);