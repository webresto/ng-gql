# Interface: DialogBoxProduct

## Hierarchy

- `DialogBoxBase`

  ↳ **`DialogBoxProduct`**

## Table of contents

### Properties

- [askId](DialogBoxProduct.md#askid)
- [allowClosing](DialogBoxProduct.md#allowclosing)
- [type](DialogBoxProduct.md#type)
- [message](DialogBoxProduct.md#message)
- [title](DialogBoxProduct.md#title)
- [timeout](DialogBoxProduct.md#timeout)
- [emitTime](DialogBoxProduct.md#emittime)
- [defaultOptionId](DialogBoxProduct.md#defaultoptionid)
- [options](DialogBoxProduct.md#options)
- [optionsType](DialogBoxProduct.md#optionstype)

## Properties

### askId

• `Optional` **askId**: `string`

#### Inherited from

DialogBoxBase.askId

___

### allowClosing

• `Optional` **allowClosing**: `boolean`

Allowed to close dialog box
If the dialogue closes, then there is no need to respond to it. You're just allowed to close it and that's it
by deafult: should be `true`

#### Inherited from

DialogBoxBase.allowClosing

___

### type

• `Optional` **type**: ``"routine"`` \| ``"critical"``

type of interactive dialogue
by default `routine`

#### Inherited from

DialogBoxBase.type

___

### message

• **message**: `string`

#### Inherited from

DialogBoxBase.message

___

### title

• **title**: `string`

#### Inherited from

DialogBoxBase.title

___

### timeout

• `Optional` **timeout**: `number`

If passed;
After this moment the dialogue will fade away
It is recommended to close it automaticaly

#### Inherited from

DialogBoxBase.timeout

___

### emitTime

• **emitTime**: `number`

Unix timestamp when message emitted

#### Inherited from

DialogBoxBase.emitTime

___

### defaultOptionId

• `Optional` **defaultOptionId**: `string`

If no response comes, the backend will do it automatically
Also the frontend can send this by default
In conjunction with timeout, this could be a countdown on a button

#### Inherited from

DialogBoxBase.defaultOptionId

___

### options

• **options**: [`DialogOptionProduct`](DialogOptionProduct.md)[]

___

### optionsType

• **optionsType**: ``"product"``
