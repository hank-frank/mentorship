import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mentorship';

  currentUserData: any[];

  public storeUserData(userData) {
    this.currentUserData = userData;
    console.log(`parent App compoent: ${JSON.stringify(this.currentUserData)}`)
  }

  constructor() { }
}
