import { Injectable, EventEmitter } from '@angular/core';
import { mergeWith } from 'rxjs/operators';
import type { Action, Message } from '../models';
import { NgGqlService } from './ng-gql.service';

@Injectable({
  providedIn: 'root'
})
export class EventerService {

  eventMessage: EventEmitter<Message> = new EventEmitter();
  eventAction: EventEmitter<Action> = new EventEmitter();

  constructor(private ngGql: NgGqlService) { }

  emitMessageEvent(message: Message) {
    this.eventMessage.emit(message);
  }
  emitActionEvent(action: Action) {
    this.eventAction.emit(action);
  }

  getMessageEmitter(orderId: string) {
    return this.ngGql.customSubscribe$<Message, 'message'>('message', {
      title: true,
      type: true,
      message: true
    }, {
      orderId
    }).pipe(
      mergeWith(this.eventMessage.asObservable())
    );
  }

  getActionEmitter(orderId: string) {
    return this.ngGql.customSubscribe$<Action, 'action'>('action', {
      type: true,
      data: true
    }, {
      orderId
    }).pipe(
      mergeWith(this.eventAction.asObservable())
    );
  }

  destroy() {
    [this.eventAction, this.eventMessage].forEach(
      eventEmitter => eventEmitter.complete()
    );
  }

}
