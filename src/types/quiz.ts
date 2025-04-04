/**
 * Интерфейс для шага в квизе по подбору букета
 */
export interface QuizStep {
  /** Идентификатор шага */
  id: number;
  /** Название шага */
  title: string;
  /** Описание шага */
  description?: string;
}

/**
 * Диапазон бюджета для букета
 */
export interface BudgetRange {
  /** Идентификатор диапазона */
  id: string;
  /** Название диапазона для отображения */
  label: string;
  /** Минимальная цена диапазона */
  min: number;
  /** Максимальная цена диапазона (null для "от X и выше") */
  max: number | null;
}

/**
 * Данные для запроса на подбор букета
 */
export interface QuizFormData {
  /** Выбранный бюджет */
  budget: string;
  /** Пожелания клиента */
  wishes: string;
  /** Имя клиента */
  name: string;
  /** Телефон для связи */
  phone: string;
  /** Email клиента */
  email?: string;
} 