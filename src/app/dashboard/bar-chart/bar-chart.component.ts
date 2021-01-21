import { Component, OnInit, Input, HostListener } from '@angular/core';
import { BarChartData } from  './bar-chart-data.model'

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})

export class BarChartComponent implements OnInit {
  @Input() incomingBarChartData: BarChartData;
  public barChartData: any[];
  public barValues: any[];
  public innerWidth;
  public showXAxisLabel;
  public xAxisLabel;
  public showYAxisLabel;
  public yAxisLabel;
  public barChartHeight: number = 700;
  public barChartWidth: number = 400;
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public colors = ['#808080', '#505050'];
  public view: any[] = [400, window.innerWidth * 0.8];
  public title: string = 'Bar Chart';
  colorScheme = {
    domain: this.colors
  };

  constructor() {
  }
  
  ngOnInit(): void {
    this.barValues=this.incomingBarChartData.barValues;
    this.showXAxisLabel=this.incomingBarChartData.showXAxisLabel;
    this.xAxisLabel=this.incomingBarChartData.xAxisLabel;
    this.showYAxisLabel=this.incomingBarChartData.showYAxisLabel;
    this.yAxisLabel=this.incomingBarChartData.yAxisLabel;
    this.colors = this.incomingBarChartData.colors;
    this.title = this.incomingBarChartData.title;
    this.colorScheme = {
        domain: this.colors
    }
    console.log(this.colors, this.incomingBarChartData.colors);

    this.onResize({});
  }

  // Window width listener
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.innerWidth > 768 ? this.view = [this.innerWidth * 0.4, 400] : this.view = [this.innerWidth * 0.8, 400]
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

}
