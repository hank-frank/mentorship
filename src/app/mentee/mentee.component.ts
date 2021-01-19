import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mentee',
  templateUrl: './mentee.component.html',
  styleUrls: ['./mentee.component.scss']
})
export class MenteeComponent implements OnInit {

  constructor(private apiService: ApiService, 
    private router: Router) { }

  ngOnInit(): void {
    let userDataRequest = async () => {

      let menteeResponse = await this.apiService.menteeData();
      let userData = await menteeResponse;
      console.log(`MentorCOmponent Resposne: ${JSON.stringify(userData)}`);
    }
    // userDataRequest();
  }

}
