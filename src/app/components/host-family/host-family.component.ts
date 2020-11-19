import { Component, OnInit } from '@angular/core';
import { HostFamily } from 'src/app/classes/host-family';
import { HostFamilyService } from 'src/app/services/host-family.service';
import { Animal } from 'src/app/classes/animal';
import { AnimalService } from 'src/app/services/animal.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-host-family',
  templateUrl: './host-family.component.html',
  styleUrls: ['./host-family.component.css']
})
export class HostFamilyComponent implements OnInit {

  myFamilies: HostFamily[] = [];

  myAnimalsInHostFamily: Animal[] = [];
  hostFamily: HostFamily;

  //Modal pour confirmation
  modalRef: BsModalRef;

  //Pour pagination
  p: number = 1;

  freeFamilies: boolean = this.router.url.startsWith('/free')
  title: string = "Famille(s) pouvant accueillir d'autres animaux:";

  constructor(private hostFamilyService: HostFamilyService, private animalService: AnimalService,
    private modalService: BsModalService, private router: Router) { }

  ngOnInit(): void {
    if (this.freeFamilies) {
      this.getAllFreeHostFamilies();
    } else {
      this.title = "Famille(s) ne pouvant plus en accueillir:";
      this.getAllFullHostFamilies();
    }
    this.getAllAnimalsInHostFamilies();
  }

  getAllFreeHostFamilies() {
    this.hostFamilyService.getAllHostFreeFamilies().subscribe(
      data => this.myFamilies = data
    );
  }

  getAllFullHostFamilies() {
    this.hostFamilyService.getAllHostFullFamilies().subscribe(
      data => this.myFamilies = data
    );
  }

  getAllAnimalsInHostFamilies() {
    this.animalService.getAnimalsInHostFamily().subscribe(
      data => this.myAnimalsInHostFamily = data
    );
  }

  onChangeEvent(hostFamilySelected) {
    this.hostFamily = hostFamilySelected;
    if (this.hostFamily.free == true) {
      this.hostFamily.free = false;
    } else {
      this.hostFamily.free = true;
    }
    this.updateFamily();
    if(this.freeFamilies){
      this.router.navigate(['/full/hosts']).then(() => {
        window.location.reload();
      });
    }else{
      this.router.navigate(['/free/hosts']).then(() => {
        window.location.reload();
      });
    }

  }

  updateFamily() {
    this.hostFamilyService.updateHostFamily(this.hostFamily)
      .subscribe(data => console.log(data), error => console.log(error));
  }

  deleteFamily(family: HostFamily) {
    const modal = this.modalService.show(ConfirmModalComponent);
    (<ConfirmModalComponent>modal.content).showConfirmationModal(
      "Confirmation suppression",
      `Voulez-vous vraiment supprimer la famille ${family.lastName.toUpperCase()}?`,
      null
    );

    (<ConfirmModalComponent>modal.content).onClose.subscribe(result => {
      if (result === true) {
        this.hostFamilyService.deleteFamily(family.id)
          .subscribe(data => console.log(data), error => console.log(error));

        if (this.freeFamilies) {
          this.router.navigate(['/free/hosts']).then(() => {
            window.location.reload();
          });
        } else {
          this.router.navigate(['/full/hosts']).then(() => {
            window.location.reload();
          });
        }


      }
    });
  }

}
