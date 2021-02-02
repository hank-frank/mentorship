/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';

import { MenteeData } from './interfaces/menteeData.model';
import { MentorData } from './interfaces/mentorData.model';
import { AdminData } from './interfaces/adminData.model';
import { SingleMentee } from './interfaces/singleMentee.model';
import { SingleMentor } from './interfaces/singleMentor.model';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    private LOGIN_URL = 'http://localhost:3000/login';
    private DASHBOARD_URL = 'http://localhost:3000/authorizedDataRequest';
    private currentUserData = new Subject<AdminData | MenteeData | MentorData> ();
    private menteeDisplayUserData = new Subject<MenteeData> ();
    private mentorDisplayUserData = new Subject<MentorData> ();
    private userRole = new Subject<string>(); // for header
    private isLogInErrorMessage = new Subject<boolean>(); // for header
    private authStatusListener = new Subject<boolean>();
    private themeColor = new Subject<string>();
    private isMenteeDisplayed = new Subject<boolean>();
    private isMentorDisplayed = new Subject<boolean>();
    private isAuthenticated = false;
    private userLocalStorageKey = 'userData';
    private menteeLocalStorageKey = 'menteeData';
    private mentorLocalStorageKey = 'mentorData';
    private authLocalStorageKey = 'authStatus';
    private themeLocalStorageKey = 'theme';
    private rolemap = {
        admin: './dashboard',
        mentor: './mentor',
        mentee: './mentee'
    };

    constructor(
        private httpClient: HttpClient,
        private router: Router) {
        if (localStorage.getItem(this.authLocalStorageKey) != null) {
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
        }
        if (localStorage.getItem(this.themeLocalStorageKey) != null) {
            this.themeColor.next(localStorage.getItem(this.themeLocalStorageKey));
        }
    }

    getIsAuth(): boolean {
        return this.isAuthenticated;
    }

    getAuthStatusListener(): Observable<boolean>{
        return this.authStatusListener.asObservable();
    }

    setAuthStatusListener(status: boolean): void {
        this.authStatusListener.next(status);
    }

    getIsLogInErrorMessage(): Observable<boolean>{
        return this.isLogInErrorMessage.asObservable();
    }

    setIsLogInErrorMessage(status: boolean): void {
        this.isLogInErrorMessage.next(status);
    }

    getIsMenteeDisplayed(): Observable<boolean>{
        return this.isMenteeDisplayed.asObservable();
    }

    setIsMenteeDisplayed(status: boolean): void {
        this.isMenteeDisplayed.next(status);
    }

    getIsMentorDisplayed(): Observable<boolean> {
        return this.isMentorDisplayed.asObservable();
    }

    setIsMentorDisplayed(status: boolean): void {
        this.isMentorDisplayed.next(status);
    }

    // This is set to any, interface for userdata object needed
    public getUserData(): Observable<MentorData | MenteeData | AdminData> {
        return this.currentUserData.asObservable();
    }

    public setUserData(data: MentorData | MenteeData | AdminData): void {
        this.currentUserData.next(data);
    }

    public getMenteeDisplayData(): Observable<MenteeData> {
        return this.menteeDisplayUserData.asObservable();
    }

    public setMenteeDisplayData(data: MenteeData): void {
        localStorage.setItem(this.menteeLocalStorageKey, JSON.stringify(data));
        this.menteeDisplayUserData.next(data);
    }

    public getMentorDisplayData(): Observable<MentorData> {
        return this.mentorDisplayUserData.asObservable();
    }

    public setMentorDisplayData(data: MentorData): void {
        localStorage.setItem(this.mentorLocalStorageKey, JSON.stringify(data));
        this.mentorDisplayUserData.next(data);
    }

    public getUserRole(): Observable<string> {
        return this.userRole.asObservable();
    }

    public setUserRole(role: string): void {
        this.userRole.next(role);
    }

    public getTheme(): Observable<string> {
        return this.themeColor.asObservable();
    }

    public setTheme(theme: string): void {
        this.themeColor.next(theme);
        localStorage.setItem(this.themeLocalStorageKey, theme);
    }

    public login(username: string, password: string): void {
    // console.log(`apiservice username: ${username} password: ${password}`);
        this.httpClient.get(`${this.LOGIN_URL}?username=${username}`, { withCredentials: true }).subscribe((data: AdminData | MentorData | MenteeData) => {
            if (data.currentUserData.userData.userId !== 0) {
                this.setAuthStatusListener(true);
                this.isAuthenticated = true;
                this.setUserRole(data.currentUserData.userData.role);
                this.setUserData(data);
                void this.router.navigate([this.rolemap[data.currentUserData.userData.role] ? this.rolemap[data.currentUserData.userData.role] : './login']);
                localStorage.setItem(this.userLocalStorageKey, JSON.stringify(data));
                localStorage.setItem(this.authLocalStorageKey, 'true');
                if (data.currentUserData.userData.role === 'mentee') {
                    this.setMenteeDisplayData(data as MenteeData);
                } else if (data.currentUserData.userData.role === 'mentor') {
                    this.setMentorDisplayData(data as MentorData);
                }
            } else {
                this.logout();
            }
        });
    }

    retrieveUserData(): void {
        // console.log('api.service:  retrieveUserData()')
        const retreivedUserData = JSON.parse(localStorage.getItem(this.userLocalStorageKey)) as AdminData | MenteeData | MentorData;
        if (retreivedUserData != null) {
            this.setAuthStatusListener(true);
            this.isAuthenticated = true;
            this.setUserData(retreivedUserData);
            this.setUserRole(retreivedUserData.currentUserData.userData.role);
            if (retreivedUserData.currentUserData.userData.role === 'mentee') {
                this.setMenteeDisplayData(retreivedUserData as MenteeData);
            } else if (retreivedUserData.currentUserData.userData.role === 'mentor') {
                this.setMentorDisplayData(retreivedUserData as MentorData);
            }
        } else {
            // this call counts on a valid user token in your cookies as the auth on the server side which a user will
            // have because they will not be calling this metnod if they have not logged in.
            this.httpClient.get(`${this.DASHBOARD_URL}`, { withCredentials: true }).subscribe((data: AdminData | MentorData | MenteeData) => {
                this.setUserData(data);
                this.setUserRole(data.currentUserData.userData.role);
                this.setAuthStatusListener(true);
                this.isAuthenticated = true;
                localStorage.setItem(this.userLocalStorageKey, JSON.stringify(data));
                if (data.currentUserData.userData.role === 'mentee') {
                    this.setMenteeDisplayData(retreivedUserData as MenteeData);
                } else if (data.currentUserData.userData.role === 'mentor') {
                    this.setMentorDisplayData(retreivedUserData as MentorData);
                }
            }, (error) => {
                console.log('login error ', error);
            });
        }
    }

    retrieveMenteeData(): void {
        // console.log('api.service:  retrieveMenteeData()')
        const retreivedUserData = JSON.parse(localStorage.getItem(this.menteeLocalStorageKey)) as MenteeData;
        if (retreivedUserData != null) {
            this.setMenteeDisplayData(retreivedUserData);
        }
        // return retreivedUserData;
    }

    retrieveMentorData(): void {
        // console.log('api.service:  retrieveMentorData()')
        const retreivedUserData = JSON.parse(localStorage.getItem(this.mentorLocalStorageKey)) as MentorData;
        if (retreivedUserData != null) {
            this.setMentorDisplayData(retreivedUserData);
        }
        // return retreivedUserData;
    }

    postUserData(data: any): any{
        console.log('in ppost user data: ', data);
    }

    logout(): void {
        console.log('getting logged out');
        this.isAuthenticated = false;
        this.setAuthStatusListener(false);
        this.setUserRole('none');
        localStorage.removeItem(this.userLocalStorageKey);
        localStorage.removeItem(this.authLocalStorageKey);
        localStorage.removeItem(this.menteeLocalStorageKey);
        localStorage.removeItem(this.mentorLocalStorageKey);
        void this.router.navigate(['/login']);
    }
}
