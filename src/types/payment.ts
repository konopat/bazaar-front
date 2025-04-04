/**
 * Способ оплаты заказа
 */
export interface PaymentMethod {
  /** Идентификатор способа оплаты */
  id: number;
  /** Название способа оплаты */
  name: string;
  /** Описание способа оплаты */
  description: string;
  /** Название иконки для визуального отображения */
  icon: string;
  /** Порядок отображения в списке */
  order?: number;
  /** Флаг доступности способа оплаты */
  isAvailable?: boolean;
}

/**
 * Данные формы оплаты
 */
export interface PaymentFormData {
  /** Выбранный способ оплаты */
  paymentMethodId: number;
  /** Номер карты (для оплаты картой) */
  cardNumber?: string;
  /** Имя держателя карты (для оплаты картой) */
  cardHolder?: string;
  /** Срок действия карты (для оплаты картой) */
  cardExpiry?: string;
  /** CVC/CVV код (для оплаты картой) */
  cardCvc?: string;
  /** Телефон (для оплаты через мобильный банк) */
  phone?: string;
}

/**
 * Данные для формы контактов в процессе оформления заказа
 */
export interface ContactFormData {
  /** Имя клиента */
  name: string;
  /** Email клиента */
  email: string;
  /** Телефон клиента */
  phone: string;
  /** Комментарий к заказу */
  message: string;
} 