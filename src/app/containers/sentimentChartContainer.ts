import { Component } from '@angular/core';

import { SentimentService } from '../services/index';

@Component ({
  selector: 'sentiment-container',
  directives: [],
  styles: [],
  template: `
    <div>
      this is a placeholder
    </div>
  `
})

export class SentimentContainer {

  constructor(private sentimentService: SentimentService){}

  

}