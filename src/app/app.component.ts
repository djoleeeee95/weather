import { Component } from '@angular/core';
import { Forecast } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'weather';
  show = false;
  forecast!: Forecast;

  getFiveDayForecast(e: Forecast) {
    this.forecast = e;
    this.show = true;
  }

  removeForecast() {
    this.show = false;
  }
}
