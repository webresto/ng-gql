import { InjectionToken } from '@angular/core';
import { CaptchaJob } from './captcha';
import { ValuesOrBoolean } from '../values-or-boolean';
/**
 * InjectionToken с объектом ValuesOrBoolean<CaptchaJob>.
 */
export const CAPTCHA_GET_JOB_FRAGMENTS = new InjectionToken<
  ValuesOrBoolean<CaptchaJob>
>('CAPTCHA_GET_JOB_FRAGMENTS', {
  factory: () => {
    return {
      id: true,
      task: true,
    };
  },
});