import { Component, OnInit } from '@angular/core';
import { Headers, Http } from '@angular/http';

import { AuthService } from '../auth.service'

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css']
})
export class EmployeeViewComponent {

  constructor(private http: Http, public auth: AuthService) {
    this.http.get('/api/employees')
      .toPromise()
      .then(response => {
        this.employees = response.json();
        this.emp = this.employees.find(e => e._id === this.auth.empInfo._id);
        // console.log(this.employees);
      })
      .catch(function(err){console.log(err);});
  }
  employees = [];
  emp;
  
  notMeFilter = (e)=> e._id !== this.auth.empInfo._id;

}
