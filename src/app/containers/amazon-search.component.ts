import { Component } from '@angular/core';

@Component({
  selector: 'amazon-search',
  styles: [],
  template: `
    <div>
      <amazon-search-input></amazon-search-input>
      <amazon-search-results></amazon-search-results>
    </div>
  `
})

export class AmazonSearchComponent {}