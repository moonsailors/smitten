import { Component } from '@angular/core';
import { PostCard, WishInput } from '../ui/index';
import { PostService } from '../services/index';
import {  NgGrid, 
          NgGridConfig, 
          NgGridItem, 
          NgGridItemConfig, 
          NgGridItemEvent } from 'angular2-grid';
import { Dialog, Galleria } from 'primeng/primeng';
@Component({
  selector: 'wishes-container',
  directives: [
    PostCard,
    WishInput,
    NgGrid,
    NgGridItem,
    Dialog,
    Galleria
  ],
  styles: [],
  template: `
    <div>
      <wish-input (createWish)="onCreatePost($event)"></wish-input>
      <div [ngGrid]="gridConfig">
        <post-card 
          *ngFor="let post of posts; let i = index"
          [post]="post"
          [i]="i"
          (complete)="onPostCompletion($event)"></post-card>
      </div>
    </div>
  `

})

export class Wishes {
  something = true;
  private posts = [
    {
      type: "note",
      title: "example note",
      description: "this is what a note looks like.",
      photos: [{}],
      config: this._generateDefaultItemConfig()
    },
    {
      type: "note",
      title: "Justing <3",
      description: "ohMG JUSTIN.",
      photos: [ { source: "http://www.etonline.com/photo/2016/02/24213948/justin_bieber_gq_1280.jpg", alt: "", title: "" } ],
      config: this._generateDefaultItemConfig()
    },
  ];

  constructor(private postService: PostService) {
    console.log('constructor');
    // this.postService.getRelationshipPosts("connor.d.campbell@gmail.com")
    //   .subscribe(res => {
    //     let newPosts = res.json();
    //     console.log(newPosts);
    //     newPosts.forEach(function(post, index){
    //       post.index = index;
    //       console.log(post);
    //     });
    //     this.posts = newPosts;
    //   });
  }

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
    // const conf = this._generateDefaultItemConfig();
    // var newPost = {
    //   title: post.title,
    //   description: post.description,
    //   index: this.posts.length,
    //   config : conf
    // };

    // this.postService.createPost("connor.d.campbell@gmail.com", newPost)
    //   .subscribe(res => {
    //     var post = res.json();
    //     post.index = this.posts.push(post) - 1;
    //   });
  }

  onPostCompletion(post) {
    console.log('hit post completion');
    this.postService.deletePost(post.id)
      .subscribe(res => console.log(res));
    this.posts.splice(post.index, 1);
  }

  private _generateDefaultItemConfig(): NgGridItemConfig {
    return { 'dragHandle': '.handle', 'col': 1, 'row': 1, 'sizex': 1, 'sizey': 1 };
  }

}
