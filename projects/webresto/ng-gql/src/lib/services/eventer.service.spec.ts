import { TestBed, inject } from '@angular/core/testing';

import { EventerService } from './eventer.service';

describe('EventerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventerService]
    });
  });

  it('should be created', inject([EventerService], (service: EventerService) => {
    expect(service).toBeTruthy();
  }));
});
