import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdoptiveFamilyComponent } from './add-adoptive-family.component';

describe('AddAdoptiveFamilyComponent', () => {
  let component: AddAdoptiveFamilyComponent;
  let fixture: ComponentFixture<AddAdoptiveFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAdoptiveFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdoptiveFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
