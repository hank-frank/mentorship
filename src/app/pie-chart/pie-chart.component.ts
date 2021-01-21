import { Component, OnInit, NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ApiService } from '../api.service';

var pieChartSingle = [
  {
    "name": "Not Started",
    "value": 2
  },
  {
    "name": "In Progess",
    "value": 3
  },
  {
    "name": "Completed",
    "value": 4
  },
];

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})

export class PieChartComponent implements OnInit {
  pieChartData: any[];
  constructor() {

    this.pieChartData = pieChartSingle;
  }

  ngOnInit(): void {
  }
  //Pie Chart options
  view: any[] = [700, 400];

  piegradient: boolean = true;
  pieshowLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  piecolorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
}
