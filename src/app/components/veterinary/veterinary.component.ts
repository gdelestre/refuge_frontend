import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { Veterinary } from 'src/app/classes/veterinary';
import { VeterinaryCare } from 'src/app/classes/veterinary-care';
import { VeterinaryCareService } from 'src/app/services/veterinary-care.service';
import { VeterinaryService } from 'src/app/services/veterinary.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';


@Component({
  selector: 'app-veterinary',
  templateUrl: './veterinary.component.html',
  styleUrls: ['./veterinary.component.css']
})
export class VeterinaryComponent implements OnInit {

  myVeterinaries: Veterinary[] = [];
  myVeterinaryCares: VeterinaryCare[] = [];
  //Modal pour confirmation
  modalRef: BsModalRef;

  //Pour pagination
  page: number = 1;

  constructor(private veterinaryService: VeterinaryService, private careService: VeterinaryCareService,
    private router: Router, private modalService: BsModalService) {
  }

  ngOnInit(): void {
    this.getAllVeterinaries();
    this.getAllVeterinaryCaresToDo();
  }


  getAllVeterinaries() {
    this.veterinaryService.getAllVeterinaries().subscribe(
      data => this.myVeterinaries = data
    );
  }

  getAllVeterinaryCaresToDo() {
    this.careService.getVeterinaryCaresToDo()
      .subscribe(data => this.myVeterinaryCares = data);
  }
  
  deleteCare(care: VeterinaryCare) {
    const modal = this.modalService.show(ConfirmModalComponent);
    (<ConfirmModalComponent>modal.content).showConfirmationModal(
      "Confirmation annulation",
      `Voulez-vous vraiment annuler ce soin pour ${care.animal.name}?`,
      null
    );

    (<ConfirmModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {
        this.careService.deleteCare(care.id)
          .subscribe(data => console.log(data), error => console.log(error));
        this.router.navigate(['/cares']).then(() => {
          window.location.reload();
        });
      }
    });

  }

 deleteVeterinary(veterinary: Veterinary) {
  const modal = this.modalService.show(ConfirmModalComponent);
  (<ConfirmModalComponent>modal.content).showConfirmationModal(
    "Confirmation suppression",
    `Voulez-vous vraiment supprimer le docteur ${veterinary.lastName.toUpperCase()}?`,
    "Tous les soins fait par ce docteur seront également supprimés."
  );

  (<ConfirmModalComponent>modal.content).onClose.subscribe(result => {
    if (result === true) {
      this.veterinaryService.deleteVeterinary(veterinary.id)
              .subscribe(data => console.log(data), error => console.log(error));
            this.router.navigate(['/cares']).then(() => {
              window.location.reload();
            });
    }
  });

 
}

}
