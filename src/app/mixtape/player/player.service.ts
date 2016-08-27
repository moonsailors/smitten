import { Injectable } from '@angular/core';

import { ApiService } from '../../services/index';
import { Song } from '../shared/index';

@Injectable()
export class MixtapePlayerService {
  currentSongIndex: number;
  playlist: Array<Song>;

  changeSongIndex(song: Song) {
    this.currentSongIndex = this.playlist.indexOf(song);
  }

  nextPrev(direction: string) {
    if (direction === 'forward') {
      if (this.currentSongIndex < this.playlist.length - 1) {
        this.currentSongIndex++;
      } else {
        this.currentSongIndex = 0;
      }
    } else {
      if (this.currentSongIndex > 0) {
        this.currentSongIndex--;
      } else {
        this.currentSongIndex = this.playlist.length - 1;
      }
    }

    return this.playlist[this.currentSongIndex];
  }
}
