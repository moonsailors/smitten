import { Component, OnInit } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import '../lib/chart.js/dist/Chart.bundle.min.js';

import { LineGraph } from './ui/index';
import { LoginService } from './services/loginService';
import { MixtapePlayerComponent } from './mixtape/player/index';
import { PlaylistService } from './mixtape/shared/playlist.service';
import { Store } from './store/store';

@Component({
  selector: 'app',
  styleUrls: ['app/css/app.css'],
  directives: [
    ...ROUTER_DIRECTIVES,
    MixtapePlayerComponent,
    LineGraph
  ],
  providers: [PlaylistService],
  templateUrl: 'app/templates/app.html'
})
export class App implements OnInit {
  loggedIn;

  constructor (private loginService: LoginService,
               private router: Router,
               private store: Store,
               private playlistService: PlaylistService) {
    this.loggedIn = this.loginService.isLoggedIn;
  }

  ngOnInit() {
    this.playlistService.getPlaylist()
      .subscribe(
        this.playlistHandler.bind(this),
        error => console.log('error: ', error)
      );
  }

  playlistHandler(playlist) {
    const currentState = this.store.getState();
    playlist = JSON.parse(playlist._body);

    this.store.setState(
      Object.assign({}, currentState, {
        mixtape: {
          playlist: playlist,
          searchResults: currentState.mixtape.searchResults
        }
      })
    );
  }
}
