import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import 'rxjs/Rx';

import { SearchParams } from './index';
import { SearchSoundCloud } from '../search.service';
import { Store } from '../../../store/store';

@Component({
  selector: 'sc-search-input',
  templateUrl: 'app/mixtape/search/input/search-input.component.html',
  styleUrls: ['app/mixtape/search/input/search-input.component.css'],
  providers: [SearchSoundCloud]
})
export class SoundCloudSearchInputComponent implements OnInit {
  resultMax: number;
  search: SearchParams;

  constructor(private store: Store,
              private searchSoundCloud: SearchSoundCloud) {}

  // SearchSoundCloud service makes POST request to server
  // upon receiving search results via SoundCloud API, update state
  onSubmit(searchParams: SearchParams) {
    if (this.search.q) {
      this.searchSoundCloud.search(searchParams)
        .subscribe(
          this.resultsHandler.bind(this),
          error => console.log('error: ', error));
    }
    this.search.q = '';
  }

  ngOnInit() {
    this.resultMax = 30;
    this.search = {
      q: '',
      limit: this.resultMax
    };
  }

  resultsHandler(results) {
    const currentState = this.store.getState();
    results = JSON.parse(results._body);

    this.store.setState(
      Object.assign({}, currentState, {
        mixtape: {
          playlist: currentState.mixtape.playlist,
          // update 'searchResults'
          searchResults: results
        }
      })
    );
  }
}
