// import { UIChart } from 'primeng/primeng';
import { CHART_DIRECTIVES } from 'ng2-charts/ng2-charts';
import { Component } from '@angular/core';
import { CORE_DIRECTIVES,
        FORM_DIRECTIVES,
        NgClass } from '@angular/common';


@Component({
  selector: 'line-graph',
  directives: [ CHART_DIRECTIVES,
              CORE_DIRECTIVES,
              FORM_DIRECTIVES,
              NgClass ],
  styles: [ `
    .chart {display: block;
            width: 800px;
            height: 500px;}
  `],
  template: `
     <base-chart class="chart"
                [datasets]="data.datasets"
                [chartType]="line"
                [options]="options"
                [labels] = "labels"
                [legend] = "legend"
                ></base-chart>
    `
})

export class LineGraph {
  options = {animation: false,
        responsive: true,
        maintainAspectRatio: false,
        title: {
          fullWidth: true,
          display: true,
          text: 'Our Moods',
          fontSize: 16
        }};
  line = "line";
  msgs = [];
  data = { datasets: [{
          label: 'Partner 1',
          // data: ['positive', 'neutral', 'negative', 'positive', 'positive', 'positive', 'neutral'],
          data: [65, 59, 80, 81, 56, 55, 40]
          // fill: false,
          // borderColor: '#4bc0c0'
        },
        {
          label: 'Partner 2',
          // data: ['negative', 'neutral', 'neutral', 'positive', 'positive', 'positive', 'neutral'],
          data: [28, 48, 40, 19, 86, 27, 90]
          // fill: false,
          // borderColor: '#565656'
        }] };
 labels =  ['8/25', '8/24', '8/23', '8/22', '8/21', '8/20', '8/19'];

  legend = true;

  constructor() {

      // yLabels: ['negative', 'neutral', 'positive'],


    // this.options = {
    //   title: {
    //     display: true,
    //     text: 'Our Moods',
    //     fontSize: 16
    //   },
    //   legend: {
    //     position: 'bottom'
    //   }
    // };

  };

  // selectData(event) {
  //   this.msgs.push({
  //     severity: 'info',
  //     summary: 'Data Selected',
  //     'detail': this.data.datasets[event.element._datasetIndex].data[event.element._index]});
  // }
}
