import { Component, OnInit } from '@angular/core';

import { LandingNavService } from './nav.service';

@Component({
  selector: 'landing-nav',
  templateUrl: 'app/landing/nav/nav.component.html',
  styleUrls: ['app/landing/nav/nav.component.css'],
  providers: [LandingNavService]
})
export class LandingNavComponent implements OnInit {
  brand: Object;
  links: Object[];

  constructor(private navService: LandingNavService) {}

  getBrand(): void {
    this.navService.getBrand()
      .then(brand => this.brand = brand);
  }

  getLinks(): void {
    this.navService.getLinks()
      .then(links => this.links = links);
  }

  ngOnInit() {
    this.getBrand();
    this.getLinks();
  }
}
