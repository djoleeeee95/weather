import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { WeatherInfoModule } from './weather-info/weather-info.module';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    WeatherInfoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
