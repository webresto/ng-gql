import { EventEmitter } from '@angular/core';
import { EventMessage } from '../event-message/event-message';
import * as i0 from "@angular/core";
export declare class EventerService {
    eventMessage: EventEmitter<any>;
    eventAction: EventEmitter<any>;
    constructor();
    emitMessageEvent(message: EventMessage): void;
    emitActionEvent(action: EventMessage): void;
    getMessageEmitter(): EventEmitter<any>;
    getActionEmitter(): EventEmitter<any>;
    static ɵfac: i0.ɵɵFactoryDef<EventerService, never>;
    static ɵprov: i0.ɵɵInjectableDef<EventerService>;
}
//# sourceMappingURL=eventer.service.d.ts.map