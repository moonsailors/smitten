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
  template: `
  <div>
    <p-dialog header="Add a Post" [(visible)]="display" showEffect="fade">
      <p-selectButton [options]="postTypes" [(ngModel)]="selectedType" (click)="toggleType()"></p-selectButton>
      <div *ngIf="postInputNoteDisplay">
        <input type="text" pInputText [(ngModel)]="post.title"/>
        <textarea pInputTextarea [(ngModel)]="post.description"></textarea>
      </div>
      <div *ngIf="postInputPhotoDisplay">
        <input type="text" pInputText [(ngModel)]="post.title"/>
        <input type="text" pInputText [(ngModel)]="post.photos[0]"/>
      </div>
      <button (click)="hideDisplay()" pButton lable="exit"></button>
    </p-dialog>

    <button (click)="showDialog()" pButton icon="fa-externa-link-square" lable="Add"></button>
      
  </div>
  `
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
    type: this.selectedType,
    title: "",
    description: "",
    photos: [""],
  };

  onWishSubmit() {
    console.log('hit onWishSubmit', this.post);
    this.createWish.next(this.post);
  };
}
