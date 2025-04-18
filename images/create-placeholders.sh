#!/bin/bash

# Скрипт для создания заглушек изображений

# Определяем абсолютный путь к директории
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Создаем директории, если они не существуют
mkdir -p "$SCRIPT_DIR/special"
mkdir -p "$SCRIPT_DIR/bouquets"
mkdir -p "$SCRIPT_DIR/collections/budget"
mkdir -p "$SCRIPT_DIR/collections/medium"
mkdir -p "$SCRIPT_DIR/collections/premium"

# Список изображений для создания
SPECIAL_IMAGES=("express.jpg" "teacher.jpg" "roses.jpg")
BOUQUET_IMAGES=("cloud.jpg" "sunrise.jpg" "sunny.jpg" "lavender.jpg" "breeze.jpg" "pink.jpg" "royal.jpg" "tenderness.jpg" "luxury.jpg" "garden.jpg" "purple-mist.jpg" "lagoon.jpg" "premium.jpg" "dream.jpg" "snow.jpg" "sunny-lux.jpg" "purple-paradise.jpg" "blue-dream.jpg" "fresh.jpg" "purple.jpg" "elegance.jpg" "sunset.jpg" "silk.jpg" "violet.jpg" "passion.jpg" "diamond.jpg" "pink-sapphire.jpg" "purple-luxury.jpg" "white-diamond.jpg" "red-velvet.jpg")

# Функция для создания заглушки изображения
create_placeholder() {
    local dir=$1
    local filename=$2
    local width=$3
    local height=$4
    local color=$5
    local text=$6
    
    # Создаем заглушку с помощью ImageMagick (если установлен)
    if command -v convert &> /dev/null; then
        convert -size "${width}x${height}" canvas:"$color" -gravity center -pointsize 30 -fill white -annotate 0 "$text" "$dir/$filename"
        echo "Создано изображение: $dir/$filename"
    else
        # Если ImageMagick не установлен, создаем пустой файл
        touch "$dir/$filename"
        echo "Создан пустой файл: $dir/$filename (для создания настоящих заглушек установите ImageMagick)"
    fi
}

echo "Создаю заглушки для изображений..."

# Создаем заглушки для специальных предложений
for img in "${SPECIAL_IMAGES[@]}"; do
    name=$(basename "$img" .jpg)
    create_placeholder "$SCRIPT_DIR/special" "$img" 600 300 "#ff9966" "Special: $name"
done

# Создаем заглушки для букетов
for img in "${BOUQUET_IMAGES[@]}"; do
    name=$(basename "$img" .jpg)
    create_placeholder "$SCRIPT_DIR/bouquets" "$img" 400 300 "#a8e063" "Bouquet: $name"
done

# Создаем заглушку для мастер-класса
create_placeholder "$SCRIPT_DIR" "masterclass.jpg" 800 400 "#6a11cb" "Masterclass"

echo "Все заглушки созданы!"
echo ""
echo "Примечание: Если вы видите сообщение о пустых файлах, установите ImageMagick для создания настоящих заглушек:"
echo "  - macOS: brew install imagemagick"
echo "  - Ubuntu/Debian: sudo apt-get install imagemagick"
echo "  - Windows: скачайте установщик с https://imagemagick.org/script/download.php"
echo ""
echo "Или используйте HTML-генераторы, запустив ./generate-images.sh" 