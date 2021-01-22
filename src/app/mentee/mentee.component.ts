import { Component, Input,OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentee',
  templateUrl: './mentee.component.html',
  styleUrls: [ './mentee.component.scss']
})
export class MenteeComponent implements OnInit {

  @Input() onboarding: boolean;
  @Input() matched: boolean;
  @Input() introduced: boolean;
  @Input() schedule: boolean;
  @Input() smart: boolean;
  @Input() sessions: number;
  @Input() sessionsPossible: number;
  @Input() lifetimeSessions: number;
  @Input() lifetimeSessionsPossible: number;
  @Input() rating: number;


  constructor(private apiService: ApiService) {
    this.currentUserData = apiService.getUserData;
    this._subscription = apiService.getUserData().subscribe((data) => { 
      console.log('Subscribe is working Mentee: ', data);
      this.currentUserData = data;    
    }, error => {console.log(`subscription error: `, error)});
  }
  
  _subscription;
  @Input() currentUserData: any[any[any]];
  
  currentUserRole: string;

  ngOnInit(): void {
    this.apiService.retrieveUserData();
    this.onboarding = this.currentUserData.currentUserData.userData.onboarding;
    this.matched = this.currentUserData.currentUserData.userData.matched;
    this.introduced = this.currentUserData.currentUserData.userData.introduced;
    this.schedule = this.currentUserData.currentUserData.userData.schedule;
    this.smart = this.currentUserData.currentUserData.userData.smart;
    this.sessions = this.currentUserData.currentUserData.userData.sessions;
    this.sessionsPossible = this.currentUserData.currentUserData.userData.sessionsPossible;
    this.lifetimeSessions = this.currentUserData.currentUserData.userData.lifetimeSessions;
    this.lifetimeSessionsPossible = this.currentUserData.currentUserData.userData.lifetimeSessionsPossible;
    this.rating = this.currentUserData.currentUserData.userData.rating;
  }

};
