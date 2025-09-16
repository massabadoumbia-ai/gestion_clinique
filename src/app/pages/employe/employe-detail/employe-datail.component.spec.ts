import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeDatailComponent } from './employe-datail.component';

describe('EmployeDatailComponent', () => {
  let component: EmployeDatailComponent;
  let fixture: ComponentFixture<EmployeDatailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeDatailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployeDatailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
