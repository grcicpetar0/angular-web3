import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { EmployeeManageComponent } from './employee-manage/employee-manage.component';
import { EmployerViewComponent } from './employer-view/employer-view.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { EmployeeMytasksComponent } from './employee-mytasks/employee-mytasks.component';
import { EmployeeNotmytasksComponent } from './employee-notmytasks/employee-notmytasks.component';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeManageComponent,
    EmployerViewComponent,
    EmployeeViewComponent,
    EmployeeMytasksComponent,
    EmployeeNotmytasksComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
