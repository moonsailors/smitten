import { Component } from '@angular/core';

import { SearchSoundCloud } from './search.service';
import { SoundCloudSearchInputComponent } from './search-input.component';
import { SoundCloudSearchResultsComponent } from './search-results.component';

@Component({
  selector: 'sc-search-container',
  directives: [
    SoundCloudSearchInputComponent,
    SoundCloudSearchResultsComponent
  ],
  template: `
    <sc-search-input></sc-search-input>
    <sc-search-results></sc-search-results>
  `
})
export class SoundCloudSearchComponent {}
