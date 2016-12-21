/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LedGridComponent } from './led-grid.component';

xdescribe('LedGridComponent', () => {
  let component: LedGridComponent;
  let fixture: ComponentFixture<LedGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
