import { Component, OnInit, Input, HostListener } from '@angular/core';
import { BarChartData } from  './bar-chart-data.model'
import { ApiService } from '../../api.service';

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
  public showXAxisLabel : boolean;
  public xAxisLabel : string;
  public showYAxisLabel: boolean;
  public yAxisLabel: string;
  public barChartHeight: number = 700;
  public barChartWidth: number = 400;
  public showXAxis : boolean = true;
  public showYAxis : boolean = true;
  public gradient : boolean = false;
  public showLegend : boolean = true;
  public colors : Array<string> = ['#808080', '#505050'];
  public view = [400, window.innerWidth * 0.8];
  public title: string = 'Bar Chart';
  colorScheme = {
    domain: this.colors
  };
  theme : 'dark' | 'light' = 'dark';

  constructor(private apiService: ApiService) {
    apiService.getTheme().subscribe((theme) => {
      if (theme === 'dark' || theme === 'light') {
        this.theme = theme;
      }
    });
    this.innerWidth = window.innerWidth;
    this.innerWidth > 768 ? this.view = [innerWidth * 0.4, 400] : this.view = [innerWidth * 0.8, 400];
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
    this.onResize({});
  }

  // Window width listener
  @HostListener('window:resize', ['$event'])
  onResize(event)  {
    this.innerWidth = window.innerWidth;
    console.log(`width listener: `, this.innerWidth);
    this.innerWidth > 768 ? this.view = [this.innerWidth * 0.4, 400] : this.view = [this.innerWidth * 0.8, 400];
    console.log(`viewL `, this.view);
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

}
