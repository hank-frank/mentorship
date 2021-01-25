import { Injectable,  EventEmitter, Output  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private LOGIN_URL = "http://localhost:3000/login";
  private DASHBOARD_URL = "http://localhost:3000/authorizedDataRequest";
  private currentUserData: any = new Subject<any>();
  private menteeDisplayUserData: any = new Subject<any>();
  private mentorDisplayUserData: any = new Subject<any>();
  private userRole = new Subject<string>(); // for header
  private authStatusListener = new Subject<boolean>();
  private themeColor = new Subject<string>();
  private isAuthenticated = false;
  private userLocalStorageKey = 'userData';
  private authLocalStorageKey = 'authStatus';
  private themeLocalStorageKey = 'theme';
  private rolemap = {
    admin: "./dashboard", 
    mentor: "./mentor", 
    mentee: "./mentee" 
  };
  
  constructor(
    private httpClient: HttpClient, 
    private router: Router) { 
      if (localStorage.getItem(this.authLocalStorageKey) != null) {
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
      }
      console.log(`in constructor: `, localStorage.getItem(this.themeLocalStorageKey));
      if (localStorage.getItem(this.themeLocalStorageKey) != null) {
        this.themeColor.next(localStorage.getItem(this.themeLocalStorageKey));
      }
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  setAuthStatusListener(status) {
    this.authStatusListener.next(status)
  }

  public getUserData() {
    return this.currentUserData.asObservable();
  }

  public setUserData(data: object) {
    this.currentUserData.next(data);
  }

  public getMenteeDisplayData() {
    return this.menteeDisplayUserData.asObservable();
  }

  public setMenteeDisplayData(data: object) {
    //this appears to work though the data does not come through useable in the mentee/mentor compoennts
    this.menteeDisplayUserData.next(data);
    console.log(`setting mentee display data apiservice: `, data);
    //could it be getting lost after a component refresh as a result of the redirect? 
  }

  public getMentorDisplayData() {
    return this.mentorDisplayUserData.asObservable();
  }

  public setMentorDisplayData(data: object) {
  //this appears to work though the data does not come through useable in the mentee/mentor compoennts
    this.mentorDisplayUserData.next(data);
  }

  public getUserRole() {
    return this.userRole.asObservable();
  }

  public setUserRole(role) {
    this.userRole.next(role);
  }

  public getTheme() {
    return this.themeColor.asObservable();
  }

  public setTheme(theme: string) {
    console.log(`theme: `, theme)
    this.themeColor.next(theme);
    localStorage.setItem(this.themeLocalStorageKey, theme);
    console.log(`retrieved: `, localStorage.getItem(this.themeLocalStorageKey));
  }

  public async login (username, password) {
    console.log(`apiservice username: ${username} password: ${password}`);
    //Shuold use an HTTP interceptor for catching anythign that isn't a 200. 
    //Can use observe parameter on http request like below to get full res object w/ body and headers, shouldn't need ot here through and should use Interceptor. 
    //return this.httpClient.get(`${this.LOGIN_URL}?username=${username}`, {withCredentials:true, observe: 'response'}).subscribe((data: any) => {

    return this.httpClient.get(`${this.LOGIN_URL}?username=${username}`, {withCredentials:true}).subscribe((data: any) => {
      console.log(`login data: `, data);
      if (data.currentUserData.userData.userId != 0) {
        this.setAuthStatusListener(true);
        this.isAuthenticated = true;
        this.setUserRole(data.currentUserData.userData.role);
        this.setUserData(data);
        this.router.navigate([this.rolemap[data.currentUserData.userData.role] ? this.rolemap[data.currentUserData.userData.role] : "./login"]);
        localStorage.setItem(this.userLocalStorageKey, JSON.stringify(data));
        localStorage.setItem(this.authLocalStorageKey, 'true');
        if (data.currentUserData.userData.role === 'mentee') {
          this.setMenteeDisplayData(data);
        } else if (data.currentUserData.userData.role === 'mentor') {
          this.setMentorDisplayData(data);
        }
      } else {
        this.logout();
      }
    });
  }

  retrieveUserData() {
    let retreivedUserData = JSON.parse(localStorage.getItem(this.userLocalStorageKey));
    if (retreivedUserData != null) {
      //return value is unnecessary, this is updating the current user data subject which each component is subscribed to either from local storage in the if or from a second API call in the else
      this.setAuthStatusListener(true);
      this.isAuthenticated = true;
      this.setUserData(retreivedUserData);
      this.setUserRole(retreivedUserData.currentUserData.userData.role);
      if (retreivedUserData.currentUserData.userData.role === 'mentee') {
        this.setMenteeDisplayData(retreivedUserData);
      } else if (retreivedUserData.currentUserData.userData.role === 'mentor') {
        this.setMentorDisplayData(retreivedUserData);
      }
      return retreivedUserData;
    } else {
      //this call counts on a valid user token in your cookies as the auth on the server side which a user will have because they will not be calling this metnod if they have not logged in. 
      return this.httpClient.get(`${this.DASHBOARD_URL}`, {withCredentials:true}).subscribe((data: any) => {
        this.setUserData(data);
        this.setUserRole(data.currentUserData.userData.role);
        this.setAuthStatusListener(true);
        this.isAuthenticated = true;
        localStorage.setItem(this.userLocalStorageKey, JSON.stringify(data));
        if (data.currentUserData.userData.role === 'mentee') {
          this.setMenteeDisplayData(retreivedUserData);
        } else if (data.currentUserData.userData.role === 'mentor') {
          this.setMentorDisplayData(retreivedUserData);
        }
      })
    }
  }

  logout() {
    console.log('getting logged out');
    this.isAuthenticated = false;
    this.setUserData({});
    this.setAuthStatusListener(false);
    this.setUserRole('none');
    this.setMenteeDisplayData({})
    this.setMentorDisplayData({})
    localStorage.removeItem(this.userLocalStorageKey);
    localStorage.removeItem(this.authLocalStorageKey);
    this.router.navigate(['/login']);
  }
}
