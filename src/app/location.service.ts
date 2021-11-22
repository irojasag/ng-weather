import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ButtonState } from "./constants/button-states.contant";
import { Location } from "./models/location.model";
import { WeatherService } from "./weather.service";

export const LOCATIONS: string = "locations";

@Injectable()
export class LocationService {
  private addSubject: BehaviorSubject<ButtonState>;
  locations: Location[] = [];

  constructor(private weatherService: WeatherService) {
    this.addSubject = new BehaviorSubject<ButtonState>(ButtonState.DEFAULT);
    let locString = localStorage.getItem(LOCATIONS);
    if (locString) {
      this.locations = JSON.parse(locString);
    }
    for (let loc of this.locations) {
      this.weatherService.addCurrentConditions(loc);
    }
  }

  get addObservable(): Observable<ButtonState> {
    return this.addSubject.asObservable();
  }

  addLocation(location: Location) {
    this.addSubject.next(ButtonState.WORKING);
    this.locations.push(location);
    localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    this.weatherService.addCurrentConditions(location, this.addSubject);
  }

  removeLocation(locationToRemove: Location) {
    let index = this.locations.findIndex(
      (location) =>
        location.zipcode === locationToRemove.zipcode &&
        location.countryCode === locationToRemove.countryCode
    );
    if (index !== -1) {
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.weatherService.removeCurrentConditions(locationToRemove);
    }
  }
}
