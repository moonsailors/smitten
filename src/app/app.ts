import { Component } from '@angular/core';
// import { Main } from './containers';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { LoginService } from './services/loginService';

@Component({
  selector: 'app',
  styles: [`
    a{
      background: #3498db;
      background-image: -webkit-linear-gradient(top, #3498db, #2980b9);
      background-image: -moz-linear-gradient(top, #3498db, #2980b9);
      background-image: -ms-linear-gradient(top, #3498db, #2980b9);
      background-image: -o-linear-gradient(top, #3498db, #2980b9);
      background-image: linear-gradient(to bottom, #3498db, #2980b9);
      -webkit-border-radius: 19;
      -moz-border-radius: 19;
      border-radius: 19px;
      font-family: Georgia;
      color: white;
      font-size: 20px;
      padding: 10px 20px 10px 20px;
      text-decoration: none;
      margin-bottom: 15px;
    }
  `],
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  template: `
    <div>
      <nav [hidden]="!loggedIn">
        <a routerLink="/" routerLinkActive="active">Calendar</a>
        <a routerLink="/wishes" routerLinkActive="active">Post-Its</a>
        <a routerLink="/mixtape" routerLinkActive="active">Mixtape</a>
        <a routerLink="/logout" routerLinkActive="active">Logout</a>
       </nav>
      <router-outlet></router-outlet>
    </div>
  `
})
export class App {
  loggedIn;
  constructor (private loginService: LoginService,
              private router: Router) {
    this.loggedIn = this.loginService.isLoggedIn;
    console.log("loggedIn is ", this.loggedIn);
  }

}
