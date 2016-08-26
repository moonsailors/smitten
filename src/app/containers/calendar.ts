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
  styles: [`
    ul {
      margin: 15px 0 25px 30px;
    }

    li {
      display: inline-block;
    }
  `],
  template: `
    <div class="fade-in container">
      <ul>
        <li><calendar-input (emitAddition)="onEmitAddition($event)"></calendar-input>
      </li>
      <li>
        <text-input (emitText)="onEmitText($event)"></text-input>
      </li>
      </ul>
    </div>

    <div>
     <p-dialog header="Your event has been added!" [(visible)]="eventmade" modal="modal" showEffect="fade">
      </p-dialog>
    </div>

    <div>
     <p-dialog header="Your text has been sent!" [(visible)]="textsent" modal="modal" showEffect="fade">
      </p-dialog>
    </div>

    <iframe *ngIf="calLoaded" [src]="trustedUrl"
    style="border: 0"
    width="1024" height="600" frameborder="0" scrolling="no">
    </iframe>
  `
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
