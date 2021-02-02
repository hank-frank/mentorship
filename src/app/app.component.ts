import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mentorship';
  // _subscription;
  //currentUserData: any[any];

  constructor(private apiService: ApiService) {
    // this.currentUserData = apiService.getUserData;
    // this._subscription = apiService.getUserData().subscribe((data) => { 
    //   // console.log('Subscribe is working App: ', data);
    //   this.currentUserData = data;    
    // }, error => {console.log(`subscription error: `, error)});
  }

  ngOnInit(): void {
    //only if youre logged in get your user Data. 
    // if (this.apiService.getIsAuth()){
    //   this.apiService.retrieveUserData();
    // }
  }
}
