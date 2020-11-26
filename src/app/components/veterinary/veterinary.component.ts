import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { Veterinary } from 'src/app/classes/veterinary';
import { VeterinaryCare } from 'src/app/classes/veterinary-care';
import { VeterinaryCareService } from 'src/app/services/veterinary-care.service';
import { VeterinaryService } from 'src/app/services/veterinary.service';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { element } from 'protractor';
import { formatDate } from '@angular/common';


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

  //Données pour les autorisations
  currentUser: any;
  private roles: string[];
  isAdmin = false;
  isMod = false;

  constructor(private veterinaryService: VeterinaryService, private careService: VeterinaryCareService,
    private router: Router, private modalService: BsModalService, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.roles = this.currentUser.roles;
    if (this.roles.includes('ROLE_ADMIN')) {
      this.isAdmin = true;
    }
    if (this.roles.includes('ROLE_MODERATOR')) {
      this.isMod = true;
    }
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
        let canDelete = false;
        const now = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');

        //Récupère les soins pour ce vétérinaire
        let careByVeterinary = this.myVeterinaryCares.filter(
          vet => vet.veterinary.id == veterinary.id);

        //S'il a des soins, comparaison du premier soin avec la date du jour
        if (careByVeterinary.length > 0) {
          if (formatDate(careByVeterinary[0].examenDate, 'yyyy-MM-dd', 'en_US') < now) {
            canDelete = true;
          }
        //S'il n'a pas de soin, on peut supprimer
        } else {
          canDelete = true;
        }

        if (canDelete) {
          this.veterinaryService.deleteVeterinary(veterinary.id)
            .subscribe(data => console.log(data), error => console.log(error));
          this.router.navigate(['/cares']).then(() => {
            window.location.reload();
          });
        } else {
          window.alert("Suppression impossible.\n Ce vétérinaire a des soins de prévus.")
        }
      }
    });
  }

}
