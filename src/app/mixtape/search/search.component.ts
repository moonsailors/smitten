import { Component } from '@angular/core';

import { SoundCloudSearchInputComponent, SoundCloudSearchResultsComponent } from './index';

@Component({
  selector: 'sc-search-container',
  directives: [
    SoundCloudSearchInputComponent,
    SoundCloudSearchResultsComponent
  ],
  template: `
    <sc-search-input></sc-search-input>
    <sc-search-results></sc-search-results>
  `,
  styles: []
})
export class SoundCloudSearchComponent {}