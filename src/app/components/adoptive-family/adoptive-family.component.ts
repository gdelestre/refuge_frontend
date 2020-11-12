import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/classes/animal';
import { AnimalService } from 'src/app/services/animal.service';
import { AdoptiveFamilyService } from 'src/app/services/adoptive-family.service';
import { AdoptAnimal } from 'src/app/classes/adopt-animal';
import { AdoptAnimalService } from 'src/app/services/adopt-animal.service';
import { NavigationEnd, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

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

  constructor(private animalService: AnimalService, private adoptAnimalService: AdoptAnimalService,
    private router: Router, private modalService: BsModalService) {
  }

  ngOnInit(): void {
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
    this.modalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        title: "Confirmation annulation",
        prompt: `Voulez-vous vraiment annuler l'adoption de : ${animal.name}?`,
        detail: "L'animal sera de retour au refuge et la famille supprimée (sauf si elle a une autre adoption en cours).",
        callback: (result) => {
          if (result == 'oui') {
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
        }
      }
    });
  }

  validateAdoption(animal: Animal) {

    this.modalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        title: "Validation adoption",
        prompt: `Voulez-vous valider l'adoption de : ${animal.name}?`,
        detail: "L'animal sera supprimé ainsi que sa famille d'adoption (sauf si elle a une autre adoption en cours).",
        callback: (result) => {
          if (result == 'oui') {
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
        }
      }
    });
  }

}
