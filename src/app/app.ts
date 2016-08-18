import { Component } from '@angular/core';
// import { Main } from './containers';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { LoginService } from './services/loginService';

@Component({
  selector: 'app',
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
