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

export class Calendar {};
