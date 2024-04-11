import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormBuilder,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  Validator,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs';
import { SubSink } from 'subsink';
import { ILeaveRequestForm } from '../../command/leave-request-form.command';
import { IDateRangePickerFormCommand } from '../../command/date-range-picker-form.command';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: LeaveRequestComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: LeaveRequestComponent,
    },
  ],
})
export class LeaveRequestComponent
  implements ControlValueAccessor, Validator, OnInit, OnDestroy
{
  @Input() title!: string;
  @Input() required!: boolean;

  subs = new SubSink();
  form!: ILeaveRequestForm;
  onTouched = () => {};
  onChange = (val: string) => {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      numberOfLeaves: this.fb.control<number | null>(
        null,
        this.required ? [Validators.required] : []
      ),
      date: this.fb.control<Date | null>(null),
      range: this.fb.control<IDateRangePickerFormCommand | null>(null),
      file: this.fb.control<File | null>(null),
    });
  }

  registerOnChange(onChange: any) {
    this.onChange = onChange;
    const sub = this.form.valueChanges
      .pipe(debounceTime(300))
      .subscribe(onChange);

    this.form.updateValueAndValidity();
    this.subs.add(sub);
  }

  registerOnTouched(onTouched: any) {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean) {
    if (disabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  writeValue(value: any) {
    if (value) {
      this.form.setValue(value, { emitEvent: true });
    }
  }

  validate(control: AbstractControl) {
    if (this.form.valid) {
      return null;
    }

    // let errors: any = {};

    // errors = this.addControlErrors(errors, 'numberOfLeaves');
    // // errors = this.addControlErrors(errors, 'startDate');
    // // errors = this.addControlErrors(errors, 'endDate');
    // // errors = this.addControlErrors(errors, 'file');

    // return errors;
    return null;
  }

  // addControlErrors(allErrors: any, controlName: string) {
  //   const errors = { ...allErrors };

  //   const controlErrors = this.form.controls[controlName].errors;

  //   if (controlErrors) {
  //     errors[controlName] = controlErrors;
  //   }

  //   return errors;
  // }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  get numberOfLeaves() {
    return this.form.get('numberOfLeaves');
  }

  get date() {
    return this.form.get('date');
  }

  get range() {
    return this.form.get('range');
  }

  get file() {
    return this.form.get('file');
  }
}
