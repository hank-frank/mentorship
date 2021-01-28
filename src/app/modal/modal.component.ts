import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';


@Component({
  selector: '',
  template: `
  <mat-card class="mentee-card">
  <div class="mentee-card-header">
      <div class="user-image"></div>
      <div class="name-title">
          <h4 mat-card-title>Mentee1</h4>
          <p mat-card-subtitle>Microsoft</p>
          <p mat-card-subtitle>Plumber</p>
      </div>
  </div>
  <div class="info-container">
      <mat-slide-toggle [(ngModel)]="onboarding">Completed Onboarding Survey</mat-slide-toggle>
  </div>
  <div class="info-container">
      <mat-slide-toggle [(ngModel)]="matched">Matched with a Mentor</mat-slide-toggle>
  </div>
  <div class="info-container">
      <mat-slide-toggle [(ngModel)]="introduced">Introduced yourself</mat-slide-toggle>
  </div>
  <div class="info-container">
      <mat-slide-toggle [(ngModel)]="schedule">Scheduled a session</mat-slide-toggle>
  </div>
  <div class="info-container">
      <mat-slide-toggle [(ngModel)]="smart">SMART Goals</mat-slide-toggle>
  </div>
  <div class="info-container">
      <p class="user-text"><span class="user-text-numbers">{{sessions}}/{{sessionsPossible}}</span>Sessions</p>
  </div>
  <div class="info-container">
      <p class="user-text"><span class="user-text-numbers">{{lifetimeSessions}}/{{lifetimeSessionsPossible}}</span>Lifetime Sessions</p>
  </div>
  <div class="info-container">
      <mat-icon class="star">star</mat-icon>
      <p class="user-text"><span class="user-text-numbers">{{lifetimeSessions}}</span>Rating</p>
  </div>
</mat-card>
`,
  styleUrls: ['./modal.component.scss']
})

export class ModalContent {
  constructor(public activeModal: NgbActiveModal) { }
}


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent {
  constructor(private modalService: NgbModal) { }
  open() {
    const modalRef = this.modalService.open(ModalContent);
    modalRef.componentInstance.name = 'Shawn';
  }
}



// @Component({
//   selector: 'app-mentee',
//   template: '',
//   styleUrls: ['./modal.component.scss']
// })
// export class MenteeComponent implements OnInit {
//   @Input() onboarding: boolean;
//   @Input() matched: boolean;
//   @Input() introduced: boolean;
//   @Input() schedule: boolean;
//   @Input() smart: boolean;
//   @Input() sessions: number;
//   @Input() sessionsPossible: number;
//   @Input() lifetimeSessions: number;
//   @Input() lifetimeSessionsPossible: number;
//   @Input() rating: number;
//   @Input() userName: string;
//   @Input() userCompany: string;
//   @Input() userJobTitle: string;
//   private currentUserData: any[any[any]];
//   private currentUserRole: string;
//   displayUserData: any[any[any]];

//   constructor(private apiService: ApiService) {
//     apiService.getUserData().subscribe((data) => { 
//       this.currentUserData = data; 
//       this.currentUserRole = data.currentUserData.userData.role;   
//     }, error => {console.log(`subscription error: `, error)});

//     apiService.getMenteeDisplayData().subscribe((data) => { 
//       this.displayUserData = data;
//       this.updateDisplayData();   
//     }, error => {console.log(`subscription error: `, error)});
//   }

//   ngOnInit(): void { 
//     this.apiService.retrieveUserData();
//     if ( this.currentUserRole === 'admin'){
//       this.apiService.retrieveMenteeData();
//     }
//     this.updateDisplayData();
//   }

//   updateDisplayData(){
//     this.onboarding = this.displayUserData.currentUserData.userData.onboarding;
//     this.matched = this.displayUserData.currentUserData.userData.matched;
//     this.introduced = this.displayUserData.currentUserData.userData.introduced;
//     this.schedule = this.displayUserData.currentUserData.userData.schedule;
//     this.smart = this.displayUserData.currentUserData.userData.smart;
//     this.sessions = this.displayUserData.currentUserData.userData.sessions;
//     this.sessionsPossible = this.displayUserData.currentUserData.userData.sessionsPossible;
//     this.lifetimeSessions = this.displayUserData.currentUserData.userData.lifetimeSessions;
//     this.lifetimeSessionsPossible = this.displayUserData.currentUserData.userData.lifetimeSessionsPossible;
//     this.rating = this.displayUserData.currentUserData.userData.rating;
//     this.userName = this.displayUserData.currentUserData.userData.name;
//     this.userCompany = this.displayUserData.currentUserData.userData.company;
//     this.userJobTitle = this.displayUserData.currentUserData.userData.jobTitle;
//   }
// };


