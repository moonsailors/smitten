import { Component } from '@angular/core';
import {  NgGrid, 
          NgGridConfig, 
          NgGridItem, 
          NgGridItemConfig, 
          NgGridItemEvent } from 'angular2-grid';

interface Post {
  id: number;
  config: NgGridItemConfig;
}

@Component({
  selector: 'post-grid',
  directives: [
    NgGrid,
    NgGridItem
  ],
  styles: [],
  template: `
  <div>
    Testing
    <div [ngGrid]="gridConfig">
      <div
        *ngFor="let box of boxes; let i = index" 
        [(ngGridItem)]="box.config"> 
        <div class="handle">testing</div>
      </div>
    </div>
  </div>
  `
})

export class PostGrid {

  private boxes: Array<Post> = [];

  constructor() {
    for (var i = 0; i < 4; i++) {
      const conf = this._generateDefaultItemConfig();
      conf.payload = 1 + i;
      this.boxes[i] = { id: i + 1, config: conf };
    }
  }

  private gridConfig: NgGridConfig = <NgGridConfig>{
    'margins': [5],
    'draggable': true,
    'resizable': true,
    'max_cols': 0,
    'max_rows': 0,
    'visible_cols': 0,
    'visible_rows': 0,
    'min_cols': 1,
    'min_rows': 1,
    'col_width': 2,
    'row_height': 2,
    'min_width': 50,
    'min_height': 50,
    'fix_to_grid': false,
    'auto_style': true,
    'auto_resize': false,
    'maintain_ratio': false,
    'prefer_new': false,
    'zoom_on_drag': false,
    'limit_to_screen': true
  };

  private _generateDefaultItemConfig(): NgGridItemConfig {
    return { 'dragHandle': '.handle', 'col': 1, 'row': 1, 'sizex': 1, 'sizey': 1 };
  }

};
