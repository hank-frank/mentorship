/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ApiService } from '../../api.service';
import { DashboardComponent } from '../dashboard.component';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';



import { MenteeData } from '../../interfaces/menteeData.model';
import { MentorData } from '../../interfaces/mentorData.model';
import { TableUsers } from 'src/app/interfaces/tableAllUsers.model';


@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    // encapsulation: ViewEncapsulation.None,
})

export class TableComponent implements OnInit {
    @Input() incommingAllUserData: Array<TableUsers>;
    allUserData: Array<TableUsers>;
    tableRows: any[];
    tableColumns: any[];
    // rowElement: any;
    // selected = [];
    theme: 'dark' | 'light' = 'dark';
    tableTitle = 'All Users';


    constructor(
        private apiService: ApiService,
        private router: Router,
        private dashboard: DashboardComponent
    ) {
        apiService.getTheme().subscribe((theme) => {
            if (theme === 'dark' || theme === 'light') {
                this.theme = theme;
            }
        });
    }

    ngOnInit(): void {
        this.allUserData = this.incommingAllUserData;
        const tableRowArr = [];
        for (let i = 0; i < this.allUserData.length; i++) {
            // constructs table row data
            tableRowArr.push({
                name: this.allUserData[i].userData.name,
                isFinished: this.allUserData[i].userData.isFinished,
                role: this.allUserData[i].userData.role,
                click: '<mat-icon>launch</mat-icon>'
            });
        }
        // this.allUserData.rowColors = ['#264653', '#E76F51'];
        this.tableColumns = [
            { name: 'Name' },
            { name: 'Is Finished' },
            {name : 'click'}
        ];

        this.tableRows = tableRowArr;
    }


    getRowClass = (row: any) => ({
        'mentee-row-color': row.role === 'mentee',
        'mentor-row-color': row.role === 'mentor',
    });

    // puts selected rows into an array, not sure how to style from that
    // onSelect({ selected }) {
    //   console.log('Select Event', selected, this.selected);
    // }


    tableRowOnClick(event): void {
    // This click event works, finds the user data and sends it to the method in apiService, for some reason though in teh mentor/mentee components the data gets lost

        if (event.type === 'click'){
            const clickedUserName = event.row.name;
            console.log('clicked table row: ', clickedUserName, this.allUserData[0]);
            for (let i = 0; i < this.allUserData.length; i++) {
                if (this.allUserData[i].userData.name === clickedUserName) {
                    console.log('table matched clicked userData: ', this.allUserData[i]);

                    // let formattedUserDataObject: MentorData | MenteeData = ({
                    //     currentUserData: this.allUserData[i],
                    // });


                    if (this.allUserData[i].userData.role === 'mentee') {
                        const formattedUserDataObject = ({
                            currentUserData: this.allUserData[i]
                        });
                        this.apiService.setMenteeDisplayData(formattedUserDataObject as MenteeData);
                        this.apiService.setIsMenteeDisplayed(true);
                        // this.router.navigate(['./mentee']);


                    } else if (this.allUserData[i].userData.role === 'mentor') {
                        const formattedUserDataObject = ({
                            currentUserData: this.allUserData[i]
                        });
                        this.apiService.setMentorDisplayData(formattedUserDataObject as MentorData);
                        this.apiService.setIsMentorDisplayed(true);
                        // this.router.navigate(['./mentor']);
                    }
                }
            }

        }
    }

}
