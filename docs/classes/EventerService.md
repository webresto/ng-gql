[@webresto/ng-gql](../README.md) / [Exports](../modules.md) / EventerService

# Class: EventerService

## Table of contents

### Constructors

- [constructor](EventerService.md#constructor)

### Properties

- [eventAction](EventerService.md#eventaction)
- [eventMessage](EventerService.md#eventmessage)

### Methods

- [emitActionEvent](EventerService.md#emitactionevent)
- [emitMessageEvent](EventerService.md#emitmessageevent)
- [getActionEmitter](EventerService.md#getactionemitter)
- [getMessageEmitter](EventerService.md#getmessageemitter)

## Constructors

### constructor

• **new EventerService**()

#### Defined in

lib/services/eventer.service.ts:11

## Properties

### eventAction

• **eventAction**: `EventEmitter`<`any`\>

#### Defined in

lib/services/eventer.service.ts:9

___

### eventMessage

• **eventMessage**: `EventEmitter`<`any`\>

#### Defined in

lib/services/eventer.service.ts:8

## Methods

### emitActionEvent

▸ **emitActionEvent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`EventMessage`](EventMessage.md) |

#### Returns

`void`

#### Defined in

lib/services/eventer.service.ts:16

___

### emitMessageEvent

▸ **emitMessageEvent**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`EventMessage`](EventMessage.md) |

#### Returns

`void`

#### Defined in

lib/services/eventer.service.ts:13

___

### getActionEmitter

▸ **getActionEmitter**(): `EventEmitter`<`any`\>

#### Returns

`EventEmitter`<`any`\>

#### Defined in

lib/services/eventer.service.ts:23

___

### getMessageEmitter

▸ **getMessageEmitter**(): `EventEmitter`<`any`\>

#### Returns

`EventEmitter`<`any`\>

#### Defined in

lib/services/eventer.service.ts:20
