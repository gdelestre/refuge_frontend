import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ValidatorFn } from '@angular/forms';
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
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrls: ['./add-animal.component.css']
})
export class AddAnimalComponent implements OnInit {

  animalFormGroup: FormGroup;
  newAnimal: Animal = new Animal();
  espSelected: string = "Chat";

  constructor(private formBuilder: FormBuilder, private animalService: AnimalService) { }

  ngOnInit(): void {

    this.animalFormGroup = this.formBuilder.group({
      animal: this.formBuilder.group({
        name: ['', Validators.compose(
          [Validators.required, Validators.pattern('^[A-Z][a-z]{2,14}$')]
        )],
        race: ['', Validators.required],
        species: ['', Validators.required],
        sexe: ['', Validators.required],
        birthDate: ['', Validators.compose(
          [Validators.required, validDate])],
        arrivalDate: ['', Validators.compose(
          [Validators.required, validDate])]
      })
    });
  }

  onSubmit() {
    this.saveAnimal();
    this.animalFormGroup.reset();
  }

  saveAnimal() {
    this.newAnimal = new Animal();
    this.newAnimal.name = this.animalFormGroup.get('animal').value.name;
    this.newAnimal.race = this.animalFormGroup.get('animal').value.race;
    this.newAnimal.species = this.animalFormGroup.get('animal').value.species;
    this.newAnimal.sexe = this.animalFormGroup.get('animal').value.sexe;
    this.newAnimal.birthDate = this.animalFormGroup.get('animal').value.birthDate;
    this.newAnimal.arrivalDate = this.animalFormGroup.get('animal').value.arrivalDate;
    this.newAnimal.hostFamily = null;
    this.newAnimal.adopted = false;
    this.save();
  }

  save() {
    this.animalService.createAnimal(this.newAnimal)
      .subscribe(data => console.log(data), error => console.log(error));
    this.newAnimal = new Animal();
  }

}
