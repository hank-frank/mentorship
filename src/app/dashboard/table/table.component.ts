import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor() { }

  @Input() incommingAllUserData;
  allUserData;

  ngOnInit(): void {
    this.allUserData = this.incommingAllUserData;
  }

}
