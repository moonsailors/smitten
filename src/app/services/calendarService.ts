import { Injectable } from '@angular/core';
import { ApiService } from './apiService';

@Injectable()
export class  CalendarService {
  path: string = '/api/calendar';
  constructor(private apiService: ApiService) {


  }

  addCalendarEvent(event: Object) {
    console.log("hit add Calendar Event");
    console.log("path is ", `${this.path}/eventAdd`);
      return this.apiService.post(`${this.path}/eventAdd`, event);
  };

  getCalendarId() {
    console.log("hit get Calendar Id");
    return this.apiService.get(`${this.path}/calId`);
  };

}
