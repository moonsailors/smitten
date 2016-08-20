import { Component } from '@angular/core';

import { SoundCloudSearchInputComponent } from './search-input.component';
import { SoundCloudSearchResultsComponent } from './search-results.component';

@Component({
  selector: 'sc-search-container',
  directives: [
    SoundCloudSearchInputComponent,
    SoundCloudSearchResultsComponent
  ],
  templateUrl: 'app/mixtape/search/search.component.html',
  styleUrls: ['app/mixtape/search/search.component.css']
})
export class SoundCloudSearchComponent {}
