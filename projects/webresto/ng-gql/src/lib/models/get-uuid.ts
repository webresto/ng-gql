import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { isValue } from '@axrl/common';

export function generateUUID(win: (Window & typeof globalThis) | null) {
  if (isValue(win) && isValue(win.crypto) && isValue(win.crypto.randomUUID)) {
    return win.crypto.randomUUID();
  } else {
    return `${Date.now()}${String(Math.random()).slice(3)}`;
  }
}

@Injectable({
  providedIn: 'root',
})
export class GenerateUUIDHelper {
  private win: (Window & typeof globalThis) | null;
  constructor() {
    this.win = inject(DOCUMENT).defaultView;
  }

  getGUID(): string {
    return generateUUID(this.win);
  }
}
