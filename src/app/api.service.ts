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
  private key='userData';
  
  constructor(private httpClient: HttpClient, private router: Router) { }

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

    let rolemap = {
      admin: "./dashboard", 
      mentor: "./mentor", 
      mentee: "./mentee" 
    };

    //Use this subscribe instead of the async await
    return this.httpClient.get(`${this.LOGIN_URL}?username=${username}`, {withCredentials:true}).subscribe((data: any) => {
      if (data.currentUserData.userData.userId != 0) {
        this.authStatusListener.next(true);
        this.isAuthenticated = true;
        console.log(`in login: data: `, data);

        localStorage.setItem(this.key,JSON.stringify(data));

        this.currentUserData.next(data);
        console.log(`in login: role: `, data.currentUserData.userData.role);

        this.router.navigate([rolemap[data.currentUserData.userData.role] ? rolemap[data.currentUserData.userData.role] : "./login"]);
      }
    });
  }

  public async retrieveUserData() {
    if (localStorage.getItem(this.key) != null) {
      //return value is unnecessary, this is updating the current user data subject which each component is subscribed to either from local storage in the if or from a second API call in the else
      this.currentUserData.next(JSON.parse(localStorage.getItem(this.key)));
      return JSON.parse(localStorage.getItem(this.key));
    } else {
      //this call counts on a valid user token as the auth on the server side which a user will have because they will not be calling this metnod if they have not logged in. 
      return this.httpClient.get(`${this.DASHBOARD_URL}`, {withCredentials:true}).subscribe((data) => {
        this.currentUserData.next(data);
        localStorage.setItem(this.key, JSON.stringify(data));
      })
    }
  }

  logout() {
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/login']);
  }
}
