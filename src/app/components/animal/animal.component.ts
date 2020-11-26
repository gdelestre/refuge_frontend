import { Component, OnInit } from '@angular/core';
import { AnimalService } from 'src/app/services/animal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/classes/animal';
import { TokenStorageService } from 'src/app/services/token-storage.service';


@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  myAnimals: Animal[] = [];
  speciesFilter: boolean = false;
  page: number = 1;

  currentUser: any;
  private roles: string[];
  isUser = true;

  constructor(private route: ActivatedRoute, private animalService: AnimalService,
    private tokenStorageService: TokenStorageService, private router: Router) {
  }

  ngOnInit(): void {
    this.currentUser = this.tokenStorageService.getUser();
    this.roles = this.currentUser.roles;
    if (this.roles.includes('ROLE_ADMIN') || this.roles.includes('ROLE_MODERATOR')) {
      this.isUser = false;
    }

    this.route.paramMap.subscribe(
      () => { this.listAnimals() });
  }

  listAnimals() {
    this.speciesFilter = this.route.snapshot.paramMap.has("species");

    if (this.speciesFilter) {
      this.getFilterAnimals();
    } else {
      this.getAllAnimals();
    }
  }

  getAllAnimals() {
    this.animalService.getAllAnimals().subscribe(
      data => this.myAnimals = data
    );
  }

  getFilterAnimals() {
    let selectedSpecies = this.route.snapshot.paramMap.get("species");
    this.animalService.getAnimalsBySpecies(selectedSpecies).subscribe(
      data => this.myAnimals = data
    );
  }


}
