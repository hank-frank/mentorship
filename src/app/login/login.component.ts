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
  errorMessage : string = "Invalid user name or password"; 
  isLoggedInErrorMessage : boolean = false;

  constructor(private apiService: ApiService, 
    
    // private router: Router
    ) {
      apiService.getIsLogInErrorMessage().subscribe((status) => {
        this.isLoggedInErrorMessage = status;
      });
     }

  ngOnInit(): void {
  }

  @Input() username: string;
  @Input() password: string;

  async submit() {
      this.apiService.login(this.username, this.password);
  }


}
