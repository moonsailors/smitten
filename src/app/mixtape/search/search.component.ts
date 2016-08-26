import { Component } from '@angular/core';

import { SoundCloudSearchInputComponent } from './input/index';
import { SoundCloudSearchResultsComponent } from './results/index';

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
