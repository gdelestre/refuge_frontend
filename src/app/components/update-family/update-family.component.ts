import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AdoptiveFamily } from 'src/app/classes/adoptive-family';
import { HostFamily } from 'src/app/classes/host-family';
import { Person } from 'src/app/classes/person';
import { Veterinary } from 'src/app/classes/veterinary';
import { AdoptiveFamilyService } from 'src/app/services/adoptive-family.service';
import { HostFamilyService } from 'src/app/services/host-family.service';
import { VeterinaryService } from 'src/app/services/veterinary.service';

@Component({
  selector: 'app-update-family',
  templateUrl: './update-family.component.html',
  styleUrls: ['./update-family.component.css']
})
export class UpdateFamilyComponent implements OnInit {

  myHostFamily: HostFamily = new HostFamily();
  myAdoptiveFamily: AdoptiveFamily = new AdoptiveFamily();
  myVeterinary: Veterinary = new Veterinary();

  updatedFamily: Observable<Person>;

  familyFormGroup: FormGroup;
  isHost: boolean = this.router.url.startsWith("/hosts");
  isAdoptive: boolean = this.router.url.startsWith("/adoptives");
  isVeterinary: boolean = this.router.url.startsWith("/veterinaries");

  constructor(private formBuilder: FormBuilder, private hostFamilyService: HostFamilyService,
    private adoptiveFamilyService: AdoptiveFamilyService, private veterinaryService: VeterinaryService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getPerson();
    this.familyFormGroup = this.formBuilder.group({
      firstName: ['',],
      lastName: ['',],
      zipCode: ['',],
      city: ['',],
      streetName: ['',],
      streetNumber: ['',],
      phoneNumber: ['',]
    });
  }

  getPerson() {
    if (this.isHost) {
      let id = this.route.snapshot.paramMap.get("idHost");
      this.hostFamilyService.getFamilyById(id)
        .subscribe(data => this.myHostFamily = data);

      this.updatedFamily = this.hostFamilyService.getFamilyById(id)
        .pipe(tap(family => this.familyFormGroup.patchValue(family)));
    }

    if (this.isAdoptive) {
      let id = this.route.snapshot.paramMap.get("idAdoptive");
      this.adoptiveFamilyService.getOneAdoptiveFamily(id)
        .subscribe(data => this.myAdoptiveFamily = data);

      this.updatedFamily = this.adoptiveFamilyService.getOneAdoptiveFamily(id)
        .pipe(tap(family => this.familyFormGroup.patchValue(family)));
    }
    if (this.isVeterinary) {
      let id = this.route.snapshot.paramMap.get("idVeterinary");
      this.veterinaryService.getOneVeterinary(id)
        .subscribe(data => this.myVeterinary = data);

      this.updatedFamily = this.veterinaryService.getOneVeterinary(id)
        .pipe(tap(family => this.familyFormGroup.patchValue(family)));
    }
  }

  onSubmit() {
    if (this.isHost) {
      this.updateFamily(this.myHostFamily);
    }
    if (this.isAdoptive) {
      this.updateFamily(this.myAdoptiveFamily);
    }
    if (this.isVeterinary) {
      this.updateFamily(this.myVeterinary);
    }
    this.router.navigate(['/animals']);
  }

  updateFamily(family: Person) {
    let allFamilyFormProps: string[] = ["firstName", "lastName", "zipCode", "city", "streetName", "streetNumber", "phoneNumber"];

    //Boucle sur les propriétés du formulaire
    for (let propForm of allFamilyFormProps) {
      //récupère une propriété du formulaire
      let newProperty = this.familyFormGroup.value[propForm];
      //Si elle n'est pas nulle, elle a été modifiée, faut donc l'enregistrer.
      if (newProperty) {

        switch (propForm) {
          case "firstName": {
            family.firstName = newProperty;
            break;
          }
          case "lastName": {
            family.lastName = newProperty;
            break;
          }
          case "zipCode": {
            family.zipCode = newProperty;
            break;
          }
          case "city": {
            family.city = newProperty;
            break;
          }
          case "streetName": {
            family.streetName = newProperty;
            break;
          }
          case "streetNumber": {
            family.streetNumber = newProperty;
            break;
          }
          case "phoneNumber": {
            family.phoneNumber = newProperty;
            break;
          }
        }
      }
    }
    this.update();
  }

  update() {

    if (this.isHost) {
      this.hostFamilyService.updateHostFamily(this.myHostFamily)
        .subscribe(data => console.log(data), error => console.log(error));
    }
    if (this.isAdoptive) {
      this.adoptiveFamilyService.updateAdoptiveFamily(this.myAdoptiveFamily)
        .subscribe(data => console.log(data), error => console.log(error));
    }
    if (this.isVeterinary) {
      this.veterinaryService.updateVeterinary(this.myVeterinary)
        .subscribe(data => console.log(data), error => console.log(error));
    }
  }

}
