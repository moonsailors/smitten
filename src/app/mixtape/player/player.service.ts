import { Injectable } from '@angular/core';

import { ApiService } from '../../services/index';
import { Song } from '../shared/index';

@Injectable()
export class MixtapePlayerService {
  currentSongIndex: number;
  playlist: Array<Song>;

  changeSongIndex(song) {
    this.currentSongIndex = this.playlist.indexOf(song);
  }

  next() {
    if (this.currentSongIndex < this.playlist.length - 1) {
      this.currentSongIndex++;
    } else {
      this.currentSongIndex = 0;
    }

    return this.playlist[this.currentSongIndex];
  }
}
