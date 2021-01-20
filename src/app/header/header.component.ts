import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private apiService: ApiService) { }
  currentUserData: any[any];
  userRole: string;

  ngOnInit(): void {

    //not working because this value doesn't exist when header inits, it needs to be updated after login. 
    // this.currentUserData = this.apiService.currentUserData;
    // console.log(`Header component User Data: `, this.currentUserData);
    // this.userRole = this.currentUserData.userData.role;

    const getComponentData = async () => {
      if (localStorage.getItem('userData') != null) {
        this.currentUserData = JSON.parse(localStorage.getItem('userData')); 
      } else {
        let fetchedData = await this.apiService.retrieveUserData();
        this.currentUserData = fetchedData;
      }
    }

    getComponentData();
  }

  // public updateUserDataInHeader (userData) {
  //   console.log(`Header update working, `, userData);
  //   this.currentUserData = userData;
  //   this.userRole = this.currentUserData.userData.role;
  // }

  

}
