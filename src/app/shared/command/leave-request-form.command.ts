import { FormControl, FormGroup } from '@angular/forms';
import { IDateRangePickerFormCommand } from './date-range-picker-form.command';

export interface ILeaveRequestForm
  extends FormGroup<{
    numberOfLeaves: FormControl<number | null>;
    date: FormControl<Date | null>;
    range: FormControl<IDateRangePickerFormCommand | null>;
    file: FormControl<File | null>;
  }> {}
export interface ILeaveRequestFormCommand {
  numberOfLeaves: number | null;
  date: Date | null;
  range: IDateRangePickerFormCommand | null;
  file: File | null;
}
export class ParentCommand {
  static fromForm(form: ILeaveRequestForm): ILeaveRequestFormCommand {
    const command: ILeaveRequestFormCommand = {
      date: form.value.date!,
      file: form.value.file!,
      numberOfLeaves: form.value.numberOfLeaves!,
      range: form.value.range!,
    };
    return command;
  }
  constructor() {}
}
