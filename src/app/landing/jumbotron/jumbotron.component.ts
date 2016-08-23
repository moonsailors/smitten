import { Component, OnInit } from '@angular/core';

import { JumbotronService } from './jumbotron.service';

@Component({
  selector: 'jumbotron',
  templateUrl: 'app/landing/jumbotron/jumbotron.component.html',
  styleUrls: ['app/landing/jumbotron/jumbotron.component.css'],
  providers: [JumbotronService]
})
export class JumbotronComponent implements OnInit {
  content: Object;

  constructor(private jumbotronService: JumbotronService) {}

  getContent() {
    this.jumbotronService.getContent()
      .then(content => this.content = content);
  }

  ngOnInit() {
    this.getContent();
  }
}
