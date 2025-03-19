const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// Список изображений для генерации
const specialImages = [
  'express.jpg',
  'teacher.jpg',
  'roses.jpg'
];

const bouquetImages = [
  'cloud.jpg',
  'sunrise.jpg',
  'sunny.jpg',
  'lavender.jpg',
  'breeze.jpg',
  'pink.jpg',
  'royal.jpg',
  'tenderness.jpg',
  'luxury.jpg',
  'garden.jpg',
  'purple-mist.jpg',
  'lagoon.jpg',
  'premium.jpg',
  'dream.jpg',
  'snow.jpg',
  'sunny-lux.jpg',
  'purple-paradise.jpg',
  'blue-dream.jpg',
  'fresh.jpg',
  'purple.jpg',
  'elegance.jpg',
  'sunset.jpg',
  'silk.jpg',
  'violet.jpg',
  'passion.jpg',
  'diamond.jpg',
  'pink-sapphire.jpg',
  'purple-luxury.jpg',
  'white-diamond.jpg',
  'red-velvet.jpg'
];

// Дополнительное изображение
const masterclassImage = 'masterclass.jpg';

// Функция для создания директории, если она не существует
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Функция для генерации изображений
async function generateImages() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Создаем директории, если они не существуют
  ensureDirectoryExists(path.join(__dirname, 'special'));
  ensureDirectoryExists(path.join(__dirname, 'bouquets'));
  
  // Генерация изображений специальных предложений
  console.log('Генерация изображений специальных предложений...');
  await page.goto(`file://${path.join(__dirname, 'special', 'placeholder.html')}`);
  
  for (const imageName of specialImages) {
    const elementId = imageName.replace('.jpg', '');
    
    // Находим элемент по ID
    const element = await page.$(`#${elementId}`);
    if (element) {
      // Делаем скриншот элемента
      await element.screenshot({
        path: path.join(__dirname, 'special', imageName),
        type: 'jpeg',
        quality: 90
      });
      console.log(`Создано изображение: special/${imageName}`);
    } else {
      console.error(`Элемент с ID ${elementId} не найден`);
    }
  }
  
  // Генерация изображений букетов
  console.log('Генерация изображений букетов...');
  await page.goto(`file://${path.join(__dirname, 'bouquets', 'placeholder.html')}`);
  
  // Получаем все доступные ID элементов на странице
  const availableIds = await page.evaluate(() => {
    const elements = document.querySelectorAll('[id]');
    return Array.from(elements).map(el => el.id);
  });
  
  // Создаем карту соответствия имен файлов и ID элементов
  const idMap = {};
  availableIds.forEach(id => {
    // Сначала проверяем точное совпадение
    if (bouquetImages.includes(`${id}.jpg`)) {
      idMap[`${id}.jpg`] = id;
    }
  });
  
  // Для оставшихся изображений используем доступные ID циклически
  let idIndex = 0;
  for (const imageName of bouquetImages) {
    if (!idMap[imageName]) {
      idMap[imageName] = availableIds[idIndex % availableIds.length];
      idIndex++;
    }
  }
  
  // Генерируем изображения букетов
  for (const imageName of bouquetImages) {
    const elementId = idMap[imageName];
    
    // Находим элемент по ID
    const element = await page.$(`#${elementId}`);
    if (element) {
      // Делаем скриншот элемента
      await element.screenshot({
        path: path.join(__dirname, 'bouquets', imageName),
        type: 'jpeg',
        quality: 90
      });
      console.log(`Создано изображение: bouquets/${imageName}`);
    } else {
      console.error(`Элемент с ID ${elementId} не найден`);
    }
  }
  
  // Создаем изображение для мастер-класса
  console.log('Генерация изображения для мастер-класса...');
  
  // Создаем HTML для мастер-класса
  const masterclassHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body {
        margin: 0;
        padding: 0;
        background: #f5f5f5;
      }
      .masterclass {
        width: 800px;
        height: 400px;
        background: linear-gradient(45deg, #6a11cb, #2575fc);
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-family: Arial, sans-serif;
      }
      .masterclass-content {
        text-align: center;
        padding: 40px;
        z-index: 2;
      }
      .masterclass-title {
        font-size: 48px;
        font-weight: bold;
        margin-bottom: 20px;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
      }
      .masterclass-description {
        font-size: 24px;
        margin-bottom: 30px;
        max-width: 600px;
        line-height: 1.4;
      }
      .masterclass-button {
        display: inline-block;
        padding: 15px 30px;
        background-color: white;
        color: #6a11cb;
        border-radius: 30px;
        text-decoration: none;
        font-weight: bold;
        font-size: 18px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      }
      .flower {
        position: absolute;
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.2);
      }
    </style>
  </head>
  <body>
    <div id="masterclass" class="masterclass">
      <div class="flower" style="width: 100px; height: 100px; top: 50px; left: 50px;"></div>
      <div class="flower" style="width: 150px; height: 150px; bottom: 70px; right: 60px;"></div>
      <div class="flower" style="width: 80px; height: 80px; top: 200px; right: 180px;"></div>
      <div class="flower" style="width: 120px; height: 120px; bottom: 150px; left: 180px;"></div>
      <div class="masterclass-content">
        <div class="masterclass-title">Мастер-класс по флористике</div>
        <div class="masterclass-description">Научитесь создавать уникальные букеты под руководством опытных флористов</div>
        <a href="#" class="masterclass-button">Записаться</a>
      </div>
    </div>
  </body>
  </html>
  `;
  
  // Создаем временный HTML-файл
  const tempHtmlPath = path.join(__dirname, 'temp-masterclass.html');
  fs.writeFileSync(tempHtmlPath, masterclassHtml);
  
  // Открываем страницу и делаем скриншот
  await page.goto(`file://${tempHtmlPath}`);
  const masterclassElement = await page.$('#masterclass');
  if (masterclassElement) {
    await masterclassElement.screenshot({
      path: path.join(__dirname, masterclassImage),
      type: 'jpeg',
      quality: 90
    });
    console.log(`Создано изображение: ${masterclassImage}`);
  }
  
  // Удаляем временный файл
  fs.unlinkSync(tempHtmlPath);
  
  await browser.close();
  console.log('Все изображения успешно сгенерированы!');
}

// Запускаем генерацию изображений
generateImages().catch(error => {
  console.error('Ошибка при генерации изображений:', error);
}); 