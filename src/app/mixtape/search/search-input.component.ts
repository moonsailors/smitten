import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'sc-search-input',
  templateUrl: 'app/mixtape/search/search-input.component.html',
  styleUrls: ['app/mixtape/search/search-input.component.css']
})
export class SoundCloudSearchInputComponent {
  @Output() onSearchSubmit = new EventEmitter<any>();

  resultMax: number = 1;
  search = {
    q: '',
    limit: this.resultMax
  };

  onSubmit() {
    if (this.search.q) {
      this.onSearchSubmit.emit(this.search);
    }

    this.search.q = '';
  }
}
