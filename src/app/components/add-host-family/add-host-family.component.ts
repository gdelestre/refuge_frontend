import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/classes/animal';
import { HostFamily } from 'src/app/classes/host-family';
import { AnimalService } from 'src/app/services/animal.service';
import { HostFamilyService } from 'src/app/services/host-family.service';

@Component({
  selector: 'app-add-host-family',
  templateUrl: './add-host-family.component.html',
  styleUrls: ['./add-host-family.component.css']
})
export class AddHostFamilyComponent implements OnInit {

  myAnimal: Animal = new Animal();
  myHostFamily: HostFamily = new HostFamily();

  allHostFamilies: HostFamily[];

  hostWithNewFamilyFormGroup: FormGroup;
  hostWithExistingFamilyFormGroup: FormGroup;
  selectedOption: string;


  constructor(private formBuilder: FormBuilder, private animalService: AnimalService,
    private hostFamilyService: HostFamilyService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getAnimal();
    this.getAllHostFamilies();
    this.hostWithNewFamilyFormGroup = this.formBuilder.group({
      hostFamily: this.formBuilder.group({
        firstName: ['', Validators.compose(
          [Validators.required, Validators.pattern('^[A-Z][a-zéèê]+(-[A-Za-z][a-zéèê]+){0,2}$')]
        )],
        lastName: ['', Validators.required],
        zipCode: ['', Validators.compose(
          [Validators.required, Validators.pattern('^[0-9]{5}$')]
        )],
        city: ['', Validators.required],
        streetName: ['', Validators.compose(
          [Validators.required, Validators.minLength(5)]
        )],
        streetNumber: ['', Validators.compose(
          [Validators.required, Validators.pattern('^[0-9]{1,3}$')]
        )],
        phoneNumber: ['', Validators.compose(
          [Validators.required, Validators.pattern('^[0-9]{10}$')]
        )],
      })
    });

    this.hostWithExistingFamilyFormGroup = this.formBuilder.group({
      hostAnimal: this.formBuilder.group({
        hostFamilyId: ['', Validators.required]
      })

    });
  }

  private getIdAnimal() {
    return this.route.snapshot.paramMap.get("idAnimal");
  }

  getAnimal() {
    let idAnimal = this.getIdAnimal();
    this.animalService.getOneAnimal(idAnimal).subscribe(
      data => this.myAnimal = data
    );
  }

  getFamily(selectedHostFamily): void {
    this.myHostFamily = selectedHostFamily;
    console.log(this.myHostFamily);
  }

  // Récupère la valeur du radio Button qui est coché
  setRadio(value: string): void {
    this.selectedOption = value;
  }

  // Permet de comparer la valeur du radio button coché avec une valeur saisie pour afficher
  // la div qui correspond à ce que l'on veut faire
  isSelected(name: string): boolean {

    if (!this.selectedOption) {
      return false;
    }

    return (this.selectedOption === name);
  }

  getAllHostFamilies() {
    this.hostFamilyService.getAllHostFamily().subscribe(
      data => this.allHostFamilies = data
    );
  }

  onSubmitNewFamily() {
    this.saveHostFamily();
    this.hostWithNewFamilyFormGroup.reset();
  }

  saveHostFamily() {
    this.myHostFamily = new HostFamily();
    this.myHostFamily.firstName = this.hostWithNewFamilyFormGroup.get('hostFamily').value.firstName;
    this.myHostFamily.lastName = this.hostWithNewFamilyFormGroup.get('hostFamily').value.lastName;
    this.myHostFamily.zipCode = this.hostWithNewFamilyFormGroup.get('hostFamily').value.zipCode;
    this.myHostFamily.city = this.hostWithNewFamilyFormGroup.get('hostFamily').value.city;
    this.myHostFamily.streetName = this.hostWithNewFamilyFormGroup.get('hostFamily').value.streetName;
    this.myHostFamily.streetNumber = this.hostWithNewFamilyFormGroup.get('hostFamily').value.streetNumber;
    this.myHostFamily.phoneNumber = this.hostWithNewFamilyFormGroup.get('hostFamily').value.phoneNumber;

    this.myAnimal.hostFamily = this.myHostFamily;

    this.updateAnimal();
  }

  onSubmitExistingFamily() {
    this.saveAdoption();
    this.hostWithExistingFamilyFormGroup.reset();
  }

  saveAdoption(){
    this.myAnimal.hostFamily = this.myHostFamily;
    this.updateAnimal();
  }

  updateAnimal(){
    this.animalService.updateAnimal(this.myAnimal)
    .subscribe(data => console.log(data), error => console.log(error));
  }

}