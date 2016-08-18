import { Component, Input } from '@angular/core';

@Component({
  selector: 'sc-search-results',
  templateUrl: 'app/mixtape/search/search-results.component.html'
})
export class SoundCloudSearchResultsComponent {
  @Input() searchResults: any;
}
