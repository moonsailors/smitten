import { Component, OnInit } from '@angular/core';

import { SearchSoundCloud } from './search.service';

@Component({
  selector: 'sc-search-results',
  templateUrl: 'app/mixtape/search/search-results.component.html',
  providers: [SearchSoundCloud]
})
export class SoundCloudSearchResultsComponent implements OnInit {}
