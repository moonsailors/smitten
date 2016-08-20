import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { PlaylistService } from '../shared/playlist.service';
import { Store } from '../../store/store';

@Component({
  selector: 'sc-search-results',
  templateUrl: 'app/mixtape/search/search-results.component.html',
  styleUrls: ['app/mixtape/search/search-results.component.css'],
  providers: [PlaylistService]
})
export class SoundCloudSearchResultsComponent {
  searchResults: Observable<Array<Object>>;

  constructor(private store: Store,
              private playlistService: PlaylistService) {
    this.store
      .changes
      .pluck('mixtape', 'searchResults')
      .subscribe(
        (searchResults: Observable<Array<Object>>) =>
          this.searchResults = searchResults,
        err => console.log('error: ', err),
        () => console.log(this.searchResults));
  }

  addSong(songData) {
    const currentState = this.store.getState();

    this.playlistService.addToPlaylist(songData)
      .subscribe(
        song => {
          song = [JSON.parse(song._body)];
          this.store.setState(
            Object.assign({}, currentState, {
              mixtape: {
                playlist: [
                  ...currentState.mixtape.playlist,
                  ...song
                ],
                searchResults: currentState.mixtape.searchResults
              }
            })
          );
        },
        err => console.log('error: ', err));
  }
}
