import { Component } from '@angular/core';
import { WishCard } from '../ui/index';
import { WishService } from '../services/index';

@Component({
  selector: 'wishes-container',
  directives: [
    WishCard
  ],
  styles: [],
  template: `
    <div>
      <div>
        <wish-card
          [wishes]="wishes"
          *ngFor="let wish of wishes; let i = index"
          (fullfilled)="onFullfillment($event, i)"
        >
        </wish-card>
      </div>
    </div>
  `

})

export class Wishes {
  wishes = [
    {title: "example", description: "example"},
    {title: "example", description: "example"},
    {title: "example", description: "example"}
  ];

  constructor(private wishService: WishService) {
    // this.wishService.getRelationshipWishes(email)
    //   .subscribe(res => this.wishes = res.data);
  }

  onFullfillment(wish, i) {
    // this.wishService.deleteWish(wish.id);
    this.wishes.splice(i, 1);
  }
}
