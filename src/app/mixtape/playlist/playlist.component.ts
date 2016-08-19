import { Component, OnInit } from '@angular/core';

import { PlaylistService } from '../shared/index';

@Component({
  selector: 'playlist',
  templateUrl: 'app/mixtape/playlist/playlist.component.html',
  providers: [PlaylistService]
})
export class PlaylistComponent implements OnInit {
  songs: Array<any>;

  constructor(private playlistService: PlaylistService) {}

  ngOnInit() {
    this.songs = this.playlistService.songs;
  }

  get diagnostic() { return JSON.stringify(this.playlistService.songs); }
}
