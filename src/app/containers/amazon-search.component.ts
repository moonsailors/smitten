import { Component } from '@angular/core';

@Component({
  selector: 'amazon-search',
  styles: [],
  template: `
    <div>
      <amazon-search-bar></amazon-search-bar>
      <amazon-search-results></amazon-search-results>
    </div>
  `
})

export class AmazonSearchComponent {}