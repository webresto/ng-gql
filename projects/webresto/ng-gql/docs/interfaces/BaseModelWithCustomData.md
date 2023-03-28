# Interface: BaseModelWithCustomData

Базовый интерфейс. описывающий содержимаое свойства customData в той или иной конкретной реализации сервера.
Т.к. структура customData будет одинакова для всех содержащих ее моделей, другие модели наследуюттся от этого базового интерфейса.

## Hierarchy

- **`BaseModelWithCustomData`**

  ↳ [`Dish`](Dish.md)

  ↳ [`Order`](Order.md)

  ↳ [`PaymentMethod`](PaymentMethod.md)

  ↳ [`Maintenance`](Maintenance.md)

  ↳ [`PhoneKnowledge`](PhoneKnowledge.md)

  ↳ [`User`](User.md)

  ↳ [`BonusProgram`](BonusProgram.md)

  ↳ [`UserBonusProgram`](UserBonusProgram.md)

  ↳ [`UserBonusTransaction`](UserBonusTransaction.md)

  ↳ [`UserDevice`](UserDevice.md)

  ↳ [`UserLocation`](UserLocation.md)

  ↳ [`OneTimePassword`](OneTimePassword.md)

  ↳ [`UserOrderHystory`](UserOrderHystory.md)

## Table of contents

### Properties

- [customData](BaseModelWithCustomData.md#customdata)

## Properties

### customData

• **customData**: ``null`` \| { `[key: string]`: `string` \| `any` \| ``null``;  }
