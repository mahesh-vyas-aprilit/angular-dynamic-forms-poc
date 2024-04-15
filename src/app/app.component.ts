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
  formValue: any = {};
  hiddenFields: any = {};
  fieldConditionsMap: any = {};
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
    this.formFields.forEach((it) => {
      this.fieldConditionsMap[it.id] = [];
      this.hiddenFields[it.id] = false;
    });

    // pushing the related conditions from the formFields to the fieldConditionsMap
    for (let it of this.formFields) {
      this.fieldConditionsMap[it.id].push(...it.conditions);

      for (let _ of it.conditions) {
        if (_.targetField) {
          this.fieldConditionsMap[_.targetField] = [_];
        }
      }
    }

    for (const control of controls) {
      const validators = [];

      this.handleHiddenField(control);
      if (control.validators?.required) {
        validators.push(Validators.required);
      }

      const formControl = this.fb.control(control.value, validators);
      this.dynamicForm.addControl(control.name, formControl);
    }
  }

  handleHiddenField(field: FormFieldJSON) {
    const { id: fieldId } = field;
    this.formValue[fieldId] = this.dynamicForm.get(field.name)?.value;

    if (this.fieldConditionsMap[fieldId]) {
      for (const condition of this.fieldConditionsMap[fieldId]) {
        const {
          target,
          targetValue,
          targetField: targetFieldId,
          state,
          if: currFieldId,
          do: action,
          field: fieldToAffectId,
        } = condition;
        let targetFieldValue: any;
        const fieldValue = this.formValue[currFieldId];
        let conditionMet = false;

        // Get the value of the target field
        if (target === 'value') {
          targetFieldValue = targetValue;
        } else if (target === 'anotherField') {
          targetFieldValue = this.formValue[targetFieldId];
        }

        console.log(
          `fieldValue ${Number(fieldValue)} targetVal ${targetFieldValue}`
        );

        switch (field.type) {
          case 'number':
            conditionMet = applyNumberConditions(
              state,
              Number(fieldValue),
              Number(targetFieldValue)
            );
            break;
          case 'text':
          case 'textArea':
            conditionMet = applyStringConditions(
              state,
              String(fieldValue),
              String(targetFieldValue)
            );
            break;
          case 'date':
            conditionMet = applyDateConditions(
              state,
              new Date(fieldValue),
              new Date(targetFieldValue)
            );
            break;
          default:
            conditionMet = applyCommonConditions(
              state,
              String(fieldValue),
              String(targetFieldValue)
            );
        }

        // Apply the action based on the condition
        if (conditionMet) {
          if (action === 'hide') {
            this.hiddenFields[fieldToAffectId] = true;
            console.log('hide');
          } else if (action === 'show') {
            this.hiddenFields[fieldToAffectId] = false;
            console.log('show');
          }
        } else {
          this.hiddenFields[fieldToAffectId] = false;
          console.log('condition did not met!');
        }
      }
    }
  }

  handleFormSubmit() {
    console.log(this.dynamicForm.value);
  }

  trackByFn(index: number, form: { value: string; label: string }) {
    return form.value;
  }
}
