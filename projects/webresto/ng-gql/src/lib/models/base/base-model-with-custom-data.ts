/**
 * Базовый интерфейс. описывающий содержимаое свойства customData в той или иной конкретной реализации сервера.
 * Т.к. структура customData будет одинакова для всех содержащих ее моделей, другие модели наследуюттся от этого базового интерфейса.
 */
export interface BaseModelWithCustomData {
  customData: {
    [key: string]: string | any | null;
  } | null;
}
