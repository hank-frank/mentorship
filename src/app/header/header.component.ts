import { Component, OnInit, OnChanges, SimpleChanges, Input, Renderer2 } from '@angular/core';
import { ApiService } from '../api.service';

import { MenteeData } from '../interfaces/menteeData.model';
import { MentorData } from '../interfaces/mentorData.model';
import { AdminData } from '../interfaces/adminData.model';


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() currentUserData: MentorData | MenteeData | AdminData;
    @Input() currentUserRole: string;
    @Input() isAuthenticated: boolean;
    public isMenuOpen = false;
    private darkTheme = true;

    constructor(
        private apiService: ApiService,
        private render: Renderer2
    ) {
        this.apiService.getAuthStatusListener().subscribe((authStatus: boolean) => {
            this.isAuthenticated = authStatus;
        });

        apiService.getUserData().subscribe((data: AdminData | MentorData | MenteeData) => {
            this.currentUserData = data;
        }, error => {console.log('subscription error: ', error); });

        apiService.getUserRole().subscribe((role: string) => {
            this.currentUserRole = role;
        });
    }

    ngOnInit(): void {
        if (this.isAuthenticated){
            this.apiService.retrieveUserData();
        }
    }

    onSidenavClick(): void {
        this.isMenuOpen = false;
    }

    toggleTheme(): void {
        if (this.darkTheme) {
            this.render.addClass(document.body, 'theme-alternate');
            this.darkTheme = false;
            this.apiService.setTheme('light');
        } else {
            this.render.removeClass(document.body, 'theme-alternate');
            this.darkTheme = true;
            this.apiService.setTheme('dark');
        }
    }

    testClick(): void {
        console.log('clickevent: ', this.currentUserRole, ' isAuthenticated: ', this.isAuthenticated);
    }

    logout(): void {
        this.apiService.logout();
    }

}
