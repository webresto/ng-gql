# Class: EventerService

## Table of contents

### Properties

- [eventMessage](EventerService.md#eventmessage)
- [eventAction](EventerService.md#eventaction)

### Constructors

- [constructor](EventerService.md#constructor)

### Methods

- [emitMessageEvent](EventerService.md#emitmessageevent)
- [emitActionEvent](EventerService.md#emitactionevent)
- [getMessageEmitter](EventerService.md#getmessageemitter)
- [getActionEmitter](EventerService.md#getactionemitter)
- [destroy](EventerService.md#destroy)

## Properties

### eventMessage

• **eventMessage**: `EventEmitter`<[`Message`](../interfaces/Message.md)\>

___

### eventAction

• **eventAction**: `EventEmitter`<[`Action`](../interfaces/Action.md)\>

## Constructors

### constructor

• **new EventerService**(`ngGql`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `ngGql` | [`NgGqlService`](NgGqlService.md) |

## Methods

### emitMessageEvent

▸ **emitMessageEvent**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`Message`](../interfaces/Message.md) |

#### Returns

`void`

___

### emitActionEvent

▸ **emitActionEvent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`Action`](../interfaces/Action.md) |

#### Returns

`void`

___

### getMessageEmitter

▸ **getMessageEmitter**(`orderId`): `Observable`<[`Message`](../interfaces/Message.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `string` |

#### Returns

`Observable`<[`Message`](../interfaces/Message.md)\>

___

### getActionEmitter

▸ **getActionEmitter**(`orderId`): `Observable`<[`Action`](../interfaces/Action.md)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `orderId` | `string` |

#### Returns

`Observable`<[`Action`](../interfaces/Action.md)\>

___

### destroy

▸ **destroy**(): `void`

#### Returns

`void`
