[@webresto/ng-gql - v1.1.12](../README.md) / [Exports](../modules.md) / EventerService

# Class: EventerService

## Table of contents

### Constructors

- [constructor](EventerService.md#constructor)

### Properties

- [eventMessage](EventerService.md#eventmessage)
- [eventAction](EventerService.md#eventaction)

### Methods

- [emitMessageEvent](EventerService.md#emitmessageevent)
- [emitActionEvent](EventerService.md#emitactionevent)
- [getMessageEmitter](EventerService.md#getmessageemitter)
- [getActionEmitter](EventerService.md#getactionemitter)

## Constructors

### constructor

• **new EventerService**()

## Properties

### eventMessage

• **eventMessage**: `EventEmitter`<`any`\>

___

### eventAction

• **eventAction**: `EventEmitter`<`any`\>

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
