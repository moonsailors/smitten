import { Component } from '@angular/core';
import { LoginInput } from '../ui/index';
import { LoginService } from '../services/index';

 @Component({
   selector: 'login',
   directives: [
     LoginInput
   ],
   templateUrl: 'app/containers/templates/login.html'
 })

 export class Login {
   constructor (private loginService: LoginService) {}

  onEmitLogin(event: Object) {
    this.loginService.googleLogin(event);
  };

  onEmitPartner(event: Object) {
    this.loginService.googlePartner(event);
  };

 };
