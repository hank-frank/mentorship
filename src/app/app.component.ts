import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mentorship';

  constructor(private apiService: ApiService) {
    this.currentUserData = apiService.getUserData;
    this._subscription = apiService.getUserData().subscribe((data) => { 
      console.log('Subscribe is working Header: ', data);
      this.currentUserData = data;    
    }, error => {console.log(`subscription error: `, error)});
  }
  
  _subscription;
  currentUserData: any[any];

  ngOnInit(): void {
    this.apiService.retrieveUserData();
  }
}
