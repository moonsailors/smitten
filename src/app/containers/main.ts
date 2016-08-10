import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'main-container',
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  template:`
    <div>
      <main class="main">
        M
      </main>
    <div>
  `
})