import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import { ApiService } from '../../services/index';

@Injectable()
export class PlaylistService {
  constructor(private apiService: ApiService) {}

  addToPlaylist(songData) {
    return this.apiService.post('/api/add-song', songData);
  }

  getPlaylist() {
    return this.apiService.post('/api/get-playlist', {get: 'playlist'});
  }
}
