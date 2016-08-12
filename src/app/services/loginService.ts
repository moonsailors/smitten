import { Injectable } from '@angular/core';
import { ApiService } from './apiService';

@Injectable()
export class  LoginService {
  path: string = '/api/google';
  constructor(private apiService: ApiService) {


  }

  googleLogin(event: Object) {
    console.log("hit googleLogin");
    console.log("path is ", `${this.path}/login`);
      this.apiService.get(`${this.path}/login`)
      .subscribe(res => {
        console.log("res body ", res._body);
        window.location.href = res._body;
      });
  };

  googlePartner(event: Object) {
    console.log("hit googlePartner");
    console.log("path is ", `${this.path}/join`);
      this.apiService.post(`${this.path}/join`, event)
      .subscribe(res => {
        console.log("calID is ", res.body);
        // redirect to calendar page
        window.location.href = 'http://localhost:3000/';
      });
  }

};

