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
        <h6>title</h6>
        <input type="text" pInputText [(ngModel)]="post.title"/>
        <h6>description</h6>
        <textarea pInputTextarea [(ngModel)]="post.description"></textarea>
      </div>
      <div *ngIf="postInputPhotoDisplay">
        <h6>album name</h6>
        <input type="text" pInputText [(ngModel)]="post.title"/>
        <h6>image title</h6>
        <input type="text" pInputText [(ngModel)]="post.photos[0].title"/>
        <h6>image</h6>
        <input type="text" placeholder = "paste in pic URL" pInputText [(ngModel)]="post.photos[0].source"/>
      </div>
      <button (click)="onWishSubmit()" pButton label="Add Post-it!"></button>
    </p-dialog>

    <button (click)="showDialog()" pButton icon="fa-external-link-square" label="Add"></button>

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
