import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateCareComponent } from './add-or-update-care.component';

describe('AddOrUpdateCareComponent', () => {
  let component: AddOrUpdateCareComponent;
  let fixture: ComponentFixture<AddOrUpdateCareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateCareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateCareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
