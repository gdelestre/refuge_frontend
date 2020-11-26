import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/classes/animal';
import { AnimalService } from 'src/app/services/animal.service';
import { AdoptAnimal } from 'src/app/classes/adopt-animal';
import { AdoptAnimalService } from 'src/app/services/adopt-animal.service';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-adoptive-family',
  templateUrl: './adoptive-family.component.html',
  styleUrls: ['./adoptive-family.component.css']
})
export class AdoptiveFamilyComponent implements OnInit {

  myAdoptions: AdoptAnimal[] = [];
  myAdoptedAnimals: Animal[] = [];
  //Modal pour confirmation
  modalRef: BsModalRef;
  //Pour pagination
  p: number = 1;

  //Données pour les autorisations
  currentUser: any;
  private roles: string[];
  isAdmin = false;

  constructor(private animalService: AnimalService, private adoptAnimalService: AdoptAnimalService,
    private router: Router, private modalService: BsModalService, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.roles = this.currentUser.roles;
    if (this.roles.includes('ROLE_ADMIN')) {
      this.isAdmin = true;
    }

    this.getAllAdoptionss();
    this.getAllAnimalsInAdoptivesFamilies();
  }

  getAllAdoptionss() {
    this.adoptAnimalService.getAllAdoptions().subscribe(
      data => this.myAdoptions = data
    );
  }

  getAllAnimalsInAdoptivesFamilies() {
    this.animalService.getAdoptedAnimals().subscribe(
      data => this.myAdoptedAnimals = data
    );
  }

  cancelAdoption(animal: Animal) {
    const modal = this.modalService.show(ConfirmModalComponent);
    (<ConfirmModalComponent>modal.content).showConfirmationModal(
      "Confirmation annulation",
      `Voulez-vous vraiment annuler l'adoption de : ${animal.name}?`,
      "L'animal sera de retour au refuge et la famille supprimée (sauf si elle a une autre adoption en cours)."
    );

    (<ConfirmModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {
        animal.adopted = false;
        animal.adoption = null;

        this.animalService.updateAnimal(animal)
          .subscribe(data => console.log(data), error => console.log(error));

        this.adoptAnimalService.deleteAdoptionByAnimalId(animal.id)
          .subscribe(data => console.log(data), error => console.log(error));

        this.router.navigate(['/adoptives']).then(() => {
          window.location.reload();
        });
      }
    });
  }

  validateAdoption(animal: Animal) {
    const modal = this.modalService.show(ConfirmModalComponent);
    (<ConfirmModalComponent>modal.content).showConfirmationModal(
      "Validation adoption",
      `Voulez-vous valider l'adoption de : ${animal.name}?`,
      "L'animal sera supprimé ainsi que sa famille d'adoption (sauf si elle a une autre adoption en cours)."
    );

    (<ConfirmModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {
        //Suppression de l'adoption
        this.adoptAnimalService.deleteAdoptionByAnimalId(animal.id)
          .subscribe(data => console.log(data), error => console.log(error));

        animal.adopted = false;
        animal.adoption = null;

        //Suppression de l'animal
        this.animalService.deleteAnimal(animal.id)
          .subscribe(data => console.log(data), error => console.log(error));

        this.router.navigate(['/adoptives']).then(() => {
          window.location.reload();
        });
      }
    });
  }

}