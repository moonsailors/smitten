import { Component } from '@angular/core';

import { LandingNavComponent } from './nav/index';

@Component({
  selector: 'landing',
  directives: [LandingNavComponent],
  template: `
    <landing-nav></landing-nav>
  `
})
export class LandingPageComponent {}
