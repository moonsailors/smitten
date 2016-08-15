import { Injectable } from '@angular/core';
import { ApiService } from './apiService';
import { StoreHelper } from './store-helper';

@Injectable()
export class  LoginService {
  path: string = '/api/google';
  constructor(private apiService: ApiService,
              private storeHelper: StoreHelper) {}

  googleLogin(event: Object) {
    console.log("hit googleLogin");
    console.log("path is ", `${this.path}/login`);
      this.apiService.get(`${this.path}/login`)
      .subscribe(res => {
        console.log("res body ", res._body);
        window.location.href = res._body;
      });
      window.location.href = 'http://localhost:3000/';
  };

  googlePartner(event: Object) {
    console.log("hit googlePartner");
    console.log("path is ", `${this.path}/join`);
      this.apiService.post(`${this.path}/join`, event)
      .subscribe(res => {
        console.log("calID is ", res._body);
        this.storeHelper.update('login', {calendarId: res._body});
        // redirect to calendar page
        window.location.href = 'http://localhost:3000/';
      });
  }

};

