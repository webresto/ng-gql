# Interface: DialogBoxButton

## Hierarchy

- `DialogBoxBase`

  ↳ **`DialogBoxButton`**

## Table of contents

### Properties

- [askId](DialogBoxButton.md#askid)
- [allowClosing](DialogBoxButton.md#allowclosing)
- [type](DialogBoxButton.md#type)
- [message](DialogBoxButton.md#message)
- [title](DialogBoxButton.md#title)
- [timeout](DialogBoxButton.md#timeout)
- [defaultOptionId](DialogBoxButton.md#defaultoptionid)
- [options](DialogBoxButton.md#options)
- [optionsType](DialogBoxButton.md#optionstype)

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

### defaultOptionId

• `Optional` **defaultOptionId**: `string`

If no response comes, the backend will do it automatically
Also the frontend can send this by default
In conjunction with timeout, this could be a countdown on a button

#### Inherited from

DialogBoxBase.defaultOptionId

___

### options

• **options**: [`DialogOptionButton`](DialogOptionButton.md)[]

___

### optionsType

• **optionsType**: ``"button"``
