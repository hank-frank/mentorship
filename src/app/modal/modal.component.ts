import { Component } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-content',
  template: `
<div class="tableCard">Mentee or Mentor Component</div>
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

