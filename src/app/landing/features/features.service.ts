import { Injectable } from '@angular/core';

import { FEATURES_CONTENT } from './features-content';

@Injectable()
export class FeaturesService {
  getContent(): Promise<Object[]> {
    return Promise.resolve(FEATURES_CONTENT);
  }
}
