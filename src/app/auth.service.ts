import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  constructor(private http: Http) { }
  isLoggedIn: boolean = false;
  empInfo;

  // store the URL so we can redirect after logging in
//   redirectUrl: string;

  login(username : string, password : string): Observable<boolean> {
    return this.http.post('/api/login', {username:username, password:password})
        .map(response => {
            // console.log(response.json());
            this.isLoggedIn = response.status === 200
            if(this.isLoggedIn){
                this.empInfo = response.json();
            }
            return this.isLoggedIn;
    })
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}