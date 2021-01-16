import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  response : any = {};

  constructor(private apiService: ApiService, 
    private router: Router) { }

  ngOnInit(): void {
  }

  @Input() username: string;
  @Input() password: string;

  async submit() {
    if (false) {
      this.apiService.login(this.username, this.password)
        .then((response) => {
          console.log(response);
          this.router.navigate([response])
        });
    } else {
      let apiResponse = await this.apiService.login(this.username, this.password);

      this.response = apiResponse;

      console.log(`LoginComponent apiResponse: ${apiResponse}, this.response: ${this.response}`)
      this.router.navigate([this.response])
    }
  }


}
