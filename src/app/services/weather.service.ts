import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Weather } from '../models/weather';
import { environment } from 'src/environments/environment';
import { title } from 'process';
import { Forecast } from '../models/forecast';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeatherForCity(city: string): Observable<Weather[]>{
    return this.http.get<Weather[]>(`${environment.apiEndPoint}/location/search/?query=${city}`).pipe(
      map((items: any) => {
        return items;
      }),
      catchError((err: Error) => {
        return err.message;
      })
    );
  }

  getWeatherDayForCity(cityId: number): Observable<Forecast>{
    return this.http.get<Forecast>(`${environment.apiEndPoint}/location/${cityId}`).pipe(
      map((items: any) => {
        return items;
      }),
      catchError((err: Error) => {
        return err.message;
      })
    );
  }
}
