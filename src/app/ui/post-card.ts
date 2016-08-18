import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import {  
  NgGridItem, 
  NgGridItemConfig, 
  NgGridItemEvent
} from 'angular2-grid';
import { Galleria } from 'primeng/primeng';
import { Draggable } from 'ng2-draggable/src/index';


@Component({
  selector: 'post-card',
  styles: [],
  directives: [
    NgGridItem,
    Galleria,
    Draggable
  ],
  template: `
  <div [draggable]>
    <div class="handle"><h4>{{post.title}}</h4></div>
    <div *ngIf="note">
      <p>{{post.description}}</p>
    </div>
    <div *ngIf="images">
      <p-galleria [images]="post.images" panelWidth="500" panelHeight="313"></p-galleria>
    </div>
    <div>
      <button (click)="onCompletion()">done</button>
    </div> 
  </div>

  `
})

// [(ngGridItem)]="post.config"

export class PostCard {
  @Input() post = {};
  @Input() i;
  @Output() complete = new EventEmitter();

  note: boolean = true;
  images: boolean = true;

  constructor() {
  }

  onCompletion() {
    console.log('button pressed');
    this.complete.next(this.post);
  }


}
