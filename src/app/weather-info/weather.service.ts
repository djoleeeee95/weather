import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ForecastDay,
  ForecastListItem,
  ForecastResponse,
  WeatherData,
  WeatherResponse,
} from '../types';
import { map, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private weatherUrl = 'https://api.openweathermap.org/data/2.5';
  // enter your key from https://openweathermap.org/
  appid = '';

  constructor(private http: HttpClient) {}

  getCurrentWeather(lat: number, lon: number) {
    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', 'metric')
      .set('appid', this.appid);
    return this.http
      .get<WeatherResponse>(`${this.weatherUrl}/weather`, { params })
      .pipe(
        map((res) => {
          const {
            name,
            coord,
            dt,
            timezone,
            main: { temp, feels_like, humidity, pressure },
            wind: { speed },
          } = res;
          const { description, main } = res.weather[0];
          const weatherData: WeatherData = {
            name,
            coord,
            dt,
            timezone,
            temp,
            feels_like,
            humidity,
            pressure,
            description,
            main,
            wind_speed: speed,
          };
          return weatherData;
        })
      );
  }

  get5DayForecast(lat: number, lon: number) {
    const params = new HttpParams()
      .set('lat', lat)
      .set('lon', lon)
      .set('units', 'metric')
      .set('appid', this.appid);
    return this.http
      .get<ForecastResponse>(`${this.weatherUrl}/forecast`, { params })
      .pipe(
        pluck('list'),
        map((res) => {
          return res.map((item: ForecastListItem) => {
            const {
              dt_txt,
              main: {
                temp,
                feels_like,
                temp_min,
                temp_max,
                pressure,
                humidity,
              },
              wind: { speed },
            } = item;
            const { main, description } = item.weather[0];
            const forecastDay: ForecastDay = {
              dt_txt,
              temp,
              feels_like,
              temp_min,
              temp_max,
              pressure,
              humidity,
              main,
              description,
              wind_speed: speed,
            };
            return forecastDay;
          });
        })
      );
  }
}
