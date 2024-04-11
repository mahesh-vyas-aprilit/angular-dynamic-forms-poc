import { Component, Input, inject } from '@angular/core';
import {
  ControlContainer,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { FormFieldJSON, OptionJSON } from 'src/app/shared/types/form-field';
import { doConditions } from '../../helpers/conditions';

@Component({
  selector: 'app-do-task',
  templateUrl: './do-task.component.html',
  styleUrls: ['./do-task.component.scss'],
  // magic
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: () => inject(ControlContainer, { skipSelf: true }), //using skip self to prevent circular dependecy issue.
    },
  ],
})
export class DoTaskComponent {
  @Input({ required: true }) controlKey = '';
  @Input() label = '';
  @Input() formFields!: FormFieldJSON[];
  parentContainer = inject(ControlContainer);

  get parentFormGroup() {
    return this.parentContainer?.control as FormGroup;
  }

  doConditions: OptionJSON[];

  constructor() {
    this.doConditions = doConditions;
  }

  ngOnInit(): void {
    this.parentFormGroup.addControl(
      this.controlKey,
      new FormGroup({
        do: new FormControl<string | null>(null, Validators.required),
        field: new FormControl<string | null>(null),
      })
    );
  }

  handleDoFieldChange() {
    this.parentFormGroup.get(this.controlKey + '.field')?.reset();
    // this.parentFormGroup.get(this.controlKey + '.field')?.markAsUntouched();
    // this.parentFormGroup.get(this.controlKey + '.field')?.markAsPristine();
    // this.parentFormGroup
    //   .get(this.controlKey + '.field')
    //   ?.updateValueAndValidity();
  }

  get doValue() {
    return this.parentFormGroup.get(this.controlKey + '.do')?.value;
  }

  trackByFn(index: number, form: FormFieldJSON) {
    return form.id;
  }
}
