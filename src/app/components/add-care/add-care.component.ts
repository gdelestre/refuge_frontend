import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Animal } from 'src/app/classes/animal';
import { Veterinary } from 'src/app/classes/veterinary';
import { VeterinaryCare } from 'src/app/classes/veterinary-care';
import { AnimalService } from 'src/app/services/animal.service';
import { VeterinaryCareService } from 'src/app/services/veterinary-care.service';

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
  selector: 'app-add-care',
  templateUrl: './add-care.component.html',
  styleUrls: ['./add-care.component.css']
})
export class AddCareComponent implements OnInit {

  myAnimal: Animal  = new Animal();
  allVeterinaries: Veterinary[];
  myVeterinary: Veterinary;
  newVeterinaryCare: VeterinaryCare = new VeterinaryCare();
  careFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder, private route:ActivatedRoute, private router: Router,
    private animalService: AnimalService, private veterinaryService: VeterinaryCareService) { }

  ngOnInit(): void {
    this.getAnimal();
    this.getAllVeterinaries();

    this.careFormGroup = this.formBuilder.group({
      care: this.formBuilder.group({
        veterinaryId: ['', Validators.required],
        examen: ['', Validators.required],
        examenDate: ['', Validators.compose(
          [Validators.required, validDate ])],
        examenTime: ['', Validators.required]
      })
    });
  }

  getAnimal(){
    let idAnimal = this.getIdAnimal();
    this.animalService.getOneAnimal(idAnimal).subscribe(
      data => this.myAnimal = data
    );
  }

  private getIdAnimal() {
    return this.route.snapshot.paramMap.get("idAnimal");
  }

  private getIdVeterinary() {
    return this.careFormGroup.get('care').value.veterinaryId;
  }

  getAllVeterinaries(){
    this.veterinaryService.getAllVeterinaries().subscribe(
      data => this.allVeterinaries = data
    );
  }

  onSubmit(){
    this.saveVeterinaryCare();
    this.careFormGroup.reset();
    this.router.navigate(['/cares']);
  }

  saveVeterinaryCare() {
    this.newVeterinaryCare = new VeterinaryCare();
    this.newVeterinaryCare.examen = this.careFormGroup.get('care').value.examen;
    this.newVeterinaryCare.examenDate = this.careFormGroup.get('care').value.examenDate;
    this.newVeterinaryCare.examenTime = this.careFormGroup.get('care').value.examenTime;

    this.save();
  }

  save() {
    let idAnimal = this.getIdAnimal();
    let idVeterinary = this.getIdVeterinary();

    this.veterinaryService.createVeterinaryCare(idAnimal,idVeterinary,this.newVeterinaryCare)
      .subscribe(data => console.log(data), error => console.log(error));
    this.newVeterinaryCare = new VeterinaryCare();
  }
  
}
