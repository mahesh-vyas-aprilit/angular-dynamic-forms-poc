import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppService } from 'src/app/shared/services/app.service';
import { FormFieldJSON } from 'src/app/shared/types/form-field';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-condition-card',
  templateUrl: './condition-card.component.html',
  styleUrls: ['./condition-card.component.scss'],
})
export class ConditionCardComponent implements OnInit, OnDestroy {
  formFields: FormFieldJSON[] = [];

  subsink = new SubSink();

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.getDynamicFormFields();
  }

  getLabelById(id: string | null, arr: any[]) {
    if (id) {
      return arr.find((item) => item.id === id)?.label;
    } else {
      return;
    }
  }

  getDynamicFormFields() {
    this.subsink.sink = this.appService
      .getFormFields()
      .subscribe((response: any) => {
        this.formFields = response.data;
      });
  }

  handleDeleteCondition(conditionId: string, fieldId: string) {
    this.appService
      .deleteFormFields(fieldId, conditionId)
      .subscribe((response: any) => {
        console.log(response);

        this.getDynamicFormFields();
      });
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }
}
