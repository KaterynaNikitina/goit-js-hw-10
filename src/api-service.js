
export default class APIRestCountries { 
  constructor() {
    this.searchQuery = '';
  }
  
  getCountryInfo() {
    // const ENDPOINT = 'https://restcountries.com/v3.1/name/';
    const url = 'https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages';

return fetch(url)
  .then((response) => response.json())
  .then((data) => {
    return data;
  });
  }
  
getQuery() {
  return this.searchQuery;
}

setQuery() {
  this.searchQuery = newQuery;
}
clearInput() {
  this.searchQuery = '';
}
}

  