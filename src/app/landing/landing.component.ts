import { Component } from '@angular/core';

import { FeaturesComponent } from './features/index';
import { JumbotronComponent } from './jumbotron/index';
import { LandingNavComponent } from './nav/index';

@Component({
  selector: 'landing',
  directives: [
    FeaturesComponent,
    JumbotronComponent,
    LandingNavComponent
  ],
  template: `
    <landing-nav></landing-nav>
    <jumbotron></jumbotron>
    <features></features>
  `
})
export class LandingPageComponent {}
