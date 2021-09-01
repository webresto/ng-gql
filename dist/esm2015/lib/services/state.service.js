import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as i0 from "@angular/core";
export class StateService {
    constructor() {
        this.maintenance$ = new BehaviorSubject(null);
    }
}
StateService.ɵfac = function StateService_Factory(t) { return new (t || StateService)(); };
StateService.ɵprov = i0.ɵɵdefineInjectable({ token: StateService, factory: StateService.ɵfac, providedIn: 'root' });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(StateService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return []; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9saWIvc2VydmljZXMvc3RhdGUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFlLE1BQU0sZUFBZSxDQUFDO0FBQ3hELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxNQUFNLENBQUM7O0FBS3ZDLE1BQU0sT0FBTyxZQUFZO0lBR3ZCO1FBQ0UsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLGVBQWUsQ0FBTSxJQUFJLENBQUMsQ0FBQztJQUNyRCxDQUFDOzt3RUFMVSxZQUFZO29EQUFaLFlBQVksV0FBWixZQUFZLG1CQUZYLE1BQU07dUZBRVAsWUFBWTtjQUh4QixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFN0YXRlU2VydmljZSB7XG4gIG1haW50ZW5hbmNlJDogQmVoYXZpb3JTdWJqZWN0PGFueT47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5tYWludGVuYW5jZSQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGFueT4obnVsbCk7XG4gIH1cbn1cbiJdfQ==