import { Injectable } from '@angular/core';

import { ApiService } from '../../services/index';

@Injectable()
export class SearchSoundCloud {
  constructor(private apiService: ApiService) {}

  search(searchParams) {
    return this.apiService.post('/api/soundcloud-search', searchParams);
  }
}
