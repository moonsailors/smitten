import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import { ApiService } from '../../services/index';

@Injectable()
export class SearchSoundCloud {
  results: Observable<any>;

  constructor(private apiService: ApiService) {}

  search(searchParams) {
    console.log('making the API call to SoundCloud');

    this.apiService.post('/api/soundcloud-search', searchParams)
      .subscribe(
        results => {
          console.log('soundcloud results received from server');
          this.results = results._body;
        },
        err => console.log('error: ', err),
        () => console.log(this.results));
  }
}
