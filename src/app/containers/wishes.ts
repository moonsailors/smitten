import { Component } from '@angular/core';
import { WishCard } from '../ui';
import { WishService } from '../services';

@Component({
  selector: 'wishes-container',
  directives: [
    WishCard
  ],
  styles: [],
  template:`
    <div>
      <div>
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

  constructor(private wishService: WishService, email: string){
    this.wishService.getRelationshipWishes(email)
      .subscribe(res => this.wishes = res.data);
  }

  onFullfillment(wish, i){
    this.wishService.deleteWish(wish.id);
    this.wishes.splice(i, 1);
  }


}