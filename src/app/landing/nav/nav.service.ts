import { Injectable } from '@angular/core';

import { NAV_BRAND } from './nav-brand';
import { NAV_LINKS } from './nav-links';

@Injectable()
export class LandingNavService {
  getBrand(): Promise<Object[]> {
    return Promise.resolve(NAV_BRAND);
  }

  getLinks(): Promise<Object[]> {
    return Promise.resolve(NAV_LINKS);
  }
}
