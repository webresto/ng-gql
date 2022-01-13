import { TestBed } from '@angular/core/testing';

import { NgGqlService } from './ng-gql.service';

describe('NgGqlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgGqlService = TestBed.get(NgGqlService);
    expect(service).toBeTruthy();
  });
});
