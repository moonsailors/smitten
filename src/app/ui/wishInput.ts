import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from 'primeng/primeng';
import { Button, SelectButton, InputText, InputTextarea, Calendar } from 'primeng/primeng';


@Component({
  selector: "wish-input",
  styles: [],
  directives: [
    Button,
    Dialog,
    SelectButton,
    InputText,
    InputTextarea,
    Calendar
  ],
  templateUrl: 'app/ui/templates/wishInput.html'
})

export class WishInput {
  @Output() createWish = new EventEmitter();

  display: boolean = false;

  showDialog() {
    this.display = true;
  }
  hideDisplay() {
    this.display = false;
  }

  selectedType: string = "";
  postTypes = [
    { label: 'note', value: 'note' },
    { label: 'photos', value: 'photos' }
  ];

  postInputNoteDisplay: boolean = false;
  postInputPhotoDisplay: boolean = false;
  postInputReminderDisplay: boolean = false;

  toggleType() {
    if (this.selectedType === 'note') {
      this.postInputNoteDisplay = true;
      this.postInputPhotoDisplay = false;
    }else {
      this.postInputNoteDisplay = false;
      this.postInputPhotoDisplay = true;
    }
  }

  post = {
    type: "",
    title: "",
    description: "",
    photos: [ { source: "" } ],
    coordinates: {
      top: "40px",
      left: "300px"
    }
  };

  onWishSubmit() {
    this.post.type = this.selectedType;
    console.log('hit onWishSubmit', this.post);
    this.hideDisplay();
    this.createWish.next(this.post);
  };
}
