import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ApiService } from '../../api.service';
import { DashboardComponent } from '../dashboard.component'
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private router: Router,
    private dashboard: DashboardComponent
    ) { }

  @Input() incommingAllUserData;
  allUserData: any[any];
  tableRows: any[];
  tableColumns: any[]

  ngOnInit(): void {
    this.allUserData = this.incommingAllUserData;
    let tableRowArr = [];
    for (let i = 0; i < this.allUserData.length; i++) {
      // //colors hard coded tables table rows
      // if (this.allUserData[i].userData.role === 'mentor') {
      //   this.allUserData[i].tableRowColor = { 'background-color': this.allUserData.rowColors[0] };
      // } else if (this.allUserData[i].userData.role === 'mentee') {
      //   this.allUserData[i].tableRowColor = { 'background-color': this.allUserData.rowColors[1] };
      // }

      //constructs table row data
      tableRowArr.push({
        name: this.allUserData[i].userData.name,
        isFinished: this.allUserData[i].userData.isFinished,
        role: this.allUserData[i].userData.role
      });

    };
    this.tableColumns = [
      { name: this.allUserData.columnHeaders[0] }, 
      { name: this.allUserData.columnHeaders[1] }
    ]
    this.tableRows = tableRowArr;
  };

  getRowClass = (row) => {
    //This isn't working? https://stackblitz.com/edit/angular-ngx-datatable-row-color-tzzfb9?file=app%2Fapp.component.ts
    // console.log(row.role)
      return {
        'mentee-row-color': row.role == 'mentee',
        'mentor-row-color': row.role == 'mentor',
        // 'mentee-row-color': true
      };
  }






  tableRowOnClick(event) {
    //This click event works, finds the user data and sends it to the method in apiService, for some reason though in teh mentor/mentee components the data gets lost

    if(event.type === 'click'){
      let clickedUserName = event.row.name;
      console.log(`clicked table row: `, clickedUserName, this.allUserData[0]);
      for (let i = 0; i < this.allUserData.length; i++) {
        if (this.allUserData[i].userData.name === clickedUserName) {
          console.log(`table matched clicked userData: `, this.allUserData[i]);

          let formattedUserDataObject = ({
            currentUserData: this.allUserData[i]
          })

          if (this.allUserData[i].userData.role === 'mentee') {
            this.apiService.setMenteeDisplayData(formattedUserDataObject);
            console.log(`settingMenteeData: `, formattedUserDataObject);
            this.router.navigate(['./mentee']);
            
          } else if (this.allUserData[i].userData.role === 'mentor') {
            this.apiService.setMentorDisplayData(formattedUserDataObject);
            this.router.navigate(['./mentor']);
          }
        }
      }
    }
  }

}
