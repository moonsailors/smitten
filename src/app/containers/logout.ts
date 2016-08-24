import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/index';
import { Button } from 'primeng/primeng';

 @Component({
   selector: 'logout',
   directives: [Button],
   template: `
     <div class="logout-page fade-in">
       <div class="logout-container">
         <p>you are now logged out.</p>
         <div class="button" (click)="goBack()" label="log in">
           log in
         </div>
       </div>
     </div>
   `,
   styles: [`
    .logout-page {
      width: 100%;
      text-align: center;
    }

    .logout-container {
      position: absolute;
      top: 25%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
    }

    p {
      font-size: 1.5625em;
      font-weight: 700;
    }

    .button {
      color: #FFF;
      background-color: #91204D;
      border: 1px solid #91204D;
      border-radius: 30px;
      display: inline-block;
      margin-top: 10px;
      padding: 5px 24px;
      cursor: pointer;
      font-weight: 400;
      font-size: 0.875em;
      transition: background-color 0.4s, color 0.4s;
    }

    .button:hover {
      color: #91204D;
      background-color: #FFF;
      border: 1px solid #91204D;
    }
 `]
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
      window.location.reload();
   };
 };

