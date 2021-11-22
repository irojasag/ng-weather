import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Country } from "./models/country.model";

@Injectable()
export class CountryService {
  static URL = "https://restcountries.com/v3.1/name";
  private countries: Country[] = [];

  constructor(private http: HttpClient) {}

  public searchCountries(searchText: string): void {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    const url = `${CountryService.URL}/${searchText}`;
    this.http.get(url, { headers }).subscribe((data: any[]) => {
      this.countries = [];
      data.forEach((element) => {
        this.countries.push({
          name: element.name.common,
          code: element.cca2,
        });
      });
    });
  }
}
