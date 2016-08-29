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
  styleUrls: ['app/ui/css/line-graph.css' ],
  templateUrl: 'app/ui/templates/line-graph.html'
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
          data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
          label: 'Partner 2',
          data: [28, 48, 40, 19, 86, 27, 90]
        }] };
 labels =  ['8/25', '8/24', '8/23', '8/22', '8/21', '8/20', '8/19'];

  legend = true;

  constructor() {};


}
