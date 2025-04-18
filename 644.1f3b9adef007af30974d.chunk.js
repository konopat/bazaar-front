"use strict";(self.webpackChunkbazaar_front=self.webpackChunkbazaar_front||[]).push([[644],{2114:(n,e,a)=>{a.d(e,{A:()=>b});var t=a(4848),o=a(6540),i=a(961),r=a(5072),s=a.n(r),l=a(7825),c=a.n(l),d=a(7659),m=a.n(d),u=a(5056),h=a.n(u),f=a(540),p=a.n(f),_=a(1113),y=a.n(_),g=a(3120),v={};v.styleTagTransform=y(),v.setAttributes=h(),v.insert=m().bind(null,"head"),v.domAPI=c(),v.insertStyleElement=p();s()(g.A,v);g.A&&g.A.locals&&g.A.locals;var x=a(6905);"undefined"!=typeof document&&document.documentElement.style.setProperty("--scrollbar-width","".concat(function(){var n,e=document.createElement("div");e.style.visibility="hidden",e.style.overflow="scroll",document.body.appendChild(e);var a=document.createElement("div");e.appendChild(a);var t=e.offsetWidth-a.offsetWidth;return null===(n=e.parentNode)||void 0===n||n.removeChild(e),t}(),"px"));const b=function(n){var e=n.isOpen,a=n.onClose,r=n.children,s=n.title,l=n.isLoading,c=void 0!==l&&l,d=n.skeletonConfig,m=void 0===d?{count:3,height:"2rem",spacing:"1rem"}:d,u=n.className,h=void 0===u?"":u,f=n.id,p=void 0===f?"modal":f,_=(0,o.useRef)(null),y=(0,o.useState)(!1),g=y[0],v=y[1],b=(0,o.useState)(!1),k=b[0],j=b[1],N=(0,o.useState)(!1),w=N[0],z=N[1],A=document.body.classList.contains("theme-dark"),E="".concat(p,"-title"),S="".concat(p,"-content"),C=(0,o.useCallback)((function(){v(!0),j(!1),setTimeout((function(){v(!1),a()}),300)}),[a]);(0,o.useEffect)((function(){if(e){var n=setTimeout((function(){if(j(!0),!w&&_.current){var n=_.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');n.length>0?n[0].focus():_.current.focus(),z(!0)}}),150);return function(){return clearTimeout(n)}}z(!1)}),[e,w]),(0,o.useEffect)((function(){var n=function(n){"Escape"===n.key&&C()},a=document.activeElement,t=window.scrollY;return e&&(document.addEventListener("keydown",n),document.body.style.position="fixed",document.body.style.top="-".concat(t,"px"),document.body.style.width="100%",document.body.style.overflow="hidden"),function(){document.removeEventListener("keydown",n),"fixed"===document.body.style.position&&(document.body.style.position="",document.body.style.top="",document.body.style.width="",document.body.style.overflow="",window.scrollTo(0,t)),!e&&a&&setTimeout((function(){a.focus()}),0)}}),[e,C]);var O=(0,o.useMemo)((function(){if(!c)return null;for(var n=m.count,e=void 0===n?3:n,a=m.height,o=void 0===a?"2rem":a,i=m.spacing,r=void 0===i?"1rem":i,s=[],l=0;l<e;l++)s.push((0,t.jsx)("div",{style:{marginBlockEnd:"number"==typeof r?"".concat(r,"px"):r},children:(0,t.jsx)(x.A,{height:o})},l));return s}),[c,m]);if(!e&&!g)return null;var D="modal ".concat(A?"theme-dark":""," ").concat(h),F=(0,t.jsx)("section",{className:"modal-overlay ".concat(g?"modal-overlay--closing":""),onClick:function(n){n.target===n.currentTarget&&C()},role:"dialog","aria-modal":"true","aria-labelledby":s?E:void 0,"aria-describedby":S,children:(0,t.jsxs)("div",{className:"".concat(D," ").concat(g?"modal--closing":""),ref:_,tabIndex:-1,onKeyDown:function(n){if("Tab"===n.key&&_.current){var e=_.current.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');if(0===e.length)return;var a=e[0],t=e[e.length-1];n.shiftKey&&document.activeElement===a?(n.preventDefault(),t.focus()):n.shiftKey||document.activeElement!==t||(n.preventDefault(),a.focus())}},id:p,children:[(0,t.jsxs)("header",{className:"modal__header",children:[s&&(0,t.jsx)("h2",{className:"modal__title fashion-heading",id:E,children:s}),(0,t.jsx)("button",{className:"modal__close",onClick:C,"aria-label":"Закрыть",type:"button",children:(0,t.jsx)("svg",{width:"24",height:"24",viewBox:"0 0 24 24","aria-hidden":"true",children:(0,t.jsx)("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})})})]}),(0,t.jsx)("div",{className:"modal__content ".concat(k?"modal__content--visible":""),id:S,children:c?(0,t.jsx)("div",{className:"modal__skeleton-container",children:O}):r})]})});return(0,i.createPortal)(F,document.body)}},3120:(n,e,a)=>{a.d(e,{A:()=>s});var t=a(1601),o=a.n(t),i=a(6314),r=a.n(i)()(o());r.push([n.id,'.modal-overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 1000;\n  animation: modalFadeIn 0.3s ease-in-out;\n  padding: 20px;\n}\n\n.modal-overlay--closing {\n  animation: modalFadeOut 0.3s ease-in-out forwards;\n}\n\n.modal {\n  background: var(--color-background);\n  border-radius: var(--border-radius);\n  padding: 24px;\n  width: 90vw;\n  max-width: 900px;\n  max-height: 90vh;\n  overflow-y: auto;\n  position: relative;\n  box-shadow: var(--shadow-md);\n  animation: modalSlideIn 0.3s ease-in-out;\n  display: flex;\n  flex-direction: column;\n}\n\n:root[data-theme="dark"] .modal, \nhtml[data-theme="dark"] .modal, \nbody[data-theme="dark"] .modal {\n  background: #121212;\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);\n}\n\n.modal--closing {\n  animation: modalSlideOut 0.3s ease-in-out forwards;\n}\n\n.modal__header {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 24px;\n  flex-shrink: 0;\n}\n\n.modal__title {\n  font-family: var(--font-family-secondary);\n  font-size: var(--font-size-2xl);\n  color: var(--color-text);\n  margin: 0;\n  position: relative;\n}\n\n:root[data-theme="dark"] .modal__title, \nhtml[data-theme="dark"] .modal__title, \nbody[data-theme="dark"] .modal__title {\n  color: #F4E8DD;\n}\n\n.modal__title::after {\n  content: \'\';\n  position: absolute;\n  bottom: -8px;\n  left: 0;\n  width: 50px;\n  height: 2px;\n  background: var(--gradient-primary);\n}\n\n.modal__close {\n  background: none;\n  border: none;\n  padding: 12px;\n  margin: -12px;\n  cursor: pointer;\n  color: var(--color-text);\n  transition: color var(--transition-normal);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n\n:root[data-theme="dark"] .modal__close, \nhtml[data-theme="dark"] .modal__close, \nbody[data-theme="dark"] .modal__close {\n  color: #F4E8DD;\n}\n\n.modal__close:hover {\n  color: var(--color-primary);\n}\n\n.modal__close svg {\n  fill: currentColor;\n}\n\n.modal__content {\n  color: var(--color-text);\n  flex-grow: 1;\n  display: flex;\n  flex-direction: column;\n  min-height: 200px;\n  opacity: 0;\n  transition: opacity 0.3s ease-in-out;\n  position: relative;\n}\n\n:root[data-theme="dark"] .modal__content, \nhtml[data-theme="dark"] .modal__content, \nbody[data-theme="dark"] .modal__content {\n  color: #F4E8DD;\n}\n\n.modal__content--visible {\n  opacity: 1;\n}\n\n.modal__skeleton-container {\n  display: flex;\n  flex-direction: column;\n  width: 100%;\n  height: 100%;\n  min-height: 200px;\n}\n\n.modal__skeleton-container .skeleton-loader {\n  border-radius: var(--border-radius);\n}\n\n:root[data-theme="dark"] .modal__skeleton-container .skeleton-loader, \nhtml[data-theme="dark"] .modal__skeleton-container .skeleton-loader, \nbody[data-theme="dark"] .modal__skeleton-container .skeleton-loader {\n  background: linear-gradient(\n    90deg,\n    rgba(60, 60, 60, 1) 0%,\n    rgba(80, 80, 80, 1) 50%,\n    rgba(60, 60, 60, 1) 100%\n  );\n  background-size: 200% 100%;\n  animation: skeleton-loading 1.5s ease infinite;\n}\n\n@keyframes modalFadeIn {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n\n@keyframes modalFadeOut {\n  from {\n    opacity: 1;\n  }\n  to {\n    opacity: 0;\n  }\n}\n\n@keyframes modalSlideIn {\n  from {\n    transform: translateY(-20px);\n    opacity: 0;\n  }\n  to {\n    transform: translateY(0);\n    opacity: 1;\n  }\n}\n\n@keyframes modalSlideOut {\n  from {\n    transform: translateY(0);\n    opacity: 1;\n  }\n  to {\n    transform: translateY(20px);\n    opacity: 0;\n  }\n}\n\n@media (max-width: 768px) {\n  .modal {\n    width: 100%;\n    height: 100%;\n    max-width: 100%;\n    max-height: 100%;\n    border-radius: 0;\n  }\n}\n\n/* Дополнительные стили для модального окна, когда скролл страницы заблокирован */\nbody[style*="position: fixed"] {\n  /* Компенсируем ширину полосы прокрутки */\n  padding-right: var(--scrollbar-width, 15px);\n}\n\n/* Устанавливаем переменную для ширины скроллбара при загрузке страницы */\n:root {\n  --scrollbar-width: 0px;\n} ',""]);const s=r},3285:(n,e,a)=>{a.d(e,{A:()=>b});var t=a(4848),o=a(6540),i=a(6905),r=a(5072),s=a.n(r),l=a(7825),c=a.n(l),d=a(7659),m=a.n(d),u=a(5056),h=a.n(u),f=a(540),p=a.n(f),_=a(1113),y=a.n(_),g=a(3474),v={};v.styleTagTransform=y(),v.setAttributes=h(),v.insert=m().bind(null,"head"),v.domAPI=c(),v.insertStyleElement=p();s()(g.A,v);g.A&&g.A.locals&&g.A.locals;var x=function(){return x=Object.assign||function(n){for(var e,a=1,t=arguments.length;a<t;a++)for(var o in e=arguments[a])Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o]);return n},x.apply(this,arguments)};const b=function(n){var e=n.src,a=n.alt,r=n.fallbackSrc,s=void 0===r?"/images/placeholder.png":r,l=n.className,c=void 0===l?"":l,d=n.containerClassName,m=void 0===d?"":d,u=n.objectFit,h=void 0===u?"contain":u,f=n.width,p=void 0===f?"100%":f,_=n.height,y=void 0===_?"100%":_,g=n.aspectRatio,v=n.caption,b=(0,o.useState)(!0),k=b[0],j=b[1],N=(0,o.useState)(!1),w=N[0],z=N[1],A=(0,o.useRef)(null);(0,o.useEffect)((function(){j(!0),z(!1),A.current&&A.current.complete&&j(!1)}),[e]);var E={margin:0,width:p,height:y},S=g?x(x({},E),{position:"relative",height:0,paddingBlockEnd:"".concat(1/g*100,"%"),paddingBottom:"".concat(1/g*100,"%")}):E,C=g?{objectFit:h,position:"absolute",insetBlockStart:0,insetBlockEnd:0,insetInlineStart:0,insetInlineEnd:0,inset:0,width:"100%",height:"100%"}:{objectFit:h,width:"100%",height:"100%"},O=g?{position:"absolute",insetBlockStart:0,insetBlockEnd:0,insetInlineStart:0,insetInlineEnd:0,inset:0,width:"100%",height:"100%"}:{width:"100%",height:"100%"};return(0,t.jsxs)("figure",{className:"lazy-image__container ".concat(m),style:S,children:[k&&(0,t.jsx)("span",{className:"lazy-image__skeleton",style:O,role:"presentation",children:(0,t.jsx)(i.A,{width:"100%",height:"100%",className:"lazy-image__skeleton-animation"})}),(0,t.jsx)("img",{ref:A,className:"lazy-image__img ".concat(c," ").concat(k?"lazy-image__img--hidden":""),src:w?s:e,alt:a,onLoad:function(){j(!1)},onError:function(){j(!1),z(!0)},style:C,loading:"lazy"}),v&&(0,t.jsx)("figcaption",{className:"lazy-image__caption",children:v})]})}},3474:(n,e,a)=>{a.d(e,{A:()=>s});var t=a(1601),o=a.n(t),i=a(6314),r=a.n(i)()(o());r.push([n.id,"/* Стили для компонента LazyImage */\n\n.lazy-image__container {\n  position: relative;\n  overflow: hidden;\n  display: block;\n  background-color: var(--color-skeleton-start);\n  border-radius: var(--border-radius, 8px);\n}\n\n.lazy-image__skeleton {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  z-index: 1;\n  border-radius: inherit;\n}\n\n.lazy-image__skeleton-animation {\n  background: linear-gradient(\n    90deg,\n    var(--color-skeleton-start),\n    var(--color-skeleton-end),\n    var(--color-skeleton-start)\n  );\n  background-size: 200% 100%;\n  animation: skeleton-loading 1.5s infinite;\n  height: 100%;\n  width: 100%;\n}\n\n.lazy-image__img {\n  display: block;\n  width: 100%;\n  height: 100%;\n  transition: opacity 0.2s ease-in-out;\n  position: relative;\n  z-index: 2;\n}\n\n.lazy-image__img--hidden {\n  opacity: 0;\n}\n\n@keyframes skeleton-loading {\n  0% {\n    background-position: -100% 0;\n  }\n  100% {\n    background-position: 100% 0;\n  }\n}\n\n/* Специальные стили для темной темы */\n.theme-dark .lazy-image__container {\n  background-color: var(--color-background-dark);\n}\n\n.theme-dark .lazy-image__skeleton-animation {\n  background: linear-gradient(\n    90deg,\n    var(--color-skeleton-start-dark),\n    var(--color-skeleton-end-dark),\n    var(--color-skeleton-start-dark)\n  );\n  background-size: 200% 100%;\n  animation: skeleton-loading 1.5s infinite;\n}\n\n@keyframes skeleton-loading-dark {\n  0% {\n    background-position: -200% 0;\n  }\n  100% {\n    background-position: 200% 0;\n  }\n}\n\n/* Варианты соотношения сторон */\n.lazy-image-container--square {\n  aspect-ratio: 1/1;\n}\n\n.lazy-image-container--4x3 {\n  aspect-ratio: 4/3;\n}\n\n.lazy-image-container--16x9 {\n  aspect-ratio: 16/9;\n}\n\n.lazy-image-container--3x4 {\n  aspect-ratio: 3/4;\n}\n\n.lazy-image-container--2x3 {\n  aspect-ratio: 2/3;\n}\n\n/* Различные object-fit преднастройки */\n.lazy-image--cover {\n  object-fit: cover;\n}\n\n.lazy-image--contain {\n  object-fit: contain;\n}\n\n.lazy-image--fill {\n  object-fit: fill;\n}\n\n/* Модификаторы для эффектов при наведении */\n.lazy-image--zoom:hover {\n  transform: scale(1.1);\n}\n\n.lazy-image--no-zoom:hover {\n  transform: none;\n}\n\n/* Улучшение производительности с помощью hardware acceleration */\n.lazy-image__img, \n.lazy-image__skeleton {\n  transform: translateZ(0);\n  backface-visibility: hidden;\n  will-change: opacity, transform;\n}\n\n/* Оптимизация для браузеров на базе WebKit */\n@supports (-webkit-overflow-scrolling: touch) {\n  .lazy-image__skeleton-animation {\n    /* Улучшение производительности на iOS */\n    -webkit-transform: translateZ(0);\n  }\n} ",""]);const s=r},8469:(n,e,a)=>{a.r(e),a.d(e,{default:()=>d});var t=a(4848),o=a(6540),i=a(9170),r=a(9153),s=a(7735),l=a(3285),c=function(){return c=Object.assign||function(n){for(var e,a=1,t=arguments.length;a<t;a++)for(var o in e=arguments[a])Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o]);return n},c.apply(this,arguments)};const d=function(){var n=(0,o.useState)({name:"",email:"",phone:"",message:""}),e=n[0],a=n[1],d=(0,o.useState)(!1),m=d[0],u=d[1],h=(0,o.useState)(!1),f=h[0],p=h[1],_=function(n){var e=n.target,t=e.name,o=e.value;a((function(n){var e;return c(c({},n),((e={})[t]=o,e))}))},y=function(n){var e=(new Date).getDay(),a=["monday","tuesday","wednesday","thursday","friday","saturday","sunday"][0===e?6:e-1],t=n.workSchedule[a];return t.dayOff?"Выходной":"".concat(t.open," - ").concat(t.close)};return(0,t.jsxs)("div",{className:"contacts",children:[(0,t.jsxs)("div",{className:"container",children:[(0,t.jsx)("h1",{className:"section-title section-title--centered",children:"Контакты"}),(0,t.jsxs)("section",{className:"contacts__section",children:[(0,t.jsx)("h2",{className:"section-title",children:"Наши магазины"}),(0,t.jsx)("div",{className:"contacts__stores",children:i.ZZ.map((function(n){return(0,t.jsxs)("div",{className:"store-card",children:[(0,t.jsx)("h3",{className:"store-card__name",children:n.name}),(0,t.jsxs)("div",{className:"store-card__info",children:[(0,t.jsxs)("div",{className:"store-card__row",children:[(0,t.jsx)("span",{className:"store-card__icon",children:(0,t.jsx)(s.A,{name:"location",size:16,color:"currentColor"})}),(0,t.jsx)("span",{className:"store-card__address",children:n.address})]}),(0,t.jsxs)("div",{className:"store-card__row",children:[(0,t.jsx)("span",{className:"store-card__icon",children:(0,t.jsx)(s.A,{name:"clock",size:16,color:"currentColor"})}),(0,t.jsxs)("span",{className:"store-card__hours",children:[y(n),(0,t.jsx)("small",{className:"store-card__today",children:"Сегодня"})]})]}),(0,t.jsxs)("div",{className:"store-card__row",children:[(0,t.jsx)("span",{className:"store-card__icon",children:(0,t.jsx)(s.A,{name:"phone",size:16,color:"currentColor"})}),(0,t.jsx)("a",{href:"tel:".concat(n.phone),className:"store-card__phone",children:n.phone})]})]}),(0,t.jsx)("div",{className:"store-card__photo",children:(0,t.jsx)(l.A,{src:n.photo,alt:n.name,objectFit:"cover"})})]},n.id)}))}),(0,t.jsx)("div",{className:"contacts__map-button-container",children:(0,t.jsx)("button",{className:"button button--primary",onClick:function(){return u(!0)},children:"Посмотреть на карте"})})]}),(0,t.jsx)("div",{className:"divider-accent"}),(0,t.jsxs)("section",{className:"contacts__section",children:[(0,t.jsx)("h2",{className:"section-title",children:"Напишите нам"}),f?(0,t.jsxs)("div",{className:"contacts__form-success",children:[(0,t.jsx)("div",{className:"contacts__form-success-icon",children:(0,t.jsx)(s.A,{name:"check",size:20,color:"currentColor"})}),(0,t.jsx)("h3",{className:"contacts__form-success-title",children:"Сообщение отправлено"}),(0,t.jsx)("p",{className:"contacts__form-success-text",children:"Спасибо за ваше сообщение! Наши менеджеры свяжутся с вами в ближайшее время."})]}):(0,t.jsxs)("form",{className:"contacts__form",onSubmit:function(n){n.preventDefault(),console.log("Form submitted:",e),p(!0),setTimeout((function(){a({name:"",email:"",phone:"",message:""}),p(!1)}),3e3)},children:[(0,t.jsx)("div",{className:"contacts__form-grid",children:i.CD.map((function(n){return(0,t.jsxs)("div",{className:"contacts__form-field ".concat("textarea"===n.type?"contacts__form-field--full":""),children:[(0,t.jsx)("label",{htmlFor:n.id,className:"contacts__form-label",children:n.label}),"textarea"===n.type?(0,t.jsx)("textarea",{id:n.id,name:n.name,value:e[n.name],onChange:_,className:"contacts__form-textarea",placeholder:n.placeholder,required:n.required}):(0,t.jsx)("input",{type:n.type,id:n.id,name:n.name,value:e[n.name],onChange:_,className:"contacts__form-input",placeholder:n.placeholder,required:n.required})]},n.id)}))}),(0,t.jsx)("button",{type:"submit",className:"button button--primary contacts__form-submit",children:"Отправить сообщение"})]})]}),(0,t.jsx)("div",{className:"divider-accent"}),(0,t.jsxs)("section",{className:"contacts__section",children:[(0,t.jsx)("h2",{className:"section-title",children:"Мы в социальных сетях"}),(0,t.jsx)("div",{className:"contacts__social",children:i._u.map((function(n){return(0,t.jsxs)("a",{href:n.url,className:"social-link",children:[(0,t.jsx)("span",{className:"social-link__icon",children:(0,t.jsx)(s.A,{name:n.name,color:"currentColor",size:18})}),(0,t.jsx)("span",{className:"social-link__name",children:n.label})]},n.name)}))}),(0,t.jsxs)("div",{className:"contacts__main-phone",children:[(0,t.jsx)("div",{className:"contacts__phone-label",children:"Основной телефон для связи:"}),(0,t.jsx)("a",{href:"tel:".concat(i.NA),className:"contacts__phone",children:i.NA})]})]})]}),(0,t.jsx)(r.A,{isOpen:m,onClose:function(){return u(!1)}})]})}}}]);