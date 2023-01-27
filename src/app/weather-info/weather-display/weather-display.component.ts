import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  trigger,
  transition,
  style,
  animate,
  stagger,
  query,
  state,
  sequence,
  group,
} from '@angular/animations';
import { ForecastDay, WeatherData } from 'src/app/types';

@Component({
  selector: 'app-weather-display',
  templateUrl: './weather-display.component.html',
  styleUrls: ['./weather-display.component.scss'],
  animations: [
    trigger('slideDownUp', [
      transition(':enter', [
        group([
          query(':enter', [
            style({ opacity: 0 }),
            stagger(
              '100ms',
              sequence([animate('200ms', style({ opacity: 1 }))])
            ),
          ]),
          query(
            '.weather-display',
            [animate('1000ms ease-in-out', style({ opacity: 0.4 }))],
            { optional: true }
          ),
        ]),
      ]),
      transition(':leave', [
        group([
          query(':leave', [
            stagger('-100ms', animate('200ms', style({ opacity: 0 }))),
          ]),
          query(
            '.weather-display',
            [animate('5000ms ease-in-out', style({ opacity: 0.4 }))],
            { optional: true }
          ),
        ]),
      ]),
    ]),
  ],
})
export class WeatherDisplayComponent implements OnInit {
  @Input() class = 'hide';
  @Input() weatherData: WeatherData = {
    name: '',
    dt: 0,
    timezone: 0,
    coord: { lon: 0, lat: 0 },
    temp: 0,
    feels_like: 0,
    humidity: 0,
    pressure: 0,
    description: '',
    main: '',
    wind_speed: 0,
  };
  @Input() laterData!: any;
  name = this.weatherData.name;
  time = '';
  temp = this.weatherData.temp;
  feels_like = this.weatherData.feels_like;
  humidity = this.weatherData.humidity;
  pressure = this.weatherData.humidity;
  description = this.weatherData.description;
  main = this.weatherData.main;
  wind_speed = this.weatherData.wind_speed;
  weatherClass = '';

  showLater = false;

  @Output() onFiveDayForecast: EventEmitter<void> = new EventEmitter();

  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();
  }

  ngOnChanges() {
    // console.log(this.laterData);
    this.showLater = false;
    this.spinner.show();
    if (this.weatherData) this.setData();
  }

  setData() {
    const {
      name,
      temp,
      feels_like,
      humidity,
      pressure,
      description,
      main,
      wind_speed,
    } = this.weatherData;
    this.name = name || 'No location information';
    this.temp = Math.round(temp);
    this.feels_like = Math.round(feels_like);
    this.humidity = humidity;
    this.pressure = pressure;
    this.description = description;
    this.description =
      description.length > 1
        ? (this.description =
            this.description[0].toUpperCase() + this.description.slice(1))
        : (this.description =
            this.description.toUpperCase() + this.description.slice(1));
    this.main = main;
    this.wind_speed = wind_speed;
    if (this.main === 'Clear') {
      this.weatherClass = 'bi bi-brightness-high sunny';
    } else if (this.main === 'Clouds') {
      this.weatherClass = 'bi bi-cloud cloudy';
    } else if (this.main === 'Rain') {
      this.weatherClass = 'bi bi-cloud-rain cloudy';
    } else if (this.main === 'Mist') {
      this.weatherClass = 'bi bi-cloud-fog cloudy';
    } else if (this.main === 'Snow') {
      this.weatherClass = 'bi bi-cloud-snow cloudy';
    } else {
      this.weatherClass = '';
    }

    this.spinner.hide();
  }

  handleShowLater(e: MouseEvent, show: boolean) {
    e.stopPropagation();
    this.showLater = show;
  }

  showFiveDayForecast(e: MouseEvent) {
    e.stopPropagation();
    this.onFiveDayForecast.emit();
  }
}
