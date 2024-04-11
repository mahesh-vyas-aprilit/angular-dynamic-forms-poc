import { FormControl, FormGroup } from '@angular/forms';

export interface IAddConditionForm
  extends FormGroup<{
    if: FormControl<string | null>;
    state: FormControl<string | null>;
    target: FormControl<string | null>;
    targetValue: FormControl<string | null>;
    targetField: FormControl<string | null>;
  }> {}
export interface IAddConditionFormCommand {
  if: string | null;
  state: string | null;
  target: string | null;
  targetValue: string | null;
  targetField: string | null;
}
export class AddConditionFormCommand {
  static fromForm(form: IAddConditionForm): IAddConditionFormCommand {
    const command: IAddConditionFormCommand = {
      if: form.value.if!,
      state: form.value.state!,
      target: form.value.target!,
      targetValue: form.value.targetValue!,
      targetField: form.value.targetField!,
    };
    return command;
  }
  constructor() {}
}
