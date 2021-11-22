import { Injectable } from "@angular/core";
import { interval, Observable, Subject, zip } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { ButtonState } from "./constants/button-states.contant";
import { Location } from "./models/location.model";

@Injectable()
export class WeatherService {
  static URL = "http://api.openweathermap.org/data/2.5";
  static APPID = "5a4b2d457ecbef9eb2a71e480b947604";
  static ICON_URL =
    "https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/";
  private currentConditions = [];

  constructor(private http: HttpClient) {}

  addCurrentConditions(
    location: Location,
    addSubject?: Subject<ButtonState>
  ): void {
    // Here we make a request to get the curretn conditions data from the API. Note the use of backticks and an expression to insert the zipcode
    const url = `${WeatherService.URL}/weather?zip=${location.zipcode},${location.countryCode}&units=imperial&APPID=${WeatherService.APPID}`;
    this.http.get(url).subscribe(
      (data) => {
        this.handleWeatherUpdate(data, location);

        if (addSubject) {
          addSubject.next(ButtonState.DONE);
          setTimeout(() => {
            addSubject.next(ButtonState.DEFAULT);
          }, 500);
        }

        interval(0.5 * 60 * 1000)
          .pipe(mergeMap(() => this.http.get(url)))
          .subscribe((data) => this.handleWeatherUpdate(data, location));
      },
      (err) => {
        if (addSubject) {
          setTimeout(() => {
            addSubject.next(ButtonState.DEFAULT);
          }, 500);
        }
      }
    );
  }

  handleWeatherUpdate(data: any, location: Location) {
    const index = this.currentConditions.findIndex(
      (element) =>
        element.zip.zipcode === location.zipcode &&
        element.zip.countryCode === location.countryCode
    );
    if (index > -1) {
      this.currentConditions[index].data = data;
    } else {
      this.currentConditions.push({ zip: location, data: data });
    }
  }

  removeCurrentConditions(location: Location) {
    for (let i in this.currentConditions) {
      if (
        (this.currentConditions[i].zip.zipcode == location.zipcode,
        this.currentConditions[i].zip.countryCode == location.countryCode)
      )
        this.currentConditions.splice(+i, 1);
    }
  }

  getCurrentConditions(): any[] {
    return this.currentConditions;
  }

  getForecast(location: Location): Observable<any> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get(
      `${WeatherService.URL}/forecast/daily?zip=${location.zipcode},${location.countryCode}&units=imperial&cnt=5&APPID=${WeatherService.APPID}`
    );
  }

  getWeatherIcon(id) {
    if (id >= 200 && id <= 232)
      return WeatherService.ICON_URL + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return WeatherService.ICON_URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return WeatherService.ICON_URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return WeatherService.ICON_URL + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return WeatherService.ICON_URL + "art_clouds.png";
    else if (id === 741 || id === 761)
      return WeatherService.ICON_URL + "art_fog.png";
    else return WeatherService.ICON_URL + "art_clear.png";
  }
}
