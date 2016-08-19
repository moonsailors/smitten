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
    <div>
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
    console.log('constructor');
    this.postService.getRelationshipPosts("jenjengoo@gmail.com")
      .subscribe(res => {
        let newPosts = res.json();
        console.log(newPosts);
        newPosts.forEach(function(post, index){
          post.index = index;
          console.log(post);
        });
        this.posts = newPosts;
      });
  }

  onCreatePost(post) {
    console.log('old post', post);
    this.postService.createPost("jenjengoo@gmail.com", post)
      .subscribe(res => {
        var post = res.json();
        post.index = this.posts.push(post) - 1;
      });
  }

  onPostCompletion(post) {
    console.log('hit post completion');
    this.postService.deletePost(post.id)
      .subscribe(res => console.log(res));
    this.posts.splice(post.index, 1);
    this.posts.forEach(function(value, index){
      value.index = index;
    });
  }
}
