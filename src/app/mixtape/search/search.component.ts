import { Component } from '@angular/core';

import { SearchSoundCloud } from './search.service';
import { SoundCloudSearchInputComponent } from './search-input.component';
import { SoundCloudSearchResultsComponent } from './search-results.component';

@Component({
  selector: 'sc-search-container',
  directives: [
    SoundCloudSearchInputComponent,
    SoundCloudSearchResultsComponent
  ],
  providers: [SearchSoundCloud],
  template: `
    <sc-search-input></sc-search-input>
    <sc-search-results></sc-search-results>
  `
})
export class SoundCloudSearchComponent {
  searchResult: any;

  constructor(private searchSoundCloud: SearchSoundCloud) {
    this.searchSoundCloud.search()
      .subscribe(
        res => this.searchResult = res,
        err => console.log(err),
        () => console.log(this.searchResult));
  }
}
