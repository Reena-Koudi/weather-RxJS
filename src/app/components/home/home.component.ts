import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Forecast, WeatherDay } from 'src/app/models/forecast';
import { Weather } from 'src/app/models/weather';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

public weatherList: Weather[] = [];
public forecastList: Forecast;
public city: string;
public isForecast = false;
public subscription: Subscription;

  constructor(public weatherSerice: WeatherService) { }

  ngOnInit(): void {
  }


  getCities(city: string): void {
    this.subscription.add(this.weatherSerice.getWeatherForCity(city)
        .pipe(filter(weather => !!weather))
        .subscribe((weather: Weather[]) => {
          this.weatherList = weather;
          console.log('Weather List', weather);
        }));
  }

  onOptionsSelected(): void{
    if (this.city !== '') {
      this.getCities(this.city);
    }
  }

  showForecast(woeid: number): void{
    console.log('number', woeid );
    this.subscription.add(this.weatherSerice.getWeatherDayForCity(woeid)
      .pipe(filter(forecast => !!forecast))
      .subscribe((forecast: Forecast) => {
        this.forecastList = forecast;
      }));
    this.isForecast = true;
  }

  displayTable(): void {
    this.isForecast = false;
  }

  displayIcon(iconName: string): string{
    return `../../../assets/${iconName}.svg`;
  }
}
