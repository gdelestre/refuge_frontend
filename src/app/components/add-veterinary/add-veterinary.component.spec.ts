import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVeterinaryComponent } from './add-veterinary.component';

describe('AddVeterinaryComponent', () => {
  let component: AddVeterinaryComponent;
  let fixture: ComponentFixture<AddVeterinaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddVeterinaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVeterinaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
