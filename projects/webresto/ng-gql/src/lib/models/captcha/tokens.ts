import {InjectionToken} from '@angular/core';
import {ValuesOrBoolean} from '../values-or-boolean';
import {CaptchaJob} from './captcha';
/**
 * InjectionToken с объектом ValuesOrBoolean<CaptchaJob>.
 */
export const CAPTCHA_GET_JOB_FRAGMENTS = new InjectionToken<ValuesOrBoolean<CaptchaJob>>(
  'CAPTCHA_GET_JOB_FRAGMENTS',
  {
    factory: (): ValuesOrBoolean<CaptchaJob> => {
      return {
        id: true,
        task: true,
      };
    },
  },
);
