/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FrameControlComponent } from './frame-control.component';

describe('FrameControlComponent', () => {
  let component: FrameControlComponent;
  let fixture: ComponentFixture<FrameControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrameControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
