import { Component, OnInit } from '@angular/core';
import { AdoptiveFamily } from 'src/app/classes/adoptive-family';
import { Animal } from 'src/app/classes/animal';
import { AnimalService } from 'src/app/services/animal.service';
import { AdoptiveFamilyService } from 'src/app/services/adoptive-family.service';
import { AdoptAnimal } from 'src/app/classes/adopt-animal';
import { AdoptAnimalService } from 'src/app/services/adopt-animal.service';

@Component({
  selector: 'app-adoptive-family',
  templateUrl: './adoptive-family.component.html',
  styleUrls: ['./adoptive-family.component.css']
})
export class AdoptiveFamilyComponent implements OnInit {

  myAdoptions: AdoptAnimal[] =[];
  myAdoptedAnimals: Animal[] = [];

  constructor(private animalService: AnimalService, private adoptedFamilyService: AdoptiveFamilyService,
    private adoptAnimalService: AdoptAnimalService) { }

  ngOnInit(): void {
    this.getAllAdoptionss();
    this.getAllAnimalsInAdoptivesFamilies();
  }

  getAllAdoptionss(){
    this.adoptAnimalService.getAllAdoptions().subscribe(
      data => this.myAdoptions = data
    );
  }

  getAllAnimalsInAdoptivesFamilies(){
    this.animalService.getAdoptedAnimals().subscribe(
      data => this.myAdoptedAnimals = data
    );
  }

}
