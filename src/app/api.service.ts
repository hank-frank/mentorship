import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// interface UserSpecificData {
//   onboarding: boolean ,
//   matched: boolean ,
//   training: boolean,
//   schedule: boolean,
//   notes: boolean,
//   currentStreak: number,
//   longestStreak: number,
//   rating: number 
// }
// interface ServerData {
//   userId: number,
//   role: string,
//   userData: UserSpecificData
// }

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient, ) { }

  private LOGIN_URL = "http://localhost:3000/login";
  private MENTOR_URL = "http://localhost:3000/mentor";
  private MENTEE_URL = "http://localhost:3000/mentee";
  private DASHBOARD_URL = "http://localhost:3000/fashboard";



  public async login (username, password) {
    console.log(`apiservice username: ${username} password: ${password}`);

    let userRole = "";
    if (true) {
      this.httpClient.get(this.LOGIN_URL).subscribe((data) => {
          console.log(`apiService response: ${JSON.stringify(data)}`);
          let userData : any = data;
          let rolemap = {
            administrator: "./dashboard", 
            mentor: "./mentor", 
            mentee: "./mentee" 
          };
      
          return rolemap[userData.role] ? rolemap[userRole] : "./login";
        });
    } else {

      let rawResponse = await this.httpClient.get(`${this.LOGIN_URL}?role=${username}`).toPromise();
      let response = await rawResponse;
      console.log(`apiService rawResponse: ${JSON.stringify(response)}`);
      
      // userRole = response.role;
      // userId  = response.userId;
      // userData  = response.userData;
  
      // console.log(`in apiService userRole from server: ${userRole}`);
    }
    
    // let rolemap = {
    //   administrator: "./dashboard", 
    //   mentor: "./mentor", 
    //   mentee: "./mentee" 
    // };

    // return rolemap[userRole] ? rolemap[userRole] : "./login";
  }
}


