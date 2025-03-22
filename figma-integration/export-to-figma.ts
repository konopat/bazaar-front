/// <reference types="@figma/plugin-typings" />

interface MenuItem {
  title: string;
  description: string;
  price: string;
  cardPrice: string;
  buttonText: string;
}

interface CategoryItem {
  title: string;
  items: MenuItem[];
}

interface ComponentProps {
  // Header props
  logo?: string;
  menu?: {
    main: string[];
  };
  phone?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  socialLinks?: string[];
  
  // Special offers props
  items?: MenuItem[];
  masterclass?: {
    title: string;
    buttonText: string;
    price: string;
  };
  
  // Color filter props
  colors?: string[];
  
  // Price categories props
  categories?: CategoryItem[];
  
  // Footer props
  contacts?: {
    phone: string;
    social?: string[];
  };
  addresses?: string[];
}

interface ComponentData {
  name: string;
  props: ComponentProps;
}

const mainPageComponents: ComponentData[] = [
  {
    name: "Header",
    props: {
      logo: "Bazaar",
      menu: {
        main: ["ГЛАВНАЯ", "КАТАЛОГ", "ОПЛАТА", "ДОСТАВКА", "БЛОГ", "ВАКАНСИИ", "О НАС", "КОНТАКТЫ"]
      },
      phone: "+7 (999) 999-99-99",
      title: "Букеты с доставкой",
      subtitle: "Создаём для тех, кто ценит свежесть и изящество",
      buttonText: "Заказать букет",
      socialLinks: ["Instagram", "VK", "Facebook"]
    }
  },
  {
    name: "SpecialOffers",
    props: {
      title: "Спецпредложения",
      items: [
        {
          title: "Экспресс букет",
          description: "Специальный сборный букет от 2х часов. В наличии",
          price: "1 740 ₽",
          cardPrice: "1 500 ₽",
          buttonText: "В корзину"
        },
        {
          title: "Букет для учителя",
          description: "Большой букет, собранный специально к 1 сентября",
          price: "2 740 ₽",
          cardPrice: "2 500 ₽",
          buttonText: "В корзину"
        },
        {
          title: "Миллион алых роз",
          description: "Монобукет из роз. Сосчитаете сколько их на самом деле?",
          price: "3 740 ₽",
          cardPrice: "3 500 ₽",
          buttonText: "В корзину"
        }
      ],
      masterclass: {
        title: "Мастер-класс для начинающих флористов",
        buttonText: "Хочу стать флористом",
        price: "БЕСПЛАТНО"
      }
    }
  },
  {
    name: "ColorFilter",
    props: {
      title: "По цвету",
      subtitle: "Выберите цветовую гамму:",
      colors: ["#FF5733", "#333333", "#666666", "#999999"]
    }
  },
  {
    name: "PriceCategories",
    props: {
      categories: [
        {
          title: "До 3 000 руб.",
          items: [
            {
              title: "Название букета",
              description: "Краткое, но емкое описание, которое мотивирует.",
              price: "2 740 ₽",
              cardPrice: "2 500 ₽",
              buttonText: "В корзину"
            },
            {
              title: "Название букета",
              description: "Краткое, но емкое описание, которое мотивирует.",
              price: "2 740 ₽",
              cardPrice: "2 500 ₽",
              buttonText: "В корзину"
            },
            {
              title: "Название букета",
              description: "Краткое, но емкое описание, которое мотивирует.",
              price: "2 740 ₽",
              cardPrice: "2 500 ₽",
              buttonText: "В корзину"
            }
          ]
        },
        {
          title: "До 5 000 руб.",
          items: [
            {
              title: "Название букета",
              description: "Краткое, но емкое описание, которое мотивирует.",
              price: "4 740 ₽",
              cardPrice: "4 500 ₽",
              buttonText: "В корзину"
            },
            {
              title: "Название букета",
              description: "Краткое, но емкое описание, которое мотивирует.",
              price: "4 740 ₽",
              cardPrice: "4 500 ₽",
              buttonText: "В корзину"
            },
            {
              title: "Название букета",
              description: "Краткое, но емкое описание, которое мотивирует.",
              price: "4 740 ₽",
              cardPrice: "4 500 ₽",
              buttonText: "В корзину"
            }
          ]
        },
        {
          title: "До 10 000 руб.",
          items: [
            {
              title: "Название букета",
              description: "Краткое, но емкое описание, которое мотивирует.",
              price: "9 740 ₽",
              cardPrice: "9 500 ₽",
              buttonText: "В корзину"
            },
            {
              title: "Название букета",
              description: "Краткое, но емкое описание, которое мотивирует.",
              price: "9 740 ₽",
              cardPrice: "9 500 ₽",
              buttonText: "В корзину"
            },
            {
              title: "Название букета",
              description: "Краткое, но емкое описание, которое мотивирует.",
              price: "9 740 ₽",
              cardPrice: "9 500 ₽",
              buttonText: "В корзину"
            }
          ]
        }
      ]
    }
  },
  {
    name: "Footer",
    props: {
      logo: "Bazaar",
      menu: {
        main: ["О компании", "Доставка", "Оплата", "Контакты", "Блог"]
      },
      phone: "+7 (999) 999-99-99",
      addresses: [
        "ул. Ленина, 1",
        "ул. Пушкина, 10",
        "пр. Мира, 25"
      ]
    }
  }
];

