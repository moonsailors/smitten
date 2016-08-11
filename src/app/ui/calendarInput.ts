import { Component,
          Input,
          Output,
          EventEmitter } from '@angular/core';

@Component ({
  selector: 'calendar-input',
  styles: [],
  template: `
    <div>
      <h2>Are you a div?</h2>
      <form (ngSubmit)="addEvent()">
        Event
        <input type="text" name="event" placeholder="...add and event">
        Description
        <input type="text" name="description" placeholder="...add a description">
        Location
        <input type="text" name="location" placeholder="...do we want to know?">
        Start Time
        <input type="datetime" name="start" placeholder="from">
        End Time
        <input type="datetime" name="end" placeholder="to">
        <button type="submit">Add Event</button>
      </form>
    </div>
  `
})

export class CalendarInput {
  @Output () addEvent =  new EventEmitter();


};

 // 'summary': 'Google I/O 2015',
 //    'location': '800 Howard St., San Francisco, CA 94103',
 //    'description': 'A chance to hear more about Google\'s developer products.',
 //    'start': {
 //      'dateTime': '2016-08-20T09:00:00-07:00',
 //      'timeZone': 'America/Los_Angeles',
 //    },
 //    'end': {
 //      'dateTime': '2016-08-20T17:00:00-07:00',
 //      'timeZone': 'America/Los_Angeles',

// import {
//   Component,
//   Output,
//   EventEmitter
// } from '@angular/core';
// import { ColorPicker } from './color-picker';

// @Component({
//   selector: 'note-creator',
//   template: `
//     <div class="note-creator shadow-2" [ngStyle]="{'background-color': newNote.color}">
//       <form class="row" (ngSubmit)="onCreateNote()">
//         <input
//           type="text"
//           (focus)="toggle(true)"
//           [(ngModel)]="newNote.title"
//           name="newNoteTitle"
//           placeholder="Title"
//           class="col-xs-10 title"
//           *ngIf="fullForm"
//         >
//         <input
//           type="text"
//           (focus)="toggle(true)"
//           [(ngModel)]="newNote.value"
//           name="newNoteValue"
//           placeholder="Take a note..."
//           class="col-xs-10"
//         >
//         <div class="actions col-xs-12 row between-xs" *ngIf="fullForm">
//           <div class="col-xs-3">
//             <color-picker
//               (selected)="onColorSelect($event)"
//               [colors]="colors"
//             >
//             </color-picker>
//           </div>
//           <button
//             type="submit"
//             class="btn-light"
//            >
//             Done
//           </button>
//         </div>
//       </form>
//     </div>
//   `
// })
// export class NoteCreator {
//   @Output() createNote = new EventEmitter();
//   colors: Array<string> = ['#B19CD9', '#FF6961', '#77DD77', '#AEC6CF', '#F49AC2', 'white'];
//   newNote = {
//     title: '',
//     value: '',
//     color: 'white'
//   };
//   fullForm: boolean = false;

//   onCreateNote() {
//     const { title, value, color } = this.newNote;

//     if (title && value) {
//       this.createNote.next({ title, value, color });
//     }

//     this.reset();
//     this.fullForm = false;
//   }

//   reset() {
//     this.newNote = {
//       title: '',
//       value: '',
//       color: 'white'
//     };
//   }

//   toggle(value: boolean) {
//     this.fullForm = value;
//   }

//   onColorSelect(color: string) {
//     this.newNote.color = color;
//   }
// }
