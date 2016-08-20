import { Component } from '@angular/core';

import { PlaylistService } from '../shared/index';

@Component({
  selector: 'playlist',
  templateUrl: 'app/mixtape/playlist/playlist.component.html',
  providers: [PlaylistService]
})
export class PlaylistComponent {}
