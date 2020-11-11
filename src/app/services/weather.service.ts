import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Weather } from '../models/weather';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<Weather[]>{
    return this.http.get<Weather[]>(`${environment.apiEndPoint}/?i=${city}`).pipe(map((items: any) => {
      return items.results;
    }),
    catchError((err: Error) => {
      return err.message;
    })
    );
  }
}
