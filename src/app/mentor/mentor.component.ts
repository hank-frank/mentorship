import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss']
})
export class MentorComponent implements OnInit {

    constructor(private apiService: ApiService) {
      this.currentUserData = apiService.getUserData;
      this._subscription = apiService.getUserData().subscribe((data) => { 
        console.log('Subscribe is working Mentor: ', data);
        this.currentUserData = data;    
      }, error => {console.log(`subscription error: `, error)});
    }
    
    _subscription;
    @Input() currentUserData: any[any];
    
    currentUserRole: string;
  
    ngOnInit(): void {
      this.apiService.retrieveUserData();
    }

}
