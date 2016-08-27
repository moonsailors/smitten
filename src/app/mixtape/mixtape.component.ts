import { Component } from '@angular/core';

import { PlaylistComponent } from './playlist/index';
import { SoundCloudSearchComponent } from './search/index';

@Component({
  selector: 'mixtape-container',
  directives: [PlaylistComponent, SoundCloudSearchComponent],
  template: `
    <section class="fade-in">
      <sc-search-container></sc-search-container>
      <playlist></playlist>
    </section>
  `,
  styleUrls: ['app/mixtape/mixtape.component.css']
})
export class MixtapeComponent {}
