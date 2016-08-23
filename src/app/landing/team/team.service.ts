import { Injectable } from '@angular/core';

import { TEAM_CONTENT } from './team-content';

@Injectable()
export class TeamService {
  getContent(): Promise<Object[]> {
    return Promise.resolve(TEAM_CONTENT);
  }
}
