import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPermissionComponent } from './detail-permission.component';

describe('DetailPermissionComponent', () => {
  let component: DetailPermissionComponent;
  let fixture: ComponentFixture<DetailPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailPermissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
