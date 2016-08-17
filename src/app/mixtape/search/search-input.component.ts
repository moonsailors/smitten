import { Component } from '@angular/core';

import { SearchSoundCloud } from './search.service';

@Component({
  selector: 'sc-search-input',
  templateUrl: 'app/mixtape/search/search-input.component.html',
  providers: [SearchSoundCloud]
})
export class SoundCloudSearchInputComponent {
  resultMax: number = 50;
  search = {
    q: '',
    limit: this.resultMax
  };
  searchResults: Array<any>;

  constructor(private searchSoundCloud: SearchSoundCloud) {}

  onSubmit() {
    console.log('sending your SoundCloud search query to server');

    if (this.search.q) {
      this.searchSoundCloud.search(this.search);
    }

    this.search.q = '';
  }
}
