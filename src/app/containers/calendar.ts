import { Component } from '@angular/core';
import { CalendarInput } from '../ui/index';
import { CalendarService } from '../services/index';

@Component ({
  selector: 'calendar',
  directives: [
    CalendarInput
  ],
  styles: [],
  template: `
    <calendar-input (emitAddition)="onEmitAddition($event)" ></calendar-input>
    <iframe
      src={{calSrc}}
      style="border: 0" width="800" height="600" frameborder="0" scrolling="no">
    </iframe>
  `
})

export class Calendar {
  calSrc = "";

  constructor(private calendarService: CalendarService) {
    this.calendarService.getCalendarId()
    .subscribe(res => {
        console.log("response ", res);
        this.calSrc = `https://calendar.google.com/calendar/embed?src=${res._body}&ctz=America/Los_Angeles`;
      });
  }


  onEmitAddition(event: Object) {
    console.log("hit onEmitAddition");
    this.calendarService.addCalendarEvent(event);
  }
};
