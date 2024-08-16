import {formatDate} from '@angular/common';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {isValue} from '@axrl/common';
import {ScanFormType} from '@axrl/ngx-extended-form-builder';
import {
  RestrictionsOrder,
  WorkTime,
  WorkTimeValidator,
  ScheduleValidator,
  TimeZoneIdentifier,
} from '@webresto/worktime';
import {OrderForm} from './order';

function setErrorsToControl(
  errors: ValidationErrors | null,
  control: AbstractControl | undefined,
): ValidationErrors | null {
  if (!isValue(control)) {
    return null;
  }

  if (isValue(errors)) {
    control.setErrors(errors);
  } else {
    if (isValue(control.errors)) {
      control.updateValueAndValidity({
        onlySelf: true,
      });
    }
  }

  return null;
}

export function orderDateValidator(
  restrictionsData: RestrictionsOrder | null | undefined,
  scheduleValidator: ScheduleValidator,
): ValidatorFn {
  return (control: AbstractControl<string | null>) => {
    const controlValue: string | null = control.value;
    if (isValue(controlValue)) {
      if (!isValue(restrictionsData)) {
        // eslint-disable-next-line no-console
        console.log(restrictionsData, 1222);
        return {['Error']: 'restrictions not defined'};
      } else {
        const tzOffset: string = TimeZoneIdentifier.getTimeZoneGMTOffsetfromNameZone(
          restrictionsData.timezone,
        );

        // Если интервал не задан то валидатор пропустит это, в дальнейщем планируется что время работы будет только определятся через интервалы.
        if (!scheduleValidator.schedule || !scheduleValidator.schedule.length) {
          return null;
        }

        if (scheduleValidator.doesTimeFallWithin(new Date(`${controlValue} ${tzOffset}`))) {
          return null;
        } else {
          return {['Order date']: 'Orders are not possible at this time'};
        }
      }
    } else {
      return {['Error']: 'order date is corupted'};
    }
  };
}

export function deliveryDateValidator(
  restrictionsData: RestrictionsOrder | null | undefined,
  workTimeValidator: WorkTimeValidator,
): ValidatorFn {
  return (control: AbstractControl<string | null>) => {
    const controlValue: string | null = control.value;

    if (isValue(controlValue)) {
      const [deliveryDate, deliveryTime] = controlValue.split(' ');
      if (!isValue(restrictionsData)) {
        return {['Дата доставки']: 'Не удалось проверить дату доставки'};
      } else {
        const dateMin = workTimeValidator
          .getPossibleDelieveryOrderDateTime(restrictionsData, new Date())
          .split(' ')[0];

        if (deliveryDate && dateMin) {
          const timeNow = new Date(
            formatDate(deliveryDate, `yyyy-MM-dd ${deliveryTime}`, 'en'),
          ).getTime();
          const timeFrom = new Date(dateMin).getTime();
          const timeTo = new Date(
            formatDate(
              Date.now() + 60 * 1000 * restrictionsData.possibleToOrderInMinutes,
              'yyyy-MM-dd 00:00',
              'en',
            ),
          ).getTime();

          if (timeNow < timeFrom || timeNow > timeTo) {
            return {['Дата доставки']: 'Доставка в эту дату невозможна'};
          } else {
            return null;
          }
        } else {
          return {
            ['Дата доставки']: 'Доставка не указана или указана не верно',
          };
        }
      }
    } else {
      return null;
    }
  };
}

