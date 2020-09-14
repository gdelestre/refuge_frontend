import { Component, OnInit } from '@angular/core';
import { AdoptiveFamily } from 'src/app/classes/adoptive-family';
import { Animal } from 'src/app/classes/animal';
import { AnimalService } from 'src/app/services/animal.service';
import { AdoptiveFamilyService } from 'src/app/services/adoptive-family.service';

@Component({
  selector: 'app-adoptive-family',
  templateUrl: './adoptive-family.component.html',
  styleUrls: ['./adoptive-family.component.css']
})
export class AdoptiveFamilyComponent implements OnInit {

  myAdoptiveFamilies: AdoptiveFamily[] =[];
  myAdoptedAnimals: Animal[] = [];

  constructor(private animalService: AnimalService, private adoptedFamilyService: AdoptiveFamilyService) { }

  ngOnInit(): void {
    this.getAllHostFamilies();
    this.getAllAnimalsInHostFamilies();
  }

  getAllHostFamilies(){
    this.adoptedFamilyService.getAllHostFamily().subscribe(
      data => this.myAdoptiveFamilies = data
    );
  }

  getAllAnimalsInHostFamilies(){
    this.animalService.getAdoptedAnimals().subscribe(
      data => this.myAdoptedAnimals = data
    );
  }

}
