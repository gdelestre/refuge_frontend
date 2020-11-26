import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Animal } from 'src/app/classes/animal';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from 'src/app/services/animal.service';
import { VeterinaryCareService } from 'src/app/services/veterinary-care.service';
import { VeterinaryCare } from 'src/app/classes/veterinary-care';
import { formatDate } from '@angular/common';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css']
})
export class AnimalDetailsComponent implements OnInit {

  myAnimal: Animal = new Animal();
  veterinaryCares: VeterinaryCare[] = [];

  //Modal pour confirmation
  modalRef: BsModalRef;

  currentUser: any;
  private roles: string[];
  isAdmin = false;
  isMod = false;

  constructor(private route: ActivatedRoute, private router: Router, private animalService: AnimalService,
    private veterinaryCareService: VeterinaryCareService, private modalService: BsModalService,
    private tokenStorageService: TokenStorageService) {
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

    this.getAnimal();
    this.getVeterinaryCares();
  }

  private getAnimalId() {
    return this.route.snapshot.paramMap.get("id");
  }

  getAnimal() {
    let animalId = this.getAnimalId();
    this.animalService.getOneAnimal(animalId).subscribe(
      data => this.myAnimal = data
    );
  }

  getVeterinaryCares() {
    let animalId = this.getAnimalId();

    this.veterinaryCareService.getVeterinaryCaresByAnimals(animalId).subscribe(
      data => this.veterinaryCares = data
    );
  }

  deleteAnimal(animal: Animal) {
    const modal = this.modalService.show(ConfirmModalComponent);
    (<ConfirmModalComponent>modal.content).showConfirmationModal(
      "Confirmation suppression",
      `Voulez-vous vraiment supprimer l'animal: ${animal.name}?`,
      null
    );

    (<ConfirmModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {
        let canDelete = false;
        const now = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
        if (this.veterinaryCares.length > 0) {
          if (formatDate(this.veterinaryCares[0].examenDate, 'yyyy-MM-dd', 'en_US') < now) {
            canDelete = true;
          }
        } else {
          canDelete = true;
        }

        if(canDelete){
          this.animalService.deleteAnimal(animal.id)
          .subscribe(data => console.log(data), error => console.log(error));

        this.router.navigate(['/animals']).then(() => {
          window.location.reload();
        });
        }else{
          window.alert("Impossible de supprimer un animal avec des soins de prévus.\n Veuillez annuler le(s) soin(s) prévu(s) avant de supprimer cet animal.");
        }
      }
    });
  }

  backToTheRefuge(animal: Animal) {
    const modal = this.modalService.show(ConfirmModalComponent);
    (<ConfirmModalComponent>modal.content).showConfirmationModal(
      'Confirmation retour',
      `Confirmez-vous le retour de l'animal : ${animal.name} au refuge?`,
      null
    );

    (<ConfirmModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {
        animal.hostFamily = null;
        this.animalService.updateAnimal(animal)
          .subscribe(data => console.log(data), error => console.log(error));

        this.router.navigate(['/animals']).then(() => {
          window.location.reload();
        });
      }
    });

  }

  confirmAdoption(id: string) {
    const now = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');

    for (let care of this.veterinaryCares) {
      let dateCare: string = formatDate(care.examenDate, 'yyyy-MM-dd', 'en_US');

      if (dateCare > now) {
        window.alert("Cet animal a des soins de prévus.\nIl ne peut pas être adopé actuellement.\n" +
          "Vous allez être redirigé vers la page des soins.");
        return this.router.navigate(['/cares']).then(() => {
          window.location.reload();
        });
      }
    }

    return this.router.navigate(['/adopt/' + id]).then(() => {
      window.location.reload();
    });
  }

}
