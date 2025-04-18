/**
 * Утилита для работы с путями в приложении с учетом publicPath
 */

/**
 * Возвращает корректный путь к статическому ресурсу с учетом публичного пути приложения
 * @param path - относительный путь к ресурсу
 * @returns правильный путь с учетом publicPath
 */
export const getAssetPath = (path: string): string => {
  // Убираем начальный слеш, если он есть
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  
  // В production используем publicPath из webpack
  const publicPath = process.env.NODE_ENV === 'production' ? '/bazaar-front/' : '/';
  
  return `${publicPath}${cleanPath}`;
}; 