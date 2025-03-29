import { useMemo } from 'react';
import { WorkSchedule } from '../constants/contacts';

type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

interface StoreStatus {
  isOpen: boolean;
  statusText: string;
}

/**
 * Хук для определения статуса работы магазина
 * @param workSchedule - Расписание работы магазина
 * @returns Объект со статусом работы (открыт/закрыт) и текстом статуса
 */
export function useStoreStatus(workSchedule?: WorkSchedule): StoreStatus {
  return useMemo(() => {
    // Если нет расписания, считаем что магазин закрыт
    if (!workSchedule) {
      return { isOpen: false, statusText: 'Информация о часах работы недоступна' };
    }

    // Получаем текущую дату и время
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    
    // Определяем текущий день недели
    const daysOfWeek: DayOfWeek[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    const today = daysOfWeek[now.getDay()];
    
    // Получаем расписание на сегодня
    const todaySchedule = workSchedule[today];
    
    // Если сегодня выходной
    if (todaySchedule.dayOff) {
      // Ищем следующий рабочий день
      let nextWorkDay: DayOfWeek | null = null;
      let nextWorkDayName = '';
      
      // Проверяем следующие 7 дней
      for (let i = 1; i <= 7; i++) {
        const nextDay = new Date();
        nextDay.setDate(now.getDate() + i);
        const nextDayOfWeek = daysOfWeek[nextDay.getDay()];
        
        if (!workSchedule[nextDayOfWeek].dayOff) {
          nextWorkDay = nextDayOfWeek;
          
          // Названия дней недели на русском
          const dayNames = {
            monday: 'понедельника',
            tuesday: 'вторника',
            wednesday: 'среды',
            thursday: 'четверга',
            friday: 'пятницы',
            saturday: 'субботы',
            sunday: 'воскресенья'
          };
          
          nextWorkDayName = dayNames[nextDayOfWeek];
          break;
        }
      }
      
      if (nextWorkDay) {
        return {
          isOpen: false,
          statusText: `Закрыто до ${workSchedule[nextWorkDay].open} ${nextWorkDayName}`
        };
      } else {
        return { isOpen: false, statusText: 'Закрыто' };
      }
    }
    
    // Если сегодня рабочий день
    // Преобразуем время в минуты для удобства сравнения
    const currentTimeInMinutes = currentHour * 60 + currentMinutes;
    
    // Преобразуем время открытия и закрытия в минуты
    const [openHour, openMinute] = todaySchedule.open.split(':').map(Number);
    const [closeHour, closeMinute] = todaySchedule.close.split(':').map(Number);
    const openTimeInMinutes = openHour * 60 + openMinute;
    const closeTimeInMinutes = closeHour * 60 + closeMinute;
    
    // Проверяем, открыт ли магазин в текущее время
    if (currentTimeInMinutes >= openTimeInMinutes && currentTimeInMinutes < closeTimeInMinutes) {
      return {
        isOpen: true,
        statusText: `Открыто до ${todaySchedule.close}`
      };
    } else if (currentTimeInMinutes < openTimeInMinutes) {
      // Магазин еще не открылся
      return {
        isOpen: false,
        statusText: `Откроется в ${todaySchedule.open}`
      };
    } else {
      // Магазин уже закрылся
      // Ищем следующий рабочий день
      let nextWorkDay: DayOfWeek | null = null;
      let daysAhead = 1;
      
      // Проверяем следующие 7 дней
      for (let i = 1; i <= 7; i++) {
        const nextDay = new Date();
        nextDay.setDate(now.getDate() + i);
        const nextDayOfWeek = daysOfWeek[nextDay.getDay()];
        
        if (!workSchedule[nextDayOfWeek].dayOff) {
          nextWorkDay = nextDayOfWeek;
          daysAhead = i;
          break;
        }
      }
      
      if (nextWorkDay) {
        // Названия дней недели на русском
        const dayNames = ['завтра', 'послезавтра'];
        let dayText = daysAhead <= 2 ? dayNames[daysAhead - 1] : `через ${daysAhead} дня`;
        
        return {
          isOpen: false,
          statusText: `Закрыто, откроется ${dayText} в ${workSchedule[nextWorkDay].open}`
        };
      } else {
        return { isOpen: false, statusText: 'Закрыто' };
      }
    }
  }, [workSchedule]);
} 