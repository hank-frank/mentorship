import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.scss']
})
export class MentorComponent implements OnInit {

  constructor(private apiService: ApiService, 
    private router: Router) { }

  ngOnInit(): void {
    let userDataRequest = async () => {

      let mentorResponse = await this.apiService.mentorData();
      let userData = await mentorResponse;
      console.log(`MentorCOmponent Resposne: ${JSON.stringify(userData)}`);
    }
    userDataRequest();
  }

}
