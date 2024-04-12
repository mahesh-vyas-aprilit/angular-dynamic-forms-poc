import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from './shared/services/app.service';
import { FormBuilder, Validators } from '@angular/forms';
import { FormField, FormFieldJSON } from './shared/types/form-field';
import { SubSink } from 'subsink';
import {
  applyCommonConditions,
  applyDateConditions,
  applyNumberConditions,
  applyStringConditions,
} from './shared/helpers/conditions';

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
    this.subs.unsubscribe();
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

      const formControl = this.fb.control(control.value, validators);
      this.dynamicForm.addControl(control.name, formControl);

      this.applyConditionalLogic(control, formControl);

      this.subs.sink = formControl.valueChanges.subscribe(() => {
        this.applyConditionalLogic(control, formControl);
      });
    }
  }

  applyConditionalLogic(field: FormFieldJSON, formControl: any) {
    for (const condition of field.conditions || []) {
      const {
        if: fieldId,
        state,
        target,
        targetValue,
        targetField: targetFieldId,
        do: action,
        field: fieldToAffectId,
      } = condition;

      const targetFieldControl = this.formFields.find(
        (field) => field.id === targetFieldId
      );
      const targetField = this.dynamicForm.get(
        String(targetFieldControl?.name)
      );

      const fieldToAffectControl = this.formFields.find(
        (field) => field.id === fieldToAffectId
      );

      const fieldToAffect = this.dynamicForm.get(
        String(fieldToAffectControl?.name)
      );

      // Get the value of the target field
      let targetFieldValue: any;
      if (target === 'value') {
        targetFieldValue = targetValue;
      } else if (target === 'anotherField') {
        targetFieldValue = targetField?.value;
      }
      console.log(
        'formControl value => ',
        formControl.value,
        ' targetFieldValue => ',
        targetFieldValue
      );
      // Evaluate the condition
      let conditionMet = false;
      switch (field.type) {
        case 'number':
          conditionMet = applyNumberConditions(
            state,
            Number(formControl.value),
            Number(targetFieldValue)
          );
          break;
        case 'text':
        case 'textArea':
          conditionMet = applyStringConditions(
            state,
            formControl.value,
            targetFieldValue
          );
          break;
        case 'date':
          conditionMet = applyDateConditions(
            state,
            new Date(formControl.value),
            new Date(targetFieldValue)
          );
          break;
        default:
          conditionMet = applyCommonConditions(
            state,
            formControl.value,
            targetFieldValue
          );
      }

      // Apply the action based on the condition
      if (conditionMet) {
        if (action === 'hide') {
          console.log('hide');
          fieldToAffect?.disable();
        } else if (action === 'show') {
          console.log('show');
          fieldToAffect?.enable();
        }
      } else {
        fieldToAffect?.enable();
        console.log('condition did not met!');
      }
    }
  }

  saveForm() {
    console.log(this.dynamicForm.value);
  }

  trackByFn(index: number, form: { value: string; label: string }) {
    return form.value;
  }
}
