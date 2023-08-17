import {InjectionToken} from '@angular/core';
import {ValuesOrBoolean} from '../values-or-boolean';
import {Action, Message} from './event-message';

/**
 * InjectionToken с объектом ValuesOrBoolean<Message>, используемым в запросе Message с сервера.
 */
export const MESSAGE_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Message>>('MESSAGE_FRAGMENTS', {
  factory: (): ValuesOrBoolean<Message> => ({id: true, type: true, title: true, message: true}),
});

/**
 * InjectionToken с объектом ValuesOrBoolean<Action>, используемым в запросе Action с сервера.
 */
export const ACTION_FRAGMENTS = new InjectionToken<ValuesOrBoolean<Action>>('ACTION_FRAGMENTS', {
  factory: (): ValuesOrBoolean<Action> => ({id: true, data: true, type: true}),
});
