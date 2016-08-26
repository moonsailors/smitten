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
    this.apiService.get(`${this.path}/login`)
    .subscribe(res => {
      window.localStorage.setItem('loggedIn', "true");
      window.location.href = res._body;
    });

  };

  googlePartner(event: Object) {
      this.apiService.post(`${this.path}/join`, event)
      .subscribe(res => {
        this.storeHelper.update('login', {calendarId: res._body});
        // redirect to calendar page
        this.router.navigate(['/']);
      });
  };

  logout() {
    window.localStorage.setItem("loggedIn", "false");
    return this.apiService.get(`${this.path}/logout`);
  }

};

