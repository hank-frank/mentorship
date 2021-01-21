import { Component, OnInit, NgModule } from '@angular/core';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  allUserData: any[];
  constructor(private apiService: ApiService) {
  }

barChartData = {
  pairs: [
    {
      "name": "Meetings Done",
      "value": 80
    },
    {
      "name": "Satisfaction",
      "value": 60
    },
  ],
  showXAxisLabel: false,
  xAxisLabel: '',
  showYAxisLabel: true,
  yAxisLabel: 'Percentage',
};

  ngOnInit(): void {
    let userDataRequest = async () => {
      let dashboardResponse = await this.apiService.retrieveUserData();
      let allUserData = await dashboardResponse;
      console.log(`DashboardComponent Resposne: ${JSON.stringify(allUserData)}`);
    }
    userDataRequest();
  }
}
