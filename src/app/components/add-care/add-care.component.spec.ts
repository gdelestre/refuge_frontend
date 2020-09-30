import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCareComponent } from './add-care.component';

describe('AddCareComponent', () => {
  let component: AddCareComponent;
  let fixture: ComponentFixture<AddCareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
