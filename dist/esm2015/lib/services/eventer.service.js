import { Injectable, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
export class EventerService {
    constructor() {
        this.eventMessage = new EventEmitter();
        this.eventAction = new EventEmitter();
    }
    emitMessageEvent(message) {
        this.eventMessage.emit(message);
    }
    emitActionEvent(action) {
        this.eventAction.emit(action);
    }
    getMessageEmitter() {
        return this.eventMessage;
    }
    getActionEmitter() {
        return this.eventAction;
    }
}
EventerService.ɵfac = function EventerService_Factory(t) { return new (t || EventerService)(); };
EventerService.ɵprov = i0.ɵɵdefineInjectable({ token: EventerService, factory: EventerService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(EventerService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2xpYi9zZXJ2aWNlcy9ldmVudGVyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBTXpELE1BQU0sT0FBTyxjQUFjO0lBSXpCO1FBSEEsaUJBQVksR0FBc0IsSUFBSSxZQUFZLEVBQUUsQ0FBQztRQUNyRCxnQkFBVyxHQUFzQixJQUFJLFlBQVksRUFBRSxDQUFDO0lBRXBDLENBQUM7SUFFakIsZ0JBQWdCLENBQUMsT0FBb0I7UUFDbkMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDbEMsQ0FBQztJQUNELGVBQWUsQ0FBQyxNQUFtQjtRQUNqQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNCLENBQUM7SUFDRCxnQkFBZ0I7UUFDZCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDMUIsQ0FBQzs7NEVBbEJVLGNBQWM7c0RBQWQsY0FBYyxXQUFkLGNBQWMsbUJBRmIsTUFBTTt1RkFFUCxjQUFjO2NBSDFCLFVBQVU7ZUFBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRNZXNzYWdlIH0gZnJvbSAnLi4vZXZlbnQtbWVzc2FnZS9ldmVudC1tZXNzYWdlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRXZlbnRlclNlcnZpY2Uge1xuICBldmVudE1lc3NhZ2U6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBldmVudEFjdGlvbjogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBlbWl0TWVzc2FnZUV2ZW50KG1lc3NhZ2U6RXZlbnRNZXNzYWdlKSB7XG4gICAgdGhpcy5ldmVudE1lc3NhZ2UuZW1pdChtZXNzYWdlKTtcbiAgfVxuICBlbWl0QWN0aW9uRXZlbnQoYWN0aW9uOkV2ZW50TWVzc2FnZSkge1xuICAgIHRoaXMuZXZlbnRBY3Rpb24uZW1pdChhY3Rpb24pO1xuICB9XG5cbiAgZ2V0TWVzc2FnZUVtaXR0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRNZXNzYWdlO1xuICB9XG4gIGdldEFjdGlvbkVtaXR0ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRBY3Rpb247XG4gIH1cbn1cbiJdfQ==