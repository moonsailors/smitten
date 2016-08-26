import { Component } from '@angular/core';
import { PostCard, WishInput } from '../ui/index';
import { PostService } from '../services/index';

@Component({
  selector: 'wishes-container',
  directives: [
    PostCard,
    WishInput
  ],
  styles: [],
  template: `
    <div class="fade-in">
      <wish-input (createWish)="onCreatePost($event)"></wish-input>
      <div>
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

  constructor(private postService: PostService) {
    this.postService.getRelationshipPosts(window.localStorage.getItem('user'))
      .subscribe(res => {
        let newPosts = res.json();
        newPosts.forEach(function(post, index){
          post.index = index;
        });
        this.posts = newPosts;
      });
  }

  onCreatePost(post) {
    this.postService.createPost(window.localStorage.getItem('user'), post)
      .subscribe(res => {
        var post = res.json();
        post.index = this.posts.push(post) - 1;
      });
  }

  onPostCompletion(post) {
    this.postService.deletePost(post.id)
      .subscribe(res => console.log(res));
    this.posts.splice(post.index, 1);
    this.posts.forEach(function(value, index){
      value.index = index;
    });
  }
}
