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

// interface Post {
//   id: number;
//   config: NgGridItemConfig;
// }

@Component({
  selector: 'post-card',
  styles: [],
  directives: [
    NgGridItem
  ],
  template: `
  <div [(ngGridItem)]="post.config">
    <div class="handle"> 
      <div>
        {{post.title}}
      </div>
      <div>
        {{post.description}}
      </div>
      <div>
        <button (click)="onCompletion()">done</button>
      </div> 
    </div>
  </div>

  `
})

export class PostCard {
  @Input() post = {};
  @Output() complete = new EventEmitter();

  onCompletion() {
    console.log('button pressed');
    this.complete.next(this.post);
  }


}
