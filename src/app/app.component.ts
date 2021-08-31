import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {FrontEndDeveloperModel, HobbyModel} from './front-end-developers';
import {EmailValidationService} from './email-validation.service';

interface Technologies {
  technology: string;
  version: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'front-end-application-form';

  jsTechnologies: Technologies[] = [
    {technology: 'angular', version: ['1.1.1', '1.2.1', '1.3.3']},
    {technology: 'react', version: ['2.1.2', '3.2.4', '4.3.1']},
    {technology: 'vue', version: ['3.3.1', '5.2.1', '5.1.3']}];

  selectedTechnology: string[];
  hobbies: HobbyModel[] = [];
  emailValidation = new EmailValidationService();

  frontEndFormGroup: FormGroup = new FormGroup({
    firstNameCtrl: new FormControl('', [Validators.required]),
    lastNameCtrl: new FormControl('', [Validators.required]),
    dateCtrl: new FormControl('', [Validators.required]),
    technologyCtrl: new FormControl('', [Validators.required]),
    technologyVersionCtrl: new FormControl('', [Validators.required]),
    emailCtrl: new FormControl('', [Validators.required, Validators.email],
      [this.emailValidation.asyncEmailValidator.bind(this)]),
    hobbiesCtrl: new FormControl('', [Validators.required]),
    hobbiesDurationCtrl: new FormControl('', [Validators.required])
  });

  constructor() {}

  hasError = (controlName: string, errorName: string) => {
    console.log(this.frontEndFormGroup.controls[controlName]);
    return this.frontEndFormGroup.controls[controlName].hasError(errorName);
  }

  removeHobby(i): void {
    this.hobbies.splice(i, 1);
  }

  addHobby(): void {
    this.hobbies.push({name: '', duration: 0});
  }

}
