import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { Weather5dayComponent } from './weather5day/weather5day.component';
import { DisplayWeatherParametersComponent } from './display-weather-parameters/display-weather-parameters.component';
import { DisplayWeatherParametersLineComponent } from './display-weather-parameters-line/display-weather-parameters-line.component';

@NgModule({
  declarations: [
    WeatherDisplayComponent,
    Weather5dayComponent,
    DisplayWeatherParametersComponent,
    DisplayWeatherParametersLineComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
  ],
  exports: [WeatherDisplayComponent, Weather5dayComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WeatherInfoModule {}
