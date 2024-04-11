import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { debounceTime } from 'rxjs';
import { IDateRangePickerForm } from 'src/app/shared/command/date-range-picker-form.command';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker.component.html',
  styleUrls: ['./date-range-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DateRangePickerComponent,
      multi: true,
    },
  ],
})
export class DateRangePickerComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  @Input() title!: string;

  subs = new SubSink();
  form!: IDateRangePickerForm;
  onTouched = () => {};
  onChange = (val: string) => {};

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      start: this.fb.control<Date | null>(null),
      end: this.fb.control<Date | null>(null),
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

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
