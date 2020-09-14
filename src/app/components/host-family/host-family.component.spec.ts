import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HostFamilyComponent } from './host-family.component';

describe('HostFamilyComponent', () => {
  let component: HostFamilyComponent;
  let fixture: ComponentFixture<HostFamilyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HostFamilyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostFamilyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
