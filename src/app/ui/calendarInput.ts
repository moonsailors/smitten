import { Component,
          Input,
          Output,
          EventEmitter } from '@angular/core';
import { Dialog, Button, InputText, Calendar } from 'primeng/primeng';

@Component ({
  selector: 'calendar-input',
  directives: [ Dialog, Button, InputText, Calendar ],
  styles: [],
  templateUrl: 'app/ui/templates/calendarInput.html'
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
    newdate = newdate + '-00:00';
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

