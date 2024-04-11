import { FormControl, FormGroup } from '@angular/forms';

export interface IDateRangePickerForm
  extends FormGroup<{
    start: FormControl<Date | null>;
    end: FormControl<Date | null>;
  }> {}
export interface IDateRangePickerFormCommand {
  start: Date | null;
  end: Date | null;
}
export class ParentCommand {
  static fromForm(form: IDateRangePickerForm): IDateRangePickerFormCommand {
    const command: IDateRangePickerFormCommand = {
      start: form.value.start!,
      end: form.value.end!,
    };
    return command;
  }
  constructor() {}
}
