import { FormControl, FormGroup } from '@angular/forms';

export interface IDoTaskForm
  extends FormGroup<{
    do: FormControl<string | null>;
    field: FormControl<string | null>;
  }> {}
export interface IDoTaskFormCommand {
  do: string | null;
  field: string | null;
}
export class DoTaskFormCommand {
  static fromForm(form: IDoTaskForm): IDoTaskFormCommand {
    const command: IDoTaskFormCommand = {
      do: form.value.do!,
      field: form.value.field!,
    };
    return command;
  }
  constructor() {}
}
