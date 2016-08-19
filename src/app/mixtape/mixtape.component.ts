import { Component } from '@angular/core';

import { PlaylistComponent } from './playlist/index';
import { SoundCloudSearchComponent } from './search/index';

@Component({
  selector: 'mixtape-container',
  directives: [PlaylistComponent, SoundCloudSearchComponent],
  template: `
    <sc-search-container></sc-search-container>
    <playlist></playlist>
  `,
  styleUrls: ['app/mixtape/mixtape.component.css']
})
export class MixtapeComponent {}
