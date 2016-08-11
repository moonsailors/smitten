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
      <a href="https://www.amazon.com/Hersheys-Nuggets-Chocolates-Assortment-38-5/dp/B004B9T82W/ref=sr_1_4_s_it?s=grocery&ie=UTF8&qid=1470895959&sr=1-4&keywords=chocolate">
        Hershey's Nuggets Chocolates Assortment, 38.5 oz
      </a>

      <img src="https://images-na.ssl-images-amazon.com/images/I/518dbDwAncL._AC_US174_.jpg">
      <a href=ttps://www.amazon.com/Lindt-LINDOR-Chocolate-Truffles-Count/dp/B002RBTV78/ref=sr_1_5_s_it?s=grocery&ie=UTF8&qid=1470895959&sr=1-5&keywords=chocolate">
        Lindt LINDOR Milk Chocolate Truffles, 60 Count Box
      </a>

      <img src="https://images-na.ssl-images-amazon.com/images/I/61qVDP4hZXL._AC_US174_.jpg">
      <a href="https://www.amazon.com/Ferrero-Rocher-Flat-48-Count/dp/B0042TVKZY/ref=sr_1_6_s_it?s=grocery&ie=UTF8&qid=1470895959&sr=1-6&keywords=chocolate">
        Ferrero Rocher, Flat 48 Count
      </a>

      <img src="https://images-na.ssl-images-amazon.com/images/I/513KacwBpML._AC_US174_.jpg">
      <a href="https://www.amazon.com/Hersheys-Chocolate-Full-Variety-30-Bar/dp/B000WL39JQ/ref=sr_1_7_s_it?s=grocery&ie=UTF8&qid=1470895959&sr=1-7&keywords=chocolate">
        Hershey's Chocolate Full Size Variety Pack (30-Bar Box)
      </a>

      <img src="https://images-na.ssl-images-amazon.com/images/I/514yrlYsvML._AC_US174_.jpg">
      <a href="https://www.amazon.com/Chocolate-Favorites-Variety-33-9-Ounce-60-Piece/dp/B00VZB1E4E/ref=sr_1_8_s_it?s=grocery&ie=UTF8&qid=1470895959&sr=1-8&keywords=chocolate">
        MARS Chocolate Favorites Fun Size Candy Bars Variety...
      </a>
    </div>
  `
})

export class AmazonSearchInputComponent {
  areResultsVisible: boolean = false;

  showResults(value: boolean) {
    this.areResultsVisible = value;
  }
}