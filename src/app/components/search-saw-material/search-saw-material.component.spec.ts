import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSawMaterialComponent } from './search-saw-material.component';

describe('SearchSawMaterialComponent', () => {
  let component: SearchSawMaterialComponent;
  let fixture: ComponentFixture<SearchSawMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSawMaterialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSawMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
