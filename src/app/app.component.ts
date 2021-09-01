import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FrontEndDeveloperModel, HobbyModel } from './shared/models/front-end-developers';
import { EmailValidationService } from './shared/services/email-validation.service';
import { AuthService } from './shared/services/auth.service';
import {DatePipe} from '@angular/common';

export interface Technologies {
  technology: string;
  version: string[];
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'front-end-application-form';

  frontEndFormGroup: FormGroup;

  jsTechnologies: Technologies[] = [
    {technology: 'angular', version: ['1.1.1', '1.2.1', '1.3.3']},
    {technology: 'react', version: ['2.1.2', '3.2.4', '4.3.1']},
    {technology: 'vue', version: ['3.3.1', '5.2.1', '5.1.3']}];

  selectedTechnology: string[];
  hobbies: HobbyModel[] = [];
  name: string;
  duration: number;

  constructor(private auth: AuthService,
              private emailValidation: EmailValidationService,
              private datepipe: DatePipe) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm = () => {
    this.frontEndFormGroup = new FormGroup({
      firstNameCtrl: new FormControl('', [Validators.required]),
      lastNameCtrl: new FormControl('', [Validators.required]),
      dateCtrl: new FormControl('', [Validators.required]),
      technologyCtrl: new FormControl('', [Validators.required]),
      technologyVersionCtrl: new FormControl('', [Validators.required]),
      emailCtrl: new FormControl('', [Validators.required, Validators.email],
        [this.emailValidation.validateEmail()]),
      hobbiesCtrl: new FormControl('', [Validators.required]),
      hobbiesDurationCtrl: new FormControl('', [Validators.required])
    });
  }

  sendFrontEndDataProcess(formGroupValue): void {
    if (this.frontEndFormGroup.valid) {
      this.auth.sendFrontEndData(this.executeFrontEndForm(formGroupValue))/*.subscribe(() => {})*/;
    }
  }

  executeFrontEndForm(formGroupValue): FrontEndDeveloperModel {
    return {
      firstName: formGroupValue.firstNameCtrl,
      lastName: formGroupValue.lastNameCtrl,
      dateOfBirth: this.datepipe.transform(formGroupValue.dateCtrl, 'dd/mm/yyyy'),
      framework: this.jsTechnologies.find(data => data.version === formGroupValue.technologyCtrl).technology,
      frameworkVersion: formGroupValue.technologyVersionCtrl,
      email: formGroupValue.emailCtrl,
      hobby: this.hobbies
    };
  }

  removeHobby(i): void {
    this.hobbies.splice(i, 1);
  }

  addHobby(): void {
    this.hobbies.push(new HobbyModel(this.name, this.duration));
  }

}
