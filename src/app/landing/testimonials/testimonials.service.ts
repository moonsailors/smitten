import { Injectable } from '@angular/core';

import { TESTIMONIALS_CONTENT } from './testimonials-content';

@Injectable()
export class FeaturesService {
  getContent(): Promise<Object[]> {
    return Promise.resolve(TESTIMONIALS_CONTENT);
  }
}
