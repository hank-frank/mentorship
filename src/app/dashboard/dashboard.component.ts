import { Component, OnInit, NgModule, Input } from '@angular/core';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ApiService } from '../api.service';
import { BarChartData } from './bar-chart/bar-chart-data.model';
import { PieChartData } from './pie-chart/pie-chart-data.model';

export class AppModule {
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @Input() currentUserData: any[any[any]];
  allUserData: any[any];
  mentorStats: any;
  menteeStats: any;
  mentorBarChartData: BarChartData;
  menteeBarChartData: BarChartData;
  mentorPieChartData: PieChartData;
  menteePieChartData: PieChartData;

  isMenteeDisplayed: boolean = false;
  isMentorDisplayed: boolean = false;

  constructor(private apiService: ApiService) {
    this.currentUserData = apiService.getUserData;
    apiService.getUserData().subscribe(
      data => {
        this.currentUserData = data;
        this.allUserData = data.allUsers;
        //console.log(data);
        this.mentorStats = data.currentUserData.stats.mentor;
        this.menteeStats = data.currentUserData.stats.mentee;
      },
      error => {
        console.log(`subscription error: `, error);
      }
    );
    apiService.getIsMenteeDisplayed().subscribe(
      data => {
        this.isMenteeDisplayed = data;
      },
      error => {
        console.log(`subscription error: `, error);
      }
    );
    apiService.getIsMentorDisplayed().subscribe(
      data => {
        this.isMentorDisplayed = data;
      },
      error => {
        console.log(`subscription error: `, error);
      }
    );
  }

  ngOnInit(): void {
    this.apiService.retrieveUserData();
    // console.log(`this.currentUserData:`,this.currentUserData);

    this.allUserData.columnHeaders = ['Name', 'Is Finished'];
    this.allUserData.tableTitle = 'All Users';
    this.allUserData.rowColors = ['#264653', '#E76F51'];

    this.mentorBarChartData = {
      barValues: [
        {
          name: 'Meetings Done',
          value: this.mentorStats.meetingsDone
        },
        {
          name: 'Satisfaction',
          value: this.mentorStats.satisfaction
        }
      ],
      showXAxisLabel: false,
      xAxisLabel: '',
      showYAxisLabel: true,
      yAxisLabel: 'Percentage',
      colors: ['#264653', '#2A9D8F'],
      title: 'Mentors'
    };

    this.menteeBarChartData = {
      barValues: [
        {
          name: 'Meetings Done',
          value: this.menteeStats.meetingsDone
        },
        {
          name: 'Satisfaction',
          value: this.menteeStats.satisfaction
        }
      ],
      showXAxisLabel: false,
      xAxisLabel: '',
      showYAxisLabel: true,
      yAxisLabel: 'Percentage',
      colors: ['#F4A261', '#E76F51'],
      title: 'Mentees'
    };

    this.mentorPieChartData = {
      pieValues: [
        {
          name: 'Not Started',
          value: this.mentorStats.notStarted
        },
        {
          name: 'In Progess',
          value: this.mentorStats.inProgress
        },
        {
          name: 'Completed',
          value: this.mentorStats.completed
        }
      ],
      piegradient: false,
      pieshowLegend: true,
      showLabels: true,
      isDoughnut: true,
      legendPosition: 'below',
      colors: ['#264653', '#2A9D8F', '#E9C46A'],
      title: 'Mentors'
    };

    this.menteePieChartData = {
      pieValues: [
        {
          name: 'Not Started',
          value: this.menteeStats.notStarted
        },
        {
          name: 'In Progess',
          value: this.menteeStats.inProgress
        },
        {
          name: 'Completed',
          value: this.menteeStats.completed
        }
      ],
      piegradient: false,
      pieshowLegend: true,
      showLabels: true,
      isDoughnut: true,
      legendPosition: 'below',
      colors: ['#264653', '#2A9D8F', '#E9C46A'],
      title: 'Mentors'
    };
  }
  closeCardMentee(event) {
    this.apiService.setIsMenteeDisplayed(false);
  }
  closeCardMentor(event) {
    this.apiService.setIsMentorDisplayed(false);
  }
}
