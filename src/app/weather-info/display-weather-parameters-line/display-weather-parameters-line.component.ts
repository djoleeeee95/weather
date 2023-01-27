import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-display-weather-parameters-line',
  templateUrl: './display-weather-parameters-line.component.html',
  styleUrls: ['./display-weather-parameters-line.component.scss'],
})
export class DisplayWeatherParametersLineComponent implements OnInit {
  @Input() dt_txt: number | string | undefined = 0;
  @Input() class = '';
  @Input() clickable = '';
  @Input() temp = 0;
  @Input() feels_like = 0;

  constructor() {}

  ngOnInit(): void {}
}
