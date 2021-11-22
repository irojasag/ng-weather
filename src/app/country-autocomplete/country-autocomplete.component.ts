import { Component, Input, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { CountryService } from "app/country.service";
import { Country } from "app/models/country.model";
import { interval, Observable } from "rxjs";
import { debounce } from "rxjs/operators";

@Component({
  selector: "country-autocomplete",
  templateUrl: "./country-autocomplete.component.html",
  styleUrls: ["./country-autocomplete.component.css"],
})
export class CountryAutocompleteComponent implements OnInit {
  @Input("countryCodeControl") countryCodeControl: FormControl;
  @Input("placeholder") placeholder: string;

  public countryControl: FormControl = new FormControl("");
  public countries$: Observable<Country[]>;
  public showOptions: boolean = false;
  constructor(private service: CountryService) {
    this.countries$ = service.countries$;
  }

  ngOnInit(): void {
    this.countryControl.valueChanges
      .pipe(debounce(() => interval(200)))
      .subscribe((countryName) => {
        if (
          countryName &&
          !this.service.countries.find(
            (c) =>
              c.name === countryName && c.code === this.countryCodeControl.value
          )
        ) {
          this.service.searchCountries(countryName);
          this.showOptions = true;
        } else {
          this.showOptions = false;
        }
      });
  }

  public selectCountry(country: Country): void {
    this.showOptions = false;
    this.countryControl.setValue(country.name);
    this.countryCodeControl.setValue(country.code);
  }
}
