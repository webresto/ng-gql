import { InjectionToken } from '@angular/core';
import type { ValuesOrBoolean } from '../values-or-boolean';

export class EventMessage {
  type: string;
  title: string;
  body: string;

  constructor(type: string, title: string, body: string) {
    this.type = type;
    this.title = title;
    this.body = body;
  }
}

export interface Message {
  title: string;
  type: string;
  message: string;
}

export interface Action<T = any> {
  type: string;
  data: T;
}

export const messageFragments: ValuesOrBoolean<Message> = {
  type: true,
  title: true,
  message: true
};

export const actionFragments: ValuesOrBoolean<Action> = {
  data: true,
  type: true
};

/**
 * InjectionToken с объектом ValuesOrBoolean<Message>, используемым в запросе Message с сервера.
 */
export const MESSAGE_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Message>>(
  'MESSAGE_FRAGMENTS', {
  providedIn: 'root',
  factory: () => ({ ...messageFragments })
});

/**
 * InjectionToken с объектом ValuesOrBoolean<Action>, используемым в запросе Action с сервера.
 */
export const ACTION_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Action>>(
  'ACTION_FRAGMENTS', {
  providedIn: 'root',
  factory: () => ({ ...actionFragments })
});