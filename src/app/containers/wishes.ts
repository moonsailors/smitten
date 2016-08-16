import { Component } from '@angular/core';
import { PostCard, WishInput } from '../ui/index';
import { PostService } from '../services/index';
import {  NgGrid, 
          NgGridConfig, 
          NgGridItem, 
          NgGridItemConfig, 
          NgGridItemEvent } from 'angular2-grid';

@Component({
  selector: 'wishes-container',
  directives: [
    PostCard,
    WishInput,
    NgGrid,
    NgGridItem
  ],
  styles: [],
  template: `
    <div>
      <wish-input (createWish)="onCreatePost($event)"></wish-input>
      <div [ngGrid]="gridConfig">
        <post-card 
          *ngFor="let post of posts; let i = index"
          [post]="post"
          (complete)="onPostCompletion($event)"></post-card>
      </div>
    </div>
  `

})

export class Wishes {

  private posts = [];

  constructor(private postService: PostService) {}

  private gridConfig: NgGridConfig = <NgGridConfig> {
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

  onCreatePost(post) {
    const conf = this._generateDefaultItemConfig();
    var newPost = {
      title: post.title,
      description: post.description,
      id: this.posts.length - 1,
      config : conf
    };
    this.posts.push(newPost);
  }

  onPostCompletion(post) {
    console.log('hit post completion');
    this.posts.splice(post.id - 1, 1);
  }

  private _generateDefaultItemConfig(): NgGridItemConfig {
    return { 'dragHandle': '.handle', 'col': 1, 'row': 1, 'sizex': 1, 'sizey': 1 };
  }

}
