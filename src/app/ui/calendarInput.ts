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
        <p-calendar [(ngModel)]="start.datetime" name="start" inputStyleClass="ui-calendar" dateFormat="yy-mm-dd" timeFormat="HH:mm:ss">
        </p-calendar>
        <br>
        End Time
        <p-calendar [(ngModel)]="end.datetime" name="end" inputStyleClass="ui-calendar" dateFormat="yy-mm-dd" timeFormat="HH:mm:ss">
        </p-calendar>
        <button pButton class="ui-button" type="submit" label="Add"></button>
      </form>

      </p-dialog>

      <button type="text" class="ui-button" (click)="showDialog()" pButton label="Create Event"></button>
    </div>
  `
})

export class CalendarInput {
  @Output () emitAddition =  new EventEmitter();

  display: boolean = false;

  start = {
    datetime: ''
  };

  end = {
    datetime: ''
  };

  event = {
    summary: '',
    location: '',
    description: '',
    start: {
      dateTime: '',
      timeZone: 'America/Los_Angeles'
    },
    end: {
      dateTime: '',
      timeZone: 'America/Los_Angeles'
    }
  };

  showDialog() {
    this.display = true;
  };

  convertTime(datetime) {
    var newdate = datetime.replace(/ /i, 'T');
    newdate = newdate + '-07:00';
    return newdate;
  }
  addEvent() {
    this.event.start.dateTime = this.convertTime(this.start.datetime);
    this.event.end.dateTime = this.convertTime(this.end.datetime);
    this.emitAddition.next(this.event);
    this.event = {
        summary: '',
        location: '',
        description: '',
        start: {
          dateTime: '',
          timeZone: 'America/Los_Angeles'
        },
        end: {
          dateTime: '',
          timeZone: 'America/Los_Angeles'
        }
      };
    this.display = false;
  };



};

