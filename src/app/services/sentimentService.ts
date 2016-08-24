import { Injectable } from '@angular/core';
import { ApiService } from './apiService';

@Injectable() 
export class SentimentService{
  path: string = '/api/sentiment';
  constructor(private apiService: ApiService){}

  getSentimentData(email){
    return this.apiService.get(`${this.path}/${email}`);
  }

}