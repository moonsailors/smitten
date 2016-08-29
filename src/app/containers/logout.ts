import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/index';
import { Button } from 'primeng/primeng';

 @Component({
   selector: 'logout',
   directives: [Button],
   templateUrl: 'app/containers/templates/logout.html',
   styleUrls: ['app/containers/css/logout.css']
 })

 export class Logout {
   constructor (private router: Router,
                 private loginService: LoginService) {
     this.loginService.logout()
     .subscribe(res => {
      this.loginService.isLoggedIn = false;
    });
   }

   goBack() {
    // redirect to calendar page
      this.router.navigate(['/login']);
   };
 };

