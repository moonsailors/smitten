import { Component } from '@angular/core';
import { CalendarInput } from '../ui/index';
import { TextInput } from '../ui/index';
import { CalendarService } from '../services/index';
import { DomSanitizationService } from '@angular/platform-browser';
import { Dialog } from 'primeng/primeng';

@Component ({
  selector: 'calendar',
  directives: [
    CalendarInput,
    TextInput,
    Dialog
  ],
  styleUrls: ['app/containers/css/calendar.css'],
  templateUrl: 'app/containers/templates/calendar.html'
})

export class Calendar {
  calSrc = "";
  trustedUrl;
  textsent: boolean = false;
  eventmade: boolean = false;
  calLoaded: boolean = false;


  loadCalendar() {
    this.calendarService.getCalendarId()
    .subscribe(res => {
        var body = JSON.parse(res._body);
        window.localStorage.setItem("user", body["user"]);
        this.calSrc = "https://calendar.google.com/calendar/embed?src=" + body["calId"];
        this.trustedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.calSrc);
        this.calLoaded = true;
     });
  }

  constructor(private calendarService: CalendarService, private sanitizer: DomSanitizationService) {
    this.loadCalendar();
  }


  onEmitAddition(event: Object) {
    this.calendarService.addCalendarEvent(event)
    .subscribe(res => {
      this.loadCalendar();
      this.eventmade = true;
    });
  }

  onEmitText(event: Object) {
    this.calendarService.addText(event)
    .subscribe(res => {
      this.textsent = true;
    });
  }
};
