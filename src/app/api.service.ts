import { Injectable,  EventEmitter, Output  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private LOGIN_URL = "http://localhost:3000/login";
  private MENTOR_URL = "http://localhost:3000/mentor";
  private MENTEE_URL = "http://localhost:3000/mentee";
  private DASHBOARD_URL = "http://localhost:3000/dashboard";
  
  private currentUserData: any = new Subject<any>();
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;
  private userRole = new Subject<string>(); // for header
  private userLocalStorageKey = 'userData';
  private authLocalStorageKey = 'authStatus';
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
        this.authStatusListener.next(true)
      }
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  public getUserData() {
    return this.currentUserData.asObservable();
  }

  public getUserRole() {
    return this.userRole.asObservable();
  }

  public async login (username, password) {
    console.log(`apiservice username: ${username} password: ${password}`);

    let serverResponseUserData : any;

    // let rolemap = {
    //   admin: "./dashboard", 
    //   mentor: "./mentor", 
    //   mentee: "./mentee" 
    // };

    //Shuold use an HTTP interceptor for catching anythign that isn't a 200. 
    //Can use observe parameter on http request like below to get full res object w/ body and headers, shouldn't need ot here through and should use Interceptor. 
    //return this.httpClient.get(`${this.LOGIN_URL}?username=${username}`, {withCredentials:true, observe: 'response'}).subscribe((data: any) => {

    return this.httpClient.get(`${this.LOGIN_URL}?username=${username}`, {withCredentials:true}).subscribe((data: any) => {

      if (data.currentUserData.userData.userId != 0) {
        this.authStatusListener.next(true);
        this.isAuthenticated = true;
        console.log(`in login: data: `, data);

        localStorage.setItem(this.userLocalStorageKey, JSON.stringify(data));
        localStorage.setItem(this.authLocalStorageKey, 'true');
        this.userRole.next(data.currentUserData.userData.role);
        this.currentUserData.next(data);
        this.router.navigate([this.rolemap[data.currentUserData.userData.role] ? this.rolemap[data.currentUserData.userData.role] : "./login"]);
      } else {
        this.logout();
      }
    });
  }

  retrieveUserData() {
    if (localStorage.getItem(this.userLocalStorageKey) != null) {
      //return value is unnecessary, this is updating the current user data subject which each component is subscribed to either from local storage in the if or from a second API call in the else
      this.authStatusListener.next(true);
      this.isAuthenticated = true;
      this.currentUserData.next(JSON.parse(localStorage.getItem(this.userLocalStorageKey)));
      this.userRole.next(JSON.parse(localStorage.getItem('userData')).currentUserData.userData.role);
      return JSON.parse(localStorage.getItem(this.userLocalStorageKey));
    } else {
      //this call counts on a valid user token as the auth on the server side which a user will have because they will not be calling this metnod if they have not logged in. 
      return this.httpClient.get(`${this.DASHBOARD_URL}`, {withCredentials:true}).subscribe((data: any) => {
        this.currentUserData.next(data);
        this.userRole.next(data.currentUserData.userData.role);
        localStorage.setItem(this.userLocalStorageKey, JSON.stringify(data));
        this.authStatusListener.next(true);
        this.isAuthenticated = true;
      })
    }
  }

  logout() {
    console.log('getting logged out');
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userRole.next('none');
    localStorage.removeItem(this.userLocalStorageKey);
    localStorage.removeItem(this.authLocalStorageKey);
    this.router.navigate(['/login']);
  }
}
