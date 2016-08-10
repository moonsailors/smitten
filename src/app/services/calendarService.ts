import { Injectable } from '@angular/core';
import { ApiService } from './apiService';

@Injectable()
export class  CalendarService {
  path: string = '/calendar';
  constructor(private apiService: ApiService) {}


}
