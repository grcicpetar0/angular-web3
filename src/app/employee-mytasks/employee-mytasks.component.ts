import { Component, Input } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-employee-mytasks',
  templateUrl: './employee-mytasks.component.html',
  styleUrls: ['./employee-mytasks.component.css']
})
export class EmployeeMytasksComponent {
  constructor(private http: Http) { }

  @Input() emp

  toggleDone(task){
    console.log(task);
    this.http.patch('/api/tasks/' + task._id, {done:!task.done})
      .toPromise()
      .then()
      .catch(function(err){console.log(err);});
  }
}
