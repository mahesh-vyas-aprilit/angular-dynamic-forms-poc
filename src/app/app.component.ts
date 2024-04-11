import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from './shared/services/app.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormField, FormFieldJSON } from './shared/types/form-field';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  formFields: FormFieldJSON[] = [];
  dynamicForm = this.fb.group({});
  subs = new SubSink();

  constructor(private appService: AppService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getDynamicFormFields();
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  getDynamicFormFields() {
    this.appService.getFormFields().subscribe((response: FormField) => {
      this.formFields = response.data;
      this.setDynamicForm(response.data);
    });
  }

  setDynamicForm(controls: FormFieldJSON[]) {
    for (const control of controls) {
      const validators = [];
      if (control.validators?.required) {
        validators.push(Validators.required);
      }
      this.dynamicForm.addControl(
        control.name,
        this.fb.control(control.value, validators)
      );
    }
  }

  saveForm() {
    console.log(this.dynamicForm.value);
  }

  trackByFn(index: number, form: { value: string; label: string }) {
    return form.value;
  }
}
