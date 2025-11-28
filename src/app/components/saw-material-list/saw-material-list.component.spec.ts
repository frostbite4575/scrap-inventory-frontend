import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SawMaterialListComponent } from './saw-material-list.component';

describe('SawMaterialListComponent', () => {
  let component: SawMaterialListComponent;
  let fixture: ComponentFixture<SawMaterialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SawMaterialListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SawMaterialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
