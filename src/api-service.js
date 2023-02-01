
export default class RestCountriesAPI {
  constructor(searchQuery) {
    this.searchQuery = searchQuery;
  }

  getCountryInfo() {
    
    const url =
      `https://restcountries.com/v3.1/name/${this.searchQuery}?fields=name`;

    return fetch(url)
      .then(response => response.json())
      .then(data => data[0].name.common);           
     
  }

  getQuery() {
    return this.searchQuery;
  }

  setQuery(newQuery) {
    this.searchQuery = newQuery;
  }
 
}

// ,capital,population,languages,flags