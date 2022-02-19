import { Component }   from '@angular/core';
import { Router }      from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  template: `
    <h2 *ngIf="authService.checkingToken">Loading...</h2>
    <div #elseBlock>
        <h2>LOGIN</h2>
        <p>{{message}}</p>
        <div>
        <div *ngIf="!authService.isLoggedIn">
            <span>Username:<input #user type="text">Password:<input #pass type="password"></span>
            <button (click)="login(user.value, pass.value)" >Login</button>
        </div>
        <button (click)="logout()" *ngIf="authService.isLoggedIn">Logout</button>
        </div>
    </div>`
})
export class LoginComponent {
  message: string;
  constructor(public authService: AuthService, public router: Router) {
    this.setMessage();
  }
  setMessage() {
    this.message = 'Logged ' + (this.authService.isLoggedIn ? 'in' : 'out');
  }
  login(user : string, pass : string) {
    this.message = 'Trying to log in ...';
    this.authService.login(user, pass).subscribe(() => {
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
    });
  }
  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
