import { Component, OnInit } from '@angular/core';

import { Store } from '../../store/store';
import 'rxjs/Rx';

@Component({
  selector: 'sc-search-results',
  templateUrl: 'app/mixtape/search/search-results.component.html',
  styleUrls: ['app/mixtape/search/search-results.component.css']
})
export class SoundCloudSearchResultsComponent implements OnInit {
  searchResults: Array<Object>;

  constructor(private store: Store) {}

  ngOnInit() {
    console.log('initialized');
    this.store
      .changes
      .pluck('searchResults')
      .subscribe(
        (searchResults: Array<Object>) =>
          this.searchResults = searchResults,
        err => console.log('error: ', err),
        () => console.log(this.searchResults));
  }
}