export function deliveryTimeValidator(
  restrictionsData: RestrictionsOrder | null | undefined,
  workTimeValidator: WorkTimeValidator,
): ValidatorFn {
  return control => {
    const controlValue: string | null = control.value;

    if (isValue(controlValue)) {
      const [deliveryDate, deliveryTime] = controlValue.split(' ');

      if (!isValue(restrictionsData)) {
        return {['Время доставки']: 'Не удалось проверить время доставки'};
      } else {
        if (isValue(deliveryDate)) {
          const formSelectedDate = new Date(controlValue);
          const time = workTimeValidator.getTimeFromString(deliveryTime);
          let currentDayWorkTime = workTimeValidator.getCurrentWorkTime(
            restrictionsData,
            formSelectedDate,
          );
          if (
            control.parent?.parent?.value.selfService &&
            isValue(currentDayWorkTime.selfService)
          ) {
            currentDayWorkTime = currentDayWorkTime.selfService as WorkTime;
          }
          if (
            time <
              workTimeValidator.getTimeFromString(currentDayWorkTime.start) +
                (+restrictionsData.minDeliveryTimeInMinutes || 0) ||
            time > workTimeValidator.getTimeFromString(currentDayWorkTime.stop)
          ) {
            return {
              ['Время доставки']: `Доставка в это время невозможна. Время работы ${formatDate(
                deliveryDate ?? Date.now(),
                'dd.MM.yyyy',
                'ru',
              )} с ${currentDayWorkTime.start} до ${
                currentDayWorkTime.stop
              } (минимальное время доставки - ${restrictionsData.minDeliveryTimeInMinutes} минут)`,
            };
          } else {
            const minTimeString = workTimeValidator
              .getPossibleDelieveryOrderDateTime(restrictionsData, new Date(deliveryDate))
              .split(' ')[1];
            const minTime = workTimeValidator.getTimeFromString(minTimeString);
            const today = formatDate(Date.now(), 'yyyy-MM-dd', 'ru');

            if (deliveryDate == today && time < minTime) {
              return {
                ['Время доставки']: `Время доставки не может быть раньше ближайшего. Ближайшее время доставки = ${minTimeString}.`,
              };
            } else {
              return null;
            }
          }
        } else {
          return {
            ['Время доставки']: 'Время доставки не указано, или указано не верно',
          };
        }
      }
    } else {
      return null;
    }
  };
}

export function addressStreetValidator(form: AbstractControl): ValidationErrors | null {
  const formValue = form.value;
  const control = (<ScanFormType<OrderForm>>form).controls?.address?.controls?.street;
  const controlValue = control?.value;
  const isDelieveryToAddress = !formValue.selfService && !isValue(formValue.locationId);

  const errors =
    isDelieveryToAddress && (!isValue(controlValue) || controlValue === '')
      ? {['Street']: 'Required'}
      : null;
  return setErrorsToControl(errors, control);
}

export function addressStreetIdValidator(form: AbstractControl): ValidationErrors | null {
  const formValue = form.value;
  const controlStreetId = (<ScanFormType<OrderForm>>form).controls?.address?.controls?.streetId;
  const controlStreet = (<ScanFormType<OrderForm>>form).controls?.address?.controls?.street;
  const controlValue = controlStreetId?.value;
  const isDelieveryToAddress = !formValue.selfService && !isValue(formValue.locationId);

  const errors =
    isDelieveryToAddress && (!isValue(controlValue) || controlValue === '')
      ? {['Street']: 'You need to select from the list'}
      : null;
  return setErrorsToControl(errors, controlStreet);
}

export function addressHomeValidator(form: AbstractControl): ValidationErrors | null {
  const formValue = form.value;
  const control = (<ScanFormType<OrderForm>>form).controls?.address?.controls?.home;
  const controlValue = control?.value;
  const isDelieveryToAddress = !formValue.selfService && !isValue(formValue.locationId);

  const errors =
    isDelieveryToAddress && (!isValue(controlValue) || controlValue === '')
      ? {['Home']: 'Required'}
      : null;
  return setErrorsToControl(errors, control);
}

export function contactMethodValidator(form: AbstractControl): ValidationErrors | null {
  const control = (<ScanFormType<OrderForm>>form).controls.contactMethods;
  const controlValues = control?.value;

  const errors =
    Array.isArray(controlValues) &&
    controlValues?.length > 0 &&
    (isValue(controlValues?.[0]) || controlValues?.[0] !== '')
      ? null
      : {['Contact method']: 'Required'};

  return setErrorsToControl(errors, control);
}

export function pickupPointIdValidator(form: AbstractControl): ValidationErrors | null {
  const selfService: boolean = form.value?.selfService;
  const control = <AbstractControl<string> | undefined>(
    (<ScanFormType<OrderForm>>form).controls?.pickupPoint?.controls?.id
  );
  const controlValue = control?.value;

  const errors =
    selfService && (!isValue(controlValue) || controlValue === '')
      ? {
          ['Pickup address']: 'Pickup address not selected.',
        }
      : null;
  return setErrorsToControl(errors, control);
}

export function isReqiredFieldValidator(controlName: string): ValidatorFn {
  return control =>
    !isValue(control.value) || control.value === '' ? {[controlName]: 'Required'} : null;
}
