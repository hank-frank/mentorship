import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AdminData } from '../interfaces/adminData.model';
import { MentorData } from '../interfaces/mentorData.model';
import { MenteeData } from '../interfaces/menteeData.model';
import { SingleMentor } from '../interfaces/singleMentor.model';


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

    private currentUserData: AdminData | MentorData | MenteeData;
    private currentUserRole: string;
    private displayUserData: MentorData;

    constructor(private apiService: ApiService) {
        apiService.getUserData().subscribe((data: AdminData | MentorData | MenteeData) => {
            this.currentUserData = data;
            this.currentUserRole = data.currentUserData.userData.role;
        }, error => {console.log('subscription error: ', error); });

        apiService.getMentorDisplayData().subscribe((data: MentorData) => {
            this.displayUserData = data;
            this.updateDisplayData();
        }, error => {console.log('subscription error: ', error); });
    }

    ngOnInit(): void {
        this.apiService.retrieveUserData();
        if ( this.currentUserRole === 'admin'){
            this.apiService.retrieveMentorData();
        }
        this.updateDisplayData();
    }

    updateDisplayData(): void {
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

    submitMentorData(event: Event): void {
        const userDataSnapshot: SingleMentor = {
            userId: this.displayUserData.currentUserData.userData.userId,
            name: this.userName,
            role: this.displayUserData.currentUserData.userData.role,
            onboarding: this.onboarding,
            matched: this.matched,
            training: this.training,
            schedule: this.schedule,
            notes: this.notes,
            currentStreak: this.currentStreak,
            longestStreak: this.longestStreak,
            rating: this.rating,
            completed: this.displayUserData.currentUserData.userData.completed,
            jobTitle: this.userJobTitle,
            company: this.userCompany
        };

        console.log('event: ', this.onboarding);
        this.apiService.postMentorData(userDataSnapshot);
    }
}
