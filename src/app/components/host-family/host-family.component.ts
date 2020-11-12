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

  myHostFamilies: HostFamily[] = [];
  myAnimalsInHostFamily: Animal[] = [];
  hostFamily: HostFamily;

  //Modal pour confirmation
  modalRef: BsModalRef;

  constructor(private hostFamilyService: HostFamilyService, private animalService: AnimalService,
    private modalService: BsModalService, private router: Router) { }

  ngOnInit(): void {
    this.getAllHostFamilies();
    this.getAllAnimalsInHostFamilies();
  }

  getAllHostFamilies() {
    this.hostFamilyService.getAllHostFamilies().subscribe(
      data => this.myHostFamilies = data
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
  }

  updateFamily() {
    this.hostFamilyService.updateHostFamily(this.hostFamily)
      .subscribe(data => console.log(data), error => console.log(error));
  }

  deleteFamily(family: HostFamily) {
    this.modalRef = this.modalService.show(ConfirmModalComponent, {
      initialState: {
        title: "Confirmation suppression",
        prompt: `Voulez-vous vraiment supprimer la famille ${family.lastName.toUpperCase()}?`,
        callback: (result) => {
          if (result == 'oui') {
            this.hostFamilyService.deleteFamily(family.id)
              .subscribe(data => console.log(data), error => console.log(error));

            this.router.navigate(['/hosts']).then(() => {
              window.location.reload();
            });
          }
        }
      }
    });
  }

}
