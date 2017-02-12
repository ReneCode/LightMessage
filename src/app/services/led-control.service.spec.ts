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

  it('should set/get color', inject([LedControlService], (service: LedControlService) => {
    let color = '#123';
    service.setColor(color)
    expect(service.getColor()).toBe(color);
  }));


});
