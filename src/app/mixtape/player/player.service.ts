import { Injectable } from '@angular/core';

import { ApiService } from '../../services/index';
import { Song } from '../shared/index';

@Injectable()
export class MixtapePlayerService {
  currentSongIndex: number;
  playlist: Array<Song>;
}
