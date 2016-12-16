/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LightMessageService } from './light-message.service';

describe('LightMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LightMessageService]
    });
  });

  it('should ...', inject([LightMessageService], (service: LightMessageService) => {
    expect(service).toBeTruthy();
  }));
});
