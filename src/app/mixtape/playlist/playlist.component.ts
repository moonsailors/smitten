import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { PlaylistService } from '../shared/playlist.service';
import { Store } from '../../store/store';

@Component({
  selector: 'playlist',
  templateUrl: 'app/mixtape/playlist/playlist.component.html'
})
export class PlaylistComponent implements OnInit {
  songs: Observable<Array<Object>>;

  ngOnInit() {

  }

  // TODO: refactor code
  constructor(private store: Store) {
    this.store
      .changes
      .pluck('mixtape', 'playlist')
      .subscribe(
        (playlist: Observable<Array<Object>>) =>
          this.songs = playlist,
        err => console.log('error: ', err));
  }
}
