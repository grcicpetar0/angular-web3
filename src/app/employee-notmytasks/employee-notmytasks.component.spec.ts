import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeNotmytasksComponent } from './employee-notmytasks.component';

describe('EmployeeNotmytasksComponent', () => {
  let component: EmployeeNotmytasksComponent;
  let fixture: ComponentFixture<EmployeeNotmytasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeNotmytasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeNotmytasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
