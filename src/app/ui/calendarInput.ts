import { Component,
          Input,
          Output,
          EventEmitter } from '@angular/core';
import { Dialog, Button, InputText, Calendar } from 'primeng/primeng';

@Component ({
  selector: 'calendar-input',
  directives: [ Dialog, Button, InputText, Calendar ],
  styles: [],
  template: `
    <div>
      <p-dialog header="Add Event" [(visible)]="display" modal="modal" showEffect="fade">
      <footer>
      <form class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix" (ngSubmit)="addEvent()">
        Event
        <input pInputText type="text" [(ngModel)]="event.summary" name="event" placeholder="...add and event">
        <br>
        Description
        <input pInputText type="text" [(ngModel)]="event.description" name="description" placeholder="...add a description">
        <br>
        Location
        <input pInputText type="text" [(ngModel)]="event.location" name="location" placeholder="...do we want to know?">
        <br>
        Start Time
        <p-calendar dateFormat="mm/dd/yy" timeFormat="HH:mm"></p-calendar>
        <br>
        End Time
        <p-calendar dateFormat="mm/dd/yy" timeFormat="HH:mm"></p-calendar>
        <button pButton class="ui-button" type="submit" label="Add"></button>
      </form>
      </footer>
      </p-dialog>

      <button type="text" class="ui-button" (click)="showDialog()" pButton label="Create Event"></button>
    </div>
  `
})

export class CalendarInput {
  @Output () emitAddition =  new EventEmitter();

  display: boolean = false;

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

  showDialog() {
    this.display = true;
  };

  addEvent() {
    console.log("hit add Event");
    var event = {
      'summary': 'Google I/O 2015',
      'location': '800 Howard St., San Francisco, CA 94103',
      'description': 'A chance to hear more about Google\'s developer products.',
      'start': {
        'dateTime': '2016-08-25T09:00:00-07:00',
        'timeZone': 'America/Los_Angeles',
      },
      'end': {
        'dateTime': '2016-08-25T17:00:00-07:00',
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
