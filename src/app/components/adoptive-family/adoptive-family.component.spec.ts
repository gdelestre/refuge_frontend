import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptiveFamilyComponent } from './adoptive-family.component';

describe('AdoptiveFamilyComponent', () => {
  let component: AdoptiveFamilyComponent;
  let fixture: ComponentFixture<AdoptiveFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoptiveFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoptiveFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
