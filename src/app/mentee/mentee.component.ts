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
  @Input() userName: string;
  @Input() userCompany: string;
  @Input() userJobTitle: string;
  private currentUserData: any[any[any]];
  private currentUserRole: string;
  displayUserData: any[any[any]];
  private displayUserRole: string;
  _subscribe;


  constructor(private apiService: ApiService) {
    this.currentUserData = apiService.getUserData;
    apiService.getUserData().subscribe((data) => { 
      this.currentUserData = data; 
      this.currentUserRole = data.currentUserData.userData.role;   
    }, error => {console.log(`subscription error: `, error)});

    // this.displayUserData = apiService.getMenteeDisplayData;
    // apiService.getMenteeDisplayData().subscribe((data) => { 
    //   console.log(`mentee display data1 : `, data);
    //   this.displayUserData = data;    
    //   console.log(`mentee this.display data 2: `, this.displayUserData);

    // }, error => {console.log(`subscription error: `, error)});
    this._subscribe = this.apiService.getMenteeDisplayData().subscribe((data) => { 
      console.log(`mentee display data1 : `, data);
      this.displayUserData = data;    
      console.log(`mentee this.display data 2: `, this.displayUserData);
      this.onboarding = data.currentUserData.userData.onboarding;
      this.matched = data.currentUserData.userData.matched;
      this.introduced = data.currentUserData.userData.introduced;
      this.schedule = data.currentUserData.userData.schedule;
      this.smart = data.currentUserData.userData.smart;
      this.sessions = data.currentUserData.userData.sessions;
      this.sessionsPossible = data.currentUserData.userData.sessionsPossible;
      this.lifetimeSessions = data.currentUserData.userData.lifetimeSessions;
      this.lifetimeSessionsPossible = data.currentUserData.userData.lifetimeSessionsPossible;
      this.rating = data.currentUserData.userData.rating;
      this.userName = data.currentUserData.userData.name;
      this.userCompany = data.currentUserData.userData.company;
      this.userJobTitle = data.currentUserData.userData.jobTitle;

    }, error => {console.log(`subscription error: `, error)});
  }

  ngOnInit(): void { 
    this.apiService.retrieveUserData();
    //not working when coming from admin table, for some reason teh console logs in teh subscribe above work but this does not. 
    //DOES work when coming from login? 
    
    // this._subscribe = this.apiService.getMenteeDisplayData().subscribe((data) => { 
    //   console.log(`mentee display data1 : `, data);
    //   this.displayUserData = data;    
    //   console.log(`mentee this.display data 2: `, this.displayUserData);
    //   this.onboarding = data.currentUserData.userData.onboarding;
    //   this.matched = data.currentUserData.userData.matched;
    //   this.introduced = data.currentUserData.userData.introduced;
    //   this.schedule = data.currentUserData.userData.schedule;
    //   this.smart = data.currentUserData.userData.smart;
    //   this.sessions = data.currentUserData.userData.sessions;
    //   this.sessionsPossible = data.currentUserData.userData.sessionsPossible;
    //   this.lifetimeSessions = data.currentUserData.userData.lifetimeSessions;
    //   this.lifetimeSessionsPossible = data.currentUserData.userData.lifetimeSessionsPossible;
    //   this.rating = data.currentUserData.userData.rating;
    //   this.userName = data.currentUserData.userData.name;
    //   this.userCompany = data.currentUserData.userData.company;
    //   this.userJobTitle = data.currentUserData.userData.jobTitle;

    // }, error => {console.log(`subscription error: `, error)});

    console.log(`mentee display data 3: `, this.displayUserData);
    // this.onboarding = this.displayUserData.currentUserData.userData.onboarding;
    // this.matched = this.displayUserData.currentUserData.userData.matched;
    // this.introduced = this.displayUserData.currentUserData.userData.introduced;
    // this.schedule = this.displayUserData.currentUserData.userData.schedule;
    // this.smart = this.displayUserData.currentUserData.userData.smart;
    // this.sessions = this.displayUserData.currentUserData.userData.sessions;
    // this.sessionsPossible = this.displayUserData.currentUserData.userData.sessionsPossible;
    // this.lifetimeSessions = this.displayUserData.currentUserData.userData.lifetimeSessions;
    // this.lifetimeSessionsPossible = this.displayUserData.currentUserData.userData.lifetimeSessionsPossible;
    // this.rating = this.displayUserData.currentUserData.userData.rating;
    // this.userName = this.displayUserData.currentUserData.userData.name;
    // this.userCompany = this.displayUserData.currentUserData.userData.company;
    // this.userJobTitle = this.displayUserData.currentUserData.userData.jobTitle;
  }

};
