import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from './auth.service';
import { MdSnackBar } from '@angular/material';

@Component({
  template: `
    <h2 *ngIf="authService.checkingToken">Loading...</h2>
    <div #elseBlock>
        <h2>Login</h2>
        <div>
            <md-input-container>
                <input mdInput #user type="text" placeholder="username">
            </md-input-container>
            <md-input-container>
                <input mdInput #pass type="password" placeholder="password">
            </md-input-container>
            <div><button md-button (click)="login(user.value, pass.value)" >Login</button></div>
        </div>
    </div>`
})
export class LoginComponent {
  message: string;
  constructor(public authService: AuthService, public router: Router, private snackbar : MdSnackBar) {
    this.setMessage();
  }
  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }
  login(user : string, pass : string) {
    this.message = 'Trying to log in ...';
    this.authService.login(user, pass)
      .catch((res)=>{
        this.snackbar.open("incorrect username or password", "x", {duration:3000});
        throw res;
      })
      .subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        // Get the redirect URL from our auth service
        // If no redirect has been set, use the default
        // let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/employer';
        let redirect = this.authService.empInfo.role;
        // console.log(redirect);
        // Redirect the user
        this.router.navigate([redirect]);
      }
    })  
  }
  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
