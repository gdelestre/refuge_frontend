import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef) { }

  title: string;
  prompt: string;
  detail: string;

  ngOnInit(): void {
  }

  confirm() {
    if (this.bsModalRef.content.callback != null){
      this.bsModalRef.content.callback('oui');
      this.bsModalRef.hide();
    }
  }
 
  decline() {
    if (this.bsModalRef.content.callback != null){
      this.bsModalRef.content.callback('non');
      this.bsModalRef.hide();
    }
  }

}
