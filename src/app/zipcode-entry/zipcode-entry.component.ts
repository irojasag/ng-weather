import { Component } from "@angular/core";
import { FormControl } from "@angular/forms";
import { ButtonState } from "app/constants/button-states.contant";
import { Observable, Subject } from "rxjs";
import { LocationService } from "../location.service";

@Component({
  selector: "app-zipcode-entry",
  templateUrl: "./zipcode-entry.component.html",
})
export class ZipcodeEntryComponent {
  public addObservable: Observable<ButtonState>;
  public countryControl: FormControl = new FormControl(null);
  public zipcodeControl: FormControl = new FormControl(null);

  constructor(private service: LocationService) {
    this.addObservable = this.service.addObservable;
  }

  addLocation() {
    const zipcode = this.zipcodeControl.value;
    const countryCode = this.countryControl.value;
    this.service.addLocation({ zipcode, countryCode });
    this.zipcodeControl.setValue("");
    this.countryControl.setValue("");
  }
}
