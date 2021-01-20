import { Component, Input,OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentee',
  templateUrl: './mentee.component.html',
  styleUrls: [ './mentee.component.scss']
})
export class MenteeComponent implements OnInit {

  constructor(private apiService: ApiService, 
    private router: Router) { }

  currentUserData: any[any];

  @Input() onboarding: boolean;
  @Input() matched: boolean;
  @Input() introduced: boolean;
  @Input() schedule: boolean;
  @Input() smart: boolean;


  ngOnInit(): void {
    this.currentUserData = this.apiService.currentUserData;
    console.log(`Mentee component User Data: `, this.currentUserData);
    this.onboarding = this.currentUserData.userData.onboarding;
    this.matched = this.currentUserData.userData.matched;
    this.introduced = this.currentUserData.userData.introduced;
    this.schedule = this.currentUserData.userData.schedule;
    this.smart = this.currentUserData.userData.smart;
    console.log(`Mentee component User Data: `, this.onboarding, this.matched, this.introduced, this.schedule, this.smart);
  }






}
