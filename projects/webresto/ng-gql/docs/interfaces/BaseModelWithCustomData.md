# Interface: BaseModelWithCustomData

Базовый интерфейс. описывающий содержимаое свойства customData в той или иной конкретной реализации сервера.
Т.к. структура customData будет одинакова для всех содержащих ее моделей, другие модели наследуюттся от этого базового интерфейса.

## Hierarchy

- **`BaseModelWithCustomData`**

  ↳ [`Dish`](Dish.md)

  ↳ [`Order`](Order.md)

  ↳ [`Phone`](Phone.md)

  ↳ [`PaymentMethod`](PaymentMethod.md)

  ↳ [`Maintenance`](Maintenance.md)

## Table of contents

### Properties

- [customData](BaseModelWithCustomData.md#customdata)

## Properties

### customData

• **customData**: ``null`` \| { `[key: string]`: `string` \| `any` \| ``null``;  }
