import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  @Input() username: string;
  @Input() password: string;
  errorMessage : string = "Invalid user name or password"; 
  isLoggedInErrorMessage : boolean = false;

  constructor(private apiService: ApiService) {
      apiService.getIsLogInErrorMessage().subscribe((status) => {
        this.isLoggedInErrorMessage = status;
      });
    }

  ngOnInit(): void {
  };

  submit() : void {
      this.apiService.login(this.username, this.password);
  }

}
