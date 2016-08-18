import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/index';


 @Component({
   selector: 'logout',
   template: `
     <div>
       You are now logged out
       <button (click)="goBack()" >Return To Login</button>
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

