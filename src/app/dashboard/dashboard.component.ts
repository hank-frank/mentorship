// /* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component, OnInit, NgModule, Input } from '@angular/core';
// import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ApiService } from '../api.service';

import { BarChartData } from './bar-chart/bar-chart-data.model';
import { PieChartData } from './pie-chart/pie-chart-data.model';
import { MenteeData } from '../interfaces/menteeData.model';
import { MentorData } from '../interfaces/mentorData.model';
import { AdminData } from '../interfaces/adminData.model';
import { MentorStats } from '../interfaces/adminMentorStats.model';
import { MenteeStats } from '../interfaces/adminMenteeStats.model';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    @Input() currentUserData: MentorData | MenteeData | AdminData;
    allUserData: Array<MentorData | MenteeData>;
    mentorStats: MentorStats;
    menteeStats: MenteeStats;
    mentorBarChartData: BarChartData;
    menteeBarChartData: BarChartData;
    mentorPieChartData: PieChartData;
    menteePieChartData: PieChartData;
    isMenteeDisplayed = false;
    isMentorDisplayed = false;

    constructor(private apiService: ApiService) {
        apiService.getUserData().subscribe((data: AdminData) => {
            this.currentUserData = data;
            this.allUserData = data.allUsers;
            this.mentorStats = data.currentUserData.stats.mentor;
            this.menteeStats = data.currentUserData.stats.mentee;
        }, (error) => {console.log('subscription error: ', error); }
        );

        apiService.getIsMenteeDisplayed().subscribe((data) => {
            this.isMenteeDisplayed = data;
        }, (error) => {console.log('subscription error: ', error); }
        );

        apiService.getIsMentorDisplayed().subscribe((data) => {
            this.isMentorDisplayed = data;
        }, (error) => {console.log('subscription error: ', error); }
        );
    }

    ngOnInit(): void {
        this.apiService.retrieveUserData();

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

    closeCardMentee(event: Event): void {
        this.apiService.setIsMenteeDisplayed(false);
    }

    closeCardMentor(event: Event): void {
        this.apiService.setIsMentorDisplayed(false);
    }

}
