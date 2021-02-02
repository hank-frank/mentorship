import { Component, Input, OnInit, } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { HtmlTableDirective } from '../directives/html-table.directive';


@Component({
  selector: 'app-mentee',
  templateUrl: './mentee.component.html',
  styleUrls: ['./mentee.component.scss']
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




  constructor(private apiService: ApiService) {
    apiService.getUserData().subscribe((data) => {
      this.currentUserData = data;
      this.currentUserRole = data.currentUserData.userData.role;
    }, error => { console.log(`subscription error: `, error) });

    apiService.getMenteeDisplayData().subscribe((data) => {
      this.displayUserData = data;
      this.updateDisplayData();
    }, error => { console.log(`subscription error: `, error) });
  };

  ngOnInit(): void {
    this.apiService.retrieveUserData();
    if (this.currentUserRole === 'admin') {
      this.apiService.retrieveMenteeData();
    }
    this.updateDisplayData();
  };

  updateDisplayData(): void {
    this.onboarding = this.displayUserData.currentUserData.userData.onboarding;
    this.matched = this.displayUserData.currentUserData.userData.matched;
    this.introduced = this.displayUserData.currentUserData.userData.introduced;
    this.schedule = this.displayUserData.currentUserData.userData.schedule;
    this.smart = this.displayUserData.currentUserData.userData.smart;
    this.sessions = this.displayUserData.currentUserData.userData.sessions;
    this.sessionsPossible = this.displayUserData.currentUserData.userData.sessionsPossible;
    this.lifetimeSessions = this.displayUserData.currentUserData.userData.lifetimeSessions;
    this.lifetimeSessionsPossible = this.displayUserData.currentUserData.userData.lifetimeSessionsPossible;
    this.rating = this.displayUserData.currentUserData.userData.rating;
    this.userName = this.displayUserData.currentUserData.userData.name;
    this.userCompany = this.displayUserData.currentUserData.userData.company;
    this.userJobTitle = this.displayUserData.currentUserData.userData.jobTitle;
  };
};
