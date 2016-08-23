import { Injectable } from '@angular/core';

import { JUMBOTRON_CONTENT } from './jumbotron-content';

@Injectable()
export class JumbotronService {
  getContent(): Promise<Object[]> {
    return Promise.resolve(JUMBOTRON_CONTENT);
  }
}
