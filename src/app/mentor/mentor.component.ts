import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss']
})
export class MentorComponent implements OnInit {
  @Input() onboarding: boolean;
  @Input() matched: boolean;
  @Input() training: boolean;
  @Input() schedule: boolean;
  @Input() notes: boolean;
  @Input() currentStreak: number;
  @Input() longestStreak: number;
  @Input() rating: number;
  @Input() userName: string;
  @Input() userCompany: string;
  @Input() userJobTitle: string;
  private currentUserData: any[any[any]];
  currentUserRole: string;
  displayUserData: any[any[any]];
  private displayUserRole: string;


  constructor(private apiService: ApiService) {
    this.currentUserData = apiService.getUserData;
    apiService.getUserData().subscribe((data) => { 
      this.currentUserData = data; 
      this.currentUserRole = data.currentUserData.userData.role;   
      console.log(`Role: `, this.currentUserRole);
    }, error => {console.log(`subscription error: `, error)});

    this.displayUserData = apiService.getMentorDisplayData;
    apiService.getMentorDisplayData().subscribe((data) => { 
      console.log(`mentor display data: `, data);
      this.displayUserData = data;    
      console.log(`mentor display data2: `, this.displayUserData);

    }, error => {console.log(`subscription error: `, error)});
  }

  ngOnInit(): void { 
    this.apiService.retrieveUserData();
    //not working when coming from admin table, for some reason teh console logs in teh subscribe above work but this does not. 
    //DOES work when coming from login? 
    console.log(`mentor display data3: `,this.displayUserData);
    this.onboarding = this.displayUserData.currentUserData.userData.onboarding;
    this.matched = this.displayUserData.currentUserData.userData.matched;
    this.training = this.displayUserData.currentUserData.userData.training;
    this.schedule = this.displayUserData.currentUserData.userData.schedule;
    this.notes = this.displayUserData.currentUserData.userData.notes;
    this.currentStreak = this.displayUserData.currentUserData.userData.currentStreak;
    this.longestStreak = this.displayUserData.currentUserData.userData.longestStreak;
    this.rating = this.displayUserData.currentUserData.userData.rating;
    this.userName = this.displayUserData.currentUserData.userData.name;
    this.userCompany = this.displayUserData.currentUserData.userData.company;
    this.userJobTitle = this.displayUserData.currentUserData.userData.jobTitle;
  }

};
