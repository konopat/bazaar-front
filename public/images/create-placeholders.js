const fs = require('fs');
const path = require('path');

// Список изображений для создания
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

// Функция для создания директории, если она не существует
function ensureDirectoryExists(directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

// Функция для создания пустого файла
function createEmptyFile(filePath) {
  fs.writeFileSync(filePath, '');
  console.log(`Создан пустой файл: ${filePath}`);
}

// Создаем директории
ensureDirectoryExists(path.join(__dirname, 'special'));
ensureDirectoryExists(path.join(__dirname, 'bouquets'));
ensureDirectoryExists(path.join(__dirname, 'collections/budget'));
ensureDirectoryExists(path.join(__dirname, 'collections/medium'));
ensureDirectoryExists(path.join(__dirname, 'collections/premium'));

console.log('Создаю заглушки для изображений...');

// Создаем заглушки для специальных предложений
specialImages.forEach(imageName => {
  const filePath = path.join(__dirname, 'special', imageName);
  createEmptyFile(filePath);
});

// Создаем заглушки для букетов
bouquetImages.forEach(imageName => {
  const filePath = path.join(__dirname, 'bouquets', imageName);
  createEmptyFile(filePath);
});

// Создаем заглушку для мастер-класса
createEmptyFile(path.join(__dirname, 'masterclass.jpg'));

console.log('Все заглушки созданы!');
console.log('');
console.log('Примечание: Созданы пустые файлы. Для создания настоящих изображений используйте:');
console.log('1. HTML-генераторы, запустив ./generate-images.sh');
console.log('2. Или скрипт ./create-placeholders.sh (требуется ImageMagick)');
console.log('');
console.log('Для запуска этого скрипта: node create-placeholders.js'); 