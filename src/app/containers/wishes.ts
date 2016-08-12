import { Component } from '@angular/core';
import { WishCard, WishInput } from '../ui/index';
import { PostService } from '../services/index';

@Component({
  selector: 'wishes-container',
  directives: [
    WishCard,
    WishInput
  ],
  styles: [],
  template: `
    <div>
    <h3>Ahoy Sailors!  What do you Need?</h3>
      <div>
        <wish-input (createWish)="onCreateWish($event)"></wish-input>
        <wish-card
          [wish]="wish"
          *ngFor="let wish of wishes; let i = index"
          (fullfilled)="onFullfillment($event, i)"
        >
        </wish-card>
      </div>
    </div>
  `

})

export class Wishes {
  wishes = [];

  constructor(private postService: PostService) {
    // this.wishService.getRelationshipWishes(email)
    //   .subscribe(res => this.wishes = res.data);
  }

  onCreateWish(wish) {
    console.log('hit on createWish', wish);
    this.wishes.push(wish);
    console.log(this.wishes);
    this.postService.createPost(wish, 'connor.d.campbell@gmail.com');
  }

  onFullfillment(wish, i) {
    // this.wishService.deleteWish(wish.id);
    this.wishes.splice(i, 1);
  }
}
