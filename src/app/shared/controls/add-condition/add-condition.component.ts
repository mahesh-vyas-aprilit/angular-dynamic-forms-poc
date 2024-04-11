import { Component, Input, OnInit, inject } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormFieldJSON, OptionJSON } from 'src/app/shared/types/form-field';
import {
  commonConditions,
  dateConditions,
  numberConditions,
  stringConditions,
  targetValues,
} from '../../helpers/conditions';

@Component({
  selector: 'app-add-condition',
  templateUrl: './add-condition.component.html',
  styleUrls: ['./add-condition.component.scss'],
  // magic
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }), //using skip self to prevent circular dependecy issue.
    },
  ],
})
export class AddConditionComponent implements OnInit {
  @Input({ required: true }) controlKey = '';
  @Input() label = '';
  @Input() formFields!: FormFieldJSON[];
  parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer?.control as FormGroup;
  }

  stateArray!: OptionJSON[];

  numberConditions: any[];
  stringConditions: any[];
  dateConditions: any[];
  commonConditions: any[];
  targetValues: OptionJSON[];

  constructor() {
    this.numberConditions = numberConditions;
    this.stringConditions = stringConditions;
    this.dateConditions = dateConditions;
    this.commonConditions = commonConditions;
    this.targetValues = targetValues;
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(
      this.controlKey,
      new FormGroup({
        if: new FormControl<string | null>(null, Validators.required),
        state: new FormControl<string | null>(null),
        target: new FormControl<string | null>(null),
        targetValue: new FormControl<string | null>(null),
        targetField: new FormControl<string | null>(null),
      })
    );
  }

  get ifInvalid() {
    const ifControl = this.parentFormGroup.get(this.controlKey + '.if');
    return ifControl?.invalid && (ifControl.dirty || ifControl.touched);
  }

  get ifValue() {
    return this.parentFormGroup.get(this.controlKey + '.if')?.value;
  }

  get stateValue() {
    return this.parentFormGroup.get(this.controlKey + '.state')?.value;
  }

  get targetValue() {
    return this.parentFormGroup.get(this.controlKey + '.target')?.value;
  }

  trackByFn(index: number, form: FormFieldJSON) {
    return form.id;
  }

  getStateValue(value: string, optionType: string) {
    const option = this.formFields.find((f) => f.id === value);
    if (option) {
      if (option?.type === 'number' && optionType === 'number') {
        return true;
      } else if (
        (option?.type === 'text' && optionType === 'string') ||
        (option?.type === 'email' && optionType === 'string') ||
        (option?.type === 'textArea' && optionType === 'string')
      ) {
        return true;
      } else if (
        (option?.type === 'date' && optionType === 'date') ||
        (option?.type === 'daterange' && optionType === 'daterange')
      ) {
        return true;
      } else if (option?.type === 'dropdown' && optionType === 'common') {
        return true;
      } else {
        return false;
      }
    }
    return false;
  }

  handleIfFieldChange() {
    this.parentFormGroup.get(this.controlKey + '.state')?.reset();
    this.parentFormGroup.get(this.controlKey + '.target')?.reset();
    this.parentFormGroup.get(this.controlKey + '.targetValue')?.reset();
    this.parentFormGroup.get(this.controlKey + '.targetField')?.reset();
  }

  handleStateFieldChange() {
    this.parentFormGroup.get(this.controlKey + '.target')?.reset();
    this.parentFormGroup.get(this.controlKey + '.targetValue')?.reset();
    this.parentFormGroup.get(this.controlKey + '.targetField')?.reset();
  }

  handleTargetFieldChange() {
    this.parentFormGroup.get(this.controlKey + '.targetValue')?.reset();
    this.parentFormGroup.get(this.controlKey + '.targetField')?.reset();
  }
}
