import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { PlaylistService } from '../shared/playlist.service';
import { Song } from '../shared/index';
import { Store } from '../../store/store';

@Component({
  selector: 'playlist',
  templateUrl: 'app/mixtape/playlist/playlist.component.html',
  styleUrls: ['app/mixtape/playlist/playlist.component.css'],
  providers: [PlaylistService]
})
export class PlaylistComponent implements OnInit {
  songs: Observable<Song[]>;

  constructor(private store: Store,
              private playlistService: PlaylistService) {
    // subscribe to store for changes in 'playlist' state
    this.store
      .changes
      .pluck('mixtape', 'playlist')
      .subscribe(
        (playlist: Observable<Song[]>) => { this.songs = playlist; },
        error => console.log('error: ', error)
      );
  }

  deleteSong(song: Song) {
    // delete song from DB
    // server will send back updated playlist
    this.playlistService.deleteSong(song)
      .subscribe(
        this.playlistHandler.bind(this),
        error => console.log('error:', error)
      );
  }

  ngOnInit() {
    // get user's playlist upon component initialization
    this.playlistService.getPlaylist()
      .subscribe(
        this.playlistHandler.bind(this),
        error => console.log('error: ', error)
      );
  }

  playlistHandler(playlist) {
    const currentState = this.store.getState();
    playlist = JSON.parse(playlist._body);

    // update 'playlist' state
    this.store.setState(
      Object.assign({}, currentState, {
        mixtape: {
          playlist: playlist,
          searchResults: currentState.mixtape.searchResults,
          nowPlaying: currentState.mixtape.nowPlaying
        }
      })
    );
  }

  playSong(song: Song) {
    const currentState = this.store.getState();

    // update 'nowPlaying' state with clicked song
    this.store.setState(
      Object.assign({}, currentState, {
        mixtape: {
          playlist: currentState.mixtape.playlist,
          searchResults: currentState.mixtape.searchResults,
          nowPlaying: song
        }
      })
    );
  }
}
