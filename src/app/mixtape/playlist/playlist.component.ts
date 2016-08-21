import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { PlaylistService } from '../shared/playlist.service';
import { Store } from '../../store/store';

@Component({
  selector: 'playlist',
  templateUrl: 'app/mixtape/playlist/playlist.component.html',
  providers: [PlaylistService]
})
export class PlaylistComponent implements OnInit {
  songs: Observable<Array<Object>>;

  // TODO: refactor code
  constructor(private store: Store,
              private playlistService: PlaylistService) {
    this.store
      .changes
      .pluck('mixtape', 'playlist')
      .subscribe(
        (playlist: Observable<Array<Object>>) => {
          this.songs = playlist;
          console.log('our playlist: ', this.songs);
        },
        err => console.log('error: ', err));
  }

  ngOnInit() {
    const currentState = this.store.getState();

    this.playlistService.getPlaylist()
      .subscribe(
        playlist => {
          playlist = JSON.parse(playlist._body);

          this.store.setState(
            Object.assign({}, currentState, {
              mixtape: {
                playlist: playlist,
                searchResults: currentState.mixtape.searchResults
              }
            })
          );

        },
        err => console.log('error: ', err));
  }
}
