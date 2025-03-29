#!/bin/bash

# Скрипт для открытия HTML-генераторов изображений в браузере

# Определяем абсолютный путь к директории
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Открываем генераторы в браузере
echo "Открываю генераторы изображений в браузере..."

# Открываем генератор специальных предложений
open "$SCRIPT_DIR/special/placeholder.html"

# Открываем генератор букетов
open "$SCRIPT_DIR/bouquets/placeholder.html"

# Открываем генератор коллекций
open "$SCRIPT_DIR/collections/placeholder.html"

# Открываем генератор мастер-класса
open "$SCRIPT_DIR/masterclass/placeholder.html"

echo "Генераторы открыты в браузере."
echo ""
echo "Инструкции:"
echo "1. В каждом открытом окне нажмите кнопку 'Скачать' под каждым изображением"
echo "2. Сохраните изображения в соответствующие директории:"
echo "   - Специальные предложения: public/images/special/"
echo "   - Букеты: public/images/bouquets/"
echo "   - Коллекции: public/images/collections/budget/, medium/, premium/"
echo "   - Мастер-класс: public/images/ (корневая директория изображений)"
echo ""
echo "Список необходимых изображений:"
echo "- Специальные предложения: express.jpg, teacher.jpg, roses.jpg"
echo "- Букеты: cloud.jpg, sunrise.jpg, sunny.jpg, lavender.jpg, breeze.jpg, pink.jpg, royal.jpg, tenderness.jpg, luxury.jpg, garden.jpg, purple-mist.jpg, lagoon.jpg, premium.jpg, dream.jpg, snow.jpg, sunny-lux.jpg, purple-paradise.jpg, blue-dream.jpg, fresh.jpg, purple.jpg, elegance.jpg, sunset.jpg, silk.jpg, violet.jpg, passion.jpg, diamond.jpg, pink-sapphire.jpg, purple-luxury.jpg, white-diamond.jpg, red-velvet.jpg"
echo "- Мастер-класс: masterclass.jpg"
echo ""
echo "Примечание: Для букетов, которых нет в генераторе, используйте любой из существующих и переименуйте файл соответствующим образом." 