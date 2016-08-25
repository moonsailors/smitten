import { Component } from '@angular/core';
import { LineGraph } from '../ui/index';

@Component({
  selector: 'graph',
  directives: [
    LineGraph
  ],
  styles: [],
  template: `
    <div class="fade-in">
     <line-graph></line-graph>
    </div>
  `
})
export class Graph {}
