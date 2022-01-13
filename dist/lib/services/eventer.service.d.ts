import { EventEmitter } from '@angular/core';
import type { EventMessage } from '../models';
import * as i0 from "@angular/core";
export declare class EventerService {
    eventMessage: EventEmitter<any>;
    eventAction: EventEmitter<any>;
    constructor();
    emitMessageEvent(message: EventMessage): void;
    emitActionEvent(action: EventMessage): void;
    getMessageEmitter(): EventEmitter<any>;
    getActionEmitter(): EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDeclaration<EventerService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<EventerService>;
}
