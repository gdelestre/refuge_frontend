import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdoptAnimal } from 'src/app/classes/adopt-animal';
import { AdoptiveFamily } from 'src/app/classes/adoptive-family';
import { Animal } from 'src/app/classes/animal';
import { AdoptAnimalService } from 'src/app/services/adopt-animal.service';
import { AdoptiveFamilyService } from 'src/app/services/adoptive-family.service';
import { AnimalService } from 'src/app/services/animal.service';

@Component({
  selector: 'app-add-adoptive-family',
  templateUrl: './add-adoptive-family.component.html',
  styleUrls: ['./add-adoptive-family.component.css']
})
export class AddAdoptiveFamilyComponent implements OnInit {

  myAnimal: Animal = new Animal();
  myAdoptiveFamily: AdoptiveFamily = new AdoptiveFamily();
  newAdoption = new AdoptAnimal();

  allAdoptivesFamilies: AdoptiveFamily[];

  adoptWithNewFamilyFormGroup: FormGroup;
  adoptWithExistingFamilyFormGroup: FormGroup;
  selectedOption: string;
  selectedId: string = "";

  constructor(private formBuilder: FormBuilder, private animalService: AnimalService,
    private adoptiveService: AdoptiveFamilyService, private adoptionService: AdoptAnimalService,
    private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.getAnimal();
    this.getAllAdoptivesFamilies();
    this.adoptWithNewFamilyFormGroup = this.formBuilder.group({
      adoptiveFamily: this.formBuilder.group({
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
      }),
      adoptAnimal: this.formBuilder.group({
        adoptionDate: ['', Validators.required]
      })

    });

    this.adoptWithExistingFamilyFormGroup = this.formBuilder.group({
      adoptAnimal: this.formBuilder.group({
        adoptiveFamilyId: ['', Validators.required],
        adoptionDate: ['', Validators.required]
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

  // Récupère le résultat du choix: utiliser un adoptant existant?
  setOption(value: string): void {
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

  getFamily(selectedAdoptiveFamily): void {
    this.myAdoptiveFamily = selectedAdoptiveFamily;
    console.log(this.myAdoptiveFamily);
  }

  getAllAdoptivesFamilies() {
    this.adoptiveService.getAllAdoptivesFamilies().subscribe(
      data => this.allAdoptivesFamilies = data
    );
  }

  onSubmitNewFamily() {
    this.saveAdoptiveFamily();
    this.router.navigate(['/adoptives']).then(() => {
      window.location.reload();
    });
  }

  onSubmitExistingFamily() {
    this.saveAdoption();
    this.router.navigate(['/adoptives']).then(() => {
      window.location.reload();
    });
  }

  saveAdoptiveFamily() {
    this.myAdoptiveFamily = new AdoptiveFamily();
    this.myAdoptiveFamily.firstName = this.adoptWithNewFamilyFormGroup.get('adoptiveFamily').value.firstName;
    this.myAdoptiveFamily.lastName = this.adoptWithNewFamilyFormGroup.get('adoptiveFamily').value.lastName;
    this.myAdoptiveFamily.zipCode = this.adoptWithNewFamilyFormGroup.get('adoptiveFamily').value.zipCode;
    this.myAdoptiveFamily.city = this.adoptWithNewFamilyFormGroup.get('adoptiveFamily').value.city;
    this.myAdoptiveFamily.streetName = this.adoptWithNewFamilyFormGroup.get('adoptiveFamily').value.streetName;
    this.myAdoptiveFamily.streetNumber = this.adoptWithNewFamilyFormGroup.get('adoptiveFamily').value.streetNumber;
    this.myAdoptiveFamily.phoneNumber = this.adoptWithNewFamilyFormGroup.get('adoptiveFamily').value.phoneNumber;

    this.adoptiveService.getAdoptiveFamilyByPhoneNumber(this.myAdoptiveFamily.phoneNumber)
      .subscribe(family => {
        if (family) {
          window.alert("Ce numéro de téléphone est déjà utilisé.");
        } else {
          this.saveNewAdoption(this.adoptWithNewFamilyFormGroup);
        }
      });
  }

  saveAdoption() {
    this.saveNewAdoption(this.adoptWithExistingFamilyFormGroup);
  }

  private saveNewAdoption(formGroup: FormGroup) {
    console.log("id de la famille: " + this.myAdoptiveFamily.id);
    this.newAdoption = new AdoptAnimal();
    this.newAdoption.adoptionDate = formGroup.get('adoptAnimal').value.adoptionDate;
    this.newAdoption.adoptiveFamily = this.myAdoptiveFamily;

    // Modification de l'animal. isAdopted --> true
    this.myAnimal.adopted = true;

    //Si l'animal était en famille d'acceuil, on lui retire cet animal
    if (this.myAnimal.hostFamily) {
      this.myAnimal.hostFamily = null;
    }
    this.newAdoption.adoptedAnimal = this.myAnimal;
    this.save();
  }

  save() {
    this.adoptionService.createAdoption(this.newAdoption)
      .subscribe(data => console.log(data), error => console.log(error));

    this.animalService.updateAnimal(this.myAnimal)
      .subscribe(data => console.log(data), error => console.log(error));

    this.newAdoption = new AdoptAnimal();
  }

}
