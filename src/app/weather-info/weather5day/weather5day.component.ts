import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { Forecast, ForecastDay } from '../../types';

@Component({
  selector: 'app-weather5day',
  templateUrl: './weather5day.component.html',
  styleUrls: ['./weather5day.component.scss'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('300ms', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('2000ms', style({ opacity: 0, transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class Weather5dayComponent implements OnInit {
  @Input() forecast!: Forecast;
  weatherData: (ForecastDay | { day: string; max: number; min: number })[][] =
    [];
  // weatherData: ForecastDay[][] = [];
  locationName = '';
  dailyDisplay = false;
  selectedDay = '';
  clickedHour: number[] = [];
  selectedDayArray: ForecastDay[] = [
    // selectedDayArray: (
    //   | ForecastDay
    //   | { day: string; max: number; min: number }
    // )[] = [
    {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      humidity: 0,
      pressure: 0,
      description: '',
      main: '',
      wind_speed: 0,
      dt_txt: '',
      weatherClass: '',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges() {
    this.formDailyWeather(this.forecast);
    this.locationName = this.forecast.name;
  }

  formDailyWeather(forecast: Forecast) {
    const grouped = [];
    const filtered = forecast.res.filter((day: ForecastDay) => {
      return new Date(day.dt_txt).getDate() !== new Date().getDate();
    });
    for (let i = 0; i <= 36; i = i + 8) {
      const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];
      const day = days[new Date(filtered[i].dt_txt).getDay()];
      let group = [];
      let max = 0;
      let min = Infinity;
      for (let j = 0; j <= 7; j++) {
        if (filtered[i + j]) {
          max =
            filtered[i + j].temp_max > max
              ? Math.round(filtered[i + j].temp_max)
              : max;
          min =
            filtered[i + j].temp_min < min
              ? Math.round(filtered[i + j].temp_min)
              : min;
          filtered[i + j].hours = new Date(filtered[i + j].dt_txt).getHours();
          filtered[i + j].temp = Math.round(filtered[i + j].temp);
          filtered[i + j].feels_like = Math.round(filtered[i + j].feels_like);
          if (filtered[i + j].main === 'Clear') {
            filtered[i + j].weatherClass = 'bi bi-brightness-high sunny';
          } else if (filtered[i + j].main === 'Clouds') {
            filtered[i + j].weatherClass = 'bi bi-cloud cloudy';
          } else if (filtered[i + j].main === 'Rain') {
            filtered[i + j].weatherClass = 'bi bi-cloud-rain cloudy';
          } else if (filtered[i + j].main === 'Mist') {
            filtered[i + j].weatherClass = 'bi bi-cloud-fog cloudy';
          } else if (filtered[i + j].main === 'Fog') {
            filtered[i + j].weatherClass = 'bi bi-cloud-fog cloudy';
          } else if (filtered[i + j].main === 'Snow') {
            filtered[i + j].weatherClass = 'bi bi-cloud-snow cloudy';
          } else {
            filtered[i + j].weatherClass = '';
          }
          group.push(filtered[i + j]);
        }
      }
      group.push({
        day,
        max,
        min,
      });
      grouped.push(group);
    }

    this.weatherData = grouped;
  }

  onDayClick(e: any) {
    this.dailyDisplay = true;
    this.selectedDay = e.currentTarget?.id;
    const data: any =
      this.weatherData
        ?.find((data) => data[data.length - 1].day === this.selectedDay)
        ?.slice(0, -1) || [];
    this.selectedDayArray = data;
    // this.selectedDayArray =
    //   this.weatherData
    //     ?.find((data) => data[data.length - 1].day === this.selectedDay)
    //     ?.slice(0, -1) || [];
  }

  onHourClick(i: number) {
    if (this.clickedHour.includes(i)) {
      this.clickedHour = this.clickedHour.filter((hour) => hour !== i);
    } else {
      this.clickedHour.push(i);
    }
  }
}
