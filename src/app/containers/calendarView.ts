import { Component, Input } from '@angular/core';


@Component({
  selector: 'calendar-view',
  directives: [],
  template: `
    <iframe [src]="calendarURL"
    style="border: 0"
    width="1024" height="600" frameborder="0" scrolling="no">
    </iframe>
  `
})

export class CalendarView {
  @Input() calendarURL: string;

  constructor() {}
}
