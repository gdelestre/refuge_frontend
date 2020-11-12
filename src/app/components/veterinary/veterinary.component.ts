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

    this.modalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        title: "Confirmation annulation",
        prompt: `Voulez-vous vraiment annuler ce soin pour ${care.animal.name}?`,
        callback: (result) => {
          if (result == 'oui') {
            this.careService.deleteCare(care.id)
              .subscribe(data => console.log(data), error => console.log(error));
            this.router.navigate(['/cares']).then(() => {
              window.location.reload();
            });
          }
        }
      }
    });
  }

  deleteVeterinary(veterinary: Veterinary) {
    //const now = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');

    this.modalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        title: "Confirmation suppression",
        prompt: `Voulez-vous vraiment supprimer le docteur ${veterinary.lastName.toUpperCase()}?`,
        detail: "Tous les soins fait par ce docteur seront également supprimés.",

        callback: (result) => {
          if (result == 'oui') {
            this.veterinaryService.deleteVeterinary(veterinary.id)
              .subscribe(data => console.log(data), error => console.log(error));
            this.router.navigate(['/cares']).then(() => {
              window.location.reload();
            });
          }
        }
      }
    });
  }

}
