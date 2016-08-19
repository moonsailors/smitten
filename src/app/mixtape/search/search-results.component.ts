import { Component, Input } from '@angular/core';

import { PlaylistService } from '../shared/index';

@Component({
  selector: 'sc-search-results',
  templateUrl: 'app/mixtape/search/search-results.component.html',
  styleUrls: ['app/mixtape/search/search-results.component.css'],
  providers: [PlaylistService]
})
export class SoundCloudSearchResultsComponent {
  @Input() searchResults: any;

  result: any;

  constructor(private playlistService: PlaylistService) {}

  getResult(songData) {
  }
}
