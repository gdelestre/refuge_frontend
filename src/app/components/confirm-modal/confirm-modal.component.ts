import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
  public title: string;
  public prompt: string;
  public detail: string;
  public active: boolean = false;
  public onClose: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
    this.onClose = new Subject();
  }

  public showConfirmationModal(title: string, prompt: string, detail: string): void {
    this.title = title;
    this.prompt =  prompt;
    this.detail = detail;
    this.active = true;
}

  public onConfirm(): void {
    this.active = false;
    this.onClose.next(true);
    this.bsModalRef.hide();
  }

  public onDecline(): void {
    this.active = false;
    this.onClose.next(false);
    this.bsModalRef.hide();
  }

}
