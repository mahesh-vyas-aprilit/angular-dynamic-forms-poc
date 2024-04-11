import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConditionsComponent } from './add-conditions.component';

describe('AddConditionsComponent', () => {
  let component: AddConditionsComponent;
  let fixture: ComponentFixture<AddConditionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddConditionsComponent]
    });
    fixture = TestBed.createComponent(AddConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
