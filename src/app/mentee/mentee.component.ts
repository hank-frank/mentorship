/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MenteeData } from '../interfaces/menteeData.model';
import { AdminData } from '../interfaces/adminData.model';
import { MentorData } from '../interfaces/mentorData.model';
import { SingleMentee } from '../interfaces/singleMentee.model';

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
    private displayUserData: MenteeData;
    private currentUserData: AdminData | MentorData | MenteeData;
    private currentUserRole: string;

    constructor(private apiService: ApiService) {
        apiService.getUserData().subscribe((data: any) => {
            this.currentUserData = data;
            this.currentUserRole = data.currentUserData.userData.role;
        }, error => {console.log('subscription error: ', error); });

        apiService.getMenteeDisplayData().subscribe((data: any) => {
            this.displayUserData = data;
            this.updateDisplayData();
        }, error => {console.log('subscription error: ', error); });
    }

    ngOnInit(): void {
        this.apiService.retrieveUserData();
        if ( this.currentUserRole === 'admin' ||
             this.currentUserRole === 'orgadmin' ||
             this.currentUserRole === 'orgowner'
        ){
            this.apiService.retrieveMenteeData();
        }
        this.updateDisplayData();
    }

    updateDisplayData(): void {
        console.log(this.displayUserData)
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
    }

    submitMenteeData(event: Event): void {
        const userDataSnapshot: SingleMentee = {
            userId: this.displayUserData.currentUserData.userData.userId,
            name: this.userName,
            role: this.displayUserData.currentUserData.userData.role,
            onboarding: this.onboarding,
            matched: this.matched,
            introduced: this.introduced,
            schedule: this.schedule,
            smart: this.smart,
            sessions: this.sessions,
            sessionsPossible: this.sessionsPossible,
            lifetimeSessions: this.lifetimeSessions,
            lifetimeSessionsPossible: this.lifetimeSessionsPossible,
            rating: this.rating,
            completed: this.displayUserData.currentUserData.userData.completed,
            jobTitle: this.userJobTitle,
            company: this.userCompany
        };

        this.apiService.postMenteeData(userDataSnapshot);
    }
}
