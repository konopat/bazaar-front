"use strict";(self.webpackChunkbazaar_front=self.webpackChunkbazaar_front||[]).push([[145],{7145:(e,a,c)=>{c.r(a),c.d(a,{default:()=>r});var i=c(4848),s=c(6540),n=function(){return n=Object.assign||function(e){for(var a,c=1,i=arguments.length;c<i;c++)for(var s in a=arguments[c])Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s]);return e},n.apply(this,arguments)},l=[{id:1,icon:"🌱",title:"Профессиональный рост",description:"Обучение у ведущих флористов, участие в мастер-классах и конкурсах"},{id:2,icon:"💰",title:"Достойная оплата",description:"Конкурентная зарплата, премии за успехи и продажи"},{id:3,icon:"🤝",title:"Дружный коллектив",description:"Поддерживающая атмосфера и совместные мероприятия"},{id:4,icon:"📅",title:"Гибкий график",description:"Возможность выбора удобного графика работы"}],t=[{id:1,title:"Флорист",location:'ТЦ "Карамель"',type:"Полный день",salary:"от 45 000 ₽",description:["Создание букетов и композиций","Консультирование клиентов","Работа с кассой","Уход за цветами"],requirements:["Опыт работы флористом от 1 года","Знание основ флористики","Творческий подход","Клиентоориентированность"]},{id:2,title:"Помощник флориста",location:'ТЦ "Сильвер Молл"',type:"Сменный график",salary:"от 35 000 ₽",description:["Помощь в создании букетов","Уход за растениями","Поддержание порядка","Работа с клиентами"],requirements:["Желание учиться флористике","Ответственность","Аккуратность","Позитивный настрой"]},{id:3,title:"Курьер",location:"Все магазины",type:"Гибкий график",salary:"от 40 000 ₽",description:["Доставка букетов клиентам","Работа с документами","Прием оплаты","Фотоотчет о доставке"],requirements:["Наличие автомобиля","Опыт вождения от 2 лет","Знание города","Пунктуальность"]}];const r=function(){var e=(0,s.useState)(null),a=e[0],c=e[1],r=(0,s.useState)({name:"",phone:"",email:"",resume:null,cover:""}),o=r[0],d=r[1];return(0,i.jsx)("div",{className:"vacancies",children:(0,i.jsxs)("div",{className:"container",children:[(0,i.jsxs)("section",{className:"vacancies__hero",children:[(0,i.jsx)("h1",{className:"vacancies__title",children:"Вакансии"}),(0,i.jsx)("p",{className:"vacancies__subtitle",children:"Присоединяйтесь к команде BAZAAR и станьте частью успешной компании"})]}),(0,i.jsxs)("section",{className:"vacancies__benefits",children:[(0,i.jsx)("h2",{className:"vacancies__section-title",children:"Почему стоит работать с нами"}),(0,i.jsx)("div",{className:"benefits__grid",children:l.map((function(e){return(0,i.jsxs)("div",{className:"benefit-card",children:[(0,i.jsx)("div",{className:"benefit-card__icon",children:e.icon}),(0,i.jsx)("h3",{className:"benefit-card__title",children:e.title}),(0,i.jsx)("p",{className:"benefit-card__description",children:e.description})]},e.id)}))})]}),(0,i.jsxs)("section",{className:"vacancies__list",children:[(0,i.jsx)("h2",{className:"vacancies__section-title",children:"Открытые вакансии"}),(0,i.jsx)("div",{className:"vacancies__grid",children:t.map((function(e){return(0,i.jsxs)("div",{className:"vacancy-card ".concat((null==a?void 0:a.id)===e.id?"vacancy-card--active":""),onClick:function(){return c(e)},children:[(0,i.jsxs)("div",{className:"vacancy-card__header",children:[(0,i.jsx)("h3",{className:"vacancy-card__title",children:e.title}),(0,i.jsx)("span",{className:"vacancy-card__salary",children:e.salary})]}),(0,i.jsxs)("div",{className:"vacancy-card__meta",children:[(0,i.jsxs)("span",{className:"vacancy-card__location",children:[(0,i.jsx)("span",{className:"vacancy-card__icon",children:"📍"}),e.location]}),(0,i.jsxs)("span",{className:"vacancy-card__type",children:[(0,i.jsx)("span",{className:"vacancy-card__icon",children:"🕒"}),e.type]})]}),(0,i.jsxs)("div",{className:"vacancy-card__content",children:[(0,i.jsxs)("div",{className:"vacancy-card__section",children:[(0,i.jsx)("h4",{className:"vacancy-card__section-title",children:"Обязанности:"}),(0,i.jsx)("ul",{className:"vacancy-card__list",children:e.description.map((function(e,a){return(0,i.jsx)("li",{children:e},a)}))})]}),(0,i.jsxs)("div",{className:"vacancy-card__section",children:[(0,i.jsx)("h4",{className:"vacancy-card__section-title",children:"Требования:"}),(0,i.jsx)("ul",{className:"vacancy-card__list",children:e.requirements.map((function(e,a){return(0,i.jsx)("li",{children:e},a)}))})]})]})]},e.id)}))})]}),a&&(0,i.jsxs)("section",{className:"vacancies__form",children:[(0,i.jsxs)("h2",{className:"vacancies__section-title",children:["Откликнуться на вакансию ",a.title]}),(0,i.jsxs)("form",{className:"application-form",onSubmit:function(e){e.preventDefault(),console.log("Form submitted:",o)},children:[(0,i.jsxs)("div",{className:"application-form__grid",children:[(0,i.jsxs)("div",{className:"application-form__field",children:[(0,i.jsx)("label",{htmlFor:"name",className:"application-form__label",children:"Ваше имя"}),(0,i.jsx)("input",{type:"text",id:"name",name:"name",value:o.name,onChange:function(e){return d(n(n({},o),{name:e.target.value}))},className:"application-form__input",required:!0})]}),(0,i.jsxs)("div",{className:"application-form__field",children:[(0,i.jsx)("label",{htmlFor:"phone",className:"application-form__label",children:"Телефон"}),(0,i.jsx)("input",{type:"tel",id:"phone",name:"phone",value:o.phone,onChange:function(e){return d(n(n({},o),{phone:e.target.value}))},className:"application-form__input",required:!0})]}),(0,i.jsxs)("div",{className:"application-form__field",children:[(0,i.jsx)("label",{htmlFor:"email",className:"application-form__label",children:"Email"}),(0,i.jsx)("input",{type:"email",id:"email",name:"email",value:o.email,onChange:function(e){return d(n(n({},o),{email:e.target.value}))},className:"application-form__input",required:!0})]}),(0,i.jsxs)("div",{className:"application-form__field application-form__field--full",children:[(0,i.jsx)("label",{htmlFor:"resume",className:"application-form__label",children:"Резюме"}),(0,i.jsx)("input",{type:"file",id:"resume",name:"resume",onChange:function(e){e.target.files&&e.target.files[0]&&d((function(a){return n(n({},a),{resume:e.target.files[0]})}))},className:"application-form__file",accept:".pdf,.doc,.docx",required:!0}),(0,i.jsx)("span",{className:"application-form__file-hint",children:"Поддерживаемые форматы: PDF, DOC, DOCX"})]}),(0,i.jsxs)("div",{className:"application-form__field application-form__field--full",children:[(0,i.jsx)("label",{htmlFor:"cover",className:"application-form__label",children:"Сопроводительное письмо"}),(0,i.jsx)("textarea",{id:"cover",name:"cover",value:o.cover,onChange:function(e){return d(n(n({},o),{cover:e.target.value}))},className:"application-form__textarea",rows:5,required:!0})]})]}),(0,i.jsx)("button",{type:"submit",className:"button button--primary application-form__submit",children:"Отправить заявку"})]})]}),(0,i.jsxs)("section",{className:"vacancies__culture",children:[(0,i.jsx)("h2",{className:"vacancies__section-title",children:"Наша корпоративная культура"}),(0,i.jsxs)("div",{className:"culture__content",children:[(0,i.jsxs)("div",{className:"culture__text",children:[(0,i.jsx)("p",{children:"В BAZAAR мы создаем не просто букеты – мы создаем настроение и дарим эмоции. Наша команда – это увлеченные своим делом профессионалы, которые любят свою работу и постоянно развиваются."}),(0,i.jsx)("p",{children:"Мы поддерживаем инициативу, ценим креативность и стремимся создать комфортную атмосферу для каждого сотрудника. У нас регулярно проводятся корпоративные мероприятия, мастер-классы и тренинги."})]}),(0,i.jsx)("div",{className:"culture__image",children:(0,i.jsx)("img",{src:"/images/team/culture.jpg",alt:"Корпоративная культура"})})]})]})]})})}}}]);