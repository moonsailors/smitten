import { Component } from '@angular/core';

@Component({
  selector: 'amazon-search-input',
  styles: [`
    ul {
      list-style: none;
    }
  `],
  template: `
    <form>
      <input type="text" name="amazon-search-input" placeholder="Search Amazon">
      <button (click)="showResults(true)">Search</button>
    </form>
    <div *ngIf="areResultsVisible">
      <ul>
        <li>
          <img src="https://images-na.ssl-images-amazon.com/images/I/514G31DI2JL._AC_US174_.jpg">
          <p><a href="http://amzn.to/2aMWtOV">Hershey's Nuggets Chocolates Assortment, 38.5 oz</a></p>
        </li>
        <li>
          <img src="https://images-na.ssl-images-amazon.com/images/I/518dbDwAncL._AC_US174_.jpg">
          <p><a href="http://amzn.to/2bj1bXq">Lindt LINDOR Milk Chocolate Truffles, 60 Count Box</a></p>
        </li>
        <li>
          <img src="https://images-na.ssl-images-amazon.com/images/I/61qVDP4hZXL._AC_US174_.jpg">
          <p><a href="http://amzn.to/2bkyJYD">Ferrero Rocher, Flat 48 Count</a></p>
        </li>
        <li>
          <img src="https://images-na.ssl-images-amazon.com/images/I/513KacwBpML._AC_US174_.jpg">
          <p><a href="http://amzn.to/2aONpPE">Hershey's Chocolate Full Size Variety Pack (30-Bar Box)</a></p>
        </li>
        <li>
          <img src="https://images-na.ssl-images-amazon.com/images/I/514yrlYsvML._AC_US174_.jpg">
          <p><a href="http://amzn.to/2aZZsEH">MARS Chocolate Favorites Fun Size Candy Bars Variety</a></p>
        </li>
      </ul>
    </div>
  `
})

export class AmazonSearchInputComponent {
  areResultsVisible: boolean = false;

  showResults(value: boolean) {
    this.areResultsVisible = value;
  }
}
