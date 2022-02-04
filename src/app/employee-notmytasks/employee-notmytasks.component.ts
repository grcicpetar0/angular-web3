import { Component, Input } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-employee-notmytasks',
  templateUrl: './employee-notmytasks.component.html',
  styleUrls: ['./employee-notmytasks.component.css']
})
export class EmployeeNotmytasksComponent {
  constructor(private http: Http) {
  }
  //empid=
  @Input() emp
}
