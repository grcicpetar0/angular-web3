import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeMytasksComponent } from './employee-mytasks.component';

describe('EmployeeMytasksComponent', () => {
  let component: EmployeeMytasksComponent;
  let fixture: ComponentFixture<EmployeeMytasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeMytasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeMytasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
