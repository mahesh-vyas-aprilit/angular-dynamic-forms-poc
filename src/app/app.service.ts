import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormField } from './types/form-field';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  getFormFields(): Observable<FormField> {
    return this.http.get<FormField>('assets/formFields.json');
  }
}
