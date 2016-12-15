/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LedControlService } from './led-control.service';

describe('LedControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LedControlService]
    });
  });

  it('should ...', inject([LedControlService], (service: LedControlService) => {
    expect(service).toBeTruthy();
  }));
});
