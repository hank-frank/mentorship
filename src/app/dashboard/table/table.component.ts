import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor() { }

  @Input() incommingAllUserData;
  allUserData: any[any];
  tableRows: any[];
  tableColumns: any[]

  ngOnInit(): void {
    this.allUserData = this.incommingAllUserData;
    let tableRowArr = [];
    for (let i = 0; i < this.allUserData.length; i++) {
      //colors hard coded tables table rows
      if (this.allUserData[i].userData.role === 'mentor') {
        this.allUserData[i].tableRowColor = { 'background-color': this.allUserData.rowColors[0] };
      } else if (this.allUserData[i].userData.role === 'mentee') {
        this.allUserData[i].tableRowColor = { 'background-color': this.allUserData.rowColors[1] };
      }

      //constructs table row data
      tableRowArr.push({
        name: this.allUserData[i].userData.name,
        isFinished: this.allUserData[i].userData.isFinished
      });

    };
    this.tableColumns = [
      { name: this.allUserData.columnHeaders[0] }, 
      { name: this.allUserData.columnHeaders[1] }
    ]
    this.tableRows = tableRowArr;
  };

}
