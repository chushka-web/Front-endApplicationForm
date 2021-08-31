import { Injectable } from '@angular/core';
import {FormControl, ValidationErrors} from '@angular/forms';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailValidationService {

  existEmails: string[];

  constructor() {
    this.existEmails = ['test@test.test', 'example@example.com'];
  }

  public validateEmail(userEmail: string): Observable<ValidationErrors> {
    return new Observable<ValidationErrors>((observer) => {
      const email = this.existEmails.find((data) => data === userEmail);
      if (email) {
        observer.next({
          nameError: 'Такой емейл уже существует'
        });
        observer.complete();
      }
      observer.next(null);
      observer.complete();
    }).pipe(delay(2000));
  }

  asyncEmailValidator(control: FormControl): Observable<ValidationErrors> {
    return this.validateEmail(control.value);
  }

}
