import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationReaffecterComponent } from './affectation-reaffecter.component';

describe('AffectationReaffecterComponent', () => {
  let component: AffectationReaffecterComponent;
  let fixture: ComponentFixture<AffectationReaffecterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffectationReaffecterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectationReaffecterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
