import { Component,
         Input,
         Output,
         EventEmitter } from '@angular/core';
import { Dialog, Button, InputText, Calendar } from 'primeng/primeng';

@Component ({
  selector: 'text-input',
  styles: [],
  directives: [ Dialog, Button, InputText, Calendar ],
  template: `
    <div>
     <p-dialog header="Create New Text Reminder" [(visible)]="display" modal="modal" showEffect="fade">
      <footer>
      <form class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix" (ngSubmit)="addText()">
        Phone Number
        <input pInputText type="text" [(ngModel)]="event.phone" name="phone" placeholder="e.g. 14151234567">
        <br>
        Text Message
        <input pInputText type="text" [(ngModel)]="event.user" name="user" placeholder="...add a text message">

        <button pButton class="ui-button" type="submit" label="Add"></button>
      </form>
      </footer>
      </p-dialog>

      <button type="text" class="ui-button" (click)="showDialog()" pButton label="Create Text Reminder"></button>
    </div>
  `
})

export class TextInput {

  constructor () {}

  event = {
    phone: "",
    text: "",
    time: ""
  };

  display: boolean = false;

  addText() {
    console.log("hit add text button");
  }

  showDialog() {
    this.display = true;
  };

};
