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
  allDone() {
    return this.employees.every(employee=>employee.tasks.every(task=>task.done));
  }

  add(taskToAdd){
    // console.log("adding task" + taskToAdd);
    // console.log("employees " + JSON.stringify(this.employees));
    console.log("selected emps" + JSON.stringify(this.selectedEmps));

    let wasRecurring  = this.newItemIsRecurring;
    this.newItemIsRecurring = false;
    for(let empId in this.selectedEmps){
      if(this.selectedEmps[empId]) {
        // console.log("adding to" + empId);

        this.http.post('/api/tasks', {text: taskToAdd, done: false, empid: empId, recurring: wasRecurring})
          .toPromise()
          .then(response => {
            let e = this.employees.find(emp => emp._id === empId);
            e.tasks =
              [
                ...e.tasks,
                {text: taskToAdd, done: false, empid: empId, _id: response.json(), recurring: wasRecurring}
              ];
          })
          .catch(function (err) {
            console.log(err);
          });
      }
    }
  }

  newItemIsRecurring = false;

  selectedEmps = {};
}
