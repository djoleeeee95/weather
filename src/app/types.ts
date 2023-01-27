export interface WeatherResponse {
  coord: Coordinates;
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  name: string;
  timezone: number;
  weather: [
    {
      description: string;
      main: string;
    }
  ];
  wind: {
    speed: number;
  };
}

export interface WeatherData {
  name: string;
  coord: Coordinates;
  dt: number;
  timezone: number;
  temp: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  description: string;
  main: string;
  wind_speed: number;
}

export interface Coordinates {
  lon: number;
  lat: number;
}

export interface ForecastResponse {
  list: ForecastListItem[];
}

export interface ForecastListItem {
  dt: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: [
    {
      main: string;
      description: string;
    }
  ];
  wind: {
    speed: number;
  };
  dt_txt: string;
}

export interface ForecastDay {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
  description: string;
  main: string;
  wind_speed: number;
  dt_txt: string;
  hours?: number;
  weatherClass?: string;
  day?: string;
  max?: number;
  min?: number;
}

// export interface Forecast {
//     name: string;
//     res: {
//         forecastList: ForecastDay[]
//     }
// }

export interface Forecast {
  name: string;
  res: ForecastDay[];
}
