import { Component, OnInit } from '@angular/core';
import { HostFamily } from 'src/app/classes/host-family';
import { HostFamilyService } from 'src/app/services/host-family.service';
import { Animal } from 'src/app/classes/animal';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-host-family',
  templateUrl: './host-family.component.html',
  styleUrls: ['./host-family.component.css']
})
export class HostFamilyComponent implements OnInit {

  myHostFamilies: HostFamily[] = [];
  myAnimalsInHostFamily: Animal[] = [];
  hostFamily: HostFamily;

  constructor(private hostFamilyService: HostFamilyService, private animalService: AnimalService) { }

  ngOnInit(): void {
    this.getAllHostFamilies();
    this.getAllAnimalsInHostFamilies();
  }

  getAllHostFamilies() {
    this.hostFamilyService.getAllHostFamily().subscribe(
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


}
