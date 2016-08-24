import { Component } from '@angular/core';
import { LoginInput } from '../ui/index';
import { LoginService } from '../services/index';

 @Component({
   selector: 'login',
   directives: [
     LoginInput
   ],
   template: `
     <div class="fade-in">
       <login-input (emitLogin)="onEmitLogin($event)"
       (emitPartner)="onEmitPartner($event)"></login-input>
     </div>
   `
 })

 export class Login {
   constructor (private loginService: LoginService) {}

  onEmitLogin(event: Object) {
    console.log("hit onEmitLogin");
    this.loginService.googleLogin(event);
  };

  onEmitPartner(event: Object) {
    console.log("hit onEmitPartner");
    this.loginService.googlePartner(event);
  };

 };
