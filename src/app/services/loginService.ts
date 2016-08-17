import { Injectable } from '@angular/core';
import { ApiService } from './apiService';
import { StoreHelper } from './store-helper';

import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';



@Injectable()
export class  LoginService {
  path: string = '/api/google';

  isLoggedIn: boolean = false;

  constructor(private apiService: ApiService,
              private storeHelper: StoreHelper,
              private router: Router) {
     if (window.localStorage.getItem('loggedIn') === "true") {
       this.isLoggedIn = true;
     }
  }


  googleLogin(event: Object) {
    console.log("hit googleLogin");
    console.log("path is ", `${this.path}/login`);
    this.apiService.get(`${this.path}/login`)
    .subscribe(res => {
      window.localStorage.setItem('loggedIn', "true");
      console.log("res body ", res._body);
      console.log("loggedIn ", this.isLoggedIn);
      // this.router.navigate([res._body]);
      window.location.href = res._body;
    });
    console.log("loggedIn ", this.isLoggedIn);
    // this.router.navigate(['/']);
    // window.location.href = 'http://localhost:3000/';

  };

  googlePartner(event: Object) {
    console.log("hit googlePartner");
    console.log("path is ", `${this.path}/join`);
      this.apiService.post(`${this.path}/join`, event)
      .subscribe(res => {
        console.log("calID is ", res._body);
        this.storeHelper.update('login', {calendarId: res._body});
        // redirect to calendar page
        this.router.navigate(['/']);
        // window.location.href = 'http://localhost:3000/';
      });
  }

};

