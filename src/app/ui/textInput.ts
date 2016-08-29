import { Component,
         Input,
         Output,
         EventEmitter } from '@angular/core';
import { Dialog, Button, InputText, Calendar } from 'primeng/primeng';

@Component ({
  selector: 'text-input',
  styles: [],
  directives: [ Dialog, Button, InputText, Calendar ],
  templateUrl: 'app/ui/templates/textInput.html'
})

export class TextInput {
  @Output () emitText =  new EventEmitter();
  constructor () {}

  event = {
    phone: "",
    text: "",
    time: ""
  };

  display: boolean = false;

  addText() {
    this.emitText.next(this.event);
    this.display = false;
    this.event = {
                  phone: "",
                  text: "",
                  time: ""
                };
  };

  showDialog() {
    this.display = true;
  };

};
