import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchScrapComponent } from './search-scrap.component';

describe('SearchScrapComponent', () => {
  let component: SearchScrapComponent;
  let fixture: ComponentFixture<SearchScrapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchScrapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchScrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
