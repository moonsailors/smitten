import { Component, OnInit } from '@angular/core';

import { TestimonialsService } from './testimonials.service';

@Component({
  selector: 'testimonials',
  templateUrl: 'app/landing/testimonials/testimonials.component.html',
  styleUrls: ['app/landing/testimonials/testimonials.component.css'],
  providers: [TestimonialsService]
})
export class TestimonialsComponent implements OnInit {
  content: Object;

  constructor(private testimonialsService: TestimonialsService) {}

  getContent() {
    this.testimonialsService.getContent()
      .then(content => this.content = content);
  }

  ngOnInit() {
    this.getContent();
  }
}
