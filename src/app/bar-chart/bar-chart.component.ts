import { Component, OnInit, Input, HostListener } from '@angular/core';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})


export class BarChartComponent implements OnInit {
  barChartData: any[];
  pairs: any[];
  @Input() incomingBarChartData;
  innerWidth;
  showXAxisLabel;
  xAxisLabel;
  showYAxisLabel;
  yAxisLabel;
  barChartHeight: number = 700;
  barChartWidth: number = 400;

  constructor() {
  }
  
  ngOnInit(): void {
    this.pairs=this.incomingBarChartData.pairs;
    this.showXAxisLabel=this.incomingBarChartData.showXAxisLabel;
    this.xAxisLabel=this.incomingBarChartData.xAxisLabel;
    this.showYAxisLabel=this.incomingBarChartData.showYAxisLabel;
    this.yAxisLabel=this.incomingBarChartData.yAxisLabel;
  }
  
  view: any[] = [this.barChartWidth, this.barChartHeight];
  
  // Bar chart options
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.barChartHeight = 400;
    this.barChartWidth = this.innerWidth * 0.8;
    // console.log(innerWidth);
    if(this.innerWidth < 550) {
    }
  }
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  // showXAxisLabel = false;
  // xAxisLabel = '';
  // showYAxisLabel = true;
  // yAxisLabel = 'Percentage';
  // yScaleMin = 100; We need to figure out how to set max scale to 100

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

}
