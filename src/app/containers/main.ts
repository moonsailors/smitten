import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

@Component({
  selector: 'main-container',
  directives: [
    ...ROUTER_DIRECTIVES
  ],
  templateUrl: 'app/containers/templates/main.html'
})

export class Main {}
