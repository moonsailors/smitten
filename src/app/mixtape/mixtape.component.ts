import { Component } from '@angular/core';

import { MixtapePlayerComponent } from './player/index';
import { PlaylistComponent } from './playlist/index';
import { SoundCloudSearchComponent } from './search/index';

@Component({
  selector: 'mixtape-container',
  directives: [MixtapePlayerComponent, PlaylistComponent, SoundCloudSearchComponent],
  template: `
    <div class="fade-in">
      <playlist></playlist>
      <sc-search-container></sc-search-container>
    </div>
  `,
  styleUrls: ['app/mixtape/mixtape.component.css']
})
export class MixtapeComponent {}
