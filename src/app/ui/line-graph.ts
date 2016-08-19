import {UIChart} from 'primeng/primeng';
import { Component } from '@angular/core'

@UIChart({
  selector: 'line-graph',
  styles:[],
  directives: [UIChart],
  template:`
    <p-chart type='line' [data]='data'></p-chart>
  `
})

export class LineGraph {

  data: any;

  msgs: Message[];

  constructor() {
    this.data = {
      xLabels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      yLabels: ['negative', 'neutral', 'positive'],
      datasets: [
        {
          label: 'Partner 1',
          data: ['positive', 'neutral', 'negative', 'positive', 'positive', 'positive', 'neutral'],
          fill: false,
          borderColor: '#4bc0c0'
        },
        {
          label: 'Partner 2',
          data: ['negative', 'neutral', 'neutral', 'positive', 'positive', 'positive', 'neutral'],
          fill: false,
          borderColor: '#565656'
        }
      ]
    }
    this.options = {
      title: {
        display: true,
        text: 'Our Moods',
        fontSize: 16
      },
      legend: {
        position: 'bottom'
      }
    }
  }

  selectData(event) {
    this.msgs = [];
    this.msgs.push({severity: 'info', summary: 'Data Selected', 'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
  }
}