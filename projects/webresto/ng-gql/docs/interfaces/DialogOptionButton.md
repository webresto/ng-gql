# Interface: DialogOptionButton

## Hierarchy

- `DialogOptionBase`

  ↳ **`DialogOptionButton`**

## Table of contents

### Properties

- [id](DialogOptionButton.md#id)
- [label](DialogOptionButton.md#label)
- [button](DialogOptionButton.md#button)

## Properties

### id

• **id**: `string`

#### Inherited from

DialogOptionBase.id

___

### label

• **label**: `string`

#### Inherited from

DialogOptionBase.label

___

### button

• `Optional` **button**: `Object`

By default:
* 1st - primary, 2st - secondary, 3 - link, 4 - abort
* 1st - primary, 2st - secondary, 3 - abort
* 1st - primary, 2st - secondary
* 1st - primary

#### Type declaration

| Name | Type |
| :------ | :------ |
| `type` | ``"primary"`` \| ``"secondary"`` \| ``"link"`` \| ``"abort"`` |
