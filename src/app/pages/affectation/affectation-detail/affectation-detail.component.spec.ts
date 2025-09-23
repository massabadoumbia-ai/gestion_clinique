import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffectationDetailComponent } from './affectation-detail.component';

describe('AffectationDetailComponent', () => {
  let component: AffectationDetailComponent;
  let fixture: ComponentFixture<AffectationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffectationDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffectationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
