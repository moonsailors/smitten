import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Dialog } from 'primeng/primeng';
import { Button, SelectButton, InputText, InputTextarea } from 'primeng/primeng';


@Component({
  selector: "wish-input",
  styles: [],
  directives: [
    Button, 
    Dialog,
    SelectButton,
    InputText,
    InputTextarea
  ],
  template: `
  <div>
    <p-dialog header="Add a Post" [(visible)]="display">
      <p-selectButton [options]="postTypes" [(ngModel)]="selectedType" (click)="toggleType()"></p-selectButton>
      <div *ngIf="postInputNoteDisplay">
        <input type="text" pInputText [(ngModel)]="post.title"/>
        <textarea pInputTextarea [(ngModel)]="post.description"></textarea>
      </div>
      <div *ngIf="postInputPhotoDisplay">

      </div>
      <div *ngIf="postInputReminderDisplay">

      </div>
      <button (click)="hideDisplay()" pButton lable="exit"></button>
    </p-dialog>

    <button (click)="showDialog()" pButton icon="fa-externa-link-square" lable="Add"></button>
      
  </div>
  `
})

// <form (ngSubmit)="onWishSubmit()">
//   <input type="text" [(ngModel)]="wish.title" name="title" placeholder="...add a title">
//   <input type="text" [(ngModel)]="wish.description" name="description" placeholder="...add a description">
//   <button type="submit">Add</button>
// </form>

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
    { label: 'photo', value: 'photo' },
    { label: 'reminder', value: 'reminder' }
  ];

  postInputNoteDisplay: boolean = false;
  postInputPhotoDisplay: boolean = false;
  postInputReminderDisplay: boolean = false;

  toggleType() {
    if (this.selectedType === 'note') {
      this.postInputNoteDisplay = true;
      this.postInputPhotoDisplay = false;
      this.postInputReminderDisplay = false;
    }else if (this.selectedType === 'photo') {
      this.postInputNoteDisplay = false;
      this.postInputPhotoDisplay = true;
      this.postInputReminderDisplay = false;
    }else {
      this.postInputNoteDisplay = false;
      this.postInputPhotoDisplay = false;
      this.postInputReminderDisplay = true;
    }
  }

  post = {
    title: "",
    description: "",
  };

  onWishSubmit() {
    console.log('hit onWishSubmit', this.post);
    this.createWish.next(this.post);
  };
}
