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

  constructor(
      private apiService: ApiService, 
      private render:Renderer2
  ) {
      this.apiService.getAuthStatusListener().subscribe((authStatus : boolean) => {
        this.isAuthenticated = authStatus;
      });

      apiService.getUserData().subscribe((data) => { 
        this.currentUserData = data;
      }, error => {console.log(`subscription error: `, error)});

    apiService.getUserRole().subscribe((role) => {
      this.currentUserRole = role;
    });
  };

  ngOnInit(): void {
    if (this.isAuthenticated){
      this.apiService.retrieveUserData();
    };
  };

  onSidenavClick(): void {
    this.isMenuOpen = false;
  };

  toggleTheme() : void {
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

  testClick() : void {
    console.log(`clickevent: `, this.currentUserRole,` isAuthenticated: `, this.isAuthenticated);
  };

  logout() : void {
    this.apiService.logout();
  };

};
