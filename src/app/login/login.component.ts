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
    public isLoggedInErrorMessage = false;
    private errorMessage: string;

    constructor(private apiService: ApiService) {
        this.errorMessage = 'Invalid user name or password';
        apiService.getIsLogInErrorMessage().subscribe((status) => {
            this.isLoggedInErrorMessage = status;
        });
    }

    ngOnInit(): void {
    }

    submit(): void {
        this.apiService.login(this.username, this.password);
    }

}
