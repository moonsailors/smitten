import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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
            this.audio.src = this.nowPlaying.stream + '?client_id=' + this.clientId;
          }
        },
        err => console.log('error: ', err));

     this.store
      .changes
      .pluck('mixtape', 'nowPlaying')
      .subscribe(
        (song: Song) => {
          if (song) {
            this.paused = true;
            this.setSong(song);
            this.playerService.changeSongIndex(song);
            this.togglePlay();
          }
        },
        err => console.log('error: ', err)
      );
  }

  ngOnInit() {
    this.audio = document.getElementById('mixtape-audio');
    this.audio.addEventListener('ended', this.playNextSong);
    this.clientId = '370cba66667bcfda9e137b49ec27b708';
    this.paused = true;
    this.playerService.currentSongIndex = 0;
  }

  playNextSong() {
    this.paused = true;
    var nextSong = this.playerService.next();
    this.setSong(nextSong);
    this.togglePlay();
  }

  setSong(songData) {
    this.nowPlaying = songData;
    this.audio.src = this.nowPlaying.stream + '?client_id=' + this.clientId;
  }

  togglePlay() {
    if (this.paused) {
      this.audio.play();
      this.paused = false;
    } else {
      this.audio.pause();
      this.paused = true;
    }
  }
}
