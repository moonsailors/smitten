import { Component, Input } from '@angular/core';

@Component({
  selector: 'sc-search-results',
  templateUrl: 'app/mixtape/search/search-results.component.html',
  styleUrls: ['app/mixtape/search/search-results.component.css']
})
export class SoundCloudSearchResultsComponent {
  @Input() searchResults: any;
}
