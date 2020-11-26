import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, SignUpData } from 'src/app/services/auth.service';

export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userFormGroup: FormGroup;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.userFormGroup = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]],
      confirm_pass: ['', [Validators.required]],
      role: ['', Validators.required]
    },
      {
        validator: ConfirmedValidator('password', 'confirm_pass')
      });
  }

  // Récupère tous les champs pour vérification côté html
  get f(){
    return this.userFormGroup.controls;
  }

  onSubmit() {
    let userData: SignUpData = new SignUpData();
    if (this.userFormGroup.value["role"] == "admin") {
      userData.role = ["admin", "user"];
    } else if (this.userFormGroup.value["role"] == "mod") {
      userData.role = ["mod", "user"];
    } else {
      userData.role = ["user"];
    }

    userData.username = this.userFormGroup.value["username"];
    userData.password = this.userFormGroup.value["password"];

    this.authService.register(userData).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.userFormGroup.reset();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }


}
