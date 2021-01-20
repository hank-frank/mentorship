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
    // this.currentUserData = apiService.currentUserData.asObservable();
    this.currentUserData = apiService.currentUserData;
    this._subscription = apiService.currentUserData.subscribe((value) => { 
      console.log('Subscribe is working Header: ', value);
      this.currentUserData = value;    
    }, error => {console.log(`subscription error: `, error)});
  }
  
  _subscription;
  currentUserData: any[any];

  ngOnInit(): void {
    this.apiService.retrieveUserData();
  }
}
