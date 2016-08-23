import { Component } from '@angular/core';

import { FeaturesComponent } from './features/index';
import { JumbotronComponent } from './jumbotron/index';
import { LandingNavComponent } from './nav/index';
import { TeamComponent } from './team/index';
import { TestimonialsComponent } from './testimonials/index';

@Component({
  selector: 'landing',
  directives: [
    FeaturesComponent,
    JumbotronComponent,
    LandingNavComponent,
    TeamComponent,
    TestimonialsComponent
  ],
  template: `
    <landing-nav></landing-nav>
    <jumbotron></jumbotron>
    <features></features>
    <testimonials></testimonials>
    <team></team>
  `
})
export class LandingPageComponent {}
