export interface CaptchaJob {
  id: string;
  task: CaptchaTask;
}

export interface CaptchaTask {
  difficulty: bigint;
  salt: string;
  hash: string;
}

export interface CaptchaJobPayload {
  label: string;
}

export interface Captcha {
  /**
   * Captcha job ID
   */
  id: string;

  /**
   * Resolved captcha
   *  */
  solution: string;
}
