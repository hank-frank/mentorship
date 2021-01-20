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
    currentUserData: any[];

  ngOnInit(): void {
    this.currentUserData = this.apiService.currentUserData;
    console.log(`Mentor component User Data: `, this.currentUserData);
  }

}
