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
    // this.getCities(this.city);
  }

  getCities(city: string): void {
    this.weatherSerice.getWeatherForCity(city)
        .pipe(filter(weather => !!weather))
        .subscribe((weather: Weather[]) => {
          this.weatherList = weather;
          console.log('Weather List', weather);
        });
  }

  onOptionsSelected(): void{
    if (this.city !== '') {
      this.getCities(this.city);
    }
  }
}
