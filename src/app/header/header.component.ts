import { Component, OnInit, OnChanges, SimpleChanges, Input} from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private apiService: ApiService) {
    this.currentUserData = apiService.getUserData;
    this._subscription = apiService.getUserData().subscribe((data) => { 
      // console.log('Subscribe is working Header: ', data);
      this.currentUserData = data;
      // this.updateRole();
      // console.log(this.currentUserRole);
    }, error => {console.log(`subscription error: `, error)});
  }
  
  _subscription;
  @Input() currentUserData: any[any];
  @Input() currentUserRole: string;

  // updateRole() {
  //   console.log(`in update method`);
  //   this.apiService.getUserRole().subscribe((role) => {
  //     this.currentUserRole = role;
  //   });
  // }

  ngOnInit(): void {
    this.apiService.retrieveUserData();
  }

  testClick() {
    console.log(`clickevent: `, this.currentUserData);
  }

  //Behavior subject of logged in or not, if im logged in check role.

}
