import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { MixtapePlayerService } from './player.service';
import { Song } from '../shared/index';
import { Store } from '../../store/store';

@Component({
  selector: 'player',
  templateUrl: 'app/mixtape/player/player.component.html',
  providers: [MixtapePlayerService]
})
export class MixtapePlayerComponent implements OnInit {
  audio: any;
  clientId: string;
  nowPlaying: Song;
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
          if (!this.nowPlaying && this.playerService.playlist.length) {
            this.nowPlaying = this.playerService.playlist[0];
            this.src = this.nowPlaying.stream + '?client_id=' + this.clientId;
          }
        },
        err => console.log('error: ', err));
  }

  ngOnInit() {
    this.audio = document.getElementById('mixtape-audio');
    this.clientId = '370cba66667bcfda9e137b49ec27b708';
    this.playerService.currentSongIndex = 0;
  }
}
