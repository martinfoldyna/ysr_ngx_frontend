import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'ngx-modal',
  template: `
    <div class="modal-header">
      <span>{{ modalHeader }}</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body" [innerHtml]="modalContent"></div>
    <div class="modal-footer">
      <button *ngFor="let button of modalButtons" class="btn btn-md {{button.classes}}" (click)="button.action()">{{button.text}}</button>
    </div>
  `,
})
export class ModalComponent {

  modalHeader: string;
  modalContent: string;
  modalButtons = [];

  constructor(private activeModal: NgbActiveModal) { }

  closeModal() {
    this.activeModal.close();
  }
}
