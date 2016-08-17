import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sc-search-input',
  templateUrl: 'app/mixtape/search/search-input.component.html'
})
export class SoundCloudSearchInputComponent {
  @Output() onSearchSubmit = new EventEmitter<any>();

  resultMax: number = 50;
  search = {
    q: '',
    limit: this.resultMax
  };

  onSubmit() {
    console.log('sending your SoundCloud search query to server');

    if (this.search.q) {
      this.onSearchSubmit.emit(this.search);
    }

    this.search.q = '';
  }
}
