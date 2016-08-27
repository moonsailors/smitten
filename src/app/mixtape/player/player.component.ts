import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { MixtapePlayerService } from './player.service';
import { Song } from '../shared/index';
import { Store } from '../../store/store';

@Component({
  selector: 'player',
  templateUrl: 'app/mixtape/player/player.component.html',
  styleUrls: ['app/mixtape/player/player.component.css'],
  providers: [MixtapePlayerService]
})
export class MixtapePlayerComponent implements OnInit {
  audio: any;
  clientId: string;
  nowPlaying: Song;
  paused: boolean;

  constructor(private store: Store,
              private playerService: MixtapePlayerService) {
    // subscribe to store for changes in 'playlist' state
    this.store
      .changes
      .pluck('mixtape', 'playlist')
      .subscribe(
        this.playlistHandler.bind(this),
        err => console.log('error: ', err));

     // subscribe to store for changes in 'nowPlaying' state
     // clicking the play button next to a song in the playlist will
     // begin playing the song and start the playlist from that point
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
    this.audio.addEventListener('ended', this.playNextPrevSong.bind(this, 'forward'));
    this.clientId = '370cba66667bcfda9e137b49ec27b708';
    this.paused = true;
    this.playerService.currentSongIndex = 0;
  }

  playlistHandler(playlist: Observable<Song[]>) {
    // use slice method so collection can be treated as an array
    this.playerService.playlist = Array.prototype.slice.call(playlist);

    // assign first song in playlist as the song ready to be played (if nothing is assigned already)
    if (!this.nowPlaying && this.playerService.playlist.length) {
      this.nowPlaying = this.playerService.playlist[0];
      // also sets audio elements source to stream URL of current song in 'nowPlaying'
      // client ID is necessary in order to stream
      this.audio.src = this.nowPlaying.stream + '?client_id=' + this.clientId;
    }
  }

  playNextPrevSong(direction: string) {
    var nextSong;

    if (direction === 'forward') {
      nextSong = this.playerService.nextPrev('forward');
    } else {
      nextSong = this.playerService.nextPrev('backward');
    }

    this.paused = true;
    this.setSong(nextSong);
    this.togglePlay();
  }

  // to display info for currently playing song
  setSong(songData: Song) {
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
