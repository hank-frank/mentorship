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
    apiService.getUserData().subscribe((data) => { 
      // console.log('Subscribe is working Header: ', data);
      this.currentUserData = data;
    }, error => {console.log(`subscription error: `, error)});
    this.currentUserRole = apiService.getUserRole;
    apiService.getUserRole().subscribe((role) => {
      this.currentUserRole = role;
      console.log(`role: `, this.currentUserRole);
    });
  }
  
  @Input() currentUserData: any[any];
  @Input() currentUserRole: any;

  ngOnInit(): void {
    this.apiService.retrieveUserData();
  }

  testClick() {
    console.log(`clickevent: `, this.currentUserRole);
  }

  //Behavior subject of logged in or not, if im logged in check role.

}
