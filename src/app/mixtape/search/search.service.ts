import { Injectable } from '@angular/core';

import { ApiService } from '../../services/index';

@Injectable()
export class SearchSoundCloud {
  constructor(private apiService: ApiService) {}

  search(searchParams) {
    console.log('making the API call to SoundCloud');

    return this.apiService.post('/api/soundcloud-search', searchParams);
  }
}
