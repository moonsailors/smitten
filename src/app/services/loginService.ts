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
  }

};

