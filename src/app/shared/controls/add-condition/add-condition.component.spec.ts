import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConditionComponent } from './add-condition.component';

describe('AddConditionComponent', () => {
  let component: AddConditionComponent;
  let fixture: ComponentFixture<AddConditionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddConditionComponent]
    });
    fixture = TestBed.createComponent(AddConditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
