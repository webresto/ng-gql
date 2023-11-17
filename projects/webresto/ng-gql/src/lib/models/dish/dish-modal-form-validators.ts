import {AbstractControl, ValidationErrors} from '@angular/forms';
import {isValue} from '@axrl/common';
import {GroupModifier} from '../group-modifier';
import {Modifier} from '../modifier';
import {Dish} from './dish';

export function groupModifierFormValidator(control: AbstractControl): ValidationErrors | null {
  const value = <Partial<GroupModifier<Dish>>>control.value;
  const groupAmount = value.childModifiers?.reduce(
    (total, current) => total + (current.amount || 0),
    0,
  );
  if (value.minAmount == 0 && value.maxAmount == 0) {
    return null;
  } else {
    if (
      isValue(value.group) &&
      isValue(value.minAmount) &&
      isValue(groupAmount) &&
      isValue(value.group?.name) &&
      groupAmount < value.minAmount
    ) {
      return {
        [value.group.name]: `Нужно выбрать не менее ${value.minAmount} для этой опции.`,
      };
    } else {
      if (
        isValue(value.group) &&
        isValue(value.group?.name) &&
        isValue(groupAmount) &&
        isValue(value.maxAmount) &&
        groupAmount > value.maxAmount
      ) {
        return {
          [value.group.name]:
            `Можно добавить не более ${value.maxAmount} доп. опций. в этой группе опций.`,
        };
      } else {
        return null;
      }
    }
  }
}

export function modifierFormValidator(control: AbstractControl): ValidationErrors | null {
  const value = <Partial<Modifier<Dish>>>control.value;
  const amount = value.amount || value.defaultAmount || 0;
  if (value.minAmount == 0 && value.maxAmount == 0) {
    return null;
  } else {
    if (
      isValue(value.dish) &&
      isValue(value.dish.name) &&
      isValue(value.minAmount) &&
      amount < value.minAmount
    ) {
      return {
        [value.dish.name]: `Нужно выбрать не менее ${value.minAmount} для этой опции.`,
      };
    } else {
      if (
        isValue(value.dish) &&
        isValue(value.dish.name) &&
        isValue(value.maxAmount) &&
        amount > value.maxAmount
      ) {
        return {
          [value.dish.name]: `Можно добавить не более ${value.maxAmount} таких доп. опций.`,
        };
      } else {
        return null;
      }
    }
  }
}
