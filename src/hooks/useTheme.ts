import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';
type ThemeMode = 'light' | 'dark' | 'auto';

// Ключ для хранения режима темы
const THEME_MODE_KEY = 'theme_mode';

const useTheme = () => {
  // Определяем текущий режим темы
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem(THEME_MODE_KEY) as ThemeMode;
    if (savedMode === 'light' || savedMode === 'dark' || savedMode === 'auto') {
      return savedMode;
    }
    // По умолчанию - автоматический режим
    return 'auto';
  });

  // Актуальная тема, которая применяется
  const [theme, setTheme] = useState<Theme>(() => {
    if (themeMode === 'light') return 'light';
    if (themeMode === 'dark') return 'dark';
    
    // Если режим авто, определяем тему по системным настройкам
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    // Проверяем время суток (темная тема с 20:00 до 6:00)
    const currentHour = new Date().getHours();
    if (currentHour >= 20 || currentHour < 6) {
      return 'dark';
    }
    
    return 'light';
  });

  // Сохраняем режим темы
  useEffect(() => {
    localStorage.setItem(THEME_MODE_KEY, themeMode);
  }, [themeMode]);

  // Применяем тему
  useEffect(() => {
    // Применяем класс как к body, так и к html
    document.documentElement.classList.remove('theme-light', 'theme-dark');
    document.documentElement.classList.add(`theme-${theme}`);
    document.body.classList.remove('theme-light', 'theme-dark');
    document.body.classList.add(`theme-${theme}`);
    
    // Обновляем цвет темы в meta теге
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', theme === 'dark' ? '#121212' : '#F9F5EF');
    }
    
    console.log('Тема изменена на:', theme, 'Режим темы:', themeMode);
  }, [theme, themeMode]);

  // Эффект для отслеживания предпочтений системы
  useEffect(() => {
    // Если не авторежим, выходим
    if (themeMode !== 'auto') return;
    
    // Обработчик изменения системных предпочтений
    const handleSystemPreferenceChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
    };
    
    // Подписываемся на изменения
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemPreferenceChange);
    
    // Проверка времени суток каждый час, если включен авторежим
    const timeInterval = setInterval(() => {
      if (themeMode === 'auto') {
        const currentHour = new Date().getHours();
        const isDark = currentHour >= 20 || currentHour < 6;
        setTheme(isDark ? 'dark' : 'light');
      }
    }, 60 * 60 * 1000); // Проверяем каждый час
    
    // Очистка при размонтировании
    return () => {
      mediaQuery.removeEventListener('change', handleSystemPreferenceChange);
      clearInterval(timeInterval);
    };
  }, [themeMode]);

  // Циклическое переключение режимов: светлый -> темный -> авто -> светлый
  const cycleThemeMode = () => {
    setThemeMode(prevMode => {
      let newMode: ThemeMode;
      
      if (prevMode === 'light') {
        newMode = 'dark';
      } else if (prevMode === 'dark') {
        newMode = 'auto';
        
        // Если включаем авторежим, обновим тему в соответствии с текущими предпочтениями
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const currentHour = new Date().getHours();
        const isDark = prefersDark || (currentHour >= 20 || currentHour < 6);
        setTheme(isDark ? 'dark' : 'light');
      } else {
        newMode = 'light';
      }
      
      // Если не авторежим, применяем тему напрямую
      if (newMode !== 'auto') {
        setTheme(newMode);
      }
      
      return newMode;
    });
  };

  return { theme, themeMode, cycleThemeMode };
};

export default useTheme; 