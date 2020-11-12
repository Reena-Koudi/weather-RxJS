import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Weather } from 'src/app/models/weather';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

public weatherList: Weather[] = [];
public city: string;

  constructor(public weatherSerice: WeatherService) { }

  ngOnInit(): void {
  }

  getCities(city: string): void {
    this.weatherSerice.getWeather(city)
        .pipe(filter(weather => !!weather))
        .subscribe((weather: Weather[]) => {
          this.weatherList = weather;
          console.log('Weather List', this.weatherList);
        });
  }

  onOptionsSelected(value: string): void{
    if (value !== '') {
      this.getCities(value);
    }
  }
}
