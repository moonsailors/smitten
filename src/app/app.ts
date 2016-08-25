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
  styles: [`
    .nav-container {
      border: 1px solid #DFDFDF;
    }

    nav {
      padding: 20px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .app-nav-links {
      list-style-type: none;
      padding: 0;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }

    .app-nav-links li {
      margin-left: 60px;
    }

    .app-nav-brand {
      color: #91204D;
      letter-spacing: 0.01875em;
      text-transform: lowercase;
      font-weight: 700;
    }

    .nav-link a {
      text-decoration: none;
      color: #4A4A4A;
      font-size: 0.875em;
      letter-spacing: 0.014375em;
      padding-bottom: 20px;
      text-transform: lowercase;
      border-bottom: 2px solid transparent;
      transition: border-bottom 0.4s;
    }

    .nav-link a:hover,
    .nav-link a:active {
      border-bottom: 2px solid #91204D;
    }


  `],
  directives: [
    ...ROUTER_DIRECTIVES,
    MixtapePlayerComponent,
    LineGraph
  ],
  providers: [PlaylistService],
  template: `
    <div class="wrapper" class="fade-in">
      <div [hidden]="!loggedIn" class="nav-container">
        <nav class="app-nav">
          <p class="app-nav-brand">smitten</p>
          <ul class="app-nav-links">
            <li class="nav-link">
              <a routerLink="/" routerLinkActive="active">calendar</a>
            </li>
            <li class="nav-link">
              <a routerLink="/wishes" routerLinkActive="active">post-its</a>
            </li>
            <li class="nav-link">
              <a routerLink="/mixtape" routerLinkActive="active">mixtape</a>
            </li>
            <li class="nav-link">
              <a routerLink="/sentiment" routerLinkActive="active">sentiment</a>
            </li>
            <li class="nav-link">
              <a routerLink="/logout" routerLinkActive="active">logout</a>
            </li>
          </ul>
        </nav>
      </div>
      <router-outlet></router-outlet>
      <div *ngIf="loggedIn" class="push"></div>
    </div>
    <player [hidden]="!loggedIn" class='fade-in'></player>
  `
})
export class App implements OnInit {
  loggedIn;

  constructor (private loginService: LoginService,
               private router: Router,
               private store: Store,
               private playlistService: PlaylistService) {
    this.loggedIn = this.loginService.isLoggedIn;
  }

  handleError(error) {
    console.log('error: ', error);
  }

  handlePlaylist(playlist) {
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

  ngOnInit() {
    this.playlistService.getPlaylist()
      .subscribe(this.handlePlaylist.bind(this), this.handleError);
  }

}
