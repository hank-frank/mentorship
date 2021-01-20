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

  public currentUserData: any[];

  public updateCurrentUserData () {
    
  }

  public async login (username, password) {
    console.log(`apiservice username: ${username} password: ${password}`);

    let serverResponseUserData : any;
    let mentorResponse: any;

    let rolemap = {
      admin: "./dashboard", 
      mentor: "./mentor", 
      mentee: "./mentee" 
    };

    if (false) {
      return this.httpClient.get(this.LOGIN_URL).subscribe((data) => {
          console.log(`apiService response: ${JSON.stringify(data)}`);
          serverResponseUserData = data;
          // return "./dashboard";
          return rolemap[serverResponseUserData.userData.role] ? rolemap[serverResponseUserData.userData.role] : "./login";
        });
    } else {
      let rawResponse = await this.httpClient.get(`${this.LOGIN_URL}?username=${username}`, {withCredentials:true}).toPromise();
      serverResponseUserData = await rawResponse;
      console.log(`serverResponseUserData in apiService: `, serverResponseUserData);
      this.currentUserData = serverResponseUserData;
    }

    return rolemap[serverResponseUserData.userData.role] ? rolemap[serverResponseUserData.userData.role] : "./login";
  }

  public async dashboardData() {
    let dashboardResponse = await this.httpClient.get(`${this.DASHBOARD_URL}`, {withCredentials:true}).toPromise();
    let allUserData = await dashboardResponse;
    console.log(`DashboardResposne: ${JSON.stringify(dashboardResponse)}`);
    return allUserData;
  }
}


