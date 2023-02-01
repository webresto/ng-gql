export interface CaptchaJob {
  id: string
  task: string
}

export interface Captcha {
  /**
   * Captcha job ID
  */
  id: string

  /**
   * Resolved captcha
   *  */
  solution: string
}