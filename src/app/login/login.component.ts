import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
// import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  response : any = {};

  constructor(private apiService: ApiService, 
    // private router: Router
    ) { }

  ngOnInit(): void {
  }

  @Input() username: string;
  @Input() password: string;

  async submit() {
      this.apiService.login(this.username, this.password);
  }


}
