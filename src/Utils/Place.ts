export class Place {
  city: string;
  countryCode?: string;
  constructor(city: string, countryCode?: string) {
    this.city = city;
    if (countryCode) this.countryCode = countryCode;
  }
}
