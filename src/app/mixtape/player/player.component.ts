import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { MixtapePlayerService } from './player.service';
import { Store } from '../../store/store';

@Component({
  selector: 'player',
  templateUrl: 'app/mixtape/player/player.component.html',
  providers: [PlayerService]
})
export class MixtapePlayerComponent implements OnInit {
  audio: any;
  nowPlaying: Object;
  paused: boolean;
  src: string;

  constructor(private store: Store,
              private playerService: MixtapePlayerService) {
    this.store
      .changes
      .pluck('mixtape', 'playlist')
      .subscribe(
        (playlist: Observable<Array<Object>>) => {
          this.playerService.playlist = Array.prototype.slice.call(playlist);
        },
        err => console.log('error: ', err),
        () => console.log('playlist: ', this.playerService.playlist));
  }

  ngOnInit() {

  }
}
