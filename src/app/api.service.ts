import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient, private appComponent: AppComponent) { }

  private LOGIN_URL = "http://localhost:3000/login";
  private MENTOR_URL = "http://localhost:3000/mentor";
  private MENTEE_URL = "http://localhost:3000/mentee";
  private DASHBOARD_URL = "http://localhost:3000/dashboard";

  public async login (username, password) {
    console.log(`apiservice username: ${username} password: ${password}`);

    let userData : any;
    let mentorResponse: any;

    let rolemap = {
      admin: "./dashboard", 
      mentor: "./mentor", 
      mentee: "./mentee" 
    };

    if (false) {
      return this.httpClient.get(this.LOGIN_URL).subscribe((data) => {
          console.log(`apiService response: ${JSON.stringify(data)}`);
          userData = data;
          // return "./dashboard";
          return rolemap[userData.role] ? rolemap[userData.role] : "./login";
        });
    } else {
      let rawResponse = await this.httpClient.get(`${this.LOGIN_URL}?username=${username}`, {withCredentials:true}).toPromise();
      userData = await rawResponse;
      console.log(`userData in apiService: `, userData);
      this.appComponent.storeUserData(userData);
    }

    return rolemap[userData.userData.role] ? rolemap[userData.userData.role] : "./login";
  }

  public async mentorData() {
    let mentorResponse = await this.httpClient.get(`${this.MENTOR_URL}`, {withCredentials:true}).toPromise();
    let userData = await mentorResponse;
    console.log(`MentorResposne: ${JSON.stringify(mentorResponse)}`);
    return userData;
  }

  public async menteeData() {
    let menteeResponse = await this.httpClient.get(`${this.MENTEE_URL}`, {withCredentials:true}).toPromise();
    let userData = await menteeResponse;
    console.log(`MentorResposne: ${JSON.stringify(menteeResponse)}`);
    return userData;
  }

  public async dashboardData() {
    let dashboardResponse = await this.httpClient.get(`${this.DASHBOARD_URL}`, {withCredentials:true}).toPromise();
    let allUserData = await dashboardResponse;
    console.log(`DashboardResposne: ${JSON.stringify(dashboardResponse)}`);
    return allUserData;
  }
}


