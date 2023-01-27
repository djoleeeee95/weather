import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayWeatherParametersComponent } from './display-weather-parameters.component';

describe('DisplayWeatherParametersComponent', () => {
  let component: DisplayWeatherParametersComponent;
  let fixture: ComponentFixture<DisplayWeatherParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayWeatherParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayWeatherParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
