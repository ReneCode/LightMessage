/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LedCellComponent } from './led-cell.component';

describe('LedCellComponent', () => {
  let component: LedCellComponent;
  let fixture: ComponentFixture<LedCellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedCellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
