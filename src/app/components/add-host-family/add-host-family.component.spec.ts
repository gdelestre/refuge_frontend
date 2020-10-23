import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHostFamilyComponent } from './add-host-family.component';

describe('AddHostFamilyComponent', () => {
  let component: AddHostFamilyComponent;
  let fixture: ComponentFixture<AddHostFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHostFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHostFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
