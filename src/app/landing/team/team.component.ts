import { Component, OnInit } from '@angular/core';

import { TeamService } from './team.service';

@Component({
  selector: 'team',
  templateUrl: 'app/landing/team/team.component.html',
  styleUrls: ['app/landing/team/team.component.css'],
  providers: [TeamService]
})
export class TeamComponent implements OnInit {
  content: Object;

  constructor(private teamService: TeamService) {}

  getContent() {
    this.teamService.getContent()
      .then(content => this.content = content);
  }

  ngOnInit() {
    this.getContent();
  }
}
