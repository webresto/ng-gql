# Class: EventerService

## Table of contents

### Constructors

- [constructor](./classes/EventerService.md#constructor)

### Properties

- [eventMessage](./classes/EventerService.md#eventmessage)
- [eventAction](./classes/EventerService.md#eventaction)

### Methods

- [emitMessageEvent](./classes/EventerService.md#emitmessageevent)
- [emitActionEvent](./classes/EventerService.md#emitactionevent)
- [getMessageEmitter](./classes/EventerService.md#getmessageemitter)
- [getActionEmitter](./classes/EventerService.md#getactionemitter)

## Constructors

### <a id="constructor" name="constructor"></a> constructor

• **new EventerService**()

## Properties

### <a id="eventmessage" name="eventmessage"></a> eventMessage

• **eventMessage**: `EventEmitter`<`any`\>

___

### <a id="eventaction" name="eventaction"></a> eventAction

• **eventAction**: `EventEmitter`<`any`\>

## Methods

### <a id="emitmessageevent" name="emitmessageevent"></a> emitMessageEvent

▸ **emitMessageEvent**(`message`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `message` | [`EventMessage`](./classes/EventMessage.md) |

#### Returns

`void`

___

### <a id="emitactionevent" name="emitactionevent"></a> emitActionEvent

▸ **emitActionEvent**(`action`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`EventMessage`](./classes/EventMessage.md) |

#### Returns

`void`

___

### <a id="getmessageemitter" name="getmessageemitter"></a> getMessageEmitter

▸ **getMessageEmitter**(): `EventEmitter`<`any`\>

#### Returns

`EventEmitter`<`any`\>

___

### <a id="getactionemitter" name="getactionemitter"></a> getActionEmitter

▸ **getActionEmitter**(): `EventEmitter`<`any`\>

#### Returns

`EventEmitter`<`any`\>
