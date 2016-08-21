import { Injectable } from '@angular/core';

import { ApiService } from '../../services/index';

@Injectable()
export class MixtapePlayerService {
  currentSongIndex: number;
  playlist: Array<Object>;
}
