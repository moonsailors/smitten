import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: "wish-input",
  styles: [],
  template: `
  <div>
    Shalom
    <form>
      <input type="text" placeholder="...add a description">

    </form>
  </div>
  `
})

export class WishInput {
  @Output() createWish = new EventEmitter();

  wish = {
    title: "",
    description: ""

  };
}
