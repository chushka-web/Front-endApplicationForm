import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailValidationService {

  existEmails: string[] = ['test@test.test', 'example@example.com'];

  constructor() {
  }

  checkIfEmailExists(email: string): Observable<boolean> {
    return of(this.existEmails.includes(email)).pipe(delay(2000));
  }

  validateEmail(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.checkIfEmailExists(control.value).pipe(
        map(res => {
          return res ? {emailExists: true} : null;
        })
      );
    };
  }

}
