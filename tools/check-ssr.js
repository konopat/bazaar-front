#!/usr/bin/env node

/**
 * Скрипт для проверки SEO и SSR в Bazaar проекте
 * Запуск: node tools/check-ssr.js [URL]
 */

const http = require('http');
const https = require('https');
const url = require('url');
const { JSDOM } = require('jsdom');

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RESET = '\x1b[0m';

// Получаем URL для проверки из аргументов командной строки или используем по умолчанию
const targetUrl = process.argv[2] || 'http://localhost:3000';
const parsedUrl = url.parse(targetUrl);

// Выбираем модуль в зависимости от протокола
const client = parsedUrl.protocol === 'https:' ? https : http;

console.log(`${BLUE}Проверка SSR и SEO для: ${targetUrl}${RESET}\n`);

// Функция для выполнения запроса и проверки ответа
function fetchAndCheckSSR() {
  const options = {
    method: 'GET',
    hostname: parsedUrl.hostname,
    port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
    path: parsedUrl.path || '/',
    headers: {
      'User-Agent': 'SSR-Checker-Bot/1.0',
    }
  };

  console.log(`Отправка запроса к: ${options.hostname}:${options.port}${options.path}`);

  const req = client.request(options, (res) => {
    let data = '';

    res.on('data', (chunk) => {
      data += chunk;
    });

    res.on('end', () => {
      if (res.statusCode !== 200) {
        console.error(`${RED}Ошибка: Получен статус ${res.statusCode}${RESET}`);
        process.exit(1);
      }

      console.log(`${GREEN}Получен ответ ${res.statusCode}. Анализ содержимого...${RESET}\n`);
      analyzeHtml(data);
    });
  });

  req.on('error', (error) => {
    console.error(`${RED}Ошибка запроса: ${error.message}${RESET}`);
    process.exit(1);
  });

  req.end();
}

// Функция для анализа HTML-контента
function analyzeHtml(html) {
  const dom = new JSDOM(html);
  const document = dom.window.document;

  // Проверка SSR
  checkSSR(document);

  // Проверка SEO
  checkSEO(document);
}

// Проверка наличия серверного рендеринга (SSR)
function checkSSR(document) {
  console.log(`${BLUE}--- Проверка SSR ---${RESET}`);

  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.log(`${RED}✘ Элемент с id="root" не найден${RESET}`);
    return;
  }

  const rootContent = rootElement.innerHTML.trim();
  
  if (rootContent.length === 0) {
    console.log(`${RED}✘ SSR отсутствует: #root пуст${RESET}`);
  } else if (rootContent.length < 50) {
    console.log(`${YELLOW}⚠ SSR возможно частичный: #root содержит мало контента${RESET}`);
    console.log(`  Содержимое: ${rootContent.slice(0, 50)}...`);
  } else {
    console.log(`${GREEN}✓ SSR работает: #root содержит предварительно отрендеренный контент${RESET}`);
    console.log(`  Размер содержимого: ${rootContent.length} символов`);
  }

  // Проверка на наличие Redux state
  const reduxStateScript = Array.from(document.querySelectorAll('script')).find(
    script => script.textContent && script.textContent.includes('__INITIAL_STATE__')
  );

  if (reduxStateScript) {
    console.log(`${GREEN}✓ Redux state гидратация: найден __INITIAL_STATE__${RESET}`);
  } else {
    console.log(`${YELLOW}⚠ Redux state не найден: __INITIAL_STATE__ отсутствует${RESET}`);
  }

  console.log('');
}

// Проверка SEO тегов
function checkSEO(document) {
  console.log(`${BLUE}--- Проверка SEO ---${RESET}`);

  // Проверка title
  const title = document.querySelector('title');
  if (title) {
    console.log(`${GREEN}✓ Title: ${title.textContent}${RESET}`);
  } else {
    console.log(`${RED}✘ Title отсутствует${RESET}`);
  }

  // Проверка meta description
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    console.log(`${GREEN}✓ Meta description: ${description.getAttribute('content')}${RESET}`);
  } else {
    console.log(`${RED}✘ Meta description отсутствует${RESET}`);
  }

  // Проверка meta keywords
  const keywords = document.querySelector('meta[name="keywords"]');
  if (keywords) {
    console.log(`${GREEN}✓ Meta keywords: ${keywords.getAttribute('content')}${RESET}`);
  } else {
    console.log(`${YELLOW}⚠ Meta keywords отсутствует (необязательно)${RESET}`);
  }

  // Проверка canonical
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    console.log(`${GREEN}✓ Canonical: ${canonical.getAttribute('href')}${RESET}`);
  } else {
    console.log(`${YELLOW}⚠ Canonical отсутствует${RESET}`);
  }

  // Проверка Open Graph
  const ogTitle = document.querySelector('meta[property="og:title"]');
  const ogDescription = document.querySelector('meta[property="og:description"]');
  const ogImage = document.querySelector('meta[property="og:image"]');
  const ogUrl = document.querySelector('meta[property="og:url"]');

  if (ogTitle || ogDescription || ogImage || ogUrl) {
    console.log(`${GREEN}✓ Open Graph теги:${RESET}`);
    if (ogTitle) console.log(`  - og:title: ${ogTitle.getAttribute('content')}`);
    if (ogDescription) console.log(`  - og:description: ${ogDescription.getAttribute('content')}`);
    if (ogImage) console.log(`  - og:image: ${ogImage.getAttribute('content')}`);
    if (ogUrl) console.log(`  - og:url: ${ogUrl.getAttribute('content')}`);
  } else {
    console.log(`${YELLOW}⚠ Open Graph теги отсутствуют${RESET}`);
  }

  // Проверка структурированных данных
  const jsonLD = Array.from(document.querySelectorAll('script[type="application/ld+json"]'));
  if (jsonLD.length > 0) {
    console.log(`${GREEN}✓ Структурированные данные: ${jsonLD.length} блок(ов)${RESET}`);
    jsonLD.forEach((script, index) => {
      try {
        const data = JSON.parse(script.textContent);
        console.log(`  - Блок ${index + 1}: ${data['@type'] || 'Unknown type'}`);
      } catch (e) {
        console.log(`  - Блок ${index + 1}: Ошибка парсинга JSON`);
      }
    });
  } else {
    console.log(`${YELLOW}⚠ Структурированные данные отсутствуют${RESET}`);
  }
}

// Запуск проверки
fetchAndCheckSSR(); 