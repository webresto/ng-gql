import { TestBed } from '@angular/core/testing';

import { NgCartService } from './ng-cart.service';

describe('CartService', () => {
  let service: NgCartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgCartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
