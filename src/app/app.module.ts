import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCheckboxModule, MdInputModule,
         MdIconModule, MdListModule, MdCardModule,
         MdSnackBarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { EmployeeManageComponent } from './employee-manage/employee-manage.component';
import { EmployerViewComponent } from './employer-view/employer-view.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { EmployeeMytasksComponent } from './employee-mytasks/employee-mytasks.component';
import { EmployeeNotmytasksComponent } from './employee-notmytasks/employee-notmytasks.component';
import { FilterPipe } from './filter.pipe';
import { AuthGuard } from './auth-guard.service';
import { AuthService } from './auth.service';
import { LoginComponent } from './login.component';

const appRoutes: Routes = [
  { path: 'employee', component: EmployeeViewComponent, canActivate:[AuthGuard] },
  { path: 'employer', component: EmployerViewComponent, canActivate:[AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo:"login", pathMatch:"full"}
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeeManageComponent,
    EmployerViewComponent,
    EmployeeViewComponent,
    EmployeeMytasksComponent,
    EmployeeNotmytasksComponent,
    FilterPipe,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MdButtonModule,
    MdCheckboxModule,
    MdInputModule,
    MdIconModule, 
    MdListModule,
    MdCardModule,
    MdSnackBarModule,
  ],
  providers: [AuthGuard, AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
