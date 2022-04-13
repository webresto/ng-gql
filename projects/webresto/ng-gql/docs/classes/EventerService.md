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

## Properties

### eventMessage

• **eventMessage**: `EventEmitter`<`any`\>

___

### eventAction

• **eventAction**: `EventEmitter`<`any`\>

## Constructors

### constructor

• **new EventerService**()

## Methods

### emitMessageEvent

▸ **emitMessageEvent**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`EventMessage`](EventMessage.md) |

#### Returns

`void`

___

### emitActionEvent

▸ **emitActionEvent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`EventMessage`](EventMessage.md) |

#### Returns

`void`

___

### getMessageEmitter

▸ **getMessageEmitter**(): `EventEmitter`<`any`\>

#### Returns

`EventEmitter`<`any`\>

___

### getActionEmitter

▸ **getActionEmitter**(): `EventEmitter`<`any`\>

#### Returns

`EventEmitter`<`any`\>
