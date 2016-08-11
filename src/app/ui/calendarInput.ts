<<<<<<< 6956bbd65f012b8d27ec69948c753e5f60ffa09f
import { Component,
          Input,
          Output,
          EventEmitter } from '@angular/core';

@Component ({
  selector: 'calendar-input',
  styles: [],
  template: `
    <div>
      <h2>{{event.summary}}</h2>
      <form (ngSubmit)="addEvent()">
        Event
        <input type="text" [(ngModel)]="event.summary" name="event" placeholder="...add and event">
        Description
        <input type="text" [(ngModel)]="event.description" name="description" placeholder="...add a description">
        Location
        <input type="text" [(ngModel)]="event.location" name="location" placeholder="...do we want to know?">
        Start Time
        <input type="datetime" [(ngModel)]="event.start.datetime" name="start" placeholder="from">
        End Time
        <input type="datetime" [(ngModel)]="event.end.datetime" name="end" placeholder="to">
        <button type="submit">Add Event</button>
      </form>
    </div>
  `
})

export class CalendarInput {
  @Output () emitAddition =  new EventEmitter();

  event = {
    summary: '',
    location: '',
    description: '',
    start: {
      datetime: '',
      timeZone: 'Eastern'
    },
    end: {
      datetime: '',
      timeZone: 'Eastern'
    }
  };

  addEvent() {
    console.log("hit add Event");
    var event = {
      'summary': 'Google I/O 2015',
      'location': '800 Howard St., San Francisco, CA 94103',
      'description': 'A chance to hear more about Google\'s developer products.',
      'start': {
        'dateTime': '2016-08-20T09:00:00-07:00',
        'timeZone': 'America/Los_Angeles',
      },
      'end': {
        'dateTime': '2016-08-20T17:00:00-07:00',
        'timeZone': 'America/Los_Angeles'
      }
    };
    this.emitAddition.next(event);
  };



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
=======
import { Component } from '@angular/core';

@Component ({
  selector: 'calendar',
  styles: [],
  template: `
    <iframe
      src="https://calendar.google.com/calendar/embed?src=0ih8lo5nemro5m1fvs5iq14bqc%40group.calendar.google.com&ctz=America/Los_Angeles"
      style="border: 0" width="800" height="600" frameborder="0" scrolling="no">
    </iframe>
  `
})

export class CalendarInput {};
>>>>>>> (feat)Add basic routing
