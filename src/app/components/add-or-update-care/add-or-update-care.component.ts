import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Animal } from 'src/app/classes/animal';
import { Veterinary } from 'src/app/classes/veterinary';
import { VeterinaryCare } from 'src/app/classes/veterinary-care';
import { AnimalService } from 'src/app/services/animal.service';
import { VeterinaryCareService } from 'src/app/services/veterinary-care.service';
import { VeterinaryService } from 'src/app/services/veterinary.service';

export const validDate: ValidatorFn = (control) => {

  if (control && (control.dirty || control.touched)) {
    const now = formatDate(new Date(), 'yyyy-MM-dd', 'en_US');
    const pattern = new RegExp('^(?:19|20)[0-9]{2}[-\\/ ]?(0?[1-9]|1[0-2])[-/ ]?(0?[1-9]|[12][0-9]|3[01])$');

    let dateForm: string;

    if (pattern.test(control.value)) {
      dateForm = formatDate(control.value, 'yyyy-MM-dd', 'en_US');

      /* Is not valid. */
      if (now > dateForm) {
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
  selector: 'app-add-or-update-care',
  templateUrl: './add-or-update-care.component.html',
  styleUrls: ['./add-or-update-care.component.css']
})
export class AddOrUpdateCareComponent implements OnInit {
  myAnimal: Animal = new Animal();
  allVeterinaries: Veterinary[];
  myVeterinary: Veterinary;
  myCare: VeterinaryCare = new VeterinaryCare();

  careForForm: Observable<VeterinaryCare>;
  isFormForAdd: boolean = this.router.url.endsWith("/add");
  title: string = "Nouveau soin pour :"

  careFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private animalService: AnimalService, private veterinaryService: VeterinaryService,
    private careService: VeterinaryCareService) {
  }

  ngOnInit(): void {

    //Si le formulaire n'est pas pour ajouter un soin, il est pour modifier un soin :
    // --> faut charger le soin à modifier
    // --> faut charger le formulaire avec les données du soin à modifier
    if (!this.isFormForAdd) {
      this.getCare();
      this.updateFormWithCare();
      this.title = "Modification du soin pour : "
    }

    this.getAnimal();
    this.getAllVeterinaries();

    this.careFormGroup = this.formBuilder.group({
      veterinaryId: ['', Validators.required],
      examen: ['', Validators.required],
      examenDate: ['', Validators.compose(
        [Validators.required, validDate])],
      examenTime: ['', Validators.required]
    });
  }

  getAnimal() {
    let idAnimal = this.getIdAnimal();
    this.animalService.getOneAnimal(idAnimal).subscribe(
      data => this.myAnimal = data
    );
  }

  getCare() {
    let careId = this.getIdCare();
    this.careService.getVeterinaryCareById(careId)
      .subscribe(data => this.myCare = data);
  }

  updateFormWithCare() {
    let careId = this.getIdCare();
    this.careForForm = this.careService
      .getVeterinaryCareById(careId)
      .pipe(tap(care => this.careFormGroup.patchValue(care)));
  }

  //Récupère l'ID de l'animal via l'URL
  private getIdAnimal() {
    return this.route.snapshot.paramMap.get("idAnimal");
  }

  //Récupère l'ID du soin via l'URL
  private getIdCare() {
    return this.route.snapshot.paramMap.get("idCare");
  }

  //Récupère l'ID du vétérinaire via le formulaire
  private getIdVeterinary() {
    return this.careFormGroup.value["veterinaryId"];
  }

  getAllVeterinaries() {
    this.veterinaryService.getAllVeterinaries().subscribe(
      data => this.allVeterinaries = data
    );
  }

  onSubmit() {
    this.saveOrUpdateVeterinaryCare();
    this.careFormGroup.reset();
    this.router.navigate(['/cares']).then(() => {
      window.location.reload();
    });
  }

  saveOrUpdateVeterinaryCare() {
    let allCareFormProps: string[] = ["examen", "examenDate", "examenTime"];

    //Boucle sur les propriétés du formulaire
    for (let propForm of allCareFormProps) {
      //récupère une propriété du formulaire
      let newProperty = this.careFormGroup.value[propForm];
      //Si elle n'est pas nulle, elle a été modifiée, faut donc l'enregistrer.
      if (newProperty) {
        switch (propForm) {
          case "examen": {
            this.myCare.examen = newProperty;
            break;
          }
          case "examenDate": {
            this.myCare.examenDate = newProperty;
            break;
          }
          case "examenTime": {
            this.myCare.examenTime = newProperty;
            break;
          }
        }
      }
    }
    if (this.isFormForAdd) {
      this.save();
    } else {
      this.update();
    }
  }

  save() {
    let idAnimal = this.getIdAnimal();
    let idVeterinary = this.getIdVeterinary();

    this.careService.createVeterinaryCare(idAnimal, idVeterinary, this.myCare)
      .subscribe(data => console.log(data), error => console.log(error));
    this.myCare = new VeterinaryCare();
  }

  update() {
    let idAnimal = this.getIdAnimal();
    let idVeterinary;

    //Si un nouveau vétérinaire est coché
    if (this.careFormGroup.value["veterinaryId"]) {
      idVeterinary = this.getIdVeterinary();
    } else {
      idVeterinary = this.myCare.veterinary.id;
    }

    this.careService.updateVeterinaryCare(idAnimal, idVeterinary, this.myCare)
      .subscribe(data => console.log(data), error => console.log(error));
  }

}
