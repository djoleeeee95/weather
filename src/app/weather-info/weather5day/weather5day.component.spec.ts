import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Weather5dayComponent } from './weather5day.component';

describe('Weather5dayComponent', () => {
  let component: Weather5dayComponent;
  let fixture: ComponentFixture<Weather5dayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Weather5dayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Weather5dayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
