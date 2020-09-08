import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinaryComponent } from './veterinary.component';

describe('VeterinaryComponent', () => {
  let component: VeterinaryComponent;
  let fixture: ComponentFixture<VeterinaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VeterinaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VeterinaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
