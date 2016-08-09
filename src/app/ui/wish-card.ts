import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'wish-card',
  styles: [],
  template: `
  <div(click)="toggleDescription()">
    <div>
      {{wish.title}}
    </div>
    <div *ngIf="showDescription">
      <div>
        {{wish.description}}
      </div>
      <div class="icon"(click)="onFullfillment()">
        <i class="material-icons">check</i>
      </div>
    </div>
  </div>
  `
})

export class WishCard {
  @Input() wish = {};
  @Output() fullfilled = new EventEmitter();

  showDescription: boolean = false;

  toggleDescription() {
    this.showDescription = !this.showDescription;
  }

  onFullfillment() {
    this.fullfilled.next(this.wish);
  }
}
