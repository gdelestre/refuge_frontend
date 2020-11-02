import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Animal } from 'src/app/classes/animal';
import { AnimalService } from 'src/app/services/animal.service';

export const validDate: ValidatorFn = (control) => {

  if (control && (control.dirty || control.touched)) {
    const now = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
    const pattern = new RegExp('^(?:19|20)[0-9]{2}[-\\/ ]?(0?[1-9]|1[0-2])[-/ ]?(0?[1-9]|[12][0-9]|3[01])$');

    let dateForm: string;

    if (pattern.test(control.value)) {
      dateForm = formatDate(control.value, 'yyyy-MM-dd', 'en_US');

      /* Is not valid. */
      if (now < dateForm) {
        return {
          'validDate': {
            reason: 'In the futur',
            value: control.value
          }
        };
      }
      /* Is valid. */
      return null;
    }

  } else {
    /* Is not valid. */
    return {
      'validDate': {
        reason: 'Invalid pattern',
        value: control.value
      }
    };
  }

};

@Component({
  selector: 'app-add-or-update-animal',
  templateUrl: './add-or-update-animal.component.html',
  styleUrls: ['./add-or-update-animal.component.css']
})
export class AddOrUpdateAnimalComponent implements OnInit {

  animalFormGroup: FormGroup;
  myAnimal: Animal = new Animal();
  animalForForm: Observable<Animal>;
  isFormForAdd: boolean = this.router.url.endsWith("/add");
  title: string = "Nouveau pensionnaire :"

  constructor(private formBuilder: FormBuilder, private animalService: AnimalService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

    //Si le formulaire n'est pas pour ajouter un animal, il est pour modifier un animal :
    // --> faut charger l'animal à modifier
    // --> faut charger le formulaire avec les données de l'animal à modifier
    if (!this.isFormForAdd) {
      this.getAnimal();
      this.updateFormWithAnimal();
      this.title = "Modification du pensionnaire : ";
    }

    this.animalFormGroup = this.formBuilder.group({
      name: ['', Validators.compose(
        [Validators.required, Validators.pattern('^[A-Z][a-z]{2,14}$')]
      )],
      race: ['', Validators.required],
      species: ['Chat', Validators.required],
      sexe: ['Male', Validators.required],
      birthDate: ['', Validators.compose(
        [Validators.required, validDate])],
      arrivalDate: ['', Validators.compose(
        [Validators.required, validDate])]
    });
  }

  //Récupère l'id de l'animal à modifier via l'URL
  private getIdAnimal() {
    return this.route.snapshot.paramMap.get("idAnimal");
  }

  //Récupère l'animal à modifier via l'ID
  getAnimal() {
    let animalId = this.getIdAnimal();

    this.animalService.getOneAnimal(animalId).subscribe(
      data => this.myAnimal = data
    );
  }

  //Récupère l'animal et charge le formulaire avec les informations
  updateFormWithAnimal() {
    let animalId = this.getIdAnimal();

    this.animalForForm = this.animalService
      .getOneAnimal(animalId)
      .pipe(tap(animal => this.animalFormGroup.patchValue(animal)));
  }

  onSubmit() {
    this.saveOrUpdateAnimal();

    this.router.navigate(['/animals']);
  }

  saveOrUpdateAnimal() {
    let allAnimalFormProps: string[] = ["name", "race", "sexe", "species", "birthDate", "arrivalDate"];

    //Boucle sur les propriétés du formulaire
    for (let propForm of allAnimalFormProps) {
      //récupère une propriété du formulaire
      let newProperty = this.animalFormGroup.value[propForm];
      //Si elle n'est pas nulle, elle a été modifiée ou crée, faut donc l'enregistrer.
      if (newProperty) {

        switch(propForm){
          case "name": {
            this.myAnimal.name = newProperty;
            break;
          }
          case "race": {
            this.myAnimal.race = newProperty;
            break;
          }
          case "sexe": {
            this.myAnimal.sexe = newProperty;
            break;
          }
          case "species": {
            this.myAnimal.species = newProperty;
            break;
          }
          case "birthDate": {
            this.myAnimal.birthDate = newProperty;
            break;
          }
          case "arrivalDate": {
            this.myAnimal.arrivalDate = newProperty;
            break;
          }
        }
      }
    }

    if(this.isFormForAdd){
      this.myAnimal.hostFamily = null;
      this.myAnimal.adopted = false;
      this.save();
    }else{
      this.update();
    }
  }
  
  save() {
    this.animalService.createAnimal(this.myAnimal)
      .subscribe(data => console.log(data), error => console.log(error));
    this.myAnimal = new Animal();
  }

  update(){
    this.animalService.updateAnimal(this.myAnimal)
    .subscribe(data => console.log(data), error => console.log(error));
  }

}
