import { Component, Input } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-employee-manage',
  templateUrl: './employee-manage.component.html',
  styleUrls: ['./employee-manage.component.css']
})
export class EmployeeManageComponent {
  constructor(private http: Http) {
  }

  @Input() emp

  remove(taskToRemove) {
    this.http.delete('/api/tasks/' + taskToRemove._id)
      .toPromise()
      .then(() => this.emp.tasks = this.emp.tasks.filter(task => task != taskToRemove))
      .catch(function (err) {
        console.log(err);
      });
  }

  add(taskToAdd) {
    let wasRecurring = this.newItemIsRecurring;
    this.newItemIsRecurring = false;
    this.http.post('/api/tasks', {text: taskToAdd, done: false, empid: this.emp._id, recurring: wasRecurring})
      .toPromise()
      .then(response => {
        this.emp.tasks =
          [
            ...this.emp.tasks,
            {text: taskToAdd, done: false, empid: this.emp._id, _id: response.json(), recurring: wasRecurring}
          ];
      })
      .catch(function (err) {
        console.log(err);
      });
  }

  newItemIsRecurring = false;
}
