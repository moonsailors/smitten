import { Component, OnInit } from '@angular/core';

import { Store } from '../../store/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'sc-search-results',
  templateUrl: 'app/mixtape/search/search-results.component.html',
  styleUrls: ['app/mixtape/search/search-results.component.css']
})
export class SoundCloudSearchResultsComponent {
  searchResults: Observable<Array<Object>>;

  constructor(private store: Store) {
    this.store
      .changes
      .pluck('mixtape', 'searchResults')
      .subscribe(
        (searchResults: Observable<Array<Object>>) =>
          this.searchResults = searchResults,
        err => console.log('error: ', err),
        () => console.log(this.searchResults));
  }
}
