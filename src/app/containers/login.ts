import { Component } from '@angular/core';
import { LoginInput } from '../ui/index';
import { LoginService } from '../services/index';

 @Component({
   selector: 'login',
   directives: [
     LoginInput
   ],
   template: `
     <div>
       <login-input (emitLogin)="onEmitLogin($event)" ></login-input>
     </div>
   `
 })

 export class Login {
   constructor (private loginService: LoginService) {}

  onEmitLogin(event: Object) {
    console.log("hit onEmitLogin");
    this.loginService.googleLogin(event);
  }
 };
