import { Component } from '@angular/core';

import { JumbotronComponent } from './jumbotron/index';
import { LandingNavComponent } from './nav/index';

@Component({
  selector: 'landing',
  directives: [JumbotronComponent, LandingNavComponent],
  template: `
    <landing-nav></landing-nav>
    <jumbotron></jumbotron>
  `
})
export class LandingPageComponent {}
