import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSawMaterialComponent } from './add-saw-material.component';

describe('AddSawMaterialComponent', () => {
  let component: AddSawMaterialComponent;
  let fixture: ComponentFixture<AddSawMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSawMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSawMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
