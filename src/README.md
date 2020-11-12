### a) **** create a project
1 - ng new project_name
2 - yes for routing
3 - chosse "scss"
4 - open Visual tudio Co and open the folder (project)

### b) add endpoint to environment.ts file
export const environment = {
    production: false,
    apiEndPoint: 'https://www.metaweather.com/api'
  };

### c) create folder in app
1 - (components, model, services)
2 - in app.module add the reference to HttpClientModule
    i- import { HttpClientModule } from '@angular/common/http';
    ii - inside import add the module
    imports: [
        ...
        FormsModule,
        HttpClientModule,
    ],

###  d) create files
1 - ng g c components/home
2 - ng g s services/weather
3 - create file weather.ts in 'model'

### e) inside model create the properties of Weather 
(go to browser and run https://www.metaweather.com/api/location/search/?query=london)
export class Weather {
    ...
}


### f) create your service
** importants importants
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
**** example of body
constructor(private http: HttpClient) { }
  getRecipes(ingredient: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${environment.apiEndPoint}/?i=${ingredient}`).pipe(
      map((items: any) => {
        return items.results;
      }),
      catchError( (err: Error) => {
        return err.message;
      })
    );
  }
}

### g) inside home component html
1 - add a input text, and button
2 - add a div with *ngFor (for the list)


### h) in home.component.ts
1 - add the service in the constructor
2 - add a function triggered by the click to call the service and subscribe to the Observable
example
    public my_public_Variable: Data_Type[] = [];
    ...
    getMethod(value: string): void {
        this.serviceName.getMethod(value)
            .pipe(filter(data => !!data))
            .subscribe((data: Data_Type[]) => {
            this.my_public_Variable = data;
            });
    }
3 - assign the result to a public variable to be added to html page
example
<div *ngFor="let item of my_public_Variable">
    {{item.property1}} - {{item.property2}} - ...
</div>

example of ngModel
<input [(ngModel)]="city" (click)="getCities()">