import { Injectable } from '@angular/core';

import { ApiService } from '../../services/index';

@Injectable()
export class PlayerService {
  currentSongIndex: number;
  playlist: Array<Object>;
}
