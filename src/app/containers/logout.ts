import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/index';
import { Button } from 'primeng/primeng';

 @Component({
   selector: 'logout',
   directives: [Button],
   template: `
     <div>
       You are now logged out
       <button pButton (click)="goBack()" label="Return to Login">
       </button>
     </div>
   `
 })

 export class Logout {
   constructor (private router: Router,
                 private loginService: LoginService) {
     this.loginService.logout()
     .subscribe(res => {
      console.log("logged out");
    });
   }

   goBack() {
    // redirect to calendar page
      this.router.navigate(['/login']);
   };
 };

