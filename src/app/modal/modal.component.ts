import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';


@Component({
  selector: '',
  template: `
  <div class="mentee-card">
  <br>
  <div class="mentee-card-header">
      <div class="user-image"></div>
      <div class="name-title">
      <h4 mat-card-title>Mentee1</h4>
      <p mat-card-subtitle>Microsoft</p>
      <p mat-card-subtitle>Plumber</p>
      </div>
      </div>
      <br>
  <br>
  <div class="info-container">
  <!-- Checked checkbox -->
<div class="form-check">
  <input
    class="form-check-input"
    type="checkbox"
    value=""
    id="flexCheckChecked"
    checked
  />
</div>
      <h2 class="bodyStyling">Completed Onboarding Survey</h2>
  </div>
  <div class="info-container">
  <div class="form-check">
  <input
    class="form-check-input"
    type="checkbox"
    value=""
    id="flexCheckChecked"
    checked
  />
</div>
      <h2 class="bodyStyling">Matched with a Mentor</h2>
  </div>
  <div class="info-container">
  <div class="form-check">
  <input
    class="form-check-input"
    type="checkbox"
    value=""
    id="flexCheckChecked"
  />
</div>
      <h2 class="bodyStyling">Introduced yourself</h2>
  </div>
  <div class="info-container">
  <div class="form-check">
  <input
    class="form-check-input"
    type="checkbox"
    value=""
    id="flexCheckChecked"
  />
</div>
      <h2 class="bodyStyling">Scheduled a session</h2>
  </div>
  <div class="info-container">
  <div class="info-container">
  <div class="form-check">
  <input
    class="form-check-input"
    type="checkbox"
    value=""
    id="flexCheckChecked"
  />
</div>
      <h2 class="bodyStyling">SMART Goals</h2>
      <br>
  </div>
</div>
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
