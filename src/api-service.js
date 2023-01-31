export default class APIRestCountries {
  constructor() {
    this.searchQuery = '';
  }

  getCountryInfo() {
    
    const url =
      `https://restcountries.com/v3.1/name/${this.searchQuery}?fields=name,capital,population,flag,languages`;

    return fetch(url)
      .then(response => response.json())
      .then(data => data.country);
      
  }

  getQuery() {
    return this.searchQuery;
  }

  setQuery() {
    this.searchQuery = newQuery;
  }
  // clearInput() {
  //   this.searchQuery = '';
  // }
}
