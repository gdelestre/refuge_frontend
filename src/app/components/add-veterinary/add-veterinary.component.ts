import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Veterinary } from 'src/app/classes/veterinary';
import { VeterinaryCareService } from 'src/app/services/veterinary-care.service';

@Component({
  selector: 'app-add-veterinary',
  templateUrl: './add-veterinary.component.html',
  styleUrls: ['./add-veterinary.component.css']
})
export class AddVeterinaryComponent implements OnInit {

  veterinaryFormGroup: FormGroup;
  newVet: Veterinary = new Veterinary();

  constructor(private formBuilder: FormBuilder, private veterinaryService: VeterinaryCareService) { }

  ngOnInit(): void {
    this.veterinaryFormGroup = this.formBuilder.group({
      veterinary: this.formBuilder.group({
        firstName: ['', Validators.compose(
          [Validators.required, Validators.pattern('^[A-Z][a-z]{1,}$')]
        )],
        lastName: ['', Validators.required],
        zipCode: ['',Validators.compose(
          [Validators.required, Validators.pattern('^[0-9]{5}$')]
        )],
        city: ['', Validators.required],
        streetName: ['', Validators.compose(
          [Validators.required, Validators.minLength(5)]
        )],
        streetNumber: ['', Validators.compose(
          [Validators.required, Validators.pattern('^[0-9]{1,3}$')]
        )],
        phoneNumber: ['',Validators.compose(
          [Validators.required, Validators.pattern('^[0-9]{10}$')]
        )],
      })
    });
  }

  onSubmit() {
    this.saveVeterinary();
    this.veterinaryFormGroup.reset();
  }

  saveVeterinary() {
    this.newVet = new Veterinary();
    this.newVet.firstName = this.veterinaryFormGroup.get('veterinary').value.firstName;
    this.newVet.lastName = this.veterinaryFormGroup.get('veterinary').value.lastName;
    this.newVet.zipCode = this.veterinaryFormGroup.get('veterinary').value.zipCode;
    this.newVet.city = this.veterinaryFormGroup.get('veterinary').value.city;
    this.newVet.streetName = this.veterinaryFormGroup.get('veterinary').value.streetName;
    this.newVet.streetNumber = this.veterinaryFormGroup.get('veterinary').value.streetNumber;
    this.newVet.phoneNumber = this.veterinaryFormGroup.get('veterinary').value.phoneNumber;
    this.newVet.veterinaryCares = null;
    this.save();
  }

  save() {
    this.veterinaryService.createVeterinary(this.newVet)
      .subscribe(data => console.log(data), error => console.log(error));
    this.newVet = new Veterinary();
  }

}
