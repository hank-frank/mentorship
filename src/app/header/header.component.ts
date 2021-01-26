import { Component, OnInit, OnChanges, SimpleChanges, Input, Renderer2 } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() currentUserData: any[any];
  @Input() currentUserRole: any;
  @Input() isAuthenticated: boolean;
  private darkTheme: boolean = true;
  public isMenuOpen: boolean = false;
  _subscribeTheme;

  constructor(
      private apiService: ApiService, 
      private render:Renderer2
  ) {
      this.apiService.getAuthStatusListener().subscribe((authStatus) => {
        this.isAuthenticated = authStatus;
      });

      this.currentUserData = apiService.getUserData;
      apiService.getUserData().subscribe((data) => { 
        this.currentUserData = data;
      }, error => {console.log(`subscription error: `, error)});

    this.currentUserRole = apiService.getUserRole;
    apiService.getUserRole().subscribe((role) => {
      this.currentUserRole = role;
    });
  };

    //this  is curcular, it reads it, sets it in this component then fires the toggle which re-sets the observable and retriggers the subscription. 
    // this._subscribeTheme = apiService.getTheme().subscribe((theme) => {
    //   console.log(`header-onInit theme: `, theme);
    //   if (theme === 'dark') {
    //     this.darkTheme = true;

    //   } else if (theme === 'light') {
    //     this.darkTheme = false;
    //     this.toggleTheme()
    //   }
    // });

  ngOnInit(): void {
    console.log('header oninit');
    if (this.isAuthenticated){
      this.apiService.retrieveUserData();
    };

    // this._subscribeTheme = this.apiService.getTheme().subscribe((theme) => {
    //   console.log(`header-constructor theme: `, theme);
    //   if (theme === 'dark') {
    //     this.darkTheme = true;
    //     this.toggleTheme();
    //   } else if (theme === 'light') {
    //     this.darkTheme = false;
    //     this.toggleTheme();
    //   }
    // });
  };

  onSidenavClick(): void {
    this.isMenuOpen = false;
  };

  toggleTheme() {
    if (this.darkTheme) {
      this.render.addClass(document.body, 'theme-alternate');
      this.darkTheme = false;
      this.apiService.setTheme('light');
    } else {
      this.render.removeClass(document.body, 'theme-alternate');
      this.darkTheme = true;
      this.apiService.setTheme('dark');
    }
  };

  testClick() {
    console.log(`clickevent: `, this.currentUserRole,` isAuthenticated: `, this.isAuthenticated);
    // this.apiService.logout();
    this.render.addClass(document.body, 'theme-alternate');
  };

  logout() {
    this.apiService.logout();
  };

};
