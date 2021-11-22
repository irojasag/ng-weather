import { Component } from "@angular/core";
import { ButtonState } from "app/constants/button-states.contant";
import { Observable, Subject } from "rxjs";
import { LocationService } from "../location.service";

@Component({
  selector: "app-zipcode-entry",
  templateUrl: "./zipcode-entry.component.html",
})
export class ZipcodeEntryComponent {
  public addObservable: Observable<ButtonState>;

  constructor(private service: LocationService) {
    this.addObservable = this.service.addObservable;
  }

  addLocation(zipcode: string) {
    this.service.addLocation(zipcode);
  }
}
