import { Component } from '@angular/core';

import { SearchSoundCloud } from './search.service';

@Component({
  selector: 'sc-search-input',
  templateUrl: 'app/mixtape/search/search-input.component.html',
  providers: [SearchSoundCloud]
})
export class SoundCloudSearchInputComponent {
  resultMax: number = 50;
  search: Object = {
    q: '',
    limit: this.resultMax
  };
  searchResults: Array<any>;

  constructor(private searchSoundCloud: SearchSoundCloud) {}

  onSubmit() {
    console.log('submitting your soundcloud search!');
    if (this.search.q) {
      this.searchSoundCloud.search(this.search)
        .subscribe(
          results => {
            console.log('soundcloud results received from server!');
            this.searchResults = results._body
          },
          err => console.log('error: ', err)
    }
    this.search.q = '';
  }
}
