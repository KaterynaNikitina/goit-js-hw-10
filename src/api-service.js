export default class RestCountriesAPI {
  constructor(searchQuery) {
    this.searchQuery = searchQuery;
  }

  getCountryInfo() {
    
    const url =
      `https://restcountries.com/v3.1/name/${this.searchQuery}?fields=name,capital,population,languages,flags`;

    return fetch(url)
      .then(response => {
        if (!response.ok){
          throw new Error(response.status);
          return;
        }
        return response.json();
      })
      .then(data => {
       return data;            
  })
}
  getQuery() {
    return this.searchQuery;
  }

  setQuery(newQuery) {
    this.searchQuery = newQuery;
  }
}

