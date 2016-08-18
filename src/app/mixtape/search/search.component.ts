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
  template: `
    <sc-search-input (onSearchSubmit)="getSearchResults($event)"></sc-search-input>
    <sc-search-results [searchResults]="searchResults"></sc-search-results>
  `,
  providers: [SearchSoundCloud]
})
export class SoundCloudSearchComponent {
  searchResults: any;

  constructor(private searchSoundCloud: SearchSoundCloud) {}

  getSearchResults(searchParams) {
    this.searchSoundCloud.search(searchParams)
      .subscribe(
        results => {

          this.searchResults = JSON.parse(results._body);
        },
        err => console.log('error: ', err));
  }
}
