import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-employer-view',
  templateUrl: './employer-view.component.html',
  styleUrls: ['./employer-view.component.css']
})
export class EmployerViewComponent {
  constructor(private http: Http) {
    this.http.get('/api/employees')
      .toPromise()
      .then(response => this.employees = response.json())
      .catch(function(err){console.log(err);});
  }
  employees = []
}
