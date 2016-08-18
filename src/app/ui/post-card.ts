import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { Draggable } from '../services/index';
import { Galleria, InputText } from 'primeng/primeng';

@Component({
  selector: 'post-card',
  styles: [`
    .drag-me{
      position: fixed;
    }
  `],
  directives: [
    Draggable,
    Galleria
  ],
  template: `
  <div class="drag-me" [draggable]>
    <div><h4>{{post.title}}</h4></div>
    <div>
      <p>{{post.description}}</p>
    </div>
    <div>
      <p-galleria [images]="post.photos" panelWidth="500" panelHeight="313"></p-galleria>
      <input type="text" pInputText [(ngModel)]="newPhotoLink"/>
      <button pButton type="button" (click)="addNewPhoto()" label="Click">Add a photo</button>
    </div>
    <div>
      <button (click)="onCompletion()">done</button>
    </div> 
  </div>

  `
})

export class PostCard {
  @Input() post = {};
  @Output() complete = new EventEmitter();
  @Output() newPhoto = new EventEmitter();

  note: boolean = true;
  photos: boolean = true;
  constructor() {
    this.note = this.post.type === "note";
    this.photos = this.post.type === "photos";
  }

  newPhotoLink = "";

  onCompletion() {
    console.log('button pressed');
    this.complete.next(this.post);
  }

  addNewPhoto() {
    if (this.newPhotoLink.length > 2) {
      this.post.photos.push( { source: this.newPhotoLink } );
      this.newPhoto.next(this.post);
    }
  }


}

// import {
//   Component,
//   Input,
//   Output,
//   EventEmitter
// } from '@angular/core';
// import {  
//   NgGridItem, 
//   NgGridItemConfig, 
//   NgGridItemEvent
// } from 'angular2-grid';
// import { Galleria } from 'primeng/primeng';
// import { Draggable } from 'ng2-draggable/src/index';


// @Component({
//   selector: 'post-card',
//   styles: [],
//   directives: [
//     NgGridItem,
//     Galleria,
//     Draggable
//   ],
//   template: `
  // <div [draggable]>
  //   <div class="handle"><h4>{{post.title}}</h4></div>
  //   <div *ngIf="note">
  //     <p>{{post.description}}</p>
  //   </div>
  //   <div *ngIf="images">
  //     <p-galleria [images]="post.images" panelWidth="500" panelHeight="313"></p-galleria>
  //   </div>
  //   <div>
  //     <button (click)="onCompletion()">done</button>
  //   </div> 
  // </div>

//   `
// })

// // [(ngGridItem)]="post.config"

// export class PostCard {
//   @Input() post = {};
//   @Input() i;
//   @Output() complete = new EventEmitter();

//   note: boolean = true;
//   images: boolean = true;

//   constructor() {
//   }

//   onCompletion() {
//     console.log('button pressed');
//     this.complete.next(this.post);
//   }


// }
