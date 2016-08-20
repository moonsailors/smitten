import { Component, EventEmitter, Output } from '@angular/core';

import { SearchSoundCloud } from './search.service';
import { Store } from '../../store/store';

@Component({
  selector: 'sc-search-input',
  templateUrl: 'app/mixtape/search/search-input.component.html',
  styleUrls: ['app/mixtape/search/search-input.component.css'],
  providers: [SearchSoundCloud]
})
export class SoundCloudSearchInputComponent {
  resultMax: number = 1;
  search = {
    q: '',
    limit: this.resultMax
  };

  constructor(private store: Store,
              private searchSoundCloud: SearchSoundCloud) {}

  onSubmit(searchParams) {
    console.log('search submitted');
    const currentState = this.store.getState();

    if (this.search.q) {
      this.searchSoundCloud.search(searchParams)
        .subscribe(
          results => {
            currentState.mixtape.playlist = results;
          },
          err => console.log('error: ', err),
          () => this.store.setState(currentState));

    }
    this.search.q = '';
  }
}
