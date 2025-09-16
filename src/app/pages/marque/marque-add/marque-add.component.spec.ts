import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueAddComponent } from './marque-add.component';

describe('MarqueAddComponent', () => {
  let component: MarqueAddComponent;
  let fixture: ComponentFixture<MarqueAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarqueAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarqueAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
