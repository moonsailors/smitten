import { Component } from '@angular/core';

@Component({
  selector: 'amazon-search-input',
  styles: [],
  template: `
    <form>
      <input type="text" name="amazon-search-input" placeholder="Search Amazon">
      <button (click)="showResults(true)">Search</button>
    </form>
    <div *ngIf="areResultsVisible">
      <img src="https://images-na.ssl-images-amazon.com/images/I/514G31DI2JL._AC_US174_.jpg">


      <img src="https://images-na.ssl-images-amazon.com/images/I/518dbDwAncL._AC_US174_.jpg">


      <img src="https://images-na.ssl-images-amazon.com/images/I/61qVDP4hZXL._AC_US174_.jpg">


      <img src="https://images-na.ssl-images-amazon.com/images/I/513KacwBpML._AC_US174_.jpg">


      <img src="https://images-na.ssl-images-amazon.com/images/I/514yrlYsvML._AC_US174_.jpg">

    </div>
  `
})

export class AmazonSearchInputComponent {
  areResultsVisible: boolean = false;

  showResults(value: boolean) {
    this.areResultsVisible = value;
  }
}
