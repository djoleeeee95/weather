import {
  Component,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';
import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { transform } from 'ol/proj';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { WeatherService } from '../weather-info/weather.service';
import { Forecast, ForecastDay, WeatherData } from '../types';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<Boolean> = new Subject();
  map!: Map;
  popupClass = 'hide';
  weatherData!: WeatherData;
  fiveDayForecast!: ForecastDay[];
  todaysData!: ForecastDay[];
  @Output() onForwardFiveDayForecast: EventEmitter<Forecast> =
    new EventEmitter();
  @Output() onCloseFiveDayForecast: EventEmitter<void> = new EventEmitter();

  constructor(private weather: WeatherService) {}

  ngOnInit(): void {
    this.mapInit();
  }

  // ngOnChanges() {
  //   const element = document.getElementById('popup')!;
  //   const bounding = element.getBoundingClientRect();
  //   console.log(bounding);
  // }

  ngOnDestroy(): void {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  mapInit() {
    this.map = new Map({
      view: new View({
        center: [1678301.0655080792, 5984011.288634883],
        zoom: 5,
      }),
      controls: [],
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: 'map',
    });

    const element = document.getElementById('popup')!;

    const popup = new Overlay({
      element,
    });

    this.map.addOverlay(popup);

    this.map.on('click', (e) => {
      const coordinate = e.coordinate;
      const lat = transform(coordinate, 'EPSG:3857', 'EPSG:4326')[1];
      const lon = transform(coordinate, 'EPSG:3857', 'EPSG:4326')[0];
      this.getWeatherData(lat, lon);
      this.getFiveDayForecast(lat, lon);
      popup.setPosition(coordinate);
      this.popupClass = 'show';
    });
  }

  getWeatherData(lat: number, lon: number) {
    this.weather
      .getCurrentWeather(lat, lon)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((res) => {
        this.weatherData = res;
      });
  }

  removePopup(e: any) {
    e.stopPropagation();
    this.popupClass = 'hide';
  }

  onClick(e: any) {
    e.stopPropagation();
    const { innerWidth, innerHeight } = window;
    const { clientX, clientY } = e;

    if (innerWidth - clientX > 400 && innerHeight - clientY > 500) {
      this.popupClass = 'show-down-right';
    } else if (innerWidth - clientX < 400 && innerHeight - clientY > 500) {
      this.popupClass = 'show-down-left';
    } else if (innerWidth - clientX > 400 && innerHeight - clientY < 500) {
      this.popupClass = 'show-up-right';
    } else if (innerWidth - clientX < 400 && innerHeight - clientY < 500) {
      this.popupClass = 'show-up-left';
    }

    this.closeFiveDayForecast();
  }

  getFiveDayForecast(lat: number, lon: number) {
    this.weather
      .get5DayForecast(lat, lon)
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((res) => {
        this.fiveDayForecast = res;
        this.getTodaysData();
      });
  }

  getTodaysData() {
    this.todaysData = this.fiveDayForecast.map((a: ForecastDay) => ({ ...a }));
    this.todaysData = this.todaysData.filter((day: ForecastDay) => {
      return new Date(day.dt_txt).getDate() == new Date().getDate();
    });
    this.todaysData.map((data: any) => {
      data.dt_txt = new Date(data.dt_txt).getHours();
      data.temp = Math.round(data.temp);
      data.feels_like = Math.round(data.feels_like);
      if (data.main === 'Clear') {
        data.weatherClass = 'bi bi-brightness-high sunny';
      } else if (data.main === 'Clouds') {
        data.weatherClass = 'bi bi-cloud cloudy';
      } else if (data.main === 'Rain') {
        data.weatherClass = 'bi bi-cloud-rain cloudy';
      } else if (data.main === 'Mist') {
        data.weatherClass = 'bi bi-cloud-fog cloudy';
      } else if (data.main === 'Fog') {
        data.weatherClass = 'bi bi-cloud-fog cloudy';
      } else if (data.main === 'Snow') {
        data.weatherClass = 'bi bi-cloud-snow cloudy';
      } else {
        data.weatherClass = '';
      }
    });
  }

  forwardFiveDayForecast() {
    const { name } = this.weatherData;
    this.onForwardFiveDayForecast.emit({ name, res: this.fiveDayForecast });
  }

  closeFiveDayForecast() {
    this.onCloseFiveDayForecast.emit();
  }
}
