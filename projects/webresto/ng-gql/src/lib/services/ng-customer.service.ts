import { Injectable } from '@angular/core';
import { NgGqlStorageService } from './ng-gql-storage.service';
import { NgGqlService } from './ng-gql.service';

@Injectable({
  providedIn: 'root'
})
export class NgCustomerService {

  constructor(
    private ngGqlService: NgGqlService,
    private ngGqlStorage: NgGqlStorageService,
  ) { }

  
}
