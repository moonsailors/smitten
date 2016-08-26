import { Injectable } from '@angular/core';
import { ApiService } from './apiService';

@Injectable()
export class  CalendarService {
  path: string = '/api/calendar';
  constructor(private apiService: ApiService) {


  }

  addCalendarEvent(event: Object) {
      return this.apiService.post(`${this.path}/eventAdd`, event);
  };

  getCalendarId() {
    return this.apiService.get(`${this.path}/calId`);
  };

  addText(event: Object) {
    return this.apiService.post(`${this.path}/text`, event);
  };

}
