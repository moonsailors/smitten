import { Component } from '@angular/core';
// import { Main } from './containers';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'app',
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  template: `
    <div>
      <nav>
        <a routerLink="/" routerLinkActive="active">Calendar</a>
        <a routerLink="/wishes" routerLinkActive="active">Post-Its</a>
        <a routerLink="/login" routerLinkActive="active">Login</a>
       </nav>
      <router-outlet></router-outlet>
    </div>
  `
})
export class App {}
