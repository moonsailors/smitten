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
      src="https://calendar.google.com/calendar/embed?src=0ih8lo5nemro5m1fvs5iq14bqc%40group.calendar.google.com&ctz=America/Los_Angeles"
      style="border: 0" width="800" height="600" frameborder="0" scrolling="no">
    </iframe>
  `
})

export class Calendar {

  constructor(private calendarService: CalendarService) {}

  onEmitAddition(event: Object) {
    console.log("hit onEmitAddition");
    this.calendarService.addCalendarEvent(event);
  }
};
