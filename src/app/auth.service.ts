import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  constructor(private http: Http, private router:Router) {
    let token = localStorage.getItem("token")
    if(token) {
      this.http.post('/api/tokenLogin', {token: token})
        .toPromise()
        .then(res => {
          this.isLoggedIn = res.status === 200;
          if(this.isLoggedIn){
            this.empInfo = res.json();
            this.router.navigate([res.json().role])
                .then(()=>this.checkingToken = false);
          }
        })
        .catch(function(err){
          console.log(err);
          this.checkingToken = false;
        })
    } else {
        this.checkingToken = false;
    }
  }
  isLoggedIn: boolean = false;
  checkingToken = true;
  empInfo;

  // store the URL so we can redirect after logging in
//   redirectUrl: string;

  login(username : string, password : string): Observable<boolean> {
    return this.http.post('/api/login', {username:username, password:password})
        .map(response => {
            this.isLoggedIn = response.status === 200
            if(this.isLoggedIn){
              console.log(response.json());

              this.empInfo = response.json();
                localStorage.setItem("token", response.json().token);
            }
            return this.isLoggedIn;
    })
  }

  logout(): void {
    this.isLoggedIn = false;
    console.log("logout");
    localStorage.removeItem("token");
  }
}