figma.showUI(__html__, { width: 800, height: 600 });

figma.ui.onmessage = async (msg) => {
  try {
    if (msg.type === 'export-to-figma') {
      console.log('Начало экспорта...');
      
      // Загружаем необходимые шрифты
      console.log('Загрузка шрифтов...');
      await figma.loadFontAsync({ family: "Inter", style: "Regular" });
      await figma.loadFontAsync({ family: "Inter", style: "Medium" });
      await figma.loadFontAsync({ family: "Inter", style: "Bold" });
      console.log('Шрифты загружены');
      
      // Создаем фрейм для главной страницы
      const pageFrame = figma.createFrame();
      pageFrame.name = "Главная страница";
      pageFrame.resize(1440, 2000);
      pageFrame.x = 0;
      pageFrame.y = 0;
      pageFrame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
      
      console.log('Создан основной фрейм страницы');
      
      // Создаем компоненты
      let currentY = 0;
      
      for (const component of mainPageComponents) {
        console.log(`Создание секции: ${component.name}`);
        
        const frame = figma.createFrame();
        frame.name = component.name;
        frame.resize(1440, 600);
        frame.x = 0;
        frame.y = currentY;
        frame.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
        
        switch (component.name) {
          case "Header":
            const headerFrame = figma.createFrame();
            headerFrame.name = "Header";
            headerFrame.resize(1440, 200);
            headerFrame.x = 0;
            headerFrame.y = 0;
            
            // Добавляем логотип
            const headerLogoText = figma.createText();
            headerLogoText.fontName = { family: "Inter", style: "Bold" };
            headerLogoText.characters = component.props.logo || "BAZAAR";
            headerLogoText.fontSize = 24;
            headerLogoText.x = 40;
            headerLogoText.y = 20;
            headerFrame.appendChild(headerLogoText);
            
            // Добавляем меню
            const menuFrame = figma.createFrame();
            menuFrame.name = "Menu";
            menuFrame.resize(800, 40);
            menuFrame.x = 200;
            menuFrame.y = 20;
            
            const headerMenuItems = component.props.menu?.main || [];
            let headerMenuX = 0;
            const headerMenuGap = 40;
            
            for (const item of headerMenuItems) {
              const menuItem = figma.createText();
              menuItem.fontName = { family: "Inter", style: "Regular" };
              menuItem.characters = item;
              menuItem.fontSize = 14;
              menuItem.x = headerMenuX;
              menuItem.y = 0;
              menuFrame.appendChild(menuItem);
              headerMenuX += menuItem.width + headerMenuGap;
            }
            
            headerFrame.appendChild(menuFrame);
            
            // Добавляем заголовок
            const title = figma.createText();
            title.fontName = { family: "Inter", style: "Bold" };
            title.characters = component.props.title || "Доставка цветов в Иркутске";
            title.fontSize = 48;
            title.x = 40;
            title.y = 80;
            headerFrame.appendChild(title);
            
            // Добавляем подзаголовок
            const subtitle = figma.createText();
            subtitle.fontName = { family: "Inter", style: "Regular" };
            subtitle.characters = component.props.subtitle || "Купите букет от 1 500 руб.";
            subtitle.fontSize = 24;
            subtitle.x = 40;
            subtitle.y = title.y + title.height + 16;
            headerFrame.appendChild(subtitle);
            
            // Добавляем кнопку
            const button = figma.createRectangle();
            button.name = "Button";
            button.resize(200, 48);
            button.x = 40;
            button.y = subtitle.y + subtitle.height + 24;
            button.fills = [{ type: 'SOLID', color: { r: 1, g: 0.4, b: 0.3 } }];
            button.cornerRadius = 8;
            
            const buttonText = figma.createText();
            buttonText.fontName = { family: "Inter", style: "Medium" };
            buttonText.characters = component.props.buttonText || "Смотреть каталог";
            buttonText.fontSize = 16;
            buttonText.x = button.x + (button.width - buttonText.width) / 2;
            buttonText.y = button.y + (button.height - buttonText.height) / 2;
            buttonText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
            
            headerFrame.appendChild(button);
            headerFrame.appendChild(buttonText);
            
            frame.appendChild(headerFrame);
            break;
            
          case "SpecialOffers":
            const specialOffersFrame = figma.createFrame();
            specialOffersFrame.name = "Special Offers";
            specialOffersFrame.resize(1440, 600);
            specialOffersFrame.x = 0;
            specialOffersFrame.y = currentY;
            
            // Добавляем заголовок
            const specialOffersTitle = figma.createText();
            specialOffersTitle.fontName = { family: "Inter", style: "Bold" };
            specialOffersTitle.characters = component.props.title || "Спецпредложения";
            specialOffersTitle.fontSize = 32;
            specialOffersTitle.x = 40;
            specialOffersTitle.y = 40;
            specialOffersFrame.appendChild(specialOffersTitle);
            
            // Создаем карточки
            const items = component.props.items || [];
            const itemWidth = 360;
            const itemGap = 40;
            let itemX = 40;
            
            for (const item of items) {
              const itemFrame = figma.createFrame();
              itemFrame.name = item.title;
              itemFrame.resize(itemWidth, 480);
              itemFrame.x = itemX;
              itemFrame.y = specialOffersTitle.y + specialOffersTitle.height + 40;
              itemFrame.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98 } }];
              itemFrame.cornerRadius = 8;
              
              // Добавляем изображение-плейсхолдер
              const image = figma.createRectangle();
              image.resize(itemWidth, 240);
              image.x = 0;
              image.y = 0;
              image.fills = [{ type: 'SOLID', color: { r: 0.9, g: 0.9, b: 0.9 } }];
              itemFrame.appendChild(image);
              
              // Добавляем заголовок карточки
              const itemTitle = figma.createText();
              itemTitle.fontName = { family: "Inter", style: "Medium" };
              itemTitle.characters = item.title;
              itemTitle.fontSize = 20;
              itemTitle.x = 20;
              itemTitle.y = image.height + 20;
              itemFrame.appendChild(itemTitle);
              
              // Добавляем описание
              const itemDescription = figma.createText();
              itemDescription.fontName = { family: "Inter", style: "Regular" };
              itemDescription.characters = item.description;
              itemDescription.fontSize = 14;
              itemDescription.x = 20;
              itemDescription.y = itemTitle.y + itemTitle.height + 12;
              itemFrame.appendChild(itemDescription);
              
              // Добавляем цены
              const price = figma.createText();
              price.fontName = { family: "Inter", style: "Medium" };
              price.characters = item.price;
              price.fontSize = 24;
              price.x = 20;
              price.y = itemFrame.height - 100;
              itemFrame.appendChild(price);
              
              const cardPrice = figma.createText();
              cardPrice.fontName = { family: "Inter", style: "Regular" };
              cardPrice.characters = item.cardPrice;
              cardPrice.fontSize = 16;
              cardPrice.x = 20;
              cardPrice.y = price.y + price.height + 4;
              itemFrame.appendChild(cardPrice);
              
              // Добавляем кнопку
              const itemButton = figma.createRectangle();
              itemButton.name = "Button";
              itemButton.resize(160, 40);
              itemButton.x = 20;
              itemButton.y = cardPrice.y + cardPrice.height + 16;
              itemButton.fills = [{ type: 'SOLID', color: { r: 1, g: 0.4, b: 0.3 } }];
              itemButton.cornerRadius = 8;
              
              const itemButtonText = figma.createText();
              itemButtonText.fontName = { family: "Inter", style: "Medium" };
              itemButtonText.characters = item.buttonText;
              itemButtonText.fontSize = 14;
              itemButtonText.x = itemButton.x + (itemButton.width - itemButtonText.width) / 2;
              itemButtonText.y = itemButton.y + (itemButton.height - itemButtonText.height) / 2;
              itemButtonText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
              
              itemFrame.appendChild(itemButton);
              itemFrame.appendChild(itemButtonText);
              
              specialOffersFrame.appendChild(itemFrame);
              itemX += itemWidth + itemGap;
            }
            
            // Добавляем блок мастер-класса
            if (component.props.masterclass) {
              const masterclassFrame = figma.createFrame();
              masterclassFrame.name = "Masterclass";
              masterclassFrame.resize(360, 200);
              masterclassFrame.x = 1040;
              masterclassFrame.y = specialOffersTitle.y + specialOffersTitle.height + 40;
              masterclassFrame.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98 } }];
              masterclassFrame.cornerRadius = 8;
              
              const masterclassTitle = figma.createText();
              masterclassTitle.fontName = { family: "Inter", style: "Medium" };
              masterclassTitle.characters = component.props.masterclass.title;
              masterclassTitle.fontSize = 20;
              masterclassTitle.x = 20;
              masterclassTitle.y = 20;
              masterclassFrame.appendChild(masterclassTitle);
              
              const masterclassPrice = figma.createText();
              masterclassPrice.fontName = { family: "Inter", style: "Bold" };
              masterclassPrice.characters = component.props.masterclass.price;
              masterclassPrice.fontSize = 24;
              masterclassPrice.x = 20;
              masterclassPrice.y = masterclassTitle.y + masterclassTitle.height + 20;
              masterclassFrame.appendChild(masterclassPrice);
              
              const masterclassButton = figma.createRectangle();
              masterclassButton.name = "Button";
              masterclassButton.resize(160, 40);
              masterclassButton.x = 20;
              masterclassButton.y = masterclassFrame.height - 60;
              masterclassButton.fills = [{ type: 'SOLID', color: { r: 1, g: 0.4, b: 0.3 } }];
              masterclassButton.cornerRadius = 8;
              
              const masterclassButtonText = figma.createText();
              masterclassButtonText.fontName = { family: "Inter", style: "Medium" };
              masterclassButtonText.characters = component.props.masterclass.buttonText;
              masterclassButtonText.fontSize = 14;
              masterclassButtonText.x = masterclassButton.x + (masterclassButton.width - masterclassButtonText.width) / 2;
              masterclassButtonText.y = masterclassButton.y + (masterclassButton.height - masterclassButtonText.height) / 2;
              masterclassButtonText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
              
              masterclassFrame.appendChild(masterclassButton);
              masterclassFrame.appendChild(masterclassButtonText);
              
              specialOffersFrame.appendChild(masterclassFrame);
            }
            
            frame.appendChild(specialOffersFrame);
            break;
            
          case "ColorFilter":
            // Создаем секцию фильтра по цвету
            const colorFilterFrame = figma.createFrame();
            colorFilterFrame.name = "Color Filter";
            colorFilterFrame.resize(1360, 200);
            colorFilterFrame.x = 40;
            colorFilterFrame.y = 40;
            
            const colorFilterTitle = figma.createText();
            colorFilterTitle.fontName = { family: "Inter", style: "Medium" };
            colorFilterTitle.characters = component.props.title || "По цвету";
            colorFilterTitle.fontSize = 32;
            colorFilterTitle.x = 40;
            colorFilterTitle.y = 40;
            colorFilterFrame.appendChild(colorFilterTitle);
            
            const colorFilterSubtitle = figma.createText();
            colorFilterSubtitle.fontName = { family: "Inter", style: "Regular" };
            colorFilterSubtitle.characters = component.props.subtitle || "Выберите цветовую гамму:";
            colorFilterSubtitle.fontSize = 24;
            colorFilterSubtitle.x = 40;
            colorFilterSubtitle.y = colorFilterTitle.y + colorFilterTitle.height + 16;
            colorFilterFrame.appendChild(colorFilterSubtitle);
            
            const colorFilterDescription = figma.createText();
            colorFilterDescription.fontName = { family: "Inter", style: "Regular" };
            colorFilterDescription.characters = component.props.description || "Мы подберем идеальный букет в выбранной цветовой гамме";
            colorFilterDescription.fontSize = 16;
            colorFilterDescription.x = 40;
            colorFilterDescription.y = colorFilterSubtitle.y + colorFilterSubtitle.height + 16;
            colorFilterFrame.appendChild(colorFilterDescription);
            
            frame.appendChild(colorFilterFrame);
            break;
            
          case "PriceCategories":
            // Создаем секцию категорий цен
            const collectionsFrame = figma.createFrame();
            collectionsFrame.name = "Collections";
            collectionsFrame.resize(1360, 600);
            collectionsFrame.x = 40;
            collectionsFrame.y = 40;
            
            const categories = component.props.categories || [];
            const categoryItemWidth = 360;
            const categoryGap = 24;
            let categoryItemX = 0;
            
            for (const category of categories) {
              const categoryItemFrame = figma.createFrame();
              categoryItemFrame.name = category.title;
              categoryItemFrame.resize(categoryItemWidth, 480);
              categoryItemFrame.x = categoryItemX;
              categoryItemFrame.y = 40;
              categoryItemFrame.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98 } }];
              
              const categoryTitle = figma.createText();
              categoryTitle.fontName = { family: "Inter", style: "Medium" };
              categoryTitle.characters = category.title;
              categoryTitle.fontSize = 20;
              categoryTitle.x = 20;
              categoryTitle.y = 20;
              categoryItemFrame.appendChild(categoryTitle);
              
              const categoryItems = category.items || [];
              const itemGap = 24;
              let itemY = 0;
              
              for (const item of categoryItems) {
                const itemFrame = figma.createFrame();
                itemFrame.name = item.title;
                itemFrame.resize(categoryItemWidth, 480);
                itemFrame.x = 0;
                itemFrame.y = itemY;
                itemFrame.fills = [{ type: 'SOLID', color: { r: 0.98, g: 0.98, b: 0.98 } }];
                
                const itemTitle = figma.createText();
                itemTitle.fontName = { family: "Inter", style: "Medium" };
                itemTitle.characters = item.title;
                itemTitle.fontSize = 20;
                itemTitle.x = 20;
                itemTitle.y = 20;
                itemFrame.appendChild(itemTitle);
                
                const itemDescription = figma.createText();
                itemDescription.fontName = { family: "Inter", style: "Regular" };
                itemDescription.characters = item.description;
                itemDescription.fontSize = 14;
                itemDescription.x = 20;
                itemDescription.y = itemTitle.y + itemTitle.height + 12;
                itemFrame.appendChild(itemDescription);
                
                const price = figma.createText();
                price.fontName = { family: "Inter", style: "Medium" };
                price.characters = item.price;
                price.fontSize = 24;
                price.x = 20;
                price.y = itemFrame.height - 80;
                itemFrame.appendChild(price);
                
                const cardPrice = figma.createText();
                cardPrice.fontName = { family: "Inter", style: "Regular" };
                cardPrice.characters = item.cardPrice;
                cardPrice.fontSize = 16;
                cardPrice.x = 20;
                cardPrice.y = price.y + price.height + 4;
                itemFrame.appendChild(cardPrice);
                
                const itemButton = figma.createRectangle();
                itemButton.name = "Button";
                itemButton.resize(160, 40);
                itemButton.x = 20;
                itemButton.y = itemFrame.height - 60;
                itemButton.fills = [{ type: 'SOLID', color: { r: 1, g: 0.4, b: 0.3 } }];
                itemButton.cornerRadius = 8;
                
                const itemButtonText = figma.createText();
                itemButtonText.fontName = { family: "Inter", style: "Medium" };
                itemButtonText.characters = item.buttonText;
                itemButtonText.fontSize = 14;
                itemButtonText.x = itemButton.x + (itemButton.width - itemButtonText.width) / 2;
                itemButtonText.y = itemButton.y + (itemButton.height - itemButtonText.height) / 2;
                itemButtonText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
                
                itemFrame.appendChild(itemButton);
                itemFrame.appendChild(itemButtonText);
                
                categoryItemFrame.appendChild(itemFrame);
                itemY += 480 + itemGap;
              }
              
              collectionsFrame.appendChild(categoryItemFrame);
              categoryItemX += categoryItemWidth + categoryGap;
            }
            
            frame.appendChild(collectionsFrame);
            break;
            
          case "Footer":
            // Создаем футер
            const footerFrame = figma.createFrame();
            footerFrame.name = "Footer";
            footerFrame.resize(1360, 400);
            footerFrame.x = 40;
            footerFrame.y = 40;
            footerFrame.fills = [{ type: 'SOLID', color: { r: 0.1, g: 0.1, b: 0.1 } }];
            
            // Добавляем логотип
            const footerLogoText = figma.createText();
            footerLogoText.fontName = { family: "Inter", style: "Bold" };
            footerLogoText.characters = component.props.logo || "BAZAAR";
            footerLogoText.fontSize = 32;
            footerLogoText.x = 40;
            footerLogoText.y = 40;
            footerLogoText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
            footerFrame.appendChild(footerLogoText);
            
            // Добавляем меню
            const footerMenuFrame = figma.createFrame();
            footerMenuFrame.name = "Menu";
            footerMenuFrame.resize(800, 300);
            footerMenuFrame.x = 40;
            footerMenuFrame.y = footerLogoText.y + footerLogoText.height + 40;
            
            // Добавляем пункты меню
            const footerMenuItems = [
              "ГЛАВНАЯ",
              "КАТАЛОГ",
              "ОПЛАТА",
              "ДОСТАВКА",
              "БЛОГ",
              "ВАКАНСИИ",
              "О НАС",
              "КОНТАКТЫ"
            ];
            
            let footerMenuY = 0;
            for (const menuItem of footerMenuItems) {
              const menuText = figma.createText();
              menuText.fontName = { family: "Inter", style: "Regular" };
              menuText.characters = menuItem;
              menuText.fontSize = 16;
              menuText.x = 0;
              menuText.y = footerMenuY;
              menuText.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
              footerMenuFrame.appendChild(menuText);
              footerMenuY += 24;
            }
            
            footerFrame.appendChild(footerMenuFrame);
            
            // Добавляем контакты
            const contactsFrame = figma.createFrame();
            contactsFrame.name = "Contacts";
            contactsFrame.resize(300, 200);
            contactsFrame.x = footerFrame.width - 340;
            contactsFrame.y = 40;
            
            const footerPhone = figma.createText();
            footerPhone.fontName = { family: "Inter", style: "Medium" };
            footerPhone.characters = component.props.contacts?.phone || "+7 (908) 774-00-15";
            footerPhone.fontSize = 24;
            footerPhone.x = 0;
            footerPhone.y = 0;
            footerPhone.fills = [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];
            contactsFrame.appendChild(footerPhone);
            
            footerFrame.appendChild(contactsFrame);
            
            frame.appendChild(footerFrame);
            break;
        }
        
        pageFrame.appendChild(frame);
        currentY += frame.height + 40;
      }
      
      // Обновляем размер фрейма страницы
      pageFrame.resize(1440, currentY);
      
      console.log('Экспорт завершен успешно');
      
      figma.ui.postMessage({
        type: 'export-complete',
        message: 'Главная страница успешно экспортирована в Figma'
      });
    }
  } catch (error: any) {
    console.error('Ошибка при экспорте:', error);
    figma.ui.postMessage({
      type: 'error',
      message: `Ошибка при экспорте: ${error && error.message ? error.message : 'Неизвестная ошибка'}`
    });
  }
}; 