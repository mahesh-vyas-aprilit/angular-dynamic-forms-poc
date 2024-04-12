import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppService } from 'src/app/shared/services/app.service';
import { FormFieldJSON } from 'src/app/shared/types/form-field';
import { SubSink } from 'subsink';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-conditions',
  templateUrl: './add-conditions.component.html',
  styleUrls: ['./add-conditions.component.scss'],
})
export class AddConditionsComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  formFields: FormFieldJSON[] = [];
  subsink = new SubSink();
  submitted = false;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.form = new FormGroup({});
    this.getDynamicFormFields();
  }

  getDynamicFormFields() {
    this.appService.getFormFields().subscribe((response: any) => {
      this.formFields = response.data;
    });
  }

  handleSubmit() {
    if (this.form.valid) {
      const { condition, result } = this.form.value;
      const updatedData = {
        id: uuidv4(),
        ...condition,
        ...result,
      };
      this.formFields.forEach((field) => {
        if (field.id === updatedData.if) {
          field.conditions.push(updatedData);
        }
      });
      this.subsink.sink = this.appService
        .putFormFields(this.formFields)
        .subscribe((response: any) => {
          console.log(response);
        });
      this.form.reset();
      this.form.markAsUntouched();
      this.form.markAsPristine();
    } else {
      console.log('form is not valid');
    }
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
