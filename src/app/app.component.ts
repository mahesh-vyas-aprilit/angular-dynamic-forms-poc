import { Component, OnInit } from '@angular/core';
import { STEP_ITEMS } from './constants/multi-step-form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  formData: any;
  formContent: any;
  activeStepIndex!: number;

  ngOnInit(): void {
    this.formContent = STEP_ITEMS;
  }
  onFormSubmit(formData: any): void {
    this.formData = formData;
    console.log('data => ', this.formData);
  }
}
