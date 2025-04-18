# Генераторы изображений для проекта Bazaar

В этой директории находятся HTML-генераторы и скрипты для создания изображений, используемых в проекте.

## Доступные генераторы

1. **Букеты** - `bouquets/placeholder.html`
   - Генерирует изображения для отдельных букетов
   - Создает изображения размером 400x300px

2. **Специальные предложения** - `special/placeholder.html`
   - Генерирует изображения для специальных предложений
   - Создает изображения размером 600x300px с информацией о предложении

3. **Коллекции** - `collections/placeholder.html`
   - Генерирует изображения для коллекций по ценовым категориям
   - Создает изображения размером 500x300px

4. **Мастер-класс** - `masterclass/placeholder.html`
   - Генерирует изображение для баннера мастер-класса
   - Создает изображение размером 800x400px

## Скрипты для создания изображений

1. **generate-images.sh** - Открывает HTML-генераторы в браузере
   ```
   ./generate-images.sh
   ```

2. **create-placeholders.sh** - Создает заглушки с помощью ImageMagick (если установлен)
   ```
   ./create-placeholders.sh
   ```

3. **create-placeholders.js** - Создает пустые файлы-заглушки с помощью Node.js
   ```
   node create-placeholders.js
   ```

## Как использовать HTML-генераторы

1. Запустите скрипт `./generate-images.sh` или откройте нужный HTML-файл в браузере
2. Просмотрите доступные варианты изображений
3. Нажмите кнопку "Скачать" под нужным изображением
4. Изображение будет сохранено в формате JPG

## Список необходимых изображений

### Специальные предложения
- express.jpg
- teacher.jpg
- roses.jpg

### Букеты
- cloud.jpg, sunrise.jpg, sunny.jpg, lavender.jpg, breeze.jpg, pink.jpg
- royal.jpg, tenderness.jpg, luxury.jpg, garden.jpg, purple-mist.jpg
- lagoon.jpg, premium.jpg, dream.jpg, snow.jpg, sunny-lux.jpg
- purple-paradise.jpg, blue-dream.jpg, fresh.jpg, purple.jpg
- elegance.jpg, sunset.jpg, silk.jpg, violet.jpg, passion.jpg
- diamond.jpg, pink-sapphire.jpg, purple-luxury.jpg
- white-diamond.jpg, red-velvet.jpg

### Мастер-класс
- masterclass.jpg (в корневой директории изображений)

## Структура директорий

```
public/images/
├── README.md
├── generate-images.sh
├── create-placeholders.sh
├── create-placeholders.js
├── masterclass.jpg
├── bouquets/
│   ├── placeholder.html
│   └── ... (сгенерированные изображения)
├── special/
│   ├── placeholder.html
│   └── ... (сгенерированные изображения)
├── masterclass/
│   └── placeholder.html
└── collections/
    ├── placeholder.html
    ├── budget/
    │   └── ... (изображения для бюджетной коллекции)
    ├── medium/
    │   └── ... (изображения для средней коллекции)
    └── premium/
        └── ... (изображения для премиум коллекции)
```

## Технические детали

Генераторы используют:
- HTML и CSS для создания визуальных элементов
- JavaScript библиотеку html2canvas для конвертации HTML в изображения
- Градиенты и простые геометрические формы для создания стилизованных букетов

## Примечание

Эти генераторы предназначены для создания временных изображений-заполнителей. 
В реальном проекте рекомендуется заменить их на фотографии реальных букетов. 