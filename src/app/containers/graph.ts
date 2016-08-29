import { Component } from '@angular/core';
import { LineGraph } from '../ui/index';

@Component({
  selector: 'graph',
  directives: [
    LineGraph
  ],
  styleUrls: [],
  templateUrl: 'app/containers/templates/graph.html'
})
export class Graph {}
