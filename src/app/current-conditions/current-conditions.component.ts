import { Component } from "@angular/core";
import { WeatherService } from "../weather.service";
import { LocationService } from "../location.service";
import { Router } from "@angular/router";
import { Location } from "app/models/location.model";

@Component({
  selector: "app-current-conditions",
  templateUrl: "./current-conditions.component.html",
  styleUrls: ["./current-conditions.component.css"],
})
export class CurrentConditionsComponent {
  constructor(
    private weatherService: WeatherService,
    private locationService: LocationService,
    private router: Router
  ) {}

  getCurrentConditions() {
    return this.weatherService.getCurrentConditions();
  }

  showForecast(location: Location) {
    this.router.navigate(["/forecast", location.countryCode, location.zipcode]);
  }
}
