import { Component, OnInit, OnChanges, SimpleChanges, Input, Renderer2 } from '@angular/core';
import { MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR } from '@angular/material/button-toggle';
import { Button } from 'protractor';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';

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

    public isMenuOpen: boolean = false;

    private darkTheme: boolean = true;
    private theme : 'dark' | 'light' = 'dark';

    private EXPIRE_DAYS : number = 90;

    constructor(
        private apiService: ApiService,
        private render: Renderer2,
        private cookieService: CookieService
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

      apiService.getTheme().subscribe((theme) => {
        if (theme === 'dark' || theme ==='light') {
          this.theme = theme;
          this.darkTheme = theme==='dark' ? true : false;
        }
      });
  
      if( this.cookieService.check('mentorship-dark-theme') ){ // <<== looks for a cookie with that name 
        this.darkTheme = this.cookieService.get('mentorship-dark-theme')==='true'?true:false;
        this.theme = this.darkTheme ? 'dark' : 'light';
      }

    }

    ngOnInit(): void {
        if (this.isAuthenticated){
            this.apiService.retrieveUserData();
        }

        if(this.darkTheme){
            this.setDarkTheme();
        }else{
            this.setLightTheme();
    }

    }

    onSidenavClick(): void {
        this.isMenuOpen = false;
    }

  toggleTheme() : void {
    if (this.darkTheme) {
      this.setLightTheme();
    } else {
      this.setDarkTheme();
    }
  };


  setLightTheme() : void {
    this.darkTheme = false;
    this.theme = 'light';

    this.render.addClass(document.body, 'theme-alternate');

    this.apiService.setTheme('light');

    localStorage.setItem('theme','light');

    this.cookieService.set('mentorship-dark-theme','false',{expires: this.EXPIRE_DAYS, sameSite: 'Lax'});
  }

  setDarkTheme() : void {
    this.darkTheme = true;
    this.theme = 'dark';

    this.render.removeClass(document.body, 'theme-alternate');

    this.apiService.setTheme('dark');

    localStorage.setItem('theme','dark');

    const EXPIRE_DAYS=90;
    this.cookieService.set('mentorship-dark-theme','true',{expires: this.EXPIRE_DAYS, sameSite: 'Lax'});
  }
    testClick(): void {
        console.log('clickevent: ', this.currentUserRole, ' isAuthenticated: ', this.isAuthenticated);
    }

    logout(): void {
        this.apiService.logout();
    }


}
