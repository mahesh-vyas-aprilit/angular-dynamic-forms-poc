import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgOtpInputModule } from 'ng-otp-input';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { LeaveRequestComponent } from './shared/controls/leave-request/leave-request.component';
import { FileUploadComponent } from './shared/controls/file-upload/file-upload.component';
import { DateRangePickerComponent } from './shared/controls/date-range-picker/date-range-picker.component';
import { AddConditionsComponent } from './shared/components/add-conditions/add-conditions.component';
import { AddConditionComponent } from './shared/controls/add-condition/add-condition.component';
import { DoTaskComponent } from './shared/controls/do-task/do-task.component';
import { ConditionCardComponent } from './shared/controls/condition-card/condition-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LeaveRequestComponent,
    FileUploadComponent,
    DateRangePickerComponent,
    AddConditionsComponent,
    AddConditionComponent,
    DoTaskComponent,
    ConditionCardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatSelectModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    NgOtpInputModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
