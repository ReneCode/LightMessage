/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FrameListComponent } from './frame-list.component';

describe('FrameListComponent', () => {
  let component: FrameListComponent;
  let fixture: ComponentFixture<FrameListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FrameListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FrameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
