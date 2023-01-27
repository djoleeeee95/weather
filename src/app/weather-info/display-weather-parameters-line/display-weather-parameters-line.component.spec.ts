import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayWeatherParametersLineComponent } from './display-weather-parameters-line.component';

describe('DisplayWeatherParametersLineComponent', () => {
  let component: DisplayWeatherParametersLineComponent;
  let fixture: ComponentFixture<DisplayWeatherParametersLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayWeatherParametersLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayWeatherParametersLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
