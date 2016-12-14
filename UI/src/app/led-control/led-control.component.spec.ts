/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LedControlComponent } from './led-control.component';

describe('LedControlComponent', () => {
  let component: LedControlComponent;
  let fixture: ComponentFixture<LedControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
