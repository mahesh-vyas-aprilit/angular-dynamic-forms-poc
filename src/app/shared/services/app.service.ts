import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormField, FormFieldJSON } from '../types/form-field';
import { Observable, map } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient, private api: ApiService) {}
  root = 'formFields';

  getFormFields(): Observable<FormField> {
    try {
      return this.api.httpGet(this.root).pipe(
        map((results: any) => {
          return results;
        })
      );
    } catch (error) {
      throw error;
    }
  }

  putFormFields(formFields: FormFieldJSON[]): Observable<FormFieldJSON[]> {
    try {
      return this.api.httpPut(this.root, formFields).pipe(
        map((results: any) => {
          return results;
        })
      );
    } catch (error) {
      throw error;
    }
  }

  deleteFormFields(fieldId: string, conditionId: string): Observable<any> {
    return this.api.httpDelete(this.root, {
      fieldId,
      conditionId,
    });
  }
}
