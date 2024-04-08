import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedMaterialModule } from './material/material.module';
import { MultiStepFormComponent } from './multi-step-form/multi-step-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatTitlePipe } from './pipes/format-title-pipe';
import { NgOtpInputModule } from 'ng-otp-input';

@NgModule({
  declarations: [AppComponent, MultiStepFormComponent, FormatTitlePipe],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    NgOtpInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
