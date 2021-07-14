import { Injectable,EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  maintenance$: BehaviorSubject<any>;

  constructor() {
    this.maintenance$ = new BehaviorSubject<any>(null);
  }
}
