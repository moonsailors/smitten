import {
  Component,
  Input,
  Output,
  EventEmitter,
  Renderer,
  ElementRef
} from '@angular/core';
import { Draggable, PostService } from '../services/index';
import { Galleria, InputText, Button } from 'primeng/primeng';

@Component({
  selector: 'post-card',
  styleUrls: ['app/ui/css/post-card.css'],
  directives: [
    Draggable,
    Galleria,
    Button,
    InputText
  ],
  templateUrl: 'app/ui/templates/post-card.html'
})

export class PostCard {
  @Input() post = {
    id: "",
    type: "",
    photos: [],
    coordinates: {}
  };

  @Output() complete = new EventEmitter();
  @Output() newPhoto = new EventEmitter();

 //  coordinates = {
 //      x: this.post.coordinates.x,
 //      y: this.post.coordinates.y
 // };

  note: boolean = true;
  photos: boolean = true;
  constructor(private renderer: Renderer, private el: ElementRef, private postService: PostService) {
    this.note = this.post.type === "note";
    this.photos = this.post.type === "photos";

    // if (this.post.coordinates.x === undefined) {
    //   console.log("filling out coordinates");
    //   this.post.coordinates = this.coordinates;
    // }

  }


  newPhotoLink = "";

  onCompletion() {
    console.log('button pressed');
    this.complete.next(this.post);
  }

  addNewPhoto() {
    console.log('hit add new photo');
    if (this.newPhotoLink.length > 2) {
      this.post.photos.push( { source: this.newPhotoLink } );
      this.newPhoto.next(this.post);
    }
  }

  onDragEnd(coordinates) {
    console.log("post card level", coordinates);
    this.postService.updatePost(this.post.id, {coordinates: coordinates})
      .subscribe( post => console.log(post) );
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
