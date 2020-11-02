import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrUpdateAnimalComponent } from './add-or-update-animal.component';

describe('AddOrUpdateAnimalComponent', () => {
  let component: AddOrUpdateAnimalComponent;
  let fixture: ComponentFixture<AddOrUpdateAnimalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrUpdateAnimalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrUpdateAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
