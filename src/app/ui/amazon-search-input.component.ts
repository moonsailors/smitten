import { Component } from '@angular/core';

@Component({
  selector: 'amazon-search-input',
  styles: [],
  template: `
    <form>
      <input type="text" name="amazon-search-input" placeholder="Search Amazon">
      <input type="submit" value="Search">
    </form>
  `
})

export class AmazonSearchInputComponent {}