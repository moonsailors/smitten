import { Component, EventEmitter, Output } from '@angular/core';

import { SearchSoundCloud } from './search.service';
import { Store } from '../../store/store';
import 'rxjs/Rx';

@Component({
  selector: 'sc-search-input',
  templateUrl: 'app/mixtape/search/search-input.component.html',
  styleUrls: ['app/mixtape/search/search-input.component.css'],
  providers: [SearchSoundCloud]
})
export class SoundCloudSearchInputComponent {
  resultMax: number = 15;
  search = {
    q: '',
    limit: this.resultMax
  };

  constructor(private store: Store,
              private searchSoundCloud: SearchSoundCloud) {}

  onSubmit(searchParams) {
    const currentState = this.store.getState();

    if (this.search.q) {
      this.searchSoundCloud.search(searchParams)
        .subscribe(
          results => {
            results = JSON.parse(results._body);
            this.store.setState(
              Object.assign({}, currentState, {
                mixtape: {
                  playlist: currentState.mixtape.playlist,
                  searchResults: results
                }
              })
            );
          },
          err => console.log('error: ', err));
    }
    this.search.q = '';
  }
}
