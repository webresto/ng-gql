# Interface: SendOrderInput

SendOrderInput
Данные для отправки оформленного заказа
orderId - id оформляемого заказа
orderIdFactory - необязательная фабричная функция для кастомной генерации id нового заказа, в случае успешного ответа API.
По умолчанию (если orderIdFactory не передавался) в качестве id нового заказа будет отправлено undefined и id будет сгенерирован на стороне сервера API.

## Table of contents

### Properties

- [orderId](SendOrderInput.md#orderid)
- [orderIdFactory](SendOrderInput.md#orderidfactory)

## Properties

### orderId

• **orderId**: `string`

___

### orderIdFactory

• `Optional` **orderIdFactory**: () => `undefined` \| `string`

#### Type declaration

▸ (): `undefined` \| `string`

##### Returns

`undefined` \| `string`
