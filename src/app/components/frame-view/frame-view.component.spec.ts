/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FrameViewComponent } from './frame-view.component';

describe('FrameViewComponent', () => {
  let component: FrameViewComponent;
  let fixture: ComponentFixture<FrameViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrameViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
