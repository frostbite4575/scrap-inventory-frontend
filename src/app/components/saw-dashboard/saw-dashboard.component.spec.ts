import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SawDashboardComponent } from './saw-dashboard.component';

describe('SawDashboardComponent', () => {
  let component: SawDashboardComponent;
  let fixture: ComponentFixture<SawDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SawDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SawDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
