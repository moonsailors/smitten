import { Component } from '@angular/core';

import { MixtapePlayerComponent } from './player/index';
import { PlaylistComponent } from './playlist/index';
import { SoundCloudSearchComponent } from './search/index';

@Component({
  selector: 'mixtape-container',
  directives: [MixtapePlayerComponent, PlaylistComponent, SoundCloudSearchComponent],
  template: `
    <playlist></playlist>
    <sc-search-container></sc-search-container>
  `,
  styleUrls: ['app/mixtape/mixtape.component.css']
})
export class MixtapeComponent {}
