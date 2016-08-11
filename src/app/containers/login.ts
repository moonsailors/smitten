import { Component } from '@angular/core';
import { LoginInput } from '../ui/index';

 @Component({
   selector: 'login',
   directives: [
     LoginInput
   ],
   template: `
     <div>
       <login-input></login-input>
     </div>
   `
 })

 export class Login {};
