import { EventEmitter } from '@angular/core';
import { EventMessage } from '../event-message/event-message';
export declare class EventerService {
    eventMessage: EventEmitter<any>;
    eventAction: EventEmitter<any>;
    constructor();
    emitMessageEvent(message: EventMessage): void;
    emitActionEvent(action: EventMessage): void;
    getMessageEmitter(): EventEmitter<any>;
    getActionEmitter(): EventEmitter<any>;
}
