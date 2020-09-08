import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/classes/animal';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from 'src/app/services/animal.service';
import { VeterinaryCareService } from 'src/app/services/veterinary-care.service';
import { VeterinaryCare } from 'src/app/classes/veterinary-care';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css']
})
export class AnimalDetailsComponent implements OnInit {

  myAnimal: Animal = new Animal();
  veterinaryCares: VeterinaryCare[] = [];

  constructor(private route:ActivatedRoute, private animalService: AnimalService, 
    private veterinaryCareService: VeterinaryCareService) { }

  ngOnInit(): void {
    this.getAnimal();
    this.getVeterinaryCares();
  }

  getAnimal(){
    let animalId = this.route.snapshot.paramMap.get("id");
    this.animalService.getOneAnimal(animalId).subscribe(
      data => this.myAnimal = data
    );
  }

  getVeterinaryCares(){
    let animalId = this.route.snapshot.paramMap.get("id");

    this.veterinaryCareService.getVeterinaryCaresByAnimals(animalId).subscribe(
      data => this.veterinaryCares = data
    );
  }

}
