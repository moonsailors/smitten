import { Component, Input } from '@angular/core';


@Component({
  selector: 'calendar-view',
  directives: [],
  templateUrl: 'app/containers/templates/calendarView.html'
})

export class CalendarView {
  @Input() calendarURL: string;

  constructor() {}
}
