import { Component } from '@angular/core';
import { AmazonSearchResultsComponent, AmazonSearchInputComponent } from '../ui/index';

@Component({
  selector: 'amazon-search',
  directives: [
    AmazonSearchResultsComponent,
    AmazonSearchInputComponent
  ],
  styles: [],
  template: `
    <div>
      <amazon-search-input></amazon-search-input>
      <amazon-search-results></amazon-search-results>
    </div>
  `
})

export class AmazonSearchComponent {};
