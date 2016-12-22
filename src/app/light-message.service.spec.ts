/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LightMessageService } from './light-message.service';
//import { MockBackend, MockConnection } from '@angular/http/testing'
import { HttpModule, BaseRequestOptions } from '@angular/http'

/*
const MockHttp = {
    deps: [ MockBackend, BaseRequestOptions]
}
*/
describe('LightMessageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [LightMessageService]
//        { provide: Http, useClass: MockHttp} ]
    });
  });

  it('should ...', inject([LightMessageService], (service: LightMessageService) => {
    expect(service).toBeTruthy();
  }));

  it('should save light sequence', inject([LightMessageService], (service: LightMessageService) => {
    let l1 = {username:"abc", message:{x:44, y:"hello"}};
    service.save(l1, function() {
      console.log("test");
    })
  }));


});
