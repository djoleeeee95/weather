import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-weather-parameters',
  templateUrl: './display-weather-parameters.component.html',
  styleUrls: ['./display-weather-parameters.component.scss'],
})
export class DisplayWeatherParametersComponent implements OnInit {
  @Input() class = '';
  @Input() name = '';
  @Input() weatherClass = '';
  @Input() description = '';
  @Input() humidity = 0;
  @Input() pressure = 0;
  @Input() windSpeed = 0;
  @Input() temp = 0;

  constructor() {}

  ngOnInit(): void {}
}
