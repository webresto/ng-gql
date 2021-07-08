import { Injectable, EventEmitter } from '@angular/core';
import { EventMessage } from '../event-message/event-message';

@Injectable({
  providedIn: 'root'
})
export class EventerService {
  eventMessage: EventEmitter<any> = new EventEmitter();
  eventAction: EventEmitter<any> = new EventEmitter();

  constructor() { }

  emitMessageEvent(message:EventMessage) {
    this.eventMessage.emit(message);
  }
  emitActionEvent(action:EventMessage) {
    this.eventAction.emit(action);
  }

  getMessageEmitter() {
    return this.eventMessage;
  }
  getActionEmitter() {
    return this.eventAction;
  }
}
