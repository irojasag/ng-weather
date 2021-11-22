import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Country } from "./models/country.model";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class CountryService {
  static URL = "https://restcountries.com/v3.1/name";

  public countries: Country[] = [];
  private countriesSubject: BehaviorSubject<Country[]>;

  constructor(private http: HttpClient) {
    this.countriesSubject = new BehaviorSubject([]);
  }

  get countries$(): Observable<Country[]> {
    return this.countriesSubject.asObservable();
  }

  public searchCountries(searchText: string): void {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    const url = `${CountryService.URL}/${searchText}`;
    this.http.get(url, { headers }).subscribe((data: any[]) => {
      this.countries = [];
      data.forEach((element) => {
        this.countries.push({
          name: `${element.name.official}`,
          code: element.cca2,
          flag: element.flag,
        });
      });
      this.countriesSubject.next(this.countries);
    });
  }
}
