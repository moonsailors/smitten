import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { PlaylistService } from '../../shared/index';
import { Song } from '../../shared/index';
import { Store } from '../../../store/store';

@Component({
  selector: 'sc-search-results',
  templateUrl: 'app/mixtape/search/results/search-results.component.html',
  styleUrls: ['app/mixtape/search/results/search-results.component.css'],
  providers: [PlaylistService]
})
export class SoundCloudSearchResultsComponent {
  searchResults: Observable<Song[]>;

  constructor(private store: Store,
              private playlistService: PlaylistService) {
    // listen for 'searchResults' state changes
    // update 'this.searchResults' accordingly
    this.store
      .changes
      .pluck('mixtape', 'searchResults')
      .subscribe(
        (searchResults: Observable<Song[]>) => this.searchResults = searchResults,
        error => console.log('error: ', error));
  }

  // add song to playlist in database via POST request
  // change 'playlist' state upon adding song
  addSong(songData) {
    this.playlistService.addToPlaylist(songData)
      .subscribe(
        this.addSongToPlaylistState.bind(this),
        error => console.log('error: ', error));
  }

  addSongToPlaylistState(song) {
    const currentState = this.store.getState();
    song = [JSON.parse(song._body)];

    this.store.setState(
      Object.assign({}, currentState, {
        mixtape: {
          // add new song to 'playlist' state
          playlist: [
            ...currentState.mixtape.playlist,
            ...song
          ],
          searchResults: currentState.mixtape.searchResults
        }
      })
    );
  }
}
