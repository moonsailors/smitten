import { Component, OnInit } from '@angular/core';

import { FeaturesService } from './features.service';

@Component({
  selector: 'features',
  templateUrl: 'app/landing/features/features.component.html',
  styleUrls: ['app/landing/features/features.component.css'],
  providers: [FeaturesService]
})
export class FeaturesComponent implements OnInit {
  content: Object;

  constructor(private featuresService: FeaturesService) {}

  getContent() {
    this.featuresService.getContent()
      .then(content => this.content = content);
  }

  ngOnInit() {
    this.getContent();
  }
}
