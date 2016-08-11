import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: "wish-input",
  styles: [],
  template: `
  <div>
    Shalom
    <form (ngSubmit)="onWishSubmit()">
      <input type="text" [(ngModel)]="wish.title" name="title" placeholder="...add a title">
      <input type="text" [(ngModel)]="wish.title" name="description" placeholder="...add a description">
      <button type="submit">Add</button>
    </form>
  </div>
  `
})

export class WishInput {
  @Output() createWish = new EventEmitter();

  wish = {
    title: "",
    description: "",
  }

  onWishSubmit(){
    this.createWish.next(this.wish);
  }
}
